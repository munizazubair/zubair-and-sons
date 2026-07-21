"use client";
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  id?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-150 cursor-pointer active:scale-97 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100';
  
  const sizeClasses = {
    xs: 'px-2 py-1 text-3xs',
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-2.5 text-base'
  };

  const variantClasses = {
    primary: 'bg-brand-orange hover:bg-brand-orange-hover text-white shadow-xs border border-transparent',
    secondary: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700/80 border border-transparent',
    outline: 'bg-transparent border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/40',
    danger: 'bg-rose-500 hover:bg-rose-600 text-white shadow-xs border border-transparent',
    ghost: 'bg-transparent text-slate-500 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/40'
  };

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
