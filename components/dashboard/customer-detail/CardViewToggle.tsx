"use client";
import React from 'react';

interface CardViewToggleProps {
  viewMode: 'traditional' | 'modern';
  onChange: (mode: 'traditional' | 'modern') => void;
}

export default function CardViewToggle({ viewMode, onChange }: CardViewToggleProps) {
  return (
    <div className="flex bg-slate-100 dark:bg-slate-950 p-1 rounded-lg w-fit border border-gray-200/50 dark:border-slate-800/50" id="card-view-toggle">
      <button
        id="btn-toggle-traditional"
        onClick={() => onChange('traditional')}
        className={`px-4 py-2 rounded-md text-xs md:text-sm font-semibold transition-all duration-200 cursor-pointer ${
          viewMode === 'traditional'
            ? 'bg-brand-orange text-white shadow-xs'
            : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
        }`}
      >
        Traditional Card
      </button>
      <button
        id="btn-toggle-modern"
        onClick={() => onChange('modern')}
        className={`px-4 py-2 rounded-md text-xs md:text-sm font-semibold transition-all duration-200 cursor-pointer ${
          viewMode === 'modern'
            ? 'bg-brand-orange text-white shadow-xs'
            : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
        }`}
      >
        Modern View
      </button>
    </div>
  );
}
