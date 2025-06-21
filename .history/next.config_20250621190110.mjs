/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: false, // Enable ESLint for production builds
  },
  typescript: {
    ignoreBuildErrors: false, // Enable TypeScript checking for production builds
  },
  images: {
    unoptimized: false, // Enable image optimization for production
    domains: ['placeholder.svg'], // Add any external image domains
    formats: ['image/webp', 'image/avif'], // Modern image formats
  },
  // Performance optimizations
  experimental: {
    optimizeCss: true, // Enable CSS optimization
  },
  // Security headers
  async headers() {
    return [
      {
        source: '/admin/:path*',
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
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ]
  },
  // Redirect configuration
  async redirects() {
    return [
      {
        source: '/admin/',
        destination: '/admin',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
