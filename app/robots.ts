import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/portal/',
          '/auth/',
          '/dev/',
          '/_next/',
          '/static/',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/',
          '/portal/',
          '/auth/',
          '/dev/',
        ],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: [
          '/api/',
          '/portal/',
          '/auth/',
          '/dev/',
        ],
      },
    ],
    sitemap: 'https://impota.com/sitemap.xml',
  }
}