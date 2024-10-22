import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',  // Proxy all API routes
        destination: 'http://127.0.0.1:8000/api/:path*',  // FastAPI backend
      },
    ];
  },
};

export default nextConfig;
