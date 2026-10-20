'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AdminSurveillancePage() {
  const [kycList, setKycList] = useState([
    {
      id: 'kyc-901',
      company: 'شرکت مهندسی داده‌ورزی رایان پویا',
      nationalId: '10103489210',
      contact: 'مهندس علیرضا کیانی',
      docType: 'روزنامه رسمی و اساسنامه ثبتی',
      status: 'pending',
      date: 'امروز، ۱۰:۱۵',
    },
    {
      id: 'kyc-902',
      company: 'فناوری‌های نوین هوش گستر اروند',
      nationalId: '14008923411',
      contact: 'دکتر مریم شمس',
      docType: 'گواهینامه افتا و نماد دانش‌بنیان',
      status: 'verified',
      date: 'دیروز، ۱۶:۴۰',
    },
    {
      id: 'kyc-903',
      company: 'پارس ابر سامانه گستر',
      nationalId: '10320149921',
      contact: 'مهندس بهزاد نادری',
      docType: 'مجوز نظام صنفی رایانه‌ای',
      status: 'pending',
      date: 'دیروز، ۱۱:۲۰',
    },
  ]);

  const handleVerifyKyc = (id: string) => {
    setKycList(
      kycList.map((item) => (item.id === id ? { ...item, status: 'verified' } : item))
    );
    alert('احراز هویت حقوقی شرکت با موفقیت تایید و نشان Verified برای ارائه‌دهنده فعال شد.');
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
          <Link href="/admin" className="hover:text-primary">
            میز ناظر ادمین
          </Link>
          <span>/</span>
          <span className="text-on-surface font-semibold">کنسول مانیتورینگ و نظارت کلان</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-on-surface">
              پیشخوان نظارت کلان، جریان مالی و اعتبارسنجی سازمانی
            </h1>
            <p className="text-xs text-on-surface-variant mt-1">
              رصد سلامت زیرساخت، صف احراز هویت شرکت‌ها (KYC)، توزیع گردش دسته‌بندی‌ها و لاگ‌های امنیتی
            </p>
          </div>
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            سامانه در وضعیت پایدار (All Systems Operational)
          </span>
        </div>
      </div>

      {/* Realtime Telemetry Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-outline-variant/40 p-5 space-y-2 shadow-sm">
          <span className="text-xs text-on-surface-variant">تاخیر کوئری دیتابیس Neon</span>
          <div className="text-2xl font-extrabold text-secondary font-mono">۱۲ میلی‌ثانیه</div>
          <span className="text-[11px] text-outline font-medium">اتصال به Pooler پایگاه داده در AWS</span>
        </div>

        <div className="bg-white rounded-2xl border border-outline-variant/40 p-5 space-y-2 shadow-sm">
          <span className="text-xs text-on-surface-variant">آپ‌تایم ۳۰ روز گذشته</span>
          <div className="text-2xl font-extrabold text-primary font-mono">۹۹.۹۸٪</div>
          <span className="text-[11px] text-primary font-medium">شبکه توزیع جهانی Vercel Edge</span>
        </div>

        <div className="bg-white rounded-2xl border border-outline-variant/40 p-5 space-y-2 shadow-sm">
          <span className="text-xs text-on-surface-variant">درخواست‌های وب‌سرویس در ۲۴ ساعت</span>
          <div className="text-2xl font-extrabold text-on-surface font-mono">۴۵,۲۹۰ ریکوئست</div>
          <span className="text-[11px] text-outline font-medium">۰.۰۱٪ خطای لایه ۵xx</span>
        </div>

        <div className="bg-white rounded-2xl border border-outline-variant/40 p-5 space-y-2 shadow-sm">
          <span className="text-xs text-on-surface-variant">شرکت‌های در صف تایید هویت</span>
          <div className="text-2xl font-extrabold text-amber-600 font-mono">
            {kycList.filter((k) => k.status === 'pending').length} شرکت
          </div>
          <span className="text-[11px] text-amber-700 font-semibold">بررسی اسناد ثبتی و هویتی</span>
        </div>
      </div>

      {/* Enterprise KYC Verification Queue */}
      <div className="bg-white rounded-3xl border border-outline-variant/50 p-6 md:p-8 space-y-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-outline-variant/30 pb-4">
          <div>
            <h2 className="text-base font-bold text-on-surface">
              صف اعتبارسنجی حقوقی و احراز هویت شرکت‌ها (Enterprise KYC)
            </h2>
            <p className="text-xs text-on-surface-variant">
              بررسی شناسه ملی اشخاص حقوقی، اساسنامه، شماره ثبت و تایید صلاحیت انتشار نرم‌افزار
            </p>
          </div>
          <span className="px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed text-xs font-bold">
            استعلام آنلاین از سامانه ثبت شرکت‌ها
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead>
              <tr className="border-b border-outline-variant/30 text-outline">
                <th className="py-3 px-3">نام شرکت حقوقی</th>
                <th className="py-3 px-3">شناسه ملی ثبتی</th>
                <th className="py-3 px-3">نماینده و امضادار مجاز</th>
                <th className="py-3 px-3">مستندات پیوست</th>
                <th className="py-3 px-3">وضعیت اعتبارسنجی</th>
                <th className="py-3 px-3">اقدام ناظر</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {kycList.map((k) => (
                <tr key={k.id} className="hover:bg-surface-container-low/40">
                  <td className="py-4 px-3 font-bold text-on-surface">{k.company}</td>
                  <td className="py-4 px-3 font-mono font-semibold text-primary">{k.nationalId}</td>
                  <td className="py-4 px-3 text-on-surface-variant">{k.contact}</td>
                  <td className="py-4 px-3 text-outline">{k.docType}</td>
                  <td className="py-4 px-3">
                    <span
                      className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${
                        k.status === 'verified'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {k.status === 'verified' ? 'احراز شده و معتبر' : 'در انتظار بررسی مدارک'}
                    </span>
                  </td>
                  <td className="py-4 px-3">
                    {k.status === 'pending' ? (
                      <button
                        onClick={() => handleVerifyKyc(k.id)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors flex items-center gap-1 shadow-sm"
                      >
                        <span className="material-symbols-outlined text-[15px]">verified</span>
                        <span>تایید هویت</span>
                      </button>
                    ) : (
                      <span className="text-secondary font-bold text-xs flex items-center gap-1">
                        <span className="material-symbols-outlined text-[15px]">check</span>
                        <span>تایید شده</span>
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Category Turnover Distribution */}
      <div className="bg-white rounded-3xl border border-outline-variant/50 p-6 md:p-8 space-y-6 shadow-sm">
        <h2 className="text-base font-bold text-on-surface border-b border-outline-variant/30 pb-4">
          سهم دسته‌بندی راهکارها در گردش مالی و قراردادها
        </h2>

        <div className="space-y-4">
          {[
            { name: 'منابع انسانی و سامانه‌های شیفت کاری (کارجور و ...)', share: 38, amount: '۱۳,۱۱۰,۰۰۰,۰۰۰ تومان', color: 'bg-primary' },
            { name: 'فین‌تک، الگوریتم‌های ترید و ERP (تالین و ...)', share: 29, amount: '۱۰,۰۰۵,۰۰۰,۰۰۰ تومان', color: 'bg-secondary' },
            { name: 'امنیت سایبری و مدیریت هویت IAM (کیوان و ...)', share: 18, amount: '۶,۲۱۰,۰۰۰,۰۰۰ تومان', color: 'bg-tertiary' },
            { name: 'زیرساخت ابری، آبجکت استوریج و دواپس (دیاکو و ...)', share: 15, amount: '۵,۱۷۵,۰۰۰,۰۰۰ تومان', color: 'bg-amber-500' },
          ].map((cat, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-on-surface">
                <span>{cat.name}</span>
                <span className="font-mono text-outline">{cat.amount} ({cat.share}٪)</span>
              </div>
              <div className="w-full h-3 bg-surface-container-low rounded-full overflow-hidden">
                <div
                  className={`h-full ${cat.color} rounded-full transition-all duration-500`}
                  style={{ width: `${cat.share}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
