import { MetadataRoute } from 'next';
import { getServices, getNews } from '@/lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://htc-fire.com';
  const services = getServices();
  const news = getNews();

  const locales = ['en', 'ar'];
  const staticPages = [
    '',
    '/about',
    '/services',
    '/allproducts',
    '/brands',
    '/news',
    '/blog',
    '/contact',
    '/annual-maintenance-contract',
    '/testimonials',
  ];

  const entries: MetadataRoute.Sitemap = [];

  // Static Pages in both locales
  for (const loc of locales) {
    for (const page of staticPages) {
      entries.push({
        url: `${baseUrl}/${loc}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'weekly' : 'monthly',
        priority: page === '' ? 1.0 : 0.8,
      });
    }
  }

  // Service Pages & Subpages in both locales
  for (const loc of locales) {
    for (const svc of services) {
      entries.push({
        url: `${baseUrl}/${loc}/services/${svc.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
      });

      if (svc.subpages && svc.subpages.length > 0) {
        for (const sub of svc.subpages) {
          entries.push({
            url: `${baseUrl}/${loc}/services/${svc.slug}/${sub.slug}`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
          });
        }
      }
    }
  }

  // News Articles in both locales
  for (const loc of locales) {
    for (const item of news) {
      entries.push({
        url: `${baseUrl}/${loc}/news/${item.slug}`,
        lastModified: new Date(item.createdAt),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }
  }

  return entries;
}
