import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, ArrowRight } from 'lucide-react';

interface AboutSectionProps {
  locale: string;
  messages: any;
}

export default function AboutSection({ locale, messages }: AboutSectionProps) {
  const isAr = locale === 'ar';
  const a = messages?.about || {};

  const bulletPoints = [
    isAr
      ? 'وكيل وموزع معتمد لأبرز العلامات التجارية العالمية في أنظمة السلامة'
      : 'Authorized dealer of globally certified fire safety brands',
    isAr
      ? 'فريق هندسي متخصص يتمتع بخبرة تزيد عن 12 عاماً في مشاريع قطر'
      : 'Expert team with 12+ years in fire protection industry in Qatar',
    isAr
      ? 'توريد شامل لمعدات السلامة وطفايات الحريق وأنظمة الإنذار والإطفاء التلقائي'
      : 'Comprehensive supply of PPE, fire extinguishers & detection systems',
    isAr
      ? 'خدمة المشاريع الحكومية والتجارية والصناعية الكبرى في جميع أنحاء الدولة'
      : 'Serving government, commercial & industrial sectors across Qatar',
    isAr
      ? 'أسعار تنافسية مع سرعة في التنفيذ والالتزام بأعلى معايير الجودة'
      : 'Competitive pricing with fast, reliable delivery and QCDD compliance',
  ];

  return (
    <section id="about" className="relative bg-gray-50 py-20 lg:py-28 overflow-hidden" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Decorative gradient blur */}
      <div className="absolute top-0 ltr:right-0 rtl:left-0 size-96 bg-red-100/60 rounded-full blur-3xl pointer-events-none -translate-y-1/2 ltr:translate-x-1/2 rtl:-translate-x-1/2"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Facility Image with Overlapping Badges */}
          <div className="relative order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/about-us.jpg"
                  alt="Hamilton Trading & Contracting Qatar"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

              {/* Bottom Badge: 12+ Years */}
              <div className="absolute bottom-6 ltr:left-6 rtl:right-6 bg-white/90 backdrop-blur-md border border-white/40 rounded-2xl px-5 py-3 text-gray-900 shadow-lg">
                <p className="text-2xl sm:text-3xl font-extrabold text-red-600 leading-none">
                  12+
                </p>
                <p className="text-xs font-semibold text-gray-700 mt-1">
                  {isAr ? 'سنوات من التميز في قطر' : 'Years of Excellence in Qatar'}
                </p>
              </div>

              {/* Top Badge: A-Grade */}
              <div className="absolute top-6 ltr:right-6 rtl:left-6 bg-red-600 rounded-2xl px-4 py-3 text-white text-center shadow-lg">
                <p className="text-xl sm:text-2xl font-extrabold leading-none">A‑Grade</p>
                <p className="text-[10px] sm:text-xs font-semibold opacity-95 mt-0.5">
                  {isAr ? 'معتمد من الدفاع المدني' : 'Civil Defence Approved'}
                </p>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="text-red-600 text-xs sm:text-sm font-extrabold tracking-widest uppercase">
                {a.badge || (isAr ? 'من نحن' : 'About Us')}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
              {a.heading ||
                (isAr
                  ? 'المزود الرائد لأنظمة السلامة ومكافحة الحرائق في دولة قطر'
                  : "Qatar's Leading Fire Safety and Security System provider")}
            </h2>

            <p className="mt-5 text-gray-600 leading-relaxed text-sm sm:text-base">
              {isAr
                ? 'شركة هاملتون للتجارة والمقاولات ذ.م.م هي شركة رائدة متخصصة في أنظمة إنذار وكشف ومكافحة الحرائق للمشاريع التجارية والصناعية والسكنية. يقدم فريقنا الهندسي المتمرس حلولاً موثوقة ومبتكرة مصممة لتلبية متطلبات الدفاع المدني في قطر.'
                : 'We are a leading fire protection company specializing in advanced fire alarm, fire fighting, and fire detection systems for commercial, industrial, and residential projects. Our experienced team delivers reliable, innovative, and high-quality fire safety solutions tailored to client requirements.'}
            </p>

            <p className="mt-3 text-gray-600 leading-relaxed text-sm sm:text-base">
              {isAr
                ? 'نقدم خدمات متكاملة تشمل التصميم والتركيب والاختبار والتشغيل والصيانة وفقاً للمعايير الدولية وشهادات الاعتماد. نتعامل مع كبرى الشركات العالمية مثل DETNOV وGent وHoneywell وSiemens وBosch وNAFFCO وغيرها.'
                : 'We provide complete fire protection services including design, installation, testing, commissioning, and maintenance of fire safety systems in compliance with international standards (NFPA, QCDD). We work with globally recognized brands such as DETNOV, Gent, Honeywell, Siemens, Bosch, Hochiki, Apollo, and NAFFCO.'}
            </p>

            {/* Bullet List */}
            <ul className="mt-6 space-y-2.5">
              {bulletPoints.map((pt, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-xs sm:text-sm leading-relaxed font-medium">
                    {pt}
                  </span>
                </li>
              ))}
            </ul>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg shadow-red-600/25 transition-all text-sm group"
              >
                <span>{isAr ? 'تواصل معنا' : 'Contact Us'}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
              </Link>
              <Link
                href={`/${locale}/services`}
                className="inline-flex items-center gap-2 px-6 py-3.5 border-2 border-gray-300 hover:border-red-600 hover:text-red-600 text-gray-700 font-bold rounded-xl transition-all text-sm"
              >
                <span>{isAr ? 'استكشف خدماتنا' : 'Our Services'}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
