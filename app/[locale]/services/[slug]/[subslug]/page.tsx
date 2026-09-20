import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, ShieldCheck, CheckCircle2, MessageCircle } from 'lucide-react';
import { getServices, getServiceBySlug, getMessages } from '@/lib/data';

interface Props {
  params: { locale: string; slug: string; subslug: string };
}

export async function generateStaticParams() {
  const services = getServices();
  const params: { locale: string; slug: string; subslug: string }[] = [];

  for (const locale of ['en', 'ar']) {
    for (const svc of services) {
      if (svc.subpages && svc.subpages.length > 0) {
        for (const sub of svc.subpages) {
          params.push({ locale, slug: svc.slug, subslug: sub.slug });
        }
      }
    }
  }

  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const parentService = getServiceBySlug(params.slug);
  if (!parentService) return {};

  const sub = parentService.subpages?.find(
    (s) => s.slug.toLowerCase() === params.subslug.toLowerCase()
  );

  const isAr = params.locale === 'ar';
  const subTitle = sub
    ? (isAr ? sub.title_ar || sub.title_en : sub.title_en) || sub.slug.replace(/-/g, ' ')
    : params.subslug.replace(/-/g, ' ');

  const title = `${subTitle} | ${parentService.title_en} | HTC Fire Qatar`;

  return {
    title,
    description: `QCDD Approved ${subTitle} by Hamilton Trading & Contracting in Doha Qatar.`,
    alternates: {
      canonical: `https://htc-fire.com/${params.locale}/services/${parentService.slug}/${params.subslug}`,
    },
  };
}

export default function SubServicePage({ params }: Props) {
  const parentService = getServiceBySlug(params.slug);
  if (!parentService) notFound();

  const sub = parentService.subpages?.find(
    (s) => s.slug.toLowerCase() === params.subslug.toLowerCase()
  );

  const locale = params.locale === 'ar' ? 'ar' : 'en';
  const isAr = locale === 'ar';

  const subTitle = sub
    ? (isAr ? sub.title_ar || sub.title_en : sub.title_en) || sub.slug.replace(/-/g, ' ')
    : params.subslug.replace(/-/g, ' ');

  const parentTitle = isAr ? parentService.title_ar || parentService.title_en : parentService.title_en;

  return (
    <div className="pt-24 lg:pt-28" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Header Banner */}
      <section className="bg-gray-950 py-16 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href={`/${locale}/services/${parentService.slug}`}
            className="inline-flex items-center gap-1 text-xs font-bold text-red-400 hover:text-red-300 mb-4"
          >
            <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-180" />
            <span>{isAr ? `العودة إلى ${parentTitle}` : `Back to ${parentTitle}`}</span>
          </Link>
          <h1 className="text-3xl sm:text-5xl font-extrabold capitalize text-white leading-tight">
            {subTitle}
          </h1>
          <p className="mt-3 text-gray-300 text-sm max-w-2xl">
            {isAr
              ? `حلول وأنظمة ${subTitle} المتوافقة مع معايير الدفاع المدني في دولة قطر.`
              : `High reliability ${subTitle} engineered and installed by Hamilton Trading & Contracting W.L.L in Qatar.`}
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-50 border border-gray-200 rounded-3xl p-8 sm:p-10">
            <div className="flex items-center gap-2 mb-6">
              <ShieldCheck className="w-6 h-6 text-red-600" />
              <h2 className="text-xl font-bold text-gray-900">
                {isAr ? 'المواصفات الفنية والاعتماد' : 'Technical Compliance & QCDD Approval'}
              </h2>
            </div>

            <p className="text-gray-700 text-sm leading-relaxed">
              {isAr
                ? `تقدم شركة هاملتون للتجارة والمقاولات أعلى معايير الجودة في توريد وتركيب وصيانة ${subTitle}. جميع المواد والأجهزة المستخدمة معتمدة من الإدارة العامة للدفاع المدني ومطابقة للمعايير الدولية NFPA وEN54.`
                : `Hamilton Trading & Contracting delivers complete turnkey supply, installation, testing, commissioning and AMC maintenance for ${subTitle}. All devices and control panels are fully certified by Qatar Civil Defence (QCDD), UL Listed, and compliant with NFPA standards.`}
            </p>

            {sub?.features && sub.features.length > 0 && (
              <div className="mt-8 space-y-3">
                {sub.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-xs font-semibold text-gray-800">
                      {isAr ? feat.text_ar || feat.text_en : feat.text_en}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-10 pt-8 border-t border-gray-200 flex flex-wrap items-center gap-4">
              <a
                href={`https://wa.me/97455176118?text=Hello%20Hamilton%20Fire,%20I%20would%20like%20to%20inquire%20about%20${encodeURIComponent(subTitle)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{isAr ? 'استفسار عبر واتساب' : 'Inquire via WhatsApp'}</span>
              </a>

              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow"
              >
                <span>{isAr ? 'طلب عرض سعر رسمي' : 'Get Official Quotation'}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
