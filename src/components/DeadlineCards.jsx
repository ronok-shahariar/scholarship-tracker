import React, { useState } from 'react';
import { Calendar, ExternalLink, Trash2 } from 'lucide-react';

export default function DeadlineCards({ scholarships, onDelete }) {
  const [filter, setFilter] = useState('');

  const filtered = scholarships.filter((item) =>
    (item.university + ' ' + item.country).toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <h3 className="text-base font-bold text-slate-800">Confirmed Scholarship Deadlines</h3>
        <input
          type="text"
          placeholder="Filter by program, country..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-3 py-1.5 border rounded-lg text-xs w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700">
                  {item.country}
                </span>
                <span className="text-xs font-medium text-amber-600 flex items-center">
                  <Calendar className="w-3.5 h-3.5 mr-1" />
                  {item.deadline}
                </span>
              </div>
              <h4 className="font-bold text-slate-800 text-sm mb-1">{item.university}</h4>
              <p className="text-xs text-slate-600 mb-2">{item.coverage}</p>
              <p className="text-[11px] text-slate-500 bg-slate-50 p-2 rounded">{item.requirements}</p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <a href={item.portalUrl} target="_blank" rel="noreferrer" className="text-indigo-600 font-semibold hover:underline flex items-center">
                Portal Link <ExternalLink className="w-3 h-3 ml-1" />
              </a>
              <button onClick={() => onDelete('All Scholarships', item.id)} className="text-red-400 hover:text-red-600">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}