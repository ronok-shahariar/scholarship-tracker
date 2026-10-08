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
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAdd = async (payload) => {
    setLoading(true);
    try {
      await sendSheetAction('ADD_SCHOLARSHIP', { data: payload });
      await loadData();
    } catch (err) {
      alert('Error adding scholarship: ' + err.message);
      setLoading(false);
    }
  };

  const handleAIExtract = async (rawText) => {
    setLoading(true);
    try {
      const res = await sendSheetAction('AI_EXTRACT_AND_ADD', { rawText });
      if (res.status === 'success') {
        await loadData();
      } else {
        alert('Extraction error: ' + (res.message || 'Unknown error'));
        setLoading(false);
      }
    } catch (err) {
      alert('Failed to connect to extraction service: ' + err.message);
      setLoading(false);
    }
  };

  const handleDelete = async (sheetName, rowIndex) => {
    if (confirm('Delete this entry?')) {
      setLoading(true);
      try {
        await sendSheetAction('DELETE_ROW', { sheetName, rowIndex });
        await loadData();
      } catch (err) {
        alert('Delete failed: ' + err.message);
        setLoading(false);
      }
    }
  };

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen flex flex-col font-sans">
      <Navbar onRefresh={loadData} loading={loading} />
      <main className="max-w-7xl mx-auto px-4 py-6 flex-1 w-full">
        <IntakeForm onAdd={handleAdd} onAIExtract={handleAIExtract} />
        {loading && data.master.length === 0 ? (
          <p className="text-center py-12 text-slate-400">Loading scholarships from Google Sheet...</p>
        ) : (
          <DeadlineCards scholarships={data.master} onDelete={handleDelete} />
        )}
      </main>
    </div>
  );
}