import React from 'react';
import { Star, Quote } from 'lucide-react';

interface TestimonialsSectionProps {
  locale: string;
  messages: any;
}

export default function TestimonialsSection({
  locale,
  messages,
}: TestimonialsSectionProps) {
  const isAr = locale === 'ar';
  const t = messages?.testimonials || {};

  const reviews = [
    {
      name: t.t1Name || (isAr ? 'أحمد المنصوري' : 'Ahmed Al-Mansouri'),
      role: t.t1Role || (isAr ? 'مدير المرافق، لوسيل العقارية' : 'Facilities Manager, Lusail Real Estate'),
      review:
        t.t1Review ||
        (isAr
          ? 'كانت هاملتون موردنا المفضل لمعدات السلامة من الحرائق لأكثر من 5 سنوات. جودة منتجاتهم وخدمة ما بعد البيع استثنائية.'
          : 'HTC has been our go-to supplier for fire safety equipment for over 5 years. Their products are top quality, and their after-sales service is exceptional. Highly recommended.'),
      rating: 5,
    },
    {
      name: t.t2Name || (isAr ? 'محمد حسن' : 'Mohammed Hassan'),
      role: t.t2Role || (isAr ? 'مدير الصحة والسلامة والبيئة' : 'HSE Manager, Qatar Infrastructure'),
      review:
        t.t2Review ||
        (isAr
          ? 'اعتمدنا على هاملتون للتجارة في جميع احتياجاتنا من معدات الوقاية وإخماد الحرائق. الفريق على دراية واسعة ويضمن تلبية متطلبات الدفاع المدني بدقة.'
          : "We've relied on Hamilton Trading for all our PPE and fire suppression needs. The team is knowledgeable and always ensures we get the right product for the job. Outstanding service."),
      rating: 5,
    },
    {
      name: t.t3Name || (isAr ? 'راجيش كومار' : 'Rajesh Kumar'),
      role: t.t3Role || (isAr ? 'مسؤول سلامة الموقع' : 'Site Safety Officer, Al Jaber Engineering'),
      review:
        t.t3Review ||
        (isAr
          ? 'توصيل سريع، أسعار تنافسية، ومنتجات أصلية معتمدة. ساعدتنا شركة هاملتون في الحفاظ على الامتثال الكامل لمتطلبات الدفاع المدني القطري.'
          : 'Fast delivery, competitive prices, and genuine certified products. HTC has helped us maintain full compliance with Qatar Civil Defence requirements across all our sites.'),
      rating: 5,
    },
  ];

  return (
    <section className="py-20 bg-white" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-red-600 text-xs sm:text-sm font-extrabold tracking-widest uppercase">
            {t.badge || (isAr ? 'ماذا يقول عملاؤنا' : 'What Our Clients Say')}
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-gray-900">
            {t.heading || (isAr ? 'آراء' : 'Client')}{' '}
            <span className="text-red-600">
              {t.headingAccent || (isAr ? 'العملاء وتقييماتهم' : 'Testimonials')}
            </span>
          </h2>
          <p className="mt-4 text-gray-600 text-sm sm:text-base leading-relaxed">
            {t.description ||
              (isAr
                ? 'موثوق به من مئات الشركات في قطر. إليك ما يقوله بعض عملائنا عن تجربتهم معنا.'
                : "Trusted by hundreds of businesses across Qatar. Here's what some of our clients have to say about working with us.")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-gray-50 border border-gray-100 rounded-3xl p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow relative"
            >
              <div>
                <Quote className="w-8 h-8 text-red-300 mb-4" />
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-amber-400 fill-amber-400"
                    />
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed italic">
                  &ldquo;{rev.review}&rdquo;
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-gray-200">
                <p className="text-sm font-bold text-gray-900">{rev.name}</p>
                <p className="text-xs text-gray-500 mt-0.5">{rev.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
