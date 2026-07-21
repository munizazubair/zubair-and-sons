import React from 'react';
import { ShieldAlert, Check, X } from 'lucide-react';

export default function RolesComparisonCards() {
  return (
    <div className="space-y-6">
      <div className="space-y-0.5">
        <h3 className="font-display font-bold text-lg text-slate-800 dark:text-white flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-brand-orange" />
          Role-Based Access Control
        </h3>
        <p className="text-xs text-slate-400 dark:text-slate-500">
          Compare global permissions and explore authorized task lists for administrative vs operational duties.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Owner permissions */}
        <div className="rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 dark:border-slate-800/60 pb-3">
            <h4 className="font-bold text-base text-slate-800 dark:text-white">
              Owner Profile Access
            </h4>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-orange/10 text-brand-orange">
              Full Administrator
            </span>
          </div>
          <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>View all customers across all areas</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Add, Edit, and Delete any customer profile</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Record, modify, or delete payments</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Access global Settings and configuration</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Provision and manage staff credentials</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>View financial reports, graphs, and export CSVs</span>
            </li>
          </ul>
        </div>

        {/* Staff permissions */}
        <div className="rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 dark:border-slate-800/60 pb-3">
            <h4 className="font-bold text-base text-slate-800 dark:text-white">
              Staff Profile Access
            </h4>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              Recovery Agent / Salesman
            </span>
          </div>
          <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>View assigned customers and recoveries</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Add new customers in the field</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Record collection payments</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Edit assigned customers details</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Add operational notes on client files</span>
            </li>
            <li className="flex items-start gap-2 border-t border-gray-50 dark:border-slate-800/30 pt-2 text-rose-500 font-medium">
              <X className="w-4 h-4 shrink-0 mt-0.5" />
              <span>Cannot access Settings page</span>
            </li>
            <li className="flex items-start gap-2 text-rose-500 font-medium">
              <X className="w-4 h-4 shrink-0 mt-0.5" />
              <span>Cannot delete any customer contract</span>
            </li>
            <li className="flex items-start gap-2 text-rose-500 font-medium">
              <X className="w-4 h-4 shrink-0 mt-0.5" />
              <span>Cannot manage other staff profiles</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-gray-50 dark:bg-slate-800/40 border border-gray-100 dark:border-slate-800/50 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
        <strong>Important Authorization Disclaimer:</strong> Job titles (Recovery Inspector, Salesman) describe a staff member's functional role in the business but do not change their system permissions — both share the same base "Staff" system access level.
      </div>
    </div>
  );
}
