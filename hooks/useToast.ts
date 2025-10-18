import { useCallback } from 'react';

export default function useToast() {
  return useCallback((msg: string) => {
    try {
      const ev = new CustomEvent('app:toast', { detail: { message: msg } });
      window.dispatchEvent(ev);
    } catch (e) {
      // fallback
      alert(msg);
    }
  }, []);
}
