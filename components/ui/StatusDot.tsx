import React from 'react';

interface StatusDotProps {
  color?: 'green' | 'amber' | 'red' | 'gray' | 'blue' | 'orange';
  ping?: boolean;
  className?: string;
}

export default function StatusDot({
  color = 'gray',
  ping = false,
  className = ''
}: StatusDotProps) {
  const colorClasses = {
    green: 'bg-emerald-500',
    amber: 'bg-amber-500',
    red: 'bg-rose-500',
    gray: 'bg-slate-400 dark:bg-slate-500',
    blue: 'bg-sky-500',
    orange: 'bg-brand-orange'
  };

  const pingColorClasses = {
    green: 'bg-emerald-400',
    amber: 'bg-amber-400',
    red: 'bg-rose-400',
    gray: 'bg-slate-300 dark:bg-slate-400',
    blue: 'bg-sky-400',
    orange: 'bg-brand-orange/70'
  };

  return (
    <span className={`relative flex h-2.5 w-2.5 flex-shrink-0 ${className}`}>
      {ping && (
        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${pingColorClasses[color]}`} />
      )}
      <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${colorClasses[color]}`} />
    </span>
  );
}
