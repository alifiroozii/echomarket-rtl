'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Contract, Inquiry } from '@/lib/db';

export default function BuyerPortalPage() {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  // Dispute modal
  const [disputeModalOpen, setDisputeModalOpen] = useState(false);
  const [disputeContract, setDisputeContract] = useState<Contract | null>(null);
  const [disputeSubject, setDisputeSubject] = useState('');
  const [disputeDesc, setDisputeDesc] = useState('');
  const [disputeSubmitting, setDisputeSubmitting] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    try {
      const [cntRes, inqRes] = await Promise.all([
        fetch('/api/contracts'),
        fetch('/api/inquiries'),
      ]);
      const cntData = await cntRes.json();
      const inqData = await inqRes.json();
      if (cntData.success) setContracts(cntData.data);
      if (inqData.success) setInquiries(inqData.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  const handleReleaseEscrow = async (contractId: string) => {
    if (!confirm('آیا تایید فنی و آزادسازی وجه امانی به ارائه‌دهنده را تایید می‌کنید؟')) return;
    try {
      const res = await fetch('/api/contracts', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: contractId, status: 'active' }),
      });
      const data = await res.json();
      if (data.success) {
        alert('حساب امانی تایید شد و لایسنس به حالت فعال تغییر یافت.');
        loadData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleOpenDispute = (c: Contract) => {
    setDisputeContract(c);
    setDisputeSubject(`عدم انطباق تعهدات در قرارداد ${c.contract_number}`);
    setDisputeDesc('');
    setDisputeModalOpen(true);
  };

  const handleSubmitDispute = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!disputeContract) return;
    setDisputeSubmitting(true);
    try {
      const res = await fetch('/api/disputes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contract_id: disputeContract.id,
          complainant_name: disputeContract.buyer_name,
          respondent_name: disputeContract.vendor_name,
          subject: disputeSubject,
          description: disputeDesc,
          priority: 'high',
        }),
      });
      const data = await res.json();
      if (data.success) {
        alert(`پرونده اختلاف با شناسه ${data.data.dispute_code} در مرکز داوری اکومارکت ثبت شد.`);
        setDisputeModalOpen(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setDisputeSubmitting(false);
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-on-surface-variant mb-2">
          <Link href="/" className="hover:text-primary">
            اکومارکت
          </Link>
          <span>/</span>
          <span className="text-on-surface font-semibold">کارتابل سازمانی خریدار</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-on-surface">
          قراردادها، لایسنس‌ها و ضمانت امانی خریدار
        </h1>
        <p className="text-xs text-on-surface-variant mt-1">
          مدیریت لایسنس‌های نرم‌افزاری فعال، بررسی وضعیت حساب امانی و دریافت کلیدهای دسترسی
        </p>
      </div>

      {/* Escrow Guarantee Highlight Card */}
      <div className="p-6 rounded-3xl bg-secondary-container/20 border border-secondary/30 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-right">
          <div className="w-12 h-12 rounded-2xl bg-secondary text-on-secondary flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[28px]">lock</span>
          </div>
          <div>
            <h3 className="font-bold text-sm text-on-surface">
              پروتکل ضمانت امانی اکومارکت فعال است
            </h3>
            <p className="text-xs text-on-surface-variant mt-0.5 leading-relaxed">
              تا زمان تست کامل نرم‌افزار و تایید دکمه «آزادسازی»، وجه پرداختی شما در بانک مرکزی نزد
              اکومارکت در امان است.
            </p>
          </div>
        </div>
        <Link
          href="/explore"
          className="px-5 py-2.5 rounded-xl bg-secondary text-on-secondary font-bold text-xs hover:bg-secondary/90 transition-all shrink-0"
        >
          خرید لایسنس جدید
        </Link>
      </div>

      {/* Contracts & Licenses Table */}
      <div className="bg-white rounded-3xl border border-outline-variant/50 p-6 md:p-8 space-y-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-outline-variant/30 pb-4">
          <div>
            <h2 className="text-base font-bold text-on-surface">
              قراردادهای جاری و کلیدهای لایسنس
            </h2>
            <p className="text-xs text-on-surface-variant">
              اطلاعات مستقیماً از پایگاه داده ابری Neon خوانده می‌شود
            </p>
          </div>
          <span className="px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed text-xs font-bold">
            {contracts.length} قرارداد
          </span>
        </div>

        {loading ? (
          <div className="py-12 text-center text-xs font-semibold text-outline">
            در حال دریافت اطلاعات قراردادها...
          </div>
        ) : contracts.length === 0 ? (
          <div className="py-8 text-center text-xs text-on-surface-variant">
            قراردادی یافت نشد.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead>
                <tr className="border-b border-outline-variant/30 text-outline">
                  <th className="py-3 px-3">شماره قرارداد</th>
                  <th className="py-3 px-3">محصول نرم‌افزاری</th>
                  <th className="py-3 px-3">ارائه‌دهنده</th>
                  <th className="py-3 px-3">مبلغ قرارداد</th>
                  <th className="py-3 px-3">کلید لایسنس</th>
                  <th className="py-3 px-3">وضعیت حساب امانی</th>
                  <th className="py-3 px-3">اقدام</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20">
                {contracts.map((c) => (
                  <tr key={c.id} className="hover:bg-surface-container-low/40">
                    <td className="py-4 px-3 font-mono font-bold text-on-surface">
                      {c.contract_number}
                    </td>
                    <td className="py-4 px-3 font-semibold text-primary">{c.product_title}</td>
                    <td className="py-4 px-3 text-on-surface-variant">{c.vendor_name}</td>
                    <td className="py-4 px-3 font-bold text-on-surface">
                      {Number(c.amount_toman).toLocaleString('fa-IR')} تومان
                    </td>
                    <td className="py-4 px-3">
                      <span className="font-mono bg-surface-container-high px-2 py-1 rounded-md text-[11px] text-on-surface select-all">
                        {c.license_key || 'پس از تایید صادر می‌شود'}
                      </span>
                    </td>
                    <td className="py-4 px-3">
                      <span
                        className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${
                          c.status === 'in_escrow'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {c.status === 'in_escrow' ? 'مسدود در حساب امانی' : 'آزادشده و فعال'}
                      </span>
                    </td>
                    <td className="py-4 px-3">
                      <div className="flex items-center gap-2">
                        {c.status === 'in_escrow' ? (
                          <button
                            onClick={() => handleReleaseEscrow(c.id)}
                            className="px-3 py-1.5 rounded-lg bg-secondary text-on-secondary font-semibold text-xs hover:bg-secondary/90 transition-all"
                          >
                            تایید و آزادسازی وجه
                          </button>
                        ) : (
                          <span className="text-[11px] text-secondary font-bold">
                            تحویل قطعی شد
                          </span>
                        )}
                        <button
                          onClick={() => handleOpenDispute(c)}
                          className="px-2.5 py-1.5 rounded-lg border border-error/40 text-error hover:bg-error/10 font-semibold text-xs"
                        >
                          ارجاع به داوری
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Inquiries Sent Section */}
      <div className="bg-white rounded-3xl border border-outline-variant/50 p-6 md:p-8 space-y-6 shadow-sm">
        <h2 className="text-base font-bold text-on-surface border-b border-outline-variant/30 pb-4">
          استعلام‌ها و درخواست‌های دموی ارسالی شما
        </h2>
        <div className="space-y-3">
          {inquiries.map((inq) => (
            <div
              key={inq.id}
              className="p-4 rounded-2xl bg-surface-container-low/60 border border-outline-variant/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div>
                <span className="font-bold text-on-surface">{inq.product_title}</span>
                <p className="text-on-surface-variant text-[11px] mt-0.5">{inq.message}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[11px] text-outline font-mono">
                  {new Date(inq.created_at).toLocaleDateString('fa-IR')}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-bold text-[10px]">
                  {inq.status === 'pending' ? 'در حال بررسی توسط ارائه‌دهنده' : 'پیش‌فاکتور آماده است'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dispute Modal */}
      {disputeModalOpen && disputeContract && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl border border-outline-variant/40 max-w-lg w-full p-6 md:p-8 space-y-5 shadow-level-3 relative text-right">
            <button
              onClick={() => setDisputeModalOpen(false)}
              className="absolute left-5 top-5 p-1 rounded-full text-outline hover:text-on-surface"
            >
              <span className="material-symbols-outlined text-[22px]">close</span>
            </button>

            <form onSubmit={handleSubmitDispute} className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-on-surface">
                  ثبت پرونده در مرکز داوری و حل اختلاف
                </h3>
                <p className="text-xs text-on-surface-variant mt-1">
                  قرارداد: {disputeContract.contract_number} — طرف پاسخگو: {disputeContract.vendor_name}
                </p>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-on-surface mb-1">موضوع اختلاف:</label>
                  <input
                    type="text"
                    required
                    value={disputeSubject}
                    onChange={(e) => setDisputeSubject(e.target.value)}
                    className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block font-bold text-on-surface mb-1">شرح عدم انطباق یا ادعا:</label>
                  <textarea
                    rows={4}
                    required
                    value={disputeDesc}
                    onChange={(e) => setDisputeDesc(e.target.value)}
                    placeholder="جزئیات عدم کارکرد نرم‌افزار، تاخیر در استقرار یا نقض تعهدات SLA..."
                    className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary"
                  ></textarea>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-outline-variant/30">
                <button
                  type="button"
                  onClick={() => setDisputeModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-surface-container text-on-surface text-xs font-semibold"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  disabled={disputeSubmitting}
                  className="px-6 py-2 rounded-xl bg-error text-on-error font-bold text-xs hover:bg-error/90 disabled:opacity-50"
                >
                  {disputeSubmitting ? 'در حال ثبت پرونده...' : 'ارسال به هیئت داوری'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
