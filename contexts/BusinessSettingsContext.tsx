"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { BusinessInfo } from '../types/settings';

interface BusinessSettingsContextType {
  businessInfo: BusinessInfo;
  updateBusinessInfo: (info: BusinessInfo) => void;
  clearAllData: () => void;
}

const DEFAULT_BUSINESS_INFO: BusinessInfo = {
  name: 'Device Collection',
  phone: '021-3456789',
  email: 'contact@devicecollection.com',
  address: 'Plot 123, Block 2, Gulshan-e-Iqbal, Karachi, Pakistan',
  logoUrl: '',
  currencySymbol: 'Rs.',
  defaultWarrantyText: '1 Year Official Warranty on all mobile handsets and electronic home appliances.',
  termsAndConditions: 'The customer agrees to pay installments on or before the due date. Failure to pay within 7 days of the due date may result in a physical visit and/or plan suspension. The device remains the property of Device Collection until all dues are paid in full.'
};

const BusinessSettingsContext = createContext<BusinessSettingsContextType | undefined>(undefined);

export function BusinessSettingsProvider({ children }: { children: React.ReactNode }) {
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('business_info_v1');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error('Error parsing business info from localStorage', e);
        }
      }
    }
    return DEFAULT_BUSINESS_INFO;
  });

  useEffect(() => {
    localStorage.setItem('business_info_v1', JSON.stringify(businessInfo));
  }, [businessInfo]);

  const updateBusinessInfo = (info: BusinessInfo) => {
    setBusinessInfo(info);
  };

  const clearAllData = () => {
    if (typeof window !== 'undefined') {
      localStorage.clear();
      setBusinessInfo(DEFAULT_BUSINESS_INFO);
      // Trigger reload to refresh state across the app
      window.location.reload();
    }
  };

  return (
    <BusinessSettingsContext.Provider value={{ businessInfo, updateBusinessInfo, clearAllData }}>
      {children}
    </BusinessSettingsContext.Provider>
  );
}

export function useBusinessSettings() {
  const context = useContext(BusinessSettingsContext);
  if (!context) {
    throw new Error('useBusinessSettings must be used within a BusinessSettingsProvider');
  }
  return context;
}
