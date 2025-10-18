import React from 'react';

export default function ProfileCard({ user }: { user: any }) {
  return (
    <div className="p-4 bg-slate-900/50 backdrop-blur rounded border border-gray-700/60">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-800 via-purple-700 to-cyan-700 flex items-center justify-center text-white font-bold">{(user?.full_name || 'U').charAt(0)}</div>
        <div>
          <div className="font-semibold text-white">{user?.full_name || user?.email}</div>
          <div className="text-sm text-gray-400">{user?.institution || 'No institution'}</div>
        </div>
      </div>
      <div className="mt-3 flex flex-col gap-2">
        <a className="text-sm text-cyan-400">Settings</a>
        <a className="text-sm text-gray-400">Profile</a>
      </div>
    </div>
  );
}
