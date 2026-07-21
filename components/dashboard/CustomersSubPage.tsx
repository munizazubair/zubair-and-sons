"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Customer } from '../../types/customer';
import { Payment } from '../../types/payment';
import SearchBar from './customers/SearchBar';
import StatusFilterDropdown from './customers/StatusFilterDropdown';
import CustomerTable from './customers/CustomerTable';
import CustomerDetailPage from './customer-detail/CustomerDetailPage';

interface CustomersSubPageProps {
  customers: Customer[];
  payments: Payment[];
  onAddPayment: (customerId: string, amount: number, date: string, method: Payment['method'], note?: string) => void;
  onDeletePayment: (paymentId: string) => void;
  selectedCustomerId?: string | null;
  setSelectedCustomerId?: (id: string | null) => void;
}

export default function CustomersSubPage({
  customers,
  payments,
  onAddPayment,
  onDeletePayment,
  selectedCustomerId,
  setSelectedCustomerId
}: CustomersSubPageProps) {
  const [localSelectedCustomerId, setLocalSelectedCustomerId] = useState<string | null>(null);

  const activeSelectedCustomerId = setSelectedCustomerId !== undefined ? selectedCustomerId : localSelectedCustomerId;
  const setActiveSelectedCustomerId = setSelectedCustomerId !== undefined ? setSelectedCustomerId : setLocalSelectedCustomerId;

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'high_risk' | 'deactive'>('all');

  // Find selected customer
  const selectedCustomer = customers.find((c) => c.id === activeSelectedCustomerId);

  // Filter customers based on search and status
  const filteredCustomers = customers.filter((customer) => {
    // Search match
    const searchLower = searchQuery.toLowerCase();
    const nameMatch = customer.name.toLowerCase().includes(searchLower);
    const phoneMatch = customer.phone.toLowerCase().includes(searchLower);
    const cnicMatch = customer.cnic.toLowerCase().includes(searchLower);
    const areaMatch = customer.area.toLowerCase().includes(searchLower);
    const matchesSearch = nameMatch || phoneMatch || cnicMatch || areaMatch;

    // Status filter match
    const matchesStatus = statusFilter === 'all' || customer.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleQuickPaid = (customerId: string, amount: number) => {
    const today = new Date();
    const offset = today.getTimezoneOffset();
    const localToday = new Date(today.getTime() - offset * 60 * 1000);
    const dateStr = localToday.toISOString().split('T')[0];
    onAddPayment(customerId, amount, dateStr, 'cash', 'Quick Pay shortcut installment');
  };

  return (
    <div className="w-full" id="customers-subpage-container">
      <AnimatePresence mode="wait">
        {selectedCustomer ? (
          // Page 2: Customer Detail View
          <CustomerDetailPage
            key={`detail-${selectedCustomer.id}`}
            customer={selectedCustomer}
            payments={payments}
            onBack={() => setActiveSelectedCustomerId(null)}
            onAddPayment={onAddPayment}
            onDeletePayment={onDeletePayment}
          />
        ) : (
          // Page 1: All Customers Directory View
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {/* Page Header */}
            <div>
              <h2 className="text-2xl font-bold font-display text-slate-800 dark:text-white tracking-tight" id="customers-page-title">
                All Customers
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                View, search, and manage all customers
              </p>
            </div>

            {/* Controls Row */}
            <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between bg-white dark:bg-slate-900 p-4 rounded-xl border border-gray-200 dark:border-slate-800 shadow-xs" id="customers-controls">
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
              <StatusFilterDropdown value={statusFilter} onChange={setStatusFilter} />
            </div>

            {/* Directory List/Table */}
            <CustomerTable
              customers={filteredCustomers}
              payments={payments}
              onView={setActiveSelectedCustomerId}
              onQuickPaid={handleQuickPaid}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
