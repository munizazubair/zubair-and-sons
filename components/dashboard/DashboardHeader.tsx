"use client";
import { SidebarNavId } from '../../types/dashboard';
import ThemeToggle from '../ui/ThemeToggle';

interface DashboardHeaderProps {
  activeItem: SidebarNavId;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  onMenuClick: () => void;
}

export default function DashboardHeader({
  activeItem,
  theme,
  toggleTheme,
  onMenuClick,
}: DashboardHeaderProps) {
  // Translate active SidebarNavId to a polished page title
  const getPageTitle = () => {
    switch (activeItem) {
      case 'dashboard':
        return 'Dashboard';
      case 'customers':
        return 'Customers';
      case 'recovery':
        return 'Recovery & Installments';
      case 'add-customer':
        return 'Add Customer';
      case 'settings':
        return 'System Settings';
      default:
        return 'Dashboard';
    }
  };

  return (
    <header
      id="dashboard-header"
      className="sticky top-0 z-20 h-20 flex items-center justify-between px-4 md:px-8 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-200 dark:border-slate-800 transition-all duration-300"
    >
      <div className="flex items-center gap-3">
        {/* Mobile Hamburger Drawer Trigger */}
        <button
          id="mobile-drawer-trigger"
          onClick={onMenuClick}
          className="lg:hidden p-2 -ml-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-500 dark:text-slate-400 cursor-pointer"
          aria-label="Open navigation drawer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6"
          >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        </button>

        {/* Header Titles */}
        <div className="flex flex-col">
          <h1 className="font-display text-xl md:text-2xl font-bold text-slate-800 dark:text-white leading-tight">
            {getPageTitle()}
          </h1>
          <p className="text-xs text-gray-500 dark:text-slate-400 font-sans hidden sm:block">
            Welcome back, <span className="font-medium text-slate-700 dark:text-slate-200">Sana Zubair</span>
          </p>
        </div>
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-3">
        {/* User Info & Avatar */}
        <div className="hidden sm:flex items-center gap-3 pr-2 border-r border-gray-200 dark:border-slate-800">
          <div className="text-right">
            <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">Sana Zubair</p>
            <p className="text-[10px] text-brand-orange font-mono uppercase tracking-wider">Owner / Admin</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-brand-orange/10 dark:bg-brand-orange/20 border border-brand-orange/30 text-brand-orange flex items-center justify-center font-display font-semibold text-sm">
            SZ
          </div>
        </div>

        {/* Global Theme Toggle */}
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      </div>
    </header>
  );
}
