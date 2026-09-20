import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { getNews } from '@/lib/data';

interface Props {
  params: { locale: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const isAr = params.locale === 'ar';
  return {
    title: isAr ? 'أخبار الشركة والفعاليات | هاملتون قطر' : 'Latest News & Events | Hamilton Fire Qatar',
    description: isAr
      ? 'تابع أحدث أخبار شركة هاملتون للتجارة والمقاولات، الدورات التدريبية المعتمدة، والمشاريع الجديدة في قطر.'
      : 'Stay updated with Hamilton Trading & Contracting company announcements, safety trainings, and milestones in Qatar.',
    alternates: {
      canonical: `https://htc-fire.com/${params.locale}/news`,
      languages: {
        en: 'https://htc-fire.com/en/news',
        ar: 'https://htc-fire.com/ar/news',
      },
    },
  };
}

export default function NewsPage({ params }: Props) {
  const locale = params.locale === 'ar' ? 'ar' : 'en';
  const isAr = locale === 'ar';
  const newsList = getNews();

  return (
    <div className="pt-24 lg:pt-28" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Header */}
      <section className="bg-gray-950 py-16 text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-red-500 text-xs font-bold uppercase tracking-widest">
            {isAr ? 'المركز الإعلامي' : 'Media Center'}
          </span>
          <h1 className="mt-3 text-3xl sm:text-5xl font-extrabold leading-tight">
            {isAr ? 'أحدث أخبار وفعاليات الشركة' : 'Company News & Updates'}
          </h1>
          <p className="mt-4 text-gray-400 text-sm max-w-xl mx-auto">
            {isAr
              ? 'متابعة لأحدث نشاطاتنا، المشاريع المنجزة، والبرامج التدريبية المعتمدة لفريقنا الهندسي.'
              : 'Discover our latest milestones, technical workforce training programs, and industry events in Qatar.'}
          </p>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-16 bg-gray-50 min-h-[50vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsList.map((item) => {
              const formattedDate = new Date(item.createdAt).toLocaleDateString(
                isAr ? 'ar-QA' : 'en-US',
                { year: 'numeric', month: 'long', day: 'numeric' }
              );

              return (
                <article
                  key={item._id}
                  className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow flex flex-col border border-gray-100 group"
                >
                  <div className="relative aspect-[16/10] w-full bg-gray-100 overflow-hidden">
                    <Image
                      src={item.image || '/about-us.jpg'}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-red-500" />
                        <span>{formattedDate}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-gray-400" />
                        <span>{item.author}</span>
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-gray-900 group-hover:text-red-600 transition-colors leading-snug mb-3 line-clamp-2">
                      {item.title}
                    </h3>

                    <p className="text-gray-500 text-xs sm:text-sm leading-relaxed line-clamp-3 mb-6 flex-1">
                      {item.excerpt}
                    </p>

                    <Link
                      href={`/${locale}/news/${item.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 group-hover:text-red-700 mt-auto"
                    >
                      <span>{isAr ? 'قراءة الخبر كاملاً' : 'Read Full Article'}</span>
                      <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
