"use client";
import React, { useState } from 'react';
import { useTheme } from '../../../hooks/useTheme';
import { Sliders, Moon, Sun, Globe, DollarSign } from 'lucide-react';

export default function PreferencesCard() {
  const { theme, toggleTheme } = useTheme();
  const [currency, setCurrency] = useState('PKR');
  const [language, setLanguage] = useState('en');

  return (
    <div className="rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-2xs">
      <h3 className="font-display font-bold text-lg text-slate-800 dark:text-white mb-6 flex items-center gap-2">
        <Sliders className="w-5 h-5 text-brand-orange" />
        Regional & Display Preferences
      </h3>

      <div className="space-y-6">
        {/* Theme Toggle option */}
        <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-slate-800/40 border border-gray-100 dark:border-slate-800/60">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-slate-800 dark:text-white flex items-center gap-1.5">
              {theme === 'dark' ? (
                <Moon className="w-4 h-4 text-amber-500" />
              ) : (
                <Sun className="w-4 h-4 text-brand-orange" />
              )}
              Display Theme Mode
            </h4>
            <p className="text-xs text-gray-400 dark:text-slate-500">
              Switch between light and dark display modes for comfortable viewing.
            </p>
          </div>
          <button
            onClick={toggleTheme}
            className={`w-11 h-6 rounded-full transition-colors relative duration-200 focus:outline-hidden cursor-pointer ${
              theme === 'dark' ? 'bg-brand-orange' : 'bg-gray-200 dark:bg-slate-800'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white absolute top-0.5 shadow-sm transition-transform duration-200 ${
                theme === 'dark' ? 'translate-x-5.5' : 'translate-x-0.5'
              }`}
            />
          </button>
        </div>

        {/* Currency and Language Dropdowns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-1">
              <DollarSign className="w-3.5 h-3.5 text-gray-400 dark:text-slate-500" />
              Currency Representation
            </label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:outline-hidden focus:ring-1 focus:ring-brand-orange"
            >
              <option value="PKR">Pakistani Rupee (PKR - Rs.)</option>
              <option value="USD">US Dollar (USD - $)</option>
              <option value="GBP">British Pound (GBP - £)</option>
              <option value="EUR">Euro (EUR - €)</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-gray-400 dark:text-slate-500" />
              Interface Language
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:outline-hidden focus:ring-1 focus:ring-brand-orange"
            >
              <option value="en">English (Default)</option>
              <option value="ur">Urdu (اردو)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
