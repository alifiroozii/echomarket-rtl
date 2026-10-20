'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Dispute } from '@/lib/db';

export default function DisputeCenterPage() {
  const [disputes, setDisputes] = useState<Dispute[]>([]);
  const [loading, setLoading] = useState(true);

  // New dispute modal
  const [modalOpen, setModalOpen] = useState(false);
  const [complainant, setComplainant] = useState('');
  const [respondent, setRespondent] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadDisputes();
  }, []);

  async function loadDisputes() {
    setLoading(true);
    try {
      const res = await fetch('/api/disputes');
      const data = await res.json();
      if (data.success) {
        setDisputes(data.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  const handleSubmitDispute = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/disputes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          complainant_name: complainant,
          respondent_name: respondent,
          subject,
          description,
          priority: 'high',
        }),
      });
      const data = await res.json();
      if (data.success) {
        alert(
          `پرونده اختلاف با شناسه ${data.data.dispute_code} در سامانه داوری تخصصی ثبت شد.`
        );
        setModalOpen(false);
        setComplainant('');
        setRespondent('');
        setSubject('');
        setDescription('');
        loadDisputes();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
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
          <span className="text-on-surface font-semibold">مرکز تخصصی داوری و حل اختلاف</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-on-surface">
              مرکز داوری و حل اختلاف خریدار و ارائه‌دهنده — اکومارکت
            </h1>
            <p className="text-xs text-on-surface-variant mt-1">
              مرجع مستقل کارشناسی فنی و حقوقی برای تضمین سلامت معاملات و صیانت از وجوه حساب‌های امانی
            </p>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="px-5 py-2.5 rounded-xl bg-error text-on-error font-bold text-xs hover:bg-error/90 transition-all flex items-center gap-2 shadow-sm shrink-0"
          >
            <span className="material-symbols-outlined text-[18px]">gavel</span>
            <span>ثبت دادخواست جدید داوری</span>
          </button>
        </div>
      </div>

      {/* Trust & SLA Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-outline-variant/40 p-5 space-y-1 shadow-sm">
          <span className="text-xs text-on-surface-variant">سرعت رسیدگی و صدور رای</span>
          <div className="text-2xl font-extrabold text-secondary">۴۰٪ سریع‌تر</div>
          <span className="text-[11px] text-outline font-medium">حداکثر ۷ روز کاری تا صدور رای نهایی</span>
        </div>

        <div className="bg-white rounded-2xl border border-outline-variant/40 p-5 space-y-1 shadow-sm">
          <span className="text-xs text-on-surface-variant">ضمانت اجرای آرای داوری</span>
          <div className="text-2xl font-extrabold text-primary">۱۰۰٪ قطعی</div>
          <span className="text-[11px] text-outline font-medium">متصل به حساب امانی مسدودی بانک</span>
        </div>

        <div className="bg-white rounded-2xl border border-outline-variant/40 p-5 space-y-1 shadow-sm">
          <span className="text-xs text-on-surface-variant">تعداد پرونده‌های رسیدگی شده</span>
          <div className="text-2xl font-extrabold text-on-surface">{disputes.length + 12} پرونده</div>
          <span className="text-[11px] text-emerald-600 font-semibold">۹۸٪ رضایت طرفین دعوی</span>
        </div>
      </div>

      {/* Cases List */}
      <div className="bg-white rounded-3xl border border-outline-variant/50 p-6 md:p-8 space-y-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-outline-variant/30 pb-4">
          <div>
            <h2 className="text-base font-bold text-on-surface">فهرست پرونده‌های جاری هیئت داوری</h2>
            <p className="text-xs text-on-surface-variant">
              شرح دعاوی مطرح‌شده پیرامون مغایرت تعهدات SLA، عدم کارکرد ماژول‌ها یا تاخیر در استقرار
            </p>
          </div>
          <span className="px-3 py-1 rounded-full bg-error-container text-error text-xs font-bold">
            {disputes.length} پرونده ثبت‌شده
          </span>
        </div>

        {loading ? (
          <div className="py-12 text-center text-xs font-bold text-outline">
            در حال بارگذاری پرونده‌ها از Neon DB...
          </div>
        ) : (
          <div className="space-y-4">
            {disputes.map((d) => (
              <div
                key={d.id}
                className="p-5 rounded-2xl bg-surface-container-low/50 border border-outline-variant/40 space-y-3 text-xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-outline-variant/20 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-error bg-error-container px-2.5 py-1 rounded-lg text-xs">
                      {d.dispute_code}
                    </span>
                    <h3 className="font-bold text-sm text-on-surface">{d.subject}</h3>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full font-bold text-[11px] ${
                      d.status === 'resolved'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {d.status === 'resolved' ? 'داوری خاتمه یافته' : 'در حال بررسی کارشناسی'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-on-surface-variant bg-white p-3 rounded-xl border border-outline-variant/20">
                  <div>
                    <span className="text-outline block text-[11px]">خواهان (شاکی):</span>
                    <span className="font-bold text-on-surface">{d.complainant_name}</span>
                  </div>
                  <div>
                    <span className="text-outline block text-[11px]">خوانده (ارائه‌دهنده):</span>
                    <span className="font-bold text-primary">{d.respondent_name}</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-outline-variant/30 text-on-surface leading-relaxed">
                  <span className="font-bold text-outline text-[11px] block mb-1">
                    شرح دادخواست و ادله فنی:
                  </span>
                  {d.description}
                </div>

                <div className="pt-2 flex justify-between items-center text-[11px] text-outline">
                  <span>تاریخ ثبت دادخواست: {new Date(d.created_at).toLocaleDateString('fa-IR')}</span>
                  <span className="text-primary font-semibold">تحت نظارت هیئت داوران مستقل</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* New Dispute Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl border border-outline-variant/40 max-w-lg w-full p-6 md:p-8 space-y-5 shadow-level-3 relative text-right">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute left-5 top-5 p-1 rounded-full text-outline hover:text-on-surface"
            >
              <span className="material-symbols-outlined text-[22px]">close</span>
            </button>

            <form onSubmit={handleSubmitDispute} className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-on-surface">
                  ثبت دادخواست داوری تخصصی در اکومارکت
                </h3>
                <p className="text-xs text-on-surface-variant mt-1">
                  پرونده مستقیماً در کارتابل داوران و دیتابیس ابری Neon ثبت خواهد شد
                </p>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-on-surface mb-1">
                    نام شرکت یا شخص خواهان (شاکی): *
                  </label>
                  <input
                    type="text"
                    required
                    value={complainant}
                    onChange={(e) => setComplainant(e.target.value)}
                    placeholder="مثال: فولاد سیرجان گستر"
                    className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block font-bold text-on-surface mb-1">
                    نام شرکت یا ارائه‌دهنده طرف شکایت: *
                  </label>
                  <input
                    type="text"
                    required
                    value={respondent}
                    onChange={(e) => setRespondent(e.target.value)}
                    placeholder="نام شرکت نرم‌افزاری ارائه‌دهنده"
                    className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block font-bold text-on-surface mb-1">موضوع دعوی: *</label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="مثال: عدم انطباق خروجی API با مشخصات قرارداد"
                    className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block font-bold text-on-surface mb-1">
                    شرح کامل ادعا و مستندات عدم انطباق: *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="توضیحات دقیق در مورد تاخیر در استقرار، خطاهای نرم‌افزار، قطعی و عدم رعایت تعهدات SLA..."
                    className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary"
                  ></textarea>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-outline-variant/30">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-surface-container text-on-surface text-xs font-semibold"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2 rounded-xl bg-error text-on-error font-bold text-xs hover:bg-error/90 disabled:opacity-50"
                >
                  {submitting ? 'در حال ثبت پرونده...' : 'ثبت قطعی در هیئت داوری'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
