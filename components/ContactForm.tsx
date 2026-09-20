'use client';

import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, AlertCircle } from 'lucide-react';

interface ContactFormProps {
  locale: string;
  messages: any;
}

export default function ContactForm({ locale, messages }: ContactFormProps) {
  const isAr = locale === 'ar';
  const c = messages?.contact || {};

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', service: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Contact Info & Map */}
        <div className="space-y-8">
          <div>
            <span className="text-red-600 text-xs sm:text-sm font-extrabold tracking-widest uppercase">
              {c.badge || (isAr ? 'اتصل بنا' : 'Get In Touch')}
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
              {c.heading || (isAr ? 'تواصل مع خبراء الإطفاء والسلامة' : 'Contact Our Fire Safety Experts')}
            </h2>
            <p className="mt-4 text-gray-600 text-sm leading-relaxed">
              {c.description ||
                (isAr
                  ? 'سواء كنت بحاجة إلى دراسة مشروع جديد، تركيب أنظمة إنذار وإطفاء معتمدة، أو عقد صيانة سنوي (AMC)، يسعد فريقنا الهندسي بتقديم المساعدة الفورية.'
                  : 'Whether you require QCDD civil defence approval, new system installation, AMC maintenance, or certified fire protection supply, our Doha team is ready to assist.')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Phone */}
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 flex items-start gap-4">
              <div className="size-11 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  {isAr ? 'الهاتف' : 'Phone'}
                </p>
                <a href="tel:+97444882355" className="block text-sm font-bold text-gray-900 hover:text-red-600 mt-1">
                  +974 4488 2355
                </a>
                <a href="tel:+97455176118" className="block text-xs font-semibold text-gray-600 hover:text-red-600 mt-0.5">
                  +974 5517 6118
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 flex items-start gap-4">
              <div className="size-11 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  {isAr ? 'البريد الإلكتروني' : 'Email'}
                </p>
                <a href="mailto:mail@htcqatar.net" className="block text-sm font-bold text-gray-900 hover:text-red-600 mt-1">
                  mail@htcqatar.net
                </a>
                <a href="mailto:admin@htcqatar.net" className="block text-xs font-semibold text-gray-600 hover:text-red-600 mt-0.5">
                  admin@htcqatar.net
                </a>
              </div>
            </div>

            {/* Address */}
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 flex items-start gap-4">
              <div className="size-11 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  {isAr ? 'الموقع' : 'Location'}
                </p>
                <p className="text-sm font-bold text-gray-900 mt-1">
                  {isAr ? 'بركة العوامر / المنطقة الصناعية' : 'Birkat Al Awamer'}
                </p>
                <p className="text-xs text-gray-600 mt-0.5">
                  {isAr ? 'الدوحة، دولة قطر' : 'Doha, State of Qatar'}
                </p>
              </div>
            </div>

            {/* Working Hours */}
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 flex items-start gap-4">
              <div className="size-11 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  {isAr ? 'ساعات العمل' : 'Working Hours'}
                </p>
                <p className="text-sm font-bold text-gray-900 mt-1">
                  {isAr ? 'السبت - الخميس' : 'Sat - Thu'}
                </p>
                <p className="text-xs text-gray-600 mt-0.5">
                  07:30 AM – 05:30 PM
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Google Maps Embed */}
          <div className="rounded-2xl overflow-hidden shadow-md border border-gray-200 h-64 sm:h-72 w-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115456.63412586676!2d51.41165215682855!3d25.269926839353995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e45c534ffdce87f%3A0x44d9319f78cfd4b1!2sDoha%2C%20Qatar!5e0!3m2!1sen!2sqa!4v1711200000000!5m2!1sen!2sqa"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Hamilton Trading & Contracting Location in Doha, Qatar"
            ></iframe>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white border border-gray-200 rounded-3xl p-8 sm:p-10 shadow-lg">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            {isAr ? 'أرسل لنا رسالة أو استفسار' : 'Request a Quote / Send an Inquiry'}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                {isAr ? 'الاسم بالكامل *' : 'Full Name *'}
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder={isAr ? 'مثال: محمد أحمد' : 'e.g. John Doe'}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  {isAr ? 'رقم الهاتف / الواتساب *' : 'Phone / WhatsApp *'}
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+974 ..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  {isAr ? 'البريد الإلكتروني' : 'Email Address'}
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@company.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                {isAr ? 'الخدمة المطلوبة' : 'Interested Service'}
              </label>
              <select
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
              >
                <option value="">{isAr ? '-- اختر الخدمة --' : '-- Select a Service --'}</option>
                <option value="Fire Alarm & Detection">Fire Alarm & Detection Systems</option>
                <option value="Fire Fighting Suppression">Fire Fighting & Suppression Systems</option>
                <option value="Annual Maintenance Contract">Annual Maintenance Contract (AMC)</option>
                <option value="Fire Pump Systems">UL Listed Fire Pumps</option>
                <option value="Kitchen Hood System">Kitchen Hood Safety System</option>
                <option value="Fire Doors">Fire Rated Steel Doors</option>
                <option value="Products Purchase">Fire Extinguishers & Products Purchase</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                {isAr ? 'تفاصيل الرسالة أو المشروع *' : 'Project Details / Message *'}
              </label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder={isAr ? 'اكتب تفاصيل استفسارك هنا...' : 'Describe your project requirements, location, building type...'}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              ></textarea>
            </div>

            {status === 'success' && (
              <div className="p-4 bg-emerald-50 text-emerald-800 rounded-xl flex items-center gap-2 text-xs font-bold">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>
                  {isAr
                    ? 'شكراً لتواصلك معنا! تم استلام طلبك وسيتصل بك أحد مهندسينا قريباً.'
                    : 'Thank you! Your inquiry has been sent successfully. Our engineering team will contact you shortly.'}
                </span>
              </div>
            )}

            {status === 'error' && (
              <div className="p-4 bg-red-50 text-red-800 rounded-xl flex items-center gap-2 text-xs font-bold">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                <span>
                  {isAr
                    ? 'حدث خطأ في الإرسال. يمكنك أيضاً مراسلتنا مباشرة عبر الواتساب على +974 5517 6118.'
                    : 'Failed to send message. Please feel free to WhatsApp us directly at +974 5517 6118.'}
                </span>
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-3.5 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold rounded-xl shadow-lg transition flex items-center justify-center gap-2 text-sm"
            >
              <Send className="w-4 h-4 rtl:rotate-180" />
              <span>{status === 'loading' ? (isAr ? 'جاري الإرسال...' : 'Sending...') : (isAr ? 'إرسال الطلب الآن' : 'Submit Inquiry Now')}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
