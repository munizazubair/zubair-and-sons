"use client";
import React from 'react';
import { Customer } from '../../../types/customer';

interface QuickActionsBarProps {
  customer: Customer;
  remaining: number;
  onMarkAsPaid: () => void;
  onOpenCustomPayment: () => void;
}

export default function QuickActionsBar({
  customer,
  remaining,
  onMarkAsPaid,
  onOpenCustomPayment
}: QuickActionsBarProps) {
  const cleanNumber = customer.phone.replace(/[\s-]/g, '');

  return (
    <div
      className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-4"
      id="quick-actions-bar"
    >
      <h3 className="font-display font-bold text-slate-800 dark:text-white text-base border-b border-slate-100 dark:border-slate-800/60 pb-3 flex items-center gap-2">
        <svg className="w-5 h-5 text-brand-orange" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
        Quick Cash Desk & Actions
      </h3>

      <div className="flex flex-col sm:flex-row gap-3">
        {/* ✓ Mark as Paid (one quick installment) */}
        <button
          id="btn-quick-mark-paid"
          onClick={onMarkAsPaid}
          disabled={remaining <= 0}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs md:text-sm font-bold text-white transition-all duration-150 ${
            remaining <= 0
              ? 'bg-slate-300 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed'
              : 'bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 cursor-pointer shadow-sm hover:shadow-md'
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
          ✓ Mark as Paid
        </button>

        {/* + Add Custom Payment */}
        <button
          id="btn-open-custom-payment"
          onClick={onOpenCustomPayment}
          disabled={remaining <= 0}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs md:text-sm font-bold text-white transition-all duration-150 ${
            remaining <= 0
              ? 'bg-slate-300 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed'
              : 'bg-slate-800 hover:bg-slate-900 dark:bg-slate-950 dark:hover:bg-slate-950/80 cursor-pointer shadow-sm hover:shadow-md'
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          + Add Custom Payment
        </button>

        {/* 📞 Call link */}
        <a
          id="link-call-customer"
          href={`tel:${cleanNumber}`}
          className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-brand-orange hover:bg-brand-orange/90 active:bg-brand-orange-hover text-white rounded-xl text-xs md:text-sm font-bold shadow-sm hover:shadow-md transition-all duration-150 cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.824-1.806-5.118-4.102-6.924-6.924l1.293-.97a1.125 1.125 0 00.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
          </svg>
          📞 Call ({customer.phone})
        </a>
      </div>
    </div>
  );
}
