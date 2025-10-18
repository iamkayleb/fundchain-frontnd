import React from 'react';

export default function CampaignSummaryCard({ stats }: { stats: any }) {
  return (
    <div className="p-4 bg-slate-900/50 backdrop-blur rounded border border-gray-700/60">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-gray-400">Total campaigns</div>
          <div className="text-2xl font-bold text-cyan-400">{stats.total}</div>
        </div>
        <div>
          <div className="text-sm text-gray-400">Active</div>
          <div className="text-2xl font-bold text-amber-400">{stats.active}</div>
        </div>
        <div>
          <div className="text-sm text-gray-400">Total raised</div>
          <div className="text-2xl font-bold text-green-400">${stats.raised}</div>
        </div>
      </div>
    </div>
  );
}
