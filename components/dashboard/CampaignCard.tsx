import React from 'react';
import ProgressBar from './ProgressBar';

export default function CampaignCard({ campaign, onOpen }: { campaign: any; onOpen?: (c: any) => void }) {
  return (
    <div className="p-4 bg-slate-900/50 backdrop-blur rounded border border-gray-700/60 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-white font-semibold">{campaign.title}</div>
          <div className="text-sm text-gray-400">{campaign.institution || 'Unknown Institution'}</div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-400">Goal</div>
          <div className="text-white font-semibold">${campaign.goal}</div>
        </div>
      </div>
      <div className="mt-3">
        <ProgressBar value={(campaign.raised / campaign.goal) * 100} status={campaign.status} />
      </div>
      <div className="mt-3 flex items-center justify-between">
        <div className="text-sm text-gray-400">Raised ${campaign.raised}</div>
        <button onClick={() => onOpen?.(campaign)} className="px-3 py-1 rounded bg-cyan-500 text-black font-semibold">Donate</button>
      </div>
    </div>
  );
}
