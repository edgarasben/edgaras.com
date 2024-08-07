import { config } from '@/app.config'

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/api/og/*',
        disallow: '/api/*'
      }
    ],
    sitemap: `${config.baseUrl}/sitemap.xml`,
    host: config.baseUrl
  }
}
