'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Phone, Mail, Menu, X, ChevronDown, Globe } from 'lucide-react';

interface HeaderProps {
  locale: string;
  messages: any;
}

export default function Header({ locale, messages }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();

  const isAr = locale === 'ar';
  const targetLocale = isAr ? 'en' : 'ar';
  
  // Replace current locale in path
  const switchLocalePath = pathname 
    ? pathname.replace(new RegExp(`^/${locale}`), `/${targetLocale}`) || `/${targetLocale}`
    : `/${targetLocale}`;

  const nav = messages?.nav || {};

  const servicesList = [
    { name: isAr ? 'أنظمة إنذار وكشف الحريق' : 'Fire Alarm & Detection Systems', href: `/${locale}/services/fire-alarm-detection-systems` },
    { name: isAr ? 'صيانة نظام إنذار الحريق' : 'Fire Alarm System Maintenance', href: `/${locale}/services/fire-alarm-maintenance` },
    { name: isAr ? 'أنظمة مكافحة وإخماد الحرائق' : 'Fire Fighting Suppression Systems', href: `/${locale}/services/fire-fighting-suppression-systems` },
    { name: isAr ? 'أبواب مقاومة للحريق' : 'Fire Rated Doors', href: `/${locale}/services/passive-fire-protection-services` },
    { name: isAr ? 'نظام أمان شفاطات المطابخ' : 'Kitchen Hood Fire Safety', href: `/${locale}/services/kitchen-hood-safety-system` },
    { name: isAr ? 'توريد طفايات الحريق' : 'Fire Extinguishers Supplier', href: `/${locale}/services/fire-extinguisher-supplier` },
    { name: isAr ? 'ستائر الدخان والحرائق' : 'Fire & Smoke Curtains', href: `/${locale}/services/fire-smoke-curtains` },
    { name: isAr ? 'نظام إخماد الحريق FM200' : 'FM-200 Fire Suppression System', href: `/${locale}/services/fm-200-fire-suppression-system` },
    { name: isAr ? 'مضخات الحريق المعتمدة' : 'UL Listed Fire Pumps', href: `/${locale}/services/fire-pump` },
    { name: isAr ? 'عقود الصيانة السنوية (AMC)' : 'Annual Maintenance Contract (AMC)', href: `/${locale}/annual-maintenance-contract` },
  ];

  const navLinks = [
    { label: nav.home || (isAr ? 'الرئيسية' : 'Home'), href: `/${locale}` },
    { label: nav.about || (isAr ? 'من نحن' : 'About'), href: `/${locale}/about` },
    { label: nav.services || (isAr ? 'خدماتنا' : 'Services'), href: `/${locale}/services`, isDropdown: true },
    { label: nav.products || (isAr ? 'المنتجات' : 'All Products'), href: `/${locale}/allproducts` },
    { label: nav.brands || (isAr ? 'العلامات التجارية' : 'Brands'), href: `/${locale}/brands` },
    { label: nav.news || (isAr ? 'الأخبار' : 'News'), href: `/${locale}/news` },
    { label: nav.blog || (isAr ? 'المدونة' : 'Blog'), href: `/${locale}/blog` },
    { label: nav.contact || (isAr ? 'اتصل بنا' : 'Contact'), href: `/${locale}/contact` },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      {/* Top Utility Bar */}
      <div className="bg-gray-950 text-white px-4 sm:px-6 lg:px-8 py-1.5 transition-all">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.facebook.com/www.htcqatar.net"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="text-white/80 hover:text-white transition-colors"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a
              href="https://x.com/hamiltonqatar"
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter / X"
              className="text-white/80 hover:text-white transition-colors"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/hamiltonfirefighting"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="text-white/80 hover:text-white transition-colors"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/company/hamilton-trading-contracting-wll"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="text-white/80 hover:text-white transition-colors"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </div>

          {/* Contact Numbers & Emails */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-1.5">
              <Phone className="w-3 h-3 text-red-400" />
              <a href="tel:+97444882355" className="hover:text-red-300 transition-colors">
                +974 4488 2355
              </a>
              <span className="text-gray-500">|</span>
              <a href="tel:+97455176118" className="hover:text-red-300 transition-colors">
                +974 5517 6118
              </a>
            </div>
            <div className="hidden md:flex items-center gap-1.5">
              <Mail className="w-3 h-3 text-red-400" />
              <a href="mailto:mail@htcqatar.net" className="hover:text-red-300 transition-colors">
                mail@htcqatar.net
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-3 shrink-0">
            <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden border border-red-100 shadow-sm">
              <Image
                src="/h-logo.jpg"
                alt="Hamilton Trading & Contracting W.L.L"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div>
              <p className="text-red-600 font-extrabold text-lg md:text-xl tracking-tight leading-none">
                HAMILTON
              </p>
              <p className="text-gray-700 text-[10px] md:text-xs font-semibold tracking-wider uppercase leading-tight mt-0.5">
                Trading & Contracting W.L.L
              </p>
              <span className="inline-block text-[9px] bg-red-50 text-red-600 font-bold px-1.5 py-0.2 rounded border border-red-200">
                QCDD A-GRADE APPROVED
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => {
              if (link.isDropdown) {
                return (
                  <div key={link.href} className="relative group">
                    <Link
                      href={link.href}
                      className="flex items-center gap-1 text-sm font-semibold text-gray-700 hover:text-red-600 transition-colors py-2"
                    >
                      {link.label}
                      <ChevronDown className="w-3.5 h-3.5 text-gray-400 group-hover:text-red-600 transition-transform group-hover:rotate-180" />
                    </Link>

                    {/* Services Mega Dropdown */}
                    <div className="absolute top-full ltr:left-0 rtl:right-0 w-72 bg-white rounded-xl shadow-xl border border-gray-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      {servicesList.map((svc) => (
                        <Link
                          key={svc.href}
                          href={svc.href}
                          className="block px-4 py-2.5 text-xs font-medium text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                        >
                          {svc.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }

              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-semibold transition-colors ${
                    isActive ? 'text-red-600' : 'text-gray-700 hover:text-red-600'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Header Actions */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <Link
              href={switchLocalePath}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 text-xs font-bold text-gray-700 hover:border-red-500 hover:text-red-600 transition-colors"
              aria-label={`Switch to ${isAr ? 'English' : 'Arabic'}`}
            >
              <Globe className="w-3.5 h-3.5 text-red-600" />
              <span className={isAr ? 'font-sans' : 'font-cairo'}>
                {isAr ? 'English' : 'عربي'}
              </span>
            </Link>

            {/* CTA Button */}
            <Link
              href={`/${locale}/contact`}
              className="hidden sm:inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs md:text-sm font-bold rounded-lg shadow-sm hover:shadow transition-all"
            >
              {isAr ? 'طلب تسعيرة' : 'Get a Quote'}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-2 shadow-lg">
          {navLinks.map((link) => {
            if (link.isDropdown) {
              return (
                <div key={link.href} className="border-b border-gray-50 pb-2">
                  <div className="flex items-center justify-between py-2">
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-sm font-semibold text-gray-800 hover:text-red-600"
                    >
                      {link.label}
                    </Link>
                    <button
                      type="button"
                      onClick={() => setServicesOpen(!servicesOpen)}
                      className="p-1 text-gray-500 hover:text-red-600"
                    >
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          servicesOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  </div>
                  {servicesOpen && (
                    <div className="ltr:pl-4 rtl:pr-4 space-y-1.5 pt-1">
                      {servicesList.map((svc) => (
                        <Link
                          key={svc.href}
                          href={svc.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block text-xs text-gray-600 hover:text-red-600 py-1"
                        >
                          {svc.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-sm font-semibold text-gray-800 hover:text-red-600 border-b border-gray-50"
              >
                {link.label}
              </Link>
            );
          })}

          <div className="pt-2">
            <Link
              href={`/${locale}/contact`}
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center py-2.5 bg-red-600 text-white font-bold rounded-lg text-sm shadow"
            >
              {isAr ? 'طلب تسعيرة' : 'Get a Quote'}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
