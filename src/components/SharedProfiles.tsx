import React, { useState } from 'react';
import { Currency, SharedProfile } from '../types';
import { 
  HomeIcon, 
  BriefcaseIcon, 
  UserGroupIcon, 
  ArrowUpIcon,
  ArrowTopRightOnSquareIcon,
  BuildingOfficeIcon,
  AcademicCapIcon,
  TruckIcon,
  HeartIcon
} from '@heroicons/react/24/outline';
import { SharedProfileModal } from './SharedProfileModal';

interface SharedProfilesProps {
  currentCurrency: Currency;
  profiles: SharedProfile[];
}

const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-GB', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
};

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
};

export const SharedProfiles: React.FC<SharedProfilesProps> = ({ currentCurrency, profiles }) => {
  const [selectedProfile, setSelectedProfile] = useState<SharedProfile | null>(null);
  const [upvotes, setUpvotes] = useState<Record<string, number>>({});

  if (profiles.length === 0) return null;

  const handleUpvote = (profileId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setUpvotes(prev => ({
      ...prev,
      [profileId]: (prev[profileId] || 0) + 1
    }));
  };

  return (
    <div className="bg-white p-6">
      <h2 className="text-xl font-semibold mb-6">Community Shared Expenses</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {profiles.map((profile) => {
          const totalExpenses = profile.expenses.reduce((sum, exp) => sum + exp.amount, 0);
          const monthlyExpenses = totalExpenses / 12;
          const convertedMonthly = (monthlyExpenses * profile.currency.rate) / currentCurrency.rate;

          return (
            <div
              key={profile.id}
              className="bg-white border border-gray-200 hover:border-blue-300 shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="p-4">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2">
                    <BuildingOfficeIcon className="h-5 w-5 text-blue-600" />
                    <span className="font-medium text-gray-900">{profile.location}</span>
                  </div>
                  <span className="text-xs text-gray-500">
                    {formatDate(profile.date)}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <UserGroupIcon className="h-4 w-4" />
                    <span>Family of {profile.familySize}</span>
                    {profile.pets > 0 && <span>• {profile.pets} pets</span>}
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <HomeIcon className="h-4 w-4" />
                    <span>{profile.bedrooms} {profile.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}</span>
                    <span>•</span>
                    <span>{profile.housingStatus === 'own' ? 'Owner' : 'Renting'}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <BriefcaseIcon className="h-4 w-4" />
                    <span className="capitalize">{profile.workStyle}</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-2">
                    {profile.benefits.housing && (
                      <div className="flex items-center gap-1 text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                        <HomeIcon className="h-3 w-3" />
                        <span>Housing</span>
                      </div>
                    )}
                    {profile.benefits.education && (
                      <div className="flex items-center gap-1 text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded">
                        <AcademicCapIcon className="h-3 w-3" />
                        <span>Education</span>
                      </div>
                    )}
                    {profile.benefits.transport && (
                      <div className="flex items-center gap-1 text-xs bg-green-50 text-green-700 px-2 py-1 rounded">
                        <TruckIcon className="h-3 w-3" />
                        <span>Transport</span>
                      </div>
                    )}
                    {profile.benefits.insurance && (
                      <div className="flex items-center gap-1 text-xs bg-red-50 text-red-700 px-2 py-1 rounded">
                        <HeartIcon className="h-3 w-3" />
                        <span>Insurance</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t">
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-sm text-gray-500">Monthly Expenses</p>
                        <p className="text-lg font-semibold text-gray-900">
                          {currentCurrency.symbol}{formatNumber(convertedMonthly)}
                        </p>
                        <p className="text-xs text-gray-500">
                          AED {formatNumber(monthlyExpenses * profile.currency.rate)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => handleUpvote(profile.id, e)}
                          className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600 transition-colors px-2 py-1 rounded-full hover:bg-blue-50"
                        >
                          <ArrowUpIcon className="h-4 w-4" />
                          <span>{upvotes[profile.id] || 0}</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedProfile(profile)}
                    className="w-full mt-4 flex items-center justify-center gap-1.5 text-sm px-4 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-colors rounded-md border border-blue-200 hover:border-blue-300"
                  >
                    <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                    View Details
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {selectedProfile && (
        <SharedProfileModal
          profile={selectedProfile}
          currentCurrency={currentCurrency}
          onClose={() => setSelectedProfile(null)}
        />
      )}
    </div>
  );
};