import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Service } from '@/lib/data';

interface ServicesGridProps {
  services: Service[];
  locale: string;
  messages: any;
  showAll?: boolean;
}

export default function ServicesGrid({
  services,
  locale,
  messages,
  showAll = false,
}: ServicesGridProps) {
  const isAr = locale === 'ar';
  const displayed = showAll ? services : services.slice(0, 6);

  return (
    <section
      id="services"
      className="relative py-20 lg:py-28 bg-gray-50 overflow-hidden"
      dir={isAr ? 'rtl' : 'ltr'}
    >
      {/* Decorative Firefighter Watermark */}
      <div className="pointer-events-none select-none absolute bottom-0 ltr:left-0 rtl:right-0 h-[400px] w-[260px] opacity-15 lg:opacity-25 z-0">
        <Image
          src="/fire-man.png"
          alt=""
          fill
          className="object-contain object-bottom"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-red-600 text-xs sm:text-sm font-extrabold tracking-widest uppercase">
            {isAr ? 'ما نقدمه' : 'What We Offer'}
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-gray-900">
            {isAr ? 'خدمات' : 'Our'}{' '}
            <span className="text-red-600">
              {isAr ? 'أنظمة الحريق المتكاملة' : 'Services'}
            </span>
          </h2>
          <p className="mt-4 text-gray-600 text-sm sm:text-base leading-relaxed">
            {isAr
              ? 'من التوريد والتركيب إلى الصيانة الدورية وعقود الدفاع المدني، نقدم حلول سلامة متكاملة للمشاريع في جميع أنحاء قطر.'
              : 'From supply to installation and ongoing maintenance, we provide end-to-end fire safety solutions for businesses across Qatar.'}
          </p>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {displayed.map((svc) => {
            const title = isAr ? svc.title_ar || svc.title_en : svc.title_en;
            const desc = isAr
              ? svc.shortDescription_ar || svc.shortDescription_en
              : svc.shortDescription_en;
            const badge = isAr ? svc.badge_ar || svc.badge_en : svc.badge_en;

            return (
              <Link
                key={svc.slug}
                href={`/${locale}/services/${svc.slug}`}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col border border-gray-100 hover:border-red-200"
              >
                {/* Image */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-gray-100">
                  <Image
                    src={svc.heroImage || '/fire-alarm-maintenance-qatar.jpg'}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  {badge && (
                    <div className="absolute bottom-3 ltr:left-3 rtl:right-3 bg-red-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow">
                      {badge}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-red-600 transition-colors leading-snug mb-2">
                    {title}
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed line-clamp-3 flex-1">
                    {desc}
                  </p>

                  <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-[11px] font-medium text-gray-500">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{isAr ? 'حلول معتمدة QCDD' : 'QCDD Approved'}</span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-red-600 group-hover:text-red-700">
                      <span>{isAr ? 'التفاصيل' : 'Learn More'}</span>
                      <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {!showAll && (
          <div className="mt-12 text-center">
            <Link
              href={`/${locale}/services`}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-gray-900 hover:bg-red-600 text-white font-bold rounded-xl transition-colors shadow text-sm"
            >
              <span>{isAr ? 'عرض جميع الخدمات (13 خدمة)' : 'View All 13 Services'}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
