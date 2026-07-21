"use client";
import React, { useState } from 'react';
import { Customer } from '../../../types/customer';
import { Payment } from '../../../types/payment';
import CustomerRow from './CustomerRow';
import { calculateRemaining, calculateMarkAsPaidAmount } from '../../../lib/customerCalculations';

interface CustomerTableProps {
  customers: Customer[];
  payments: Payment[];
  onView: (id: string) => void;
  onQuickPaid: (customerId: string, amount: number) => void;
}

export default function CustomerTable({ customers, payments, onView, onQuickPaid }: CustomerTableProps) {
  const [rowToasts, setRowToasts] = useState<{ [key: string]: string }>({});

  const handleMobilePaidClick = (customer: Customer, remaining: number) => {
    if (remaining <= 0) {
      triggerMobileToast(customer.id, 'Already fully paid!');
      return;
    }
    const payAmount = calculateMarkAsPaidAmount(customer.installmentAmount, remaining);
    onQuickPaid(customer.id, payAmount);
    triggerMobileToast(customer.id, `Paid Rs. ${payAmount.toLocaleString()}!`);
  };

  const triggerMobileToast = (id: string, msg: string) => {
    setRowToasts((prev) => ({ ...prev, [id]: msg }));
    setTimeout(() => {
      setRowToasts((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    }, 2000);
  };

  const getStatusBadge = (status: Customer['status']) => {
    switch (status) {
      case 'active':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-2xs font-semibold bg-emerald-100 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-400">
            Active
          </span>
        );
      case 'high_risk':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-2xs font-semibold bg-rose-100 dark:bg-rose-950/30 text-rose-800 dark:text-rose-400">
            High Risk
          </span>
        );
      case 'deactive':
      default:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-2xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-300">
            Deactive
          </span>
        );
    }
  };

  if (customers.length === 0) {
    return (
      <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 p-6 shadow-sm">
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
            d="M15 1912-7a3 3 0 01-3-3V7a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3h9z"
            disabled
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 13h6m-6-4h6m-6 8h3"
          />
        </svg>
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-1">No customers found</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Try adjusting your search terms or filters.
        </p>
      </div>
    );
  }

  return (
    <div id="customer-table-and-cards-wrapper">
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-800 text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-950 text-slate-500 dark:text-slate-400 border-b border-gray-200 dark:border-slate-800">
              <th className="p-4 text-xs font-semibold uppercase tracking-wider">Name</th>
              <th className="p-4 text-xs font-semibold uppercase tracking-wider">Mobile</th>
              <th className="p-4 text-xs font-semibold uppercase tracking-wider">Area</th>
              <th className="p-4 text-xs font-semibold uppercase tracking-wider">Remaining</th>
              <th className="p-4 text-xs font-semibold uppercase tracking-wider">Status</th>
              <th className="p-4 text-xs font-semibold uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 bg-white dark:bg-slate-900">
            {customers.map((customer) => (
              <CustomerRow
                key={customer.id}
                customer={customer}
                payments={payments}
                onView={onView}
                onQuickPaid={onQuickPaid}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Stacked Cards View */}
      <div className="block md:hidden space-y-4">
        {customers.map((customer) => {
          const custPayments = payments.filter((p) => p.customerId === customer.id);
          const remaining = calculateRemaining(customer.totalAmount, custPayments);
          const toast = rowToasts[customer.id];

          return (
            <div
              key={customer.id}
              onClick={() => onView(customer.id)}
              className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 p-4 shadow-sm space-y-3 relative overflow-hidden active:scale-[0.99] transition-transform duration-100"
            >
              {/* Top row: Name + status badge */}
              <div className="flex justify-between items-start">
                <h4 className="font-bold text-slate-900 dark:text-white text-base">
                  {customer.name}
                </h4>
                {getStatusBadge(customer.status)}
              </div>

              {/* Middle row: Mobile / Area / Remaining details */}
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-400 font-sans border-t border-slate-50 dark:border-slate-800/50 pt-2">
                <div>
                  <span className="block text-slate-400 dark:text-slate-500 font-semibold tracking-wider uppercase text-[9px]">Mobile</span>
                  <span className="font-mono font-medium">{customer.phone}</span>
                </div>
                <div>
                  <span className="block text-slate-400 dark:text-slate-500 font-semibold tracking-wider uppercase text-[9px]">Area</span>
                  <span className="font-medium">{customer.area}</span>
                </div>
                <div className="col-span-2 mt-1">
                  <span className="block text-slate-400 dark:text-slate-500 font-semibold tracking-wider uppercase text-[9px]">Remaining Balance</span>
                  <span className="font-bold text-slate-900 dark:text-white text-sm">
                    Rs. {remaining.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Bottom row: Action buttons full-width */}
              <div className="flex gap-2 pt-2 border-t border-slate-50 dark:border-slate-800/50 relative">
                {toast && (
                  <div className="absolute inset-x-0 bottom-full mb-2 bg-slate-950/95 text-white text-xs py-1.5 px-3 rounded shadow-lg z-20 flex items-center justify-center gap-1.5 animate-fade-in-out">
                    <svg className="w-4 h-4 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {toast}
                  </div>
                )}

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMobilePaidClick(customer, remaining);
                  }}
                  disabled={remaining <= 0}
                  className={`flex-1 py-2 rounded-lg text-xs font-semibold text-white transition-colors duration-150 ${
                    remaining <= 0
                      ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed'
                      : 'bg-emerald-600 hover:bg-emerald-700'
                  }`}
                >
                  Paid
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onView(customer.id);
                  }}
                  className="flex-1 py-2 rounded-lg text-xs font-semibold text-white bg-brand-orange hover:bg-brand-orange/90 transition-colors duration-150"
                >
                  View
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
