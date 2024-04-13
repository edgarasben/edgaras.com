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
      },
      {
        source: '/dashboard',
        destination: 'https://arc.net/e/47F91214-C345-42DF-BFDA-8272E3F53567'
      }
    ]
  },
  async redirects() {
    return [
      {
        source: '/posts/:slug',
        destination: '/:slug',
        permanent: true
      },
      {
        source: '/articles/:slug',
        destination: '/:slug',
        permanent: true
      }
    ]
  }
}

module.exports = nextConfig
