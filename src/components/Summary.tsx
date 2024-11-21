import React from 'react';
import { Expense, Currency } from '../types';
import { CurrencyDollarIcon, ArrowTrendingUpIcon, ArrowTrendingDownIcon } from '@heroicons/react/24/outline';

interface SummaryProps {
  expenses: Expense[];
  currency: Currency;
  yearlyIncome: number;
  onIncomeChange: (income: number) => void;
}

const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-GB', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
};

export const Summary: React.FC<SummaryProps> = ({
  expenses,
  currency,
  yearlyIncome,
  onIncomeChange,
}) => {
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const monthlyExpenses = totalExpenses / 12;
  const yearlyBalance = yearlyIncome - totalExpenses;
  const monthlyBalance = yearlyBalance / 12;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm text-gray-500">Yearly Income</p>
            <div className="mt-2 relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-2">
                <span className="text-gray-500">{currency.symbol}</span>
              </div>
              <input
                type="number"
                value={yearlyIncome || ''}
                onChange={(e) => onIncomeChange(parseFloat(e.target.value) || 0)}
                className="text-2xl font-bold bg-transparent w-full pl-6 border-0 focus:ring-0 p-0"
                placeholder="0.00"
              />
            </div>
            <p className="text-sm text-gray-500 mt-1">
              AED {formatNumber(yearlyIncome * currency.rate)}
            </p>
          </div>
          <div className="bg-blue-50 p-2">
            <CurrencyDollarIcon className="h-6 w-6 text-blue-600" />
          </div>
        </div>
      </div>

      <div className="bg-white p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Expenses</p>
            <p className="text-2xl font-bold mt-2">
              {currency.symbol}{formatNumber(totalExpenses)}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              AED {formatNumber(totalExpenses * currency.rate)}
            </p>
          </div>
          <div className="bg-red-50 p-2">
            <ArrowTrendingUpIcon className="h-6 w-6 text-red-600" />
          </div>
        </div>
      </div>

      <div className="bg-white p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-gray-500">Monthly Balance</p>
            <p className="text-2xl font-bold mt-2">
              {currency.symbol}{formatNumber(monthlyBalance)}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              AED {formatNumber(monthlyBalance * currency.rate)}
            </p>
          </div>
          <div className="bg-green-50 p-2">
            <ArrowTrendingDownIcon className="h-6 w-6 text-green-600" />
          </div>
        </div>
      </div>
    </div>
  );
};