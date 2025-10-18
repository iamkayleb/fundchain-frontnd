import React from 'react';
import useNotifications from '../../hooks/useNotifications';

export default function NotificationsPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { notifications, markRead, clear } = useNotifications();

  if (!open) return null;

  return (
    <aside className="fixed right-4 top-20 w-80 bg-slate-900/90 border border-gray-700/60 rounded shadow-lg p-3 z-50">
      <div className="flex items-center justify-between">
        <div className="font-semibold">Notifications</div>
        <div className="text-sm text-gray-400">{notifications.length}</div>
      </div>
      <div className="mt-3 space-y-2 max-h-64 overflow-auto">
        {notifications.length === 0 && <div className="text-sm text-gray-400">No notifications</div>}
        {notifications.map((n) => (
          <div key={n.id} className={`p-2 rounded ${n.read ? 'bg-slate-800/30' : 'bg-slate-800/50'}`}>
            <div className="text-sm">{n.message}</div>
            <div className="text-xs text-gray-400 mt-1 flex items-center justify-between">
              <div>{new Date(n.time).toLocaleString()}</div>
              <div className="space-x-2">
                {!n.read && <button onClick={() => markRead(n.id)} className="text-xs">Mark</button>}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 flex justify-between">
        <button onClick={clear} className="text-sm text-rose-400">Clear</button>
        <button onClick={onClose} className="text-sm">Close</button>
      </div>
    </aside>
  );
}
