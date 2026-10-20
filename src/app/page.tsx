import Link from 'next/link';
import { query, Product, Category } from '@/lib/db';

export const dynamic = 'force-dynamic';

async function getInitialData(): Promise<{ products: Product[]; categories: Category[] }> {
  try {
    const products = await query<Product>(`
      SELECT p.*, c.name_fa as category_name_fa 
      FROM echomarket_products p
      LEFT JOIN echomarket_categories c ON p.category_id = c.id
      WHERE p.status = 'published'
      ORDER BY p.rating DESC, p.reviews_count DESC;
    `);

    const categories = await query<Category>(`
      SELECT * FROM echomarket_categories
      ORDER BY count DESC;
    `);

    return { products, categories };
  } catch (error) {
    console.error('Failed to load initial data from Neon DB:', error);
    return { products: [], categories: [] };
  }
}

export default async function HomePage() {
  const { products, categories } = await getInitialData();

  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* ── 1. Hero Section ── */}
      <section className="relative overflow-hidden pt-12 pb-20 bg-gradient-to-b from-surface-container-low/70 via-background to-background border-b border-outline-variant/30">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-6">
            {/* Pill Announcement */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-highest/80 border border-outline-variant/50 text-xs font-semibold text-primary shadow-sm">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
              <span>اکوسیستم فناوری و هوش مصنوعی B2B ایران</span>
              <span className="text-outline">|</span>
              <span className="text-on-surface-variant font-normal">
                پشتیبانی از پروتکل پرداخت امانی (Escrow)
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-on-surface tracking-tight leading-[1.25] md:leading-[1.2]">
              بازار جامع فناوری، زیرساخت ابری و{' '}
              <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-container">
                هوش مصنوعی سازمانی
              </span>
            </h1>

            {/* Description */}
            <p className="text-sm md:text-lg text-on-surface-variant max-w-2xl leading-relaxed">
              ارزیابی بی‌طرفانه، استعلام مستقیم قیمت، تست دموی عملیاتی و خرید امن لایسنس نرم‌افزارهای
              پیشرو ایران با تضمین استرداد وجه و داوری حقوقی مستقل.
            </p>

            {/* Omni Search Bar */}
            <div className="w-full max-w-2xl mt-4">
              <form
                action="/explore"
                method="GET"
                className="relative flex items-center bg-white rounded-2xl border border-outline-variant/60 shadow-level-2 focus-within:ring-4 focus-within:ring-primary/15 focus-within:border-primary transition-all p-2 gap-2"
              >
                <div className="flex items-center gap-2 pl-3 pr-2 text-on-surface-variant flex-1">
                  <span className="material-symbols-outlined text-primary text-[26px]">search</span>
                  <input
                    type="text"
                    name="search"
                    placeholder="جستجوی سامانه شیفت، مدل زبانی، موتور ترید، ذخیره‌سازی ابری..."
                    className="w-full bg-transparent text-sm text-on-surface placeholder-outline focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-primary text-on-primary font-semibold text-xs hover:bg-primary-container transition-all flex items-center gap-2 shadow-sm shadow-primary/30 shrink-0"
                >
                  <span>کاوش راهکارها</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                </button>
              </form>
            </div>

            {/* Trust Metrics Pill Row */}
            <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs text-on-surface-variant">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[20px]">verified</span>
                <span>بیش از ۱,۲۵۰ استعلام موفق سازمانی</span>
              </div>
              <div className="h-4 w-px bg-outline-variant/40 hidden sm:block"></div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">
                  security_update_good
                </span>
                <span>تضمین آپ‌تایم ۹۹.۹٪ SLA</span>
              </div>
              <div className="h-4 w-px bg-outline-variant/40 hidden sm:block"></div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary text-[20px]">lock</span>
                <span>حساب امانی تا تحویل نهایی لایسنس</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Category Carousel / Grid ── */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 w-full">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-on-surface">دسته‌بندی‌های تخصصی</h2>
            <p className="text-xs text-on-surface-variant mt-1">
              راهکارهای نرم‌افزاری بر اساس نیاز زیرساختی سازمان شما
            </p>
          </div>
          <Link
            href="/explore"
            className="text-xs font-semibold text-primary hover:text-primary-container flex items-center gap-1"
          >
            <span>مشاهده همه دسته‌ها</span>
            <span className="material-symbols-outlined text-[16px]">chevron_left</span>
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/explore?category=${cat.id}`}
              className="group p-5 rounded-2xl bg-white border border-outline-variant/50 hover:border-primary/50 hover:shadow-level-2 transition-all flex flex-col justify-between gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-surface-container-low text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined text-[26px]">{cat.icon}</span>
              </div>
              <div>
                <h3 className="font-bold text-xs md:text-sm text-on-surface group-hover:text-primary transition-colors">
                  {cat.name_fa}
                </h3>
                <p className="text-[11px] text-on-surface-variant line-clamp-2 mt-1">
                  {cat.description}
                </p>
              </div>
              <div className="flex items-center justify-between text-[11px] font-medium text-outline pt-2 border-t border-outline-variant/30">
                <span>{cat.count} راهکار فعال</span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-[-4px] transition-transform">
                  arrow_back
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── 3. Featured Hero Showcase (KarJoor) ── */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 w-full">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-surface-container-low via-white to-surface-container border border-outline-variant/60 p-6 md:p-10 shadow-level-1">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Col (Text & CTA) */}
            <div className="lg:col-span-7 space-y-5 text-right">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container/40 border border-secondary/20 text-xs font-bold text-secondary">
                <span className="material-symbols-outlined text-[16px]">stars</span>
                راهکار منتخب ماه اکومارکت
              </div>

              <h3 className="text-2xl md:text-3xl font-extrabold text-on-surface leading-tight">
                سامانه مدیریت شیفت و نیروی کار کارجور (KarJoor)
              </h3>

              <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed">
                راهکار سازمانی پیشرفته برای برنامه‌ریزی الگوریتمی شیفت‌های پرسنلی، ثبت تردد هوشمند
                ژئوفنسینگ و محاسبه آنلاین کارکرد منطبق بر ضوابط اداره کار ایران. قابل پیاده‌سازی بر
                روی زیرساخت ابری یا سرورهای محلی سازمان.
              </p>

              {/* Key Highlights */}
              <div className="grid grid-cols-2 gap-3 py-2 text-xs">
                <div className="flex items-center gap-2 text-on-surface">
                  <span className="material-symbols-outlined text-secondary text-[18px]">check_circle</span>
                  <span>الگوریتم خودکار تخصیص نوبت کاری</span>
                </div>
                <div className="flex items-center gap-2 text-on-surface">
                  <span className="material-symbols-outlined text-secondary text-[18px]">check_circle</span>
                  <span>اتصال به نرم‌افزارهای حقوق و دستمزد</span>
                </div>
                <div className="flex items-center gap-2 text-on-surface">
                  <span className="material-symbols-outlined text-secondary text-[18px]">check_circle</span>
                  <span>گزارشات تحلیلی تاخیر و غیبت</span>
                </div>
                <div className="flex items-center gap-2 text-on-surface">
                  <span className="material-symbols-outlined text-secondary text-[18px]">check_circle</span>
                  <span>پشتیبانی کامل از تقویم جلالی</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/product/karjoor-enterprise"
                  className="px-6 py-3 rounded-xl bg-primary text-on-primary font-bold text-xs hover:bg-primary-container transition-all flex items-center gap-2 shadow-sm shadow-primary/25"
                >
                  <span className="material-symbols-outlined text-[18px]">assignment_turned_in</span>
                  <span>بررسی فنی و استعلام کارجور</span>
                </Link>
                <a
                  href="https://kar-aan.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-xl bg-white border border-outline-variant/60 text-on-surface font-semibold text-xs hover:bg-surface-container-low transition-all flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                  <span>مشاهده دموی زنده</span>
                </a>
              </div>
            </div>

            {/* Right Col (Visual Spec Card) */}
            <div className="lg:col-span-5 bg-surface-container-lowest/90 rounded-2xl border border-outline-variant/40 p-6 space-y-4 shadow-level-2">
              <div className="flex items-center justify-between border-b border-outline-variant/30 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary-fixed/50 flex items-center justify-center text-primary font-extrabold text-sm">
                    KJ
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-on-surface">کارجور — نسخه Enterprise</h4>
                    <span className="text-[11px] text-secondary font-medium">
                      توسعه‌دهنده دارای نماد اعتماد
                    </span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-secondary-container/40 text-secondary text-xs font-bold">
                  ★ ۴.۹۵
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-1 border-b border-outline-variant/20">
                  <span className="text-on-surface-variant">مدل استقرار:</span>
                  <span className="font-semibold text-on-surface">هیبرید (ابری / On-Premise)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-outline-variant/20">
                  <span className="text-on-surface-variant">حداکثر پرسنل:</span>
                  <span className="font-semibold text-on-surface">نامحدود (بیش از ۱۰,۰۰۰ پرسنل)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-outline-variant/20">
                  <span className="text-on-surface-variant">ضمانت آپ‌تایم (SLA):</span>
                  <span className="font-semibold text-secondary">۹۹.۹۵٪ با خسارت تاخیر</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-on-surface-variant">شروع قیمت سالانه:</span>
                  <span className="font-bold text-primary text-sm">۴۵,۰۰۰,۰۰۰ تومان</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/compare?p1=prod-karjoor&p2=prod-taline-fintech"
                  className="w-full py-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container text-primary font-semibold text-xs flex items-center justify-center gap-2 border border-outline-variant/30 transition-colors"
                >
                  <span className="material-symbols-outlined text-[17px]">compare_arrows</span>
                  <span>افزودن به ماتریس مقایسه</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Live Products Catalog from Neon DB ── */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl md:text-2xl font-bold text-on-surface">
                ویترین راهکارهای تاییدشده سازمانی
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-secondary-container/50 text-secondary text-[11px] font-bold">
                متصل به پایگاه داده Neon
              </span>
            </div>
            <p className="text-xs text-on-surface-variant mt-1">
              محصولات دارای گواهینامه اعتبارسنجی فنی، کد بازبینی شده و آماده استقرار
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/explore"
              className="px-4 py-2 rounded-xl bg-white border border-outline-variant/50 text-xs font-semibold text-on-surface hover:text-primary transition-all flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[17px]">tune</span>
              <span>فیلتر پیشرفته</span>
            </Link>
            <Link
              href="/compare"
              className="px-4 py-2 rounded-xl bg-surface-container-low text-xs font-semibold text-primary hover:bg-surface-container transition-all flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[17px]">swap_horiz</span>
              <span>ماتریس مقایسه</span>
            </Link>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((prod) => (
            <div
              key={prod.id}
              className="bg-white rounded-2xl border border-outline-variant/50 p-6 flex flex-col justify-between hover:shadow-level-2 hover:border-primary/40 hover:-translate-y-1 transition-all group duration-200"
            >
              <div className="space-y-4">
                {/* Header Slot: Logo + Rating */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={prod.vendor_logo}
                      alt={prod.vendor_name}
                      className="w-12 h-12 rounded-xl object-cover border border-outline-variant/30"
                    />
                    <div>
                      <h3 className="font-bold text-sm text-on-surface group-hover:text-primary transition-colors line-clamp-1">
                        {prod.title_fa}
                      </h3>
                      <div className="flex items-center gap-1.5 text-[11px] text-on-surface-variant mt-0.5">
                        <span>{prod.vendor_name}</span>
                        {prod.vendor_verified && (
                          <span
                            className="material-symbols-outlined text-secondary text-[15px]"
                            title="تایید هویت شده"
                          >
                            verified
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-surface-container-low text-[11px] font-bold text-on-surface">
                    <span className="material-symbols-outlined text-amber-500 text-[15px]">
                      star
                    </span>
                    <span>{prod.rating}</span>
                  </div>
                </div>

                {/* Summary */}
                <p className="text-xs text-on-surface-variant line-clamp-2 leading-relaxed">
                  {prod.summary}
                </p>

                {/* Tags / Pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-[10px] text-on-surface-variant font-medium">
                    {prod.deployment}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-[10px] text-on-surface-variant font-medium">
                    SLA: {prod.sla_guarantee}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-[10px] text-on-surface-variant font-medium">
                    {prod.pricing_model}
                  </span>
                </div>
              </div>

              {/* Price & Action Footer */}
              <div className="pt-5 mt-5 border-t border-outline-variant/30 flex items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] text-outline block">هزینه پایه:</span>
                  <span className="text-xs font-bold text-primary">
                    {Number(prod.price_toman).toLocaleString('fa-IR')} تومان
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/product/${prod.slug}`}
                    className="px-3 py-1.5 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface font-semibold text-xs transition-colors"
                  >
                    جزئیات
                  </Link>
                  <Link
                    href={`/product/${prod.slug}?inquire=true`}
                    className="px-3.5 py-1.5 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-semibold text-xs transition-all shadow-sm shadow-primary/20"
                  >
                    استعلام
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. Escrow & Security Trust Architecture ── */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 w-full">
        <div className="bg-surface-container-low/80 rounded-3xl border border-outline-variant/40 p-8 md:p-12">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
            <h2 className="text-2xl font-bold text-on-surface">
              امنیت مبادلات با پروتکل تضمین امانی اکومارکت
            </h2>
            <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed">
              راهکارهای سازمانی حساس نیازمند اطمینان مطلق هستند. فرایند ۴ مرحله‌ای اکومارکت ریسک خرید
              نرم‌افزار را به صفر می‌رساند.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-outline-variant/40 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                ۱
              </div>
              <h4 className="font-bold text-sm text-on-surface">استعلام و صدور پیش‌فاکتور</h4>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                درخواست فنی خود را ثبت کنید؛ ارائه‌دهنده در کمتر از ۲۴ ساعت پیشنهاد قیمت و SLA رسمی
                ارائه می‌کند.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-outline-variant/40 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center font-bold">
                ۲
              </div>
              <h4 className="font-bold text-sm text-on-surface">واریز به حساب امانی</h4>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                مبلغ قرارداد تا استقرار کامل و انجام تست‌های پذیرش در حساب امن اکومارکت قفل
                می‌شود.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-outline-variant/40 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-tertiary/10 text-tertiary flex items-center justify-center font-bold">
                ۳
              </div>
              <h4 className="font-bold text-sm text-on-surface">تست قبولی و صدور لایسنس</h4>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                پس از نصب، تحویل کلید لایسنس و تایید مدیر فنی خریدار، فرآیند تسویه با ارائه‌دهنده
                آغاز می‌گردد.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-outline-variant/40 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-primary-container/10 text-primary-container flex items-center justify-center font-bold">
                ۴
              </div>
              <h4 className="font-bold text-sm text-on-surface">پشتیبانی و داوری حقوقی</h4>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                در صورت بروز هرگونه مغایرت با تعهدات SLA، مرکز حل اختلاف مستقل وجه پرداختی را
                مسترد می‌کند.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. Provider Registration CTA ── */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 w-full">
        <div className="rounded-3xl bg-gradient-to-r from-primary to-primary-container text-on-primary p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-level-3">
          <div className="space-y-3 text-right max-w-2xl">
            <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              آیا ارائه‌دهنده نرم‌افزار یا سرویس هوش مصنوعی هستید؟
            </h3>
            <p className="text-xs md:text-sm text-on-primary-container leading-relaxed">
              محصول نرم‌افزاری خود را در صف بررسی کارشناسان اکومارکت ثبت کنید و به شبکه بیش از
              ۱۰,۰۰۰ مدیر سازمان، هلدینگ و شرکت‌های بزرگ معرفی شوید.
            </p>
          </div>
          <Link
            href="/vendor/register"
            className="px-8 py-4 rounded-2xl bg-white text-primary font-bold text-sm hover:bg-surface-container-low transition-all shadow-level-2 shrink-0 flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[20px]">rocket_launch</span>
            <span>ثبت رایگان محصول در ویزارد</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
