"use client";
import React, { useState, useEffect } from 'react';
import { useBusinessSettings } from '../../../contexts/BusinessSettingsContext';
import { BusinessInfo } from '../../../types/settings';
import { Building, Phone, Mail, MapPin, DollarSign, Award, FileText, Upload } from 'lucide-react';
import Button from '../../ui/Button';

export default function BusinessInfoForm() {
  const { businessInfo, updateBusinessInfo } = useBusinessSettings();
  const [formData, setFormData] = useState<BusinessInfo>({ ...businessInfo });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  // Sync state if context changes
  useEffect(() => {
    setFormData({ ...businessInfo });
  }, [businessInfo]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error && (name === 'name' || name === 'phone')) {
      setError(null);
    }
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, logoUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError('Business Name is required.');
      return;
    }
    if (!formData.phone.trim()) {
      setError('Phone Number is required.');
      return;
    }

    setError(null);
    updateBusinessInfo(formData);
    setSuccess(true);

    const timer = setTimeout(() => {
      setSuccess(false);
    }, 2000);

    return () => clearTimeout(timer);
  };

  return (
    <div className="rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-2xs">
      <h3 className="font-display font-bold text-lg text-slate-800 dark:text-white mb-6 flex items-center gap-2">
        <Building className="w-5 h-5 text-brand-orange" />
        Business Profile Configuration
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Logo upload with thumbnail */}
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-gray-100 dark:border-slate-800/60">
          <div className="relative w-24 h-24 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/40 flex items-center justify-center overflow-hidden">
            {formData.logoUrl ? (
              <img
                src={formData.logoUrl}
                alt="Business Logo"
                className="w-full h-full object-contain"
              />
            ) : (
              <Building className="w-10 h-10 text-slate-300 dark:text-slate-600" />
            )}
          </div>
          <div className="flex-1 space-y-2 text-center sm:text-left">
            <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Company Logo
            </h4>
            <p className="text-xs text-gray-400 dark:text-slate-500">
              Provide a light image (PNG, JPG) to customize receipts and contract cards.
            </p>
            <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300 cursor-pointer transition-colors">
              <Upload className="w-3.5 h-3.5" />
              Upload Image
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                className="hidden"
              />
            </label>
            {formData.logoUrl && (
              <button
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, logoUrl: '' }))}
                className="text-xs font-medium text-red-500 hover:text-red-600 ml-3 cursor-pointer"
              >
                Remove
              </button>
            )}
          </div>
        </div>

        {/* Inputs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Business Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
              Business Name *
            </label>
            <div className="relative">
              <Building className="absolute left-3 top-2.5 w-4.5 h-4.5 text-gray-400 dark:text-slate-600" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:outline-hidden focus:ring-1 focus:ring-brand-orange"
                placeholder="e.g. Device Collection"
              />
            </div>
          </div>

          {/* Phone */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
              Phone Number *
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-2.5 w-4.5 h-4.5 text-gray-400 dark:text-slate-600" />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:outline-hidden focus:ring-1 focus:ring-brand-orange"
                placeholder="e.g. 021-3456789"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 w-4.5 h-4.5 text-gray-400 dark:text-slate-600" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:outline-hidden focus:ring-1 focus:ring-brand-orange"
                placeholder="e.g. support@company.com"
              />
            </div>
          </div>

          {/* Currency Symbol */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
              Currency Symbol
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-sm font-semibold text-gray-400 dark:text-slate-600">
                {formData.currencySymbol || '$'}
              </span>
              <input
                type="text"
                name="currencySymbol"
                value={formData.currencySymbol}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:outline-hidden focus:ring-1 focus:ring-brand-orange"
                placeholder="e.g. Rs."
              />
            </div>
          </div>

          {/* Business Address */}
          <div className="md:col-span-2 space-y-1.5">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
              Business Address
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-2.5 w-4.5 h-4.5 text-gray-400 dark:text-slate-600" />
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:outline-hidden focus:ring-1 focus:ring-brand-orange"
                placeholder="Full operational location"
              />
            </div>
          </div>

          {/* Warranty Terms */}
          <div className="md:col-span-2 space-y-1.5">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-gray-400 dark:text-slate-500" />
              Default Warranty Text
            </label>
            <textarea
              name="defaultWarrantyText"
              value={formData.defaultWarrantyText}
              onChange={handleInputChange}
              rows={2}
              className="w-full px-4 py-2 text-sm rounded-lg border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:outline-hidden focus:ring-1 focus:ring-brand-orange"
              placeholder="e.g. 1 Year Brand Warranty..."
            />
          </div>

          {/* Terms & Conditions Text */}
          <div className="md:col-span-2 space-y-1.5">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-1">
              <FileText className="w-3.5 h-3.5 text-gray-400 dark:text-slate-500" />
              Terms & Conditions Text (Back of Contract Card)
            </label>
            <textarea
              name="termsAndConditions"
              value={formData.termsAndConditions}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-2 text-sm rounded-lg border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:outline-hidden focus:ring-1 focus:ring-brand-orange leading-relaxed"
              placeholder="Provide system wide terms of installment contract..."
            />
          </div>
        </div>

        {/* Status messages and Save button */}
        <div className="pt-4 border-t border-gray-100 dark:border-slate-800/60 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="min-h-[24px]">
            {error && (
              <p className="text-xs font-semibold text-red-500 animate-pulse">
                {error}
              </p>
            )}
            {success && (
              <p className="text-xs font-semibold text-emerald-500 flex items-center gap-1">
                ✓ Changes saved successfully!
              </p>
            )}
          </div>
          <Button type="submit" variant="primary" className="bg-brand-orange text-white">
            Save Profile
          </Button>
        </div>
      </form>
    </div>
  );
}
