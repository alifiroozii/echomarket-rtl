import pg from 'pg';
const { Pool } = pg;

const connectionString = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_FkHeoPLv6B5M@ep-broad-star-b8r2jyan-pooler.c-14.us-east-1.aws.neon.tech/neondb?sslmode=require';

const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false }
});

async function seed() {
  console.log('Connecting to Neon PostgreSQL...');
  const client = await pool.connect();
  try {
    console.log('Creating EchoMarket tables...');

    await client.query(`
      CREATE TABLE IF NOT EXISTS echomarket_categories (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        name_fa VARCHAR(100) NOT NULL,
        icon VARCHAR(50) NOT NULL,
        description TEXT,
        count INT DEFAULT 0
      );

      CREATE TABLE IF NOT EXISTS echomarket_products (
        id VARCHAR(50) PRIMARY KEY,
        title VARCHAR(150) NOT NULL,
        title_fa VARCHAR(150) NOT NULL,
        slug VARCHAR(100) UNIQUE NOT NULL,
        summary TEXT,
        description TEXT,
        category_id VARCHAR(50),
        vendor_name VARCHAR(100),
        vendor_logo TEXT,
        vendor_verified BOOLEAN DEFAULT TRUE,
        rating NUMERIC(3,2) DEFAULT 4.8,
        reviews_count INT DEFAULT 12,
        pricing_model VARCHAR(50) DEFAULT 'اشتراک ماهانه',
        price_toman BIGINT DEFAULT 0,
        status VARCHAR(30) DEFAULT 'published',
        demo_url TEXT,
        deployment VARCHAR(50) DEFAULT 'SaaS ابری',
        sla_guarantee VARCHAR(20) DEFAULT '۹۹.۹٪',
        features JSONB DEFAULT '[]'::jsonb,
        tech_specs JSONB DEFAULT '{}'::jsonb,
        tags TEXT[] DEFAULT ARRAY[]::TEXT[],
        created_at TIMESTAMPTZ DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS echomarket_inquiries (
        id VARCHAR(50) PRIMARY KEY,
        product_id VARCHAR(50) REFERENCES echomarket_products(id) ON DELETE SET NULL,
        buyer_name VARCHAR(100) NOT NULL,
        buyer_email VARCHAR(100) NOT NULL,
        buyer_company VARCHAR(150),
        buyer_phone VARCHAR(50),
        message TEXT,
        requested_seats INT DEFAULT 1,
        budget_range VARCHAR(50),
        status VARCHAR(30) DEFAULT 'pending',
        quote_amount BIGINT DEFAULT 0,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS echomarket_contracts (
        id VARCHAR(50) PRIMARY KEY,
        contract_number VARCHAR(50) UNIQUE NOT NULL,
        product_id VARCHAR(50),
        product_title VARCHAR(150),
        buyer_name VARCHAR(100),
        vendor_name VARCHAR(100),
        amount_toman BIGINT,
        status VARCHAR(30) DEFAULT 'in_escrow',
        license_key VARCHAR(100),
        expires_at TIMESTAMPTZ,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS echomarket_disputes (
        id VARCHAR(50) PRIMARY KEY,
        dispute_code VARCHAR(50) UNIQUE NOT NULL,
        contract_id VARCHAR(50),
        complainant_name VARCHAR(100),
        respondent_name VARCHAR(100),
        subject VARCHAR(200),
        description TEXT,
        status VARCHAR(30) DEFAULT 'open',
        priority VARCHAR(20) DEFAULT 'high',
        created_at TIMESTAMPTZ DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS echomarket_team_members (
        id VARCHAR(50) PRIMARY KEY,
        full_name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        role VARCHAR(50) NOT NULL,
        permissions JSONB DEFAULT '[]'::jsonb,
        status VARCHAR(30) DEFAULT 'active',
        last_active TIMESTAMPTZ DEFAULT NOW()
      );
    `);

    console.log('Tables created or verified.');

    // Seed Categories
    console.log('Seeding categories...');
    const categories = [
      { id: 'ai-ml', name: 'Artificial Intelligence & ML', name_fa: 'هوش مصنوعی و یادگیری ماشین', icon: 'psychology', description: 'مدل‌های زبانی فارسی، پردازش تصویر، بینایی ماشین و موتورهای پیشنهاددهنده', count: 42 },
      { id: 'cloud-devops', name: 'Cloud & DevOps', name_fa: 'زیرساخت ابری و دواپس', icon: 'cloud_queue', description: 'پایگاه‌های داده توزیع‌شده، داکر، کوبرنتیز و ارائه‌دهندگان کلاود بومی', count: 35 },
      { id: 'fintech-erp', name: 'Fintech & Enterprise ERP', name_fa: 'فین‌تک و سامانه‌های یکپارچه ERP', icon: 'account_balance', description: 'پلتفرم‌های تریدینگ، حسابداری ابری سازمانی، پرداخت و مدیریت زنجیره تامین', count: 28 },
      { id: 'security-auth', name: 'Cybersecurity & IAM', name_fa: 'امنیت سایبری و مدیریت دسترسی', icon: 'security', description: 'احراز هویت دومرحله‌ای سازمانی، فایروال ابری، SOC و تست نفوذ', count: 19 },
      { id: 'crm-hr', name: 'CRM & Human Resources', name_fa: 'ارتباط با مشتری و مدیریت منابع انسانی', icon: 'groups', description: 'سیستم‌های شیفت‌کاری، کارگزینی دیجیتال، هلپ‌دسک و اتوماسیون سازمانی', count: 24 }
    ];

    for (const cat of categories) {
      await client.query(`
        INSERT INTO echomarket_categories (id, name, name_fa, icon, description, count)
        VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name,
          name_fa = EXCLUDED.name_fa,
          icon = EXCLUDED.icon,
          description = EXCLUDED.description,
          count = EXCLUDED.count;
      `, [cat.id, cat.name, cat.name_fa, cat.icon, cat.description, cat.count]);
    }

    // Seed Products
    console.log('Seeding products...');
    const products = [
      {
        id: 'prod-karjoor',
        title: 'KarJoor Enterprise Workforce & Shift Engine',
        title_fa: 'سامانه مدیریت شیفت و نیروی کار کارجور (KarJoor)',
        slug: 'karjoor-enterprise',
        summary: 'پلتفرم جامع هوشمند تخصیص شیفت، رصد بلادرنگ بهره‌وری و تطبیق الگوریتمی نیروی کار برای سازمان‌های مقیاس بزرگ',
        description: 'کارجور (KarJoor) راه‌حل جامع رده سازمانی برای برنامه‌ریزی، زمان‌بندی هوشمند و مدیریت شفاف قراردادهای پرسنلی و شیفت‌های کاری در کارخانجات، شرکت‌های توزیع و زنجیره‌های لجستیک است.',
        category_id: 'crm-hr',
        vendor_name: 'گروه فناوری سامانه‌های کارجور',
        vendor_logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=150&auto=format&fit=crop&q=80',
        vendor_verified: true,
        rating: 4.95,
        reviews_count: 38,
        pricing_model: 'اشتراک سالانه سازمانی',
        price_toman: 45000000,
        status: 'published',
        demo_url: 'https://kar-aan.vercel.app',
        deployment: 'ترکیبی (ابری / محلی)',
        sla_guarantee: '۹۹.۹۵٪',
        features: JSON.stringify([
          'الگوریتم بهینه‌سازی شیفت با رعایت قوانین قانون کار ایران',
          'ثبت تردد ژئوفنسینگ و احراز هویت بیومتریک موبایلی',
          'داشبورد جامع شاخص‌های کلیدی عملکرد (KPI) با پشتیبانی تقویم شمسی',
          'اتصال بی‌واسطه به وب‌سرویس‌های حقوق و دستمزد سپیدار و همکاران سیستم',
          'ماژول پیشرفته صدور پیش‌فاکتور و تسویه خودکار'
        ]),
        tech_specs: JSON.stringify({
          architecture: 'Microservices on Kubernetes',
          database: 'PostgreSQL 16 + Redis Cluster',
          apiSupport: 'RESTful API & GraphQL',
          dataResidency: 'دیتاسنترهای داخلی افرانت و شاتل (مطابق الزامات افتا)'
        }),
        tags: ['مدیریت شیفت', 'منابع انسانی', 'اتوماسیون', 'سازمانی', 'گزارش‌گیری زنده']
      },
      {
        id: 'prod-taline-fintech',
        title: 'Taline Algorithmic Trading & Liquidity Platform',
        title_fa: 'پلتفرم ترید الگوریتمی و بازارگردانی تالین (Taline)',
        slug: 'taline-trading-platform',
        summary: 'هسته فوق سریع معاملات خودکار رمزارز و ابزارهای مشتقه با معماری وب‌سوکت بلادرنگ و مدیریت ریسک لحظه‌ای',
        description: 'تالین یک موتور معاملاتی رده نهادی است که برای صندوق‌های سرمایه‌گذاری، پراپ فرم‌ها و تریدرهای الگوریتمی طراحی شده و دارای اتصالات مستقیم پرسرعت به صرافی‌های داخلی و بین‌المللی است.',
        category_id: 'fintech-erp',
        vendor_name: 'آزمایشگاه فناوری‌های نوین مالی تالین',
        vendor_logo: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=150&auto=format&fit=crop&q=80',
        vendor_verified: true,
        rating: 4.92,
        reviews_count: 54,
        pricing_model: 'اشتراک لایسنس اختصاصی',
        price_toman: 85000000,
        status: 'published',
        demo_url: 'https://taline-eta.vercel.app',
        deployment: 'سرور اختصاصی کم‌تاخیر',
        sla_guarantee: '۹۹.۹۹٪',
        features: JSON.stringify([
          'موتور تطبیق سفارشات با تاخیر زیر ۵ میلی‌ثانیه',
          'بک‌تست جامع استراتژی‌ها روی دیتای ۵ ساله گذشته',
          'سیستم سوئیچ قطعی خودکار (Kill Switch) جهت مهار ریسک سقوط بازار',
          'داشبورد اختصاصی RTL با چارت‌های لایو تریدینگ‌ویو و اوردربوک عمیق'
        ]),
        tech_specs: JSON.stringify({
          language: 'Rust Core + Node.js Next.js UI',
          database: 'Neon PostgreSQL + TimescaleDB',
          latency: '< 5ms order routing',
          compliance: 'پروتکل رمزنگاری سخت‌افزاری HSM'
        }),
        tags: ['فین‌تک', 'ترید الگوریتمی', 'بازارگردانی', 'بک‌تست', 'وب‌سوکت']
      },
      {
        id: 'prod-persian-llm',
        title: 'Ava Persian Enterprise LLM & Cognitive Engine',
        title_fa: 'موتور هوش مصنوعی شناختی و مدل زبانی آوا (Ava LLM)',
        slug: 'ava-persian-llm',
        summary: 'مدل بومی‌سازی شده ۱۲ میلیارد پارامتری فارسی با تسلط کامل بر اصطلاحات حقوقی، بانکی و کسب‌وکار ایران',
        description: 'موتور پردازش زبان طبیعی آوا برای استفاده در تحلیل اسناد حقوقی، پاسخگویی ۲۴ ساعته پشتیبانی، استخراج قراردادها و تولید محتوای بازاریابی تخصصی سازمانی طراحی شده است.',
        category_id: 'ai-ml',
        vendor_name: 'هوش محاسباتی رایان‌آوا',
        vendor_logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
        vendor_verified: true,
        rating: 4.88,
        reviews_count: 29,
        pricing_model: 'پرداخت بر اساس مصرف (Pay-as-you-go)',
        price_toman: 18000000,
        status: 'published',
        demo_url: '#',
        deployment: 'SaaS ابری یا On-Premise',
        sla_guarantee: '۹۹.۹٪',
        features: JSON.stringify([
          'تنظیم دقیق (Fine-Tuned) شده روی بیش از ۱۰۰ میلیون سند متنی معتبر فارسی',
          'پشتیبانی کامل از توکن‌های فارسی با هزینه پردازشی تا ۵۰٪ ارزان‌تر',
          'سازگاری کامل با فرمت OpenAI API جهت جایگزینی سریع',
          'قابلیت استقرار در شبکه‌های ایزوله بدون دسترسی به اینترنت'
        ]),
        tech_specs: JSON.stringify({
          modelParams: '12 Billion Parameters',
          throughput: '75 Tokens / Second',
          privacy: 'عدم ذخیره پرامپت‌ها و داده‌های مشتری'
        }),
        tags: ['هوش مصنوعی', 'مدل زبانی', 'پردازش متن فارسی', 'چت‌بات سازمانی']
      },
      {
        id: 'prod-diako-cloud',
        title: 'Diako Edge Object Storage & Managed Redis',
        title_fa: 'زیرساخت فضای ابری آبجکت و ردیس مدیریت‌شده دیاکو',
        slug: 'diako-cloud-storage',
        summary: 'ذخیره‌سازی سریع سازگار با S3 با ترافیک نامحدود داخلی و CDN توزیع‌شده استانی',
        description: 'سرویس ذخیره‌سازی داده‌های حجیم دیاکو با رعایت کامل پدافند غیرعامل، گزینه‌ای بی‌رقیب برای استارتاپ‌ها و سازمان‌هایی است که نیازمند آپ‌تایم بالا و هزینه مقرون‌به‌صرفه هستند.',
        category_id: 'cloud-devops',
        vendor_name: 'ابر ارتباطات دیاکو',
        vendor_logo: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=150&auto=format&fit=crop&q=80',
        vendor_verified: true,
        rating: 4.85,
        reviews_count: 42,
        pricing_model: 'پرداخت ماهانه پلکانی',
        price_toman: 12000000,
        status: 'published',
        demo_url: '#',
        deployment: 'فضای ابری توزیع‌شده',
        sla_guarantee: '۹۹.۹۹٪',
        features: JSON.stringify([
          'سازگاری ۱۰۰٪ با کلاینت‌های AWS S3 و MinIO SDK',
          'رمزنگاری سمت سرور AES-256 در حالت سکون و انتقال',
          'ترافیک داخلی کامپیوتر با ترافیک نیم‌بها برای کاربران ایرانی',
          'بک‌آپ خودکار روزانه در ۳ سایت جغرافیایی مجزا'
        ]),
        tech_specs: JSON.stringify({
          protocol: 'S3 REST API Compatible',
          durability: '99.999999999% (11 9s)',
          bandwidth: '10 Gbps Uplink'
        }),
        tags: ['کلاود', 'آبجکت استوریج', 'ردیس', 'دواپس', 'ذخیره‌سازی داده']
      },
      {
        id: 'prod-qone-shield',
        title: 'Qone IAM Zero Trust Identity & MFA Gateway',
        title_fa: 'درگاه مدیریت هویت زیروتراست و احراز هویت چندعاملی کیوان',
        slug: 'qone-zero-trust-iam',
        summary: 'سیستم یکپارچه‌سازی ورود سازمانی SSO با توکن سخت‌افزاری FIDO2 و بیومتریک',
        description: 'پلتفرم امنیت هویت کیوان دسترسی کارکنان سازمان به کلیه داشبوردها و سیستم‌های ابری را بر اساس سیاست‌های Zero Trust، اعتبارسنجی موقعیت و دستگاه کنترل می‌کند.',
        category_id: 'security-auth',
        vendor_name: 'سامانه‌های امنیت سایبری کیوان',
        vendor_logo: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=150&auto=format&fit=crop&q=80',
        vendor_verified: true,
        rating: 4.96,
        reviews_count: 31,
        pricing_model: 'به ازای هر کاربر فعال',
        price_toman: 28000000,
        status: 'published',
        demo_url: 'https://qone-research.vercel.app',
        deployment: 'Cloud Native / On-Premise',
        sla_guarantee: '۹۹.۹۹٪',
        features: JSON.stringify([
          'پشتیبانی از پروتکل‌های SAML 2.0, OpenID Connect و OAuth2',
          'احراز هویت بدون رمزعبور (Passwordless) با کلیدهای وب‌اتن (WebAuthn)',
          'شناسایی الگوهای مشکوک ورود با تکیه بر تحلیل رفتار هوش مصنوعی',
          'ادغام با اکتیو دایرکتوری و سرورهای LDAP سازمانی'
        ]),
        tech_specs: JSON.stringify({
          standards: 'FIDO2 Certified, ISO 27001 compliant',
          integration: 'SAML 2.0 / OIDC / LDAP',
          audit: 'لاگ غیرقابل دستکاری و سازگار با SIEM'
        }),
        tags: ['امنیت', 'احراز هویت', 'زیروتراست', 'SSO', 'MFA']
      }
    ];

    for (const prod of products) {
      await client.query(`
        INSERT INTO echomarket_products (
          id, title, title_fa, slug, summary, description, category_id,
          vendor_name, vendor_logo, vendor_verified, rating, reviews_count,
          pricing_model, price_toman, status, demo_url, deployment,
          sla_guarantee, features, tech_specs, tags
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21
        )
        ON CONFLICT (id) DO UPDATE SET
          title = EXCLUDED.title,
          title_fa = EXCLUDED.title_fa,
          slug = EXCLUDED.slug,
          summary = EXCLUDED.summary,
          description = EXCLUDED.description,
          category_id = EXCLUDED.category_id,
          vendor_name = EXCLUDED.vendor_name,
          vendor_logo = EXCLUDED.vendor_logo,
          vendor_verified = EXCLUDED.vendor_verified,
          rating = EXCLUDED.rating,
          reviews_count = EXCLUDED.reviews_count,
          pricing_model = EXCLUDED.pricing_model,
          price_toman = EXCLUDED.price_toman,
          status = EXCLUDED.status,
          demo_url = EXCLUDED.demo_url,
          deployment = EXCLUDED.deployment,
          sla_guarantee = EXCLUDED.sla_guarantee,
          features = EXCLUDED.features,
          tech_specs = EXCLUDED.tech_specs,
          tags = EXCLUDED.tags;
      `, [
        prod.id, prod.title, prod.title_fa, prod.slug, prod.summary, prod.description,
        prod.category_id, prod.vendor_name, prod.vendor_logo, prod.vendor_verified,
        prod.rating, prod.reviews_count, prod.pricing_model, prod.price_toman,
        prod.status, prod.demo_url, prod.deployment, prod.sla_guarantee,
        prod.features, prod.tech_specs, prod.tags
      ]);
    }

    // Seed sample Inquiries
    console.log('Seeding sample inquiries...');
    const inquiries = [
      {
        id: 'inq-101',
        product_id: 'prod-karjoor',
        buyer_name: 'دکتر محمدرضا صادقی',
        buyer_email: 'sadeghi@foulad-co.ir',
        buyer_company: 'فولاد سیرجان گستر',
        buyer_phone: '09121112233',
        message: 'درخواست برگزاری جلسه دمو و بررسی قابلیت انطباق نرم‌افزار کارجور با شیفت‌های ۴ نوبته کارخانه‌ای.',
        requested_seats: 450,
        budget_range: '۱۰۰ تا ۳۰۰ میلیون تومان',
        status: 'pending',
        quote_amount: 180000000
      },
      {
        id: 'inq-102',
        product_id: 'prod-taline-fintech',
        buyer_name: 'مهندس آرش نویدی',
        buyer_email: 'navidi@sarmayeh-fund.com',
        buyer_company: 'صندوق سرمایه‌گذاری اروند',
        buyer_phone: '09133334455',
        message: 'استعلام هزینه تهیه لایسنس مادام‌العمر موتور تریدینگ و درخواست دسترسی به محیط تست سندباکس.',
        requested_seats: 15,
        budget_range: 'بیش از ۲۰۰ میلیون تومان',
        status: 'quoted',
        quote_amount: 85000000
      }
    ];

    for (const inq of inquiries) {
      await client.query(`
        INSERT INTO echomarket_inquiries (
          id, product_id, buyer_name, buyer_email, buyer_company, buyer_phone,
          message, requested_seats, budget_range, status, quote_amount
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        ON CONFLICT (id) DO NOTHING;
      `, [
        inq.id, inq.product_id, inq.buyer_name, inq.buyer_email, inq.buyer_company,
        inq.buyer_phone, inq.message, inq.requested_seats, inq.budget_range,
        inq.status, inq.quote_amount
      ]);
    }

    // Seed sample Contracts & Escrow
    console.log('Seeding sample contracts...');
    const contracts = [
      {
        id: 'cnt-8801',
        contract_number: 'ECM-2026-8801',
        product_id: 'prod-karjoor',
        product_title: 'سامانه کارجور — لایسنس ۵۰۰ کاربره',
        buyer_name: 'فولاد سیرجان گستر',
        vendor_name: 'گروه سامانه‌های کارجور',
        amount_toman: 180000000,
        status: 'in_escrow',
        license_key: 'KJ-ENT-9948-SIRO-2026-X8F',
        expires_at: new Date('2027-10-20')
      },
      {
        id: 'cnt-8802',
        contract_number: 'ECM-2026-8802',
        product_id: 'prod-qone-shield',
        product_title: 'درگاه امنیت هویت سازمانی کیوان',
        buyer_name: 'پتروشیمی نوین پارس',
        vendor_name: 'سامانه‌های امنیت کیوان',
        amount_toman: 95000000,
        status: 'active',
        license_key: 'QONE-PRO-8812-PARS-99A',
        expires_at: new Date('2027-04-15')
      }
    ];

    for (const c of contracts) {
      await client.query(`
        INSERT INTO echomarket_contracts (
          id, contract_number, product_id, product_title, buyer_name,
          vendor_name, amount_toman, status, license_key, expires_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        ON CONFLICT (id) DO NOTHING;
      `, [
        c.id, c.contract_number, c.product_id, c.product_title, c.buyer_name,
        c.vendor_name, c.amount_toman, c.status, c.license_key, c.expires_at
      ]);
    }

    // Seed Disputes
    console.log('Seeding sample dispute...');
    await client.query(`
      INSERT INTO echomarket_disputes (
        id, dispute_code, contract_id, complainant_name, respondent_name,
        subject, description, status, priority
      ) VALUES (
        'dsp-101', 'DSP-8801-A', 'cnt-8801', 'فولاد سیرجان گستر', 'گروه سامانه‌های کارجور',
        'عدم انطباق فرمت خروجی اکسل با فرمت اتوماسیون داخلی در نسخه ۳.۲',
        'مشتری تقاضای شخصی‌سازی ماژول اکسپورت پرسنلی مطابق با استاندارد اداره مالیات را دارد.',
        'investigating', 'medium'
      )
      ON CONFLICT (id) DO NOTHING;
    `);

    // Seed Team Members
    console.log('Seeding team members...');
    const team = [
      { id: 'usr-1', full_name: 'علی فیروزی', email: 'alii.firooziii@gmail.com', role: 'مدیر ارشد پلتفرم (Super Admin)', permissions: JSON.stringify(['all']), status: 'active' },
      { id: 'usr-2', full_name: 'سامان راد', email: 'saman.rad@echomarket.ir', role: 'سرپرست اعتبارسنجی ارائه‌دهندگان', permissions: JSON.stringify(['review_products', 'verify_vendors']), status: 'active' },
      { id: 'usr-3', full_name: 'فرناز حسینی', email: 'farnaz@echomarket.ir', role: 'مسئول داوری و ضمانت امانی', permissions: JSON.stringify(['escrow_release', 'arbitration']), status: 'active' }
    ];

    for (const t of team) {
      await client.query(`
        INSERT INTO echomarket_team_members (id, full_name, email, role, permissions, status)
        VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT (id) DO NOTHING;
      `, [t.id, t.full_name, t.email, t.role, t.permissions, t.status]);
    }

    console.log('Neon Database migration & seeding completed successfully!');
  } finally {
    client.release();
    await pool.end();
  }
}

seed().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});
