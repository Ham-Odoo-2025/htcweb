import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ShieldCheck, CheckCircle2, MessageCircle, Phone, ArrowRight, HelpCircle, FileText } from 'lucide-react';
import JsonLd from '@/components/JsonLd';
import { getServices, getServiceBySlug, getMessages } from '@/lib/data';

interface Props {
  params: { locale: string; slug: string };
}

export async function generateStaticParams() {
  const services = getServices();
  const params: { locale: string; slug: string }[] = [];

  for (const locale of ['en', 'ar']) {
    for (const svc of services) {
      params.push({ locale, slug: svc.slug });
    }
  }

  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = getServiceBySlug(params.slug);
  if (!service) return {};

  const isAr = params.locale === 'ar';
  const title = isAr
    ? service.metaTitle_ar || service.title_ar || service.title_en
    : service.metaTitle_en || service.title_en;
  const description = isAr
    ? service.metaDescription_ar || service.shortDescription_ar || service.shortDescription_en
    : service.metaDescription_en || service.shortDescription_en;

  return {
    title: `${title} | HTC Fire Qatar`,
    description,
    alternates: {
      canonical: `https://htc-fire.com/${params.locale}/services/${service.slug}`,
      languages: {
        en: `https://htc-fire.com/en/services/${service.slug}`,
        ar: `https://htc-fire.com/ar/services/${service.slug}`,
      },
    },
    openGraph: {
      title,
      description,
      images: [
        {
          url: service.heroImage || 'https://htc-fire.com/about-us.jpg',
          alt: title,
        },
      ],
    },
  };
}

