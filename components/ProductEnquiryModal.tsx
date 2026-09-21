'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import {
  X,
  Plus,
  Minus,
  Trash2,
  Search,
  CheckCircle2,
  MessageCircle,
  Package,
  Building2,
  User,
  Phone,
  Mail,
  FileText,
  ArrowRight,
  ShieldCheck,
  Send,
  Loader2,
  ShoppingBag,
} from 'lucide-react';
import { Product } from '@/lib/data';

export interface QuoteItem {
  product: Product;
  quantity: number;
}

interface ProductEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedItems: QuoteItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onAddProduct: (product: Product) => void;
  allProducts: Product[];
  locale: string;
}

export default function ProductEnquiryModal({
  isOpen,
  onClose,
  selectedItems,
  onUpdateQuantity,
  onRemoveItem,
  onAddProduct,
  allProducts,
  locale,
}: ProductEnquiryModalProps) {
  const isAr = locale === 'ar';

  const [wantsMoreItems, setWantsMoreItems] = useState<boolean>(false);
  const [productSearch, setProductSearch] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    notes: '',
  });

  const [loading, setLoading] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [whatsappUrl, setWhatsappUrl] = useState<string>('');

  // Reset search when modal opens or toggles
  useEffect(() => {
    if (!isOpen) {
      setWantsMoreItems(false);
      setProductSearch('');
      setSubmittedRef(null);
    }
  }, [isOpen]);

  // Search filtered products (excluding already selected items)
  const searchResults = useMemo(() => {
    if (!productSearch.trim()) return [];
    const q = productSearch.toLowerCase().trim();
    const selectedIds = new Set(selectedItems.map((i) => i.product._id));

    return allProducts
      .filter((p) => !selectedIds.has(p._id))
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      )
      .slice(0, 6);
  }, [allProducts, productSearch, selectedItems]);

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedItems.length === 0) return;

    setLoading(true);

    try {
      const payload = {
        customer: formData,
        items: selectedItems.map((item) => ({
          _id: item.product._id,
          name: item.product.name,
          category: item.product.category,
          price: item.product.price,
          quantity: item.quantity,
          image: item.product.image,
        })),
        locale,
      };

      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        setSubmittedRef(data.refId || 'HTC-RFQ-' + Math.floor(1000 + Math.random() * 9000));
        setWhatsappUrl(data.whatsappUrl || '');
      } else {
        alert(data.error || 'Failed to submit quote inquiry.');
      }
    } catch (err) {
      alert('Network error. Please try again or WhatsApp us directly.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200"
      dir={isAr ? 'rtl' : 'ltr'}
    >
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-gray-950 text-white px-6 py-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="size-10 rounded-xl bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-400">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold leading-tight">
                {isAr ? 'طلب عرض سعر رسمي (RFQ)' : 'Request a Quotation (RFQ)'}
              </h2>
              <p className="text-gray-400 text-xs mt-0.5">
                {isAr
                  ? 'اعتماد الدفاع المدني القطري (QCDD) • رد رسمي سريع'
                  : 'QCDD Approved Fire Systems • Rapid Engineering Response'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="size-9 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white flex items-center justify-center transition"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {submittedRef ? (
            /* Success State */
            <div className="text-center py-8 space-y-5">
              <div className="size-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-600 text-xs font-bold uppercase tracking-wider mb-2">
                  Reference: {submittedRef}
                </span>
                <h3 className="text-2xl font-extrabold text-gray-900">
                  {isAr ? 'تم استلام طلب التسعيرة بنجاح!' : 'Quote Inquiry Received!'}
                </h3>
                <p className="mt-2 text-gray-600 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                  {isAr
                    ? 'تم تسجيل طلبك وتحويله إلى فريق المبيعات الهندسية في هاملتون. سيتواصل معك أحد مهندسينا خلال دقائق.'
                    : 'Your request has been logged and assigned to Hamilton Fire engineering sales team. A formal quotation will be prepared.'}
                </p>
              </div>

              {/* Items Summary */}
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 max-w-md mx-auto text-left rtl:text-right">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                  {isAr ? 'المنتجات المطلوبة:' : 'Requested Products:'}
                </p>
                <div className="space-y-1.5 text-xs text-gray-700">
                  {selectedItems.map((item) => (
                    <div key={item.product._id} className="flex justify-between">
                      <span className="font-semibold line-clamp-1">{item.product.name}</span>
                      <span className="text-red-600 font-bold shrink-0">x {item.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                {whatsappUrl && (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition"
                  >
                    <MessageCircle className="w-4 h-4 shrink-0" />
                    <span>{isAr ? 'فتح المتابعة الفورية عبر واتساب' : 'Open in WhatsApp for Instant Follow-up'}</span>
                  </a>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-3.5 border border-gray-300 text-gray-700 font-bold rounded-xl text-xs sm:text-sm hover:bg-gray-100 transition"
                >
                  {isAr ? 'إغلاق' : 'Close'}
                </button>
              </div>
            </div>
          ) : (
            /* Active Form State */
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 1. Selected Products Section */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs font-extrabold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Package className="w-4 h-4 text-red-600" />
                    <span>
                      {isAr ? 'المنتجات المحددة للتسعير' : 'Selected Products for Quote'} (
                      {selectedItems.length})
                    </span>
                  </label>
                  {selectedItems.length > 0 && (
                    <span className="text-[11px] text-gray-500 font-medium">
                      {isAr ? 'حدد الكمية المطلوبة' : 'Specify quantity needed'}
                    </span>
                  )}
                </div>

                {selectedItems.length === 0 ? (
                  <div className="p-6 text-center bg-gray-50 rounded-2xl border border-gray-200 text-gray-500 text-xs">
                    {isAr ? 'لم تختر أي منتجات بعد.' : 'No products selected.'}
                  </div>
                ) : (
                  <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                    {selectedItems.map((item) => (
                      <div
                        key={item.product._id}
                        className="flex items-center justify-between p-3 rounded-2xl border border-gray-200 bg-gray-50/60 hover:bg-white hover:border-red-300 transition gap-3"
                      >
                        {/* Thumbnail */}
                        <div className="relative size-12 rounded-xl bg-white border border-gray-200 overflow-hidden shrink-0">
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            fill
                            className="object-contain p-1"
                          />
                        </div>

                        {/* Title & Category */}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-gray-900 leading-snug line-clamp-1">
                            {item.product.name}
                          </h4>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[10px] text-gray-500 font-medium line-clamp-1">
                              {item.product.category}
                            </span>
                            <span className="text-[10px] text-red-600 font-bold">
                              {item.product.price > 0
                                ? `${item.product.price.toLocaleString()} QAR`
                                : isAr ? 'عند الطلب' : 'Quote'}
                            </span>
                          </div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-1.5 shrink-0 bg-white border border-gray-200 rounded-lg p-0.5">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.product._id, -1)}
                            className="size-6 rounded flex items-center justify-center text-gray-600 hover:bg-gray-100 transition"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-7 text-center text-xs font-bold text-gray-900">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.product._id, 1)}
                            className="size-6 rounded flex items-center justify-center text-gray-600 hover:bg-gray-100 transition"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Delete Button */}
                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.product._id)}
                          className="size-7 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 flex items-center justify-center transition shrink-0"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 2. The Smart Prompt: "Do you have any other item to enquire?" */}
              <div className="bg-gradient-to-r from-red-50 via-orange-50 to-amber-50 border border-orange-200 rounded-2xl p-4">
                <p className="text-xs font-bold text-gray-900 mb-2.5">
                  {isAr
                    ? 'هل تود إضافة منتجات أو معدات أخرى إلى هذا الطلب؟'
                    : 'Do you need to add any other products or accessories to this quote?'}
                </p>

                <div className="flex flex-wrap gap-2.5">
                  <button
                    type="button"
                    onClick={() => setWantsMoreItems(false)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                      !wantsMoreItems
                        ? 'bg-gray-900 text-white shadow-sm'
                        : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <span>{isAr ? 'لا، إرسال هذا المنتج فقط' : 'No, submit this quote now'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setWantsMoreItems(true)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                      wantsMoreItems
                        ? 'bg-red-600 text-white shadow-sm'
                        : 'bg-white text-red-600 border border-red-200 hover:bg-red-50'
                    }`}
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{isAr ? 'نعم، أريد إضافة منتجات أخرى' : 'Yes, I want to add more items'}</span>
                  </button>
                </div>

                {/* Search & Add Sub-Interface when "Yes" is clicked */}
                {wantsMoreItems && (
                  <div className="mt-4 pt-3 border-t border-orange-200/60 space-y-3">
                    <div className="relative">
                      <Search className="absolute ltr:left-3 rtl:right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder={
                          isAr
                            ? 'ابحث لإضافة طفايات، كواشف دخان، مضخات، محابس...'
                            : 'Type to quickly add: Smoke detector, Extinguisher, Pump, Hose...'
                        }
                        value={productSearch}
                        onChange={(e) => setProductSearch(e.target.value)}
                        className="w-full ltr:pl-9 rtl:pr-9 ltr:pr-3 rtl:pl-3 py-2.5 rounded-xl border border-orange-300 text-xs focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
                      />
                    </div>

                    {/* Search Results Dropdown */}
                    {searchResults.length > 0 && (
                      <div className="bg-white rounded-xl border border-gray-200 shadow-md divide-y divide-gray-100 max-h-48 overflow-y-auto">
                        {searchResults.map((p) => (
                          <div
                            key={p._id}
                            className="p-2.5 flex items-center justify-between hover:bg-red-50/50 transition cursor-pointer"
                            onClick={() => {
                              onAddProduct(p);
                              setProductSearch('');
                            }}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div className="relative size-8 rounded bg-gray-50 border border-gray-100 shrink-0">
                                <Image
                                  src={p.image}
                                  alt={p.name}
                                  fill
                                  className="object-contain p-0.5"
                                />
                              </div>
                              <div className="min-w-0">
                                <p className="text-xs font-bold text-gray-900 line-clamp-1">
                                  {p.name}
                                </p>
                                <span className="text-[10px] text-gray-400">
                                  {p.category}
                                </span>
                              </div>
                            </div>
                            <button
                              type="button"
                              className="px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg text-[11px] font-bold shrink-0"
                            >
                              + Add
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {productSearch && searchResults.length === 0 && (
                      <p className="text-xs text-gray-500 italic">
                        {isAr ? 'لم يتم العثور على منتجات مطابقة.' : 'No matching products found.'}
                      </p>
                    )}

                    {/* Or Continue Browsing Button */}
                    <div className="flex items-center justify-between pt-1 text-xs">
                      <span className="text-gray-500">
                        {isAr ? 'أو تصفح الكتالوج بحرية:' : 'Or browse full catalog:'}
                      </span>
                      <button
                        type="button"
                        onClick={onClose}
                        className="text-red-600 font-bold hover:underline"
                      >
                        {isAr ? 'الاستمرار في تصفح الموقع' : 'Browse website & add later'} &rarr;
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* 3. Customer Contact Info */}
              <div className="space-y-4 pt-2">
                <p className="text-xs font-extrabold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
                  <User className="w-4 h-4 text-red-600" />
                  <span>{isAr ? 'معلومات التواصل لاستلام عرض السعر' : 'Your Contact Details for the Quotation'}</span>
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* Name */}
                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">
                      {isAr ? 'الاسم بالكامل *' : 'Contact Person Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={isAr ? 'مثال: المهندس أحمد' : 'e.g. Eng. Ahmed'}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  {/* Company */}
                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">
                      {isAr ? 'اسم الشركة / المشروع' : 'Company / Project Name'}
                    </label>
                    <input
                      type="text"
                      placeholder={isAr ? 'مثال: شركة المقاولات' : 'e.g. Lusail Contracting W.L.L'}
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">
                      {isAr ? 'رقم الهاتف / الواتساب *' : 'Phone / WhatsApp *'}
                    </label>
                    <div className="relative">
                      <span className="absolute ltr:left-3 rtl:right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">
                        +974
                      </span>
                      <input
                        type="tel"
                        required
                        placeholder="5517 6118"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full ltr:pl-12 rtl:pr-12 ltr:pr-3 rtl:pl-3 py-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">
                      {isAr ? 'البريد الإلكتروني' : 'Email Address'}
                    </label>
                    <input
                      type="email"
                      placeholder="procurement@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>

                {/* Project Location / Notes */}
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">
                    {isAr ? 'موقع المشروع أو ملاحظات إضافية' : 'Project Location / Special Requirements'}
                  </label>
                  <textarea
                    rows={2}
                    placeholder={
                      isAr
                        ? 'مثال: مشروع مستودع في بركة العوامر، بحاجة لاعتماد الدفاع المدني عاجل...'
                        : 'e.g. Warehouse in Birkat Al Awamer, requires urgent QCDD inspection clearance...'
                    }
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading || selectedItems.length === 0}
                  className="w-full py-3.5 px-6 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold rounded-xl shadow-lg transition flex items-center justify-center gap-2 text-sm"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{isAr ? 'جاري تجهيز وتسجيل عرض السعر...' : 'Processing Quotation Request...'}</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 rtl:rotate-180" />
                      <span>
                        {isAr
                          ? `إرسال طلب التسعيرة الرسمي (${selectedItems.length} منتج)`
                          : `Submit Formal RFQ (${selectedItems.length} items)`}
                      </span>
                    </>
                  )}
                </button>
                <div className="mt-2.5 flex items-center justify-center gap-1.5 text-[11px] text-gray-500">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>
                    {isAr
                      ? 'مباشرة إلى نظام المبيعات والهندسة في قطر • استجابة سريعة'
                      : 'Logged directly to Hamilton Fire Sales Engineering • Instant WhatsApp copy'}
                  </span>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
