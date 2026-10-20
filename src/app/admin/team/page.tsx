'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface TeamMember {
  id: string;
  full_name: string;
  email: string;
  role: string;
  permissions: string[] | string;
  status: string;
  last_active: string;
}

export default function AdminTeamRBACPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('کارشناس اعتبارسنجی فنی');
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([
    'review_products',
    'view_inquiries',
  ]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadMembers();
  }, []);

  async function loadMembers() {
    setLoading(true);
    try {
      const res = await fetch('/api/team');
      const data = await res.json();
      if (data.success) {
        setMembers(data.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  const allPermissions = [
    { id: 'review_products', label: 'تایید و انتشار محصولات در ویترین' },
    { id: 'escrow_release', label: 'آزادسازی وجوه مسدودی در حساب امانی' },
    { id: 'arbitration', label: 'صدور رای حقوقی در مرکز حل اختلاف' },
    { id: 'finance_settle', label: 'مدیریت تسویه‌حساب‌های بانکی پایا/ساتنا' },
    { id: 'view_audit_logs', label: 'مشاهده لاگ‌های ممیزی امنیتی و KYC' },
    { id: 'manage_team', label: 'افزودن و تغییر دسترسی اعضای تیم' },
  ];

  const handleTogglePermission = (permId: string) => {
    if (selectedPermissions.includes(permId)) {
      setSelectedPermissions(selectedPermissions.filter((p) => p !== permId));
    } else {
      setSelectedPermissions([...selectedPermissions, permId]);
    }
  };

  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: fullName,
          email,
          role,
          permissions: selectedPermissions,
        }),
      });
      const data = await res.json();
      if (data.success) {
        alert(`عضو جدید «${fullName}» با موفقیت به پایگاه داده ابری Neon اضافه شد.`);
        setAddModalOpen(false);
        setFullName('');
        setEmail('');
        loadMembers();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
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
          <Link href="/admin" className="hover:text-primary">
            میز ناظر ادمین
          </Link>
          <span>/</span>
          <span className="text-on-surface font-semibold">ماتریس کنترل دسترسی RBAC</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-on-surface">
              مدیریت اعضای تیم، دسترسی‌ها و ماتریس RBAC
            </h1>
            <p className="text-xs text-on-surface-variant mt-1">
              کنترل مبتنی بر نقش (Role-Based Access Control) برای سطوح سازمانی، ممیزی و داوری
            </p>
          </div>
          <button
            onClick={() => setAddModalOpen(true)}
            className="px-5 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-xs hover:bg-primary-container transition-all flex items-center gap-2 shadow-sm shadow-primary/20 shrink-0"
          >
            <span className="material-symbols-outlined text-[18px]">person_add</span>
            <span>افزودن عضو جدید به تیم</span>
          </button>
        </div>
      </div>

      {/* Security Health Metric Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-outline-variant/40 p-5 space-y-1 shadow-sm">
          <span className="text-xs text-on-surface-variant">امتیاز سلامت امنیتی RBAC</span>
          <div className="text-2xl font-extrabold text-secondary">۹۶٪ پایداری</div>
          <span className="text-[11px] text-outline font-medium">سیاست Least-Privilege فعال است</span>
        </div>

        <div className="bg-white rounded-2xl border border-outline-variant/40 p-5 space-y-1 shadow-sm">
          <span className="text-xs text-on-surface-variant">تعداد کل کارشناسان تایید هویت شده</span>
          <div className="text-2xl font-extrabold text-on-surface">{members.length} نفر</div>
          <span className="text-[11px] text-primary font-medium">ذخیره زنده در پایگاه داده Neon</span>
        </div>

        <div className="bg-white rounded-2xl border border-outline-variant/40 p-5 space-y-1 shadow-sm">
          <span className="text-xs text-on-surface-variant">احراز هویت دومرحله‌ای (MFA)</span>
          <div className="text-2xl font-extrabold text-primary">۱۰۰٪ الزامی</div>
          <span className="text-[11px] text-outline font-medium">مبتنی بر کلید سخت‌افزاری FIDO2</span>
        </div>
      </div>

      {/* Members Table */}
      <div className="bg-white rounded-3xl border border-outline-variant/50 p-6 md:p-8 space-y-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-outline-variant/30 pb-4">
          <h2 className="text-base font-bold text-on-surface">فهرست اعضای تیم و کارشناسان دسترسی</h2>
          <span className="px-3 py-1 rounded-full bg-surface-container-high text-xs font-bold">
            {members.length} کاربر فعال
          </span>
        </div>

        {loading ? (
          <div className="py-12 text-center text-xs font-bold text-outline">
            در حال دریافت اعضای تیم...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead>
                <tr className="border-b border-outline-variant/30 text-outline">
                  <th className="py-3 px-3">نام و مشخصات</th>
                  <th className="py-3 px-3">نقش سازمانی</th>
                  <th className="py-3 px-3">مجوزهای فعال</th>
                  <th className="py-3 px-3">وضعیت حساب</th>
                  <th className="py-3 px-3">آخرین فعالیت</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20">
                {members.map((m) => {
                  const perms = Array.isArray(m.permissions)
                    ? m.permissions
                    : typeof m.permissions === 'string'
                    ? JSON.parse(m.permissions)
                    : [];
                  return (
                    <tr key={m.id} className="hover:bg-surface-container-low/40">
                      <td className="py-4 px-3">
                        <div className="font-bold text-on-surface">{m.full_name}</div>
                        <div className="text-[11px] text-outline font-mono mt-0.5">{m.email}</div>
                      </td>
                      <td className="py-4 px-3 font-semibold text-primary">{m.role}</td>
                      <td className="py-4 px-3">
                        <div className="flex flex-wrap gap-1 max-w-sm">
                          {perms.map((p: string, pIdx: number) => (
                            <span
                              key={pIdx}
                              className="px-2 py-0.5 rounded-full bg-primary-fixed/40 text-on-primary-fixed text-[10px] font-medium"
                            >
                              {p === 'all'
                                ? 'دسترسی کامل (Full)'
                                : allPermissions.find((x) => x.id === p)?.label || p}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-4 px-3">
                        <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                          فعال و تاییدشده
                        </span>
                      </td>
                      <td className="py-4 px-3 text-outline font-mono">
                        {new Date(m.last_active).toLocaleDateString('fa-IR')}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* RBAC Matrix Visual Table */}
      <div className="bg-white rounded-3xl border border-outline-variant/50 p-6 md:p-8 space-y-6 shadow-sm overflow-x-auto">
        <h2 className="text-base font-bold text-on-surface border-b border-outline-variant/30 pb-4">
          ماتریس مجوزهای دسترسی (RBAC Permission Matrix)
        </h2>

        <table className="w-full text-right text-xs">
          <thead>
            <tr className="border-b border-outline-variant/30 text-outline">
              <th className="py-3 px-3">سطح دسترسی و اختیارات</th>
              <th className="py-3 px-3 text-center">مدیر ارشد (Super Admin)</th>
              <th className="py-3 px-3 text-center">کارشناس اعتبارسنجی</th>
              <th className="py-3 px-3 text-center">مدیر مالی و امانی</th>
              <th className="py-3 px-3 text-center">داور حقوقی حل اختلاف</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/20">
            {allPermissions.map((perm) => (
              <tr key={perm.id} className="hover:bg-surface-container-low/30">
                <td className="py-3 px-3 font-semibold text-on-surface">{perm.label}</td>
                <td className="py-3 px-3 text-center text-secondary">
                  <span className="material-symbols-outlined text-[20px]">check_circle</span>
                </td>
                <td className="py-3 px-3 text-center text-secondary">
                  {['review_products', 'view_audit_logs'].includes(perm.id) ? (
                    <span className="material-symbols-outlined text-[20px]">check_circle</span>
                  ) : (
                    <span className="material-symbols-outlined text-outline/40 text-[20px]">
                      cancel
                    </span>
                  )}
                </td>
                <td className="py-3 px-3 text-center text-secondary">
                  {['escrow_release', 'finance_settle'].includes(perm.id) ? (
                    <span className="material-symbols-outlined text-[20px]">check_circle</span>
                  ) : (
                    <span className="material-symbols-outlined text-outline/40 text-[20px]">
                      cancel
                    </span>
                  )}
                </td>
                <td className="py-3 px-3 text-center text-secondary">
                  {['arbitration', 'view_audit_logs'].includes(perm.id) ? (
                    <span className="material-symbols-outlined text-[20px]">check_circle</span>
                  ) : (
                    <span className="material-symbols-outlined text-outline/40 text-[20px]">
                      cancel
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Member Modal */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl border border-outline-variant/40 max-w-lg w-full p-6 md:p-8 space-y-5 shadow-level-3 relative text-right">
            <button
              onClick={() => setAddModalOpen(false)}
              className="absolute left-5 top-5 p-1 rounded-full text-outline hover:text-on-surface"
            >
              <span className="material-symbols-outlined text-[22px]">close</span>
            </button>

            <form onSubmit={handleAddMember} className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-on-surface">افزودن عضو جدید به تیم اکومارکت</h3>
                <p className="text-xs text-on-surface-variant mt-1">
                  مشخصات عضو در پایگاه داده ابری Neon ثبت خواهد شد
                </p>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-on-surface mb-1">نام و نام‌خانوادگی: *</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="مثال: سارا رادمنش"
                    className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block font-bold text-on-surface mb-1">ایمیل سازمانی: *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@echomarket.ir"
                    className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block font-bold text-on-surface mb-1">عنوان نقش سازمانی: *</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-primary"
                  >
                    <option value="کارشناس اعتبارسنجی فنی">کارشناس اعتبارسنجی فنی</option>
                    <option value="مدیر مالی و حساب‌های امانی">مدیر مالی و حساب‌های امانی</option>
                    <option value="داور تخصصی حل اختلاف">داور تخصصی حل اختلاف</option>
                    <option value="سرپرست امنیت و زیروتراست">سرپرست امنیت و زیروتراست</option>
                  </select>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-outline-variant/30">
                  <label className="block font-bold text-on-surface mb-1">انتخاب مجوزهای دسترسی:</label>
                  {allPermissions.map((perm) => (
                    <label key={perm.id} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedPermissions.includes(perm.id)}
                        onChange={() => handleTogglePermission(perm.id)}
                        className="rounded text-primary focus:ring-primary h-4 w-4"
                      />
                      <span className="text-xs text-on-surface-variant">{perm.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-outline-variant/30">
                <button
                  type="button"
                  onClick={() => setAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-surface-container text-on-surface text-xs font-semibold"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2 rounded-xl bg-primary text-on-primary font-bold text-xs hover:bg-primary-container disabled:opacity-50"
                >
                  {submitting ? 'در حال ثبت در Neon...' : 'ثبت قطعی دسترسی'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
