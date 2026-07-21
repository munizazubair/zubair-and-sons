"use client";
import React, { useState } from 'react';
import { Payment } from '../../../../types/payment';

interface PaymentHistoryTableProps {
  payments: Payment[];
  onDeletePayment: (id: string) => void;
}

export default function PaymentHistoryTable({ payments, onDeletePayment }: PaymentHistoryTableProps) {
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const getMethodBadge = (method: Payment['method']) => {
    switch (method) {
      case 'cash':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400">
            💵 Cash
          </span>
        );
      case 'bank_transfer':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-sky-50 dark:bg-sky-950/20 text-sky-700 dark:text-sky-400">
            🏛️ Bank Transfer
          </span>
        );
      case 'easypaisa':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-400">
            📱 Easypaisa
          </span>
        );
      case 'other':
      default:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
            💳 Other
          </span>
        );
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-4" id="payment-history-table-container">
      <h3 className="font-display font-bold text-slate-800 dark:text-white text-base border-b border-slate-100 dark:border-slate-800/60 pb-3 flex items-center gap-2">
        <svg className="w-5 h-5 text-brand-orange" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Payment Receipt History
      </h3>

      {payments.length === 0 ? (
        <div className="text-center py-8 text-slate-400 dark:text-slate-500 text-xs md:text-sm font-sans">
          No payments recorded yet for this customer.
        </div>
      ) : (
        <>
          {/* Desktop Table - Hidden on Mobile */}
          <div className="hidden md:block overflow-x-auto rounded-lg border border-slate-100 dark:border-slate-800/40">
            <table className="w-full text-left text-xs md:text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-950 text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800/50">
                  <th className="p-3 font-semibold">Date & Time</th>
                  <th className="p-3 font-semibold">Amount</th>
                  <th className="p-3 font-semibold">Method</th>
                  <th className="p-3 font-semibold">Notes</th>
                  <th className="p-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/40">
                {payments.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/40 dark:hover:bg-slate-800/5">
                    <td className="p-3 whitespace-nowrap text-slate-600 dark:text-slate-300 font-sans">
                      <div className="font-semibold text-slate-800 dark:text-white">
                        {p.date}
                      </div>
                      <div className="text-[10px] text-slate-400 dark:text-slate-500 font-mono mt-0.5">
                        {p.time}
                      </div>
                    </td>
                    <td className="p-3 whitespace-nowrap font-bold text-slate-900 dark:text-white">
                      Rs. {p.amount.toLocaleString()}
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      {getMethodBadge(p.method)}
                    </td>
                    <td className="p-3 text-slate-500 dark:text-slate-400 max-w-[150px] truncate" title={p.note}>
                      {p.note || <span className="text-slate-300 dark:text-slate-600">—</span>}
                    </td>
                    <td className="p-3 whitespace-nowrap text-right">
                      {confirmDeleteId === p.id ? (
                        <div className="flex items-center justify-end gap-2 animate-fade-in">
                          <span className="text-[10px] text-rose-500 font-bold uppercase tracking-wider">Delete?</span>
                          <button
                            id={`btn-confirm-delete-yes-${p.id}`}
                            onClick={() => {
                              onDeletePayment(p.id);
                              setConfirmDeleteId(null);
                            }}
                            className="px-2 py-1 bg-rose-600 text-white rounded text-[10px] font-bold cursor-pointer hover:bg-rose-700"
                          >
                            Yes
                          </button>
                          <button
                            id={`btn-confirm-delete-no-${p.id}`}
                            onClick={() => setConfirmDeleteId(null)}
                            className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded text-[10px] font-bold cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700"
                          >
                            No
                          </button>
                        </div>
                      ) : (
                        <button
                          id={`btn-delete-payment-${p.id}`}
                          onClick={() => setConfirmDeleteId(p.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-500 transition-colors duration-150 cursor-pointer rounded hover:bg-slate-100 dark:hover:bg-slate-800/50"
                          title="Delete receipt record"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                          </svg>
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Stacked Cards - Hidden on Desktop */}
          <div className="block md:hidden space-y-3">
            {payments.map((p) => (
              <div
                key={p.id}
                className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-gray-200 dark:border-slate-800 space-y-3 relative overflow-hidden"
              >
                <div className="flex justify-between items-start">
                  <div className="font-sans">
                    <span className="block text-slate-400 dark:text-slate-500 font-semibold tracking-wider uppercase text-[9px]">Date & Time</span>
                    <span className="text-xs font-semibold text-slate-800 dark:text-white">{p.date}</span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono ml-1.5">({p.time})</span>
                  </div>
                  <div>
                    {getMethodBadge(p.method)}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-sans border-t border-gray-100 dark:border-slate-800/40 pt-2">
                  <div>
                    <span className="block text-slate-400 dark:text-slate-500 font-semibold tracking-wider uppercase text-[9px]">Amount Paid</span>
                    <span className="font-bold text-slate-900 dark:text-white">Rs. {p.amount.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="block text-slate-400 dark:text-slate-500 font-semibold tracking-wider uppercase text-[9px]">Notes</span>
                    <span className="text-slate-600 dark:text-slate-400 max-w-[120px] block truncate" title={p.note}>{p.note || '—'}</span>
                  </div>
                </div>

                <div className="flex justify-end border-t border-gray-100 dark:border-slate-800/40 pt-2">
                  {confirmDeleteId === p.id ? (
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-rose-500 font-bold uppercase tracking-wider">Delete?</span>
                      <button
                        id={`btn-confirm-delete-yes-mob-${p.id}`}
                        onClick={() => {
                          onDeletePayment(p.id);
                          setConfirmDeleteId(null);
                        }}
                        className="px-2.5 py-1 bg-rose-600 text-white rounded text-[10px] font-bold cursor-pointer hover:bg-rose-700"
                      >
                        Yes
                      </button>
                      <button
                        id={`btn-confirm-delete-no-mob-${p.id}`}
                        onClick={() => setConfirmDeleteId(null)}
                        className="px-2.5 py-1 bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded text-[10px] font-bold cursor-pointer hover:bg-slate-300"
                      >
                        No
                      </button>
                    </div>
                  ) : (
                    <button
                      id={`btn-delete-payment-mob-${p.id}`}
                      onClick={() => setConfirmDeleteId(p.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-rose-500 hover:text-rose-600 text-[10px] font-bold cursor-pointer rounded-lg bg-rose-50 dark:bg-rose-950/10 hover:bg-rose-100/50"
                      title="Delete receipt record"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete Record
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
