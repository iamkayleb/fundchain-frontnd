import React from 'react';

export function StatCard({ title, value, accent = 'cyan' }: { title: string; value: string; accent?: 'cyan' | 'green' | 'amber' }) {
  const accentClass = accent === 'green' ? 'text-green-400' : accent === 'amber' ? 'text-amber-400' : 'text-cyan-400';
  return (
    <div className="p-4 bg-gradient-to-br from-white/2 to-white/1 backdrop-blur rounded border border-gray-700/50">
      <div className="text-sm text-gray-400">{title}</div>
      <div className={`text-2xl font-bold mt-1 ${accentClass}`}>{value}</div>
    </div>
  );
}
