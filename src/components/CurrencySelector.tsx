import React from 'react';
import { Currency } from '../types';

interface CurrencySelectorProps {
  currencies: Currency[];
  selectedCurrency: Currency;
  onCurrencyChange: (currency: Currency) => void;
}

export const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  currencies,
  selectedCurrency,
  onCurrencyChange,
}) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Select Your Currency
      </label>
      <select
        value={selectedCurrency.code}
        onChange={(e) => {
          const currency = currencies.find(c => c.code === e.target.value);
          if (currency) onCurrencyChange(currency);
        }}
        className="block w-full border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      >
        {currencies.map((currency) => (
          <option key={currency.code} value={currency.code}>
            {currency.name} ({currency.symbol})
          </option>
        ))}
      </select>
    </div>
  );
};