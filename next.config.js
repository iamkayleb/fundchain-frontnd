/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // Environment variables
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
    NEXT_PUBLIC_APP_VERSION: process.env.NEXT_PUBLIC_APP_VERSION,
  },
  
  // Optimize images
  images: {
    domains: ['localhost', 'fundchain-backend.onrender.com'],
    unoptimized: true, // For static exports if needed
  },
  
  // API Routes configuration
  async rewrites() {
    // Get API URL with explicit fallback to prevent undefined
    const apiBase = process.env.NEXT_PUBLIC_API_URL || 'https://fundchain-backend.onrender.com';

    // Always provide a valid destination URL
    return [
      {
        source: '/api/:path*',
        destination: `${apiBase.replace(/\/$/, '')}/api/:path*`,
      },
    ];
  },
  
  // Headers for security and CORS
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  
  // Output configuration for static exports (optional)
  // trailingSlash: true,
  // output: 'export',
};

module.exports = nextConfig;