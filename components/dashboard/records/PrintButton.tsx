"use client";
import React from 'react';

interface PrintButtonProps {
  dateRangeText: string;
}

export default function PrintButton({ dateRangeText }: PrintButtonProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      {/* Embedded print stylesheet to guarantee a pristine, paper-friendly printout */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          /* Hide non-printable panels */
          aside,
          header,
          nav,
          #sidebar-desktop-toggle,
          #mobile-sidebar,
          #sidebar-mobile-close,
          #desktop-sidebar,
          #theme-toggle,
          #records-search-bar-container,
          #date-range-selector,
          #btn-print-records,
          #custom-payment-modal-overlay {
            display: none !important;
          }

          /* Reset body backgrounds and colors for perfect high-contrast ink printing */
          body, html, main, #root {
            background: white !important;
            color: black !important;
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
          }

          /* Expand content fully */
          .md\\:pl-64, .pl-0, .md\\:ml-64 {
            padding-left: 0 !important;
            margin-left: 0 !important;
          }

          /* Custom printable container header */
          #print-header {
            display: block !important;
          }

          /* Force all tables and rows to fit */
          table {
            width: 100% !important;
            border-collapse: collapse !important;
          }
          th, td {
            border: 1px solid #e2e8f0 !important;
            padding: 8px !important;
            color: #000 !important;
          }

          /* Remove complex animations, transitions, or shadows on print */
          * {
            box-shadow: none !important;
            text-shadow: none !important;
            transition: none !important;
            animation: none !important;
          }
        }
      `}} />

      <button
        id="btn-print-records"
        onClick={handlePrint}
        className="inline-flex items-center gap-1.5 px-4 py-2 text-xs md:text-sm font-bold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-950 active:scale-95 transition-all cursor-pointer shadow-2xs"
        title="Print Ledger Report"
      >
        <svg
          className="w-4 h-4 text-slate-500 dark:text-slate-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.72 13.844l1.24-1.241m0 0l1.243-1.243m-1.243 1.243L5.48 11.362M18 12a6 6 0 11-12 0 6 6 0 0112 0zm-3-3l-3 3m0 0l-3-3m3 3V3"
          />
        </svg>
        Print Page
      </button>
    </>
  );
}
