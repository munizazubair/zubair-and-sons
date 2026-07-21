"use client";
import React from 'react';
import Button from '../../ui/Button';

interface TodayHeaderProps {
  onBack: () => void;
  dueCount: number;
  expectedAmount: number;
  overdueCount: number;
}

export default function TodayHeader({
  onBack,
  dueCount,
  expectedAmount,
  overdueCount
}: TodayHeaderProps) {
  // Get formatted local date string e.g., "Tuesday, 14 July 2026"
  const formattedDate = new Date().toLocaleDateString('en-PK', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="space-y-4" id="today-recovery-header">
      {/* Back Button Link */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs md:text-sm font-semibold text-slate-500 hover:text-brand-orange dark:text-slate-400 dark:hover:text-brand-orange transition-colors cursor-pointer group"
        id="btn-back-to-dashboard"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          className="w-4 h-4 transform group-hover:-translate-x-0.5 transition-transform"
        >
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        Back to Dashboard
      </button>

      {/* Title & Date */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight">
            Today's Recovery
          </h2>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 font-mono mt-0.5 uppercase tracking-wider">
            🗓️ {formattedDate}
          </p>
        </div>
      </div>

      {/* Summary Strip (Quick Stat Pills) */}
      <div className="flex flex-wrap gap-2 pt-1.5 min-w-0">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-full shadow-2xs min-w-0">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
          <span className="text-xs text-slate-500 dark:text-slate-400 truncate">Due Today:</span>
          <span className="text-xs font-bold text-slate-900 dark:text-white font-mono shrink-0">{dueCount}</span>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-full shadow-2xs min-w-0">
          <span className="text-xs text-slate-500 dark:text-slate-400 truncate">Total Expected:</span>
          <span className="text-xs font-extrabold text-slate-900 dark:text-white font-mono truncate" title={`Rs. ${expectedAmount.toLocaleString()}`}>Rs. {expectedAmount.toLocaleString()}</span>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-full shadow-2xs min-w-0">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse shrink-0" />
          <span className="text-xs text-slate-500 dark:text-slate-400 truncate">Overdue:</span>
          <span className="text-xs font-bold text-rose-500 font-mono shrink-0">{overdueCount}</span>
        </div>
      </div>
    </div>
  );
}
