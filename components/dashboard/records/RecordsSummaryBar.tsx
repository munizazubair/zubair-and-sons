import React from 'react';

interface RecordsSummaryBarProps {
  totalCollected: number;
  expectedCollection: number;
}

export default function RecordsSummaryBar({
  totalCollected,
  expectedCollection
}: RecordsSummaryBarProps) {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full"
      id="records-summary-bar"
    >
      {/* Total Collected Pill */}
      <div className="flex items-center gap-3 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800/80 rounded-xl p-4 shadow-2xs min-w-0 overflow-hidden">
        <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0 text-lg font-bold shrink-0">
          Rs.
        </div>
        <div className="min-w-0">
          <span className="block text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider text-[9px] truncate">Total Collected</span>
          <span className="text-sm xs:text-base md:text-lg font-extrabold text-slate-800 dark:text-white font-mono block truncate" title={`Rs. ${totalCollected.toLocaleString()}`}>
            Rs. {totalCollected.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Expected Collection Pill */}
      <div className="flex items-center gap-3 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800/80 rounded-xl p-4 shadow-2xs min-w-0 overflow-hidden">
        <div className="w-10 h-10 rounded-lg bg-brand-orange/10 text-brand-orange flex items-center justify-center flex-shrink-0 text-lg shrink-0">
          📈
        </div>
        <div className="min-w-0">
          <span className="block text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider text-[9px] truncate">Expected Collection</span>
          <span className="text-sm xs:text-base md:text-lg font-extrabold text-slate-800 dark:text-white font-mono block truncate" title={`Rs. ${expectedCollection.toLocaleString()}`}>
            Rs. {expectedCollection.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
