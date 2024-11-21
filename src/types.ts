export interface UserProfile {
  displayName: string | null;
  email: string | null;
  currency: string;
  location: string;
  shareExpenses: boolean;
}

export interface Expense {
  id: string;
  name: string;
  amount: number;
  date: string;
}

export interface Currency {
  code: string;
  name: string;
  symbol: string;
  rate: number;
}

export const CURRENCIES: Currency[] = [
  { code: 'GBP', name: 'British Pound', symbol: '£', rate: 4.71 },
  { code: 'USD', name: 'US Dollar', symbol: '$', rate: 3.67 },
  { code: 'EUR', name: 'Euro', symbol: '€', rate: 4.02 },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', rate: 2.41 },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', rate: 2.72 },
  { code: 'AED', name: 'UAE Dirham', symbol: 'AED', rate: 1 },
];

export const DUBAI_LOCATIONS = [
  'Dubai Marina',
  'Downtown Dubai',
  'Palm Jumeirah',
  'Business Bay',
  'JBR',
  'DIFC',
  'Dubai Hills',
  'Arabian Ranches',
  'Emirates Hills',
  'JLT',
  'Dubai Creek Harbour',
  'Mirdif',
  'Silicon Oasis',
  'Sports City',
  'Motor City',
  'Al Barsha',
  'Jumeirah',
  'Umm Suqeim',
  'Al Quoz',
  'Deira',
  'International City',
  'Discovery Gardens',
  'Dubai South',
  'Al Warqa',
  'Zabeel'
];

export type DubaiLocation = typeof DUBAI_LOCATIONS[number];

export interface SharedProfile {
  id: string;
  familySize: number;
  pets: number;
  location: DubaiLocation;
  bedrooms: number;
  housingStatus: 'rent' | 'own';
  workStyle: 'remote' | 'office' | 'hybrid';
  benefits: {
    housing: boolean;
    education: boolean;
    transport: boolean;
    insurance: boolean;
  };
  currency: Currency;
  expenses: Expense[];
  yearlyIncome: number;
  date: string;
}