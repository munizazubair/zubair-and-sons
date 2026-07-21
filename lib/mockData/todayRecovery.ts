import { TodayRecoveryEntry } from '../../types/recovery';

// MOCK DATA for Today's Recovery Operations (temporary, matches real schema/structure)
export const INITIAL_TODAY_RECOVERY: TodayRecoveryEntry[] = [
  {
    id: 'rec-1',
    customerId: 'cust-1',
    customerName: 'Muhammad Ali',
    area: 'North Karachi',
    expectedAmount: 2000,
    dueDate: '2026-07-14',
    daysOverdue: 0,
    visitStatus: 'not_visited',
    isAdHoc: false
  },
  {
    id: 'rec-2',
    customerId: 'cust-2',
    customerName: 'Zubair Shah',
    area: 'Gulshan-e-Iqbal',
    expectedAmount: 1500,
    dueDate: '2026-07-14',
    daysOverdue: 0,
    visitStatus: 'paid',
    isAdHoc: false
  },
  {
    id: 'rec-3',
    customerId: 'cust-3',
    customerName: 'Bilal Siddiqui',
    area: 'Saddar',
    expectedAmount: 2500,
    dueDate: '2026-07-10',
    daysOverdue: 4,
    visitStatus: 'not_paid',
    nonPaymentReason: 'not_home',
    isAdHoc: false
  },
  {
    id: 'rec-4',
    customerId: 'cust-5',
    customerName: 'Aisha Omar',
    area: 'DHA',
    expectedAmount: 1800,
    dueDate: '2026-07-14',
    daysOverdue: 0,
    visitStatus: 'paid',
    isAdHoc: false
  },
  {
    id: 'rec-5',
    customerId: 'cust-6',
    customerName: 'Farhan Saeed',
    area: 'North Karachi',
    expectedAmount: 1200,
    dueDate: '2026-07-13',
    daysOverdue: 1,
    visitStatus: 'not_visited',
    isAdHoc: false
  },
  {
    id: 'rec-6',
    customerId: 'cust-7',
    customerName: 'Sana Zubair',
    area: 'Gulshan-e-Iqbal',
    expectedAmount: 1000,
    dueDate: '2026-07-14',
    daysOverdue: 0,
    visitStatus: 'not_visited',
    isAdHoc: false
  },
  {
    id: 'rec-7',
    customerId: 'cust-8',
    customerName: 'Yasir Arafat',
    area: 'Saddar',
    expectedAmount: 1300,
    dueDate: '2026-07-09',
    daysOverdue: 5,
    visitStatus: 'not_visited',
    isAdHoc: false
  }
];

// Reusable mock list of additional customers available to add as ad-hoc
export const ADDITIONAL_POTENTIAL_CUSTOMERS = [
  {
    id: 'cust-9',
    name: 'Kashif Jameel',
    phone: '0333-8884422',
    area: 'Gulshan-e-Iqbal',
    installmentAmount: 1600
  },
  {
    id: 'cust-10',
    name: 'Noman Sheikh',
    phone: '0315-7771122',
    area: 'North Karachi',
    installmentAmount: 1400
  },
  {
    id: 'cust-11',
    name: 'Mariam Baig',
    phone: '0346-5553311',
    area: 'DHA',
    installmentAmount: 2200
  }
];
