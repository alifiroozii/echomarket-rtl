import Link from 'next/link';

export default function SitemapPage() {
  const siteStructure = [
    {
      group: 'پورتال عمومی و کشف راهکارها (Public Marketplace)',
      color: 'primary',
      icon: 'storefront',
      routes: [
        {
          path: '/',
          title: 'صفحه اصلی اکومارکت',
          desc: 'ویترین فناوری، معرفی ویژه کارجور، آمار زنده و تضمین امانی',
          badge: 'عمومی',
        },
        {
          path: '/explore',
          title: 'کاوش و فیلتر پیشرفته محصولات',
          desc: 'جستجوی هوشمند، فیلترهای چندوجهی بر اساس استقرار، قیمت و رتبه‌بندی',
          badge: 'پویا',
        },
        {
          path: '/product/karjoor-enterprise',
          title: 'صفحه اختصاصی محصول (نمونه کارجور)',
          desc: 'جزئیات فنی، معماری، محاسبه‌گر هزینه صندلی و فرم ارسال RFQ',
          badge: 'پویا',
        },
        {
          path: '/compare',
          title: 'ماتریس مقایسه هوشمند',
          desc: 'مقایسه پهلوبه‌پهلوی تعهدات SLA، پشتیبانی تقویم شمسی، قیمت و استقرار',
          badge: 'تعاملی',
        },
        {
          path: '/login',
          title: 'ورود و احراز هویت سازمانی',
          desc: 'درگاه ورود با نام‌کاربری/رمزعبور، رمز یکبارمصرف و سوئیچ سریع حساب‌های تست',
          badge: 'احراز هویت',
        },
      ],
    },
    {
      group: 'پورتال ارائه‌دهندگان و توسعه‌دهندگان (Vendor Portal)',
      color: 'secondary',
      icon: 'developer_board',
      routes: [
        {
          path: '/vendor/dashboard',
          title: 'پیشخوان جامع ارائه‌دهنده',
          desc: 'رصد درآمد موجود در حساب امانی، استعلام‌های باز خریداران و صدور پیش‌فاکتور',
          badge: 'پنل فروشنده',
        },
        {
          path: '/vendor/register',
          title: 'ویزارد ثبت نرم‌افزار و راهکار',
          desc: 'فرم ۳ مرحله‌ای ثبت مشخصات، قیمت، SLA و ارسال مستقیم به دیتابیس ابری Neon',
          badge: 'فرم تعاملی',
        },
      ],
    },
    {
      group: 'کارتابل سازمانی خریداران (Buyer Portal & Escrow)',
      color: 'tertiary',
      icon: 'business_center',
      routes: [
        {
          path: '/buyer/portal',
          title: 'کارتابل لایسنس‌ها و قراردادهای امانی',
          desc: 'مشاهده کلیدهای دسترسی لایسنس، دکمه آزادسازی وجوه مسدودی و فرم ارجاع به داوری',
          badge: 'پنل خریدار',
        },
      ],
    },
    {
      group: 'میز نظارت کلان و هیئت داوری ادمین (Admin & Dispute Desk)',
      color: 'primary',
      icon: 'admin_panel_settings',
      routes: [
        {
          path: '/admin',
          title: 'میز ناظر کلان سامانه',
          desc: 'صف بررسی و تایید محصولات با یک کلیک، هیئت حل اختلاف و دفتر کل مالی امانی',
          badge: 'مدیر ارشد',
        },
      ],
    },
    {
      group: 'وب‌سرویس‌ها و API‌های متصل به دیتابیس ابری Neon',
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
          path: '/api/init-db',
          title: 'API سلامت و بازیابی پایگاه داده',
          desc: 'اندپوینت بررسی اتصال و خودترمیمی خودکار جداول پایگاه داده Neon',
          badge: 'System API',
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
          <span className="text-on-surface font-semibold">نقشه کامل معماری و مسیرهای سامانه</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-on-surface">
          نقشه معماری اطلاعات و نمودار کاربری (Sitemap)
        </h1>
        <p className="text-xs text-on-surface-variant mt-1">
          برگرفته از مدل طراحی معماری اطلاعات استیچ (Stitch IA Architecture)
        </p>
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
                  {section.routes.length} مسیر فعال
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
