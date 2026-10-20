'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function VendorRegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [successProduct, setSuccessProduct] = useState<any>(null);

  // Form Fields
  const [titleFa, setTitleFa] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [categoryId, setCategoryId] = useState('crm-hr');
  const [vendorName, setVendorName] = useState('');
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  const [deployment, setDeployment] = useState('SaaS ابری');
  const [pricingModel, setPricingModel] = useState('اشتراک سالانه سازمانی');
  const [priceToman, setPriceToman] = useState('35000000');
  const [slaGuarantee, setSlaGuarantee] = useState('۹۹.۹٪');
  const [demoUrl, setDemoUrl] = useState('');
  const [featuresText, setFeaturesText] = useState(
    'پشتیبانی کامل از تقویم شمسی\nاحراز هویت دومرحله‌ای سازمانی\nوب‌سرویس RESTful API کامل\nداشبورد مدیریتی بلادرنگ'
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const features = featuresText
      .split('\n')
      .map((f) => f.trim())
      .filter((f) => f.length > 0);

    const slug =
      titleEn
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '') || 'app-' + Date.now();

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: titleEn || titleFa,
          title_fa: titleFa,
          slug,
          summary,
          description,
          category_id: categoryId,
          vendor_name: vendorName,
          deployment,
          pricing_model: pricingModel,
          price_toman: Number(priceToman),
          sla_guarantee: slaGuarantee,
          demo_url: demoUrl,
          features,
          tech_specs: {
            deployment: deployment,
            sla: slaGuarantee,
            verification_status: 'در صف بررسی کارشناسان اکومارکت',
          },
          tags: ['سازمانی', 'فناوری جدید', 'کسب‌وکار'],
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSuccessProduct(data.data);
      } else {
        alert('خطا در ثبت محصول: ' + data.error);
      }
    } catch (err: any) {
      alert('خطا در برقراری ارتباط با سرور: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[1000px] mx-auto px-4 md:px-8 py-10 space-y-8">
      {/* Breadcrumb */}
      <div>
        <div className="flex items-center gap-2 text-xs text-on-surface-variant mb-2">
          <Link href="/" className="hover:text-primary">
            اکومارکت
          </Link>
          <span>/</span>
          <span className="text-on-surface font-semibold">ثبت محصول و ویزارد ارائه‌دهندگان</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-on-surface">
          ویزارد ثبت نرم‌افزار و راهکار سازمانی
        </h1>
        <p className="text-xs text-on-surface-variant mt-1">
          محصول شما پس از ثبت، مستقیماً در صف ارزیابی فنی ادمین و دیتابیس ابری Neon ذخیره می‌شود.
        </p>
      </div>

      {/* Stepper Header */}
      {!successProduct && (
        <div className="grid grid-cols-3 gap-2 bg-white rounded-2xl p-3 border border-outline-variant/40 text-center text-xs font-bold">
          <div
            className={`py-2 rounded-xl flex items-center justify-center gap-2 ${
              step === 1 ? 'bg-primary text-on-primary' : 'text-on-surface-variant'
            }`}
          >
            <span>۱. مشخصات پایه</span>
          </div>
          <div
            className={`py-2 rounded-xl flex items-center justify-center gap-2 ${
              step === 2 ? 'bg-primary text-on-primary' : 'text-on-surface-variant'
            }`}
          >
            <span>۲. قیمت و استقرار</span>
          </div>
          <div
            className={`py-2 rounded-xl flex items-center justify-center gap-2 ${
              step === 3 ? 'bg-primary text-on-primary' : 'text-on-surface-variant'
            }`}
          >
            <span>۳. امکانات و ارسال</span>
          </div>
        </div>
      )}

      {/* Form Container */}
      <div className="bg-white rounded-3xl border border-outline-variant/50 p-6 md:p-10 shadow-sm">
        {successProduct ? (
          <div className="text-center py-12 space-y-5">
            <div className="w-16 h-16 rounded-full bg-secondary-container text-secondary flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-[36px]">verified</span>
            </div>
            <h2 className="text-xl font-bold text-on-surface">محصول با موفقیت در دیتابیس ثبت شد!</h2>
            <p className="text-xs md:text-sm text-on-surface-variant max-w-lg mx-auto leading-relaxed">
              محصول «{successProduct.title_fa}» با شناسه{' '}
              <span className="font-mono text-primary font-bold">{successProduct.id}</span> در پایگاه
              داده ابری Neon ایجاد شد و در وضعیت «در صف بررسی» قرار گرفت.
            </p>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/admin"
                className="px-6 py-3 rounded-xl bg-primary text-on-primary font-bold text-xs hover:bg-primary-container transition-all"
              >
                مشاهده صف بررسی ادمین و تایید محصول
              </Link>
              <Link
                href="/explore"
                className="px-5 py-3 rounded-xl bg-surface-container text-on-surface font-semibold text-xs hover:bg-surface-container-high transition-colors"
              >
                بازگشت به کاتالوگ
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1 */}
            {step === 1 && (
              <div className="space-y-5">
                <h3 className="text-base font-bold text-on-surface border-b border-outline-variant/30 pb-3">
                  مرحله ۱: هویت و اطلاعات پایه محصول
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-on-surface block">
                      نام فارسی محصول یا راهکار: *
                    </label>
                    <input
                      type="text"
                      required
                      value={titleFa}
                      onChange={(e) => setTitleFa(e.target.value)}
                      placeholder="مثال: سامانه ابری حضور و غیاب سپهر"
                      className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-on-surface block">
                      نام لاتین (English Title):
                    </label>
                    <input
                      type="text"
                      value={titleEn}
                      onChange={(e) => setTitleEn(e.target.value)}
                      placeholder="e.g. Sepehr Workforce Cloud"
                      className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-on-surface block">دسته‌بندی تخصصی: *</label>
                    <select
                      value={categoryId}
                      onChange={(e) => setCategoryId(e.target.value)}
                      className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-3 py-2.5 text-xs font-semibold focus:outline-none focus:border-primary"
                    >
                      <option value="crm-hr">منابع انسانی و شیفت کاری</option>
                      <option value="ai-ml">هوش مصنوعی و یادگیری ماشین</option>
                      <option value="cloud-devops">زیرساخت ابری و دواپس</option>
                      <option value="fintech-erp">فین‌تک و سامانه‌های یکپارچه ERP</option>
                      <option value="security-auth">امنیت سایبری و مدیریت دسترسی</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-on-surface block">
                      نام شرکت ارائه‌دهنده یا توسعه‌دهنده: *
                    </label>
                    <input
                      type="text"
                      required
                      value={vendorName}
                      onChange={(e) => setVendorName(e.target.value)}
                      placeholder="نام رسمی شرکت حقوقی یا تیم نرم‌افزاری"
                      className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-on-surface block">
                    خلاصه کوتاه محصول (در یک جمله): *
                  </label>
                  <input
                    type="text"
                    required
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    placeholder="توضیح مختصر جهت نمایش در کارت‌های ویترین"
                    className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-on-surface block">
                    شرح کامل قابلیت‌ها و ارزش پیشنهادی: *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="توضیحات تفصیلی در مورد مزایای رقابتی، معماری و کاربرد در سازمان‌ها"
                    className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-primary"
                  ></textarea>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      if (!titleFa || !vendorName || !summary) {
                        alert('لطفا فیلدهای ستاره‌دار را تکمیل کنید.');
                        return;
                      }
                      setStep(2);
                    }}
                    className="px-6 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-xs hover:bg-primary-container transition-all flex items-center gap-2"
                  >
                    <span>مرحله بعد: قیمت و استقرار</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                  </button>
                </div>
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div className="space-y-5">
                <h3 className="text-base font-bold text-on-surface border-b border-outline-variant/30 pb-3">
                  مرحله ۲: قیمت‌گذاری و معماری استقرار
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-on-surface block">مدل استقرار: *</label>
                    <select
                      value={deployment}
                      onChange={(e) => setDeployment(e.target.value)}
                      className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-3 py-2.5 text-xs font-semibold focus:outline-none focus:border-primary"
                    >
                      <option value="SaaS ابری">SaaS ابری کامل</option>
                      <option value="On-Premise سرور داخلی">نصب محلی (On-Premise)</option>
                      <option value="ترکیبی (ابری / محلی)">ترکیبی (هیبرید)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-on-surface block">تعهد پایداری (SLA):</label>
                    <select
                      value={slaGuarantee}
                      onChange={(e) => setSlaGuarantee(e.target.value)}
                      className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-3 py-2.5 text-xs font-semibold focus:outline-none focus:border-primary"
                    >
                      <option value="۹۹.۹٪">۹۹.۹٪ آپ‌تایم استاندارد</option>
                      <option value="۹۹.۹۵٪">۹۹.۹۵٪ آپ‌تایم سازمانی</option>
                      <option value="۹۹.۹۹٪">۹۹.۹۹٪ آپ‌تایم فوق بحرانی</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-on-surface block">مدل قیمت‌گذاری: *</label>
                    <select
                      value={pricingModel}
                      onChange={(e) => setPricingModel(e.target.value)}
                      className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-3 py-2.5 text-xs font-semibold focus:outline-none focus:border-primary"
                    >
                      <option value="اشتراک سالانه سازمانی">اشتراک سالانه سازمانی</option>
                      <option value="اشتراک ماهانه">اشتراک ماهانه</option>
                      <option value="لایسنس مادام‌العمر">لایسنس مادام‌العمر (One-time)</option>
                      <option value="پرداخت بر اساس مصرف">پرداخت بر اساس مصرف (Pay-as-you-go)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-on-surface block">
                      هزینه پایه به تومان: *
                    </label>
                    <input
                      type="number"
                      required
                      value={priceToman}
                      onChange={(e) => setPriceToman(e.target.value)}
                      className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-primary font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-on-surface block">آدرس دموی آنلاین (اختیاری):</label>
                  <input
                    type="url"
                    value={demoUrl}
                    onChange={(e) => setDemoUrl(e.target.value)}
                    placeholder="https://demo.yourproduct.ir"
                    className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-primary ltr text-left"
                  />
                </div>

                <div className="flex justify-between pt-4 border-t border-outline-variant/30">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-5 py-2.5 rounded-xl bg-surface-container text-on-surface font-semibold text-xs hover:bg-surface-container-high"
                  >
                    بازگشت
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-6 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-xs hover:bg-primary-container transition-all flex items-center gap-2"
                  >
                    <span>مرحله بعد: قابلیت‌ها و ارسال</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                  </button>
                </div>
              </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <div className="space-y-5">
                <h3 className="text-base font-bold text-on-surface border-b border-outline-variant/30 pb-3">
                  مرحله ۳: فهرست قابلیت‌ها و تایید نهایی
                </h3>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-on-surface block">
                    مهم‌ترین قابلیت‌های کلیدی (هر سطر یک ویژگی):
                  </label>
                  <textarea
                    rows={5}
                    value={featuresText}
                    onChange={(e) => setFeaturesText(e.target.value)}
                    className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-primary"
                  ></textarea>
                </div>

                <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/40 space-y-2 text-xs">
                  <div className="font-bold text-on-surface flex items-center gap-1.5 text-secondary">
                    <span className="material-symbols-outlined text-[18px]">verified</span>
                    ضوابط انتشار در اکومارکت
                  </div>
                  <p className="text-on-surface-variant leading-relaxed">
                    با ثبت این محصول، شما متعهد می‌شوید که کلیه قراردادهای منعقده از طریق این پلتفرم
                    تحت پوشش حساب امانی و نظام داوری مستقل اکومارکت قرار گیرند.
                  </p>
                </div>

                <div className="flex justify-between pt-4 border-t border-outline-variant/30">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-5 py-2.5 rounded-xl bg-surface-container text-on-surface font-semibold text-xs hover:bg-surface-container-high"
                  >
                    بازگشت
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-3 rounded-xl bg-primary text-on-primary font-bold text-xs hover:bg-primary-container transition-all flex items-center gap-2 disabled:opacity-50"
                  >
                    {loading ? (
                      <span>در حال ذخیره در دیتابیس Neon...</span>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-[18px]">check</span>
                        <span>ثبت قطعی محصول و ارسال به صف ارزیابی</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
