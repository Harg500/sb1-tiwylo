import React from 'react';
import { Expense, Currency } from '../types';
import { ChartBarIcon } from '@heroicons/react/24/outline';

interface ExpenseAveragesProps {
  expenses: Expense[];
  currency: Currency;
}

const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-GB', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
};

export const ExpenseAverages: React.FC<ExpenseAveragesProps> = ({ expenses, currency }) => {
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const averageExpense = expenses.length > 0 ? totalExpenses / expenses.length : 0;
  const monthlyAverage = totalExpenses / 12;
  const weeklyAverage = monthlyAverage / 4;

  return (
    <div className="bg-white p-6">
      <div className="flex items-center gap-2 mb-4">
        <ChartBarIcon className="h-5 w-5 text-blue-600" />
        <h2 className="text-lg font-semibold">Average Costs</h2>
      </div>
      
      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-500">Average Per Expense</p>
          <p className="text-lg font-semibold">{currency.symbol}{formatNumber(averageExpense)}</p>
          <p className="text-sm text-gray-500">AED {formatNumber(averageExpense * currency.rate)}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Monthly Average</p>
          <p className="text-lg font-semibold">{currency.symbol}{formatNumber(monthlyAverage)}</p>
          <p className="text-sm text-gray-500">AED {formatNumber(monthlyAverage * currency.rate)}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Weekly Average</p>
          <p className="text-lg font-semibold">{currency.symbol}{formatNumber(weeklyAverage)}</p>
          <p className="text-sm text-gray-500">AED {formatNumber(weeklyAverage * currency.rate)}</p>
        </div>
      </div>
    </div>
  );
};