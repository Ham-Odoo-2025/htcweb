import servicesData from '@/data/services.json';
import categoriesData from '@/data/categories.json';
import productsData from '@/data/products.json';
import newsData from '@/data/news.json';
import messagesEn from '@/data/messages_en.json';
import messagesAr from '@/data/messages_ar.json';

export interface Service {
  _id: string;
  title_en: string;
  title_ar: string;
  slug: string;
  shortDescription_en: string;
  shortDescription_ar: string;
  content_en: string;
  content_ar: string;
  heroImage: string;
  images: string[];
  badge_en?: string;
  badge_ar?: string;
  tags_en?: string[];
  tags_ar?: string[];
  features?: { text_en: string; text_ar: string }[];
  faqs?: { question_en: string; question_ar: string; answer_en: string; answer_ar: string }[];
  subpages?: {
    slug: string;
    title_en?: string;
    title_ar?: string;
    content_en?: string;
    content_ar?: string;
    shortDescription_en?: string;
    shortDescription_ar?: string;
    features?: { text_en: string; text_ar: string }[];
  }[];
  order?: number;
  active?: boolean;
  metaTitle_en?: string;
  metaTitle_ar?: string;
  metaDescription_en?: string;
  metaDescription_ar?: string;
  metaKeywords?: string[];
}

export interface Category {
  _id: string;
  name: string;
}

export interface Product {
  _id: string;
  name: string;
  category: string;
  image: string;
  description?: string;
  price: number;
  legacyId?: number;
  slug: string;
}

export interface NewsItem {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  published: boolean;
  createdAt: string;
}

export function getServices(): Service[] {
  return servicesData as unknown as Service[];
}

export function getServiceBySlug(slug: string): Service | undefined {
  return (servicesData as unknown as Service[]).find(
    (s) => s.slug.toLowerCase() === slug.toLowerCase()
  );
}

export function getCategories(): Category[] {
  return categoriesData as unknown as Category[];
}

export function getProducts(options?: {
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
}) {
  const all = productsData as unknown as Product[];
  const page = options?.page || 1;
  const limit = options?.limit || 24;
  const category = options?.category;
  const search = options?.search?.toLowerCase().trim();

  let filtered = all;

  if (category && category !== 'All') {
    filtered = filtered.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (search) {
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(search) ||
        (p.description && p.description.toLowerCase().includes(search)) ||
        p.category.toLowerCase().includes(search)
    );
  }

  const total = filtered.length;
  const pages = Math.ceil(total / limit) || 1;
  const startIndex = (page - 1) * limit;
  const paginated = filtered.slice(startIndex, startIndex + limit);

  return {
    products: paginated,
    total,
    page,
    pages,
  };
}

export function getNews(): NewsItem[] {
  return newsData as unknown as NewsItem[];
}

export function getNewsBySlug(slug: string): NewsItem | undefined {
  return (newsData as unknown as NewsItem[]).find(
    (n) => n.slug.toLowerCase() === slug.toLowerCase()
  );
}

export function getMessages(locale: string = 'en') {
  return locale === 'ar' ? messagesAr : messagesEn;
}
