'use client';

import { Suspense, useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Product, Category } from '@/lib/db';

function ExploreContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const initialSearch = searchParams.get('search') || '';

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [selectedDeployment, setSelectedDeployment] = useState<string>('all');
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>('rating');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, searchQuery, selectedDeployment, minRating, sortBy]);

  async function fetchCategories() {
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      if (data.success) {
        setCategories(data.data);
      }
    } catch (e) {
      console.error(e);
    }
  }

  async function fetchProducts() {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedCategory !== 'all') params.append('category', selectedCategory);
      if (searchQuery.trim()) params.append('search', searchQuery.trim());

      const res = await fetch(`/api/products?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        let list: Product[] = data.data;

        // In-memory filters for deployment and rating
        if (selectedDeployment !== 'all') {
          list = list.filter((p) =>
            p.deployment?.toLowerCase().includes(selectedDeployment.toLowerCase())
          );
        }
        if (minRating > 0) {
          list = list.filter((p) => Number(p.rating) >= minRating);
        }

        // Sort
        if (sortBy === 'rating') {
          list.sort((a, b) => Number(b.rating) - Number(a.rating));
        } else if (sortBy === 'price_asc') {
          list.sort((a, b) => Number(a.price_toman) - Number(b.price_toman));
        } else if (sortBy === 'price_desc') {
          list.sort((a, b) => Number(b.price_toman) - Number(a.price_toman));
        }

        setProducts(list);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  const clearAllFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSelectedDeployment('all');
    setMinRating(0);
    setSortBy('rating');
  };

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    searchQuery !== '' ||
    selectedDeployment !== 'all' ||
    minRating > 0;

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-8">
      {/* Header Breadcrumb & Title */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs text-on-surface-variant mb-2">
          <Link href="/" className="hover:text-primary">
            اکومارکت
          </Link>
          <span>/</span>
          <span className="text-on-surface font-semibold">کاوش و فیلتر پیشرفته محصولات</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-on-surface">
          کاتالوگ جامع راهکارهای نرم‌افزاری و هوش مصنوعی
        </h1>
        <p className="text-xs text-on-surface-variant mt-1">
          بیش از ۵۰ راهکار ارزیابی شده با ضمانت امانی و اتصال به دیتابیس ابری Neon
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* ── Left Sidebar: Filters ── */}
        <aside className="space-y-6">
          <div className="bg-white rounded-2xl border border-outline-variant/50 p-5 space-y-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-outline-variant/30 pb-3">
              <div className="flex items-center gap-2 font-bold text-sm text-on-surface">
                <span className="material-symbols-outlined text-primary text-[20px]">tune</span>
                <span>فیلترهای تخصصی</span>
              </div>
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="text-[11px] font-semibold text-error hover:underline"
                >
                  حذف فیلترها
                </button>
              )}
            </div>

            {/* Search Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-on-surface block">جستجوی متنی</label>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="عنوان نرم‌افزار، قابلیت..."
                  className="w-full text-xs bg-surface-container-low/70 border border-outline-variant/40 rounded-xl px-3 py-2.5 pl-8 focus:outline-none focus:border-primary"
                />
                <span className="material-symbols-outlined absolute left-2.5 top-2.5 text-outline text-[18px]">
                  search
                </span>
              </div>
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-on-surface block">دسته‌بندی راهکار</label>
              <div className="space-y-1">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full text-right text-xs px-3 py-2 rounded-xl transition-all flex items-center justify-between ${
                    selectedCategory === 'all'
                      ? 'bg-primary text-on-primary font-bold'
                      : 'text-on-surface-variant hover:bg-surface-container-low'
                  }`}
                >
                  <span>همه دسته‌ها</span>
                  <span className="text-[10px] opacity-80">
                    ({categories.reduce((a, b) => a + Number(b.count), 0)})
                  </span>
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full text-right text-xs px-3 py-2 rounded-xl transition-all flex items-center justify-between ${
                      selectedCategory === cat.id
                        ? 'bg-primary text-on-primary font-bold'
                        : 'text-on-surface-variant hover:bg-surface-container-low'
                    }`}
                  >
                    <span>{cat.name_fa}</span>
                    <span className="text-[10px] opacity-80">({cat.count})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Deployment Architecture */}
            <div className="space-y-2 border-t border-outline-variant/30 pt-4">
              <label className="text-xs font-bold text-on-surface block">مدل استقرار</label>
              <div className="space-y-1.5 text-xs text-on-surface-variant">
                {[
                  { id: 'all', label: 'همه مدل‌ها' },
                  { id: 'SaaS', label: 'ابری کامل (SaaS)' },
                  { id: 'On-Premise', label: 'نصب محلی (On-Premise)' },
                  { id: 'ترکیبی', label: 'هیبرید (ترکیبی)' },
                ].map((dep) => (
                  <label key={dep.id} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="deployment"
                      checked={selectedDeployment === dep.id}
                      onChange={() => setSelectedDeployment(dep.id)}
                      className="text-primary focus:ring-primary h-4 w-4"
                    />
                    <span>{dep.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Minimum Rating */}
            <div className="space-y-2 border-t border-outline-variant/30 pt-4">
              <label className="text-xs font-bold text-on-surface block">حداقل امتیاز ارزیابی</label>
              <div className="flex items-center gap-1">
                {[4.5, 4.8, 4.9].map((rate) => (
                  <button
                    key={rate}
                    onClick={() => setMinRating(minRating === rate ? 0 : rate)}
                    className={`flex-1 py-1.5 rounded-lg border text-xs font-bold transition-all flex items-center justify-center gap-1 ${
                      minRating === rate
                        ? 'bg-secondary text-on-secondary border-secondary'
                        : 'border-outline-variant/50 text-on-surface hover:bg-surface-container-low'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[14px]">star</span>
                    <span>+{rate}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* ── Right Content: Results ── */}
        <div className="lg:col-span-3 space-y-6">
          {/* Top Sort & Count Bar */}
          <div className="bg-white rounded-2xl border border-outline-variant/50 px-5 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
            <div className="flex items-center gap-2 text-xs">
              <span className="font-bold text-on-surface">{products.length} محصول</span>
              <span className="text-outline">یافت شد</span>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-on-surface-variant font-medium">مرتب‌سازی:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-surface-container-low border border-outline-variant/40 rounded-xl px-3 py-1.5 text-xs font-semibold focus:outline-none focus:border-primary"
              >
                <option value="rating">بالاترین امتیاز کارشناسی</option>
                <option value="price_asc">کمترین هزینه پایه</option>
                <option value="price_desc">بیشترین هزینه پایه</option>
              </select>
            </div>
          </div>

          {/* Active Chips */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] text-outline font-medium">فیلترهای فعال:</span>
              {selectedCategory !== 'all' && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed text-xs font-medium">
                  دسته‌بندی: {categories.find((c) => c.id === selectedCategory)?.name_fa}
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className="hover:text-error mr-1"
                  >
                    ×
                  </button>
                </span>
              )}
              {searchQuery && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-surface-container-high text-on-surface text-xs font-medium">
                  جستجو: «{searchQuery}»
                  <button onClick={() => setSearchQuery('')} className="hover:text-error mr-1">
                    ×
                  </button>
                </span>
              )}
              {selectedDeployment !== 'all' && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-surface-container-high text-on-surface text-xs font-medium">
                  استقرار: {selectedDeployment}
                  <button
                    onClick={() => setSelectedDeployment('all')}
                    className="hover:text-error mr-1"
                  >
                    ×
                  </button>
                </span>
              )}
            </div>
          )}

          {/* Product Grid */}
          {loading ? (
            <div className="py-24 text-center">
              <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
              <p className="text-xs text-on-surface-variant font-semibold">
                در حال دریافت اطلاعات از دیتابیس ابری Neon...
              </p>
            </div>
          ) : products.length === 0 ? (
            <div className="bg-white rounded-3xl border border-outline-variant/40 p-12 text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-surface-container-low text-outline flex items-center justify-center mx-auto">
                <span className="material-symbols-outlined text-[32px]">inventory_2</span>
              </div>
              <h3 className="font-bold text-base text-on-surface">محصولی با این مشخصات یافت نشد</h3>
              <p className="text-xs text-on-surface-variant max-w-sm mx-auto">
                می‌توانید فیلترهای جستجو را بازنشانی کنید یا محصول مورد نظر را در سامانه ثبت کنید.
              </p>
              <button
                onClick={clearAllFilters}
                className="px-5 py-2.5 rounded-xl bg-primary text-on-primary font-semibold text-xs hover:bg-primary-container"
              >
                پاک کردن همه فیلترها
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {products.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-white rounded-2xl border border-outline-variant/50 p-6 flex flex-col justify-between hover:shadow-level-2 hover:border-primary/40 transition-all group"
                >
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={prod.vendor_logo}
                          alt={prod.vendor_name}
                          className="w-12 h-12 rounded-xl object-cover border border-outline-variant/30 shrink-0"
                        />
                        <div>
                          <h3 className="font-bold text-sm text-on-surface group-hover:text-primary transition-colors line-clamp-1">
                            {prod.title_fa}
                          </h3>
                          <div className="flex items-center gap-1.5 text-[11px] text-on-surface-variant mt-0.5">
                            <span>{prod.vendor_name}</span>
                            {prod.vendor_verified && (
                              <span className="material-symbols-outlined text-secondary text-[15px]">
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

                    <p className="text-xs text-on-surface-variant line-clamp-2 leading-relaxed">
                      {prod.summary}
                    </p>

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

                  <div className="pt-5 mt-5 border-t border-outline-variant/30 flex items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] text-outline block">هزینه پایه:</span>
                      <span className="text-xs font-bold text-primary">
                        {Number(prod.price_toman).toLocaleString('fa-IR')} تومان
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/compare?p1=${prod.id}`}
                        title="مقایسه با سایرین"
                        className="p-2 rounded-xl bg-surface-container-low hover:bg-surface-container text-outline hover:text-primary transition-colors"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          compare_arrows
                        </span>
                      </Link>
                      <Link
                        href={`/product/${prod.slug}`}
                        className="px-3.5 py-1.5 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-semibold text-xs transition-all shadow-sm shadow-primary/20"
                      >
                        مشاهده و استعلام
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ExplorePage() {
  return (
    <Suspense
      fallback={
        <div className="py-32 text-center text-xs font-bold text-on-surface-variant">
          در حال بارگذاری کاتالوگ...
        </div>
      }
    >
      <ExploreContent />
    </Suspense>
  );
}
