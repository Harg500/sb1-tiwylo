import React from 'react';
import { TrashIcon } from '@heroicons/react/24/solid';
import { Expense, Currency } from '../types';

interface ExpenseListProps {
  expenses: Expense[];
  onDeleteExpense: (id: string) => void;
  currency: Currency;
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

export const ExpenseList: React.FC<ExpenseListProps> = ({
  expenses,
  onDeleteExpense,
  currency,
}) => {
  const totalLocal = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const totalAED = totalLocal * currency.rate;

  return (
    <div className="space-y-3">
      {expenses.map((expense) => (
        <div
          key={expense.id}
          className="flex items-center justify-between bg-gray-50 p-4 hover:bg-gray-100 transition-colors"
        >
          <div className="flex flex-col">
            <span className="font-medium text-gray-900">{expense.name}</span>
            <span className="text-sm text-gray-500">Added {formatDate(expense.date)}</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <div className="font-semibold text-gray-900">
                {currency.symbol}{formatNumber(expense.amount)}
              </div>
              <div className="text-sm text-gray-600">
                AED {formatNumber(expense.amount * currency.rate)}
              </div>
            </div>
            <button
              onClick={() => onDeleteExpense(expense.id)}
              className="text-red-600 hover:text-red-800 transition-colors p-1"
              aria-label="Delete expense"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      ))}

      {expenses.length > 0 && (
        <div className="mt-6 border-t pt-4">
          <div className="flex items-center justify-between bg-blue-50 p-4">
            <span className="font-semibold text-blue-900">Running Total</span>
            <div className="text-right">
              <div className="text-lg font-bold text-blue-900">
                {currency.symbol}{formatNumber(totalLocal)}
              </div>
              <div className="text-sm font-medium text-blue-800">
                AED {formatNumber(totalAED)}
              </div>
            </div>
          </div>
        </div>
      )}

      {expenses.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No expenses added yet. Add your first expense above.
        </div>
      )}
    </div>
  );
};