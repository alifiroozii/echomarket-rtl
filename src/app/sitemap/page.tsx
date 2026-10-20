import Link from 'next/link';

export default function SitemapPage() {
  const siteStructure = [
    {
      group: '۱. پورتال عمومی و کاوش راهکارها (Public Marketplace)',
      color: 'primary',
      icon: 'storefront',
      routes: [
        {
          path: '/',
          title: 'صفحه اصلی اکومارکت',
          desc: 'ویترین فناوری، معرفی ویژه کارجور، آمار زنده، تضمین امانی و معرفی پلتفرم',
          badge: 'عمومی',
        },
        {
          path: '/explore',
          title: 'کاوش و فیلتر پیشرفته محصولات',
          desc: 'جستجوی هوشمند، فیلترهای چندوجهی بر اساس استقرار، قیمت، SLA و رتبه‌بندی',
          badge: 'کاتالوگ پویا',
        },
        {
          path: '/product/karjoor-enterprise',
          title: 'صفحه اختصاصی محصول (نمونه کارجور)',
          desc: 'جزئیات فنی، معماری، محاسبه‌گر هزینه صندلی، نظرات و فرم ارسال RFQ',
          badge: 'پویا',
        },
        {
          path: '/compare',
          title: 'ماتریس مقایسه هوشمند',
          desc: 'مقایسه پهلوبه‌پهلوی تعهدات SLA، تقویم شمسی، قیمت و مدل استقرار',
          badge: 'تعاملی',
        },
        {
          path: '/login',
          title: 'ورود و احراز هویت سازمانی',
          desc: 'درگاه ورود با رمزعبور، OTP پیامکی، سازگار با FIDO2 و ورود سریع اکانت‌های تست',
          badge: 'احراز هویت',
        },
      ],
    },
    {
      group: '۲. پورتال ارائه‌دهندگان و شرکت‌های نرم‌افزاری (Vendor Portal)',
      color: 'secondary',
      icon: 'developer_board',
      routes: [
        {
          path: '/vendor/dashboard',
          title: 'پیشخوان جامع ارائه‌دهنده',
          desc: 'رصد درآمد موجود در حساب امانی، استعلام‌های باز، نرخ تبدیل و وضعیت محصولات',
          badge: 'پنل فروشنده',
        },
        {
          path: '/vendor/inquiries',
          title: 'کارتابل استعلام‌ها و صدور پیش‌فاکتور (RFQ)',
          desc: 'بررسی نیازمندی‌های مشتریان و صدور پیش‌فاکتور رسمی با مهر دیجیتال',
          badge: 'مالی و فروش',
        },
        {
          path: '/vendor/register',
          title: 'ویزارد ثبت نرم‌افزار و راهکار',
          desc: 'فرم ۳ مرحله‌ای ثبت مشخصات، قیمت، SLA و ارسال مستقیم به دیتابیس ابری Neon',
          badge: 'ثبت محصول',
        },
      ],
    },
    {
      group: '۳. کارتابل خریداران سازمانی (Enterprise Buyer & Escrow)',
      color: 'tertiary',
      icon: 'business_center',
      routes: [
        {
          path: '/buyer/portal',
          title: 'کارتابل لایسنس‌ها و قراردادهای امانی',
          desc: 'مشاهده کلیدهای لایسنس، دکمه آزادسازی وجوه مسدودی و ثبت پرونده اختلاف',
          badge: 'حساب امانی',
        },
        {
          path: '/buyer/inquiries',
          title: 'جلسات دمو و محیط‌های سندباکس',
          desc: 'هماهنگی جلسات آنلاین پرزنتیشن با مدیران فنی و دریافت کلیدهای Sandbox تست',
          badge: 'دمو و تست',
        },
      ],
    },
    {
      group: '۴. میز نظارت کلان، داوری و امنیت ادمین (Admin & Surveillance Desk)',
      color: 'primary',
      icon: 'admin_panel_settings',
      routes: [
        {
          path: '/admin',
          title: 'میز ناظر کلان سامانه',
          desc: 'صف بررسی و تایید محصولات با یک کلیک و نظارت بر چرخه قراردادها',
          badge: 'صف ارزیابی',
        },
        {
          path: '/admin/finance',
          title: 'میز مدیریت مالی و تسویه‌حساب‌های امانی',
          desc: 'رصد GMV کلان، کارمزد پلتفرم، حساب‌های امانی مسدودی و دستور تسویه ساتنا',
          badge: 'مدیریت مالی',
        },
        {
          path: '/admin/team',
          title: 'مدیریت اعضای تیم و ماتریس RBAC',
          desc: 'کنترل دسترسی نقش‌محور، جدول مجوزهای لحظه‌ای و ثبت کارشناسان در دیتابیس Neon',
          badge: 'دسترسی سازمانی',
        },
        {
          path: '/admin/surveillance',
          title: 'پیشخوان نظارتی و احراز هویت شرکت‌ها (KYC)',
          desc: 'تایید مدارک ثبتی شرکت‌ها، رصد تاخیر دیتابیس Neon و ممیزی رویدادهای امنیتی',
          badge: 'امنیت و KYC',
        },
        {
          path: '/disputes',
          title: 'مرکز داوری و حل اختلاف خریدار و ارائه‌دهنده',
          desc: 'هیئت تخصصی مستقل کارشناسی، رسیدگی سریع و صدور رای قطعی استرداد وجه',
          badge: 'هیئت داوری',
        },
      ],
    },
    {
      group: '۵. وب‌سرویس‌ها و API‌های متصل به پایگاه داده ابری Neon',
      color: 'outline',
      icon: 'database',
      routes: [
        {
          path: '/api/products',
          title: 'API محصولات سازمانی',
          desc: 'دریافت فهرست فیلترشده و ثبت محصولات جدید با خروجی JSON',
          badge: 'REST API',
        },
        {
          path: '/api/categories',
          title: 'API دسته‌بندی‌های تخصصی',
          desc: 'فهرست ۵ حوزه فناوری همراه با تعداد راهکارهای فعال',
          badge: 'REST API',
        },
        {
          path: '/api/inquiries',
          title: 'API استعلام‌ها و صدور پیش‌فاکتور',
          desc: 'ثبت و بازیابی درخواست‌های دمو و خرید مشتریان',
          badge: 'REST API',
        },
        {
          path: '/api/contracts',
          title: 'API قراردادها و حساب امانی',
          desc: 'مدیریت وضعیت لایسنس‌ها و تغییر وضعیت حساب امانی',
          badge: 'REST API',
        },
        {
          path: '/api/disputes',
          title: 'API مرکز داوری و حل اختلاف',
          desc: 'ثبت شکایات و به‌روزرسانی آرای داوری حقوقی',
          badge: 'REST API',
        },
        {
          path: '/api/team',
          title: 'API اعضای تیم و دسترسی‌های RBAC',
          desc: 'مدیریت نقش‌ها و مجوزهای دسترسی سازمانی در دیتابیس Neon',
          badge: 'REST API',
        },
        {
          path: '/api/init-db',
          title: 'API سلامت و خودترمیمی پایگاه داده',
          desc: 'بررسی اتصال و ساخت خودکار جداول در صورت عدم وجود در Neon',
          badge: 'System API',
        },
        {
          path: '/sitemap.xml',
          title: 'نقشه استاندارد موتورهای جستجو (XML)',
          desc: 'تولید خودکار نقشه سایت برای خزنده‌های گوگل و بینگ',
          badge: 'SEO Index',
        },
      ],
    },
  ];

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-8 space-y-8">
      {/* Breadcrumb */}
      <div>
        <div className="flex items-center gap-2 text-xs text-on-surface-variant mb-2">
          <Link href="/" className="hover:text-primary">
            اکومارکت
          </Link>
          <span>/</span>
          <span className="text-on-surface font-semibold">نقشه جامع معماری سامانه</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-on-surface">
              نقشه معماری اطلاعات و نمودار کاربری (Sitemap)
            </h1>
            <p className="text-xs text-on-surface-variant mt-1">
              پوشش کامل ۱۰۰٪ صفحات طراحی شده در سیستم Google Stitch و اتصال به پایگاه داده ابری Neon
            </p>
          </div>
          <a
            href="/sitemap.xml"
            target="_blank"
            className="px-4 py-2 rounded-xl bg-surface-container-low text-primary font-bold text-xs flex items-center gap-1.5 border border-outline-variant/40 hover:bg-surface-container shrink-0"
          >
            <span className="material-symbols-outlined text-[17px]">code</span>
            <span>مشاهده فایل sitemap.xml</span>
          </a>
        </div>
      </div>

      {/* Grid of Sections */}
      <div className="space-y-8">
        {siteStructure.map((section, idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl border border-outline-variant/50 p-6 md:p-8 space-y-4 shadow-sm"
          >
            <div className="flex items-center gap-3 border-b border-outline-variant/30 pb-4">
              <div className="w-10 h-10 rounded-xl bg-surface-container-low text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-[22px]">{section.icon}</span>
              </div>
              <div>
                <h2 className="text-base font-bold text-on-surface">{section.group}</h2>
                <span className="text-[11px] text-outline font-medium">
                  {section.routes.length} مسیر و قابلیت فعال
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {section.routes.map((route, rIdx) => (
                <Link
                  key={rIdx}
                  href={route.path}
                  className="p-4 rounded-2xl bg-surface-container-low/60 hover:bg-surface-container border border-outline-variant/30 hover:border-primary/50 transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-primary group-hover:underline ltr text-left">
                        {route.path}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-white border border-outline-variant/30 text-[10px] font-semibold text-on-surface-variant">
                        {route.badge}
                      </span>
                    </div>
                    <h3 className="font-bold text-xs text-on-surface group-hover:text-primary transition-colors">
                      {route.title}
                    </h3>
                    <p className="text-[11px] text-on-surface-variant line-clamp-2 leading-relaxed">
                      {route.desc}
                    </p>
                  </div>
                  <div className="pt-3 mt-3 border-t border-outline-variant/20 flex items-center justify-between text-[11px] text-primary font-semibold">
                    <span>مشاهده صفحه</span>
                    <span className="material-symbols-outlined text-[16px] group-hover:translate-x-[-3px] transition-transform">
                      arrow_back
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
