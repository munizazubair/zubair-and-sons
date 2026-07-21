"use client";
import React from 'react';

interface DetailHeaderProps {
  onBack: () => void;
  customerName: string;
}

export default function DetailHeader({ onBack, customerName }: DetailHeaderProps) {
  return (
    <div className="space-y-2" id="customer-detail-header-container">
      <button
        id="btn-back-to-customers"
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs md:text-sm font-semibold text-slate-500 hover:text-brand-orange transition-colors duration-150 cursor-pointer group"
      >
        <svg
          className="w-4 h-4 transform group-hover:-translate-x-0.5 transition-transform duration-150"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
        Back to All Customers
      </button>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold font-display text-slate-800 dark:text-white tracking-tight">
            {customerName}
          </h2>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400">
            View detailed ledger card, transaction logs, and profile records.
          </p>
        </div>
      </div>
    </div>
  );
}
