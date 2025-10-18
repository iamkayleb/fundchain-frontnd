import React from 'react';

export default function ProgressBar({ value = 0, status = 'active' }: { value: number; status?: 'pending' | 'active' | 'completed' }) {
  const color = status === 'pending' ? 'bg-amber-400' : status === 'completed' ? 'bg-green-400' : 'bg-cyan-400';
  return (
    <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
      <div className={`${color} h-3 rounded-full`} style={{ width: `${Math.max(0, Math.min(100, value))}%`, transition: 'width 600ms ease' }} />
    </div>
  );
}
