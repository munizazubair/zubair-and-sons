"use client";
import React from 'react';
import { Payment } from '../../../types/payment';

interface RecordRowProps {
  key?: string;
  payment: Payment;
  customerName: string;
  onClick: () => void;
  variant?: 'table' | 'card';
}

export default function RecordRow({ payment, customerName, onClick, variant = 'table' }: RecordRowProps) {
  const getMethodBadge = (method: Payment['method']) => {
    switch (method) {
      case 'cash':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400">
            💵 Cash
          </span>
        );
      case 'bank_transfer':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-sky-50 dark:bg-sky-950/20 text-sky-700 dark:text-sky-400">
            🏛️ Bank Transfer
          </span>
        );
      case 'easypaisa':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-400">
            📱 Easypaisa
          </span>
        );
      case 'other':
      default:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
            💳 Other
          </span>
        );
    }
  };

  if (variant === 'table') {
    return (
      <tr
        id={`record-desktop-row-${payment.id}`}
        onClick={onClick}
        className="cursor-pointer transition-colors duration-150 border-b border-gray-100 dark:border-slate-800/40 hover:bg-slate-50/60 dark:hover:bg-slate-800/10 text-slate-700 dark:text-slate-300"
      >
        <td className="p-4 whitespace-nowrap font-bold text-slate-900 dark:text-white hover:text-brand-orange transition-colors">
          {customerName}
        </td>
        <td className="p-4 whitespace-nowrap text-emerald-600 dark:text-emerald-400 font-extrabold">
          Rs. {payment.amount.toLocaleString()}
        </td>
        <td className="p-4 whitespace-nowrap font-mono text-xs text-slate-500 dark:text-slate-400">
          {payment.time}
        </td>
        <td className="p-4 whitespace-nowrap">
          {getMethodBadge(payment.method)}
        </td>
      </tr>
    );
  }

  return (
    <div
      id={`record-mobile-row-${payment.id}`}
      onClick={onClick}
      className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 p-4 rounded-xl shadow-2xs space-y-2.5 active:scale-[0.99] transition-transform cursor-pointer hover:border-brand-orange/40"
    >
      <div className="flex justify-between items-start">
        <div className="font-bold text-slate-900 dark:text-white text-sm">
          {customerName}
        </div>
        <div className="text-emerald-600 dark:text-emerald-400 font-extrabold text-sm">
          Rs. {payment.amount.toLocaleString()}
        </div>
      </div>

      <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400 font-sans border-t border-slate-50 dark:border-slate-800/30 pt-2">
        <div className="font-mono text-[10px]">
          🕒 Captured at {payment.time}
        </div>
        <div>
          {getMethodBadge(payment.method)}
        </div>
      </div>
    </div>
  );
}
