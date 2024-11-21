import React from 'react';
import { 
  XMarkIcon, 
  HomeIcon,
  UserGroupIcon,
  BriefcaseIcon,
  BuildingOfficeIcon,
  AcademicCapIcon,
  TruckIcon,
  HeartIcon,
  SparklesIcon,
  MapPinIcon,
  BanknotesIcon
} from '@heroicons/react/24/outline';
import { SharedProfile, Currency } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface SharedProfileModalProps {
  profile: SharedProfile;
  currentCurrency: Currency;
  onClose: () => void;
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

export const SharedProfileModal: React.FC<SharedProfileModalProps> = ({
  profile,
  currentCurrency,
  onClose,
}) => {
  const totalExpenses = profile.expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const monthlyExpenses = totalExpenses / 12;
  const yearlyBalance = profile.yearlyIncome - totalExpenses;
  const monthlyBalance = yearlyBalance / 12;

  const convertAmount = (amount: number) => {
    return (amount * profile.currency.rate) / currentCurrency.rate;
  };

  const chartData = profile.expenses
    .sort((a, b) => b.amount - a.amount)
    .map(expense => ({
      name: expense.name,
      amount: convertAmount(expense.amount),
    }));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Living in Dubai</h2>
            <p className="text-sm text-gray-500">Shared on {formatDate(profile.date)}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-500"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Profile Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Profile Information</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <MapPinIcon className="h-5 w-5 text-gray-500" />
                  <span>{profile.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <HomeIcon className="h-5 w-5 text-gray-500" />
                  <span>{profile.bedrooms} Bedroom • {profile.housingStatus === 'own' ? 'Owner' : 'Renting'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <UserGroupIcon className="h-5 w-5 text-gray-500" />
                  <span>Family of {profile.familySize}</span>
                </div>
                <div className="flex items-center gap-2">
                  <SparklesIcon className="h-5 w-5 text-gray-500" />
                  <span>{profile.pets} Pets</span>
                </div>
                <div className="flex items-center gap-2">
                  <BriefcaseIcon className="h-5 w-5 text-gray-500" />
                  <span className="capitalize">{profile.workStyle}</span>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-medium mb-3">Company Benefits</h4>
                <div className="flex flex-wrap gap-2">
                  {profile.benefits.housing && (
                    <div className="flex items-center gap-1 text-sm bg-blue-50 text-blue-700 px-2 py-1 rounded">
                      <HomeIcon className="h-4 w-4" />
                      <span>Housing</span>
                    </div>
                  )}
                  {profile.benefits.education && (
                    <div className="flex items-center gap-1 text-sm bg-indigo-50 text-indigo-700 px-2 py-1 rounded">
                      <AcademicCapIcon className="h-4 w-4" />
                      <span>Education</span>
                    </div>
                  )}
                  {profile.benefits.transport && (
                    <div className="flex items-center gap-1 text-sm bg-green-50 text-green-700 px-2 py-1 rounded">
                      <TruckIcon className="h-4 w-4" />
                      <span>Transport</span>
                    </div>
                  )}
                  {profile.benefits.insurance && (
                    <div className="flex items-center gap-1 text-sm bg-red-50 text-red-700 px-2 py-1 rounded">
                      <HeartIcon className="h-4 w-4" />
                      <span>Insurance</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Financial Overview</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-500">Yearly Income</div>
                  <div className="text-xl font-semibold">
                    {currentCurrency.symbol}{formatNumber(convertAmount(profile.yearlyIncome))}
                  </div>
                  <div className="text-sm text-gray-500">
                    AED {formatNumber(profile.yearlyIncome * profile.currency.rate)}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-500">Monthly Expenses</div>
                  <div className="text-xl font-semibold">
                    {currentCurrency.symbol}{formatNumber(convertAmount(monthlyExpenses))}
                  </div>
                  <div className="text-sm text-gray-500">
                    AED {formatNumber(monthlyExpenses * profile.currency.rate)}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-500">Monthly Balance</div>
                  <div className="text-xl font-semibold">
                    {currentCurrency.symbol}{formatNumber(convertAmount(monthlyBalance))}
                  </div>
                  <div className="text-sm text-gray-500">
                    AED {formatNumber(monthlyBalance * profile.currency.rate)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Expense List */}
          <div>
            <h3 className="text-lg font-medium mb-4">Expense Breakdown</h3>
            <div className="space-y-3">
              {profile.expenses.map((expense) => (
                <div
                  key={expense.name}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <span className="font-medium">{expense.name}</span>
                  <div className="text-right">
                    <div className="font-semibold">
                      {currentCurrency.symbol}{formatNumber(convertAmount(expense.amount))}
                    </div>
                    <div className="text-sm text-gray-500">
                      AED {formatNumber(expense.amount * profile.currency.rate)}
                    </div>
                    <div className="text-xs text-gray-400">
                      {((expense.amount / totalExpenses) * 100).toFixed(1)}% of total
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <span className="font-medium">Total Expenses</span>
                <div className="text-right">
                  <div className="font-semibold">
                    {currentCurrency.symbol}{formatNumber(convertAmount(totalExpenses))}
                  </div>
                  <div className="text-sm text-gray-500">
                    AED {formatNumber(totalExpenses * profile.currency.rate)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Expense Chart */}
          <div>
            <h3 className="text-lg font-medium mb-4">Expense Distribution</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    formatter={(value: number) => [
                      `${currentCurrency.symbol}${formatNumber(value)}`,
                      'Amount'
                    ]}
                  />
                  <Bar dataKey="amount" fill="#6366f1" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};