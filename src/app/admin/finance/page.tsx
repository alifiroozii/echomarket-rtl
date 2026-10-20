'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Contract } from '@/lib/db';

export default function AdminFinancePage() {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFinanceData();
  }, []);

  async function loadFinanceData() {
    setLoading(true);
    try {
      const res = await fetch('/api/contracts');
      const data = await res.json();
      if (data.success) {
        setContracts(data.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  const handleBatchSettlement = () => {
    alert(
      'دستور تسویه دسته‌ای مبالغ آزادشده از طریق وب‌سرویس پایا/ساتنا به بانک مرکزی ارسال گردید.'
    );
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
          <span className="text-on-surface font-semibold">مدیریت مالی و تسویه‌حساب‌های امانی</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-on-surface">
              مدیریت مالی کلان، تسویه‌حساب‌ها و حساب‌های امانی (Escrow Settlement)
            </h1>
            <p className="text-xs text-on-surface-variant mt-1">
              رصد گردش نقدینگی، کارمزد پلتفرم، واریزی‌های بانکی و تسویه مطالبات ارائه‌دهندگان فناوری
            </p>
          </div>
          <button
            onClick={handleBatchSettlement}
            className="px-5 py-2.5 rounded-xl bg-secondary text-on-secondary font-bold text-xs hover:bg-secondary/90 transition-all flex items-center gap-2 shadow-sm shrink-0"
          >
            <span className="material-symbols-outlined text-[18px]">payments</span>
            <span>تسویه خودکار دوره‌ای با فروشندگان</span>
          </button>
        </div>
      </div>

      {/* Financial Big Stats from Stitch Screen */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-outline-variant/40 p-5 space-y-2 shadow-sm">
          <span className="text-xs text-on-surface-variant">مجموع ارزش ناخالص معاملات (GMV)</span>
          <div className="text-xl md:text-2xl font-extrabold text-on-surface">
            ۳۴,۵۰۰,۰۰۰,۰۰۰ <span className="text-xs font-normal text-outline">تومان</span>
          </div>
          <span className="text-[11px] text-secondary font-semibold">رشد ۲۴٪ نسبت به کوارتر قبل</span>
        </div>

        <div className="bg-white rounded-2xl border border-outline-variant/40 p-5 space-y-2 shadow-sm">
          <span className="text-xs text-on-surface-variant">موجودی مسدود در حساب‌های امانی</span>
          <div className="text-xl md:text-2xl font-extrabold text-primary">
            ۱۲,۸۵۰,۰۰۰,۰۰۰ <span className="text-xs font-normal text-outline">تومان</span>
          </div>
          <span className="text-[11px] text-primary font-semibold">تضمین ۱۰۰٪ در بانک ملت و ملی</span>
        </div>

        <div className="bg-white rounded-2xl border border-outline-variant/40 p-5 space-y-2 shadow-sm">
          <span className="text-xs text-on-surface-variant">کارمزد محقق‌شده اکومارکت (۵٪)</span>
          <div className="text-xl md:text-2xl font-extrabold text-tertiary">
            ۱,۷۲۵,۰۰۰,۰۰۰ <span className="text-xs font-normal text-outline">تومان</span>
          </div>
          <span className="text-[11px] text-outline font-medium">سود ناخالص عملیاتی</span>
        </div>

        <div className="bg-white rounded-2xl border border-outline-variant/40 p-5 space-y-2 shadow-sm">
          <span className="text-xs text-on-surface-variant">در صف صدور حواله پایا و ساتنا</span>
          <div className="text-xl md:text-2xl font-extrabold text-amber-600">
            ۲,۴۳۰,۰۰۰,۰۰۰ <span className="text-xs font-normal text-outline">تومان</span>
          </div>
          <span className="text-[11px] text-amber-700 font-semibold">چرخه تسویه روزهای زوج</span>
        </div>
      </div>

      {/* Escrow Ledger Detailed Table */}
      <div className="bg-white rounded-3xl border border-outline-variant/50 p-6 md:p-8 space-y-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-outline-variant/30 pb-4">
          <div>
            <h2 className="text-base font-bold text-on-surface">
              دفتر کل تسویه‌های حساب امانی (Escrow Ledger)
            </h2>
            <p className="text-xs text-on-surface-variant">
              وضعیت قراردادها، آزادسازی وجوه پس از دوره قبولی و صدور رسید بانکی
            </p>
          </div>
          <button
            onClick={() => alert('خروجی اکسل گزارش مالی دانلود شد.')}
            className="px-3.5 py-1.5 rounded-xl bg-surface-container-low text-primary font-bold text-xs flex items-center gap-1.5 hover:bg-surface-container border border-outline-variant/30"
          >
            <span className="material-symbols-outlined text-[16px]">download</span>
            <span>خروجی اکسل گزارش</span>
          </button>
        </div>

        {loading ? (
          <div className="py-12 text-center text-xs font-bold text-outline">
            در حال دریافت اطلاعات مالی از Neon DB...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead>
                <tr className="border-b border-outline-variant/30 text-outline">
                  <th className="py-3 px-3">شماره قرارداد</th>
                  <th className="py-3 px-3">خریدار سازمانی</th>
                  <th className="py-3 px-3">ارائه‌دهنده فناوری</th>
                  <th className="py-3 px-3">مبلغ ناخالص قرارداد</th>
                  <th className="py-3 px-3">کارمزد پلتفرم</th>
                  <th className="py-3 px-3">مبلغ خالص تسویه</th>
                  <th className="py-3 px-3">وضعیت حساب امانی</th>
                  <th className="py-3 px-3">اقدام</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20">
                {contracts.map((c) => {
                  const fee = Number(c.amount_toman) * 0.05;
                  const net = Number(c.amount_toman) - fee;
                  return (
                    <tr key={c.id} className="hover:bg-surface-container-low/40">
                      <td className="py-4 px-3 font-mono font-bold text-on-surface">
                        {c.contract_number}
                      </td>
                      <td className="py-4 px-3 font-semibold text-on-surface">{c.buyer_name}</td>
                      <td className="py-4 px-3 font-semibold text-primary">{c.vendor_name}</td>
                      <td className="py-4 px-3 font-bold text-on-surface">
                        {Number(c.amount_toman).toLocaleString('fa-IR')} تومان
                      </td>
                      <td className="py-4 px-3 font-mono text-outline">
                        {fee.toLocaleString('fa-IR')} تومان
                      </td>
                      <td className="py-4 px-3 font-bold text-secondary">
                        {net.toLocaleString('fa-IR')} تومان
                      </td>
                      <td className="py-4 px-3">
                        <span
                          className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${
                            c.status === 'in_escrow'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {c.status === 'in_escrow' ? 'مسدود در حساب امن' : 'آزادشده جهت تسویه'}
                        </span>
                      </td>
                      <td className="py-4 px-3">
                        <button
                          onClick={() =>
                            alert(
                              `دستور پرداخت ساتنا به حساب شبا شرکت ${c.vendor_name} ثبت و ارسال گردید.`
                            )
                          }
                          className="px-3 py-1.5 rounded-lg bg-surface-container text-on-surface font-semibold text-xs hover:bg-surface-container-high transition-colors"
                        >
                          تسویه بانکی
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
