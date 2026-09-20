import React from 'react';
import type { Metadata } from 'next';
import ServicesGrid from '@/components/ServicesGrid';
import { getServices, getMessages } from '@/lib/data';

interface Props {
  params: { locale: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const isAr = params.locale === 'ar';
  return {
    title: isAr
      ? 'خدمات أنظمة إنذار ومكافحة الحرائق في قطر | هاملتون'
      : 'Fire Protection & Fighting Services in Qatar | Hamilton Fire',
    description: isAr
      ? 'استكشف جميع خدمات شركة هاملتون المعتمدة من الدفاع المدني: أنظمة إنذار الحريق، شبكات الرشاشات، مضخات الحريق، عقود الصيانة AMC، وأبواب الحريق.'
      : 'Comprehensive fire alarm, fire suppression, sprinkler, fire pump, and AMC maintenance services in Doha Qatar approved by QCDD.',
    alternates: {
      canonical: `https://htc-fire.com/${params.locale}/services`,
      languages: {
        en: 'https://htc-fire.com/en/services',
        ar: 'https://htc-fire.com/ar/services',
      },
    },
  };
}

export default function ServicesPage({ params }: Props) {
  const locale = params.locale === 'ar' ? 'ar' : 'en';
  const messages = getMessages(locale);
  const services = getServices();

  return (
    <div className="pt-24 lg:pt-28">
      <ServicesGrid
        services={services}
        locale={locale}
        messages={messages}
        showAll={true}
      />
    </div>
  );
}
