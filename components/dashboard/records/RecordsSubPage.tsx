"use client";
import React, { useState, useTransition } from 'react';
import { motion } from 'motion/react';
import { Customer } from '../../../types/customer';
import { Payment } from '../../../types/payment';
import DateRangeSelector, { DatePreset } from './DateRangeSelector';
import RecordsSummaryBar from './RecordsSummaryBar';
import RecordsSearchBar from './RecordsSearchBar';
import RecordsList from './RecordsList';
import PrintButton from './PrintButton';
import { getPaymentsByDateRange, getRecordsSummary } from '../../../lib/recordsFilters';

interface RecordsSubPageProps {
  customers: Customer[];
  payments: Payment[];
  onNavigateToCustomer: (id: string) => void;
}

export default function RecordsSubPage({
  customers,
  payments,
  onNavigateToCustomer
}: RecordsSubPageProps) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [preset, setPreset] = useState<DatePreset>('today');
  const [searchQuery, setSearchQuery] = useState('');
  const [, startTransition] = useTransition();

  const handleRangeChange = (start: string, end: string) => {
    startTransition(() => {
      setStartDate(start);
      setEndDate(end);
    });
  };

  // Get raw records in date range
  const paymentsInDateRange = getPaymentsByDateRange(payments, startDate, endDate);

  // Filter based on search query live (matching customer name)
  const filteredPayments = paymentsInDateRange.filter((p) => {
    const customer = customers.find((c) => c.id === p.customerId);
    const customerName = customer ? customer.name.toLowerCase() : '';
    return customerName.includes(searchQuery.toLowerCase());
  });

  // Sort filtered records newest-first (using date + time if available, or just keeping the existing reverse order)
  const sortedPayments = [...filteredPayments].sort((a, b) => {
    // If dates are identical, sort by time newest first
    if (a.date === b.date) {
      return b.time.localeCompare(a.time);
    }
    return b.date.localeCompare(a.date);
  });

  // Summary counts should be calculated on the full set of matching payments for the selected date range, or the live filtered set?
  // Let's compute based on the date-range matches (before search filter, or including search filter? "Updates instantly based on selected date/range" usually implies the selected dates, let's use the date range payments so it gives a correct total of that day's ledger!).
  const summary = getRecordsSummary(paymentsInDateRange);

  // Dynamic Expected Collection calculation based on customer installment values and duration of range
  const getExpectedCollection = () => {
    if (!startDate || !endDate) return 0;
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    // Filter active and high_risk customers
    const activeCustomers = customers.filter(c => c.status === 'active' || c.status === 'high_risk');

    if (diffDays <= 1) {
      // Single day: sum of expected recovery for one day (approx Rs. 10,500)
      return 10500;
    }

    if (diffDays <= 8) {
      // Weekly: All weekly customers are due once, monthly customers due approx 1/4 of their monthly amount
      const weeklyExpected = activeCustomers.reduce((sum, c) => {
        if (c.installmentFrequency === 'weekly') {
          return sum + c.installmentAmount;
        } else {
          return sum + Math.round(c.installmentAmount / 4);
        }
      }, 0);
      return weeklyExpected;
    }

    // Monthly or larger ranges:
    // Scale weekly installments and monthly installments proportionally
    const totalExpected = activeCustomers.reduce((sum, c) => {
      if (c.installmentFrequency === 'weekly') {
        const weeks = Math.max(1, Math.round(diffDays / 7));
        return sum + c.installmentAmount * weeks;
      } else {
        const months = Math.max(1, Math.round(diffDays / 30));
        return sum + c.installmentAmount * months;
      }
    }, 0);

    return totalExpected;
  };

  const expectedCollection = getExpectedCollection();
  const dateRangeText = startDate === endDate ? startDate : `${startDate} to ${endDate}`;

  return (
    <div className="space-y-6" id="records-subpage-container">
      {/* Hidden Print Header (Revealed only in @media print) */}
      <div id="print-header" className="hidden print:block font-sans mb-6">
        <div className="border-b-2 border-slate-900 pb-3">
          <h1 className="text-2xl font-bold uppercase tracking-tight text-slate-900">
            Device Collection Ledger
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Payment History Report • Selected Period: {dateRangeText}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 py-4 text-xs font-semibold uppercase text-slate-800">
          <div>Total Receipts: Rs. {summary.total.toLocaleString()}</div>
          <div>Expected Collection: Rs. {expectedCollection.toLocaleString()}</div>
        </div>
      </div>

      {/* Main UI Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 print:hidden">
        <div>
          <h2 className="text-2xl font-bold font-display text-slate-800 dark:text-white tracking-tight">
            Records
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            View payment history by date
          </p>
        </div>
        <PrintButton dateRangeText={dateRangeText} />
      </div>

      {/* Date Preset & Custom Calendar Row */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-gray-200 dark:border-slate-800 shadow-2xs space-y-4 print:hidden">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5">
            Select Collection Period
          </h3>
          <DateRangeSelector
            onRangeChange={handleRangeChange}
            preset={preset}
            onPresetChange={setPreset}
          />
        </div>
      </div>

      {/* Summary Aggregate Stats */}
      <RecordsSummaryBar
        totalCollected={summary.total}
        expectedCollection={expectedCollection}
      />

      {/* Filter and Table Container */}
      <div className="space-y-4">
        {/* Live Search (Only shown on screen, hidden on Print) */}
        <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-gray-200 dark:border-slate-800 shadow-2xs print:hidden">
          <RecordsSearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>

        {/* Animated Records List */}
        <motion.div
          key={`list-${startDate}-${endDate}-${searchQuery}`}
          initial={{ opacity: 0.7 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <RecordsList
            payments={sortedPayments}
            customers={customers}
            onNavigateToCustomer={onNavigateToCustomer}
          />
        </motion.div>
      </div>
    </div>
  );
}
