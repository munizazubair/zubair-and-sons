import { Payment } from '../types/payment';

/**
 * Calculates total paid amount from payments list.
 */
export function calculateAmountPaid(payments: Payment[]): number {
  return payments.reduce((sum, p) => sum + p.amount, 0);
}

/**
 * Calculates remaining balance for a customer contract.
 */
export function calculateRemaining(totalAmount: number, payments: Payment[]): number {
  const remaining = totalAmount - calculateAmountPaid(payments);
  return remaining > 0 ? remaining : 0;
}

/**
 * Calculates the installment amount to collect, capped by the remaining balance.
 */
export function calculateMarkAsPaidAmount(installmentAmount: number, remaining: number): number {
  return Math.min(installmentAmount, remaining);
}

/**
 * Calculates the number of days a payment is overdue based on the due date.
 * If the due date is in the future or today, returns 0.
 * @param dueDate YYYY-MM-DD date string
 */
export function calculateDaysOverdue(dueDate: string): number {
  if (!dueDate) return 0;
  
  // Create Date objects in local timezone context to prevent timezone offset mismatch
  const [dueYear, dueMonth, dueDay] = dueDate.split('-').map(Number);
  const due = new Date(dueYear, dueMonth - 1, dueDay, 0, 0, 0, 0);

  const today = new Date();
  const todayReset = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0);

  const diffTime = todayReset.getTime() - due.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  return diffDays > 0 ? diffDays : 0;
}

/**
 * Calculates outstanding collection amount for a customer (alias of calculateRemaining).
 */
export function calculateOutstanding(totalAmount: number, payments: Payment[]): number {
  return calculateRemaining(totalAmount, payments);
}
