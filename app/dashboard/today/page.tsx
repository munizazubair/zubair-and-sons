'use client';

import React from 'react';
import TodayRecoverySubPage from '../../../components/dashboard/today/TodayRecoverySubPage';
import { INITIAL_CUSTOMERS, INITIAL_PAYMENTS } from '../../../lib/mockData/customers';

export default function TodayRecoveryPage() {
  // Safe default callbacks for direct NextJS routing fallback context
  const handleAddPaymentMock = (
    customerId: string,
    amount: number,
    date: string,
    method: 'cash' | 'bank_transfer' | 'easypaisa' | 'other',
    note?: string
  ) => {
    console.log('Record Payment ad-hoc:', { customerId, amount, date, method, note });
  };

  const handleNavigateToCustomerMock = (customerId: string) => {
    console.log('Navigate to customer detailed page:', customerId);
  };

  const handleBackToDashboardMock = () => {
    if (typeof window !== 'undefined') {
      window.history.back();
    }
  };

  return (
    <div className="p-1 md:p-4">
      <TodayRecoverySubPage
        customers={INITIAL_CUSTOMERS}
        payments={INITIAL_PAYMENTS}
        onAddPayment={handleAddPaymentMock}
        onNavigateToCustomer={handleNavigateToCustomerMock}
        onBack={handleBackToDashboardMock}
      />
    </div>
  );
}
