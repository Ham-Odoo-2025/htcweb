import React from 'react';
import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import { getMessages } from '@/lib/data';

interface Props {
  params: { locale: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const isAr = params.locale === 'ar';
  return {
    title: isAr ? 'اتصل بنا | هاملتون للسلامة ومكافحة الحرائق قطر' : 'Contact Us | Hamilton Fire Qatar',
    description: isAr
      ? 'تواصل مع شركة هاملتون للتجارة والمقاولات في الدوحة قطر للحصول على عروض أسعار أنظمة إنذار ومكافحة الحرائق وعقود الصيانة السنوية.'
      : 'Contact Hamilton Trading & Contracting in Doha Qatar for civil defence approved fire alarms, firefighting installations, and AMC quotations.',
    alternates: {
      canonical: `https://htc-fire.com/${params.locale}/contact`,
      languages: {
        en: 'https://htc-fire.com/en/contact',
        ar: 'https://htc-fire.com/ar/contact',
      },
    },
  };
}

export default function ContactPage({ params }: Props) {
  const locale = params.locale === 'ar' ? 'ar' : 'en';
  const messages = getMessages(locale);

  return (
    <div className="pt-24 lg:pt-28">
      <ContactForm locale={locale} messages={messages} />
    </div>
  );
}
