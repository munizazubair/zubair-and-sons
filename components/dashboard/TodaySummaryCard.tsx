"use client";
import { motion } from 'motion/react';
import { TodaySummary } from '../../types/dashboard';
import { formatCurrencyAmount, getOverdueSeverityColor } from '../../lib/calculateDashboardStats';

interface TodaySummaryCardProps {
  summary: TodaySummary;
  onExpectedCollectionClick?: () => void;
}

export default function TodaySummaryCard({
  summary,
  onExpectedCollectionClick,
}: TodaySummaryCardProps) {
  const isOverdueAlert = summary.overdueCustomersCount > 0;

  return (
    <motion.div
      id="today-summary-card"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      whileHover={{ y: -2 }}
      className="rounded-xl border border-gray-200 dark:border-slate-800 p-8 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      {/* Heading */}
      <div className="flex items-center gap-2 mb-6 text-lg font-bold text-slate-800 dark:text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6 text-brand-orange"
        >
          <path d="M12 3l9 9-9 9-9-9 9-9z" />
        </svg>
        Today's Summary
      </div>

      {/* Bullet Lines */}
      <div className="space-y-4 font-sans text-slate-700 dark:text-slate-300">
        {/* Line 1: Due Today */}
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600 flex-shrink-0" />
          <p className="text-sm md:text-base">
            Aaj <span className="font-bold text-slate-950 dark:text-white">{summary.dueCustomersCount}</span> customers due hain.
          </p>
        </div>

        {/* Line 2: Overdue */}
        <div className="flex items-center gap-3">
          <div className={`w-2 h-2 rounded-full flex-shrink-0 ${summary.overdueCustomersCount > 0 ? 'bg-amber-500' : 'bg-slate-300 dark:bg-slate-600'}`} />
          <p className="text-sm md:text-base">
            <span className={getOverdueSeverityColor(summary.overdueCustomersCount)}>
              {summary.overdueCustomersCount}
            </span>{' '}
            customers overdue hain.
          </p>
        </div>

        {/* Line 3: Expected Collection (Clickable) */}
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-brand-orange flex-shrink-0" />
          <div
            onClick={onExpectedCollectionClick}
            className="group cursor-pointer hover:text-brand-orange transition-colors duration-200"
            role="button"
            tabIndex={0}
            title="Click to view recovery list"
          >
            <p className="text-sm md:text-base hover:underline transition-all duration-200">
              Expected collection:{' '}
              <span className="font-bold text-slate-950 dark:text-white group-hover:text-brand-orange">
                {formatCurrencyAmount(summary.expectedCollectionAmount)}
              </span>
            </p>
            <p className="text-[10px] text-gray-400 dark:text-slate-500 font-mono mt-0.5 group-hover:text-brand-orange/80 transition-colors">
              → Click to view due customer list
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
