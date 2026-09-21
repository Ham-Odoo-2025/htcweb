'use client';

import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';

interface FloatingContactProps {
  locale: string;
}

export default function FloatingContact({ locale }: FloatingContactProps) {
  const isAr = locale === 'ar';

  return (
    <div className="fixed bottom-6 ltr:left-6 rtl:right-6 z-40 flex flex-col gap-3">
      {/* WhatsApp Button */}
      <a
        href="https://wa.me/97455176118?text=Hello%20Hamilton%20Fire,%20I%20would%20like%20to%20inquire%20about%20your%20fire%20protection%20services"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="group relative flex items-center justify-center size-13 md:size-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
      >
        <MessageCircle className="w-7 h-7 fill-current" />
        <span className="sr-only">WhatsApp</span>
        <span className="absolute ltr:left-full rtl:right-full ml-3 mr-3 whitespace-nowrap bg-gray-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity">
          {isAr ? 'محادثة واتساب سريعة' : 'Chat on WhatsApp'}
        </span>
      </a>

      {/* Direct Phone Call Button */}
      <a
        href="tel:+97444882355"
        aria-label="Direct Phone Call"
        className="group relative flex items-center justify-center size-13 md:size-14 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
      >
        <Phone className="w-6 h-6 fill-current" />
        <span className="sr-only">Call Us</span>
        <span className="absolute ltr:left-full rtl:right-full ml-3 mr-3 whitespace-nowrap bg-gray-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity">
          {isAr ? 'اتصل الآن: +974 4488 2355' : 'Call Now: +974 4488 2355'}
        </span>
      </a>
    </div>
  );
}
