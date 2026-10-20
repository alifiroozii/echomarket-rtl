'use client';

import { Suspense, useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Product } from '@/lib/db';

function CompareContent() {
  const searchParams = useSearchParams();
  const p1 = searchParams.get('p1');
  const p2 = searchParams.get('p2');

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [selectedProd1, setSelectedProd1] = useState<Product | null>(null);
  const [selectedProd2, setSelectedProd2] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch('/api/products?status=all');
        const data = await res.json();
        if (data.success && data.data.length > 0) {
          const list: Product[] = data.data;
          setAllProducts(list);

          const found1 = list.find((p) => p.id === p1 || p.slug === p1) || list[0];
          const found2 = list.find((p) => p.id === p2 || p.slug === p2) || list[1] || list[0];
          setSelectedProd1(found1);
          setSelectedProd2(found2);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [p1, p2]);

  if (loading) {
    return (
      <div className="py-32 text-center">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
        <p className="text-xs text-on-surface-variant font-semibold">
          در حال بارگذاری ماتریس مقایسه از دیتابیس Neon...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-8 space-y-8">
      {/* Breadcrumb */}
      <div>
        <div className="flex items-center gap-2 text-xs text-on-surface-variant mb-2">
          <Link href="/" className="hover:text-primary">
            اکومارکت
          </Link>
          <span>/</span>
          <span className="text-on-surface font-semibold">ماتریس مقایسه محصولات</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-on-surface">
          مقایسه دقیق و چندجانبه راهکارهای نرم‌افزاری
        </h1>
        <p className="text-xs text-on-surface-variant mt-1">
          بررسی موشکافانه شاخص‌های فنی، قیمت، استقرار و تعهدات SLA در کنار یکدیگر
        </p>
      </div>

      {/* Comparison Selectors Header */}
      <div className="bg-white rounded-3xl border border-outline-variant/50 p-6 shadow-sm overflow-x-auto">
        <table className="w-full text-right text-xs">
          <thead>
            <tr className="border-b border-outline-variant/40">
              <th className="py-4 px-4 w-1/3 text-on-surface font-bold text-sm">شاخص مقایسه</th>
              <th className="py-4 px-4 w-1/3">
                <div className="space-y-2">
                  <label className="text-[11px] text-outline font-semibold block">محصول اول:</label>
                  <select
                    value={selectedProd1?.id || ''}
                    onChange={(e) => {
                      const p = allProducts.find((item) => item.id === e.target.value);
                      if (p) setSelectedProd1(p);
                    }}
                    className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-3 py-2 font-bold text-on-surface text-xs focus:outline-none focus:border-primary"
                  >
                    {allProducts.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.title_fa}
                      </option>
                    ))}
                  </select>
                </div>
              </th>
              <th className="py-4 px-4 w-1/3">
                <div className="space-y-2">
                  <label className="text-[11px] text-outline font-semibold block">محصول دوم:</label>
                  <select
                    value={selectedProd2?.id || ''}
                    onChange={(e) => {
                      const p = allProducts.find((item) => item.id === e.target.value);
                      if (p) setSelectedProd2(p);
                    }}
                    className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-3 py-2 font-bold text-on-surface text-xs focus:outline-none focus:border-primary"
                  >
                    {allProducts.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.title_fa}
                      </option>
                    ))}
                  </select>
                </div>
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-outline-variant/20">
            {/* Overview / Vendor */}
            <tr className="hover:bg-surface-container-low/40">
              <td className="py-4 px-4 font-bold text-on-surface">ارائه‌دهنده و توسعه‌دهنده</td>
              <td className="py-4 px-4 font-semibold text-primary">
                {selectedProd1?.vendor_name}
              </td>
              <td className="py-4 px-4 font-semibold text-primary">
                {selectedProd2?.vendor_name}
              </td>
            </tr>

            {/* Rating */}
            <tr className="hover:bg-surface-container-low/40">
              <td className="py-4 px-4 font-bold text-on-surface">امتیاز ارزیابی فنی</td>
              <td className="py-4 px-4">
                <span className="font-bold text-amber-600">★ {selectedProd1?.rating}</span> (
                {selectedProd1?.reviews_count} نظر)
              </td>
              <td className="py-4 px-4">
                <span className="font-bold text-amber-600">★ {selectedProd2?.rating}</span> (
                {selectedProd2?.reviews_count} نظر)
              </td>
            </tr>

            {/* Pricing */}
            <tr className="hover:bg-surface-container-low/40">
              <td className="py-4 px-4 font-bold text-on-surface">قیمت پایه و مدل پرداخت</td>
              <td className="py-4 px-4">
                <span className="font-bold text-primary">
                  {Number(selectedProd1?.price_toman).toLocaleString('fa-IR')} تومان
                </span>
                <span className="block text-[11px] text-outline mt-0.5">
                  ({selectedProd1?.pricing_model})
                </span>
              </td>
              <td className="py-4 px-4">
                <span className="font-bold text-primary">
                  {Number(selectedProd2?.price_toman).toLocaleString('fa-IR')} تومان
                </span>
                <span className="block text-[11px] text-outline mt-0.5">
                  ({selectedProd2?.pricing_model})
                </span>
              </td>
            </tr>

            {/* Deployment */}
            <tr className="hover:bg-surface-container-low/40">
              <td className="py-4 px-4 font-bold text-on-surface">مدل استقرار زیرساخت</td>
              <td className="py-4 px-4 font-medium">{selectedProd1?.deployment}</td>
              <td className="py-4 px-4 font-medium">{selectedProd2?.deployment}</td>
            </tr>

            {/* SLA */}
            <tr className="hover:bg-surface-container-low/40">
              <td className="py-4 px-4 font-bold text-on-surface">تعهد آپ‌تایم و پایداری (SLA)</td>
              <td className="py-4 px-4 text-secondary font-bold">
                {selectedProd1?.sla_guarantee}
              </td>
              <td className="py-4 px-4 text-secondary font-bold">
                {selectedProd2?.sla_guarantee}
              </td>
            </tr>

            {/* Escrow Support */}
            <tr className="hover:bg-surface-container-low/40">
              <td className="py-4 px-4 font-bold text-on-surface">پوشش حساب امانی و داوری حقوقی</td>
              <td className="py-4 px-4">
                <span className="inline-flex items-center gap-1 text-secondary font-semibold">
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  ۱۰۰٪ تضمین بازگشت وجه
                </span>
              </td>
              <td className="py-4 px-4">
                <span className="inline-flex items-center gap-1 text-secondary font-semibold">
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  ۱۰۰٪ تضمین بازگشت وجه
                </span>
              </td>
            </tr>

            {/* Persian Lang & Jalali Calendar */}
            <tr className="hover:bg-surface-container-low/40">
              <td className="py-4 px-4 font-bold text-on-surface">
                پشتیبانی زبان فارسی و تقویم شمسی
              </td>
              <td className="py-4 px-4">
                <span className="inline-flex items-center gap-1 text-secondary font-semibold">
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  بومی کامل
                </span>
              </td>
              <td className="py-4 px-4">
                <span className="inline-flex items-center gap-1 text-secondary font-semibold">
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  بومی کامل
                </span>
              </td>
            </tr>

            {/* Actions */}
            <tr className="bg-surface-container-low/30">
              <td className="py-4 px-4 font-bold text-on-surface">اقدام سریع</td>
              <td className="py-4 px-4">
                <Link
                  href={`/product/${selectedProd1?.slug}`}
                  className="inline-block px-4 py-2 rounded-xl bg-primary text-on-primary font-bold text-xs hover:bg-primary-container transition-all"
                >
                  استعلام و خرید {selectedProd1?.title_fa.substring(0, 20)}...
                </Link>
              </td>
              <td className="py-4 px-4">
                <Link
                  href={`/product/${selectedProd2?.slug}`}
                  className="inline-block px-4 py-2 rounded-xl bg-primary text-on-primary font-bold text-xs hover:bg-primary-container transition-all"
                >
                  استعلام و خرید {selectedProd2?.title_fa.substring(0, 20)}...
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function ComparePage() {
  return (
    <Suspense
      fallback={
        <div className="py-32 text-center text-xs font-bold text-on-surface-variant">
          در حال بارگذاری ماتریس مقایسه...
        </div>
      }
    >
      <CompareContent />
    </Suspense>
  );
}
