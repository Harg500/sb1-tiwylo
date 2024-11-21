import React, { useState } from 'react';
import { ShareIcon } from '@heroicons/react/24/outline';
import { ShareModal } from './ShareModal';
import { Expense, Currency, SharedProfile } from '../types';

interface ShareExpensesButtonProps {
  expenses: Expense[];
  currency: Currency;
  yearlyIncome: number;
  onProfileShared: (profile: SharedProfile) => void;
}

export const ShareExpensesButton: React.FC<ShareExpensesButtonProps> = ({
  expenses,
  currency,
  yearlyIncome,
  onProfileShared,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="inline-flex items-center gap-1.5 text-sm px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 transition-colors rounded-md"
      >
        <ShareIcon className="h-4 w-4" />
        Share My Expenses
      </button>

      <ShareModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        expenses={expenses}
        currency={currency}
        yearlyIncome={yearlyIncome}
        onProfileShared={onProfileShared}
      />
    </>
  );
};