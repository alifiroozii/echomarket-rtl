'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryDropdown, setCategoryDropdown] = useState(false);

  const navLinks = [
    { href: '/', label: 'صفحه اصلی' },
    { href: '/explore', label: 'کاوش محصولات' },
    { href: '/compare', label: 'مقایسه هوشمند' },
    { href: '/vendor/dashboard', label: 'پنل ارائه‌دهندگان' },
    { href: '/buyer/portal', label: 'کارتابل خریدار' },
    { href: '/admin', label: 'میز نظارت ادمین' },
    { href: '/sitemap', label: 'نقشه سایت' },
  ];

  const categories = [
    { href: '/explore?category=ai-ml', label: 'هوش مصنوعی و یادگیری ماشین', icon: 'psychology' },
    { href: '/explore?category=cloud-devops', label: 'زیرساخت ابری و دواپس', icon: 'cloud_queue' },
    { href: '/explore?category=fintech-erp', label: 'فین‌تک و ERP سازمانی', icon: 'account_balance' },
    { href: '/explore?category=security-auth', label: 'امنیت سایبری و IAM', icon: 'security' },
    { href: '/explore?category=crm-hr', label: 'منابع انسانی و شیفت کاری', icon: 'groups' },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-surface-container-lowest/95 backdrop-blur-md border-b border-outline-variant/40 shadow-sm">
      <div className="h-20 max-w-[1440px] mx-auto px-4 md:px-8 flex items-center justify-between gap-4">
        {/* Right Side: Brand + Mega Menu Trigger */}
        <div className="flex items-center gap-4 shrink-0">
          <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-90">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-on-primary shadow-sm shadow-primary/30">
              <span className="material-symbols-outlined text-[24px]">hub</span>
            </div>
            <div className="flex flex-col text-right">
              <span className="text-[19px] text-primary font-bold tracking-tight leading-tight">
                اکومارکت
              </span>
              <span className="text-[11px] text-on-surface-variant font-medium">
                بازار جامع فناوری و AI
              </span>
            </div>
          </Link>

          <div className="h-6 w-px bg-outline-variant/50 hidden xl:block"></div>

          {/* Categories Dropdown */}
          <div className="relative hidden xl:block">
            <button
              onClick={() => setCategoryDropdown(!categoryDropdown)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-surface-container-low text-on-surface hover:bg-surface-container hover:text-primary transition-all text-xs font-semibold border border-outline-variant/30"
              type="button"
            >
              <span className="material-symbols-outlined text-primary text-[19px]">grid_view</span>
              <span>دسته‌بندی راهکارها</span>
              <span className="material-symbols-outlined text-outline text-[18px]">
                {categoryDropdown ? 'expand_less' : 'expand_more'}
              </span>
            </button>

            {categoryDropdown && (
              <div
                className="absolute top-full right-0 mt-2 w-72 bg-white rounded-2xl shadow-level-3 border border-outline-variant/30 p-2 z-50 animate-fadeIn"
                onClick={() => setCategoryDropdown(false)}
              >
                <div className="text-[11px] font-bold text-outline px-3 py-1.5 border-b border-outline-variant/20 mb-1">
                  دسته‌بندی‌های تخصصی
                </div>
                {categories.map((cat) => (
                  <Link
                    key={cat.href}
                    href={cat.href}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-surface-container-low text-on-surface hover:text-primary transition-colors text-xs font-medium"
                  >
                    <span className="material-symbols-outlined text-primary text-[20px]">
                      {cat.icon}
                    </span>
                    <span>{cat.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Center: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? 'text-primary bg-primary-fixed/40 font-bold border-b-2 border-primary'
                    : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-low'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Left Side: Search + CTA + Login / Profile */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <Link
            href="/explore"
            className="hidden sm:flex items-center gap-2 bg-surface-container-low/80 border border-outline-variant/40 rounded-xl px-3 py-1.5 text-on-surface-variant hover:border-primary/50 transition-all text-xs"
          >
            <span className="material-symbols-outlined text-outline text-[18px]">search</span>
            <span className="text-outline select-none text-[12px]">جستجو...</span>
            <span className="bg-surface-container-highest/60 border border-outline-variant/30 rounded px-1.5 py-0.5 text-[10px] font-mono text-on-surface-variant">
              ⌘K
            </span>
          </Link>

          <Link
            href="/vendor/register"
            className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl bg-primary text-on-primary hover:bg-primary-container transition-all text-xs font-bold shadow-sm shadow-primary/20"
          >
            <span className="material-symbols-outlined text-[17px]">add_circle</span>
            <span className="hidden sm:inline">ثبت محصول</span>
            <span className="sm:hidden">ثبت</span>
          </Link>

          <div className="h-6 w-px bg-outline-variant/40 hidden sm:block"></div>

          {/* Login / Profile Capsule */}
          <Link
            href="/login"
            className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl bg-surface-container-low hover:bg-surface-container border border-outline-variant/30 transition-all cursor-pointer"
          >
            <div className="w-7 h-7 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center font-bold text-primary text-xs">
              <span className="material-symbols-outlined text-[16px]">person</span>
            </div>
            <div className="hidden md:flex flex-col text-right">
              <span className="text-xs text-on-surface font-bold leading-tight">ورود / حساب</span>
              <span className="text-[10px] text-secondary leading-none mt-0.5 font-semibold">
                اطلاعات کاربری
              </span>
            </div>
          </Link>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-on-surface hover:bg-surface-container-high"
            aria-label="Toggle navigation menu"
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-surface-container-lowest border-b border-outline-variant/40 px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl text-xs font-semibold text-on-surface hover:bg-surface-container hover:text-primary transition-all"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-outline-variant/30">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-primary text-on-primary text-xs font-bold"
            >
              <span className="material-symbols-outlined text-[18px]">login</span>
              <span>ورود سازمانی و نام‌های کاربری تست</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
