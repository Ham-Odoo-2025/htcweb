import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, ShieldCheck, ExternalLink } from 'lucide-react';

interface FooterProps {
  locale: string;
  messages: any;
}

export default function Footer({ locale, messages }: FooterProps) {
  const isAr = locale === 'ar';
  const f = messages?.footer || {};

  const services = [
    { name: isAr ? 'أنظمة إنذار وكشف الحريق' : 'Fire Alarm & Detection Systems', href: `/${locale}/services/fire-alarm-detection-systems` },
    { name: isAr ? 'صيانة نظام إنذار الحريق' : 'Fire Alarm Maintenance', href: `/${locale}/services/fire-alarm-maintenance` },
    { name: isAr ? 'أنظمة مكافحة وإخماد الحرائق' : 'Fire Fighting Suppression Systems', href: `/${locale}/services/fire-fighting-suppression-systems` },
    { name: isAr ? 'أبواب مقاومة للحريق' : 'Fire Rated Doors', href: `/${locale}/services/passive-fire-protection-services` },
    { name: isAr ? 'نظام أمان شفاطات المطابخ' : 'Kitchen Hood Fire Safety', href: `/${locale}/services/kitchen-hood-safety-system` },
    { name: isAr ? 'مضخات الحريق المعتمدة UL' : 'UL Listed Fire Pumps', href: `/${locale}/services/fire-pump` },
    { name: isAr ? 'عقود الصيانة السنوية (AMC)' : 'Annual Maintenance Contract', href: `/${locale}/annual-maintenance-contract` },
  ];

  const quickLinks = [
    { name: f.aboutUs || (isAr ? 'من نحن' : 'About Us'), href: `/${locale}/about` },
    { name: f.ourServices || (isAr ? 'خدماتنا' : 'Our Services'), href: `/${locale}/services` },
    { name: f.ourProducts || (isAr ? 'منتجاتنا' : 'Our Products'), href: `/${locale}/allproducts` },
    { name: f.brands || (isAr ? 'العلامات التجارية' : 'Brands'), href: `/${locale}/brands` },
    { name: f.news || (isAr ? 'الأخبار' : 'News'), href: `/${locale}/news` },
    { name: f.blogs || (isAr ? 'المدونة' : 'Blog'), href: `/${locale}/blog` },
    { name: f.contact || (isAr ? 'اتصل بنا' : 'Contact Us'), href: `/${locale}/contact` },
  ];

  return (
    <footer className="bg-gray-950 text-gray-400 border-t border-gray-900 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-gray-900">
          {/* Brand & About */}
          <div className="lg:col-span-2 space-y-4">
            <Link href={`/${locale}`} className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden bg-white p-0.5">
                <Image
                  src="/h-logo.jpg"
                  alt="Hamilton Trading & Contracting W.L.L"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-white font-extrabold text-lg leading-tight tracking-tight">
                  HAMILTON
                </p>
                <p className="text-red-500 text-xs font-semibold uppercase tracking-wider">
                  Trading & Contracting W.L.L
                </p>
              </div>
            </Link>

            <p className="text-sm leading-relaxed text-gray-400 max-w-sm">
              {f.tagline ||
                (isAr
                  ? 'المورد الرائد في قطر لمعدات السلامة من الحرائق وحلول مكافحة الحرائق المعتمدة من الدفاع المدني في الدوحة وجميع أنحاء قطر.'
                  : "Qatar's leading Civil Defence A-GRADE approved fire alarm and fire fighting company offering turnkey fire protection systems, MEP solutions & AMC maintenance.")}
            </p>

            <div className="flex items-center gap-2 pt-1 text-xs text-white/90">
              <ShieldCheck className="w-4 h-4 text-red-500 shrink-0" />
              <span>
                {isAr
                  ? 'معتمد من الإدارة العامة للدفاع المدني - الفئة الأولى'
                  : 'QCDD Qatar Civil Defence Approved A-Grade Contractor'}
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4">
              {f.quickLinksHeading || (isAr ? 'روابط سريعة' : 'Quick Links')}
            </h4>
            <ul className="space-y-2.5 text-xs">
              {quickLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-red-400 transition-colors inline-block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4">
              {f.servicesHeading || (isAr ? 'الخدمات' : 'Our Services')}
            </h4>
            <ul className="space-y-2.5 text-xs">
              {services.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-red-400 transition-colors inline-block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4">
              {isAr ? 'تواصل معنا' : 'Contact Us'}
            </h4>

            <div className="flex items-start gap-2.5 text-xs">
              <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <span>
                {isAr
                  ? 'بركة العوامر / المنطقة الصناعية، الدوحة، قطر'
                  : 'Birkat Al Awamer / Industrial Area, Doha, Qatar'}
              </span>
            </div>

            <div className="flex items-center gap-2.5 text-xs">
              <Phone className="w-4 h-4 text-red-500 shrink-0" />
              <div className="flex flex-col">
                <a href="tel:+97444882355" className="hover:text-white transition-colors">
                  +974 4488 2355
                </a>
                <a href="tel:+97455176118" className="hover:text-white transition-colors">
                  +974 5517 6118
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2.5 text-xs">
              <Mail className="w-4 h-4 text-red-500 shrink-0" />
              <div className="flex flex-col">
                <a href="mailto:mail@htcqatar.net" className="hover:text-white transition-colors">
                  mail@htcqatar.net
                </a>
                <a href="mailto:admin@htcqatar.net" className="hover:text-white transition-colors">
                  admin@htcqatar.net
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>
            © {new Date().getFullYear()} Hamilton Trading & Contracting W.L.L.{' '}
            {isAr ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
          </p>
          <div className="flex items-center gap-4">
            <Link href={`/${locale}/privacy`} className="hover:text-gray-300">
              {isAr ? 'سياسة الخصوصية' : 'Privacy Policy'}
            </Link>
            <span>•</span>
            <Link href={`/${locale}/terms`} className="hover:text-gray-300">
              {isAr ? 'الشروط والأحكام' : 'Terms & Conditions'}
            </Link>
            <span>•</span>
            <Link href={`/${locale}/sitemap.xml`} className="hover:text-gray-300">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
