import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, User, ArrowLeft, Share2 } from 'lucide-react';
import { getNews, getNewsBySlug } from '@/lib/data';

interface Props {
  params: { locale: string; slug: string };
}

export async function generateStaticParams() {
  const newsList = getNews();
  const params: { locale: string; slug: string }[] = [];

  for (const locale of ['en', 'ar']) {
    for (const item of newsList) {
      params.push({ locale, slug: item.slug });
    }
  }

  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = getNewsBySlug(params.slug);
  if (!item) return {};

  return {
    title: `${item.title} | HTC Fire Qatar`,
    description: item.excerpt,
    alternates: {
      canonical: `https://htc-fire.com/${params.locale}/news/${item.slug}`,
    },
    openGraph: {
      title: item.title,
      description: item.excerpt,
      images: [{ url: item.image || 'https://htc-fire.com/about-us.jpg' }],
    },
  };
}

export default function SingleNewsPage({ params }: Props) {
  const item = getNewsBySlug(params.slug);
  if (!item) notFound();

  const locale = params.locale === 'ar' ? 'ar' : 'en';
  const isAr = locale === 'ar';

  const formattedDate = new Date(item.createdAt).toLocaleDateString(
    isAr ? 'ar-QA' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  );

  return (
    <div className="pt-24 lg:pt-28" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Header */}
      <section className="bg-gray-950 py-16 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href={`/${locale}/news`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-red-400 hover:text-red-300 mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-180" />
            <span>{isAr ? 'العودة إلى جميع الأخبار' : 'Back to News'}</span>
          </Link>

          <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-red-500" />
              <span>{formattedDate}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-gray-400" />
              <span>{item.author}</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold leading-tight">
            {item.title}
          </h1>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden shadow-lg border border-gray-100 mb-10 bg-gray-50">
            <Image
              src={item.image || '/about-us.jpg'}
              alt={item.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div
            className="prose prose-sm sm:prose-lg max-w-none text-gray-700 leading-relaxed space-y-4"
            dangerouslySetInnerHTML={{ __html: item.content }}
          />

          <div className="mt-12 pt-8 border-t border-gray-100 flex items-center justify-between">
            <Link
              href={`/${locale}/news`}
              className="inline-flex items-center gap-2 text-xs font-bold text-gray-700 hover:text-red-600"
            >
              <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
              <span>{isAr ? 'جميع الأخبار والبيانات الصحفية' : 'All News & Announcements'}</span>
            </Link>

            <Link
              href={`/${locale}/contact`}
              className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow"
            >
              {isAr ? 'تواصل معنا' : 'Contact Press Office'}
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
