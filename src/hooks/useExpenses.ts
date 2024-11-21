import { useState, useEffect } from 'react';
import { Expense } from '../types';

const STORAGE_KEY = 'dubai-expense-tracker-expenses';

export function useExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  // Load expenses from localStorage on mount
  useEffect(() => {
    const storedExpenses = localStorage.getItem(STORAGE_KEY);
    if (storedExpenses) {
      setExpenses(JSON.parse(storedExpenses));
    }
  }, []);

  // Save expenses to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (name: string, amount: number) => {
    const newExpense: Expense = {
      id: crypto.randomUUID(),
      name,
      amount,
      date: new Date().toISOString(),
    };
    setExpenses([...expenses, newExpense]);
  };

  const deleteExpense = (id: string) => {
    setExpenses(expenses.filter(e => e.id !== id));
  };

  const importExpenses = (newExpenses: Expense[]) => {
    setExpenses(newExpenses);
  };

  return {
    expenses,
    addExpense,
    deleteExpense,
    importExpenses,
  };
}