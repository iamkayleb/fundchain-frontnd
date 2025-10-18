import React from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { AuthProvider } from '../hooks/useAuth';
import { ThemeProvider } from '../hooks/useTheme';
import { NotificationsProvider } from '../hooks/useNotifications';
import ToastManager from '../components/ToastManager';
// Import Tailwind globals so Next/PostCSS processes them in dev/build
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <NotificationsProvider>
        <AuthProvider>
          <Component {...pageProps} />
          <ToastManager />
        </AuthProvider>
      </NotificationsProvider>
    </ThemeProvider>
  );
}
