'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { BookOpen, ShieldCheck, ArrowRight } from 'lucide-react';

interface Props {
  params: { locale: string };
}

export default function BlogPage({ params }: Props) {
  const locale = params.locale === 'ar' ? 'ar' : 'en';
  const isAr = locale === 'ar';

  const embedScriptUrl = 'https://app.trysoro.com/api/embed/a62e297b-20bd-4c98-a36e-e51e25ed0b99';

  useEffect(() => {
    const existing = document.querySelector(`script[src="${embedScriptUrl}"]`);
    if (existing) existing.remove();

    const script = document.createElement('script');
    script.src = embedScriptUrl;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  const featuredGuides = [
    {
      title_en: 'Civil Defence (QCDD) Fire Safety Requirements for Commercial Buildings in Qatar',
      title_ar: 'اشتراطات الدفاع المدني للسلامة من الحرائق في المباني التجارية بدولة قطر',
      desc_en: 'A comprehensive guide explaining the NFPA guidelines and QCDD inspection protocols required for building occupancy certification in Doha.',
      desc_ar: 'دليل شامل يوضح معايير NFPA وإجراءات التفتيش والاعتماد المطلوبة للحصول على شهادة إتمام البناء والدفاع المدني في الدوحة.',
      tag_en: 'Regulations',
      tag_ar: 'لوائح وقوانين',
    },
    {
      title_en: 'Addressable vs. Conventional Fire Alarm Systems: Which is Right for Your Project?',
      title_ar: 'مقارنة بين أنظمة إنذار الحريق المعنونة والتقليدية: أيهما أنسب لمشروعك؟',
      desc_en: 'Understanding loop capacity, pinpoint location accuracy, scalability, and lifecycle costs for residential towers and industrial warehouses.',
      desc_ar: 'فهم سعة الحلقات وتحديد نقطة الحريق بدقة والتكلفة الإجمالية للأبراج السكنية والمستودعات والمجمعات.',
      tag_en: 'Engineering',
      tag_ar: 'هندسة وأنظمة',
    },
    {
      title_en: 'The Critical Importance of Fire Alarm & Suppression Annual Maintenance Contracts (AMC)',
      title_ar: 'الأهمية القصوى لعقود الصيانة السنوية (AMC) لأنظمة إنذار ومكافحة الحرائق',
      desc_en: 'How regular 24/7 emergency support, battery tests, and hydraulic pump flow tests prevent false alarms and ensure non-stop QCDD license renewal.',
      desc_ar: 'كيف تضمن الصيانة الدورية واختبارات الضغط والبطاريات تجديد رخصة الدفاع المدني دون انقطاع وتجنب الغرامات.',
      tag_en: 'Maintenance',
      tag_ar: 'صيانة دورية',
    },
  ];

  return (
    <div className="pt-24 lg:pt-28" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Header */}
      <section className="bg-gray-950 py-16 text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-red-500 text-xs font-bold uppercase tracking-widest">
            {isAr ? 'المعرفة والسلامة' : 'Knowledge & Insights'}
          </span>
          <h1 className="mt-3 text-3xl sm:text-5xl font-extrabold leading-tight">
            {isAr ? 'مدونة السلامة والوقاية من الحرائق' : 'Fire Protection Blog & Technical Guides'}
          </h1>
          <p className="mt-4 text-gray-400 text-sm max-w-xl mx-auto">
            {isAr
              ? 'مقالات وإرشادات فنية حول معايير الدفاع المدني القطري، أفضل ممارسات صيانة أنظمة الإطفاء، وأحدث تقنيات الإنذار الذكي.'
              : 'Technical guides, Qatar Civil Defence compliance insights, and best practices for building managers and contractors.'}
          </p>
        </div>
      </section>

      {/* Soro Embed Container */}
      <section className="py-12 bg-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div id="soro-blog" className="min-h-[200px]"></div>

        {/* Featured Safety Guides */}
        <div className="mt-16 pt-12 border-t border-gray-100">
          <div className="mb-8">
            <span className="text-red-600 text-xs font-bold uppercase tracking-widest">
              {isAr ? 'مقالات مميزة' : 'Featured Technical Guides'}
            </span>
            <h2 className="text-2xl font-extrabold text-gray-900 mt-1">
              {isAr ? 'أحدث الإرشادات الهندسية ومعايير الدفاع المدني' : 'Safety Protocols & Best Practices in Qatar'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredGuides.map((guide, idx) => (
              <div
                key={idx}
                className="bg-gray-50 border border-gray-100 rounded-3xl p-6 flex flex-col justify-between hover:shadow-lg transition shadow-xs"
              >
                <div>
                  <span className="inline-block text-[11px] font-bold px-2.5 py-1 rounded bg-red-100 text-red-700 mb-3">
                    {isAr ? guide.tag_ar : guide.tag_en}
                  </span>
                  <h3 className="text-base font-bold text-gray-900 leading-snug mb-3">
                    {isAr ? guide.title_ar : guide.title_en}
                  </h3>
                  <p className="text-gray-600 text-xs leading-relaxed mb-6">
                    {isAr ? guide.desc_ar : guide.desc_en}
                  </p>
                </div>

                <Link
                  href={`/${locale}/contact`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700"
                >
                  <span>{isAr ? 'استشر مهندسينا' : 'Consult Our Engineers'}</span>
                  <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
