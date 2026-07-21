"use client";
import React, { useState } from 'react';
import { Customer } from '../../../../types/customer';
import { Payment } from '../../../../types/payment';
import { calculateAmountPaid, calculateRemaining } from '../../../../lib/customerCalculations';

interface TraditionalCardProps {
  customer: Customer;
  payments: Payment[];
  onDeletePayment?: (id: string) => void;
}

export default function TraditionalCard({ customer, payments, onDeletePayment }: TraditionalCardProps) {
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const customerPayments = payments.filter((p) => p.customerId === customer.id);
  const totalPaid = calculateAmountPaid(customerPayments);
  const remaining = calculateRemaining(customer.totalAmount, customerPayments);

  // Translate methods to Urdu
  const getUrduMethod = (method: Payment['method']) => {
    switch (method) {
      case 'cash':
        return 'نقد (کیش)';
      case 'bank_transfer':
        return 'بینک ٹرانسفر';
      case 'easypaisa':
        return 'ایزی پیسہ';
      case 'other':
      default:
        return 'دیگر';
    }
  };

  return (
    <div className="w-full overflow-x-auto pb-4" id="traditional-card-scroll-container">
      {/* Container enforces cream background and dark brown/amber print colors regardless of dark mode */}
      <div
        id={`traditional-ledger-card-${customer.id}`}
        dir="rtl"
        className="w-[780px] mx-auto bg-[#FAF7F2] text-amber-950 p-8 border-4 border-double border-amber-900 rounded-xl shadow-md font-serif select-none shrink-0"
        style={{ color: '#451a03', borderColor: '#78350f' }}
      >
        {/* Decorative Header */}
        <div className="text-center border-b-2 border-dashed border-amber-900/40 pb-4 mb-6">
          <div className="text-2xs font-bold tracking-widest text-amber-800 opacity-80 mb-1">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </div>
          <h2 className="text-2xl font-extrabold tracking-wide mb-1 flex items-center justify-center gap-3">
            <span>📖</span>
            <span>کھاتا رجسٹر — ڈیوائس کلیکشن ریکارڈ</span>
          </h2>
          <p className="text-xs text-amber-800 italic">
            سرکاری و کاروباری معاملات کے تحت قسط وار ادائیگی کا باقاعدہ لیجر فارم
          </p>
        </div>

        {/* Ledger Grid Sections */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm mb-6 border-b border-amber-900/20 pb-6">
          {/* Right Column */}
          <div className="space-y-3">
            <div className="flex items-baseline gap-2 border-b border-amber-900/20 pb-1">
              <span className="font-bold whitespace-nowrap text-amber-900">نام اسامی:</span>
              <span className="font-bold text-lg text-amber-950 flex-1">{customer.name}</span>
            </div>

            <div className="flex items-baseline gap-2 border-b border-amber-900/20 pb-1">
              <span className="font-semibold whitespace-nowrap text-amber-800 text-xs">شناختی کارڈ (CNIC):</span>
              <span className="font-medium text-sm flex-1 font-mono tracking-wider">{customer.cnic}</span>
            </div>

            <div className="flex items-baseline gap-2 border-b border-amber-900/20 pb-1">
              <span className="font-semibold whitespace-nowrap text-amber-800 text-xs">رابطہ نمبر:</span>
              <span className="font-medium text-sm flex-1 font-mono">{customer.phone}</span>
            </div>

            <div className="flex items-baseline gap-2 border-b border-amber-900/20 pb-1">
              <span className="font-semibold whitespace-nowrap text-amber-800 text-xs">سکونتی پتہ:</span>
              <span className="font-medium text-xs flex-1 leading-relaxed">{customer.address}</span>
            </div>

            <div className="flex items-baseline gap-2 border-b border-amber-900/20 pb-1">
              <span className="font-semibold whitespace-nowrap text-amber-800 text-xs">شعبہ / علاقہ:</span>
              <span className="font-medium text-xs flex-1">{customer.area}</span>
            </div>
          </div>

          {/* Left Column */}
          <div className="space-y-3">
            <div className="flex items-baseline gap-2 border-b border-amber-900/20 pb-1">
              <span className="font-semibold whitespace-nowrap text-amber-800 text-xs">تفصیلِ ضمانت کار:</span>
              <span className="font-medium text-xs flex-1">{customer.guarantor}</span>
            </div>

            <div className="flex items-baseline gap-2 border-b border-amber-900/20 pb-1">
              <span className="font-semibold whitespace-nowrap text-amber-800 text-xs">خرید کردہ ڈیوائس:</span>
              <span className="font-bold text-amber-950 text-sm flex-1">{customer.items.join(' + ')}</span>
            </div>

            <div className="grid grid-cols-2 gap-2 bg-amber-900/5 p-3 rounded border border-amber-900/10">
              <div>
                <span className="block text-[10px] text-amber-800 font-bold">کل قیمت سودا:</span>
                <span className="font-extrabold text-base">Rs. {customer.totalAmount.toLocaleString()}</span>
              </div>
              <div>
                <span className="block text-[10px] text-amber-800 font-bold">قسط وار منصوبہ:</span>
                <span className="font-extrabold text-base">
                  Rs. {customer.installmentAmount.toLocaleString()} ({customer.installmentFrequency === 'weekly' ? 'ہفتہ وار' : 'ماہانہ'})
                </span>
              </div>
              <div className="pt-2 border-t border-amber-900/10">
                <span className="block text-[10px] text-amber-800 font-bold">کل وصول رقم:</span>
                <span className="font-extrabold text-emerald-800 text-base">Rs. {totalPaid.toLocaleString()}</span>
              </div>
              <div className="pt-2 border-t border-amber-900/10">
                <span className="block text-[10px] text-amber-800 font-bold text-brand-orange">بقیہ واجب الادا:</span>
                <span className="font-extrabold text-red-800 text-base">Rs. {remaining.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Ledger Payment History Table ("شیڈول وصولیابی") */}
        <div className="space-y-3">
          <h3 className="font-extrabold text-sm border-b border-amber-900 text-amber-900 pb-1.5 flex items-center gap-1.5">
            <span>📝</span>
            <span>وصول شدہ اقساط کا باقاعدہ لیجر (شیڈول وصولیابی)</span>
          </h3>

          <table className="w-full border border-amber-900 text-right text-xs">
            <thead>
              <tr className="bg-amber-900/10 text-amber-950 border-b border-amber-900 font-bold">
                <th className="p-2.5 border-l border-amber-900">تاریخ وصولی</th>
                <th className="p-2.5 border-l border-amber-900">رقم (روپے)</th>
                <th className="p-2.5 border-l border-amber-900">طریقہ کار</th>
                <th className="p-2.5 border-l border-amber-900">تفصیل / نوٹ</th>
                <th className="p-2.5 text-center">دستخط وصول کنندہ / عمل</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-900/20 font-sans">
              {customerPayments.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-amber-800/60 font-serif italic">
                    ابھی تک کوئی قسط وصول نہیں ہوئی۔
                  </td>
                </tr>
              ) : (
                customerPayments.map((p) => (
                  <tr key={p.id} className="hover:bg-amber-900/5">
                    <td className="p-2.5 border-l border-amber-900/20 whitespace-nowrap font-medium">
                      {p.date} <span className="text-[10px] text-amber-700 font-mono">({p.time})</span>
                    </td>
                    <td className="p-2.5 border-l border-amber-900/20 font-bold whitespace-nowrap">
                      Rs. {p.amount.toLocaleString()}
                    </td>
                    <td className="p-2.5 border-l border-amber-900/20 font-serif">
                      {getUrduMethod(p.method)}
                    </td>
                    <td className="p-2.5 border-l border-amber-900/20 font-serif text-amber-900/80 max-w-[120px] truncate" title={p.note}>
                      {p.note || '—'}
                    </td>
                    <td className="p-2.5 text-center whitespace-nowrap">
                      {confirmDeleteId === p.id ? (
                        <div className="flex items-center justify-center gap-1.5">
                          <span className="text-[9px] text-rose-700 font-bold font-serif">حذف کریں؟</span>
                          <button
                            id={`btn-urdu-delete-confirm-yes-${p.id}`}
                            onClick={() => {
                              if (onDeletePayment) onDeletePayment(p.id);
                              setConfirmDeleteId(null);
                            }}
                            className="px-1.5 py-0.5 bg-red-700 text-white rounded text-[10px] font-bold cursor-pointer"
                          >
                            ہاں
                          </button>
                          <button
                            id={`btn-urdu-delete-confirm-no-${p.id}`}
                            onClick={() => setConfirmDeleteId(null)}
                            className="px-1.5 py-0.5 bg-amber-200 text-amber-950 rounded text-[10px] font-bold cursor-pointer"
                          >
                            نہیں
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2">
                          <span className="text-xs text-amber-800/80 font-serif italic select-none">منظور شدہ</span>
                          {onDeletePayment && (
                            <button
                              id={`btn-urdu-delete-${p.id}`}
                              onClick={() => setConfirmDeleteId(p.id)}
                              className="text-amber-500 hover:text-red-700 p-0.5 rounded transition-colors duration-150 cursor-pointer"
                              title="حذف کریں"
                            >
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Traditional Footer Note */}
        <div className="text-center text-[10px] text-amber-800 opacity-60 pt-4 border-t border-dashed border-amber-900/30 font-serif">
          نوٹ: ادائیگی کی صورت میں رسید کمپیوٹرائزڈ سسٹم کے ذریعے فوری اپڈیٹ ہو جاتی ہے۔ دستخط متعلقہ مجاز کارندہ لازمی ہے۔
        </div>
      </div>
    </div>
  );
}
