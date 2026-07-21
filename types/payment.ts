export interface Payment {
  id: string;
  customerId: string;
  customerName?: string;
  amount: number;
  date: string;
  time: string;
  method: 'cash' | 'bank_transfer' | 'easypaisa' | 'other';
  note?: string;
}