export default function ServiceDetailPage({ params }: Props) {
  const service = getServiceBySlug(params.slug);
  if (!service) notFound();

  const locale = params.locale === 'ar' ? 'ar' : 'en';
  const isAr = locale === 'ar';
  const allServices = getServices();

  const title = isAr ? service.title_ar || service.title_en : service.title_en;
  const shortDesc = isAr
    ? service.shortDescription_ar || service.shortDescription_en
    : service.shortDescription_en;
  const content = isAr
    ? service.content_ar || service.content_en
    : service.content_en;
  const badge = isAr ? service.badge_ar || service.badge_en : service.badge_en;
  const tags = isAr ? service.tags_ar || service.tags_en : service.tags_en;

  // Schema for Service and FAQ
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: title,
    description: shortDesc,
    provider: {
      '@type': 'LocalBusiness',
      name: 'Hamilton Trading & Contracting W.L.L',
      telephone: '+97444882355',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Doha',
        addressCountry: 'QA',
      },
    },
    areaServed: {
      '@type': 'Country',
      name: 'Qatar',
    },
  };

  const faqSchema = service.faqs && service.faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: service.faqs.map(faq => ({
      '@type': 'Question',
      name: isAr ? faq.question_ar || faq.question_en : faq.question_en,
      acceptedAnswer: {
        '@type': 'Answer',
        text: isAr ? faq.answer_ar || faq.answer_en : faq.answer_en,
      }
    }))
  } : null;

  return (
    <div className="pt-24 lg:pt-28" dir={isAr ? 'rtl' : 'ltr'}>
      <JsonLd data={serviceSchema} />
      {faqSchema && <JsonLd data={faqSchema} />}

      {/* Header Banner */}
      <section className="bg-gray-950 py-16 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            {badge && (
              <span className="inline-block px-3 py-1 bg-red-600/30 border border-red-500/40 text-red-400 text-xs font-bold uppercase tracking-wider rounded-md mb-4">
                {badge}
              </span>
            )}
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
              {title}
            </h1>
            <p className="mt-4 text-gray-300 text-sm sm:text-base leading-relaxed">
              {shortDesc}
            </p>

            {tags && tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs bg-white/10 text-gray-300 px-3 py-1 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Content Layout */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-10">
              {/* Hero Image */}
              <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden shadow-lg border border-gray-100 bg-gray-50">
                <Image
                  src={service.heroImage || '/about-us.jpg'}
                  alt={title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Subpages Navigation if present */}
              {service.subpages && service.subpages.length > 0 && (
                <div className="bg-red-50 border border-red-100 rounded-2xl p-6">
                  <h3 className="text-sm font-bold text-red-900 uppercase tracking-wider mb-3">
                    {isAr ? 'الأنظمة والحلول المتفرعة' : 'Related Sub-Systems & Categories'}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {service.subpages.map((sp) => {
                      const spTitle = isAr
                        ? sp.title_ar || sp.title_en || sp.slug
                        : sp.title_en || sp.slug;
                      return (
                        <Link
                          key={sp.slug}
                          href={`/${locale}/services/${service.slug}/${sp.slug}`}
                          className="px-4 py-2 rounded-xl bg-white border border-red-200 text-xs font-bold text-gray-800 hover:bg-red-600 hover:text-white transition shadow-2xs"
                        >
                          {spTitle}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Rich Body Content */}
              <div
                className="prose prose-sm sm:prose max-w-none text-gray-700 leading-relaxed space-y-4"
                dangerouslySetInnerHTML={{ __html: content }}
              />

              {/* Features List */}
              {service.features && service.features.length > 0 && (
                <div className="mt-8 pt-8 border-t border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    {isAr ? 'أهم مميزات النظام والحلول المقدمة' : 'Key System Features & Specifications'}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.features.map((feat, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2.5 p-3 rounded-xl bg-gray-50 border border-gray-100"
                      >
                        <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                        <span className="text-xs font-semibold text-gray-800">
                          {isAr ? feat.text_ar || feat.text_en : feat.text_en}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* FAQs Section */}
              {service.faqs && service.faqs.length > 0 && (
                <div className="mt-12 pt-8 border-t border-gray-100">
                  <div className="flex items-center gap-2 mb-6">
                    <HelpCircle className="w-5 h-5 text-red-600" />
                    <h3 className="text-xl font-bold text-gray-900">
                      {isAr ? 'الأسئلة الشائعة حول هذه الخدمة' : 'Frequently Asked Questions'}
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {service.faqs.map((faq, i) => (
                      <div
                        key={i}
                        className="bg-gray-50 border border-gray-200 rounded-2xl p-5"
                      >
                        <p className="font-bold text-gray-900 text-sm mb-2">
                          {isAr ? faq.question_ar || faq.question_en : faq.question_en}
                        </p>
                        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                          {isAr ? faq.answer_ar || faq.answer_en : faq.answer_en}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Quick Inquiry Card */}
              <div className="bg-gray-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/30 text-red-400 text-xs font-bold uppercase tracking-wider mb-4">
                  <ShieldCheck className="w-4 h-4 text-red-500" />
                  <span>{isAr ? 'اعتماد الدفاع المدني' : 'QCDD Approved'}</span>
                </div>

                <h4 className="text-xl font-extrabold mb-3">
                  {isAr ? 'هل تحتاج عرض سعر لهذا النظام؟' : 'Need a Quote for this System?'}
                </h4>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-6">
                  {isAr
                    ? 'فريقنا الهندسي جاهز لعمل المعاينة وتقديم الاستشارات الفنية والامتثال لاشتراطات الدفاع المدني.'
                    : 'Our certified engineers can provide site visits, technical estimation, and civil defence approvals across Qatar.'}
                </p>

                <div className="space-y-3">
                  <a
                    href={`https://wa.me/97455176118?text=Hello%20Hamilton%20Fire,%20I%20would%20like%20to%20request%20a%20quote%20for%20${encodeURIComponent(title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-bold transition shadow"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{isAr ? 'تواصل عبر واتساب' : 'Chat on WhatsApp'}</span>
                  </a>

                  <a
                    href="tel:+97444882355"
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs sm:text-sm font-bold transition"
                  >
                    <Phone className="w-4 h-4" />
                    <span>+974 4488 2355</span>
                  </a>

                  <Link
                    href={`/${locale}/contact`}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs sm:text-sm font-bold transition"
                  >
                    <FileText className="w-4 h-4" />
                    <span>{isAr ? 'طلب معاينة رسمية' : 'Request Official Inspection'}</span>
                  </Link>
                </div>
              </div>

              {/* Other Services Navigation */}
              <div className="bg-gray-50 border border-gray-100 rounded-3xl p-6">
                <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
                  {isAr ? 'خدمات أخرى' : 'All Fire Protection Services'}
                </h4>
                <div className="space-y-1.5">
                  {allServices.map((s) => {
                    const isCurrent = s.slug === service.slug;
                    const sTitle = isAr ? s.title_ar || s.title_en : s.title_en;
                    return (
                      <Link
                        key={s.slug}
                        href={`/${locale}/services/${s.slug}`}
                        className={`block py-2 px-3 rounded-lg text-xs font-semibold transition ${
                          isCurrent
                            ? 'bg-red-600 text-white'
                            : 'text-gray-700 hover:bg-gray-100 hover:text-red-600'
                        }`}
                      >
                        {sTitle}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
