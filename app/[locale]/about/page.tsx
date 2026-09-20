import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, Target, Eye, Award, CheckCircle2, ArrowRight } from 'lucide-react';
import LeadershipSection from '@/components/LeadershipSection';
import ClientsSection from '@/components/ClientsSection';
import { getMessages } from '@/lib/data';

interface Props {
  params: { locale: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const isAr = params.locale === 'ar';
  return {
    title: isAr ? 'من نحن | هاملتون للسلامة ومكافحة الحرائق قطر' : 'About Us | Hamilton Fire Qatar',
    description: isAr
      ? 'تعرف على شركة هاملتون للتجارة والمقاولات، الشركة المعتمدة من الفئة الأولى لدى الدفاع المدني في قطر لأنظمة إنذار ومكافحة الحرائق وحلول MEP.'
      : 'Learn about Hamilton Trading & Contracting, Qatar Civil Defence A-Grade approved fire protection and MEP contractor in Doha.',
    alternates: {
      canonical: `https://htc-fire.com/${params.locale}/about`,
      languages: {
        en: 'https://htc-fire.com/en/about',
        ar: 'https://htc-fire.com/ar/about',
      },
    },
  };
}

export default function AboutPage({ params }: Props) {
  const locale = params.locale === 'ar' ? 'ar' : 'en';
  const isAr = locale === 'ar';
  const messages = getMessages(locale);

  return (
    <div className="pt-24 lg:pt-28" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Header Banner */}
      <section className="bg-gray-950 py-16 lg:py-20 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-600/20 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-widest mb-4">
            <Award className="w-3.5 h-3.5 text-red-500" />
            <span>{isAr ? 'تميز والتزام منذ 12+ عاماً' : '12+ Years of Excellence'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            {isAr
              ? 'عن شركة هاملتون للتجارة والمقاولات'
              : 'About Hamilton Trading & Contracting W.L.L'}
          </h1>
          <p className="mt-4 text-gray-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            {isAr
              ? 'الشركة الرائدة في دولة قطر في مجال هندسة أنظمة السلامة ومكافحة الحرائق والحلول الكهروميكانيكية المتكاملة (MEP).'
              : "Qatar's leading provider of comprehensive fire protection engineering, life safety systems, and MEP contracting services."}
          </p>
        </div>
      </section>

      {/* Main Story & Values */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="text-red-600 text-xs font-bold uppercase tracking-widest">
                {isAr ? 'تاريخنا ورؤيتنا' : 'Our Heritage'}
              </span>
              <h2 className="mt-2 text-3xl font-extrabold text-gray-900 leading-tight">
                {isAr
                  ? 'معتمدون من الفئة الأولى لدى الإدارة العامة للدفاع المدني القطري'
                  : 'A-Grade Civil Defence Approved Fire Protection Contractor'}
              </h2>
              <p className="mt-4 text-gray-600 text-sm leading-relaxed">
                {isAr
                  ? 'تأسست شركة هاملتون للتجارة والمقاولات ذ.م.م في الدوحة - قطر، لتكون شريكاً استراتيجياً موثوقاً في حماية الأرواح والمنشآت. على مدار أكثر من عقد من الزمان، نجحنا في تنفيذ أكبر المشاريع في القطاعات التجارية والصناعية والسكنية والبنية التحتية.'
                  : 'Founded in Doha, Hamilton Trading & Contracting W.L.L has established itself as an authoritative leader in fire safety systems. With an A-Grade rating from the General Directorate of Civil Defence (QCDD), we serve clients across commercial, industrial, healthcare, hospitality, and residential sectors.'}
              </p>
              <p className="mt-3 text-gray-600 text-sm leading-relaxed">
                {isAr
                  ? 'نلتزم بأعلى معايير الجمعية الوطنية للحماية من الحرائق (NFPA) والمعايير البريطانية (BS)، ونوفر توريداً معتمداً من كبرى الشركات العالمية.'
                  : 'We operate in strict adherence to international NFPA and British Standards (BS), ensuring every installation meets and exceeds Qatar Civil Defence statutory regulations.'}
              </p>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
                  <Target className="w-8 h-8 text-red-600 mb-3" />
                  <h3 className="font-bold text-gray-900 text-sm">
                    {isAr ? 'رسالتنا' : 'Our Mission'}
                  </h3>
                  <p className="text-gray-500 text-xs mt-1.5 leading-relaxed">
                    {isAr
                      ? 'توفير أعلى مستويات الأمان والسلامة عبر حلول هندسية مبتكرة وموثوقة تحمي الأرواح والأصول.'
                      : 'Delivering world-class life safety systems through engineering excellence, trusted products, and reliable maintenance.'}
                  </p>
                </div>
                <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
                  <Eye className="w-8 h-8 text-red-600 mb-3" />
                  <h3 className="font-bold text-gray-900 text-sm">
                    {isAr ? 'رؤيتنا' : 'Our Vision'}
                  </h3>
                  <p className="text-gray-500 text-xs mt-1.5 leading-relaxed">
                    {isAr
                      ? 'أن نكون الخيار الأول والأكثر موثوقية في قطر والخليج لحلول السلامة من الحرائق وMEP.'
                      : 'To remain the most trusted and preferred partner for turnkey fire protection and MEP projects across Qatar and GCC.'}
                  </p>
                </div>
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-gray-100 aspect-[4/3]">
              <Image
                src="/about-us.jpg"
                alt="Hamilton Trading and Contracting facility"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <LeadershipSection locale={locale} messages={messages} />

      {/* Clients Section */}
      <ClientsSection locale={locale} messages={messages} />
    </div>
  );
}
