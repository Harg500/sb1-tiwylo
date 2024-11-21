import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Expense, Currency } from '../types';

interface ExpenseChartProps {
  expenses: Expense[];
  currency: Currency;
}

export const ExpenseChart: React.FC<ExpenseChartProps> = ({ expenses, currency }) => {
  const chartData = expenses.map(expense => ({
    name: expense.name,
    amount: expense.amount,
    amountAED: expense.amount * currency.rate
  }));

  return (
    <div className="h-[300px]">
      <h2 className="text-lg font-semibold mb-4">Expense Distribution</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip
            formatter={(value: number) => [
              `${currency.symbol}${value.toFixed(2)}`,
              'Amount'
            ]}
          />
          <Bar dataKey="amount" fill="#6366f1" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};