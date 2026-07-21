"use client";
import React from 'react';
import { TodayRecoveryEntry, VisitStatus, NonPaymentReason } from '../../../types/recovery';
import VisitStatusControl from './VisitStatusControl';

interface RecoveryCustomerCardProps {
  key?: string;
  entry: TodayRecoveryEntry;
  onClickCard: () => void;
  onChangeStatus: (status: VisitStatus) => void;
  onChangeReason: (reason: NonPaymentReason) => void;
}

export default function RecoveryCustomerCard({
  entry,
  onClickCard,
  onChangeStatus,
  onChangeReason
}: RecoveryCustomerCardProps) {
  const isOverdue = entry.daysOverdue > 0;

  // Handle call button with event propagation stop
  const handleCall = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.location.href = `tel:${entry.customerId}`; // In a real app we'd fetch the customer phone
  };

  return (
    <div
      id={`recovery-customer-card-${entry.id}`}
      onClick={onClickCard}
      className="group relative flex flex-col justify-between bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl p-5 shadow-2xs hover:shadow-md hover:border-brand-orange/40 dark:hover:border-brand-orange/30 transition-all duration-200 cursor-pointer space-y-4"
    >
      {/* Top Details & Badges */}
      <div className="space-y-1.5 relative">
        <div className="flex justify-between items-start gap-2">
          {/* Name & Area */}
          <div>
            <h4 className="font-bold text-slate-800 dark:text-white group-hover:text-brand-orange transition-colors duration-150 text-sm md:text-base">
              {entry.customerName}
            </h4>
            <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">
              📍 {entry.area}
            </span>
          </div>

          {/* Overdue Badge */}
          {isOverdue && (
            <div className="flex flex-col items-end flex-shrink-0 animate-pulse">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/10 text-rose-500">
                ⚠️ Overdue
              </span>
              <span className="text-[10px] text-rose-500 font-bold font-mono mt-0.5">
                {entry.daysOverdue} days late
              </span>
            </div>
          )}
        </div>

        {/* Expected Installment Amount */}
        <div className="flex items-baseline gap-1 pt-1">
          <span className="text-slate-400 dark:text-slate-500 text-xs">Expected Amount:</span>
          <span className="text-base md:text-lg font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
            Rs. {entry.expectedAmount.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Visit Status Controller & Call Quick Link */}
      <div className="space-y-3 pt-2 border-t border-slate-50 dark:border-slate-800/40">
        <div
          onClick={(e) => e.stopPropagation()} // Stop propagation so clicking status doesn't open detail
          className="space-y-3"
        >
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Recovery Status
            </span>

            {/* Quick Call Button */}
            <button
              onClick={handleCall}
              id={`btn-call-customer-${entry.id}`}
              className="p-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Call Customer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className="w-4 h-4"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </button>
          </div>

          <VisitStatusControl
            status={entry.visitStatus}
            reason={entry.nonPaymentReason}
            onChangeStatus={onChangeStatus}
            onChangeReason={onChangeReason}
          />
        </div>
      </div>
    </div>
  );
}
