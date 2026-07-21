"use client";
import React, { useRef, useState, useEffect } from 'react';
import Button from '../../ui/Button';

export type FilterMode = 'all' | 'area_wise' | 'overdue_only';

interface FilterBarProps {
  currentFilter: FilterMode;
  onFilterChange: (mode: FilterMode) => void;
  onAddCustomerClick: () => void;
}

export default function FilterBar({
  currentFilter,
  onFilterChange,
  onAddCustomerClick
}: FilterBarProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showLeftFade, setShowLeftFade] = useState(false);
  const [showRightFade, setShowRightFade] = useState(false);

  const checkScroll = () => {
    const el = containerRef.current;
    if (el) {
      const { scrollLeft, scrollWidth, clientWidth } = el;
      setShowLeftFade(scrollLeft > 5);
      setShowRightFade(scrollLeft + clientWidth < scrollWidth - 5);
    }
  };

  useEffect(() => {
    const el = containerRef.current;
    if (el) {
      checkScroll();
      el.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
      
      const observer = new ResizeObserver(checkScroll);
      observer.observe(el);

      return () => {
        el.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
        observer.disconnect();
      };
    }
  }, []);

  const modes: { id: FilterMode; label: string }[] = [
    { id: 'all', label: 'All Operations' },
    { id: 'area_wise', label: 'Area-wise Groups' },
    { id: 'overdue_only', label: 'Overdue Only' }
  ];

  return (
    <div
      className="sticky top-20 z-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md py-3 border-b border-gray-200/50 dark:border-slate-900/60 transition-all"
      id="today-recovery-filter-bar"
    >
      {/* Scrollable Toggle Pills Container */}
      <div className="relative flex-1 min-w-0">
        {/* Left Fade Overlay */}
        <div
          className={`pointer-events-none absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-slate-50 dark:from-slate-950 to-transparent z-10 transition-opacity duration-300 ${
            showLeftFade ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Right Fade Overlay */}
        <div
          className={`pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-slate-50 dark:from-slate-950 to-transparent z-10 transition-opacity duration-300 ${
            showRightFade ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Scrollable Toggle Pills */}
        <div
          ref={containerRef}
          className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth -mx-4 px-4 sm:mx-0 sm:px-0 py-0.5"
        >
          {modes.map((mode) => (
            <button
              key={mode.id}
              id={`btn-filter-mode-${mode.id}`}
              onClick={() => onFilterChange(mode.id)}
              className={`px-4 py-2 rounded-full text-xs md:text-sm font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer ${
                currentFilter === mode.id
                  ? 'bg-brand-orange text-white shadow-xs'
                  : 'bg-white dark:bg-slate-900 border border-gray-200/50 dark:border-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-white'
              }`}
              style={{ minHeight: '40px' }}
            >
              {mode.label}
            </button>
          ))}
        </div>
      </div>

      {/* Add Customer CTA button */}
      <Button
        id="btn-add-customer-to-today"
        variant="primary"
        size="sm"
        onClick={onAddCustomerClick}
        className="flex items-center justify-center gap-1.5 font-bold shadow-sm h-10 sm:h-auto"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          className="w-4 h-4 flex-shrink-0"
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        <span className="inline sm:inline">Add Customer to Today</span>
      </Button>
    </div>
  );
}
