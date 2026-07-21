import { Customer } from '../../types/customer';
import { Payment } from '../../types/payment';

export const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: 'cust-1',
    name: 'Muhammad Ali',
    cnic: '42101-1234567-1',
    phone: '0300-1234567',
    address: 'House 123, Street 5, Sector 11-A, North Karachi',
    area: 'North Karachi',
    guarantor: 'Kashif Khan (0321-9876543)',
    totalAmount: 150000,
    installmentAmount: 10000,
    installmentFrequency: 'monthly',
    status: 'active',
    items: ['Samsung Galaxy S24 Ultra', 'Silicone Protective Cover'],
    createdAt: '2026-01-10'
  },
  {
    id: 'cust-2',
    name: 'Zubair Shah',
    cnic: '42201-9876543-3',
    phone: '0312-3456789',
    address: 'Flat B-402, Al-Ghafoor Heights, Gulshan-e-Iqbal',
    area: 'Gulshan-e-Iqbal',
    guarantor: 'Imran Shah (0333-1112223)',
    totalAmount: 85000,
    installmentAmount: 5000,
    installmentFrequency: 'weekly',
    status: 'active',
    items: ['HP EliteBook 840 G8'],
    createdAt: '2026-03-05'
  },
  {
    id: 'cust-3',
    name: 'Bilal Siddiqui',
    cnic: '42301-4445556-5',
    phone: '0321-8889990',
    address: 'Shop 4, Bilal Mobile Market, Saddar',
    area: 'Saddar',
    guarantor: 'Farooq Siddiqui (0345-5556667)',
    totalAmount: 210000,
    installmentAmount: 15000,
    installmentFrequency: 'monthly',
    status: 'high_risk',
    items: ['iPhone 15 Pro Max', 'Apple Charger 20W'],
    createdAt: '2025-11-15'
  },
  {
    id: 'cust-4',
    name: 'Haris Khan',
    cnic: '42101-7778889-9',
    phone: '0334-1239876',
    address: 'House C-55, Malir Cantt, Karachi',
    area: 'Malir',
    guarantor: 'Sajid Ali (0300-4443322)',
    totalAmount: 110000,
    installmentAmount: 8000,
    installmentFrequency: 'monthly',
    status: 'deactive',
    items: ['iPad Air 5th Gen'],
    createdAt: '2025-08-20'
  },
  {
    id: 'cust-5',
    name: 'Aisha Omar',
    cnic: '42401-2223334-4',
    phone: '0345-6789012',
    address: 'House 78, DHA Phase 6',
    area: 'DHA',
    guarantor: 'Omar Yousuf (0321-7778889)',
    totalAmount: 320000,
    installmentAmount: 25000,
    installmentFrequency: 'monthly',
    status: 'active',
    items: ['MacBook Pro M3 14"'],
    createdAt: '2026-02-12'
  }
];

export const INITIAL_PAYMENTS: Payment[] = [
  {
    id: 'pay-1',
    customerId: 'cust-1',
    amount: 10000,
    date: '2026-02-10',
    time: '14:30',
    method: 'cash',
    note: 'First installment received'
  },
  {
    id: 'pay-2',
    customerId: 'cust-1',
    amount: 10000,
    date: '2026-03-10',
    time: '15:15',
    method: 'bank_transfer',
    note: 'Second installment transferred via HBL'
  },
  {
    id: 'pay-3',
    customerId: 'cust-2',
    amount: 5000,
    date: '2026-03-12',
    time: '11:00',
    method: 'easypaisa',
    note: 'Weekly installment'
  },
  {
    id: 'pay-4',
    customerId: 'cust-2',
    amount: 5000,
    date: '2026-03-19',
    time: '18:45',
    method: 'easypaisa'
  },
  {
    id: 'pay-5',
    customerId: 'cust-3',
    amount: 15000,
    date: '2025-12-15',
    time: '13:00',
    method: 'cash'
  },
  {
    id: 'pay-6',
    customerId: 'cust-3',
    amount: 15000,
    date: '2026-01-15',
    time: '14:10',
    method: 'cash'
  }
];
