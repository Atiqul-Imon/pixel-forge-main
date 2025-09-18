/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://pixelforgebd.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/admin/*', '/api/*', '/_next/*', '/private/*'],
  additionalPaths: async (config) => [
    await config.transform(config, '/'),
    await config.transform(config, '/services'),
    await config.transform(config, '/portfolio'),
    await config.transform(config, '/contact'),
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/_next/', '/private/'],
      },
    ],
    additionalSitemaps: [
      'https://pixelforgebd.com/sitemap.xml',
    ],
  },
  transform: async (config, path) => {
    return {
      loc: path,
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: path === '/' ? 1.0 : 0.8,
    };
  },
};
