"use client";
import { useRouter } from 'next/navigation';
import RecordsSubPage from '@/components/dashboard/records/RecordsSubPage';
import { INITIAL_PAYMENTS, INITIAL_CUSTOMERS } from '@/lib/mockData/customers';

export default function RecordsPage() {
  const router = useRouter();

  const handleNavigateToCustomer = (customerId: string) => {
    router.push(`/dashboard/customers?id=${customerId}`);
  };

  return (
    <RecordsSubPage
      customers={INITIAL_CUSTOMERS}
      payments={INITIAL_PAYMENTS}
      onNavigateToCustomer={handleNavigateToCustomer}
    />
  );
}