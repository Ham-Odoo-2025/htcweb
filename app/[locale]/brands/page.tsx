import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, Award, MessageCircle, ArrowRight } from 'lucide-react';
import { getMessages } from '@/lib/data';

interface Props {
  params: { locale: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const isAr = params.locale === 'ar';
  return {
    title: isAr
      ? 'العلامات التجارية المعتمدة لمكافحة الحرائق في قطر | هاملتون'
      : 'Approved Fire Safety Brands in Qatar | Detnov, Naffco, Siemens | HTC Fire',
    description: isAr
      ? 'وكيل وموزع معتمد لأفضل الماركات العالمية لأنظمة إنذار ومكافحة الحرائق في قطر: ديتنوف، نافكو، سيمنز، إيسر، جي إس تي، وزيتا.'
      : 'Authorized dealer & distributor for world-leading fire safety brands in Qatar: Detnov, NAFFCO, Siemens, Esser, GST, Shield, and Zeta.',
    alternates: {
      canonical: `https://htc-fire.com/${params.locale}/brands`,
      languages: {
        en: 'https://htc-fire.com/en/brands',
        ar: 'https://htc-fire.com/ar/brands',
      },
    },
  };
}

export default function BrandsPage({ params }: Props) {
  const locale = params.locale === 'ar' ? 'ar' : 'en';
  const isAr = locale === 'ar';

  const brandDetails = [
    {
      name: 'DETNOV',
      origin: 'Spain (EU)',
      logo: '/brands/detnov.jpg',
      desc_en: 'Advanced addressable and conventional fire detection systems, compliant with EN54 standards and certified by Qatar Civil Defence.',
      desc_ar: 'أنظمة كشف وإنذار حريق معنونة وتقليدية متطورة مطابقة للمواصفة الأوروبية EN54 ومعتمدة من الدفاع المدني القطري.',
      products_en: ['Addressable Panels', 'Optical Smoke Detectors', 'Manual Call Points', 'Sounder Beacons'],
      products_ar: ['لوحات تحكم معنونة', 'كواشف دخان ضوئية', 'كواسر زجاج يدوية', 'أجراس وفلاشات إنذار'],
    },
    {
      name: 'NAFFCO',
      origin: 'UAE / International',
      logo: '/brands/naffco.jpg',
      desc_en: 'World-renowned manufacturer of firefighting equipment, UL-listed fire pumps, fire extinguishers, and sprinkler systems.',
      desc_ar: 'الشركة العالمية الرائدة في تصنيع معدات إطفاء الحرائق ومضخات الحريق المدرجة في قائمة UL وطفايات الحريق وشبكات الرشاشات.',
      products_en: ['UL Listed Fire Pumps', 'Fire Extinguishers', 'Hose Reels & Cabinets', 'Fire Hydrants'],
      products_ar: ['مضخات حريق UL Listed', 'طفايات حريق بكافة الأنواع', 'بكرات وخزائن الخراطيم', 'محابس وعساكر الإطفاء'],
    },
    {
      name: 'SIEMENS',
      origin: 'Germany',
      logo: '/brands/siemens.jpg',
      desc_en: 'Cutting-edge Cerberus PRO fire protection systems with deceptive-phenomena-free ASAtechnology detection.',
      desc_ar: 'أنظمة Cerberus PRO الذكية للسلامة من الحرائق والمزودة بتقنية ASAtechnology الدقيقة لمنع الإنذارات الكاذبة.',
      products_en: ['Cerberus PRO Systems', 'Multi-Sensor Detectors', 'Voice Evacuation Panels'],
      products_ar: ['أنظمة Cerberus PRO', 'كواشف متعددة الحساسات', 'أنظمة الإخلاء الصوتي'],
    },
    {
      name: 'FIREX',
      origin: 'International',
      logo: '/brands/firex.jpg',
      desc_en: 'High-performance fire extinguishers, suppression equipment, and automatic kitchen hood safety systems.',
      desc_ar: 'معدات إطفاء وطفايات حريق وأنظمة أمان متطورة لشفاطات المطابخ التجارية حاصلة على شهادات الجودة العالمية.',
      products_en: ['Kitchen Wet Chemical Systems', 'CO2 & Foam Extinguishers', 'Fire Hose Cabinets'],
      products_ar: ['أنظمة المواد الكيميائية الرطبة للمطابخ', 'طفايات الرغوة وثاني أكسيد الكربون', 'خزائن خراطيم الحريق'],
    },
    {
      name: 'GST',
      origin: 'UK / Global',
      logo: '/brands/gst.jpg',
      desc_en: 'Trusted intelligent fire alarm control panels and addressable loop devices widely deployed across commercial projects.',
      desc_ar: 'لوحات تحكم ذكية وأجهزة كشف إنذار معنونة موثوقة ومستخدمة على نطاق واسع في المشاريع التجارية والسكنية في قطر.',
      products_en: ['Intelligent Alarm Panels', 'Loop Repeaters', 'Interface Modules'],
      products_ar: ['لوحات إنذار ذكية', 'لوحات تكرار الحلقات', 'وحدات الربط والتحكم'],
    },
    {
      name: 'ESSER by Honeywell',
      origin: 'Germany / USA',
      logo: '/brands/esser.jpg',
      desc_en: 'Premium enterprise-grade fire alarm and voice alert systems for hospitals, towers, and major infrastructure.',
      desc_ar: 'أنظمة إنذار صوتي وإطفاء حريق متطورة للمستشفيات والأبراج السكنية والتجارية ومشاريع البنية التحتية الكبرى.',
      products_en: ['IQ8Wireless Detectors', 'FlexES Control Panels', 'Voice Alarm Systems'],
      products_ar: ['كواشف لاسلكية IQ8', 'لوحات تحكم FlexES', 'أنظمة الإنذار الصوتي'],
    },
    {
      name: 'SHIELD',
      origin: 'United Kingdom',
      logo: '/brands/shield.jpg',
      desc_en: 'LPCB and UL-certified fire cables, suppression accessories, and robust industrial safety hardware.',
      desc_ar: 'كابلات مقاومة للحريق معتمدة من LPCB وUL، وإكسسوارات أنظمة الإخماد المتوافقة مع أعلى المعايير.',
      products_en: ['Fire Rated Cables', 'Gas Release Panels', 'Smoke Curtains'],
      products_ar: ['كابلات مقاومة للنيران', 'لوحات إطلاق الغاز', 'ستائر الدخان المقاومة'],
    },
    {
      name: 'ZETA',
      origin: 'United Kingdom',
      logo: '/brands/zeta.jpg',
      desc_en: 'Renowned British fire alarm manufacturing offering conventional and analogue addressable systems with long service life.',
      desc_ar: 'أنظمة إنذار حريق بريطانية الصنع تشمل اللوحات التناظرية والتقليدية المعروفة بالمتانة وطول العمر الافتراضي.',
      products_en: ['Fyreye Detectors', 'Simplicity Addressable', 'Gas Detection Systems'],
      products_ar: ['كواشف Fyreye', 'لوحات Simplicity', 'أنظمة كشف تسرب الغاز'],
    },
  ];

  return (
    <div className="pt-24 lg:pt-28" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Header Banner */}
      <section className="bg-gray-950 py-16 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-red-500 text-xs font-bold uppercase tracking-widest">
            {isAr ? 'شركاء الجودة العالميون' : 'Global Safety Partners'}
          </span>
          <h1 className="mt-3 text-3xl sm:text-5xl font-extrabold leading-tight">
            {isAr
              ? 'العلامات التجارية المعتمدة من الدفاع المدني'
              : 'Our Certified Brand Partners in Qatar'}
          </h1>
          <p className="mt-4 text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">
            {isAr
              ? 'تتعاون هاملتون للتجارة والمقاولات مع كبرى الشركات العالمية لضمان توفير معدات معتمدة ومطابقة للاشتراطات الفنية لوزارة الداخلية والدفاع المدني القطري.'
              : 'We partner with the world’s leading manufacturers to supply, install, and service civil defence approved fire alarms, suppression systems, and safety devices across Qatar.'}
          </p>
        </div>
      </section>

      {/* Brands Cards Grid */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {brandDetails.map((brand, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-xl transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div className="relative w-36 h-14">
                      <Image
                        src={brand.logo}
                        alt={brand.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span className="text-[11px] font-bold px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
                      {brand.origin}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {brand.name} Fire Protection
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-6">
                    {isAr ? brand.desc_ar : brand.desc_en}
                  </p>

                  <div className="mb-6">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                      {isAr ? 'المنتجات الرئيسية:' : 'Certified Product Lines:'}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {(isAr ? brand.products_ar : brand.products_en).map((item, i) => (
                        <span
                          key={i}
                          className="text-xs bg-red-50 text-red-700 font-semibold px-2.5 py-1 rounded-md"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs font-medium text-emerald-600 flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4" />
                    <span>{isAr ? 'معتمد QCDD في قطر' : 'QCDD Approved'}</span>
                  </span>

                  <a
                    href={`https://wa.me/97455176118?text=Hello%20Hamilton%20Fire,%20I%20would%20like%20to%20inquire%20about%20${encodeURIComponent(brand.name)}%20products`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-red-600 hover:text-red-700"
                  >
                    <span>{isAr ? 'طلب تسعيرة' : 'Request Quote'}</span>
                    <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
