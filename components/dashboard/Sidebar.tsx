"use client";
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SidebarItem, SidebarNavId } from '../../types/dashboard';
import SidebarNavItem from './SidebarNavItem';

interface SidebarProps {
  activeItem: SidebarNavId;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

const NAV_ITEMS: SidebarItem[] = [
  { id: 'dashboard', label: 'Dashboard', path: '/dashboard' },
  { id: 'customers', label: 'Customers', path: '/dashboard/customers' },
  { id: 'recovery', label: "Today's Recovery", path: '/dashboard/today' },
  { id: 'records', label: 'Records', path: '/dashboard/records' },
  { id: 'add-customer', label: 'Add Customer', path: '/dashboard/add-customer' },
  { id: 'settings', label: 'Settings', path: '/dashboard/settings' },
];

export default function Sidebar({
  activeItem,
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
}: SidebarProps) {
  const router = useRouter();

  // Mock user data for now — replace with real auth data later
  const userName = "sanazubair071";
  const userRole = "Administrator";

  const handleSignOut = () => {
    router.push('/signin');
  };

  const toggleCollapse = () => {
    const nextState = !collapsed;
    setCollapsed(nextState);
    localStorage.setItem('sidebarCollapsed', JSON.stringify(nextState));
  };

  const handleNavItemClick = () => {
    setMobileOpen(false);
  };

  const ProfileFooter = ({ isCollapsed }: { isCollapsed: boolean }) => (
    <div className="p-4 border-t border-gray-200 dark:border-slate-800 space-y-3">
      <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''}`}>
        <div className="w-10 h-10 rounded-full bg-brand-orange/20 text-brand-orange flex items-center justify-center font-bold text-lg flex-shrink-0">
          {userName.charAt(0).toUpperCase()}
        </div>
        {!isCollapsed && (
          <div className="overflow-hidden">
            <p className="font-semibold text-sm text-slate-800 dark:text-white truncate">
              {userName}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
              {userRole}
            </p>
          </div>
        )}
      </div>

      {!isCollapsed && (
        <div className="flex gap-2">
          <Link
            href="/"
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-gray-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors duration-150"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>
            Store
          </Link>
          <button
            onClick={handleSignOut}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors duration-150"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <path d="M16 17l5-5-5-5" />
              <path d="M21 12H9" />
            </svg>
            Sign Out
          </button>
        </div>
      )}
    </div>
  );

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-800 transition-colors duration-300">
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-slate-800">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-9 h-9 rounded-lg bg-brand-orange text-white flex items-center justify-center flex-shrink-0 shadow-sm shadow-brand-orange/30">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <path d="M2.7 10.3a2.4 2.4 0 0 0 0 3.4l7.6 7.6a2.4 2.4 0 0 0 3.4 0l7.6-7.6a2.4 2.4 0 0 0 0-3.4L13.7 2.7a2.4 2.4 0 0 0-3.4 0z" />
            </svg>
          </div>
          <span className={`font-display font-bold text-lg text-slate-800 dark:text-white tracking-tight transition-all duration-300 ${collapsed ? 'opacity-0 w-0 overflow-hidden scale-95' : 'opacity-100 w-auto scale-100'}`}>
            Device Collection
          </span>
        </div>
        <button
          onClick={toggleCollapse}
          className="hidden lg:flex p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-500 dark:text-slate-400 cursor-pointer"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`w-5 h-5 transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`}>
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
      </div>

      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto overflow-x-hidden">
        {NAV_ITEMS.map((item) => (
          <Link key={item.id} href={item.path} onClick={handleNavItemClick}>
            <SidebarNavItem
              id={item.id}
              label={item.label}
              active={activeItem === item.id}
              collapsed={collapsed}
              onClick={() => {}}
            />
          </Link>
        ))}
      </nav>

      <ProfileFooter isCollapsed={collapsed} />
    </div>
  );

  return (
    <>
      <aside className={`hidden lg:block fixed top-0 left-0 bottom-0 z-20 h-screen transition-all duration-300 ease-in-out ${collapsed ? 'w-[72px]' : 'w-[260px]'}`}>
        {sidebarContent}
      </aside>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-xs z-30 transition-opacity duration-300" onClick={() => setMobileOpen(false)} />
      )}

      <aside className={`lg:hidden fixed top-0 left-0 bottom-0 z-40 w-[260px] h-screen transition-transform duration-300 ease-out ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-full">
          <div className="flex flex-col h-full bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-800">
            <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-brand-orange text-white flex items-center justify-center flex-shrink-0 shadow-sm shadow-brand-orange/30">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <path d="M2.7 10.3a2.4 2.4 0 0 0 0 3.4l7.6 7.6a2.4 2.4 0 0 0 3.4 0l7.6-7.6a2.4 2.4 0 0 0 0-3.4L13.7 2.7a2.4 2.4 0 0 0-3.4 0z" />
                  </svg>
                </div>
                <span className="font-display font-bold text-lg text-slate-800 dark:text-white tracking-tight">Device Collection</span>
              </div>
              <button onClick={() => setMobileOpen(false)} className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-500 dark:text-slate-400 cursor-pointer" aria-label="Close sidebar">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
              {NAV_ITEMS.map((item) => (
                <Link key={item.id} href={item.path} onClick={handleNavItemClick}>
                  <SidebarNavItem
                    id={item.id}
                    label={item.label}
                    active={activeItem === item.id}
                    collapsed={false}
                    onClick={() => {}}
                  />
                </Link>
              ))}
            </nav>
            <ProfileFooter isCollapsed={false} />
          </div>
        </div>
      </aside>
    </>
  );
}