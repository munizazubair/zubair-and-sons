import { DashboardStats, TodaySummary } from '../../types/dashboard';

/**
 * Temporary mock data for Device Collection Dashboard.
 * This is isolated and clearly commented as temporary, to be replaced by dynamic data/API routes later.
 */

export const MOCK_DASHBOARD_STATS: DashboardStats = {
  totalCustomers: 342,
  outstandingAmount: 2450000, // Rs. 24,50,000
  dueTodayCount: 18,
  overdueCount: 7,
};

export const MOCK_TODAY_SUMMARY: TodaySummary = {
  dueCustomersCount: 18,
  overdueCustomersCount: 7,
  expectedCollectionAmount: 95000, // Rs. 95,000
};
