"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Customer } from '../../../types/customer';
import { Payment } from '../../../types/payment';
import { TodayRecoveryEntry, VisitStatus, NonPaymentReason } from '../../../types/recovery';
import { INITIAL_TODAY_RECOVERY } from '../../../lib/mockData/todayRecovery';
import { calculateDaysOverdue, calculateOutstanding } from '../../../lib/customerCalculations';

import TodayHeader from './TodayHeader';
import FilterBar, { FilterMode } from './FilterBar';
import AreaGroup from './AreaGroup';
import RecoveryCustomerCard from './RecoveryCustomerCard';
import ReconciliationSummary from './ReconciliationSummary';
import AddToTodayModal from './AddToTodayModal';
import CustomPaymentModal from '../customer-detail/CustomPaymentModal';

interface TodayRecoverySubPageProps {
  customers: Customer[];
  payments: Payment[];
  onAddPayment: (
    customerId: string,
    amount: number,
    date: string,
    method: Payment['method'],
    note?: string
  ) => void;
  onNavigateToCustomer: (customerId: string) => void;
  onBack: () => void;
}

export default function TodayRecoverySubPage({
  customers,
  payments,
  onAddPayment,
  onNavigateToCustomer,
  onBack
}: TodayRecoverySubPageProps) {
  // Load recovery entries from localStorage or default to initial mock data
  const [entries, setEntries] = useState<TodayRecoveryEntry[]>(() => {
    const saved = localStorage.getItem('device_today_recovery_v1');
    return saved ? JSON.parse(saved) : INITIAL_TODAY_RECOVERY;
  });

  // Filter modes: 'all' | 'area_wise' | 'overdue_only'
  const [filterMode, setFilterMode] = useState<FilterMode>('all');

  // Modal display states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [activePaymentCustomer, setActivePaymentCustomer] = useState<Customer | null>(null);
  const [activePaymentEntry, setActivePaymentEntry] = useState<TodayRecoveryEntry | null>(null);

  // Sync entries to localStorage
  useEffect(() => {
    localStorage.setItem('device_today_recovery_v1', JSON.stringify(entries));
  }, [entries]);

  // Handle visit status changes
  const handleStatusChange = (entryId: string, status: VisitStatus) => {
    const entry = entries.find((e) => e.id === entryId);
    if (!entry) return;

    if (status === 'paid') {
      // Find matching customer
      const customer = customers.find((c) => c.id === entry.customerId);
      if (customer) {
        setActivePaymentEntry(entry);
        setActivePaymentCustomer(customer);
      }
    } else {
      setEntries((prev) =>
        prev.map((e) =>
          e.id === entryId
            ? { ...e, visitStatus: status, nonPaymentReason: undefined }
            : e
        )
      );
    }
  };

  // Handle reason updates for unpaid visits
  const handleReasonChange = (entryId: string, reason: NonPaymentReason) => {
    setEntries((prev) =>
      prev.map((e) =>
        e.id === entryId ? { ...e, nonPaymentReason: reason } : e
      )
    );
  };

  // Handle adding an ad-hoc customer
  const handleAddAdHocCustomer = (customer: Customer, expectedAmount: number) => {
    // Check if customer already in today's list
    const exists = entries.some((e) => e.customerId === customer.id);
    if (exists) {
      alert(`${customer.name} is already in today's list.`);
      return;
    }

    // Determine if customer is overdue (simulate via generic days overdued helper)
    // For simplicity, let's look at standard mock due calculation or default to 0 for new adhoc addition
    const daysLate = 0; 

    const newEntry: TodayRecoveryEntry = {
      id: `rec-adhoc-${Date.now()}`,
      customerId: customer.id,
      customerName: customer.name,
      area: customer.area,
      expectedAmount,
      dueDate: new Date().toISOString().split('T')[0],
      daysOverdue: daysLate,
      visitStatus: 'not_visited',
      isAdHoc: true
    };

    setEntries((prev) => [newEntry, ...prev]);
  };

  // Handle processing a payment from CustomPaymentModal
  const handleProcessPayment = (
    amount: number,
    date: string,
    method: 'cash' | 'bank_transfer' | 'easypaisa' | 'other',
    note: string
  ) => {
    if (!activePaymentCustomer || !activePaymentEntry) return;

    // Add payment globally
    onAddPayment(activePaymentCustomer.id, amount, date, method, note);

    // Update state to record visit status as paid
    setEntries((prev) =>
      prev.map((e) =>
        e.id === activePaymentEntry.id
          ? { ...e, visitStatus: 'paid', nonPaymentReason: undefined }
          : e
      )
    );

    // Clear active modal triggers
    setActivePaymentCustomer(null);
    setActivePaymentEntry(null);
  };

  const handleCancelPayment = () => {
    // Revert status back to previous non-paid state or not_visited
    setActivePaymentCustomer(null);
    setActivePaymentEntry(null);
  };

  // Calculate stats dynamically for Reconciliation and Header
  const dueTodayCount = entries.filter((e) => e.daysOverdue === 0).length;
  const overdueCount = entries.filter((e) => e.daysOverdue > 0).length;

  const totalExpected = entries.reduce((sum, e) => sum + e.expectedAmount, 0);
  const totalCollected = entries
    .filter((e) => e.visitStatus === 'paid')
    .reduce((sum, e) => sum + e.expectedAmount, 0);
  const totalPending = totalExpected - totalCollected;

  const visitedAndPaidCount = entries.filter((e) => e.visitStatus === 'paid').length;
  const visitedAndNotPaidCount = entries.filter((e) => e.visitStatus === 'not_paid').length;
  const notVisitedCount = entries.filter((e) => e.visitStatus === 'not_visited').length;

  // Filter list for active render state
  const displayedEntries = entries.filter((e) => {
    if (filterMode === 'overdue_only') {
      return e.daysOverdue > 0;
    }
    return true;
  });

  // Sort overdue_only entries by days overdue descending, else default sort (isAdHoc first, then overdue)
  const sortedEntries = [...displayedEntries].sort((a, b) => {
    if (filterMode === 'overdue_only') {
      return b.daysOverdue - a.daysOverdue;
    }
    // Default sort: ad-hoc first, then overdue, then alphabetical
    if (a.isAdHoc !== b.isAdHoc) return a.isAdHoc ? -1 : 1;
    if ((a.daysOverdue > 0) !== (b.daysOverdue > 0)) return a.daysOverdue > 0 ? -1 : 1;
    return a.customerName.localeCompare(b.customerName);
  });

  // Calculate active payment remaining/outstanding balance
  const activeRemainingBalance = activePaymentCustomer
    ? calculateOutstanding(
        activePaymentCustomer.totalAmount,
        payments.filter((p) => p.customerId === activePaymentCustomer.id)
      )
    : 0;

  return (
    <div className="space-y-6" id="today-recovery-root">
      {/* Header section with back link and aggregate stats strip */}
      <TodayHeader
        onBack={onBack}
        dueCount={dueTodayCount}
        expectedAmount={totalExpected}
        overdueCount={overdueCount}
      />

      {/* Sticky Tab switcher Filter Bar and CTA triggers */}
      <FilterBar
        currentFilter={filterMode}
        onFilterChange={setFilterMode}
        onAddCustomerClick={() => setIsAddModalOpen(true)}
      />

      {/* Content Renderer */}
      <div className="space-y-6">
        {sortedEntries.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 p-8 shadow-2xs font-sans">
            <span className="text-3xl">🏜️</span>
            <h3 className="text-sm font-semibold text-slate-800 dark:text-white mt-3">
              No matching recovery operations found
            </h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              {filterMode === 'overdue_only'
                ? "Perfect! There are no overdue collection items remaining on today's list."
                : "The collection plan is currently empty. Use the 'Add Customer' button to assign recovery items."}
            </p>
          </div>
        ) : filterMode === 'area_wise' ? (
          /* Area Group list view */
          <AreaGroup
            entries={sortedEntries}
            onClickCard={onNavigateToCustomer}
            onChangeStatus={handleStatusChange}
            onChangeReason={handleReasonChange}
          />
        ) : (
          /* Standard Cards Grid View (All / Overdue) */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" id="recovery-cards-grid">
            {sortedEntries.map((entry) => (
              <RecoveryCustomerCard
                key={entry.id}
                entry={entry}
                onClickCard={() => onNavigateToCustomer(entry.customerId)}
                onChangeStatus={(status) => handleStatusChange(entry.id, status)}
                onChangeReason={(reason) => handleReasonChange(entry.id, reason)}
              />
            ))}
          </div>
        )}

        {/* Reconciliation Summary Footer Panel */}
        <ReconciliationSummary
          expected={totalExpected}
          collected={totalCollected}
          pending={totalPending}
          visitedAndPaidCount={visitedAndPaidCount}
          visitedAndNotPaidCount={visitedAndNotPaidCount}
          notVisitedCount={notVisitedCount}
        />
      </div>

      {/* Modal: Search and Add Customer to Today */}
      <AddToTodayModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        customers={customers}
        onAdd={handleAddAdHocCustomer}
      />

      {/* Modal: Process customer payment directly */}
      <CustomPaymentModal
        isOpen={activePaymentCustomer !== null}
        onClose={handleCancelPayment}
        remaining={activeRemainingBalance}
        onAddPayment={handleProcessPayment}
        defaultAmount={activePaymentEntry?.expectedAmount}
      />
    </div>
  );
}
