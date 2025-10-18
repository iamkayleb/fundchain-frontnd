import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../hooks/useAuth';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (user) {
        // Redirect to appropriate dashboard based on role
        switch (user.role) {
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
            router.push('/login');
        }
      } else {
        router.push('/login');
      }
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">FundChain</h1>
        <p className="text-gray-600 mb-8">Educational Fundraising Platform</p>
        <div className="space-x-4">
          <button
            onClick={() => router.push('/login')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
          >
            Login
          </button>
          <button
            onClick={() => router.push('/register')}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}