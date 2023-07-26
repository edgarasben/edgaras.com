/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'edgaras.com',
        port: '',
        pathname: '/images/**'
      }
    ]
  },
  async rewrites() {
    return [
      {
        source: '/images/:slug*',
        destination: 'https://files.edgaras.com/images/:slug*'
      },
      {
        source: '/dashboard',
        destination: 'https://arc.net/e/47F91214-C345-42DF-BFDA-8272E3F53567'
      }
    ]
  }
}

module.exports = nextConfig
