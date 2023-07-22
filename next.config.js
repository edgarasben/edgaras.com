/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    mdxRs: false
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
      }
    ]
  }
}

module.exports = nextConfig
