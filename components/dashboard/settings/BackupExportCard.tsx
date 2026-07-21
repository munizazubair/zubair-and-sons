"use client";
import React, { useState, useEffect } from 'react';
import { INITIAL_CUSTOMERS, INITIAL_PAYMENTS } from '../../../lib/mockData/customers';
import { exportCustomersCSV, exportPaymentsCSV, exportFullBackupJSON } from '../../../lib/exportData';
import { Customer } from '../../../types/customer';
import { Payment } from '../../../types/payment';
import { Database, FileSpreadsheet, Download, Calendar } from 'lucide-react';
import Button from '../../ui/Button';

export default function BackupExportCard() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);

  const [lastCustomersExport, setLastCustomersExport] = useState<string | null>(null);
  const [lastPaymentsExport, setLastPaymentsExport] = useState<string | null>(null);
  const [lastBackupExport, setLastBackupExport] = useState<string | null>(null);

  // Load state and timestamps from storage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Safely load customers
      const savedCustomers = localStorage.getItem('device_customers_v1');
      if (savedCustomers) {
        try { setCustomers(JSON.parse(savedCustomers)); } catch (e) { setCustomers(INITIAL_CUSTOMERS); }
      } else {
        setCustomers(INITIAL_CUSTOMERS);
      }

      // Safely load payments
      const savedPayments = localStorage.getItem('device_payments_v1');
      if (savedPayments) {
        try { setPayments(JSON.parse(savedPayments)); } catch (e) { setPayments(INITIAL_PAYMENTS); }
      } else {
        setPayments(INITIAL_PAYMENTS);
      }

      // Load export logs
      setLastCustomersExport(localStorage.getItem('export_date_customers'));
      setLastPaymentsExport(localStorage.getItem('export_date_payments'));
      setLastBackupExport(localStorage.getItem('export_date_backup'));
    }
  }, []);

  const handleExportCustomers = () => {
    exportCustomersCSV(customers, payments);
    const dateStr = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
    localStorage.setItem('export_date_customers', dateStr);
    setLastCustomersExport(dateStr);
  };

  const handleExportPayments = () => {
    exportPaymentsCSV(payments, customers);
    const dateStr = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
    localStorage.setItem('export_date_payments', dateStr);
    setLastPaymentsExport(dateStr);
  };

  const handleExportBackup = () => {
    // Generate full snapshot
    const backupPayload = {
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      businessInfo: JSON.parse(localStorage.getItem('business_info_v1') || '{}'),
      staffMembers: JSON.parse(localStorage.getItem('staff_members_v1') || '[]'),
      customers,
      payments,
    };
    exportFullBackupJSON(backupPayload);
    const dateStr = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
    localStorage.setItem('export_date_backup', dateStr);
    setLastBackupExport(dateStr);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-0.5">
        <h3 className="font-display font-bold text-lg text-slate-800 dark:text-white flex items-center gap-2">
          <Database className="w-5 h-5 text-brand-orange" />
          Backup & Export Data
        </h3>
        <p className="text-xs text-slate-400 dark:text-slate-500">
          Secure offline backups and accounting files. All files are compiled locally in your browser.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Customer CSV card */}
        <div className="rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex flex-col justify-between shadow-2xs">
          <div className="space-y-3">
            <div className="p-3.5 w-12 h-12 rounded-lg bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-800 dark:text-white uppercase tracking-wider">
                Customers Ledger
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Export comprehensive list of customers, total contract limits, paid status, and remaining outstanding dues to CSV.
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-50 dark:border-slate-800/40 space-y-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleExportCustomers}
              className="w-full text-xs font-semibold text-blue-600 dark:text-blue-400 border-blue-200 hover:bg-blue-50/40 dark:hover:bg-blue-950/10 flex items-center justify-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              Export Customers (CSV)
            </Button>
            {lastCustomersExport && (
              <p className="text-[10px] text-gray-400 dark:text-slate-500 flex items-center gap-1 justify-center">
                <Calendar className="w-3 h-3 text-gray-400" />
                Last exported: {lastCustomersExport}
              </p>
            )}
          </div>
        </div>

        {/* Payments CSV card */}
        <div className="rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex flex-col justify-between shadow-2xs">
          <div className="space-y-3">
            <div className="p-3.5 w-12 h-12 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-800 dark:text-white uppercase tracking-wider">
                Payments Timeline
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Download a chronologically sequenced log of all registered installments, transaction times, and verification notes in CSV.
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-50 dark:border-slate-800/40 space-y-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleExportPayments}
              className="w-full text-xs font-semibold text-emerald-600 dark:text-emerald-400 border-emerald-200 hover:bg-emerald-50/40 dark:hover:bg-emerald-950/10 flex items-center justify-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              Export Payments (CSV)
            </Button>
            {lastPaymentsExport && (
              <p className="text-[10px] text-gray-400 dark:text-slate-500 flex items-center gap-1 justify-center">
                <Calendar className="w-3 h-3 text-gray-400" />
                Last exported: {lastPaymentsExport}
              </p>
            )}
          </div>
        </div>

        {/* Full JSON Dump card */}
        <div className="rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex flex-col justify-between shadow-2xs">
          <div className="space-y-3">
            <div className="p-3.5 w-12 h-12 rounded-lg bg-brand-orange/10 text-brand-orange flex items-center justify-center">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-800 dark:text-white uppercase tracking-wider">
                System Backup
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Generate a comprehensive raw JSON snapshot file containing staff records, business settings, clients lists, and payment histories.
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-50 dark:border-slate-800/40 space-y-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleExportBackup}
              className="w-full text-xs font-semibold text-brand-orange border-brand-orange/30 hover:bg-brand-orange/10 flex items-center justify-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              Export Backup (JSON)
            </Button>
            {lastBackupExport && (
              <p className="text-[10px] text-gray-400 dark:text-slate-500 flex items-center gap-1 justify-center">
                <Calendar className="w-3 h-3 text-gray-400" />
                Last exported: {lastBackupExport}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
