import { Payment } from '../types/payment';

export function getPaymentsByDateRange(payments: Payment[], startDate: string, endDate: string): Payment[] {
  return payments.filter((p) => p.date >= startDate && p.date <= endDate);
}

export function getRecordsSummary(payments: Payment[]): { total: number; count: number; uniqueCustomers: number } {
  const total = payments.reduce((sum, p) => sum + p.amount, 0);
  const uniqueCustomers = new Set(payments.map((p) => p.customerId)).size;
  return { total, count: payments.length, uniqueCustomers };
}
