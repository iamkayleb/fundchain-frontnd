import React, { useEffect, useState } from 'react';
import Toast from './Toast';

type ToastEntry = { id: string; message: string };

export default function ToastManager() {
  const [toasts, setToasts] = useState<ToastEntry[]>([]);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as { message: string };
      const id = Math.random().toString(36).slice(2, 9);
      setToasts((t) => [...t, { id, message: detail.message }]);
      setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4000);
    };
    window.addEventListener('app:toast', handler as EventListener);
    return () => window.removeEventListener('app:toast', handler as EventListener);
  }, []);

  return (
    <div className="toast-container">
      {toasts.map((t) => (
        <Toast key={t.id} message={t.message} />
      ))}
    </div>
  );
}
