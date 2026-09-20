import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, CheckCircle2, MessageCircle, Phone, ArrowRight, Clock, AlertTriangle, FileCheck, Award } from 'lucide-react';
import { getMessages } from '@/lib/data';

interface Props {
  params: { locale: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const isAr = params.locale === 'ar';
  return {
    title: isAr
      ? 'عقود الصيانة السنوية لأنظمة الحريق في قطر (AMC) | معتمد من الدفاع المدني'
      : 'Fire Alarm & Fire Fighting AMC in Qatar | QCDD Approved Maintenance',
    description: isAr
      ? 'عقود صيانة سنوية معتمدة من الدفاع المدني (QCDD) لأنظمة إنذار ومكافحة الحرائق، الرشاشات، ومضخات الحريق في الدوحة مع خدمة طوارئ 24/7.'
      : 'Qatar Civil Defence (QCDD) approved Annual Maintenance Contract (AMC) for fire alarms, suppression, sprinklers, and fire pumps with 24/7 emergency support.',
    alternates: {
      canonical: `https://htc-fire.com/${params.locale}/annual-maintenance-contract`,
      languages: {
        en: 'https://htc-fire.com/en/annual-maintenance-contract',
        ar: 'https://htc-fire.com/ar/annual-maintenance-contract',
      },
    },
  };
}

export default function AMCPage({ params }: Props) {
  const locale = params.locale === 'ar' ? 'ar' : 'en';
  const isAr = locale === 'ar';
  const messages = getMessages(locale);
  const m = messages?.amc || {};

  const covers = [
    m.cover1 || 'Routine fire alarm panel and system inspection',
    m.cover2 || 'Device testing: smoke, heat detectors, MCPs, sounders',
    m.cover3 || 'Battery health and power supply checks',
    m.cover4 || 'System troubleshooting and repairs',
    m.cover5 || 'Detailed QCDD-compliant reports',
    m.cover6 || '24/7 emergency technical support',
  ];

  const systems = [
    m.sys1 || 'Fire Detection System',
    m.sys2 || 'Fire Alarm System',
    m.sys3 || 'Fire Suppression System',
    m.sys4 || 'Firefighting Equipment',
    m.sys5 || 'Fire Pump System',
    m.sys6 || 'Fire Monitoring System (CAMS)',
    m.sys7 || 'Fire Safety Support Systems',
    m.sys8 || 'Fire Sprinkler System',
    m.sys9 || 'Fire Hose Reel System',
    m.sys10 || 'Dry Riser System',
    m.sys11 || 'Fire Water Mist System',
    m.sys12 || 'Deluge System',
    m.sys13 || 'Kitchen Hood Fire System',
    m.sys14 || 'Wet Chemical Fire System',
    m.sys15 || 'Fire Extinguishers',
    m.sys16 || 'Fire Cylinders',
  ];

  const importances = [
    { title: m.imp1Title || 'Legal Compliance (QCDD)', desc: m.imp1Desc || 'Mandatory to keep fire systems operational in Qatar. Avoid penalties and pass inspections.' },
    { title: m.imp2Title || '24/7 Safety Assurance', desc: m.imp2Desc || 'Alarms, sprinklers, pumps, and extinguishers must function at all times.' },
    { title: m.imp3Title || 'Preventive Maintenance', desc: m.imp3Desc || 'Regular checks identify faults before they become life-threatening.' },
    { title: m.imp4Title || 'Business Continuity', desc: m.imp4Desc || 'Fire damage can halt operations. AMC protects lives, property, and continuity.' },
    { title: m.imp5Title || 'Certified Documentation', desc: m.imp5Desc || 'QCDD-compliant certificates ready for insurance, audits, and municipality license renewals.' },
    { title: m.imp6Title || 'Priority Emergency Support', desc: m.imp6Desc || 'AMC clients receive priority 24/7 emergency dispatch from our certified technical team.' },
  ];

  return (
    <div className="pt-24 lg:pt-28" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Hero Banner */}
      <section className="bg-gray-950 py-16 lg:py-20 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-600/20 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-widest mb-4">
            <Award className="w-3.5 h-3.5 text-red-500" />
            <span>{m.pageHeroBadge || 'QCDD Approved AMC Services'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight">
            {m.pageHeroLine1 || 'Annual Fire Alarm System'}{' '}
            <span className="text-red-500">{m.pageHeroLine2 || 'Maintenance in Qatar'}</span>
          </h1>
          <p className="mt-4 text-gray-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            {m.tagline || 'Stay Compliant. Stay Protected. Trust Hamilton Trading and Contracting WLL for Expert AMC Services.'}
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/97455176118?text=Hello%20Hamilton%20Fire,%20I%20would%20like%20to%20inquire%20about%20QCDD%20AMC%20Maintenance%20contract"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow-lg transition"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{m.ctaWhatsapp || 'Chat on WhatsApp to Schedule'}</span>
            </a>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow-lg transition"
            >
              <Phone className="w-4 h-4" />
              <span>{isAr ? 'طلب معاينة وعرض سعر' : 'Request AMC Quotation'}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Scope & Why Choose Hamilton */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="bg-gray-50 border border-gray-100 rounded-3xl p-8 sm:p-10 shadow-sm">
              <h2 className="text-2xl font-extrabold text-gray-900 mb-6 flex items-center gap-2">
                <FileCheck className="w-6 h-6 text-red-600" />
                <span>{m.coversTitle || 'What Our AMC Covers'}</span>
              </h2>
              <div className="space-y-4">
                {covers.map((cov, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700 font-medium leading-relaxed">
                      {cov}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-red-600 text-white rounded-3xl p-8 sm:p-10 shadow-xl">
              <h2 className="text-2xl font-extrabold mb-6 flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-white" />
                <span>{m.whyTitle || 'Why Choose Hamilton for AMC?'}</span>
              </h2>
              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-white shrink-0 mt-0.5" />
                  <span>{m.why1 || 'Certified fire safety professionals and QCDD approved engineers'}</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-white shrink-0 mt-0.5" />
                  <span>{m.why2 || 'QCDD-approved inspection logs, certificates, and municipality renewal filings'}</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-white shrink-0 mt-0.5" />
                  <span>{m.why3 || 'Reliable maintenance for commercial, industrial, residential, and healthcare buildings'}</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-white shrink-0 mt-0.5" />
                  <span>{m.why4 || 'Flexible annual, semi-annual, and quarterly service schedules'}</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-white shrink-0 mt-0.5" />
                  <span>{m.why5 || 'Trusted by hundreds of the top real estate, industrial, and retail firms in Qatar'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Systems Maintained */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-red-600 text-xs font-bold uppercase tracking-widest">
              {m.systemsScheduleNote || 'Comprehensive Maintenance'}
            </span>
            <h2 className="text-3xl font-extrabold text-gray-900 mt-2">
              {m.systemsTitle || 'Fire Systems We Maintain Across Qatar'}
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm mt-2">
              {m.systemsScheduleOptions || 'Annually · Semi-Annually · Quarterly · Monthly · 24/7 Emergency Response'}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {systems.map((sys, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 rounded-2xl p-4 flex items-center gap-3 shadow-2xs hover:border-red-300 transition"
              >
                <div className="size-2.5 rounded-full bg-red-600 shrink-0"></div>
                <span className="text-xs font-bold text-gray-800 leading-snug">
                  {sys}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why AMC is Critical */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">
              {m.importanceTitle || 'Why is Fire System AMC'}{' '}
              <span className="text-red-600">{m.importanceAccent || 'Important in Qatar?'}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {importances.map((imp, idx) => (
              <div
                key={idx}
                className="bg-gray-50 border border-gray-100 rounded-3xl p-6 hover:shadow-md transition"
              >
                <h3 className="text-base font-bold text-gray-900 mb-2">
                  {imp.title}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                  {imp.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gray-950 py-16 text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-4">
            {m.pageFinalHeading || 'Ready to Secure Your AMC Contract in Qatar?'}
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm mb-8 leading-relaxed">
            {m.pageFinalSubtitle || 'Contact our certified engineering team today for a complimentary site assessment and competitive quotation.'}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/97455176118?text=Hello%20Hamilton%20Fire,%20I%20would%20like%20an%20AMC%20inspection%20and%20quotation"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow transition"
            >
              {isAr ? 'واتساب مباشر: +974 5517 6118' : 'WhatsApp: +974 5517 6118'}
            </a>
            <Link
              href={`/${locale}/contact`}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow transition"
            >
              {isAr ? 'تواصل معنا' : 'Contact Us'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
