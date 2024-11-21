import React from 'react';
import { ShareIcon } from '@heroicons/react/24/outline';
import { Expense, Currency } from '../types';

interface ExportButtonsProps {
  expenses: Expense[];
  currency: Currency;
  yearlyIncome: number;
}

export const ExportButtons: React.FC<ExportButtonsProps> = ({
  expenses,
  currency,
  yearlyIncome,
}) => {
  const handleShare = () => {
    // Future implementation for sharing functionality
    console.log('Share functionality coming soon');
  };
  
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Share Expenses
      </label>
      <button
        onClick={handleShare}
        className="inline-flex items-center gap-1.5 text-sm px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 transition-colors rounded-md"
        title="Share expenses"
      >
        <ShareIcon className="h-4 w-4" />
        Share
      </button>
    </div>
  );
};