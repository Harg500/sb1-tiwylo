import { useState, useEffect } from 'react';
import { 
  collection, 
  addDoc, 
  deleteDoc, 
  doc, 
  query, 
  onSnapshot,
  Timestamp,
  where
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from './useAuth';
import { Expense } from '../types';

export function useFirestore() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setExpenses([]);
      setIsLoading(false);
      return;
    }

    const q = query(
      collection(db, 'expenses'),
      where('userId', '==', user.uid)
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const expenseData: Expense[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        expenseData.push({
          id: doc.id,
          name: data.name,
          amount: data.amount,
          date: data.date.toDate().toISOString(),
        });
      });
      setExpenses(expenseData);
      setIsLoading(false);
    }, (err) => {
      setError('Failed to load expenses');
      setIsLoading(false);
      console.error('Firestore error:', err);
    });

    return () => unsubscribe();
  }, [user]);

  const addExpense = async (name: string, amount: number) => {
    if (!user) {
      setError('Must be logged in to add expenses');
      return;
    }

    try {
      await addDoc(collection(db, 'expenses'), {
        name,
        amount,
        date: Timestamp.fromDate(new Date()),
        userId: user.uid
      });
    } catch (err) {
      setError('Failed to add expense');
      throw err;
    }
  };

  const deleteExpense = async (id: string) => {
    if (!user) {
      setError('Must be logged in to delete expenses');
      return;
    }

    try {
      await deleteDoc(doc(db, 'expenses', id));
    } catch (err) {
      setError('Failed to delete expense');
      throw err;
    }
  };

  return {
    expenses,
    isLoading,
    error,
    addExpense,
    deleteExpense,
  };
}