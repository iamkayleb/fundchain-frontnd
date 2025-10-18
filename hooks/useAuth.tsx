import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../lib/api';

type Role = 'student' | 'donor' | 'institution' | 'admin';

export type User = {
  id: number;
  full_name?: string;
  email?: string;
  role: Role;
  verified?: boolean;
  extra?: any;
};

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (payload: any) => Promise<void>;
  refresh: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fetch current user on mount
    (async () => {
      try {
        const data = await api.apiGet('/api/me');
        setUser(data.user || null);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const login = async (email: string, password: string) => {
    await api.apiPost('/api/login', { email, password });
    // server sets cookie; refresh user
    await refresh();
  };

  const logout = async () => {
    try {
      await api.apiPost('/api/logout', {});
    } catch (err) {
      // ignore
    }
    setUser(null);
  };

  const register = async (payload: any) => {
    // If this is an institution registration, use the dedicated institution endpoint
    if (payload.role === 'institution') {
      try {
        // Use institution registration endpoint
        const { institutionApi } = await import('../lib/api');
        await institutionApi.register({
          institution_name: payload.institution_profile?.institution_name || payload.full_name,
          representative_name: payload.full_name,
          email: payload.email,
          email_domain: payload.institution_profile?.email_domain || '',
          password: payload.password,
          bank_account_details: payload.institution_profile?.bank_account_details,
          accreditation_docs: payload.institution_profile?.accreditation_docs || [],
        });
        
        // Auto-login after successful registration
        if (payload.email && payload.password) {
          try {
            await login(payload.email, payload.password);
          } catch (err) {
            // Login failed, but registration succeeded
            console.warn('Registration succeeded but auto-login failed:', err);
          }
        }
        return;
      } catch (error) {
        console.error('Institution registration failed:', error);
        throw error;
      }
    }

    // For other roles, use the standard signup endpoint
    const processed = { ...payload };
    if (payload.files && Array.isArray(payload.files)) {
      const filePromises = payload.files.map((f: File) =>
        new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve((reader.result as string) || '');
          reader.onerror = reject;
          reader.readAsDataURL(f);
        })
      );
      const b64 = await Promise.all(filePromises);
      // place accreditation docs under institution_profile.accreditation_docs to match backend
      processed.institution_profile = processed.institution_profile || {};
      processed.institution_profile.accreditation_docs = b64;
      delete processed.files;
    }

    await api.apiPost('/api/signup', processed);
    // auto-login the newly registered user to ensure auth state reflects the new role
    if (processed.email && processed.password) {
      try {
        await login(processed.email, processed.password);
      } catch (err) {
        // ignore - user can still login manually
      }
    }
  };

  const refresh = async () => {
    try {
      const data = await api.apiGet('/api/me');
      setUser(data.user || null);
    } catch (err) {
      setUser(null);
    }
  };

  return <AuthContext.Provider value={{ user, loading, login, logout, register, refresh }}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export default useAuth;
