'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Product, Dispute, Contract } from '@/lib/db';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'review' | 'disputes' | 'finance'>('review');
  const [products, setProducts] = useState<Product[]>([]);
  const [disputes, setDisputes] = useState<Dispute[]>([]);
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAll();
  }, []);

  async function loadAll() {
    setLoading(true);
    try {
      const [prodRes, dispRes, cntRes] = await Promise.all([
        fetch('/api/products?status=all'),
        fetch('/api/disputes'),
        fetch('/api/contracts'),
      ]);
      const pData = await prodRes.json();
      const dData = await dispRes.json();
      const cData = await cntRes.json();

      if (pData.success) setProducts(pData.data);
      if (dData.success) setDisputes(dData.data);
      if (cData.success) setContracts(cData.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  const handleUpdateProductStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (data.success) {
        alert(`وضعیت محصول با موفقیت به «${status === 'published' ? 'تایید و منتشر شده' : status}» تغییر یافت.`);
        loadAll();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateDisputeStatus = async (id: string, status: string) => {
    try {
      const res = await fetch('/api/disputes', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      const data = await res.json();
      if (data.success) {
        alert('وضعیت پرونده داوری به‌روزرسانی شد.');
        loadAll();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const pendingReviewCount = products.filter((p) => p.status === 'under_review').length;
  const openDisputesCount = disputes.filter((d) => d.status !== 'resolved').length;

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-on-surface-variant mb-2">
            <Link href="/" className="hover:text-primary">
              اکومارکت
            </Link>
            <span>/</span>
            <span className="text-on-surface font-semibold">پیشخوان نظارتی کلان ادمین</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-on-surface">
            میز مدیریت کلان، صف بررسی و داوری حقوقی
          </h1>
          <p className="text-xs text-on-surface-variant mt-1">
            نظارت بلادرنگ بر دیتابیس ابری Neon، تایید محصولات جدید، تسویه‌های مالی و حل اختلاف
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-high border border-outline-variant/40 text-xs font-semibold text-on-surface">
            <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse"></span>
            اتصال برخط به پایگاه داده ابری Neon
          </span>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center gap-2 border-b border-outline-variant/40 text-xs font-bold">
        <button
          onClick={() => setActiveTab('review')}
          className={`flex items-center gap-2 py-3 px-5 border-b-2 transition-all ${
            activeTab === 'review'
              ? 'border-primary text-primary font-extrabold'
              : 'border-transparent text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-[19px]">fact_check</span>
          <span>صف بررسی و تایید محصولات</span>
          {pendingReviewCount > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-amber-500 text-white text-[10px] font-bold">
              {pendingReviewCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('disputes')}
          className={`flex items-center gap-2 py-3 px-5 border-b-2 transition-all ${
            activeTab === 'disputes'
              ? 'border-primary text-primary font-extrabold'
              : 'border-transparent text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-[19px]">gavel</span>
          <span>مرکز داوری و حل اختلاف خریدار و فروشنده</span>
          {openDisputesCount > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-error text-white text-[10px] font-bold">
              {openDisputesCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('finance')}
          className={`flex items-center gap-2 py-3 px-5 border-b-2 transition-all ${
            activeTab === 'finance'
              ? 'border-primary text-primary font-extrabold'
              : 'border-transparent text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-[19px]">account_balance</span>
          <span>میز مالی و تسویه‌حساب‌های امانی</span>
        </button>
      </div>

      {/* Tab 1: Product Review Queue */}
      {activeTab === 'review' && (
        <div className="bg-white rounded-3xl border border-outline-variant/50 p-6 md:p-8 space-y-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-outline-variant/30 pb-4">
            <div>
              <h2 className="text-base font-bold text-on-surface">صف اعتبارسنجی فنی محصولات</h2>
              <p className="text-xs text-on-surface-variant">
                تایید کیفیت، انطباق با مستندات و بررسی صلاحیت ارائه‌دهندگان قبل از انتشار در ویترین
              </p>
            </div>
            <button
              onClick={loadAll}
              className="text-xs text-primary font-semibold hover:underline flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[16px]">refresh</span>
              <span>تازه‌سازی</span>
            </button>
          </div>

          {loading ? (
            <div className="py-12 text-center text-xs font-semibold text-outline">
              در حال دریافت محصولات از Neon DB...
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead>
                  <tr className="border-b border-outline-variant/30 text-outline">
                    <th className="py-3 px-3">محصول</th>
                    <th className="py-3 px-3">شرکت ارائه‌دهنده</th>
                    <th className="py-3 px-3">مدل استقرار</th>
                    <th className="py-3 px-3">هزینه پایه</th>
                    <th className="py-3 px-3">وضعیت فعلی</th>
                    <th className="py-3 px-3">عملیات ادمین</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/20">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-surface-container-low/40">
                      <td className="py-4 px-3">
                        <div className="font-bold text-on-surface">{p.title_fa}</div>
                        <div className="text-[11px] text-outline font-mono">{p.title}</div>
                      </td>
                      <td className="py-4 px-3 font-semibold text-primary">{p.vendor_name}</td>
                      <td className="py-4 px-3 text-on-surface-variant">{p.deployment}</td>
                      <td className="py-4 px-3 font-bold text-on-surface">
                        {Number(p.price_toman).toLocaleString('fa-IR')} تومان
                      </td>
                      <td className="py-4 px-3">
                        <span
                          className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${
                            p.status === 'published'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {p.status === 'published' ? 'منتشر شده در ویترین' : 'در صف ارزیابی ادمین'}
                        </span>
                      </td>
                      <td className="py-4 px-3">
                        <div className="flex items-center gap-2">
                          {p.status !== 'published' ? (
                            <button
                              onClick={() => handleUpdateProductStatus(p.id, 'published')}
                              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors flex items-center gap-1 shadow-sm"
                            >
                              <span className="material-symbols-outlined text-[15px]">check</span>
                              <span>تایید و انتشار</span>
                            </button>
                          ) : (
                            <button
                              onClick={() => handleUpdateProductStatus(p.id, 'under_review')}
                              className="px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-semibold text-xs transition-colors"
                            >
                              انتقال به بازبینی
                            </button>
                          )}
                          <Link
                            href={`/product/${p.slug}`}
                            className="p-1.5 rounded-lg text-outline hover:text-primary"
                            title="مشاهده صفحه زنده"
                          >
                            <span className="material-symbols-outlined text-[18px]">visibility</span>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Disputes Resolution Center */}
      {activeTab === 'disputes' && (
        <div className="bg-white rounded-3xl border border-outline-variant/50 p-6 md:p-8 space-y-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-outline-variant/30 pb-4">
            <div>
              <h2 className="text-base font-bold text-on-surface">
                هیئت داوری تخصصی اختلافات نرم‌افزاری
              </h2>
              <p className="text-xs text-on-surface-variant">
                پرونده‌های ارجاع شده توسط خریداران یا ارائه‌دهندگان جهت تصمیم‌گیری در خصوص حساب امانی
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-error/10 text-error text-xs font-bold">
              {disputes.length} پرونده ثبت‌شده
            </span>
          </div>

          <div className="space-y-4">
            {disputes.map((d) => (
              <div
                key={d.id}
                className="p-5 rounded-2xl bg-surface-container-low/60 border border-outline-variant/40 space-y-3 text-xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-outline-variant/20 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-error px-2 py-0.5 rounded bg-error-container text-[11px]">
                      {d.dispute_code}
                    </span>
                    <span className="font-bold text-on-surface text-sm">{d.subject}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                        d.status === 'resolved'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {d.status === 'resolved' ? 'داوری خاتمه یافته' : 'در حال بررسی کارشناسی'}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-on-surface-variant">
                  <div>
                    <span className="text-outline">شاکی / خریدار:</span>{' '}
                    <span className="font-semibold text-on-surface">{d.complainant_name}</span>
                  </div>
                  <div>
                    <span className="text-outline">پاسخگو / ارائه‌دهنده:</span>{' '}
                    <span className="font-semibold text-on-surface">{d.respondent_name}</span>
                  </div>
                </div>

                <p className="p-3 rounded-xl bg-white border border-outline-variant/30 text-on-surface leading-relaxed">
                  {d.description}
                </p>

                <div className="flex justify-end gap-2 pt-2">
                  {d.status !== 'resolved' ? (
                    <>
                      <button
                        onClick={() => handleUpdateDisputeStatus(d.id, 'resolved')}
                        className="px-4 py-1.5 rounded-lg bg-secondary text-on-secondary font-bold text-xs hover:bg-secondary/90 transition-all"
                      >
                        صدور رای نهایی و مختومه کردن پرونده
                      </button>
                      <button
                        onClick={() => handleUpdateDisputeStatus(d.id, 'investigating')}
                        className="px-3 py-1.5 rounded-lg bg-surface-container text-on-surface font-semibold text-xs"
                      >
                        ارجاع به کارشناس دادگستری
                      </button>
                    </>
                  ) : (
                    <span className="text-secondary font-bold text-xs flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">check_circle</span>
                      پرونده مختومه شده است
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Finance & Settlements */}
      {activeTab === 'finance' && (
        <div className="bg-white rounded-3xl border border-outline-variant/50 p-6 md:p-8 space-y-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-outline-variant/30 pb-4">
            <div>
              <h2 className="text-base font-bold text-on-surface">
                میز مدیریت گردش حساب‌های امانی (Escrow Ledger)
              </h2>
              <p className="text-xs text-on-surface-variant">
                کلیه تراکنش‌های سازمانی که وجوه آن‌ها در بانک عامل امانت‌گذاری شده است
              </p>
            </div>
            <div className="text-left">
              <span className="text-[11px] text-outline block">مجموع موجودی امانی فعال:</span>
              <span className="text-base font-bold text-secondary">
                ۲۷۵,۰۰۰,۰۰۰ تومان
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead>
                <tr className="border-b border-outline-variant/30 text-outline">
                  <th className="py-3 px-3">شناسه قرارداد</th>
                  <th className="py-3 px-3">نام نرم‌افزار</th>
                  <th className="py-3 px-3">خریدار</th>
                  <th className="py-3 px-3">ارائه‌دهنده</th>
                  <th className="py-3 px-3">مبلغ مسدودی امانی</th>
                  <th className="py-3 px-3">وضعیت تسویه</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20">
                {contracts.map((c) => (
                  <tr key={c.id} className="hover:bg-surface-container-low/40">
                    <td className="py-3 px-3 font-mono font-bold text-on-surface">
                      {c.contract_number}
                    </td>
                    <td className="py-3 px-3 font-semibold text-primary">{c.product_title}</td>
                    <td className="py-3 px-3 text-on-surface-variant">{c.buyer_name}</td>
                    <td className="py-3 px-3 text-on-surface-variant">{c.vendor_name}</td>
                    <td className="py-3 px-3 font-bold text-on-surface">
                      {Number(c.amount_toman).toLocaleString('fa-IR')} تومان
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${
                          c.status === 'in_escrow'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {c.status === 'in_escrow' ? 'مسدود در حساب امن' : 'تسویه کامل شده'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
