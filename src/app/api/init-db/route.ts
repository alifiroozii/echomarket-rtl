import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await query(`
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
    `);

    const countRes = await query('SELECT count(*) FROM echomarket_products');
    return NextResponse.json({
      success: true,
      message: 'EchoMarket Neon tables verified!',
      productCount: countRes[0].count,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
