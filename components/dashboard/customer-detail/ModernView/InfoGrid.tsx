import React from 'react';
import { Customer } from '../../../../types/customer';

interface InfoGridProps {
  customer: Customer;
}

export default function InfoGrid({ customer }: InfoGridProps) {
  const infoFields = [
    { label: 'CNIC Number', value: customer.cnic, icon: '🪪' },
    { label: 'Mobile Number', value: customer.phone, icon: '📱' },
    { label: 'Registered Area', value: customer.area, icon: '📍' },
    { label: 'Residential Address', value: customer.address, icon: '🏠', spanFull: true },
    { label: 'Guarantor Information', value: customer.guarantor, icon: '🤝', spanFull: true },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-4" id="customer-info-grid">
      <h3 className="font-display font-bold text-slate-800 dark:text-white text-base border-b border-slate-100 dark:border-slate-800/60 pb-3 flex items-center gap-2">
        <svg className="w-5 h-5 text-brand-orange" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
        </svg>
        Customer Profile Details
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {infoFields.map((field, idx) => (
          <div
            key={idx}
            className={`p-3 bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/40 rounded-lg space-y-1 ${
              field.spanFull ? 'md:col-span-2' : ''
            }`}
          >
            <div className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500 font-semibold tracking-wider uppercase text-[10px]">
              <span>{field.icon}</span>
              <span>{field.label}</span>
            </div>
            <div className="text-slate-800 dark:text-slate-200 text-sm md:text-base font-medium">
              {field.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
