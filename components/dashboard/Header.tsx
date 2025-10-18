import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';
import NotificationsPanel from './NotificationsPanel';
import { useNotifications } from '../../hooks/useNotifications';

export default function Header({ role }: { role: string }) {
  const { user } = useAuth();

  const { theme, toggle } = useTheme();
  const { notifications } = useNotifications();
  const [panelOpen, setPanelOpen] = useState(false);

  return (
    <header className="fixed left-64 right-0 top-0 h-16 bg-slate-900/60 backdrop-blur-sm border-b border-gray-800/60 flex items-center px-6">
      <div className="flex-1" />
      <div className="flex items-center gap-4">
        <button onClick={toggle} className="p-2 rounded-md bg-slate-800/30 hover:bg-slate-800/20 text-sm">
          {theme === 'dark' ? '🌙' : '☀️'}
        </button>
        <div className="relative">
          <button onClick={() => setPanelOpen((s) => !s)} className="p-2 rounded-md bg-slate-800/40 hover:bg-slate-800/30" aria-label="Open notifications">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M15 17h5l-1.405-1.405" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          {notifications.length > 0 && <span className="absolute -top-1 -right-1 text-xs bg-amber-400 text-black px-1 rounded-full">{notifications.length}</span>}
          <NotificationsPanel open={panelOpen} onClose={() => setPanelOpen(false)} />
        </div>
        <div className="text-sm text-gray-300">
          <div className="font-semibold">{user?.full_name || user?.email}</div>
          <div className="text-xs text-gray-400">{role.toUpperCase()}</div>
        </div>
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-800 via-purple-700 to-cyan-700 flex items-center justify-center text-white font-bold">{(user?.full_name || 'U').charAt(0)}</div>
      </div>
    </header>
  );
}
