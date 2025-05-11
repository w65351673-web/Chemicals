/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'carst.com' },
      { hostname: 'images.unsplash.com' },
      { hostname: 'res.cloudinary.com' },
      { hostname: 'plus.unsplash.com' },
      { hostname: 'source.unsplash.com' }
    ],
    unoptimized: true,
  },
  // Fix font loading issues
  experimental: {
    serverActions: true,
    optimizeFonts: false
  },
  // Output static files for better Vercel compatibility
  output: 'standalone',
}

module.exports = nextConfig
