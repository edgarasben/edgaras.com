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
      /*     {
        source: '/images/:slug*',
        destination: 'https://files3.ams3.cdn.digitaloceanspaces.com/:slug*'
      } */

      beforeFiles: [
        {
          source: '/:slug*',
          has: [
            {
              type: 'host',
              value: 'serviceintent.com'
            }
          ],
          destination: '/portfolio/:slug*'
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
