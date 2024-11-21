import React from 'react';

export const VideoBanner: React.FC = () => {
  return (
    <div className="relative w-full h-[300px] mb-8 overflow-hidden shadow-lg bg-gradient-to-r from-blue-600 to-blue-800">
      <img
        src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1920&q=80"
        alt="Dubai Skyline"
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-40" />
      <div className="absolute inset-0 flex items-center justify-center text-white text-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">Dubai Expense Tracker</h1>
          <p className="text-lg md:text-xl drop-shadow-lg">Plan your expenses and share with others</p>
        </div>
      </div>
    </div>
  );
};