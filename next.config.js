/** @type {import('next').NextConfig} */
const nextConfig = {
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
        source: '/images/:path*',
        destination: 'https://files.edgaras.com/images/:path*'
      }
    ]
  }
}

module.exports = nextConfig
