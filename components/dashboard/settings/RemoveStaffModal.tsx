"use client";
import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, X } from 'lucide-react';
import { StaffMember } from '../../../types/staff';
import Button from '../../ui/Button';

interface RemoveStaffModalProps {
  isOpen: boolean;
  staff: StaffMember | null;
  onClose: () => void;
  onConfirm: () => void;
}

export default function RemoveStaffModal({ isOpen, staff, onClose, onConfirm }: RemoveStaffModalProps) {
  if (!staff) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs"
          />

          {/* Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', duration: 0.3 }}
            className="relative w-full max-w-md rounded-xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 p-6 shadow-xl z-10"
          >
            {/* Header */}
            <div className="flex items-start gap-3.5 mb-4">
              <div className="p-2 rounded-lg bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
                  Confirm Staff Removal
                </h3>
                <p className="text-xs text-gray-400 dark:text-slate-500 mt-0.5">
                  Action: Account Suspension
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Prompt */}
            <div className="space-y-4">
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Are you sure you want to remove <strong className="text-slate-800 dark:text-slate-200 font-semibold">{staff.name}</strong>? They will lose all active login credentials and system access immediately.
              </p>
              <p className="text-xs text-amber-600 dark:text-amber-400/80 bg-amber-50 dark:bg-amber-950/10 border border-amber-100 dark:border-amber-900/30 p-3 rounded-lg leading-relaxed">
                ✓ <strong>Ledger Safeguard Enabled</strong>: This will soft-deactivate their account instead of hard-deleting, preserving the historical payment records and collections they recorded.
              </p>

              {/* Action row */}
              <div className="flex justify-end gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="text-slate-700 dark:text-slate-300 hover:bg-slate-50"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  variant="danger"
                  onClick={onConfirm}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  Deactivate Access
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
