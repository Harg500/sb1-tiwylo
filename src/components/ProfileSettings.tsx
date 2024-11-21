import React from 'react';
import { useAuth } from '../hooks/useAuth';

export const ProfileSettings: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Profile Settings</h2>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-500">Email</h3>
          <p className="mt-1">{user.email}</p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500">Display Name</h3>
          <p className="mt-1">{user.displayName || 'Not set'}</p>
        </div>
      </div>
    </div>
  );
};