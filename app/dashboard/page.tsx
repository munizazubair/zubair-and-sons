"use client";
import { useState } from 'react';
import { motion } from 'motion/react';
import TodaySummaryCard from '../../components/dashboard/TodaySummaryCard';
import StatCard from '../../components/dashboard/StatCard';
import { MOCK_DASHBOARD_STATS, MOCK_TODAY_SUMMARY } from '../../lib/mockData/dashboardStats';
import { formatCurrencyAmount } from '../../lib/calculateDashboardStats';

interface DashboardPageProps {
  onNavigateToSection?: (sectionId: string) => void;
}

export default function DashboardPage({ onNavigateToSection }: DashboardPageProps) {
  const [showDetailedBreakdown, setShowDetailedBreakdown] = useState(false);

  // Quick action mock handler for clickable collection
  const handleExpectedCollectionClick = () => {
    if (onNavigateToSection) {
      onNavigateToSection('today');
    }
  };

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-linear-to-r from-brand-orange/5 via-brand-orange/0 to-transparent p-4 md:p-6 rounded-2xl border border-brand-orange/10 dark:border-brand-orange/5"
      >
        <div>
          <h2 className="text-xl md:text-2xl font-bold font-display text-slate-800 dark:text-white">
            Collection Overview
          </h2>
          <p className="text-xs md:text-sm text-gray-500 dark:text-slate-400 mt-0.5">
            Real-time installment recoveries and customer outstanding tracking metrics.
          </p>
        </div>
        <div className="text-xs font-mono bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 py-1.5 px-3 rounded-lg text-gray-500 dark:text-slate-400">
          LAST BACKUP: 5 MINS AGO
        </div>
      </motion.div>

      {/* Main Grid: Today's Summary */}
      <div className="w-full">
        <TodaySummaryCard
          summary={MOCK_TODAY_SUMMARY}
          onExpectedCollectionClick={handleExpectedCollectionClick}
        />
      </div>

      {/* Stats Cards Row (below summary) */}
      <div className="space-y-4">
        <h3 className="font-display font-bold text-base text-slate-800 dark:text-white tracking-tight">
          Performance Indicators
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {/* Total Customers */}
          <StatCard
            label="Total Customers"
            value={MOCK_DASHBOARD_STATS.totalCustomers}
            delayIndex={1}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-5 h-5"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            }
          />

          {/* Outstanding Amount */}
          <StatCard
            label="Outstanding (Rs.)"
            value={formatCurrencyAmount(MOCK_DASHBOARD_STATS.outstandingAmount)}
            delayIndex={2}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-5 h-5"
              >
                <line x1="12" y1="1" x2="12" y2="23" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            }
          />

          {/* Due Today */}
          <StatCard
            label="Due Today"
            value={MOCK_DASHBOARD_STATS.dueTodayCount}
            delayIndex={3}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-5 h-5"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            }
          />

          {/* Overdue */}
          <StatCard
            label="Overdue"
            value={MOCK_DASHBOARD_STATS.overdueCount}
            delayIndex={4}
            highlightSeverity={MOCK_DASHBOARD_STATS.overdueCount > 0}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-5 h-5"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            }
          />
        </div>
      </div>

      {/* Interactive breakdown panel (Toggled by clicking expected collection) */}
      {showDetailedBreakdown && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="rounded-xl border border-brand-orange/30 p-6 bg-brand-orange/[0.02] dark:bg-brand-orange/[0.04]"
        >
          <div className="flex justify-between items-center mb-4">
            <div>
              <h4 className="font-display font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <span className="p-1 rounded-sm bg-brand-orange text-white text-3xs font-bold uppercase">TODAY</span>
                Expected Collection Installment Breakdown
              </h4>
              <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">
                The detailed daily recovery plan which will connect to your database in production.
              </p>
            </div>
            <button
              onClick={() => setShowDetailedBreakdown(false)}
              className="p-1 text-gray-400 hover:text-slate-700 dark:hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-5 h-5"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <table className="w-full text-left text-xs md:text-sm border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-slate-800/50 text-gray-500 dark:text-slate-400 border-b border-gray-200 dark:border-slate-800">
                  <th className="p-3 font-semibold">Customer ID</th>
                  <th className="p-3 font-semibold">Device Brand</th>
                  <th className="p-3 font-semibold">Installment Amount</th>
                  <th className="p-3 font-semibold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-slate-800/60">
                <tr className="hover:bg-gray-50/50 dark:hover:bg-slate-800/20">
                  <td className="p-3 font-mono">#DC-9281</td>
                  <td className="p-3">Samsung Galaxy S24 Ultra</td>
                  <td className="p-3 font-medium">Rs. 45,000</td>
                  <td className="p-3 text-right">
                    <span className="px-2 py-0.5 rounded-full text-3xs font-bold bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 uppercase">
                      Due Today
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50/50 dark:hover:bg-slate-800/20">
                  <td className="p-3 font-mono">#DC-9110</td>
                  <td className="p-3">iPhone 15 Pro Max</td>
                  <td className="p-3 font-medium">Rs. 30,000</td>
                  <td className="p-3 text-right">
                    <span className="px-2 py-0.5 rounded-full text-3xs font-bold bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 uppercase">
                      Due Today
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50/50 dark:hover:bg-slate-800/20">
                  <td className="p-3 font-mono">#DC-9429</td>
                  <td className="p-3">OnePlus 12R</td>
                  <td className="p-3 font-medium">Rs. 20,000</td>
                  <td className="p-3 text-right">
                    <span className="px-2 py-0.5 rounded-full text-3xs font-bold bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400 uppercase">
                      Overdue
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </div>
  );
}
