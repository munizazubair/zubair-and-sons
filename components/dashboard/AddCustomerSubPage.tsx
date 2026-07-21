"use client";
import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Customer } from '../../types/customer';

interface AddCustomerSubPageProps {
  onAddCustomer?: (customer: Customer) => void;
  onSuccess?: () => void;
}

export default function AddCustomerSubPage({ onAddCustomer, onSuccess }: AddCustomerSubPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    device: '',
    price: '',
    downPayment: '',
    installment: '',
    months: '6',
  });

  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Validate
    if (!formData.name || !formData.phone || !formData.device || !formData.price) {
      return;
    }

    if (onAddCustomer) {
      const parsedPrice = parseFloat(formData.price) || 0;
      const parsedDown = parseFloat(formData.downPayment) || 0;
      const remainingBalance = Math.max(0, parsedPrice - parsedDown);
      const parsedInstallment = parseFloat(formData.installment) || Math.round(remainingBalance / (parseInt(formData.months) || 6));

      const newCust: Customer = {
        id: `cust-${Date.now()}`,
        name: formData.name,
        cnic: '42101-' + Math.floor(1000000 + Math.random() * 9000000) + '-1',
        phone: formData.phone,
        address: 'House/Shop in Sector ' + Math.floor(1 + Math.random() * 15) + ', Karachi',
        area: 'Saddar',
        guarantor: 'Rashid Ahmed (0312-5555555)',
        totalAmount: remainingBalance,
        installmentAmount: parsedInstallment || 5000,
        installmentFrequency: 'monthly',
        status: 'active',
        items: [formData.device],
        createdAt: new Date().toISOString().split('T')[0]
      };

      onAddCustomer(newCust);
    }

    setIsSuccess(true);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      phone: '',
      device: '',
      price: '',
      downPayment: '',
      installment: '',
      months: '6',
    });
    setIsSuccess(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 max-w-2xl mx-auto"
    >
      <div>
        <h2 className="text-xl md:text-2xl font-bold font-display text-slate-800 dark:text-white">
          Onboard New Customer
        </h2>
        <p className="text-xs md:text-sm text-gray-500 dark:text-slate-400">
          Set up a new installment profiles. Ensure all phone and pricing fields are filled exactly.
        </p>
      </div>

      {isSuccess ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-xl border border-emerald-200 dark:border-emerald-900/30 bg-emerald-500/5 dark:bg-emerald-950/20 p-8 text-center space-y-4"
        >
          <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              className="w-6 h-6"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <div>
            <h3 className="font-display font-bold text-lg text-slate-800 dark:text-white">
              Customer Onboarded Successfully
            </h3>
            <p className="text-sm text-gray-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
              {formData.name}'s profile has been logged for {formData.device}. First installment is scheduled next month.
            </p>
          </div>
          <div className="pt-2">
            <button
              onClick={handleReset}
              className="py-2 px-5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold cursor-pointer transition-colors duration-200 shadow-sm"
            >
              Onboard Another Customer
            </button>
          </div>
        </motion.div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-gray-200 dark:border-slate-800 p-6 md:p-8 bg-white dark:bg-slate-900 shadow-2xs space-y-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Full Name */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Full Name *
              </label>
              <input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Zeeshan Khan"
                className="w-full bg-slate-50 dark:bg-slate-950 text-xs md:text-sm p-3 rounded-lg border border-gray-200 dark:border-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-orange/40"
              />
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="phone" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Phone Number *
              </label>
              <input
                id="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 XXXXX XXXXX"
                className="w-full bg-slate-50 dark:bg-slate-950 text-xs md:text-sm p-3 rounded-lg border border-gray-200 dark:border-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-orange/40"
              />
            </div>

            {/* Device */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="device" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Device Model *
              </label>
              <input
                id="device"
                type="text"
                required
                value={formData.device}
                onChange={(e) => setFormData({ ...formData, device: e.target.value })}
                placeholder="iPhone 15 Pro Max, Samsung S24"
                className="w-full bg-slate-50 dark:bg-slate-950 text-xs md:text-sm p-3 rounded-lg border border-gray-200 dark:border-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-orange/40"
              />
            </div>

            {/* Retail Price */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="price" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Retail Price (Rs.) *
              </label>
              <input
                id="price"
                type="number"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="120000"
                className="w-full bg-slate-50 dark:bg-slate-950 text-xs md:text-sm p-3 rounded-lg border border-gray-200 dark:border-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-orange/40"
              />
            </div>

            {/* Down Payment */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="downPayment" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Down Payment (Rs.)
              </label>
              <input
                id="downPayment"
                type="number"
                value={formData.downPayment}
                onChange={(e) => setFormData({ ...formData, downPayment: e.target.value })}
                placeholder="25000"
                className="w-full bg-slate-50 dark:bg-slate-950 text-xs md:text-sm p-3 rounded-lg border border-gray-200 dark:border-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-orange/40"
              />
            </div>

            {/* Monthly Installment */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="installment" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Monthly Installment (Rs.)
              </label>
              <input
                id="installment"
                type="number"
                value={formData.installment}
                onChange={(e) => setFormData({ ...formData, installment: e.target.value })}
                placeholder="15000"
                className="w-full bg-slate-50 dark:bg-slate-950 text-xs md:text-sm p-3 rounded-lg border border-gray-200 dark:border-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-orange/40"
              />
            </div>

            {/* Tenure Select */}
            <div className="flex flex-col col-span-1 sm:col-span-2 gap-1.5">
              <label htmlFor="months" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Tenure Period (Months)
              </label>
              <select
                id="months"
                value={formData.months}
                onChange={(e) => setFormData({ ...formData, months: e.target.value })}
                className="w-full bg-slate-50 dark:bg-slate-950 text-xs md:text-sm p-3 rounded-lg border border-gray-200 dark:border-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-orange/40"
              >
                <option value="3">3 Months Plan</option>
                <option value="6">6 Months Plan</option>
                <option value="9">9 Months Plan</option>
                <option value="12">12 Months Plan</option>
                <option value="18">18 Months Plan</option>
              </select>
            </div>
          </div>

          <div className="pt-3 border-t border-gray-100 dark:border-slate-800/60 flex justify-end gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="py-2.5 px-5 border border-gray-200 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-lg text-xs font-semibold cursor-pointer transition-colors"
            >
              Clear Fields
            </button>
            <button
              type="submit"
              className="py-2.5 px-6 bg-brand-orange hover:bg-brand-orange-hover text-white rounded-lg text-xs font-semibold cursor-pointer transition-colors shadow-sm shadow-brand-orange/20"
            >
              Add Customer Account
            </button>
          </div>
        </form>
      )}
    </motion.div>
  );
}
