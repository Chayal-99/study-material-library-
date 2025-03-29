
import React from 'react';
import { MaterialsList } from './components/MaterialsList';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">Study Materials Hub</h1>
      </header>
      <main className="container mx-auto p-4">
        <MaterialsList />
      </main>
    </div>
  );
}
