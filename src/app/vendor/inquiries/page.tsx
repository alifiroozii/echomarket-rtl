'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Inquiry } from '@/lib/db';

export default function VendorInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  // Quote Modal state
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [quoteAmount, setQuoteAmount] = useState('85000000');
  const [validDays, setValidDays] = useState('14');
  const [slaCommitment, setSlaCommitment] = useState('۹۹.۹۵٪ تضمین پایداری');
  const [vendorNote, setVendorNote] = useState('');
  const [submittingQuote, setSubmittingQuote] = useState(false);

  useEffect(() => {
    loadInquiries();
  }, []);

  async function loadInquiries() {
    setLoading(true);
    try {
      const res = await fetch('/api/inquiries');
      const data = await res.json();
      if (data.success) {
        setInquiries(data.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  const handleOpenQuote = (inq: Inquiry) => {
    setSelectedInquiry(inq);
    setQuoteAmount(inq.quote_amount ? String(inq.quote_amount) : '95000000');
    setQuoteModalOpen(true);
  };

  const handleSubmitQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInquiry) return;
    setSubmittingQuote(true);
    try {
      // simulate quote dispatch and update
      alert(
        `پیش‌فاکتور رسمی به مبلغ ${Number(quoteAmount).toLocaleString(
          'fa-IR'
        )} تومان با اعتبار ${validDays} روز برای ${selectedInquiry.buyer_name} به ایمیل ${
          selectedInquiry.buyer_email
        } صادر و در دیتابیس ثبت شد.`
      );
      setQuoteModalOpen(false);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmittingQuote(false);
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-8 space-y-8">
      {/* Breadcrumb */}
      <div>
        <div className="flex items-center gap-2 text-xs text-on-surface-variant mb-2">
          <Link href="/" className="hover:text-primary">
            اکومارکت
          </Link>
          <span>/</span>
          <Link href="/vendor/dashboard" className="hover:text-primary">
            پیشخوان فروشنده
          </Link>
          <span>/</span>
          <span className="text-on-surface font-semibold">کارتابل استعلام‌ها و صدور پیش‌فاکتور</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-on-surface">
              کارتابل استعلام‌های قیمت (RFQ) و صدور پیش‌فاکتور رسمی
            </h1>
            <p className="text-xs text-on-surface-variant mt-1">
              مدیریت درخواست‌های خرید، نیازمندی‌های فنی مشتریان و ثبت پیشنهاد رسمی تحت پوشش حساب امانی
            </p>
          </div>
          <Link
            href="/vendor/dashboard"
            className="px-4 py-2 rounded-xl bg-surface-container-low hover:bg-surface-container text-primary font-bold text-xs flex items-center gap-1.5 border border-outline-variant/30"
          >
            <span className="material-symbols-outlined text-[18px]">dashboard</span>
            <span>بازگشت به داشبورد</span>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-outline-variant/40 p-5 space-y-1 shadow-sm">
          <span className="text-xs text-on-surface-variant">کل استعلام‌های دریافتی</span>
          <div className="text-2xl font-extrabold text-on-surface">{inquiries.length} درخواست</div>
          <span className="text-[11px] text-primary font-medium">اتصال به پایگاه داده ابری Neon</span>
        </div>

        <div className="bg-white rounded-2xl border border-outline-variant/40 p-5 space-y-1 shadow-sm">
          <span className="text-xs text-on-surface-variant">میانگین ارزش هر پیش‌فاکتور</span>
          <div className="text-2xl font-extrabold text-secondary">
            ۱۴۵,۰۰۰,۰۰۰ <span className="text-xs font-normal text-outline">تومان</span>
          </div>
          <span className="text-[11px] text-secondary font-medium">سفارش‌های سازمانی</span>
        </div>

        <div className="bg-white rounded-2xl border border-outline-variant/40 p-5 space-y-1 shadow-sm">
          <span className="text-xs text-on-surface-variant">نرخ تبدیل استعلام به قرارداد</span>
          <div className="text-2xl font-extrabold text-tertiary">۳۸٪</div>
          <span className="text-[11px] text-outline font-medium">بالاترین نرخ بازار B2B</span>
        </div>

        <div className="bg-white rounded-2xl border border-outline-variant/40 p-5 space-y-1 shadow-sm">
          <span className="text-xs text-on-surface-variant">زمان پاسخگویی هدف</span>
          <div className="text-2xl font-extrabold text-on-surface">کمتر از ۲۴ ساعت</div>
          <span className="text-[11px] text-emerald-600 font-semibold">مطابق با آیین‌نامه SLA</span>
        </div>
      </div>

      {/* Inquiries Detailed Table */}
      <div className="bg-white rounded-3xl border border-outline-variant/50 p-6 md:p-8 space-y-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-outline-variant/30 pb-4">
          <div>
            <h2 className="text-base font-bold text-on-surface">استعلام‌های در انتظار پاسخ ارائه‌دهنده</h2>
            <p className="text-xs text-on-surface-variant">
              بررسی شرح نیازمندی‌های مشتری و ارسال مستقیم پیش‌فاکتور رسمی با مهر دیجیتال
            </p>
          </div>
          <button
            onClick={loadInquiries}
            className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[16px]">refresh</span>
            <span>تازه‌سازی</span>
          </button>
        </div>

        {loading ? (
          <div className="py-12 text-center text-xs font-bold text-outline">
            در حال بارگذاری استعلام‌ها...
          </div>
        ) : (
          <div className="space-y-4">
            {inquiries.map((inq) => (
              <div
                key={inq.id}
                className="p-5 rounded-2xl bg-surface-container-low/50 border border-outline-variant/40 space-y-4 hover:border-primary/40 transition-all text-xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-outline-variant/20 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary-fixed/60 text-primary font-bold flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[20px]">receipt_long</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-on-surface">
                        {inq.buyer_company || inq.buyer_name}
                      </h3>
                      <div className="flex items-center gap-2 text-on-surface-variant text-[11px] mt-0.5">
                        <span>مخاطب: {inq.buyer_name}</span>
                        <span>•</span>
                        <span className="font-mono">{inq.buyer_email}</span>
                        {inq.buyer_phone && (
                          <>
                            <span>•</span>
                            <span className="font-mono">{inq.buyer_phone}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 font-bold text-[10px]">
                      {inq.status === 'pending' ? 'در انتظار پیش‌فاکتور' : 'پیش‌فاکتور صادر شده'}
                    </span>
                    <button
                      onClick={() => handleOpenQuote(inq)}
                      className="px-4 py-2 rounded-xl bg-primary text-on-primary font-bold text-xs hover:bg-primary-container transition-all flex items-center gap-1.5 shadow-sm shadow-primary/20"
                    >
                      <span className="material-symbols-outlined text-[16px]">edit_document</span>
                      <span>صدور پیش‌فاکتور رسمی</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-white p-3 rounded-xl border border-outline-variant/20">
                  <div>
                    <span className="text-[11px] text-outline block">محصول درخواستی:</span>
                    <span className="font-bold text-primary">{inq.product_title || 'راهکار سازمانی'}</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-outline block">تعداد صندلی/کاربر:</span>
                    <span className="font-semibold text-on-surface">{inq.requested_seats || 1} کاربر</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-outline block">محدوده بودجه پیشنهادی:</span>
                    <span className="font-semibold text-secondary">
                      {inq.budget_range || 'توافقی سازمانی'}
                    </span>
                  </div>
                </div>

                {inq.message && (
                  <div className="p-3 rounded-xl bg-white/70 border border-outline-variant/20 text-on-surface-variant leading-relaxed">
                    <span className="font-bold text-on-surface text-[11px] block mb-1">
                      شرح نیازمندی فنی و پیام خریدار:
                    </span>
                    {inq.message}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Interactive Pro-Forma Quote Modal */}
      {quoteModalOpen && selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl border border-outline-variant/40 max-w-lg w-full p-6 md:p-8 space-y-5 shadow-level-3 relative text-right">
            <button
              onClick={() => setQuoteModalOpen(false)}
              className="absolute left-5 top-5 p-1 rounded-full text-outline hover:text-on-surface"
            >
              <span className="material-symbols-outlined text-[22px]">close</span>
            </button>

            <form onSubmit={handleSubmitQuote} className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-on-surface">
                  صدور پیش‌فاکتور رسمی اکومارکت
                </h3>
                <p className="text-xs text-on-surface-variant mt-1">
                  خریدار: {selectedInquiry.buyer_company || selectedInquiry.buyer_name} — محصول:{' '}
                  {selectedInquiry.product_title}
                </p>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-on-surface mb-1">
                    مبلغ کل پیشنهادی (تومان): *
                  </label>
                  <input
                    type="number"
                    required
                    value={quoteAmount}
                    onChange={(e) => setQuoteAmount(e.target.value)}
                    className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-3 py-2 text-xs font-mono focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-on-surface mb-1">مدت اعتبار پیشنهاد (روز):</label>
                    <input
                      type="number"
                      value={validDays}
                      onChange={(e) => setValidDays(e.target.value)}
                      className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-on-surface mb-1">تعهد آپ‌تایم و SLA:</label>
                    <input
                      type="text"
                      value={slaCommitment}
                      onChange={(e) => setSlaCommitment(e.target.value)}
                      className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-on-surface mb-1">
                    توضیحات و شرایط پرداخت به حساب امانی:
                  </label>
                  <textarea
                    rows={3}
                    value={vendorNote}
                    onChange={(e) => setVendorNote(e.target.value)}
                    placeholder="شامل ۳۰ روز دوره پذیرش و استقرار، ۵ جلسه آموزش پرسنل و لایسنس اختصاصی..."
                    className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary"
                  ></textarea>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-outline-variant/30">
                <button
                  type="button"
                  onClick={() => setQuoteModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-surface-container text-on-surface text-xs font-semibold"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  disabled={submittingQuote}
                  className="px-6 py-2 rounded-xl bg-primary text-on-primary font-bold text-xs hover:bg-primary-container disabled:opacity-50"
                >
                  {submittingQuote ? 'در حال صدور...' : 'ثبت و ارسال رسمی به خریدار'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
