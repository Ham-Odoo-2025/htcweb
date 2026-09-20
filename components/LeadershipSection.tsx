import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MessageCircle, ArrowRight } from 'lucide-react';

interface LeadershipSectionProps {
  locale: string;
  messages: any;
}

export default function LeadershipSection({ locale, messages }: LeadershipSectionProps) {
  const isAr = locale === 'ar';
  const w = messages?.whyUs || {};

  const managers = [
    {
      name: isAr ? 'رفيق شاهول' : 'Rafeeque Shahul',
      role: isAr ? 'الرئيس التنفيذي (CEO)' : 'Chief Executive Officer',
      image: '/managers/rafeek_shahul.jpg',
      phone: '97455176118',
    },
    {
      name: isAr ? 'أجوش أجاين' : 'Agosh Ajayan',
      role: isAr ? 'المدير التنفيذي (MD)' : 'Managing Director',
      image: '/managers/agosh-ajayan.jpeg',
      phone: '97444882355',
    },
    {
      name: isAr ? 'شامي ك. س.' : 'Shamy K S',
      role: isAr ? 'المدير العام' : 'General Manager',
      image: '/managers/shamy_k_s.jpg',
      phone: '97477902510',
    },
    {
      name: isAr ? 'جشنو جوبي' : 'Jishnu Gopi',
      role: isAr ? 'مدير العمليات والإدارة' : 'Admin Manager',
      image: '/managers/jishnu-gopi.jpeg',
      phone: '97477702510',
    },
    {
      name: isAr ? 'عبد الجليل' : 'Abdul Jaleel',
      role: isAr ? 'مدير تطوير الأعمال' : 'Business Development Manager',
      image: '/managers/Abdul_jaleel.jpg',
      phone: '97477702591',
    },
  ];

  return (
    <section className="relative py-20 lg:py-28 bg-gray-950 text-white overflow-hidden" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* Why Choose Us Intro */}
          <div className="lg:col-span-2">
            <span className="text-red-500 text-xs sm:text-sm font-extrabold tracking-widest uppercase">
              {w.badge || (isAr ? 'لماذا تختارنا' : 'Why Choose Us')}
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              {w.heading ||
                (isAr
                  ? 'لماذا تختار شركة هاملتون للتجارة والمقاولات؟'
                  : 'Why Choose Hamilton Trading and Contracting')}
            </h2>
            <p className="mt-5 text-gray-400 text-sm leading-relaxed">
              {isAr
                ? 'مع أكثر من 12 عاماً من الخبرة في دولة قطر، اكتسبت شركتنا المعتمدة من الفئة الأولى لدى الدفاع المدني سمعة طيبة كأحد رواد أنظمة مكافحة الحرائق والسلامة وأنظمة MEP. قمنا بتنفيذ مئات المشاريع الكبرى ونفخر بتقديم عقود الصيانة السنوية (AMC) لآلاف المنشآت.'
                : 'With over 12 years of experience in Qatar, A-GRADE Civil Defence Approved Company has earned a trusted reputation as a leading provider of fire safety, security, and MEP solutions. Over the years, we have successfully installed our systems in thousands of projects across various sectors.'}
            </p>
            <p className="mt-4 text-gray-400 text-sm leading-relaxed">
              {isAr
                ? 'تشمل خدماتنا الشاملة أنظمة إنذار وكشف الحريق، أنظمة الإطفاء التلقائي، الرشاشات، طلمبات الحريق، وأعمال MEP المتكاملة لضمان أعلى معايير الأمان لمنشأتك.'
                : 'Our comprehensive services include Fire Alarm Systems, Fire Detection Systems, Fire Protection & Fighting Systems, and expert MEP (Mechanical, Electrical, and Plumbing) Works to ensure the highest standards of safety.'}
            </p>

            <Link
              href={`/${locale}/about`}
              className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow transition-all text-sm group"
            >
              <span>{isAr ? 'اعرف المزيد عنا' : 'Learn More'}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Leadership Team Grid */}
          <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-4">
            {managers.map((m, idx) => (
              <div
                key={idx}
                className="bg-gray-900 rounded-2xl p-5 flex flex-col items-center text-center border border-gray-800 hover:border-red-600 transition-colors"
              >
                <div className="size-20 rounded-full overflow-hidden shrink-0 mx-auto ring-2 ring-gray-700 relative">
                  <Image
                    src={m.image}
                    alt={m.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="mt-3 text-white font-bold text-sm leading-tight">{m.name}</p>
                <p className="text-gray-400 text-xs mt-1 leading-snug line-clamp-2">
                  {m.role}
                </p>
                <a
                  href={`https://wa.me/${m.phone}?text=Hello%20${encodeURIComponent(m.name)},%20I%20would%20like%20to%20connect%20with%20you%20regarding%20HTC%20Fire%20Qatar`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 w-full flex items-center justify-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{isAr ? 'محادثة سريعة' : 'Quick Chat'}</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
