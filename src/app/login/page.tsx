'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [emailOrUser, setEmailOrUser] = useState('');
  const [password, setPassword] = useState('');
  const [authMode, setAuthMode] = useState<'password' | 'otp'>('password');
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  // Quick One-Click Demo Role Switcher
  const handleQuickLogin = (role: 'admin' | 'vendor' | 'buyer') => {
    setLoading(true);
    setTimeout(() => {
      if (role === 'admin') {
        router.push('/admin');
      } else if (role === 'vendor') {
        router.push('/vendor/dashboard');
      } else {
        router.push('/buyer/portal');
      }
    }, 400);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (emailOrUser.toLowerCase().includes('admin') || emailOrUser === 'ali' || emailOrUser.includes('alii.firooziii')) {
        router.push('/admin');
      } else if (emailOrUser.toLowerCase().includes('vendor')) {
        router.push('/vendor/dashboard');
      } else {
        router.push('/buyer/portal');
      }
    }, 500);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 md:px-8">
      <div className="w-full max-w-5xl bg-white rounded-3xl border border-outline-variant/50 shadow-level-2 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        {/* Right Column: Form */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6">
          <div>
            {/* Header Brand */}
            <div className="flex items-center justify-between mb-8">
              <Link href="/" className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-on-primary shadow-sm shadow-primary/30">
                  <span className="material-symbols-outlined text-[24px]">hub</span>
                </div>
                <div className="flex flex-col text-right">
                  <span className="text-lg text-primary font-bold">اکومارکت</span>
                  <span className="text-[11px] text-on-surface-variant font-medium">
                    درگاه ورود امن سازمانی
                  </span>
                </div>
              </Link>
              <span className="px-3 py-1 rounded-full bg-secondary-container/50 text-secondary text-xs font-bold">
                SSO & FIDO2
              </span>
            </div>

            <div className="space-y-2 mb-6">
              <h1 className="text-xl md:text-2xl font-bold text-on-surface">ورود به پنل کاربری</h1>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                لطفاً اطلاعات سازمانی خود را وارد کنید یا از حساب‌های تست پیش‌فرض استفاده نمایید.
              </p>
            </div>

            {/* Quick Demo Credentials Box */}
            <div className="p-4 rounded-2xl bg-surface-container-low/80 border border-outline-variant/40 space-y-3 mb-6">
              <div className="flex items-center justify-between text-xs font-bold text-on-surface">
                <span className="flex items-center gap-1.5 text-primary">
                  <span className="material-symbols-outlined text-[17px]">key</span>
                  حساب‌های آزمایشی فعال پلتفرم:
                </span>
                <span className="text-[10px] text-outline font-normal">کلیک جهت ورود سریع</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickLogin('admin')}
                  className="p-2.5 rounded-xl bg-white border border-outline-variant/40 hover:border-primary text-right text-xs transition-all hover:shadow-sm"
                >
                  <span className="block font-bold text-primary">مدیر ارشد (Admin)</span>
                  <span className="block text-[10px] text-outline font-mono mt-0.5">ali / Bahar@1393</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickLogin('vendor')}
                  className="p-2.5 rounded-xl bg-white border border-outline-variant/40 hover:border-primary text-right text-xs transition-all hover:shadow-sm"
                >
                  <span className="block font-bold text-secondary">ارائه‌دهنده (Vendor)</span>
                  <span className="block text-[10px] text-outline font-mono mt-0.5">vendor_demo / 1234</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickLogin('buyer')}
                  className="p-2.5 rounded-xl bg-white border border-outline-variant/40 hover:border-primary text-right text-xs transition-all hover:shadow-sm"
                >
                  <span className="block font-bold text-tertiary">خریدار (Buyer)</span>
                  <span className="block text-[10px] text-outline font-mono mt-0.5">buyer_demo / 1234</span>
                </button>
              </div>
            </div>

            {/* Main Form */}
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-on-surface block">
                  نام کاربری، شماره تماس یا ایمیل سازمانی:
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={emailOrUser}
                    onChange={(e) => setEmailOrUser(e.target.value)}
                    placeholder="مثال: ali یا sadeghi@foulad-co.ir"
                    className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-primary"
                  />
                  <span className="material-symbols-outlined absolute left-3 top-2.5 text-outline text-[18px]">
                    person
                  </span>
                </div>
              </div>

              {authMode === 'password' ? (
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-on-surface">کلمه عبور:</label>
                    <button
                      type="button"
                      onClick={() => setAuthMode('otp')}
                      className="text-[11px] font-semibold text-primary hover:underline"
                    >
                      ورود با رمز یکبارمصرف (OTP)
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-primary"
                    />
                    <span className="material-symbols-outlined absolute left-3 top-2.5 text-outline text-[18px]">
                      lock
                    </span>
                  </div>
                </div>
              ) : (
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-on-surface">کد تایید پیامکی (OTP):</label>
                    <button
                      type="button"
                      onClick={() => setAuthMode('password')}
                      className="text-[11px] font-semibold text-primary hover:underline"
                    >
                      ورود با رمز عبور ثابت
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      placeholder="کد ۵ رقمی"
                      className="flex-1 bg-surface-container-low border border-outline-variant/50 rounded-xl px-3 py-2.5 text-xs text-center font-mono tracking-widest focus:outline-none focus:border-primary"
                    />
                    <button
                      type="button"
                      onClick={() => setOtpSent(true)}
                      className="px-4 py-2.5 rounded-xl bg-surface-container text-on-surface font-semibold text-xs hover:bg-surface-container-high shrink-0"
                    >
                      {otpSent ? 'ارسال مجدد (۵۸)' : 'دریافت کد'}
                    </button>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-primary text-on-primary font-bold text-xs hover:bg-primary-container transition-all shadow-level-1 shadow-primary/25 disabled:opacity-50"
              >
                {loading ? 'در حال تایید و ورود...' : 'ورود به سامانه'}
              </button>
            </form>
          </div>

          <div className="pt-4 border-t border-outline-variant/30 text-center text-xs text-on-surface-variant">
            حساب کاربری ندارید؟{' '}
            <Link href="/vendor/register" className="text-primary font-bold hover:underline">
              ثبت‌نام ارائه‌دهنده در ویزارد
            </Link>
          </div>
        </div>

        {/* Left Column: Institutional Info & Security Badges */}
        <div className="lg:col-span-5 bg-gradient-to-br from-primary to-primary-container text-on-primary p-6 sm:p-10 flex flex-col justify-between space-y-8">
          <div className="space-y-4">
            <span className="px-3 py-1 rounded-full bg-white/20 text-white text-[11px] font-bold inline-block">
              زیرساخت اعتماد ملی B2B
            </span>
            <h2 className="text-2xl font-extrabold leading-tight">
              درگاه یکپارچه مبادلات فناوری و قراردادهای امانی
            </h2>
            <p className="text-xs text-on-primary/80 leading-relaxed">
              کلیه دسترسی‌ها در اکومارکت تحت ممیزی سیستم کنترل دسترسی مبتنی بر نقش (RBAC) و رمزنگاری
              اندمینی صورت می‌پذیرد.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center gap-3">
              <span className="material-symbols-outlined text-[24px]">verified_user</span>
              <div>
                <span className="font-bold block">احراز هویت چند عاملی (MFA)</span>
                <span className="text-[11px] text-white/80">سازگار با سخت‌افزارهای FIDO2 و OTP</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center gap-3">
              <span className="material-symbols-outlined text-[24px]">shield</span>
              <div>
                <span className="font-bold block">پروتکل امانی بانک مرکزی</span>
                <span className="text-[11px] text-white/80">حفاظت از منابع مالی تا تحویل نهایی نرم‌افزار</span>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-white/70 border-t border-white/20 pt-4 flex justify-between">
            <span>نسخه سامانه: v1.4.0</span>
            <Link href="/sitemap" className="underline hover:text-white">
              مشاهده نقشه معماری سامانه
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
