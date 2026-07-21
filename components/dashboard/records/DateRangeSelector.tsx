"use client";
import React, { useEffect, useState } from 'react';

export type DatePreset = 'today' | 'yesterday' | 'week' | 'month' | 'custom';

interface DateRangeSelectorProps {
  onRangeChange: (startDate: string, endDate: string) => void;
  preset: DatePreset;
  onPresetChange: (preset: DatePreset) => void;
}

export default function DateRangeSelector({
  onRangeChange,
  preset,
  onPresetChange
}: DateRangeSelectorProps) {
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');

  // Helper to format Date to YYYY-MM-DD local
  const formatDateLocal = (date: Date): string => {
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - offset * 60 * 1000);
    return localDate.toISOString().split('T')[0];
  };

  useEffect(() => {
    const today = new Date();
    let start = '';
    let end = '';

    switch (preset) {
      case 'today': {
        const dStr = formatDateLocal(today);
        start = dStr;
        end = dStr;
        break;
      }
      case 'yesterday': {
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        const dStr = formatDateLocal(yesterday);
        start = dStr;
        end = dStr;
        break;
      }
      case 'week': {
        // Start of current week (assuming Monday start)
        const startOfWeek = new Date(today);
        const day = startOfWeek.getDay();
        const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
        startOfWeek.setDate(diff);
        start = formatDateLocal(startOfWeek);
        end = formatDateLocal(today);
        break;
      }
      case 'month': {
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        start = formatDateLocal(startOfMonth);
        end = formatDateLocal(today);
        break;
      }
      case 'custom': {
        // Don't auto-calculate, let the inputs manage it
        if (customStart && customEnd) {
          start = customStart;
          end = customEnd;
        } else {
          const dStr = formatDateLocal(today);
          start = customStart || dStr;
          end = customEnd || dStr;
          if (!customStart) setCustomStart(dStr);
          if (!customEnd) setCustomEnd(dStr);
        }
        break;
      }
    }

    if (start && end) {
      onRangeChange(start, end);
    }
  }, [preset, customStart, customEnd]);

  const presets: { id: DatePreset; label: string }[] = [
    { id: 'today', label: 'Today' },
    { id: 'yesterday', label: 'Yesterday' },
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' },
    { id: 'custom', label: 'Custom' }
  ];

  return (
    <div className="space-y-4" id="date-range-selector">
      {/* Preset Pill Buttons */}
      <div className="flex flex-wrap gap-2">
        {presets.map((p) => (
          <button
            key={p.id}
            id={`btn-date-preset-${p.id}`}
            onClick={() => onPresetChange(p.id)}
            className={`px-4 py-2 rounded-full text-xs md:text-sm font-semibold transition-all duration-150 cursor-pointer ${
              preset === p.id
                ? 'bg-brand-orange text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-900 text-slate-500 hover:text-slate-800 dark:hover:text-white border border-gray-200/40 dark:border-slate-800/40'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Conditional Date Pickers for Custom, or single date input representation */}
      {preset === 'custom' ? (
        <div className="grid grid-cols-2 gap-4 max-w-md p-4 bg-slate-50 dark:bg-slate-950/40 border border-gray-100 dark:border-slate-800/40 rounded-xl animate-fade-in">
          <div className="space-y-1">
            <label className="block text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider text-[9px]">
              From Date
            </label>
            <input
              id="input-custom-start-date"
              type="date"
              value={customStart}
              onChange={(e) => setCustomStart(e.target.value)}
              className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 text-slate-800 dark:text-white rounded-lg text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/40 focus:border-brand-orange"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider text-[9px]">
              To Date
            </label>
            <input
              id="input-custom-end-date"
              type="date"
              value={customEnd}
              onChange={(e) => setCustomEnd(e.target.value)}
              className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 text-slate-800 dark:text-white rounded-lg text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/40 focus:border-brand-orange"
            />
          </div>
        </div>
      ) : (
        /* Readonly indicator showing the calculated date for clarity */
        <div className="text-xs text-slate-400 dark:text-slate-500 font-medium font-mono pl-1">
          🗓️ Selected Period: {preset === 'today' || preset === 'yesterday' ? (
            <span>{customStart || formatDateLocal(new Date())}</span>
          ) : (
            <span>{customStart} to {customEnd || formatDateLocal(new Date())}</span>
          )}
        </div>
      )}
    </div>
  );
}
