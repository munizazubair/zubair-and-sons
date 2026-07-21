"use client";
import React from 'react';
import { VisitStatus, NonPaymentReason } from '../../../types/recovery';

interface VisitStatusControlProps {
  status: VisitStatus;
  reason?: NonPaymentReason;
  onChangeStatus: (status: VisitStatus) => void;
  onChangeReason: (reason: NonPaymentReason) => void;
}

export default function VisitStatusControl({
  status,
  reason,
  onChangeStatus,
  onChangeReason
}: VisitStatusControlProps) {
  const reasons: { id: NonPaymentReason; label: string }[] = [
    { id: 'not_home', label: '🏡 Customer not home' },
    { id: 'extension_requested', label: '📅 Asked for extension' },
    { id: 'refused', label: '❌ Refused to pay' },
    { id: 'other', label: '❓ Other reason' }
  ];

  return (
    <div className="space-y-3" id="visit-status-control-container">
      {/* 3-Way Segmented Button Group */}
      <div className="grid grid-cols-3 gap-1 bg-slate-100 dark:bg-slate-950 p-1 rounded-lg">
        {/* Not Visited Button */}
        <button
          type="button"
          id="btn-status-not-visited"
          onClick={() => onChangeStatus('not_visited')}
          className={`py-2 text-[10px] md:text-xs font-bold rounded-md transition-all duration-150 cursor-pointer ${
            status === 'not_visited'
              ? 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 shadow-3xs'
              : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
          }`}
        >
          Not Visited
        </button>

        {/* Visited - Paid Button */}
        <button
          type="button"
          id="btn-status-paid"
          onClick={() => onChangeStatus('paid')}
          className={`py-2 text-[10px] md:text-xs font-bold rounded-md transition-all duration-150 cursor-pointer ${
            status === 'paid'
              ? 'bg-emerald-500 text-white shadow-3xs'
              : 'text-emerald-600 dark:text-emerald-400/80 hover:bg-emerald-50 dark:hover:bg-emerald-950/20'
          }`}
        >
          Visited - Paid
        </button>

        {/* Visited - Not Paid Button */}
        <button
          type="button"
          id="btn-status-not-paid"
          onClick={() => onChangeStatus('not_paid')}
          className={`py-2 text-[10px] md:text-xs font-bold rounded-md transition-all duration-150 cursor-pointer ${
            status === 'not_paid'
              ? 'bg-amber-500 text-white shadow-3xs'
              : 'text-amber-600 dark:text-amber-400/80 hover:bg-amber-50 dark:hover:bg-amber-950/20'
          }`}
        >
          Not Paid
        </button>
      </div>

      {/* Inline reason dropdown if Visited - Not Paid is selected */}
      {status === 'not_paid' && (
        <div className="p-3 bg-amber-50/50 dark:bg-amber-950/10 border border-amber-200/50 dark:border-amber-900/30 rounded-lg space-y-1.5 animate-fade-in">
          <label className="block text-[9px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-500">
            Select Reason for Non-Payment
          </label>
          <select
            id="select-non-payment-reason"
            value={reason || ''}
            onChange={(e) => onChangeReason(e.target.value as NonPaymentReason)}
            className="w-full text-xs bg-white dark:bg-slate-900 text-slate-800 dark:text-white border border-amber-200/60 dark:border-amber-900/40 rounded-md p-1.5 focus:outline-none focus:ring-1 focus:ring-amber-500"
          >
            <option value="" disabled>-- Choose a reason --</option>
            {reasons.map((r) => (
              <option key={r.id} value={r.id}>
                {r.label}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}
