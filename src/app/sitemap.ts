import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://echomarket-rtl.vercel.app';

  const routes = [
    '',
    '/explore',
    '/compare',
    '/product/karjoor-enterprise',
    '/product/taline-trading-platform',
    '/product/ava-persian-llm',
    '/product/diako-cloud-storage',
    '/product/qone-zero-trust-iam',
    '/vendor/dashboard',
    '/vendor/inquiries',
    '/vendor/register',
    '/buyer/portal',
    '/buyer/inquiries',
    '/admin',
    '/admin/finance',
    '/admin/team',
    '/admin/surveillance',
    '/disputes',
    '/login',
    '/sitemap',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : route.startsWith('/product') ? 0.8 : 0.6,
  }));
}
