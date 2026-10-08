import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import IntakeForm from './components/IntakeForm';
import DeadlineCards from './components/DeadlineCards';
import { fetchDashboardData, sendSheetAction } from './api/sheetApi';

export default function App() {
  const [data, setData] = useState({ master: [], autoSearch: [], watchlist: [] });
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetchDashboardData();
      if (res.status === 'success') {
        setData(res);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAdd = async (payload) => {
    await sendSheetAction('ADD_SCHOLARSHIP', { data: payload });
    await loadData();
  };

  const handleDelete = async (sheetName, rowIndex) => {
    if (confirm('Delete this entry?')) {
      await sendSheetAction('DELETE_ROW', { sheetName, rowIndex });
      await loadData();
    }
  };

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen flex flex-col">
      <Navbar onRefresh={loadData} loading={loading} />
      <main className="max-w-7xl mx-auto px-4 py-6 flex-1 w-full">
        <IntakeForm onAdd={handleAdd} />
        {loading && data.master.length === 0 ? (
          <p className="text-center py-12 text-slate-400">Loading scholarships from Google Sheet...</p>
        ) : (
          <DeadlineCards scholarships={data.master} onDelete={handleDelete} />
        )}
      </main>
    </div>
  );
}