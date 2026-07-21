import React from 'react';

interface ReconciliationSummaryProps {
  expected: number;
  collected: number;
  pending: number;
  visitedAndPaidCount: number;
  visitedAndNotPaidCount: number;
  notVisitedCount: number;
}

export default function ReconciliationSummary({
  expected,
  collected,
  pending,
  visitedAndPaidCount,
  visitedAndNotPaidCount,
  notVisitedCount
}: ReconciliationSummaryProps) {
  // Calculate percentage progress
  const percentage = expected > 0 ? Math.min(100, Math.max(0, (collected / expected) * 100)) : 0;

  return (
    <div
      className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl p-5 md:p-6 shadow-sm space-y-5"
      id="reconciliation-summary-section"
    >
      {/* Title */}
      <div>
        <h3 className="font-display font-bold text-sm text-slate-800 dark:text-white uppercase tracking-wider flex items-center gap-2">
          🏁 End-of-Day Reconciliation
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Live collection progress and ledger summary
        </p>
      </div>

      {/* Aggregate Math flow */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 text-center bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-gray-100 dark:border-slate-800/40 font-mono min-w-0 overflow-hidden">
        <div className="flex-1 min-w-0">
          <span className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">Target expected</span>
          <span className="text-sm md:text-base font-extrabold text-slate-700 dark:text-slate-300 block truncate" title={`Rs. ${expected.toLocaleString()}`}>
            Rs. {expected.toLocaleString()}
          </span>
        </div>
        <div className="flex items-center justify-center text-slate-300 dark:text-slate-700 font-sans font-bold text-base rotate-90 md:rotate-0 shrink-0">
          →
        </div>
        <div className="flex-1 min-w-0">
          <span className="block text-[10px] font-bold text-emerald-500 uppercase">Actual Collected</span>
          <span className="text-sm md:text-base font-extrabold text-emerald-600 dark:text-emerald-400 block truncate" title={`Rs. ${collected.toLocaleString()}`}>
            Rs. {collected.toLocaleString()}
          </span>
        </div>
        <div className="flex items-center justify-center text-slate-300 dark:text-slate-700 font-sans font-bold text-base rotate-90 md:rotate-0 shrink-0">
          →
        </div>
        <div className="flex-1 min-w-0">
          <span className="block text-[10px] font-bold text-amber-500 uppercase">Pending collection</span>
          <span className="text-sm md:text-base font-extrabold text-amber-600 dark:text-amber-500 block truncate" title={`Rs. ${pending.toLocaleString()}`}>
            Rs. {pending.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Progress Track */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs">
          <span className="font-semibold text-slate-500 dark:text-slate-400">Collection progress</span>
          <span className="font-bold text-brand-orange font-mono">{percentage.toFixed(0)}% Achieved</span>
        </div>
        <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-brand-orange rounded-full transition-all duration-500 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Visited counters breakdown */}
      <div className="grid grid-cols-3 gap-3 text-center border-t border-gray-100 dark:border-slate-800/50 pt-4 text-xs font-sans">
        <div className="space-y-1">
          <span className="block text-emerald-600 dark:text-emerald-400 font-extrabold text-lg font-mono">
            {visitedAndPaidCount}
          </span>
          <span className="text-[10px] md:text-xs text-slate-400 dark:text-slate-500 font-medium">Visited & paid</span>
        </div>

        <div className="space-y-1">
          <span className="block text-amber-500 dark:text-amber-400 font-extrabold text-lg font-mono">
            {visitedAndNotPaidCount}
          </span>
          <span className="text-[10px] md:text-xs text-slate-400 dark:text-slate-500 font-medium">Visited but unpaid</span>
        </div>

        <div className="space-y-1">
          <span className="block text-slate-400 dark:text-slate-500 font-extrabold text-lg font-mono">
            {notVisitedCount}
          </span>
          <span className="text-[10px] md:text-xs text-slate-400 dark:text-slate-500 font-medium">Not visited yet</span>
        </div>
      </div>
    </div>
  );
}
