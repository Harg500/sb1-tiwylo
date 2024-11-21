import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChartBarIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  GlobeAltIcon,
  ArrowTrendingUpIcon,
  ShareIcon,
  CloudArrowDownIcon,
  BuildingOfficeIcon,
} from '@heroicons/react/24/outline';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1546412414-e1885259563a?auto=format&fit=crop&w=1920&q=80"
            alt="Dubai Skyline"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 mix-blend-multiply" />
        </div>
        
        <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
          <h1 className="text-center text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            <span className="block text-white">Track Your Dubai Living Expenses</span>
            <span className="block text-blue-200">Make Informed Financial Decisions</span>
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-center text-xl text-blue-100 sm:max-w-3xl">
            Understand your cost of living in Dubai, compare expenses with the community, and make better financial choices.
          </p>
          <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
            <button
              onClick={() => navigate('/signup')}
              className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-blue-700 shadow-sm hover:bg-blue-50 sm:px-8"
            >
              Get Started Free
            </button>
          </div>
        </div>
      </div>

      {/* Feature Section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-600">
              Comprehensive Expense Tracking
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to manage expenses in Dubai
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              From rent to utilities, school fees to entertainment - track all your Dubai living expenses in one place.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <CurrencyDollarIcon className="h-5 w-5 flex-none text-blue-600" />
                  Multi-Currency Support
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">Track expenses in your preferred currency with automatic conversion to AED.</p>
                  <img
                    src="https://images.unsplash.com/photo-1580519542036-c47de6196ba5?auto=format&fit=crop&w=600&h=400&q=80"
                    alt="Currency conversion feature"
                    className="mt-4 rounded-lg shadow-lg object-cover"
                  />
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <ChartBarIcon className="h-5 w-5 flex-none text-blue-600" />
                  Visual Analytics
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">Understand your spending patterns with interactive charts and graphs.</p>
                  <img
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&h=400&q=80"
                    alt="Expense analytics"
                    className="mt-4 rounded-lg shadow-lg object-cover"
                  />
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <UserGroupIcon className="h-5 w-5 flex-none text-blue-600" />
                  Community Insights
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">Compare your expenses with others living in Dubai and make informed decisions.</p>
                  <img
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&h=400&q=80"
                    alt="Community expense comparison"
                    className="mt-4 rounded-lg shadow-lg object-cover"
                  />
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* Location Based Insights */}
      <div className="bg-blue-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-600">
              Location Intelligence
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Understand costs across Dubai
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Get detailed insights about living costs in different Dubai neighborhoods.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="flex flex-col">
              <BuildingOfficeIcon className="h-8 w-8 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900">Popular Areas</h3>
              <p className="mt-2 text-gray-600">
                From Dubai Marina to Downtown, Palm Jumeirah to Arabian Ranches - get real cost insights from real residents.
              </p>
              <img
                src="https://images.unsplash.com/photo-1578507065211-1c4e99a5fd24?auto=format&fit=crop&w=800&h=600&q=80"
                alt="Palm Jumeirah aerial view"
                className="mt-6 rounded-lg shadow-lg object-cover"
              />
            </div>
            <div className="flex flex-col">
              <GlobeAltIcon className="h-8 w-8 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900">Cost Comparison</h3>
              <p className="mt-2 text-gray-600">
                Compare housing, utilities, and lifestyle costs across different Dubai neighborhoods.
              </p>
              <img
                src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&h=600&q=80"
                alt="Area cost comparison"
                className="mt-6 rounded-lg shadow-lg object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-600">
              Powerful Features
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to manage your Dubai expenses
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
              <div className="flex flex-col items-start">
                <div className="rounded-md bg-blue-600/10 p-2 ring-1 ring-blue-600/20">
                  <ArrowTrendingUpIcon className="h-6 w-6 text-blue-600" />
                </div>
                <dt className="mt-4 font-semibold text-gray-900">Expense Tracking</dt>
                <dd className="mt-2 leading-7 text-gray-600">
                  Easy-to-use interface for tracking daily, monthly, and yearly expenses.
                </dd>
              </div>
              <div className="flex flex-col items-start">
                <div className="rounded-md bg-blue-600/10 p-2 ring-1 ring-blue-600/20">
                  <ShareIcon className="h-6 w-6 text-blue-600" />
                </div>
                <dt className="mt-4 font-semibold text-gray-900">Community Sharing</dt>
                <dd className="mt-2 leading-7 text-gray-600">
                  Share and compare your expenses anonymously with the Dubai community.
                </dd>
              </div>
              <div className="flex flex-col items-start">
                <div className="rounded-md bg-blue-600/10 p-2 ring-1 ring-blue-600/20">
                  <CloudArrowDownIcon className="h-6 w-6 text-blue-600" />
                </div>
                <dt className="mt-4 font-semibold text-gray-900">Data Export</dt>
                <dd className="mt-2 leading-7 text-gray-600">
                  Export your expense data in multiple formats for further analysis.
                </dd>
              </div>
              <div className="flex flex-col items-start">
                <div className="rounded-md bg-blue-600/10 p-2 ring-1 ring-blue-600/20">
                  <ChartBarIcon className="h-6 w-6 text-blue-600" />
                </div>
                <dt className="mt-4 font-semibold text-gray-900">Smart Analytics</dt>
                <dd className="mt-2 leading-7 text-gray-600">
                  Get insights about your spending patterns and trends.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to start tracking your Dubai expenses?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-blue-100">
              Join thousands of Dubai residents who are making smarter financial decisions.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <button
                onClick={() => navigate('/signup')}
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-blue-600 shadow-sm hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Get started
              </button>
              <button
                onClick={() => navigate('/login')}
                className="text-sm font-semibold leading-6 text-white"
              >
                Learn more <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};