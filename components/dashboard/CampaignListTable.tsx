import React from 'react';
import ProgressBar from './ProgressBar';

export default function CampaignListTable({ campaigns }: { campaigns: any[] }) {
  return (
    <div className="mt-4 overflow-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="text-left text-gray-400">
            <th className="py-2">Title</th>
            <th className="py-2">Goal</th>
            <th className="py-2">Raised</th>
            <th className="py-2">Status</th>
            <th className="py-2">Progress</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800">
          {campaigns.map((c) => (
            <tr key={c.id} className="align-top">
              <td className="py-3">
                <div className="font-semibold text-white">{c.title}</div>
                <div className="text-xs text-gray-400">{c.description || ''}</div>
              </td>
              <td className="py-3">${c.goal}</td>
              <td className="py-3">${c.raised}</td>
              <td className="py-3">
                <span className={`px-2 py-1 rounded text-xs ${c.status === 'active' ? 'bg-cyan-800 text-cyan-300' : c.status === 'completed' ? 'bg-green-900 text-green-300' : 'bg-amber-900 text-amber-300'}`}>
                  {c.status}
                </span>
              </td>
              <td className="py-3 w-64"><ProgressBar value={(c.raised / c.goal) * 100} status={c.status} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
