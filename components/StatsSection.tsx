'use client';

import React from 'react';
import { Calendar, Users, PackageCheck, ShieldCheck } from 'lucide-react';

interface StatsSectionProps {
  locale: string;
  messages: any;
}

export default function StatsSection({ locale, messages }: StatsSectionProps) {
  const isAr = locale === 'ar';
  const st = messages?.stats || {};

  const stats = [
    {
      icon: Calendar,
      number: '12+',
      label: st.years || (isAr ? 'سنوات من الخبرة' : 'Years of Experience'),
    },
    {
      icon: Users,
      number: '1,000+',
      label: st.clients || (isAr ? 'عملاء راضون في قطر' : 'Satisfied Clients'),
    },
    {
      icon: PackageCheck,
      number: '100+',
      label: st.products || (isAr ? 'منتجات أمان معتمدة' : 'Products Available'),
    },
    {
      icon: ShieldCheck,
      number: '100%',
      label: st.certified || (isAr ? 'معتمد من الدفاع المدني (QCDD)' : 'Qatar Certified (QCDD)'),
    },
  ];

  return (
    <section className="bg-red-600 py-12 sm:py-14 text-white relative overflow-hidden" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="text-center flex flex-col items-center">
                <div className="size-12 rounded-xl bg-white/10 flex items-center justify-center mb-3">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                  {stat.number}
                </p>
                <p className="mt-1 text-xs sm:text-sm font-medium text-red-100">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
