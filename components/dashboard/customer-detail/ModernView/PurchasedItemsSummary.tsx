import React from 'react';
import { Customer } from '../../../../types/customer';
import { Payment } from '../../../../types/payment';
import { calculateAmountPaid, calculateRemaining } from '../../../../lib/customerCalculations';

interface PurchasedItemsSummaryProps {
  customer: Customer;
  payments: Payment[];
}

export default function PurchasedItemsSummary({ customer, payments }: PurchasedItemsSummaryProps) {
  const customerPayments = payments.filter((p) => p.customerId === customer.id);
  const paid = calculateAmountPaid(customerPayments);
  const remaining = calculateRemaining(customer.totalAmount, customerPayments);

  return (
    <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-5" id="purchased-items-summary">
      <div>
        <h3 className="font-display font-bold text-slate-800 dark:text-white text-base border-b border-slate-100 dark:border-slate-800/60 pb-3 flex items-center gap-2">
          <svg className="w-5 h-5 text-brand-orange" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
          </svg>
          Purchased Items & Contract
        </h3>
      </div>

      {/* Item Badges / List */}
      <div className="space-y-1.5">
        <span className="block text-slate-400 dark:text-slate-500 font-semibold tracking-wider uppercase text-[9px]">Items Purchased</span>
        <div className="flex flex-wrap gap-2">
          {customer.items.map((item, index) => (
            <span
              key={index}
              className="px-3 py-1.5 bg-brand-orange/5 dark:bg-brand-orange/10 border border-brand-orange/15 rounded-lg text-xs font-semibold text-brand-orange"
            >
              📦 {item}
            </span>
          ))}
        </div>
      </div>

      {/* Price breakdown metrics */}
      <div className="grid grid-cols-1 xs:grid-cols-3 gap-3 border-t border-b border-slate-50 dark:border-slate-800/40 py-4 font-sans">
        <div className="text-center">
          <span className="block text-slate-400 dark:text-slate-500 font-semibold tracking-wider uppercase text-[9px] mb-0.5">Total Value</span>
          <span className="font-extrabold text-slate-950 dark:text-white text-sm xs:text-xs sm:text-sm md:text-base lg:text-lg block">
            Rs. {customer.totalAmount.toLocaleString()}
          </span>
        </div>
        <div className="text-center border-t xs:border-t-0 xs:border-l xs:border-r border-slate-100 dark:border-slate-800/40 pt-2 xs:pt-0">
          <span className="block text-slate-400 dark:text-slate-500 font-semibold tracking-wider uppercase text-[9px] mb-0.5">Amount Paid</span>
          <span className="font-extrabold text-emerald-600 dark:text-emerald-400 text-sm xs:text-xs sm:text-sm md:text-base lg:text-lg block">
            Rs. {paid.toLocaleString()}
          </span>
        </div>
        <div className="text-center border-t xs:border-t-0 pt-2 xs:pt-0">
          <span className="block text-slate-400 dark:text-slate-500 font-semibold tracking-wider uppercase text-[9px] mb-0.5">Remaining Balance</span>
          <span className="font-extrabold text-brand-orange text-sm xs:text-xs sm:text-sm md:text-base lg:text-lg block">
            Rs. {remaining.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Installment Scheme details */}
      <div className="bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/40 rounded-lg p-3 flex justify-between items-center text-xs md:text-sm text-slate-700 dark:text-slate-300">
        <div>
          <span className="block text-slate-400 dark:text-slate-500 font-semibold tracking-wider uppercase text-[9px]">Installment Plan</span>
          <span className="font-bold text-slate-900 dark:text-white">
            Rs. {customer.installmentAmount.toLocaleString()} /{' '}
            <span className="capitalize">{customer.installmentFrequency}</span>
          </span>
        </div>
        <div className="text-right">
          <span className="block text-slate-400 dark:text-slate-500 font-semibold tracking-wider uppercase text-[9px]">Installments Paid</span>
          <span className="font-semibold text-slate-900 dark:text-white">
            {customerPayments.length} installments received
          </span>
        </div>
      </div>
    </div>
  );
}
