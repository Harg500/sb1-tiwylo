import React, { useState, useEffect } from 'react';
import { PlusIcon } from '@heroicons/react/24/solid';
import { Currency } from '../types';

interface ExpenseFormProps {
  onAddExpense: (name: string, amount: number) => void;
  currency: Currency;
}

export const ExpenseForm: React.FC<ExpenseFormProps> = ({ onAddExpense, currency }) => {
  const [name, setName] = useState('');
  const [localAmount, setLocalAmount] = useState('');
  const [aedAmount, setAedAmount] = useState('');
  const [activeInput, setActiveInput] = useState<'local' | 'aed'>('local');
  const [period, setPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const [availablePresets] = useState([
    'Rent',
    'DEWA (Utilities)',
    'Internet',
    'Phone',
    'School Fees',
    'Nanny/Maid',
    'Car Payment',
    'Fuel',
    'Salik (Toll)',
    'Groceries',
    'Health Insurance',
    'Home Insurance',
    'Car Insurance',
    'Gym Membership',
    'Entertainment',
    'District Cooling'
  ]);

  useEffect(() => {
    if (activeInput === 'local' && localAmount) {
      const amount = parseFloat(localAmount);
      setAedAmount((amount * currency.rate).toFixed(2));
    } else if (activeInput === 'aed' && aedAmount) {
      const amount = parseFloat(aedAmount);
      setLocalAmount((amount / currency.rate).toFixed(2));
    }
  }, [localAmount, aedAmount, currency.rate, activeInput]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && localAmount) {
      const amount = parseFloat(localAmount);
      // Convert monthly to yearly if needed
      const finalAmount = period === 'monthly' ? amount * 12 : amount;
      onAddExpense(name + (period === 'monthly' ? ' (Monthly)' : ' (Yearly)'), finalAmount);
      setName('');
      setLocalAmount('');
      setAedAmount('');
    }
  };

  const handleLocalChange = (value: string) => {
    setActiveInput('local');
    setLocalAmount(value);
  };

  const handleAedChange = (value: string) => {
    setActiveInput('aed');
    setAedAmount(value);
  };

  const handlePresetClick = (presetName: string) => {
    setName(presetName);
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-5">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Expense name (e.g., Rent, Utilities)"
              className="w-full border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div className="md:col-span-5 flex gap-3">
            <div className="flex-1">
              <div className="relative shadow-sm">
                <input
                  type="number"
                  value={localAmount}
                  onChange={(e) => handleLocalChange(e.target.value)}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  className="w-full border-gray-300 pl-8 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-2">
                  <span className="text-gray-500 sm:text-sm">{currency.symbol}</span>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="relative shadow-sm">
                <input
                  type="number"
                  value={aedAmount}
                  onChange={(e) => handleAedChange(e.target.value)}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  className="w-full border-gray-300 pl-12 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-2">
                  <span className="text-gray-500 sm:text-sm">AED</span>
                </div>
              </div>
            </div>
          </div>
          <div className="md:col-span-2 flex items-center gap-2">
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value as 'monthly' | 'yearly')}
              className="w-24 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
            >
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
            <button
              type="submit"
              className="bg-blue-600 p-2 text-white hover:bg-blue-700 transition-colors"
            >
              <PlusIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </form>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Quick Add</h3>
        <div className="flex flex-wrap gap-2">
          {availablePresets.map((preset) => (
            <button
              key={preset}
              onClick={() => handlePresetClick(preset)}
              className="px-4 py-2 text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            >
              {preset}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};