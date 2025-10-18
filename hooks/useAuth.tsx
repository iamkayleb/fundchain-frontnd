import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

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

const AuthContext = createContext<AuthContextValue | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // API base URL
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  const apiCall = async (endpoint: string, options: RequestInit = {}) => {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || 'API request failed');
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return response.json();
    }
    return response.text();
  };

  const login = async (email: string, password: string) => {
    try {
      const data = await apiCall('/api/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      
      setUser(data.user);
      
      // Redirect based on role
      switch (data.user.role) {
        case 'admin':
          router.push('/dashboard/admin');
          break;
        case 'student':
          router.push('/dashboard/student');
          break;
        case 'donor':
          router.push('/dashboard/donor');
          break;
        case 'institution':
          router.push('/dashboard/institution');
          break;
        default:
          router.push('/');
      }
    } catch (error: any) {
      throw new Error(error.message || 'Login failed');
    }
  };

  const register = async (payload: any) => {
    try {
      const data = await apiCall('/api/signup', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      
      setUser(data.user);
      
      // Redirect based on role
      switch (data.user.role) {
        case 'admin':
          router.push('/dashboard/admin');
          break;
        case 'student':
          router.push('/dashboard/student');
          break;
        case 'donor':
          router.push('/dashboard/donor');
          break;
        case 'institution':
          router.push('/dashboard/institution');
          break;
        default:
          router.push('/');
      }
    } catch (error: any) {
      throw new Error(error.message || 'Registration failed');
    }
  };

  const logout = async () => {
    try {
      await apiCall('/api/logout', {
        method: 'POST',
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      router.push('/login');
    }
  };

  const refresh = async () => {
    try {
      const data = await apiCall('/api/me');
      setUser(data);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const value: AuthContextValue = {
    user,
    loading,
    login,
    logout,
    register,
    refresh,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};