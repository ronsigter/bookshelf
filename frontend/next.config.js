/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true
  },
  env: {
    REST_SERVER: process.env.REST_SERVER,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '4000'
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com'
      },
      {
        protocol: 'https',
        hostname: 'bookshelf-api.up.railway.app'
      }
    ]
  }
}

module.exports = nextConfig
