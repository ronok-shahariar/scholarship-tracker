import React, { useState } from 'react';
import { Zap } from 'lucide-react';

export default function IntakeForm({ onAdd }) {
  const [formData, setFormData] = useState({
    program: '',
    country: '',
    portalUrl: '',
    target: 'master'
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
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

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 mb-6">
      <h2 className="text-sm font-semibold text-slate-700 mb-3 flex items-center">
        <Zap className="w-4 h-4 text-amber-500 mr-1.5" />
        Quick Scholarship Registration
      </h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-3">
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
    </div>
  );
}