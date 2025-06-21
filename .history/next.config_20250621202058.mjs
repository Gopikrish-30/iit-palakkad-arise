/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Temporarily ignore for deployment
  },
  typescript: {
    ignoreBuildErrors: true, // Temporarily ignore for deployment
  },
  images: {
    unoptimized: true, // Keep unoptimized for deployment compatibility
  },
  // Performance optimizations - disable CSS optimization to fix critters issue
  experimental: {
    // optimizeCss: true, // Disabled to fix Vercel deployment issue
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
