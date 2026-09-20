import React from 'react';
import Image from 'next/image';

interface ClientsSectionProps {
  locale: string;
  messages: any;
}

export default function ClientsSection({ locale, messages }: ClientsSectionProps) {
  const isAr = locale === 'ar';
  const c = messages?.clients || {};

  const clientLogos = [
    { name: 'DHL Qatar', logo: '/clients/DHL.jpg' },
    { name: 'HBK Contracting', logo: '/clients/HBK.jpg' },
    { name: 'Aamal Holding', logo: '/clients/aamal.jpg' },
    { name: 'Al Madar', logo: '/clients/almadar.jpg' },
    { name: 'Sidra Hospital', logo: '/clients/sidra.jpg' },
    { name: 'Rawabi Hypermarket', logo: '/clients/rawabi.jpg' },
    { name: 'Tea Time Qatar', logo: '/clients/teatime.jpg' },
    { name: 'Hot N Cool', logo: '/clients/hotncool.jpg' },
    { name: 'Zamil Steel', logo: '/clients/zamil.jpg' },
    { name: 'Teyseer Group', logo: '/clients/teyseer.jpg' },
    { name: 'Al Emadi', logo: '/clients/emadi.jpg' },
    { name: 'Prime Group', logo: '/clients/prime.jpg' },
  ];

  return (
    <section className="py-20 bg-gray-50 border-t border-gray-100" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-red-600 text-xs sm:text-sm font-extrabold tracking-widest uppercase">
            {isAr ? 'قصص نجاحنا' : 'Proven Track Record'}
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-gray-900">
            {c.heading || (isAr ? 'عملاؤنا' : 'Our Trusted')}{' '}
            <span className="text-red-600">
              {c.headingAccent || (isAr ? 'المميزون في قطر' : 'Clients')}
            </span>
          </h2>
          <p className="mt-4 text-gray-600 text-sm sm:text-base leading-relaxed">
            {isAr
              ? 'نفتخر بثقة كبرى المؤسسات الحكومية والشركات الخاصة الرائدة في قطر في حلول السلامة من الحرائق والصيانة الدورية التي نقدمها.'
              : 'Trusted by government authorities, hospitality leaders, healthcare centers, and top commercial developers across Qatar.'}
          </p>
        </div>

        {/* Clients Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
          {clientLogos.map((client, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center justify-center h-24 shadow-sm hover:shadow transition-shadow"
            >
              <div className="relative w-28 h-14 grayscale hover:grayscale-0 opacity-80 hover:opacity-100 transition-all duration-300">
                <Image
                  src={client.logo}
                  alt={client.name}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
