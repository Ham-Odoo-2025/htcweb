import React from 'react';
import type { Metadata } from 'next';
import ProductsCatalog from '@/components/ProductsCatalog';
import { getMessages } from '@/lib/data';
import { getAllProducts, getAllCategories } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface Props {
  params: { locale: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const isAr = params.locale === 'ar';
  return {
    title: isAr
      ? 'منتجات ومعدات مكافحة الحرائق في قطر | طفايات وإنذار ومضخات'
      : 'All Fire Safety Products in Qatar | Fire Extinguishers, Alarms & Pumps',
    description: isAr
      ? 'تصفح أكثر من 100+ منتج معتمد من الدفاع المدني: طفايات حريق، كواشف دخان وحرارة، مضخات حريق، خزائن خراطيم، وأنظمة حماية المطابخ.'
      : 'Browse 100+ Qatar Civil Defence approved fire protection products: fire extinguishers, smoke detectors, fire pumps, cabinets, and spare parts in Doha.',
    alternates: {
      canonical: `https://htc-fire.com/${params.locale}/allproducts`,
      languages: {
        en: 'https://htc-fire.com/en/allproducts',
        ar: 'https://htc-fire.com/ar/allproducts',
      },
    },
  };
}

export default async function AllProductsPage({ params }: Props) {
  const locale = params.locale === 'ar' ? 'ar' : 'en';
  const messages = getMessages(locale);
  const products = await getAllProducts();
  const categories = await getAllCategories();

  return (
    <div className="pt-24 lg:pt-28">
      <ProductsCatalog
        products={products}
        categories={categories}
        locale={locale}
        messages={messages}
      />
    </div>
  );
}
