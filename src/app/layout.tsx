import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'اکومارکت | EchoMarket — بازار جامع نرم‌افزار سازمانی و هوش مصنوعی',
  description:
    'بزرگترین پلتفرم B2B/B2C ارزیابی، استعلام قیمت، مقایسه تخصصی و تضمین امانی نرم‌افزارهای سازمانی، هوش مصنوعی و خدمات ابری در ایران',
  keywords: [
    'اکومارکت',
    'EchoMarket',
    'نرم‌افزار سازمانی',
    'هوش مصنوعی فارسی',
    'کارجور',
    'سرویس ابری',
    'استعلام قیمت نرم‌افزار',
    'فین‌تک',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-on-surface min-h-screen flex flex-col antialiased selection:bg-primary-fixed selection:text-on-primary-fixed">
        <Header />
        <main className="flex-1 pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
