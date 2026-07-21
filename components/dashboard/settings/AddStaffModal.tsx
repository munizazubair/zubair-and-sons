"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, User, Phone, Mail, Key, Copy, Check, ShieldAlert } from 'lucide-react';
import { StaffMember } from '../../../types/staff';
import Button from '../../ui/Button';

interface AddStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (staff: Omit<StaffMember, 'id' | 'createdAt'>, tempPass: string) => void;
}

export default function AddStaffModal({ isOpen, onClose, onAdd }: AddStaffModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [jobTitle, setJobTitle] = useState<'recovery_inspector' | 'salesman'>('recovery_inspector');
  const [loginEmail, setLoginEmail] = useState('');
  const [tempPassword, setTempPassword] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Auto-generate a password on mount or when modal opens
  useEffect(() => {
    if (isOpen) {
      generatePassword();
      setName('');
      setPhone('');
      setLoginEmail('');
      setError(null);
      setIsCopied(false);
    }
  }, [isOpen]);

  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$';
    let result = '';
    for (let i = 0; i < 10; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setTempPassword(result);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        `Email: ${loginEmail}\nTemporary Password: ${tempPassword}\n\nNote: Please change your password on first login.`
      );
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (e) {
      console.error('Failed to copy text', e);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Staff Full Name is required.');
      return;
    }
    if (!phone.trim()) {
      setError('Phone/CNIC is required.');
      return;
    }
    if (!loginEmail.trim() || !loginEmail.includes('@')) {
      setError('A valid login email address is required.');
      return;
    }

    onAdd(
      {
        name: name.trim(),
        phone: phone.trim(),
        jobTitle,
        role: 'staff',
        loginEmail: loginEmail.trim(),
        isActive: true,
      },
      tempPassword
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', duration: 0.3 }}
            className="relative w-full max-w-lg rounded-xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 p-6 shadow-xl z-10 max-h-[90vh] overflow-y-auto no-scrollbar"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-slate-800/60 mb-5">
              <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                Add New Staff Member
              </h3>
              <button
                onClick={onClose}
                className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 text-xs font-semibold text-red-600 dark:text-red-400 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4" />
                  {error}
                </div>
              )}

              {/* Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 w-4.5 h-4.5 text-gray-400 dark:text-slate-600" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (error) setError(null);
                    }}
                    className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:outline-hidden focus:ring-1 focus:ring-brand-orange"
                    placeholder="e.g. Adeel Ahmed"
                  />
                </div>
              </div>

              {/* Phone/CNIC */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Phone / CNIC *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-2.5 w-4.5 h-4.5 text-gray-400 dark:text-slate-600" />
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (error) setError(null);
                    }}
                    className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:outline-hidden focus:ring-1 focus:ring-brand-orange"
                    placeholder="e.g. 0300-1234567 or 42101-xxxxxxx-x"
                  />
                </div>
              </div>

              {/* Job Title Selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Job Title
                </label>
                <select
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value as any)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:outline-hidden focus:ring-1 focus:ring-brand-orange"
                >
                  <option value="recovery_inspector">Recovery Inspector</option>
                  <option value="salesman">Salesman</option>
                </select>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 italic">
                  Note: Job titles are descriptive labels. Both map to a generic "staff" authorization level.
                </p>
              </div>

              {/* Login Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Login Email *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 w-4.5 h-4.5 text-gray-400 dark:text-slate-600" />
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => {
                      setLoginEmail(e.target.value);
                      if (error) setError(null);
                    }}
                    className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:outline-hidden focus:ring-1 focus:ring-brand-orange"
                    placeholder="e.g. adeel@devicecollection.com"
                  />
                </div>
              </div>

              {/* Temp Password Generator (Visual Card) */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/60 space-y-3.5">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Key className="w-3.5 h-3.5 text-brand-orange" />
                    Temporary Credential Key
                  </h4>
                  <button
                    type="button"
                    onClick={generatePassword}
                    className="text-xs font-semibold text-brand-orange hover:text-brand-orange-hover cursor-pointer"
                  >
                    Regenerate
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex-1 font-mono text-sm px-3.5 py-2 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 text-slate-800 dark:text-white rounded-lg select-all overflow-x-auto">
                    {tempPassword}
                  </div>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className={`p-2.5 rounded-lg border transition-all cursor-pointer ${
                      isCopied
                        ? 'border-emerald-200 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400'
                        : 'border-gray-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-900 text-slate-500'
                    }`}
                    title="Copy credentials"
                  >
                    {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-xs text-gray-400 dark:text-slate-500 leading-relaxed">
                  {/* Note: staff should be prompted to change it on first login (mock this behavior with a code comment for future real-auth implementation) */}
                  * Note: The staff member will be prompted to replace this temporary token with a personalized password upon their initial system authentication.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-3 border-t border-gray-100 dark:border-slate-800/60">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="text-slate-700 dark:text-slate-300"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  className="bg-brand-orange text-white"
                >
                  Create Account
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
