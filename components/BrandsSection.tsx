import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface BrandsSectionProps {
  locale: string;
  messages: any;
}

export default function BrandsSection({ locale, messages }: BrandsSectionProps) {
  const isAr = locale === 'ar';
  const b = messages?.brands || {};

  const brands = [
    { name: 'DETNOV', logo: '/brands/detnov.jpg' },
    { name: 'NAFFCO', logo: '/brands/naffco.jpg' },
    { name: 'SIEMENS', logo: '/brands/siemens.jpg' },
    { name: 'FIREX', logo: '/brands/firex.jpg' },
    { name: 'GST', logo: '/brands/gst.jpg' },
    { name: 'ESSER', logo: '/brands/esser.jpg' },
    { name: 'SHIELD', logo: '/brands/shield.jpg' },
    { name: 'ZETA', logo: '/brands/zeta.jpg' },
  ];

  return (
    <section className="py-20 bg-white" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-red-600 text-xs sm:text-sm font-extrabold tracking-widest uppercase">
            {b.badge || (isAr ? 'شركاء النجاح' : 'Our Partners')}
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-gray-900">
            {b.heading || (isAr ? 'العلامات التجارية' : 'Trusted')}{' '}
            <span className="text-red-600">
              {b.headingAccent || (isAr ? 'المعتمدة عالمياً' : 'Brands')}
            </span>{' '}
            {b.headingSuffix || (isAr ? 'التي نوردها' : 'We Carry')}
          </h2>
          <p className="mt-4 text-gray-600 text-sm sm:text-base leading-relaxed">
            {b.description ||
              (isAr
                ? 'شركة هاملتون للتجارة والمقاولات هي موزع معتمد لأفضل الشركات المصنعة لأنظمة الحريق المعتمدة من الدفاع المدني في قطر.'
                : 'Hamilton Trading and Contracting W.L.L is a trusted dealer and service provider for top fire protection brands in Qatar. We supply, install, and maintain systems approved by Qatar Civil Defence.')}
          </p>
        </div>

        {/* Brands Logo Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 lg:gap-8 items-center">
          {brands.map((brand, idx) => (
            <div
              key={idx}
              className="group bg-gray-50 border border-gray-100 hover:border-red-200 rounded-2xl p-6 flex flex-col items-center justify-center transition-all duration-300 hover:shadow-md h-32"
            >
              <div className="relative w-36 h-16 grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100 transition-all duration-300">
                <Image
                  src={brand.logo}
                  alt={`${brand.name} Qatar Fire Systems`}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href={`/${locale}/brands`}
            className="inline-flex items-center gap-2 text-sm font-bold text-red-600 hover:text-red-700"
          >
            <span>{isAr ? 'عرض جميع العلامات التجارية وشراكاتنا' : 'Explore All Brands & Specifications'}</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </Link>
        </div>
      </div>
    </section>
  );
}
