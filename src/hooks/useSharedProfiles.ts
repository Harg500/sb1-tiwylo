import { useState, useEffect } from 'react';
import { 
  collection, 
  query, 
  where, 
  onSnapshot,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  Timestamp 
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from './useAuth';
import { SharedProfile } from '../types';

export function useSharedProfiles() {
  const [profiles, setProfiles] = useState<SharedProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setProfiles([]);
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, 'sharedProfiles'),
      where('shareExpenses', '==', true)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const profileData: SharedProfile[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        profileData.push({
          id: doc.id,
          ...data,
          date: data.date.toDate().toISOString()
        } as SharedProfile);
      });
      setProfiles(profileData);
      setLoading(false);
    }, (err) => {
      setError('Failed to load shared profiles');
      setLoading(false);
      console.error('Firestore error:', err);
    });

    return () => unsubscribe();
  }, [user]);

  const shareProfile = async (profile: Omit<SharedProfile, 'id' | 'date'>) => {
    if (!user) {
      setError('Must be logged in to share profile');
      return;
    }

    try {
      await addDoc(collection(db, 'sharedProfiles'), {
        ...profile,
        userId: user.uid,
        date: Timestamp.now(),
        shareExpenses: true
      });
    } catch (err) {
      setError('Failed to share profile');
      throw err;
    }
  };

  const updateSharedProfile = async (id: string, updates: Partial<SharedProfile>) => {
    if (!user) {
      setError('Must be logged in to update profile');
      return;
    }

    try {
      await updateDoc(doc(db, 'sharedProfiles', id), updates);
    } catch (err) {
      setError('Failed to update shared profile');
      throw err;
    }
  };

  const deleteSharedProfile = async (id: string) => {
    if (!user) {
      setError('Must be logged in to delete profile');
      return;
    }

    try {
      await deleteDoc(doc(db, 'sharedProfiles', id));
    } catch (err) {
      setError('Failed to delete shared profile');
      throw err;
    }
  };

  return {
    profiles,
    loading,
    error,
    shareProfile,
    updateSharedProfile,
    deleteSharedProfile
  };
}