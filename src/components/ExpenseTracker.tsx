import React, { useState, useEffect } from 'react';
import { ExpenseForm } from './ExpenseForm';
import { ExpenseList } from './ExpenseList';
import { Summary } from './Summary';
import { CurrencySelector } from './CurrencySelector';
import { ExpenseChart } from './ExpenseChart';
import { ExpenseAverages } from './ExpenseAverages';
import { DubaiCostsReference } from './DubaiCostsReference';
import { VideoBanner } from './VideoBanner';
import { ShareExpensesButton } from './ShareExpensesButton';
import { SharedProfiles } from './SharedProfiles';
import { CommunityAverages } from './CommunityAverages';
import { Currency, CURRENCIES, SharedProfile } from '../types';
import { useFirestore } from '../hooks/useFirestore';
import { useAuth } from '../hooks/useAuth';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

export const ExpenseTracker: React.FC = () => {
  const { user, logout } = useAuth();
  const { expenses, isLoading, error, addExpense, deleteExpense } = useFirestore();
  const [yearlyIncome, setYearlyIncome] = useState<number>(0);
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(CURRENCIES[0]);
  const [sharedProfiles, setSharedProfiles] = useState<SharedProfile[]>([]);

  useEffect(() => {
    const profiles = JSON.parse(localStorage.getItem('sharedProfiles') || '[]');
    setSharedProfiles(profiles);
  }, []);

  const handleCurrencyChange = (newCurrency: Currency) => {
    setSelectedCurrency(newCurrency);
    setYearlyIncome(0);
  };

  const handleIncomeChange = (newIncome: number) => {
    setYearlyIncome(newIncome);
  };

  const handleProfileShared = (newProfile: SharedProfile) => {
    const updatedProfiles = [...sharedProfiles, newProfile];
    setSharedProfiles(updatedProfiles);
    localStorage.setItem('sharedProfiles', JSON.stringify(updatedProfiles));
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error('Failed to logout:', err);
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-screen text-red-600">{error}</div>;
  }

  const username = user?.email?.split('@')[0] || '';

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <VideoBanner />
      
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900">Welcome, {username}</h2>
            <p className="text-sm text-gray-500">Track and manage your expenses</p>
          </div>
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <CurrencySelector
              currencies={CURRENCIES}
              selectedCurrency={selectedCurrency}
              onCurrencyChange={handleCurrencyChange}
            />
            <ShareExpensesButton
              expenses={expenses}
              currency={selectedCurrency}
              yearlyIncome={yearlyIncome}
              onProfileShared={handleProfileShared}
            />
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 text-sm px-4 py-2 text-white bg-gray-600 hover:bg-gray-700 transition-colors rounded-md"
              title="Logout"
            >
              <ArrowRightOnRectangleIcon className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="space-y-6">
              <Summary
                expenses={expenses}
                currency={selectedCurrency}
                yearlyIncome={yearlyIncome}
                onIncomeChange={handleIncomeChange}
              />

              <div className="bg-white p-6">
                <h2 className="text-lg font-semibold mb-4">Add Expense</h2>
                <ExpenseForm 
                  onAddExpense={addExpense}
                  currency={selectedCurrency}
                />
              </div>

              <div className="bg-white p-6">
                <h2 className="text-lg font-semibold mb-4">Recent Expenses</h2>
                <ExpenseList
                  expenses={expenses}
                  onDeleteExpense={deleteExpense}
                  currency={selectedCurrency}
                />
              </div>

              <SharedProfiles 
                currentCurrency={selectedCurrency}
                profiles={sharedProfiles}
              />

              <CommunityAverages profiles={sharedProfiles} currency={selectedCurrency} />

              {expenses.length > 0 && (
                <div className="bg-white p-6">
                  <ExpenseChart expenses={expenses} currency={selectedCurrency} />
                </div>
              )}
            </div>
          </div>
          
          <div>
            <div className="space-y-6">
              <ExpenseAverages expenses={expenses} currency={selectedCurrency} />
              <DubaiCostsReference currency={selectedCurrency} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};