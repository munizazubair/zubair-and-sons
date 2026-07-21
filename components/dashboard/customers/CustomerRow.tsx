"use client";
import React, { useState } from 'react';
import { Customer } from '../../../types/customer';
import { Payment } from '../../../types/payment';
import { calculateRemaining, calculateMarkAsPaidAmount } from '../../../lib/customerCalculations';

interface CustomerRowProps {
  key?: string;
  customer: Customer;
  payments: Payment[];
  onView: (id: string) => void;
  onQuickPaid: (customerId: string, amount: number) => void;
}

export default function CustomerRow({ customer, payments, onView, onQuickPaid }: CustomerRowProps) {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const customerPayments = payments.filter((p) => p.customerId === customer.id);
  const remaining = calculateRemaining(customer.totalAmount, customerPayments);

  const handlePaidClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (remaining <= 0) {
      setToastMessage('Already fully paid!');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
      return;
    }

    const payAmount = calculateMarkAsPaidAmount(customer.installmentAmount, remaining);
    onQuickPaid(customer.id, payAmount);

    setToastMessage(`Paid Rs. ${payAmount.toLocaleString()}!`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const getStatusBadge = (status: Customer['status']) => {
    switch (status) {
      case 'active':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-400">
            Active
          </span>
        );
      case 'high_risk':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-100 dark:bg-rose-950/30 text-rose-800 dark:text-rose-400">
            High Risk
          </span>
        );
      case 'deactive':
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-300">
            Deactive
          </span>
        );
    }
  };

  return (
    <tr
      id={`customer-row-${customer.id}`}
      className="hover:bg-slate-50/60 dark:hover:bg-slate-800/10 cursor-pointer transition-colors duration-150"
      onClick={() => onView(customer.id)}
    >
      <td className="p-4 whitespace-nowrap">
        <div className="font-semibold text-slate-900 dark:text-white text-sm md:text-base">
          {customer.name}
        </div>
      </td>
      <td className="p-4 whitespace-nowrap text-slate-600 dark:text-slate-300 text-sm font-mono">
        {customer.phone}
      </td>
      <td className="p-4 whitespace-nowrap text-slate-600 dark:text-slate-300 text-sm">
        {customer.area}
      </td>
      <td className="p-4 whitespace-nowrap font-semibold text-slate-900 dark:text-white text-sm">
        Rs. {remaining.toLocaleString()}
      </td>
      <td className="p-4 whitespace-nowrap">
        {getStatusBadge(customer.status)}
      </td>
      <td className="p-4 whitespace-nowrap text-right text-xs md:text-sm">
        <div className="flex items-center justify-end gap-2 relative">
          {/* Inline success toast */}
          {showToast && (
            <div className="absolute right-full mr-2 bg-slate-900 text-white text-xs py-1 px-2.5 rounded shadow-lg z-20 flex items-center gap-1 animate-fade-in-out whitespace-nowrap">
              <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              {toastMessage}
            </div>
          )}

          <button
            id={`btn-paid-${customer.id}`}
            onClick={handlePaidClick}
            disabled={remaining <= 0}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold text-white transition-colors duration-150 ${
              remaining <= 0
                ? 'bg-slate-300 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed'
                : 'bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 cursor-pointer'
            }`}
            title="Quickly pay one installment"
          >
            Paid
          </button>
          <button
            id={`btn-view-${customer.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onView(customer.id);
            }}
            className="px-3 py-1.5 rounded-md text-xs font-semibold text-white bg-brand-orange hover:bg-brand-orange/95 active:bg-brand-orange-hover transition-colors duration-150 cursor-pointer"
          >
            View
          </button>
        </div>
      </td>
    </tr>
  );
}
