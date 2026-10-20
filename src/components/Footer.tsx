import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-surface-container-low border-t border-outline-variant/50 pt-16 pb-12 mt-20 text-on-surface">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-outline-variant/30">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-on-primary shadow-sm shadow-primary/30">
                <span className="material-symbols-outlined text-[24px]">hub</span>
              </div>
              <div className="flex flex-col text-right">
                <span className="text-[20px] text-primary font-bold tracking-tight">اکومارکت</span>
                <span className="text-xs text-on-surface-variant font-medium">
                  Persian Enterprise Marketplace & AI Hub
                </span>
              </div>
            </div>
            <p className="text-sm text-on-surface-variant leading-relaxed max-w-md">
              اکومارکت نخستین بستر تخصصی B2B ارزیابی فنی، استعلام قیمت، مقایسه بی‌طرفانه و ضمانت
              امانی نرم‌افزارهای سازمانی، زیرساخت ابری و هوش مصنوعی در ایران است. کلیه معاملات و
              لایسنس‌ها تحت پروتکل داوری و حساب امانی تضمین می‌شوند.
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs text-on-surface-variant">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high border border-outline-variant/30 font-medium">
                <span className="w-2 h-2 rounded-full bg-secondary"></span>
                پایگاه داده زنده Neon Postgres
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high border border-outline-variant/30 font-medium">
                <span className="material-symbols-outlined text-primary text-[15px]">verified_user</span>
                ضمانت امانی ۹۹.۹٪ SLA
              </span>
            </div>
          </div>

          {/* Solutions Column */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-on-surface">راهکارهای سازمانی</h4>
            <ul className="space-y-2 text-xs text-on-surface-variant">
              <li>
                <Link href="/explore?category=crm-hr" className="hover:text-primary transition-colors">
                  سامانه مدیریت شیفت و کارجور
                </Link>
              </li>
              <li>
                <Link href="/explore?category=ai-ml" className="hover:text-primary transition-colors">
                  مدل‌های زبانی فارسی و هوش مصنوعی
                </Link>
              </li>
              <li>
                <Link href="/explore?category=fintech-erp" className="hover:text-primary transition-colors">
                  موتورهای تریدینگ و الگوریتم تالین
                </Link>
              </li>
              <li>
                <Link href="/explore?category=cloud-devops" className="hover:text-primary transition-colors">
                  ذخیره‌سازی ابری و آبجکت استوریج
                </Link>
              </li>
              <li>
                <Link href="/explore?category=security-auth" className="hover:text-primary transition-colors">
                  احراز هویت زیروتراست و IAM
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform Portal Column */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-on-surface">بخش‌های سامانه</h4>
            <ul className="space-y-2 text-xs text-on-surface-variant">
              <li>
                <Link href="/explore" className="hover:text-primary transition-colors">
                  کاوش و فیلتر پیشرفته محصولات
                </Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-primary transition-colors">
                  ماتریس مقایسه چندجانبه
                </Link>
              </li>
              <li>
                <Link href="/vendor/register" className="hover:text-primary transition-colors">
                  ثبت‌نام ارائه‌دهنده نرم‌افزار
                </Link>
              </li>
              <li>
                <Link href="/vendor/dashboard" className="hover:text-primary transition-colors">
                  پیشخوان مدیریت فروشندگان
                </Link>
              </li>
              <li>
                <Link href="/buyer/portal" className="hover:text-primary transition-colors">
                  کارتابل استعلام‌ها و قراردادهای امانی
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-primary transition-colors">
                  میز نظارت و داوری حل اختلاف
                </Link>
              </li>
            </ul>
          </div>

          {/* Trust & Escrow Column */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-on-surface">اعتبار و امنیت</h4>
            <div className="p-4 rounded-2xl bg-white border border-outline-variant/40 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-secondary">
                <span className="material-symbols-outlined text-[18px]">verified</span>
                پروتکل حساب امانی (Escrow)
              </div>
              <p className="text-[11px] text-on-surface-variant leading-relaxed">
                مبلغ پیش‌فاکتور تا زمان استقرار موفق و تایید کارشناس خریدار در حساب امانی اکومارکت
                مسدود می‌ماند.
              </p>
              <div className="text-[10px] text-outline border-t border-outline-variant/30 pt-2 flex items-center justify-between">
                <span>تضمین استرداد ۱۰۰٪ وجه</span>
                <span className="font-mono text-primary">SLA Guaranteed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-on-surface-variant">
          <p>© ۲۰۲۶ اکومارکت (EchoMarket) — تمامی حقوق برای پلتفرم نرم‌افزارهای سازمانی محفوظ است.</p>
          <div className="flex items-center gap-6">
            <span className="text-outline">طراحی منطبق بر Stitch Design System</span>
            <span className="text-outline">•</span>
            <span className="text-outline">دیتابیس ابری Neon Serverless Postgres</span>
            <span className="text-outline">•</span>
            <span className="text-outline">هاستینگ Vercel Edge</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
