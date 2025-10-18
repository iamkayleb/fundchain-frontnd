import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

type Notification = { id: string; message: string; time: number; read?: boolean };

const NotificationsContext = createContext<{
  notifications: Notification[];
  push: (message: string) => void;
  markRead: (id: string) => void;
  clear: () => void;
} | null>(null);

export const NotificationsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const push = useCallback((message: string) => {
    const id = Math.random().toString(36).slice(2, 9);
    const n: Notification = { id, message, time: Date.now(), read: false };
    setNotifications((s) => [n, ...s]);
    // Emit a toast event as well for immediate feedback
    try {
      window.dispatchEvent(new CustomEvent('app:toast', { detail: { message } }));
    } catch (e) {
      // ignore
    }
  }, []);

  const markRead = useCallback((id: string) => setNotifications((s) => s.map((n) => (n.id === id ? { ...n, read: true } : n))), []);
  const clear = useCallback(() => setNotifications([]), []);

  // Listen for app:notify custom events
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as { message: string } | undefined;
      if (detail?.message) push(detail.message);
    };
    window.addEventListener('app:notify', handler as EventListener);
    return () => window.removeEventListener('app:notify', handler as EventListener);
  }, [push]);

  return <NotificationsContext.Provider value={{ notifications, push, markRead, clear }}>{children}</NotificationsContext.Provider>;
};

export function useNotifications() {
  const ctx = useContext(NotificationsContext);
  if (!ctx) throw new Error('useNotifications must be used within NotificationsProvider');
  return ctx;
}

export default useNotifications;
