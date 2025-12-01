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
    // Don't set unoptimized to true for Vercel as it uses their image optimization
    unoptimized: false,
  },
  // Fix experimental flags for Next.js 15.3.2
  experimental: {
    // Use the correct format for serverActions in Next.js 15.3.2
    serverActions: {
      bodySizeLimit: '2mb'
    }
  },
  // Removed standalone output to ensure proper static generation for SEO
  // Add transpilePackages for Three.js and related packages
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei']
}

module.exports = nextConfig
