import React from 'react';
import type { Metadata } from 'next';
import TestimonialsSection from '@/components/TestimonialsSection';
import ClientsSection from '@/components/ClientsSection';
import { getMessages } from '@/lib/data';

interface Props {
  params: { locale: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const isAr = params.locale === 'ar';
  return {
    title: isAr ? 'آراء وتقييمات العملاء | هاملتون قطر' : 'Client Testimonials & Reviews | Hamilton Fire Qatar',
    description: isAr
      ? 'اطلع على تجارب وتقييمات عملاء شركة هاملتون للتجارة والمقاولات في مشاريع السلامة وأنظمة مكافحة الحرائق في قطر.'
      : 'Read verified testimonials and reviews from facilities managers, safety officers, and contractors working with Hamilton Fire in Qatar.',
    alternates: {
      canonical: `https://htc-fire.com/${params.locale}/testimonials`,
      languages: {
        en: 'https://htc-fire.com/en/testimonials',
        ar: 'https://htc-fire.com/ar/testimonials',
      },
    },
  };
}

export default function TestimonialsPage({ params }: Props) {
  const locale = params.locale === 'ar' ? 'ar' : 'en';
  const messages = getMessages(locale);

  return (
    <div className="pt-24 lg:pt-28">
      <TestimonialsSection locale={locale} messages={messages} />
      <ClientsSection locale={locale} messages={messages} />
    </div>
  );
}
