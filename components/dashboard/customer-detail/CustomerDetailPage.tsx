"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Customer } from '../../../types/customer';
import { Payment } from '../../../types/payment';
import DetailHeader from './DetailHeader';
import CardViewToggle from './CardViewToggle';
import InfoGrid from './ModernView/InfoGrid';
import PurchasedItemsSummary from './ModernView/PurchasedItemsSummary';
import PaymentHistoryTable from './ModernView/PaymentHistoryTable';
import TraditionalCard from './TraditionalView/TraditionalCard';
import QuickActionsBar from './QuickActionsBar';
import CustomPaymentModal from './CustomPaymentModal';
import { calculateRemaining, calculateMarkAsPaidAmount } from '../../../lib/customerCalculations';

interface CustomerDetailPageProps {
  key?: string;
  customer: Customer;
  payments: Payment[];
  onBack: () => void;
  onAddPayment: (customerId: string, amount: number, date: string, method: Payment['method'], note?: string) => void;
  onDeletePayment: (paymentId: string) => void;
}

export default function CustomerDetailPage({
  customer,
  payments,
  onBack,
  onAddPayment,
  onDeletePayment
}: CustomerDetailPageProps) {
  // Always defaults to Traditional Card every time a customer detail page loads
  const [viewMode, setViewMode] = useState<'traditional' | 'modern'>('traditional');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const customerPayments = payments.filter((p) => p.customerId === customer.id);
  const remaining = calculateRemaining(customer.totalAmount, customerPayments);

  // Mark as Paid logic:
  // paymentAmount = Math.min(installmentAmount, remainingBalance);
  // date = today, time = current time
  const handleMarkAsPaid = () => {
    if (remaining <= 0) return;
    const payAmount = calculateMarkAsPaidAmount(customer.installmentAmount, remaining);
    
    const today = new Date();
    const offset = today.getTimezoneOffset();
    const localToday = new Date(today.getTime() - offset * 60 * 1000);
    const dateStr = localToday.toISOString().split('T')[0];
    
    // Auto captured current time
    const hours = String(today.getHours()).padStart(2, '0');
    const minutes = String(today.getMinutes()).padStart(2, '0');
    const timeStr = `${hours}:${minutes}`;

    onAddPayment(customer.id, payAmount, dateStr, 'cash', 'Quick installment mark-as-paid');
  };

  const handleAddCustomPayment = (
    amount: number,
    date: string,
    method: Payment['method'],
    note: string
  ) => {
    onAddPayment(customer.id, amount, date, method, note);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
      id={`customer-detail-page-${customer.id}`}
    >
      {/* Detail Header & Subtitle */}
      <DetailHeader onBack={onBack} customerName={customer.name} />

      {/* Pill Toggle View */}
      <CardViewToggle viewMode={viewMode} onChange={setViewMode} />

      {/* Main Content Area with active crossfade view switch */}
      <div className="relative min-h-[300px]" id="detail-card-viewport">
        <AnimatePresence mode="wait">
          {viewMode === 'traditional' ? (
            <motion.div
              key="traditional"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <TraditionalCard
                customer={customer}
                payments={payments}
                onDeletePayment={onDeletePayment}
              />
            </motion.div>
          ) : (
            <motion.div
              key="modern"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            >
              {/* Left Column (2/3 width on wide) */}
              <div className="lg:col-span-2 space-y-6">
                <InfoGrid customer={customer} />
                <PaymentHistoryTable
                  payments={customerPayments}
                  onDeletePayment={onDeletePayment}
                />
              </div>

              {/* Right Column (1/3 width on wide) */}
              <div className="space-y-6">
                <PurchasedItemsSummary customer={customer} payments={payments} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Quick Cash Desk Actions (Mark as Paid, Add Custom, Call) */}
      <QuickActionsBar
        customer={customer}
        remaining={remaining}
        onMarkAsPaid={handleMarkAsPaid}
        onOpenCustomPayment={() => setIsModalOpen(true)}
      />

      {/* Custom Payment Modal */}
      <CustomPaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        remaining={remaining}
        onAddPayment={handleAddCustomPayment}
      />
    </motion.div>
  );
}
