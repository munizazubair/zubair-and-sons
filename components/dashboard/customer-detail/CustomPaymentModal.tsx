"use client";
import React, { useState, useEffect } from 'react';

interface CustomPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  remaining: number;
  onAddPayment: (amount: number, date: string, method: 'cash' | 'bank_transfer' | 'easypaisa' | 'other', note: string) => void;
  defaultAmount?: number;
}

export default function CustomPaymentModal({
  isOpen,
  onClose,
  remaining,
  onAddPayment,
  defaultAmount
}: CustomPaymentModalProps) {
  const [amount, setAmount] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [method, setMethod] = useState<'cash' | 'bank_transfer' | 'easypaisa' | 'other'>('cash');
  const [note, setNote] = useState<string>('');
  const [error, setError] = useState<string>('');

  // Set default date to today in local timezone format (YYYY-MM-DD)
  useEffect(() => {
    if (isOpen) {
      const today = new Date();
      const offset = today.getTimezoneOffset();
      const localToday = new Date(today.getTime() - offset * 60 * 1000);
      setDate(localToday.toISOString().split('T')[0]);
      setAmount(defaultAmount ? String(defaultAmount) : '');
      setMethod('cash');
      setNote('');
      setError('');
    }
  }, [isOpen, defaultAmount]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setError('Please enter a valid positive number for amount.');
      return;
    }

    if (parsedAmount > remaining) {
      setError(`Amount cannot exceed the remaining balance of Rs. ${remaining.toLocaleString()}.`);
      return;
    }

    if (!date) {
      setError('Please select a payment date.');
      return;
    }

    onAddPayment(parsedAmount, date, method, note);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs font-sans"
      id="custom-payment-modal-overlay"
      onClick={onClose}
    >
      <div
        id="custom-payment-modal-card"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-2xl p-6 relative flex flex-col gap-4 animate-scale-up"
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
          <h3 className="font-display font-bold text-slate-800 dark:text-white text-base md:text-lg flex items-center gap-2">
            <span>➕</span>
            <span>Add Custom Payment</span>
          </h3>
          <button
            id="btn-close-payment-modal"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg transition-colors cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 rounded-lg text-xs font-semibold flex items-center gap-1.5 border border-rose-100 dark:border-rose-900/30">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {/* Amount input */}
          <div className="space-y-1">
            <label className="block text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider text-[10px]">
              Payment Amount (Rs.)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">Rs.</span>
              <input
                id="input-payment-amount"
                type="number"
                step="any"
                required
                placeholder={`Max Rs. ${remaining.toLocaleString()}`}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 text-slate-800 dark:text-white rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-brand-orange/40 focus:border-brand-orange transition-all"
              />
            </div>
          </div>

          {/* Date input */}
          <div className="space-y-1">
            <label className="block text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider text-[10px]">
              Payment Date
            </label>
            <input
              id="input-payment-date"
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 text-slate-800 dark:text-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/40 focus:border-brand-orange transition-all"
            />
          </div>

          {/* Payment Method select */}
          <div className="space-y-1">
            <label className="block text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider text-[10px]">
              Payment Method
            </label>
            <select
              id="select-payment-method"
              value={method}
              onChange={(e) => setMethod(e.target.value as any)}
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 text-slate-800 dark:text-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/40 focus:border-brand-orange transition-all cursor-pointer"
            >
              <option value="cash">💵 Cash</option>
              <option value="bank_transfer">🏛️ Bank Transfer</option>
              <option value="easypaisa">📱 Easypaisa</option>
              <option value="other">💳 Other Card/Channel</option>
            </select>
          </div>

          {/* Optional Note */}
          <div className="space-y-1">
            <label className="block text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider text-[10px]">
              Note / Reference (Optional)
            </label>
            <input
              id="input-payment-note"
              type="text"
              placeholder="e.g. Received by Haris, Bank receipt #123"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 text-slate-800 dark:text-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/40 focus:border-brand-orange transition-all"
            />
          </div>

          {/* Action buttons */}
          <div className="flex gap-2.5 pt-2">
            <button
              id="btn-cancel-custom-payment"
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold rounded-xl text-xs md:text-sm cursor-pointer transition-all"
            >
              Cancel
            </button>
            <button
              id="btn-save-custom-payment"
              type="submit"
              className="flex-1 py-2.5 bg-brand-orange hover:bg-brand-orange/95 text-white font-bold rounded-xl text-xs md:text-sm cursor-pointer shadow-sm hover:shadow-md transition-all"
            >
              Save Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
