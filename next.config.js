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
        return [
            {
                source: '/images/:slug*',
                destination: 'https://files3.ams3.cdn.digitaloceanspaces.com/:slug*'
            }
        ]
    }
}

https: module.exports = nextConfig
