"use client";
import React, { useState } from 'react';
import { TodayRecoveryEntry, VisitStatus, NonPaymentReason } from '../../../types/recovery';
import RecoveryCustomerCard from './RecoveryCustomerCard';

interface AreaGroupProps {
  entries: TodayRecoveryEntry[];
  onClickCard: (customerId: string) => void;
  onChangeStatus: (entryId: string, status: VisitStatus) => void;
  onChangeReason: (entryId: string, reason: NonPaymentReason) => void;
}

export default function AreaGroup({
  entries,
  onClickCard,
  onChangeStatus,
  onChangeReason
}: AreaGroupProps) {
  // Group entries by area
  const grouped = entries.reduce<Record<string, TodayRecoveryEntry[]>>((acc, entry) => {
    const area = entry.area || 'General';
    if (!acc[area]) acc[area] = [];
    acc[area].push(entry);
    return acc;
  }, {});

  return (
    <div className="space-y-4" id="area-group-container">
      {Object.entries(grouped).map(([area, areaEntries]) => (
        <AreaGroupSection
          key={area}
          areaName={area}
          entries={areaEntries}
          onClickCard={onClickCard}
          onChangeStatus={onChangeStatus}
          onChangeReason={onChangeReason}
        />
      ))}
    </div>
  );
}

interface AreaGroupSectionProps {
  key?: string;
  areaName: string;
  entries: TodayRecoveryEntry[];
  onClickCard: (customerId: string) => void;
  onChangeStatus: (entryId: string, status: VisitStatus) => void;
  onChangeReason: (entryId: string, reason: NonPaymentReason) => void;
}

function AreaGroupSection({
  areaName,
  entries,
  onClickCard,
  onChangeStatus,
  onChangeReason
}: AreaGroupSectionProps) {
  const [isOpen, setIsOpen] = useState(true);

  const totalExpected = entries.reduce((sum, e) => sum + e.expectedAmount, 0);

  return (
    <div
      className="bg-slate-50 dark:bg-slate-900/30 rounded-xl border border-gray-200 dark:border-slate-800/80 overflow-hidden"
      id={`area-group-section-${areaName.toLowerCase().replace(/\s+/g, '-')}`}
    >
      {/* Group Header Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-2.5">
          {/* Collapse Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-90' : 'rotate-0'}`}
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
          <span className="font-bold text-slate-800 dark:text-white text-sm md:text-base">
            📍 {areaName}
          </span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
            {entries.length} {entries.length === 1 ? 'customer' : 'customers'}
          </span>
        </div>

        <div className="text-xs md:text-sm font-semibold text-slate-500 dark:text-slate-400">
          Expected Collection: <span className="font-bold text-slate-900 dark:text-white font-mono">Rs. {totalExpected.toLocaleString()}</span>
        </div>
      </button>

      {/* Grid of customer cards (Collapsible) */}
      {isOpen && (
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in">
          {entries.map((entry) => (
            <RecoveryCustomerCard
              key={entry.id}
              entry={entry}
              onClickCard={() => onClickCard(entry.customerId)}
              onChangeStatus={(status) => onChangeStatus(entry.id, status)}
              onChangeReason={(reason) => onChangeReason(entry.id, reason)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
