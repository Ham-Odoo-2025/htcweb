'use client';

import React, { useState, useMemo, useRef } from 'react';
import Image from 'next/image';
import { Search, MessageCircle, ChevronLeft, ChevronRight, Tag, FileText, ArrowRight } from 'lucide-react';
import { Product, Category } from '@/lib/data';
import ProductEnquiryModal, { QuoteItem } from '@/components/ProductEnquiryModal';

interface ProductsCatalogProps {
  products: Product[];
  categories: Category[];
  locale: string;
  messages: any;
}

export default function ProductsCatalog({
  products,
  categories,
  locale,
  messages,
}: ProductsCatalogProps) {
  const isAr = locale === 'ar';
  const ap = messages?.allProducts || {};

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 20;

  // Quote State
  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleEnquireProduct = (product: Product) => {
    setQuoteItems((prev) => {
      const exists = prev.find((item) => item.product._id === product._id);
      if (exists) {
        return prev;
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsModalOpen(true);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setQuoteItems((prev) =>
      prev
        .map((item) => {
          if (item.product._id === productId) {
            const newQty = Math.max(1, item.quantity + delta);
            return { ...item, quantity: newQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (productId: string) => {
    setQuoteItems((prev) => prev.filter((item) => item.product._id !== productId));
  };

  const handleAddProduct = (product: Product) => {
    setQuoteItems((prev) => {
      const exists = prev.find((item) => item.product._id === product._id);
      if (exists) {
        return prev.map((item) =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const categoryScrollRef = useRef<HTMLDivElement>(null);

  const categoryList = useMemo(() => {
    return ['All', ...categories.map((c) => c.name)];
  }, [categories]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory =
        selectedCategory === 'All' ||
        p.category.toLowerCase() === selectedCategory.toLowerCase();

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.description && p.description.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage]);

  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const scrollCategories = (dir: 'left' | 'right') => {
    if (categoryScrollRef.current) {
      const scrollAmount = 250;
      categoryScrollRef.current.scrollBy({
        left: dir === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="bg-white min-h-screen" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Header Banner */}
      <section className="bg-gray-950 py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-red-500 text-xs font-bold tracking-widest uppercase">
            {ap.badge || (isAr ? 'كتالوج المنتجات' : 'Approved Equipment')}
          </span>
          <h1 className="mt-3 text-3xl sm:text-5xl font-extrabold text-white leading-tight">
            {ap.heading || (isAr ? 'جميع' : 'All')}{' '}
            <span className="text-red-500">
              {ap.headingAccent || (isAr ? 'منتجات السلامة ومكافحة الحرائق' : 'Products')}
            </span>
          </h1>
          <p className="mt-4 text-gray-400 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
            {ap.description ||
              (isAr
                ? 'استكشف تشكيلتنا الشاملة من طفايات الحريق، أجهزة الإنذار، الكواشف، المضخات، ومعدات السلامة المعتمدة في قطر.'
                : 'Explore our comprehensive range of certified fire extinguishers, alarm systems, detectors, pumps, and safety accessories in Qatar.')}
          </p>

          {/* Search Input */}
          <div className="mt-8 relative max-w-md mx-auto">
            <Search className="absolute ltr:left-4 rtl:right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder={
                ap.searchPlaceholder ||
                (isAr ? 'ابحث بالاسم أو الفئة أو الموديل...' : 'Search products by name, category...')
              }
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full ltr:pl-11 rtl:pr-11 ltr:pr-4 rtl:pl-4 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-400 text-xs sm:text-sm focus:outline-none focus:border-red-500 focus:bg-white/15 transition"
            />
          </div>
        </div>
      </section>

      {/* Sticky Categories Bar */}
      <div className="sticky top-16 md:top-20 z-30 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center gap-2 py-3">
            <button
              type="button"
              onClick={() => scrollCategories('left')}
              aria-label="Scroll left"
              className="shrink-0 flex items-center justify-center size-8 rounded-full border border-gray-200 bg-white text-gray-600 hover:text-red-600 hover:border-red-400 shadow-sm transition"
            >
              <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
            </button>

            <div
              ref={categoryScrollRef}
              className="flex gap-2 overflow-x-auto no-scrollbar scroll-smooth py-1"
            >
              {categoryList.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => handleCategorySelect(cat)}
                    className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                      isSelected
                        ? 'bg-red-600 text-white border-red-600 shadow-sm'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-red-300 hover:text-red-600'
                    }`}
                  >
                    {cat === 'All' ? (isAr ? 'الكل' : 'All') : cat}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => scrollCategories('right')}
              aria-label="Scroll right"
              className="shrink-0 flex items-center justify-center size-8 rounded-full border border-gray-200 bg-white text-gray-600 hover:text-red-600 hover:border-red-400 shadow-sm transition"
            >
              <ChevronRight className="w-4 h-4 rtl:rotate-180" />
            </button>
          </div>
        </div>
      </div>

      {/* Catalog Grid */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Results Counter */}
        <div className="flex items-center justify-between mb-6 text-xs text-gray-500">
          <p>
            {isAr ? 'عرض' : 'Showing'}{' '}
            <span className="font-bold text-gray-900">{filteredProducts.length}</span>{' '}
            {isAr ? 'منتج' : 'products'}
            {totalPages > 1 && (
              <span>
                {' '}
                · {isAr ? 'صفحة' : 'page'}{' '}
                <span className="font-bold text-gray-900">{currentPage}</span>{' '}
                {isAr ? 'من' : 'of'}{' '}
                <span className="font-bold text-gray-900">{totalPages}</span>
              </span>
            )}
          </p>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <Tag className="w-12 h-12 mx-auto mb-3 opacity-40 text-gray-400" />
            <p className="text-sm font-semibold">
              {isAr ? 'لم يتم العثور على منتجات مطابقة' : 'No products found matching your search'}
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
                setCurrentPage(1);
              }}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg text-xs font-bold hover:bg-red-700"
            >
              {isAr ? 'إعادة ضبط الفلاتر' : 'Reset filters'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {paginatedProducts.map((product) => {
              const whatsappMsg = `Hello Hamilton Fire, I would like to inquire about "${product.name}" (Price: ${product.price > 0 ? product.price + ' QAR' : 'On Request'})`;
              const whatsappUrl = `https://wa.me/97455176118?text=${encodeURIComponent(whatsappMsg)}`;

              return (
                <div
                  key={product._id}
                  className="group bg-white rounded-2xl border border-gray-200 hover:border-red-300 p-3 flex flex-col justify-between shadow-xs hover:shadow-lg transition-all duration-200"
                >
                  <div>
                    {/* Image */}
                    <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-gray-50 mb-3 border border-gray-100">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                        className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Category */}
                    <span className="inline-block text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded uppercase tracking-wider mb-1 line-clamp-1">
                      {product.category}
                    </span>

                    {/* Name */}
                    <h3 className="text-xs font-bold text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2 leading-snug">
                      {product.name}
                    </h3>

                    {/* Price */}
                    <p className="mt-2 text-xs font-extrabold text-gray-900">
                      {product.price > 0 ? `${product.price.toLocaleString()} QAR` : (isAr ? 'السعر عند الطلب' : 'Price on Request')}
                    </p>
                  </div>

                  {/* Product Enquiry Button */}
                  <button
                    type="button"
                    onClick={() => handleEnquireProduct(product)}
                    className="mt-3 w-full flex items-center justify-center gap-1.5 py-2 px-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition shadow-xs hover:shadow"
                  >
                    <FileText className="w-3.5 h-3.5 shrink-0" />
                    <span>{isAr ? 'طلب تسعيرة (RFQ)' : 'Enquire Quote'}</span>
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-2 flex-wrap">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-full border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isAr ? 'السابق' : 'Previous'}
            </button>

            {[...Array(totalPages)].map((_, i) => {
              const pageNum = i + 1;
              // Only display some pages if totalPages is large
              if (
                pageNum === 1 ||
                pageNum === totalPages ||
                (pageNum >= currentPage - 2 && pageNum <= currentPage + 2)
              ) {
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`size-9 rounded-full text-xs font-bold transition ${
                      currentPage === pageNum
                        ? 'bg-red-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              } else if (
                pageNum === currentPage - 3 ||
                pageNum === currentPage + 3
              ) {
                return (
                  <span key={pageNum} className="text-gray-400 text-xs">
                    …
                  </span>
                );
              }
              return null;
            })}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-full border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isAr ? 'التالي' : 'Next'}
            </button>
          </div>
        )}
      </section>

      {/* Floating Quote Review Bar (visible when items selected) */}
      {quoteItems.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-3 px-5 py-3 rounded-full bg-gray-950 text-white border-2 border-red-500 shadow-2xl hover:bg-black hover:scale-105 transition"
          >
            <span className="size-6 rounded-full bg-red-600 text-white text-xs font-extrabold flex items-center justify-center animate-pulse">
              {quoteItems.length}
            </span>
            <span className="text-xs font-bold">
              {isAr ? 'مراجعة وإرسال قائمة التسعير' : 'Review & Submit Quote List'}
            </span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180 text-red-400" />
          </button>
        </div>
      )}

      {/* Product Enquiry Modal */}
      <ProductEnquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedItems={quoteItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onAddProduct={handleAddProduct}
        allProducts={products}
        locale={locale}
      />
    </div>
  );
}
