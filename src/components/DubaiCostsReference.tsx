import React from 'react';
import { Currency } from '../types';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

interface DubaiCostsReferenceProps {
  currency: Currency;
}

const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-GB', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
};

interface CostItem {
  name: string;
  monthly?: number;
  yearly?: number;
  cost?: number;
}

// Average costs in AED
const DUBAI_COSTS: Record<string, CostItem[]> = {
  housing: [
    { name: 'Studio Apartment (City)', monthly: 5000 },
    { name: '1 BHK Apartment (City)', monthly: 7000 },
    { name: '2 BHK Apartment (City)', monthly: 9500 },
    { name: '3 BHK Apartment (City)', monthly: 13000 },
    { name: 'Villa (3 Bedroom)', monthly: 18000 },
  ],
  utilities: [
    { name: 'DEWA (2-3 people)', monthly: 800 },
    { name: 'Internet (High Speed)', monthly: 389 },
    { name: 'Mobile Plan', monthly: 200 },
    { name: 'District Cooling (2BHK)', monthly: 600 },
  ],
  education: [
    { name: 'Primary School', yearly: 45000 },
    { name: 'Secondary School', yearly: 65000 },
    { name: 'IB School', yearly: 85000 },
  ],
  transport: [
    { name: 'Car Lease (SUV)', monthly: 2500 },
    { name: 'Petrol (Full Tank)', cost: 250 },
    { name: 'Metro Card', monthly: 350 },
    { name: 'Salik (Toll) Tag', cost: 50 },
  ],
  lifestyle: [
    { name: 'Gym Membership', monthly: 300 },
    { name: 'Dining Out (per person)', cost: 150 },
    { name: 'Groceries (2 people)', monthly: 2500 },
    { name: 'Health Insurance', yearly: 5000 },
  ],
  help: [
    { name: 'Full-time Maid', monthly: 3500 },
    { name: 'Part-time Maid', monthly: 1500 },
    { name: 'Nanny', monthly: 4000 },
  ]
};

export const DubaiCostsReference: React.FC<DubaiCostsReferenceProps> = ({ currency }) => {
  const convertAmount = (amount: number) => amount / currency.rate;

  return (
    <div className="bg-white p-6">
      <div className="flex items-center gap-2 mb-6">
        <InformationCircleIcon className="h-6 w-6 text-blue-600" />
        <h2 className="text-lg font-semibold">Dubai Average Living Costs</h2>
      </div>

      <div className="space-y-8">
        <div>
          <h3 className="text-md font-semibold mb-3 text-gray-900">Housing (Monthly Rent)</h3>
          <div className="space-y-2">
            {DUBAI_COSTS.housing.map((item) => (
              <div key={item.name} className="flex justify-between items-center text-sm">
                <span className="text-gray-600">{item.name}</span>
                <div className="text-right">
                  <div>{currency.symbol}{formatNumber(convertAmount(item.monthly || 0))}</div>
                  <div className="text-xs text-gray-500">AED {formatNumber(item.monthly || 0)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-md font-semibold mb-3 text-gray-900">Utilities (Monthly)</h3>
          <div className="space-y-2">
            {DUBAI_COSTS.utilities.map((item) => (
              <div key={item.name} className="flex justify-between items-center text-sm">
                <span className="text-gray-600">{item.name}</span>
                <div className="text-right">
                  <div>{currency.symbol}{formatNumber(convertAmount(item.monthly || 0))}</div>
                  <div className="text-xs text-gray-500">AED {formatNumber(item.monthly || 0)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-md font-semibold mb-3 text-gray-900">Education (Yearly)</h3>
          <div className="space-y-2">
            {DUBAI_COSTS.education.map((item) => (
              <div key={item.name} className="flex justify-between items-center text-sm">
                <span className="text-gray-600">{item.name}</span>
                <div className="text-right">
                  <div>{currency.symbol}{formatNumber(convertAmount(item.yearly || 0))}</div>
                  <div className="text-xs text-gray-500">AED {formatNumber(item.yearly || 0)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-md font-semibold mb-3 text-gray-900">Transport</h3>
          <div className="space-y-2">
            {DUBAI_COSTS.transport.map((item) => (
              <div key={item.name} className="flex justify-between items-center text-sm">
                <span className="text-gray-600">{item.name}</span>
                <div className="text-right">
                  <div>
                    {currency.symbol}{formatNumber(convertAmount(item.monthly || item.cost || 0))}
                    {item.monthly ? '/month' : ''}
                  </div>
                  <div className="text-xs text-gray-500">
                    AED {formatNumber(item.monthly || item.cost || 0)}
                    {item.monthly ? '/month' : ''}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-md font-semibold mb-3 text-gray-900">Lifestyle</h3>
          <div className="space-y-2">
            {DUBAI_COSTS.lifestyle.map((item) => (
              <div key={item.name} className="flex justify-between items-center text-sm">
                <span className="text-gray-600">{item.name}</span>
                <div className="text-right">
                  <div>
                    {currency.symbol}{formatNumber(convertAmount(item.monthly || item.yearly || item.cost || 0))}
                    {item.monthly ? '/month' : item.yearly ? '/year' : ''}
                  </div>
                  <div className="text-xs text-gray-500">
                    AED {formatNumber(item.monthly || item.yearly || item.cost || 0)}
                    {item.monthly ? '/month' : item.yearly ? '/year' : ''}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-md font-semibold mb-3 text-gray-900">Household Help (Monthly)</h3>
          <div className="space-y-2">
            {DUBAI_COSTS.help.map((item) => (
              <div key={item.name} className="flex justify-between items-center text-sm">
                <span className="text-gray-600">{item.name}</span>
                <div className="text-right">
                  <div>{currency.symbol}{formatNumber(convertAmount(item.monthly || 0))}</div>
                  <div className="text-xs text-gray-500">AED {formatNumber(item.monthly || 0)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 text-xs text-gray-500">
        * These are average costs and may vary based on location, quality, and specific requirements.
        Prices are based on 2023 market rates.
      </div>
    </div>
  );
};