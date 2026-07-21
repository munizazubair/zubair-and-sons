"use client";
import { motion } from 'motion/react';

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export default function ThemeToggle({ theme, toggleTheme }: ThemeToggleProps) {
  const isDark = theme === 'dark';

  return (
    <button
      id="theme-toggle"
      onClick={toggleTheme}
      className="p-2.5 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-orange/40 transition-colors duration-200 cursor-pointer"
      aria-label="Toggle dark/light theme"
    >
      <div className="relative w-5 h-5 overflow-hidden">
        <motion.div
          animate={{
            rotate: isDark ? 90 : 0,
            scale: isDark ? 0 : 1,
            opacity: isDark ? 0 : 1,
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="absolute inset-0 flex items-center justify-center text-amber-500"
        >
          {/* Sun Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
          </svg>
        </motion.div>

        <motion.div
          initial={{ scale: 0, opacity: 0, rotate: -90 }}
          animate={{
            rotate: isDark ? 0 : -90,
            scale: isDark ? 1 : 0,
            opacity: isDark ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="absolute inset-0 flex items-center justify-center text-brand-orange"
        >
          {/* Moon Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5"
          >
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
          </svg>
        </motion.div>
      </div>
    </button>
  );
}
