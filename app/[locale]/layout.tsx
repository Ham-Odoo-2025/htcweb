import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingContact from '@/components/FloatingContact';
import JsonLd, { getOrganizationSchema } from '@/components/JsonLd';
import { getMessages } from '@/lib/data';

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ar' }];
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale = params.locale === 'ar' ? 'ar' : 'en';
  const messages = getMessages(locale);

  return (
    <div
      lang={locale}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      className="min-h-screen flex flex-col antialiased selection:bg-red-500 selection:text-white"
    >
      <JsonLd data={getOrganizationSchema()} />
      <Header locale={locale} messages={messages} />
      <main className="flex-1">{children}</main>
      <Footer locale={locale} messages={messages} />
      <FloatingContact locale={locale} />
    </div>
  );
}
