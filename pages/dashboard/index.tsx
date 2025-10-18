import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../hooks/useAuth';

const DashboardIndex: React.FC = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace('/login');
      return;
    }

    // Redirect based on role
    if (user.role === 'admin') router.replace('/dashboard/admin');
    else if (user.role === 'student') router.replace('/dashboard/student');
    else if (user.role === 'donor') router.replace('/dashboard/donor');
    else if (user.role === 'institution') router.replace('/dashboard/institution');
    else router.replace('/');
  }, [user, loading, router]);

  return <div className="min-h-screen flex items-center justify-center">Redirecting...</div>;
};

export default DashboardIndex;
