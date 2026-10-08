import React, { useState } from 'react';
import { Zap, Sparkles } from 'lucide-react';

export default function IntakeForm({ onAdd, onAIExtract }) {
  const [mode, setMode] = useState('manual');
  const [rawText, setRawText] = useState('');
  const [formData, setFormData] = useState({
    program: '',
    country: '',
    portalUrl: '',
    target: 'master'
  });
  const [submitting, setSubmitting] = useState(false);

  const handleManualSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await onAdd({
      program: formData.program,
      country: formData.country,
      portalUrl: formData.portalUrl,
      isWatchlist: formData.target === 'watchlist'
    });
    setFormData({ program: '', country: '', portalUrl: '', target: 'master' });
    setSubmitting(false);
  };

  const handleAISubmit = async (e) => {
    e.preventDefault();
    if (!rawText.trim()) return;
    setSubmitting(true);
    await onAIExtract(rawText);
    setRawText('');
    setSubmitting(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 mb-6">
      <div className="flex items-center justify-between mb-3 border-b pb-2">
        <h2 className="text-sm font-semibold text-slate-700 flex items-center">
          {mode === 'manual' ? (
            <>
              <Zap className="w-4 h-4 text-amber-500 mr-1.5" />
              Quick Scholarship Registration
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-indigo-500 mr-1.5" />
              AI Smart-Extract (Paste Any Announcement / Text)
            </>
          )}
        </h2>
        <div className="flex space-x-1 text-xs">
          <button
            type="button"
            onClick={() => setMode('manual')}
            className={`px-3 py-1 rounded-md transition ${
              mode === 'manual'
                ? 'bg-indigo-100 text-indigo-700 font-semibold'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Manual
          </button>
          <button
            type="button"
            onClick={() => setMode('ai')}
            className={`px-3 py-1 rounded-md transition flex items-center ${
              mode === 'ai'
                ? 'bg-indigo-100 text-indigo-700 font-semibold'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 mr-1 text-indigo-600" />
            AI Smart-Extract
          </button>
        </div>
      </div>

      {mode === 'manual' ? (
        <form onSubmit={handleManualSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <input
            type="text"
            placeholder="Program / University Name"
            required
            value={formData.program}
            onChange={(e) => setFormData({ ...formData, program: e.target.value })}
            className="px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="text"
            placeholder="Country (e.g. Germany, Sweden)"
            required
            value={formData.country}
            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
            className="px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="text"
            placeholder="Official Portal / Link"
            value={formData.portalUrl}
            onChange={(e) => setFormData({ ...formData, portalUrl: e.target.value })}
            className="px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <div className="flex items-center space-x-2">
            <select
              value={formData.target}
              onChange={(e) => setFormData({ ...formData, target: e.target.value })}
              className="px-3 py-2 border rounded-lg text-sm flex-1 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="master">Direct to Master List</option>
              <option value="watchlist">Watchlist (Portal Monitor)</option>
            </select>
            <button
              type="submit"
              disabled={submitting}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition shadow-sm disabled:opacity-50"
            >
              {submitting ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleAISubmit} className="flex flex-col sm:flex-row gap-3">
          <textarea
            rows="2"
            placeholder="Paste raw scholarship announcement, WhatsApp message, or requirements text here..."
            required
            value={rawText}
            onChange={(e) => setRawText(e.target.value)}
            className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            disabled={submitting}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg text-sm font-medium flex items-center justify-center transition shadow-sm disabled:opacity-50 sm:self-stretch"
          >
            {submitting ? (
              <span className="flex items-center">
                <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin mr-1.5"></span>
                Extracting...
              </span>
            ) : (
              <span className="flex items-center">
                <Sparkles className="w-4 h-4 mr-1.5" />
                Auto-Extract & Add
              </span>
            )}
          </button>
        </form>
      )}
    </div>
  );
}