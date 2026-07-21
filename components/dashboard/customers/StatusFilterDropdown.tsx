"use client";
import React from 'react';

interface StatusFilterDropdownProps {
  value: string;
  onChange: (value: 'all' | 'active' | 'high_risk' | 'deactive') => void;
}

export default function StatusFilterDropdown({ value, onChange }: StatusFilterDropdownProps) {
  return (
    <div className="relative" id="status-filter-container">
      <select
        id="status-filter-select"
        value={value}
        onChange={(e) => onChange(e.target.value as 'all' | 'active' | 'high_risk' | 'deactive')}
        className="block w-full md:w-48 pl-3 pr-10 py-2.5 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white border border-gray-200 dark:border-slate-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/40 focus:border-brand-orange transition-all duration-150 cursor-pointer appearance-none font-medium"
        style={{
          backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394a3b8'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/></svg>")`,
          backgroundPosition: 'right 0.75rem center',
          backgroundSize: '1.25rem',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <option value="all">All Status</option>
        <option value="active">Active</option>
        <option value="high_risk">High Risk</option>
        <option value="deactive">Deactive</option>
      </select>
    </div>
  );
}
