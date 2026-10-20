'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function BuyerInquiriesPage() {
  const [demos, setDemos] = useState([
    {
      id: 'demo-1',
      product: 'سامانه مدیریت شیفت و پرسنلی کارجور (KarJoor)',
      vendor: 'گروه سامانه‌های کارجور',
      meetingTime: 'چهارشنبه ۲ آبان — ساعت ۱۰:۳۰ صبح',
      platform: 'اتاق جلسات آنلاین اکومارکت (WebRTC)',
      status: 'confirmed',
      presenter: 'مهندس حسینی (معمار ارشد محصول)',
      sandboxUrl: 'https://sandbox.karjoor.echomarket.ir',
      apiKey: 'sk_test_kj_994821a8f9',
    },
    {
      id: 'demo-2',
      product: 'پلتفرم ترید الگوریتمی و بازارگردانی تالین (Taline)',
      vendor: 'آزمایشگاه فناوری تالین',
      meetingTime: 'شنبه ۵ آبان — ساعت ۱۴:۰۰',
      platform: 'گوگل میت / اسکای‌روم',
      status: 'pending',
      presenter: 'تیم پشتیبانی مالی تالین',
      sandboxUrl: 'https://sandbox.taline.echomarket.ir',
      apiKey: 'sk_test_tl_882910b7c2',
    },
  ]);

  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [productName, setProductName] = useState('سامانه کارجور');
  const [preferredDate, setPreferredDate] = useState('شنبه آینده');
  const [participantsCount, setParticipantsCount] = useState('۳ نفر');
  const [submitting, setSubmitting] = useState(false);

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setDemos([
        ...demos,
        {
          id: 'demo-' + Date.now(),
          product: productName,
          vendor: 'ارائه‌دهنده راهکار',
          meetingTime: preferredDate + ' — ساعت ۱۱:۰۰',
          platform: 'جلسه مجازی اکومارکت',
          status: 'pending',
          presenter: 'کارشناس فنی ارائه‌دهنده',
          sandboxUrl: 'در حال تخصیص محیط تست',
          apiKey: 'به زودی ارسال می‌شود',
        },
      ]);
      setSubmitting(false);
      setScheduleModalOpen(false);
      alert('درخواست برگزاری جلسه دمو با موفقیت برای ارائه‌دهنده ارسال گردید.');
    }, 400);
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
          <Link href="/buyer/portal" className="hover:text-primary">
            کارتابل خریدار
          </Link>
          <span>/</span>
          <span className="text-on-surface font-semibold">جلسات دمو و محیط‌های سندباکس</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-on-surface">
              کارتابل جلسات دمو، استعلام‌ها و محیط‌های سندباکس خریدار
            </h1>
            <p className="text-xs text-on-surface-variant mt-1">
              تنظیم جلسات آنلاین بررسی فنی، تست آزمایشی نرم‌افزارها و دریافت کلیدهای Sandbox
            </p>
          </div>
          <button
            onClick={() => setScheduleModalOpen(true)}
            className="px-5 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-xs hover:bg-primary-container transition-all flex items-center gap-2 shadow-sm shadow-primary/20 shrink-0"
          >
            <span className="material-symbols-outlined text-[18px]">calendar_add_on</span>
            <span>درخواست جلسه دموی جدید</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-outline-variant/40 p-5 space-y-1 shadow-sm">
          <span className="text-xs text-on-surface-variant">جلسات دموی رزرو شده</span>
          <div className="text-2xl font-extrabold text-on-surface">{demos.length} جلسه</div>
          <span className="text-[11px] text-primary font-medium">برگزاری آنلاین با ضبط ویدیو</span>
        </div>

        <div className="bg-white rounded-2xl border border-outline-variant/40 p-5 space-y-1 shadow-sm">
          <span className="text-xs text-on-surface-variant">محیط‌های سندباکس فعال</span>
          <div className="text-2xl font-extrabold text-secondary">۲ محیط تستی</div>
          <span className="text-[11px] text-secondary font-medium">دسترسی رایگان ۳۰ روزه</span>
        </div>

        <div className="bg-white rounded-2xl border border-outline-variant/40 p-5 space-y-1 shadow-sm">
          <span className="text-xs text-on-surface-variant">مشاوره فنی رایگان اکومارکت</span>
          <div className="text-2xl font-extrabold text-tertiary">فعال</div>
          <span className="text-[11px] text-outline font-medium">حضور ناظر بی‌طرف در جلسات دمو</span>
        </div>
      </div>

      {/* Demo Sessions List */}
      <div className="bg-white rounded-3xl border border-outline-variant/50 p-6 md:p-8 space-y-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-outline-variant/30 pb-4">
          <div>
            <h2 className="text-base font-bold text-on-surface">جلسات هماهنگ‌شده با ارائه‌دهندگان</h2>
            <p className="text-xs text-on-surface-variant">
              اتصال مستقیم به محیط دمو و بررسی تطبیق فنی نیازمندی‌های سازمان شما
            </p>
          </div>
          <span className="px-3 py-1 rounded-full bg-secondary-container/50 text-secondary text-xs font-bold">
            پشتیبانی از اتاق جلسات اختصاصی
          </span>
        </div>

        <div className="space-y-4">
          {demos.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-surface-container-low/50 border border-outline-variant/40 space-y-4 text-xs hover:border-primary/40 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-outline-variant/20 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-fixed/60 text-primary font-bold flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[20px]">videocam</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-on-surface">{item.product}</h3>
                    <div className="text-[11px] text-on-surface-variant mt-0.5">
                      ارائه‌دهنده: <span className="font-semibold text-primary">{item.vendor}</span> — ارائه‌دهنده جلسه: {item.presenter}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full font-bold text-[10px] ${
                      item.status === 'confirmed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {item.status === 'confirmed' ? 'جلسه تایید شده' : 'در انتظار تایید ساعت'}
                  </span>
                  <button
                    onClick={() => alert(`ورود به اتاق کنفرانس آنلاین برای ${item.product}`)}
                    className="px-4 py-2 rounded-xl bg-primary text-on-primary font-bold text-xs hover:bg-primary-container transition-all flex items-center gap-1.5 shadow-sm shadow-primary/20"
                  >
                    <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                    <span>ورود به اتاق جلسه</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-white p-3 rounded-xl border border-outline-variant/20">
                <div>
                  <span className="text-[11px] text-outline block">زمان برگزاری:</span>
                  <span className="font-bold text-on-surface">{item.meetingTime}</span>
                </div>
                <div>
                  <span className="text-[11px] text-outline block">پلتفرم نشست:</span>
                  <span className="font-semibold text-on-surface">{item.platform}</span>
                </div>
                <div>
                  <span className="text-[11px] text-outline block">آدرس سندباکس تست:</span>
                  <a
                    href={item.sandboxUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-primary font-semibold hover:underline block truncate ltr text-right"
                  >
                    {item.sandboxUrl}
                  </a>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/70 border border-outline-variant/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px]">
                <div className="flex items-center gap-2">
                  <span className="text-outline">کلید API تستی (Sandbox Key):</span>
                  <span className="font-mono bg-surface-container-high px-2 py-0.5 rounded select-all font-bold">
                    {item.apiKey}
                  </span>
                </div>
                <span className="text-secondary font-medium">اعتبار تا ۳۰ روز آینده</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Schedule Modal */}
      {scheduleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl border border-outline-variant/40 max-w-lg w-full p-6 md:p-8 space-y-5 shadow-level-3 relative text-right">
            <button
              onClick={() => setScheduleModalOpen(false)}
              className="absolute left-5 top-5 p-1 rounded-full text-outline hover:text-on-surface"
            >
              <span className="material-symbols-outlined text-[22px]">close</span>
            </button>

            <form onSubmit={handleScheduleSubmit} className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-on-surface">
                  درخواست برگزاری جلسه دمو و تست عملیاتی
                </h3>
                <p className="text-xs text-on-surface-variant mt-1">
                  هماهنگی جلسه با مدیران فنی ارائه‌دهنده نرم‌افزار
                </p>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-on-surface mb-1">محصول مورد نظر:</label>
                  <select
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-primary"
                  >
                    <option value="سامانه کارجور (مدیریت شیفت)">سامانه کارجور (مدیریت شیفت)</option>
                    <option value="موتور معاملاتی تالین (فین‌تک)">موتور معاملاتی تالین (فین‌تک)</option>
                    <option value="مدل زبانی آوا (هوش مصنوعی)">مدل زبانی آوا (هوش مصنوعی)</option>
                    <option value="آبجکت استوریج دیاکو (کلاود)">آبجکت استوریج دیاکو (کلاود)</option>
                    <option value="درگاه امنیت کیوان (IAM)">درگاه امنیت کیوان (IAM)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-on-surface mb-1">روز و بازه زمانی پیشنهادی:</label>
                  <input
                    type="text"
                    required
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    placeholder="مثال: دوشنبه آینده ساعت ۱۰ صبح"
                    className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block font-bold text-on-surface mb-1">
                    تعداد افراد حاضر از سمت سازمان خریدار:
                  </label>
                  <input
                    type="text"
                    value={participantsCount}
                    onChange={(e) => setParticipantsCount(e.target.value)}
                    placeholder="مثال: ۳ نفر (مدیر فنی، مسئول کارگزینی، سرپرست IT)"
                    className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-outline-variant/30">
                <button
                  type="button"
                  onClick={() => setScheduleModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-surface-container text-on-surface text-xs font-semibold"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2 rounded-xl bg-primary text-on-primary font-bold text-xs hover:bg-primary-container disabled:opacity-50"
                >
                  {submitting ? 'در حال ارسال...' : 'ارسال درخواست به ارائه‌دهنده'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
