export interface TodayRecoveryEntry {
  id: string;
  customerId: string;
  customerName: string;
  area: string;
  expectedAmount: number;
  dueDate: string;
  daysOverdue: number;
  visitStatus: 'not_visited' | 'paid' | 'not_paid';
  nonPaymentReason?: 'not_home' | 'extension_requested' | 'refused' | 'other';
  isAdHoc: boolean;
}

export type VisitStatus = 'not_visited' | 'paid' | 'not_paid';

export type NonPaymentReason = 'not_home' | 'extension_requested' | 'refused' | 'other';
