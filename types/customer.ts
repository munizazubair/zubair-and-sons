export interface Customer {
  id: string;
  name: string;
  cnic: string;
  phone: string;
  address: string;
  area: string;
  guarantor: string;
  totalAmount: number;
  installmentAmount: number;
  installmentFrequency: 'weekly' | 'monthly';
  status: 'active' | 'deactive' | 'high_risk';
  items: string[];
  createdAt: string;
}
