"use client";
import { useState } from 'react';
import CustomersSubPage from '@/components/dashboard/CustomersSubPage';
import { INITIAL_CUSTOMERS } from '@/lib/mockData/customers';
import { INITIAL_PAYMENTS } from '@/lib/mockData/customers';
import { Payment } from '@/types/payment';

export default function CustomersPage() {
  const [customers] = useState(INITIAL_CUSTOMERS);
  const [payments, setPayments] = useState(INITIAL_PAYMENTS);

  const handleAddPayment = (
    customerId: string,
    amount: number,
    date: string,
    method: Payment['method'],
    note?: string
  ) => {
    const now = new Date();
    const time = now.toTimeString().slice(0, 5); // "HH:MM"

    const newPayment: Payment = {
      id: `pay-${Date.now()}`,
      customerId,
      amount,
      date,
      time,
      method,
      note,
    };

    setPayments((prev) => [...prev, newPayment]);
  };

  const handleDeletePayment = (paymentId: string) => {
    setPayments((prev) => prev.filter((p) => p.id !== paymentId));
  };

  return (
    <CustomersSubPage
      customers={customers}
      payments={payments}
      onAddPayment={handleAddPayment}
      onDeletePayment={handleDeletePayment}
    />
  );
}