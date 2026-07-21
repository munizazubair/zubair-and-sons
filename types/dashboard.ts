export interface DashboardStats {
  totalCustomers: number;
  outstandingAmount: number; // in Rs.
  dueTodayCount: number;
  overdueCount: number;
}

export interface TodaySummary {
  dueCustomersCount: number;
  overdueCustomersCount: number;
  expectedCollectionAmount: number; // in Rs.
}

export type SidebarNavId = 'dashboard' | 'customers' | 'recovery' | 'records' | 'today' | 'add-customer' | 'settings';

export interface SidebarItem {
  id: SidebarNavId;
  label: string;
  path: string;
}
