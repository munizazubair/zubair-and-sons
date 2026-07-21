"use client";
import { useState } from 'react';
import { motion } from 'motion/react';
import SettingsTabs, { SettingsTabId } from '../dashboard/settings/SettingsTabs';
import BusinessInfoForm from '../dashboard/settings/BusinessInfoForm';
import PreferencesCard from '../dashboard/settings/PreferencesCard';
import StaffList from '../dashboard/settings/StaffList';
import RolesComparisonCards from '../dashboard/settings/RolesComparisonCards';
import BackupExportCard from '../dashboard/settings/BackupExportCard';

export default function SettingsSubPage() {
  const [activeTab, setActiveTab] = useState<SettingsTabId>('business');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'business':
        return (
          <motion.div
            key="business"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <BusinessInfoForm />
            <PreferencesCard />
          </motion.div>
        );
      case 'staff':
        return (
          <motion.div
            key="staff"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <StaffList />
          </motion.div>
        );
      case 'roles':
        return (
          <motion.div
            key="roles"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <RolesComparisonCards />
          </motion.div>
        );
      case 'backup':
        return (
          <motion.div
            key="backup"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <BackupExportCard />
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 px-1 md:px-4 py-2">
      <div className="space-y-1">
        <h2 className="text-xl md:text-2xl font-bold font-display text-slate-800 dark:text-white">
          Settings
        </h2>
        <p className="text-xs md:text-sm text-gray-500 dark:text-slate-400">
          Configure business details, provision staff credentials, verify access rules, and download offline backups.
        </p>
      </div>

      <SettingsTabs activeTab={activeTab} onChangeTab={setActiveTab} />

      <div className="pt-2 min-h-[400px]">
        {renderTabContent()}
      </div>
    </div>
  );
}
