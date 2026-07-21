import { DashboardStats } from '../types/dashboard';

/**
 * Formats a number amount into Rs. currency format.
 * Example: 2450000 -> "Rs. 24,50,000" or similar readable format.
 * 
 * @param amount The numeric amount to format
 * @returns Formatted currency string
 */
export function formatCurrencyAmount(amount: number): string {
  // Indian currency formatting style (Lakhs/Crores) is standard for Rs.
  // We can use standard locale formatting for consistency
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount).replace('INR', 'Rs.');
}

/**
 * Calculates the percentage of customers who are overdue.
 * 
 * @param stats The dashboard stats object
 * @returns The percentage value (0-100)
 */
export function calculateOverduePercentage(stats: DashboardStats): number {
  if (stats.totalCustomers === 0) return 0;
  return Math.round((stats.overdueCount / stats.totalCustomers) * 100);
}

/**
 * Determines severity color classes based on overdue count.
 * 
 * @param count The overdue customer count
 * @returns Tailwind text class corresponding to severity level
 */
export function getOverdueSeverityColor(count: number): string {
  if (count === 0) return 'text-emerald-500 dark:text-emerald-400';
  if (count < 5) return 'text-amber-500 dark:text-amber-400';
  return 'text-rose-500 dark:text-rose-400 font-bold';
}
