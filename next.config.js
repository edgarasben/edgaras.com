/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    scrollRestoration: true
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
    return {
      beforeFiles: [
        {
          source: '/:path*',
          has: [
            {
              type: 'host',
              value: 'serviceintent.com'
            }
          ],
          destination: '/portfolio/:path*'
        },
        {
          source: '/images/:slug*',
          destination: 'https://files.edgaras.com/images/:slug*'
        }
      ]
    }
  }
}

module.exports = nextConfig
