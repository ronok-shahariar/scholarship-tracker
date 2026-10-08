import React from 'react';
import { GraduationCap, RefreshCw } from 'lucide-react';

export default function Navbar({ onRefresh, loading }) {
  return (
    <header className="bg-indigo-700 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <GraduationCap className="w-7 h-7 text-amber-300" />
          <h1 className="text-xl font-bold tracking-wide">Scholarship Navigator</h1>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={onRefresh} 
            disabled={loading}
            className="flex items-center space-x-1.5 px-3 py-1 bg-indigo-800 hover:bg-indigo-900 rounded-lg text-xs font-medium transition"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Sync</span>
          </button>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-900 text-emerald-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse"></span>
            Sheet Live
          </span>
        </div>
      </div>
    </header>
  );
}