import React from 'react';
import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import StatsSection from '@/components/StatsSection';
import AboutSection from '@/components/AboutSection';
import LeadershipSection from '@/components/LeadershipSection';
import ServicesGrid from '@/components/ServicesGrid';
import BrandsSection from '@/components/BrandsSection';
import ClientsSection from '@/components/ClientsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import { getServices, getMessages } from '@/lib/data';

interface Props {
  params: { locale: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const isAr = params.locale === 'ar';
  const title = isAr
    ? 'شركة أنظمة إنذار ومكافحة الحرائق في قطر | هاملتون للسلامة'
    : 'Fire Alarm & Fire Fighting Company | Doha Qatar | HTC Fire';
  const description = isAr
    ? 'هاملتون للتجارة والمقاولات شركة معتمدة من الدفاع المدني في قطر لتقديم أنظمة إنذار ومكافحة الحرائق المتكاملة وحلول MEP وعقود الصيانة السنوية.'
    : 'HTC Fire is a leading fire alarm and fire fighting company in Doha Qatar offering QCDD-approved fire protection systems, MEP solutions, AMC maintenance.';

  return {
    title,
    description,
    alternates: {
      canonical: `https://htc-fire.com/${params.locale}`,
      languages: {
        en: 'https://htc-fire.com/en',
        ar: 'https://htc-fire.com/ar',
        'x-default': 'https://htc-fire.com/en',
      },
    },
    openGraph: {
      title,
      description,
      url: `https://htc-fire.com/${params.locale}`,
      siteName: 'Hamilton Trading & Contracting W.L.L',
      images: [
        {
          url: 'https://htc-fire.com/video-thumb.png',
          width: 1200,
          height: 630,
          alt: 'HTC Fire Qatar',
        },
      ],
      locale: isAr ? 'ar_QA' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://htc-fire.com/video-thumb.png'],
    },
  };
}

export default function HomePage({ params }: Props) {
  const locale = params.locale === 'ar' ? 'ar' : 'en';
  const messages = getMessages(locale);
  const services = getServices();

  return (
    <>
      <Hero locale={locale} messages={messages} />
      <StatsSection locale={locale} messages={messages} />
      <AboutSection locale={locale} messages={messages} />
      <LeadershipSection locale={locale} messages={messages} />
      <ServicesGrid services={services} locale={locale} messages={messages} />
      <BrandsSection locale={locale} messages={messages} />
      <ClientsSection locale={locale} messages={messages} />
      <TestimonialsSection locale={locale} messages={messages} />
    </>
  );
}
