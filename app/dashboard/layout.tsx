"use client";
import { ReactNode, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useTheme } from '../../hooks/useTheme';
import Sidebar from '../../components/dashboard/Sidebar';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import { BusinessSettingsProvider } from '../../contexts/BusinessSettingsContext';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  const activeItem = pathname.includes('/dashboard/customers')
    ? 'customers'
    : pathname.includes('/dashboard/today')
    ? 'recovery'
    : pathname.includes('/dashboard/records')
    ? 'records'
    : pathname.includes('/dashboard/add-customer')
    ? 'add-customer'
    : pathname.includes('/dashboard/settings')
    ? 'settings'
    : 'dashboard';

  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  useEffect(() => {
    const saved = localStorage.getItem('sidebarCollapsed');
    if (saved) {
      setCollapsed(JSON.parse(saved));
    }
  }, []);

  return (
    <BusinessSettingsProvider>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300 flex flex-col font-sans">
        <Sidebar
          activeItem={activeItem as any}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />

        <div
          className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
            collapsed ? 'lg:pl-[72px]' : 'lg:pl-[260px]'
          }`}
        >
          <DashboardHeader
            activeItem={activeItem as any}
            theme={theme}
            toggleTheme={toggleTheme}
            onMenuClick={() => setMobileOpen(true)}
          />

          <main className="flex-1 p-4 md:p-8 overflow-y-auto">
            <div className="max-w-7xl mx-auto w-full">
              {children}
            </div>
          </main>
        </div>
      </div>
    </BusinessSettingsProvider>
  );
}