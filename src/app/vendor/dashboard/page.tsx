'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Product, Inquiry } from '@/lib/db';

export default function VendorDashboardPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [prodRes, inqRes] = await Promise.all([
          fetch('/api/products?status=all'),
          fetch('/api/inquiries'),
        ]);
        const prodData = await prodRes.json();
        const inqData = await inqRes.json();
        if (prodData.success) setProducts(prodData.data);
        if (inqData.success) setInquiries(inqData.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

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
            <span className="text-on-surface font-semibold">پیشخوان جامع ارائه‌دهندگان</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-on-surface">
            پیشخوان مدیریت فروش و استعلام‌های ارائه‌دهنده
          </h1>
          <p className="text-xs text-on-surface-variant mt-1">
            رصد زنده درآمد، استعلام‌های دریافتی، قراردادهای امانی و وضعیت انتشار محصولات
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/vendor/register"
            className="px-5 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-xs hover:bg-primary-container transition-all flex items-center gap-1.5 shadow-sm shadow-primary/20"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            <span>ثبت محصول جدید</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-outline-variant/50 p-5 space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-on-surface-variant text-xs">
            <span>درآمد محقق‌شده در حساب امانی</span>
            <span className="material-symbols-outlined text-secondary text-[20px]">
              account_balance_wallet
            </span>
          </div>
          <div className="text-xl md:text-2xl font-extrabold text-on-surface">
            ۲۶۵,۰۰۰,۰۰۰ <span className="text-xs font-normal text-outline">تومان</span>
          </div>
          <span className="text-[11px] text-secondary font-semibold">
            +۱۲٪ رشد نسبت به ماه گذشته
          </span>
        </div>

        <div className="bg-white rounded-2xl border border-outline-variant/50 p-5 space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-on-surface-variant text-xs">
            <span>استعلام‌های فعال (RFQs)</span>
            <span className="material-symbols-outlined text-primary text-[20px]">
              mark_email_unread
            </span>
          </div>
          <div className="text-xl md:text-2xl font-extrabold text-on-surface">
            {inquiries.length}{' '}
            <span className="text-xs font-normal text-outline">استعلام باز</span>
          </div>
          <span className="text-[11px] text-primary font-semibold">پاسخگویی میانگین ۳.۵ ساعت</span>
        </div>

        <div className="bg-white rounded-2xl border border-outline-variant/50 p-5 space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-on-surface-variant text-xs">
            <span>محصولات در کاتالوگ</span>
            <span className="material-symbols-outlined text-tertiary text-[20px]">inventory_2</span>
          </div>
          <div className="text-xl md:text-2xl font-extrabold text-on-surface">
            {products.length} <span className="text-xs font-normal text-outline">راهکار فعال</span>
          </div>
          <span className="text-[11px] text-on-surface-variant font-medium">
            تایید شده توسط داوری فنی
          </span>
        </div>

        <div className="bg-white rounded-2xl border border-outline-variant/50 p-5 space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-on-surface-variant text-xs">
            <span>رضایت مشتریان و امتیاز SLA</span>
            <span className="material-symbols-outlined text-amber-500 text-[20px]">star</span>
          </div>
          <div className="text-xl md:text-2xl font-extrabold text-on-surface">
            ۴.۹۴ <span className="text-xs font-normal text-outline">از ۵.۰</span>
          </div>
          <span className="text-[11px] text-secondary font-semibold">۹۹.۹۸٪ آپ‌تایم مستند</span>
        </div>
      </div>

      {/* Inquiries / Pro-forma Queue */}
      <div className="bg-white rounded-3xl border border-outline-variant/50 p-6 md:p-8 space-y-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-outline-variant/30 pb-4">
          <div>
            <h2 className="text-base font-bold text-on-surface">
              کارتابل استعلام‌ها و صدور پیش‌فاکتور رسمی (RFQ)
            </h2>
            <p className="text-xs text-on-surface-variant">
              درخواست‌های دمو و استعلام قیمت ارسال‌شده توسط شرکت‌های خریدار
            </p>
          </div>
          <span className="px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed text-xs font-bold">
            {inquiries.length} درخواست ثبت‌شده
          </span>
        </div>

        {loading ? (
          <div className="py-12 text-center text-xs font-semibold text-outline">
            در حال دریافت استعلام‌ها...
          </div>
        ) : inquiries.length === 0 ? (
          <div className="py-8 text-center text-xs text-on-surface-variant">
            در حال حاضر استعلام جدیدی ثبت نشده است.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead>
                <tr className="border-b border-outline-variant/30 text-outline">
                  <th className="py-3 px-3">نام خریدار / سازمان</th>
                  <th className="py-3 px-3">محصول مد نظر</th>
                  <th className="py-3 px-3">تعداد صندلی/کاربر</th>
                  <th className="py-3 px-3">توضیحات نیاز</th>
                  <th className="py-3 px-3">وضعیت</th>
                  <th className="py-3 px-3">اقدام</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20">
                {inquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-surface-container-low/40">
                    <td className="py-3 px-3 font-semibold text-on-surface">
                      <div>{inq.buyer_name}</div>
                      <div className="text-[11px] text-outline font-normal">
                        {inq.buyer_company || inq.buyer_email}
                      </div>
                    </td>
                    <td className="py-3 px-3 font-medium text-primary">
                      {inq.product_title || 'محصول سازمانی'}
                    </td>
                    <td className="py-3 px-3 font-mono">{inq.requested_seats || 1} کاربر</td>
                    <td className="py-3 px-3 max-w-xs truncate text-on-surface-variant">
                      {inq.message || 'درخواست اطلاعات تکمیلی و برگزاری دمو'}
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 font-bold text-[10px]">
                        {inq.status === 'pending' ? 'در انتظار پیش‌فاکتور' : 'پیش‌فاکتور صادر شد'}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <button
                        onClick={() =>
                          alert(
                            `پیش‌فاکتور رسمی برای ${inq.buyer_name} به ایمیل ${inq.buyer_email} ارسال شد.`
                          )
                        }
                        className="px-3 py-1.5 rounded-lg bg-primary text-on-primary font-semibold text-xs hover:bg-primary-container transition-all"
                      >
                        صدور پیش‌فاکتور
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Products Status Table */}
      <div className="bg-white rounded-3xl border border-outline-variant/50 p-6 md:p-8 space-y-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-outline-variant/30 pb-4">
          <div>
            <h2 className="text-base font-bold text-on-surface">وضعیت انتشار محصولات شما</h2>
            <p className="text-xs text-on-surface-variant">
              فهرست راهکارهای ثبت شده و وضعیت تایید در دیتابیس ابری Neon
            </p>
          </div>
          <Link
            href="/vendor/register"
            className="text-xs font-bold text-primary hover:text-primary-container"
          >
            + ثبت راهکار جدید
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead>
              <tr className="border-b border-outline-variant/30 text-outline">
                <th className="py-3 px-3">عنوان محصول</th>
                <th className="py-3 px-3">ارائه‌دهنده</th>
                <th className="py-3 px-3">هزینه پایه</th>
                <th className="py-3 px-3">مدل استقرار</th>
                <th className="py-3 px-3">وضعیت تایید</th>
                <th className="py-3 px-3">مشاهده</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-surface-container-low/40">
                  <td className="py-3 px-3 font-semibold text-on-surface">{p.title_fa}</td>
                  <td className="py-3 px-3 text-on-surface-variant">{p.vendor_name}</td>
                  <td className="py-3 px-3 font-bold text-primary">
                    {Number(p.price_toman).toLocaleString('fa-IR')} تومان
                  </td>
                  <td className="py-3 px-3 text-on-surface-variant">{p.deployment}</td>
                  <td className="py-3 px-3">
                    <span
                      className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${
                        p.status === 'published'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {p.status === 'published' ? 'تایید و منتشر شده' : 'در صف بررسی کارشناسان'}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <Link
                      href={`/product/${p.slug}`}
                      className="text-primary font-bold hover:underline"
                    >
                      مشاهده صفحه
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
