"use client";
import React, { useState } from 'react';
import Modal from '../../ui/Modal';
import Button from '../../ui/Button';
import { Customer } from '../../../types/customer';

interface AddToTodayModalProps {
  isOpen: boolean;
  onClose: () => void;
  customers: Customer[];
  onAdd: (customer: Customer, expectedAmount: number) => void;
}

export default function AddToTodayModal({
  isOpen,
  onClose,
  customers,
  onAdd
}: AddToTodayModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [expectedAmount, setExpectedAmount] = useState<number>(0);

  // Filter customers based on name or phone
  const filtered = searchQuery.trim() === ''
    ? []
    : customers.filter(
        (c) =>
          c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.phone.includes(searchQuery)
      );

  const handleSelectCustomer = (c: Customer) => {
    setSelectedCustomer(c);
    setExpectedAmount(c.installmentAmount);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCustomer && expectedAmount > 0) {
      onAdd(selectedCustomer, expectedAmount);
      // Reset state & close
      setSelectedCustomer(null);
      setExpectedAmount(0);
      setSearchQuery('');
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Customer to Today's List">
      <form onSubmit={handleSubmit} className="space-y-4" id="add-to-today-modal-form">
        {/* Step 1: Search Customer */}
        {!selectedCustomer ? (
          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Search Customer
            </label>
            <div className="relative">
              <input
                type="text"
                id="search-add-to-today-input"
                placeholder="Search by name or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2.5 pl-9 bg-slate-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 text-slate-800 dark:text-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/40"
                autoFocus
              />
              <span className="absolute left-3 top-3.5 text-slate-400 text-xs">🔍</span>
            </div>

            {/* List Results */}
            <div className="max-h-60 overflow-y-auto divide-y divide-gray-100 dark:divide-slate-800/50 border border-gray-100 dark:border-slate-800 rounded-lg">
              {filtered.length > 0 ? (
                filtered.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => handleSelectCustomer(c)}
                    className="w-full text-left p-3 hover:bg-slate-50 dark:hover:bg-slate-800/30 flex justify-between items-center transition-colors cursor-pointer text-xs md:text-sm"
                  >
                    <div>
                      <div className="font-bold text-slate-800 dark:text-white">{c.name}</div>
                      <div className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
                        📞 {c.phone} • 📍 {c.area}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] uppercase font-bold text-slate-400">Installment:</span>
                      <div className="font-bold text-slate-700 dark:text-slate-300 font-mono">
                        Rs. {c.installmentAmount.toLocaleString()}
                      </div>
                    </div>
                  </button>
                ))
              ) : searchQuery.trim() !== '' ? (
                <div className="p-4 text-center text-xs text-slate-400">
                  No matching customers found.
                </div>
              ) : (
                <div className="p-4 text-center text-xs text-slate-400">
                  Type a name or phone number above to search...
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Step 2: Confirm Amount & Add */
          <div className="space-y-4 animate-fade-in">
            {/* Selected Customer Card Box */}
            <div className="p-4 bg-slate-50 dark:bg-slate-950/40 rounded-xl border border-gray-100 dark:border-slate-800/60 flex justify-between items-center">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-orange">Selected Customer</span>
                <h4 className="font-bold text-slate-900 dark:text-white text-base mt-0.5">{selectedCustomer.name}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">📍 {selectedCustomer.area} • 📞 {selectedCustomer.phone}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCustomer(null)}
                className="text-xs font-bold text-rose-500 hover:underline cursor-pointer"
              >
                Change
              </button>
            </div>

            {/* Input expected collection amount */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Expected Collection Amount (Rs.)
              </label>
              <input
                type="number"
                id="input-expected-adhoc-amount"
                required
                min="1"
                value={expectedAmount || ''}
                onChange={(e) => setExpectedAmount(Number(e.target.value))}
                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 text-slate-800 dark:text-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/40"
              />
              <span className="text-[10px] text-slate-400 block pl-1">
                Defaults to this customer's scheduled installment amount.
              </span>
            </div>

            {/* Submit Action Row */}
            <div className="flex gap-2 justify-end pt-2">
              <Button type="button" variant="outline" onClick={() => setSelectedCustomer(null)}>
                Back
              </Button>
              <Button type="submit" variant="primary">
                Add to Today's List
              </Button>
            </div>
          </div>
        )}
      </form>
    </Modal>
  );
}
