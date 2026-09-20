'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldAlert, Award } from 'lucide-react';

interface HeroProps {
  locale: string;
  messages: any;
}

export default function Hero({ locale, messages }: HeroProps) {
  const isAr = locale === 'ar';
  const h = messages?.hero || {};

  return (
    <section
      id="home"
      dir={isAr ? 'rtl' : 'ltr'}
      className="relative min-h-[92vh] flex items-center overflow-hidden pt-28 md:pt-32"
    >
      {/* Background Video with Poster Fallback */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        poster="/video-thumb.png"
        disablePictureInPicture
        className="absolute inset-0 w-full h-full object-cover object-center"
      >
        <source
          src="https://d11w7iudg4apkd.cloudfront.net/1776159535210-81c98b20-firemanvideo_compressedwebm.webm"
          type="video/webm"
        />
        <source
          src="https://d11w7iudg4apkd.cloudfront.net/1776159527076-7e9f2447-firemanvideo_compressedmp4.mp4"
          type="video/mp4"
        />
      </video>

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/60 z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 lg:py-24">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-600/20 border border-red-500/40 text-red-400 text-xs font-bold uppercase tracking-widest mb-6">
            <Award className="w-3.5 h-3.5 text-red-500" />
            <span>
              {h.badge ||
                (isAr
                  ? 'المورد الموثوق لمعدات السلامة من الحرائق في قطر'
                  : "Qatar's Trusted Fire Safety Dealer")}
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold text-white leading-tight tracking-tight mb-6">
            {h.title || (isAr ? 'حماية الأرواح والممتلكات' : 'Protecting Lives & Property')}
          </h1>

          {/* Description */}
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-8 max-w-xl font-medium">
            {h.description ||
              (isAr
                ? 'شركة هاملتون للتجارة والمقاولات هي شركة معتمدة من الفئة الأولى لدى الإدارة العامة للدفاع المدني في قطر لأنظمة إنذار ومكافحة الحرائق وحلول MEP في الدوحة.'
                : "Hamilton Trading & Contracting is Qatar's A-GRADE Civil Defence Approved Fire Alarm and Fire Protection System, MEP Company in Doha Qatar.")}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 items-center">
            <Link
              href={`/${locale}/services`}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-lg hover:shadow-red-600/30 transition-all text-sm group"
            >
              <span>{isAr ? 'خدماتنا' : 'Our Services'}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-2 px-6 py-3.5 border-2 border-white/80 hover:border-white text-white hover:bg-white hover:text-gray-900 font-bold rounded-lg transition-all text-sm backdrop-blur-sm"
            >
              <span>{isAr ? 'طلب تسعيرة' : 'Get a Quote'}</span>
            </Link>
          </div>

          {/* Highlights Counter Row */}
          <div className="mt-12 pt-8 border-t border-white/15 flex flex-wrap gap-8 sm:gap-12">
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold text-white">12+</p>
              <p className="text-xs sm:text-sm text-gray-400 mt-1 font-medium">
                {isAr ? 'سنوات من الخبرة' : 'Years Experience'}
              </p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold text-white">100+</p>
              <p className="text-xs sm:text-sm text-gray-400 mt-1 font-medium">
                {isAr ? 'منتج معتمد' : 'Certified Products'}
              </p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold text-white">1000+</p>
              <p className="text-xs sm:text-sm text-gray-400 mt-1 font-medium">
                {isAr ? 'عميل تم خدمتهم' : 'Clients Served'}
              </p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold text-red-500">A-Grade</p>
              <p className="text-xs sm:text-sm text-gray-400 mt-1 font-medium">
                {isAr ? 'اعتماد الدفاع المدني' : 'QCDD Approved'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
