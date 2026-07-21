"use client";
import React from 'react';
import { Payment } from '../../../types/payment';
import { Customer } from '../../../types/customer';
import RecordRow from './RecordRow';

interface RecordsListProps {
  payments: Payment[];
  customers: Customer[];
  onNavigateToCustomer: (id: string) => void;
}

export default function RecordsList({
  payments,
  customers,
  onNavigateToCustomer
}: RecordsListProps) {
  // Look up customer name helper
  const getCustomerName = (customerId: string): string => {
    const customer = customers.find((c) => c.id === customerId);
    return customer ? customer.name : 'Unknown Customer';
  };

  if (payments.length === 0) {
    return (
      <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 p-6 shadow-sm font-sans">
        <svg
          className="mx-auto h-12 w-12 text-slate-300 dark:text-slate-700 mb-3"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
          />
        </svg>
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-1">
          No payments recorded for this date
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Select another date or adjust your search to view historic receipts.
        </p>
      </div>
    );
  }

  return (
    <div id="records-list-wrapper">
      {/* Desktop Table - Hidden on Mobile */}
      <div className="hidden md:block overflow-x-auto rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-800 text-left border-collapse font-sans">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-950 text-slate-500 dark:text-slate-400 border-b border-gray-200 dark:border-slate-800">
              <th className="p-4 text-xs font-semibold uppercase tracking-wider">Customer Name</th>
              <th className="p-4 text-xs font-semibold uppercase tracking-wider">Amount Paid</th>
              <th className="p-4 text-xs font-semibold uppercase tracking-wider">Captured Time</th>
              <th className="p-4 text-xs font-semibold uppercase tracking-wider">Method</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 bg-white dark:bg-slate-900">
            {payments.map((p) => (
              <RecordRow
                key={p.id}
                payment={p}
                customerName={getCustomerName(p.customerId)}
                onClick={() => onNavigateToCustomer(p.customerId)}
                variant="table"
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Stacked Cards - Hidden on Desktop */}
      <div className="block md:hidden space-y-3">
        {payments.map((p) => (
          <RecordRow
            key={p.id}
            payment={p}
            customerName={getCustomerName(p.customerId)}
            onClick={() => onNavigateToCustomer(p.customerId)}
            variant="card"
          />
        ))}
      </div>
    </div>
  );
}
