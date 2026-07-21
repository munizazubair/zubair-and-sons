"use client";
import React, { useRef, useState, useEffect } from 'react';
import { Building, Users, Shield, Award, Database } from 'lucide-react';

export type SettingsTabId = 'business' | 'staff' | 'roles' | 'backup';

interface TabItem {
  id: SettingsTabId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const TABS: TabItem[] = [
  { id: 'business', label: 'Business Info', icon: Building },
  { id: 'staff', label: 'Staff Management', icon: Users },
  { id: 'roles', label: 'Roles & Permissions', icon: Award },
  { id: 'backup', label: 'Backup & Export', icon: Database },
];

interface SettingsTabsProps {
  activeTab: SettingsTabId;
  onChangeTab: (id: SettingsTabId) => void;
}

export default function SettingsTabs({ activeTab, onChangeTab }: SettingsTabsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showLeftFade, setShowLeftFade] = useState(false);
  const [showRightFade, setShowRightFade] = useState(false);

  const checkScroll = () => {
    const el = containerRef.current;
    if (el) {
      const { scrollLeft, scrollWidth, clientWidth } = el;
      setShowLeftFade(scrollLeft > 5);
      setShowRightFade(scrollLeft + clientWidth < scrollWidth - 5);
    }
  };

  useEffect(() => {
    const el = containerRef.current;
    if (el) {
      checkScroll();
      el.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
      
      const observer = new ResizeObserver(checkScroll);
      observer.observe(el);

      return () => {
        el.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
        observer.disconnect();
      };
    }
  }, []);

  return (
    <div className="w-full border-b border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-20 z-10 px-1">
      <div className="relative w-full">
        {/* Left Fade Overlay */}
        <div
          className={`pointer-events-none absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white dark:from-slate-900 to-transparent z-10 transition-opacity duration-300 ${
            showLeftFade ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Right Fade Overlay */}
        <div
          className={`pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white dark:from-slate-900 to-transparent z-10 transition-opacity duration-300 ${
            showRightFade ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Tab Scroll Container */}
        <div
          ref={containerRef}
          className="flex flex-nowrap space-x-6 overflow-x-auto no-scrollbar scroll-smooth -mb-px py-1"
        >
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onChangeTab(tab.id)}
                className={`flex items-center gap-2.5 py-3 px-3 border-b-2 font-display text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'border-brand-orange text-brand-orange font-bold'
                    : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                }`}
                style={{ minHeight: '44px' }}
              >
                <Icon className={`w-4.5 h-4.5 ${isActive ? 'text-brand-orange' : 'text-slate-400 dark:text-slate-500'}`} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
