import { ReactNode } from 'react';
import { motion } from 'motion/react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: ReactNode;
  delayIndex?: number;
  highlightSeverity?: boolean;
}

export default function StatCard({
  label,
  value,
  icon,
  delayIndex = 0,
  highlightSeverity = false,
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: delayIndex * 0.08, ease: 'easeOut' }}
      whileHover={{ y: -2 }}
      className="rounded-xl border border-gray-200 dark:border-slate-800 p-4 md:p-6 bg-white dark:bg-slate-900 shadow-2xs hover:shadow-md transition-shadow duration-200 flex flex-col justify-between overflow-hidden min-w-0"
    >
      <div className="flex items-start justify-between gap-2 mb-3 min-w-0">
        <span className="text-3xs xs:text-2xs md:text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-slate-500 font-sans min-w-0 break-words leading-tight">
          {label}
        </span>
        <div className="p-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 shrink-0 w-8 h-8 md:w-9 md:h-9 flex items-center justify-center transition-all duration-200">
          {icon}
        </div>
      </div>

      <div className="mt-1 md:mt-2 min-w-0">
        <span
          className={`text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold font-display tracking-tight leading-none break-all sm:break-keep ${
            highlightSeverity
              ? 'text-rose-500 dark:text-rose-400'
              : 'text-slate-800 dark:text-white'
          }`}
        >
          {value}
        </span>
      </div>
    </motion.div>
  );
}
