import React, { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Expense, Currency, DUBAI_LOCATIONS, SharedProfile, DubaiLocation } from '../types';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  expenses: Expense[];
  currency: Currency;
  yearlyIncome: number;
  onProfileShared: (profile: SharedProfile) => void;
}

interface FormData {
  familySize: string;
  pets: string;
  location: DubaiLocation;
  bedrooms: string;
  housingStatus: 'rent' | 'own';
  workStyle: 'remote' | 'office' | 'hybrid';
  benefits: {
    housing: boolean;
    education: boolean;
    transport: boolean;
    insurance: boolean;
  };
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  expenses,
  currency,
  yearlyIncome,
  onProfileShared,
}) => {
  const [formData, setFormData] = useState<FormData>({
    familySize: '1',
    pets: '0',
    location: DUBAI_LOCATIONS[0],
    bedrooms: '1',
    housingStatus: 'rent',
    workStyle: 'office',
    benefits: {
      housing: false,
      education: false,
      transport: false,
      insurance: false,
    },
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const profile: SharedProfile = {
      id: crypto.randomUUID(),
      ...formData,
      familySize: parseInt(formData.familySize) || 1,
      pets: parseInt(formData.pets) || 0,
      bedrooms: parseInt(formData.bedrooms) || 1,
      currency,
      expenses,
      yearlyIncome,
      date: new Date().toISOString(),
    };

    onProfileShared(profile);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl">
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-xl font-semibold">Share Your Experience</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Family Size
              </label>
              <input
                type="number"
                min="1"
                value={formData.familySize}
                onChange={(e) => setFormData({ ...formData, familySize: e.target.value })}
                className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Number of Pets
              </label>
              <input
                type="number"
                min="0"
                value={formData.pets}
                onChange={(e) => setFormData({ ...formData, pets: e.target.value })}
                className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Number of Bedrooms
              </label>
              <input
                type="number"
                min="1"
                value={formData.bedrooms}
                onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Housing Status
              </label>
              <select
                value={formData.housingStatus}
                onChange={(e) => setFormData({ ...formData, housingStatus: e.target.value as 'rent' | 'own' })}
                className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="rent">Renting</option>
                <option value="own">Own Property</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <select
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value as DubaiLocation })}
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              {DUBAI_LOCATIONS.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Work Style
            </label>
            <select
              value={formData.workStyle}
              onChange={(e) => setFormData({ ...formData, workStyle: e.target.value as 'remote' | 'office' | 'hybrid' })}
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="office">Office Based</option>
              <option value="remote">Remote</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Benefits
            </label>
            <div className="space-y-2">
              {Object.entries(formData.benefits).map(([benefit, value]) => (
                <label key={benefit} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => setFormData({
                      ...formData,
                      benefits: {
                        ...formData.benefits,
                        [benefit]: e.target.checked,
                      },
                    })}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700 capitalize">
                    {benefit}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Share Experience
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};