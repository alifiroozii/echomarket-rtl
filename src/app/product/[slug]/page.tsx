'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import { Product } from '@/lib/db';

export default function ProductDetailPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const slug = params.slug as string;
  const autoInquire = searchParams.get('inquire') === 'true';

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'features' | 'tech' | 'pricing' | 'reviews'>('features');
  
  // Interactive Inquiry Modal state
  const [inquiryModalOpen, setInquiryModalOpen] = useState(autoInquire);
  const [buyerName, setBuyerName] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [buyerCompany, setBuyerCompany] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [message, setMessage] = useState('');
  const [requestedSeats, setRequestedSeats] = useState(50);
  const [submittingInquiry, setSubmittingInquiry] = useState(false);
  const [inquirySuccess, setInquirySuccess] = useState(false);

  useEffect(() => {
    async function loadProduct() {
      try {
        const res = await fetch(`/api/products/${slug}`);
        const data = await res.json();
        if (data.success) {
          setProduct(data.data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [slug]);

  const handleSubmitInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;
    setSubmittingInquiry(true);
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product_id: product.id,
          buyer_name: buyerName,
          buyer_email: buyerEmail,
          buyer_company: buyerCompany,
          buyer_phone: buyerPhone,
          message: message,
          requested_seats: requestedSeats,
          budget_range: 'سازمانی استاندارد',
        }),
      });
      const data = await res.json();
      if (data.success) {
        setInquirySuccess(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmittingInquiry(false);
    }
  };

  if (loading) {
    return (
      <div className="py-32 text-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-sm font-semibold text-on-surface-variant">
          در حال بارگذاری مشخصات فنی از دیتابیس ابری Neon...
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold">محصول یافت نشد</h2>
        <Link href="/explore" className="text-primary font-bold text-sm">
          بازگشت به فهرست محصولات
        </Link>
      </div>
    );
  }

  // Parse features and specs
  const featuresList: string[] = Array.isArray(product.features)
    ? product.features
    : typeof product.features === 'string'
    ? JSON.parse(product.features)
    : [];

  const techSpecsObj: Record<string, string> =
    typeof product.tech_specs === 'string'
      ? JSON.parse(product.tech_specs)
      : product.tech_specs || {};

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-8 space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-on-surface-variant">
        <Link href="/" className="hover:text-primary">
          اکومارکت
        </Link>
        <span>/</span>
        <Link href="/explore" className="hover:text-primary">
          محصولات
        </Link>
        <span>/</span>
        <span className="text-on-surface font-semibold">{product.title_fa}</span>
      </div>

      {/* Hero Header Card */}
      <div className="bg-white rounded-3xl border border-outline-variant/50 p-6 md:p-10 shadow-sm space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start gap-5">
            <img
              src={product.vendor_logo}
              alt={product.vendor_name}
              className="w-20 h-20 rounded-2xl object-cover border border-outline-variant/40 shadow-sm shrink-0"
            />
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-primary-fixed/50 text-on-primary-fixed font-bold text-xs">
                  {product.deployment}
                </span>
                <span className="px-3 py-1 rounded-full bg-secondary-container/40 text-secondary font-bold text-xs">
                  تضمین آپ‌تایم: {product.sla_guarantee}
                </span>
                <span className="px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant text-xs">
                  پشتیبانی از حساب امانی
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-on-surface">
                {product.title_fa}
              </h1>
              <div className="flex items-center gap-2 text-xs text-on-surface-variant">
                <span className="font-semibold text-on-surface">{product.vendor_name}</span>
                {product.vendor_verified && (
                  <span className="inline-flex items-center gap-1 text-secondary font-medium">
                    <span className="material-symbols-outlined text-[16px]">verified</span>
                    توسعه‌دهنده رسمی تاییدشده
                  </span>
                )}
                <span>•</span>
                <span className="flex items-center gap-1 text-amber-600 font-bold">
                  <span className="material-symbols-outlined text-[15px]">star</span>
                  {product.rating} ({product.reviews_count} ارزیابی خریداران)
                </span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 lg:border-r lg:border-outline-variant/30 lg:pr-6">
            <div className="text-left sm:text-right w-full sm:w-auto">
              <span className="text-[11px] text-outline block">هزینه پایه لایسنس:</span>
              <span className="text-lg md:text-xl font-bold text-primary">
                {Number(product.price_toman).toLocaleString('fa-IR')} تومان
              </span>
            </div>
            <button
              onClick={() => {
                setInquirySuccess(false);
                setInquiryModalOpen(true);
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-bold text-xs transition-all shadow-level-1 shadow-primary/20 flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">receipt_long</span>
              <span>درخواست استعلام / پیش‌فاکتور</span>
            </button>
            {product.demo_url && (
              <a
                href={product.demo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-4 py-3 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface font-semibold text-xs transition-colors flex items-center justify-center gap-2 border border-outline-variant/30"
              >
                <span className="material-symbols-outlined text-[18px]">play_circle</span>
                <span>دموی زنده</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-outline-variant/40 text-xs font-bold">
        {[
          { id: 'features', label: 'امکانات و قابلیت‌ها', icon: 'featured_play_list' },
          { id: 'tech', label: 'معماری فنی و امنیت', icon: 'memory' },
          { id: 'pricing', label: 'محاسبه‌گر هزینه و پلن‌ها', icon: 'calculate' },
          { id: 'reviews', label: 'دیدگاه‌ها و رضایت مشتریان', icon: 'reviews' },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={`flex items-center gap-2 py-3 px-4 border-b-2 transition-all ${
              activeTab === t.id
                ? 'border-primary text-primary font-extrabold'
                : 'border-transparent text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">{t.icon}</span>
            <span>{t.label}</span>
          </button>
        ))}
      </div>

      {/* ── Tab Content ── */}
      {activeTab === 'features' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl border border-outline-variant/50 p-6 md:p-8 space-y-4">
              <h3 className="text-base font-bold text-on-surface">درباره این راهکار</h3>
              <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed">
                {product.description}
              </p>

              <h4 className="text-sm font-bold text-on-surface pt-4 border-t border-outline-variant/30">
                شاخص‌ترین قابلیت‌های عملیاتی:
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-on-surface">
                {featuresList.map((feat, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 p-3 rounded-xl bg-surface-container-low/60 border border-outline-variant/20"
                  >
                    <span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">
                      check_circle
                    </span>
                    <span className="leading-relaxed">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Escrow & Verification Sidecard */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-outline-variant/50 p-6 space-y-4 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold text-secondary">
                <span className="material-symbols-outlined text-[20px]">verified_user</span>
                <span>تضمین امنیتی و قانونی اکومارکت</span>
              </div>
              <ul className="space-y-3 text-xs text-on-surface-variant">
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary text-[16px] shrink-0 mt-0.5">
                    lock
                  </span>
                  <span>حساب امانی تا زمان تحویل تست عملکردی توسط خریدار</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary text-[16px] shrink-0 mt-0.5">
                    gavel
                  </span>
                  <span>داوری تخصصی رایگان در صورت بروز عدم انطباق با قرارداد</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary text-[16px] shrink-0 mt-0.5">
                    history_edu
                  </span>
                  <span>صدور فاکتور رسمی معتبر سازمانی با شناسه ملی</span>
                </li>
              </ul>
              <button
                onClick={() => setInquiryModalOpen(true)}
                className="w-full py-2.5 rounded-xl bg-primary-fixed text-on-primary-fixed font-bold text-xs hover:bg-primary-fixed-dim transition-colors"
              >
                ثبت استعلام فوری
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'tech' && (
        <div className="bg-white rounded-3xl border border-outline-variant/50 p-6 md:p-8 space-y-6">
          <h3 className="text-base font-bold text-on-surface">مشخصات فنی و زیرساختی</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(techSpecsObj).map(([key, val]) => (
              <div
                key={key}
                className="p-4 rounded-2xl bg-surface-container-low/70 border border-outline-variant/30 flex flex-col justify-between"
              >
                <span className="text-[11px] font-bold text-outline uppercase">{key}</span>
                <span className="text-xs font-semibold text-on-surface mt-1">{val}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'pricing' && (
        <div className="bg-white rounded-3xl border border-outline-variant/50 p-6 md:p-8 space-y-6">
          <h3 className="text-base font-bold text-on-surface">محاسبه‌گر پیش‌فاکتور تخمینی</h3>
          <div className="p-6 rounded-2xl bg-surface-container-low/70 border border-outline-variant/30 max-w-xl space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span>تعداد کاربران / کارکنان:</span>
                <span className="text-primary font-mono text-sm">{requestedSeats} کاربر</span>
              </div>
              <input
                type="range"
                min="10"
                max="1000"
                step="10"
                value={requestedSeats}
                onChange={(e) => setRequestedSeats(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>

            <div className="pt-4 border-t border-outline-variant/30 flex justify-between items-center text-xs">
              <span className="font-bold text-on-surface">برآورد سالانه با تخفیف سازمانی:</span>
              <span className="font-bold text-base text-primary">
                {(Number(product.price_toman) + requestedSeats * 150000).toLocaleString('fa-IR')}{' '}
                تومان
              </span>
            </div>

            <button
              onClick={() => setInquiryModalOpen(true)}
              className="w-full py-3 rounded-xl bg-primary text-on-primary font-bold text-xs hover:bg-primary-container transition-all"
            >
              درخواست پیش‌فاکتور رسمی برای {requestedSeats} کاربر
            </button>
          </div>
        </div>
      )}

      {activeTab === 'reviews' && (
        <div className="bg-white rounded-3xl border border-outline-variant/50 p-6 md:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-outline-variant/30 pb-4">
            <div>
              <h3 className="text-base font-bold text-on-surface">ارزیابی فنی خریداران</h3>
              <p className="text-xs text-on-surface-variant">
                نظرات مدیران فنی و CTO شرکت‌های دریافت‌کننده لایسنس
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-extrabold text-on-surface">{product.rating}</span>
              <span className="text-xs text-outline">از ۵.۰</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-surface-container-low/50 border border-outline-variant/20 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-on-surface">مهندس فیروزی — فولاد سیرجان گستر</span>
                <span className="text-[11px] text-outline">۲ هفته پیش</span>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                استقرار نرم‌افزار در کارخانه ما با پشتیبانی عالی انجام شد و تطبیق شیفت‌های پیچیده ۴
                نوبته کارگران بدون نقص صورت گرفت.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ── Interactive Inquiry Modal ── */}
      {inquiryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl border border-outline-variant/40 max-w-lg w-full p-6 md:p-8 space-y-5 shadow-level-3 relative text-right">
            <button
              onClick={() => setInquiryModalOpen(false)}
              className="absolute left-5 top-5 p-1 rounded-full text-outline hover:text-on-surface"
            >
              <span className="material-symbols-outlined text-[22px]">close</span>
            </button>

            {inquirySuccess ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-secondary-container text-secondary flex items-center justify-center mx-auto">
                  <span className="material-symbols-outlined text-[36px]">check_circle</span>
                </div>
                <h3 className="text-lg font-bold text-on-surface">استعلام شما با موفقیت ثبت شد</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  اطلاعات در پایگاه داده ابری Neon ثبت گردید. کارشناسان فنی و ارائه‌دهنده در اسرع وقت
                  پیش‌فاکتور رسمی را به ایمیل شما ارسال خواهند کرد.
                </p>
                <div className="pt-4 flex items-center justify-center gap-3">
                  <Link
                    href="/buyer/portal"
                    className="px-5 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-xs"
                  >
                    مشاهده در کارتابل خریدار
                  </Link>
                  <button
                    onClick={() => setInquiryModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl bg-surface-container text-on-surface font-semibold text-xs"
                  >
                    بستن
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmitInquiry} className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-on-surface">
                    استعلام قیمت و درخواست دموی {product.title_fa}
                  </h3>
                  <p className="text-xs text-on-surface-variant">
                    درخواست شما مستقیماً در کارتابل ارائه‌دهنده ثبت شده و پشتیبانی اکومارکت آن را رصد
                    می‌کند.
                  </p>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold text-on-surface mb-1">
                      نام و نام‌خانوادگی: *
                    </label>
                    <input
                      type="text"
                      required
                      value={buyerName}
                      onChange={(e) => setBuyerName(e.target.value)}
                      placeholder="مثال: مهندس راد"
                      className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-on-surface mb-1">ایمیل سازمانی: *</label>
                      <input
                        type="email"
                        required
                        value={buyerEmail}
                        onChange={(e) => setBuyerEmail(e.target.value)}
                        placeholder="name@company.ir"
                        className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-on-surface mb-1">شماره تماس:</label>
                      <input
                        type="tel"
                        value={buyerPhone}
                        onChange={(e) => setBuyerPhone(e.target.value)}
                        placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                        className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-on-surface mb-1">نام سازمان یا شرکت:</label>
                    <input
                      type="text"
                      value={buyerCompany}
                      onChange={(e) => setBuyerCompany(e.target.value)}
                      placeholder="نام هلدینگ، کارخانه یا شرکت"
                      className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-on-surface mb-1">
                      توضیحات نیاز فنی یا سوالات شما:
                    </label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="تعداد پرسنل، نیازمندی خاص به API، اتصال به سپیدار و ..."
                      className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary"
                    ></textarea>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-end gap-3 border-t border-outline-variant/30">
                  <button
                    type="button"
                    onClick={() => setInquiryModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl bg-surface-container-low text-on-surface text-xs font-semibold hover:bg-surface-container"
                  >
                    انصراف
                  </button>
                  <button
                    type="submit"
                    disabled={submittingInquiry}
                    className="px-6 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-xs hover:bg-primary-container disabled:opacity-50"
                  >
                    {submittingInquiry ? 'در حال ارسال...' : 'ارسال استعلام رسمی'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
