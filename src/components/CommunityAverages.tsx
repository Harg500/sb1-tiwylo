import React, { useMemo } from 'react';
import { SharedProfile, Currency } from '../types';
import { MapPinIcon, HomeIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';

interface CommunityAveragesProps {
  profiles: SharedProfile[];
  currency: Currency;
}

const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-GB', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
};

export const CommunityAverages: React.FC<CommunityAveragesProps> = ({
  profiles,
  currency,
}) => {
  const locationStats = useMemo(() => {
    const stats = new Map<string, {
      yearlyRents: number[];
      bedrooms: number[];
      housingTypes: ('rent' | 'own')[];
      dates: string[];
    }>();

    profiles.forEach(profile => {
      const housingExpenses = profile.expenses.filter(exp => 
        exp.name.toLowerCase().includes('rent') || 
        exp.name.toLowerCase().includes('mortgage') ||
        exp.name.toLowerCase().includes('housing')
      );

      if (housingExpenses.length > 0) {
        const yearlyHousingCost = housingExpenses.reduce((sum, exp) => sum + exp.amount, 0);
        const convertedCost = yearlyHousingCost * profile.currency.rate; // Convert to AED

        const locationData = stats.get(profile.location) || {
          yearlyRents: [],
          bedrooms: [],
          housingTypes: [],
          dates: [],
        };

        locationData.yearlyRents.push(convertedCost);
        locationData.bedrooms.push(profile.bedrooms);
        locationData.housingTypes.push(profile.housingStatus);
        locationData.dates.push(profile.date);

        stats.set(profile.location, locationData);
      }
    });

    return Array.from(stats.entries())
      .map(([location, data]) => ({
        location,
        averageYearlyRent: data.yearlyRents.reduce((a, b) => a + b, 0) / data.yearlyRents.length,
        minYearlyRent: Math.min(...data.yearlyRents),
        maxYearlyRent: Math.max(...data.yearlyRents),
        averageBedrooms: data.bedrooms.reduce((a, b) => a + b, 0) / data.bedrooms.length,
        bedroomRange: `${Math.min(...data.bedrooms)}-${Math.max(...data.bedrooms)}`,
        sampleSize: data.yearlyRents.length,
        rentPercentage: (data.housingTypes.filter(t => t === 'rent').length / data.housingTypes.length) * 100,
        mostRecentDate: new Date(Math.max(...data.dates.map(d => new Date(d).getTime()))),
      }))
      .sort((a, b) => b.mostRecentDate.getTime() - a.mostRecentDate.getTime());
  }, [profiles]);

  if (locationStats.length === 0) {
    return null;
  }

  const convertFromAED = (amount: number) => amount / currency.rate;

  return (
    <div className="bg-white p-6">
      <div className="flex items-center gap-2 mb-6">
        <BuildingOfficeIcon className="h-6 w-6 text-blue-600" />
        <h2 className="text-lg font-semibold">Dubai Housing Costs by Location</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Yearly Cost
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Bedrooms
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Details
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {locationStats.map((stat) => (
              <tr key={stat.location} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <MapPinIcon className="h-5 w-5 text-gray-400 mr-2" />
                    <div>
                      <div className="font-medium text-gray-900">{stat.location}</div>
                      <div className="text-sm text-gray-500">
                        {stat.rentPercentage.toFixed(0)}% Renting
                      </div>
                      <div className="text-xs text-gray-400">
                        Last updated: {stat.mostRecentDate.toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm">
                    <div className="font-medium text-gray-900">
                      {currency.symbol}{formatNumber(convertFromAED(stat.averageYearlyRent))}
                    </div>
                    <div className="text-gray-500">
                      AED {formatNumber(stat.averageYearlyRent)}
                    </div>
                    <div className="text-xs text-gray-400">
                      Range: {currency.symbol}{formatNumber(convertFromAED(stat.minYearlyRent))} - {currency.symbol}{formatNumber(convertFromAED(stat.maxYearlyRent))}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <HomeIcon className="h-5 w-5 text-gray-400 mr-2" />
                    <div>
                      <div className="font-medium text-gray-900">
                        {stat.averageBedrooms.toFixed(1)} avg
                      </div>
                      <div className="text-sm text-gray-500">
                        Range: {stat.bedroomRange} BR
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <div>Based on {stat.sampleSize} {stat.sampleSize === 1 ? 'profile' : 'profiles'}</div>
                  <div>Monthly: {currency.symbol}{formatNumber(convertFromAED(stat.averageYearlyRent / 12))}</div>
                  <div>Monthly: AED {formatNumber(stat.averageYearlyRent / 12)}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-6 text-xs text-gray-500">
        * These averages are based on community-shared data and may not represent the entire market.
        Actual prices may vary based on specific locations, amenities, and market conditions.
      </p>
    </div>
  );
};