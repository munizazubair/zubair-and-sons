import { Customer } from '../types/customer';
import { Payment } from '../types/payment';
import { calculateAmountPaid, calculateRemaining } from './customerCalculations';

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function exportCustomersCSV(customers: Customer[], payments: Payment[]) {
  const headers = ['Name', 'CNIC', 'Phone', 'Address', 'Area', 'Total Contract Amount', 'Paid Amount', 'Remaining Balance'];
  const rows = customers.map(c => {
    const customerPayments = payments.filter(p => p.customerId === c.id);
    const paid = calculateAmountPaid(customerPayments);
    const remaining = calculateRemaining(c.totalAmount, customerPayments);
    return [
      `"${c.name.replace(/"/g, '""')}"`,
      `"${(c.cnic || '').replace(/"/g, '""')}"`,
      `"${c.phone.replace(/"/g, '""')}"`,
      `"${c.address.replace(/"/g, '""')}"`,
      `"${c.area.replace(/"/g, '""')}"`,
      c.totalAmount,
      paid,
      remaining
    ];
  });
  const csvContent = [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  downloadBlob(blob, `customers_export_${new Date().toISOString().split('T')[0]}.csv`);
}

export function exportPaymentsCSV(payments: Payment[], customers: Customer[]) {
  const headers = ['Customer Name', 'Amount', 'Date', 'Time', 'Method', 'Note'];
  const rows = payments.map(p => {
    const customer = customers.find(c => c.id === p.customerId);
    const customerName = customer ? customer.name : p.customerName || 'Unknown';
    return [
      `"${customerName.replace(/"/g, '""')}"`,
      p.amount,
      `"${p.date}"`,
      `"${p.time || ''}"`,
      `"${p.method}"`,
      `"${(p.note || '').replace(/"/g, '""')}"`
    ];
  });
  const csvContent = [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  downloadBlob(blob, `payments_export_${new Date().toISOString().split('T')[0]}.csv`);
}

export function exportFullBackupJSON(data: any) {
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  downloadBlob(blob, `device_collection_backup_${new Date().toISOString().split('T')[0]}.json`);
}
