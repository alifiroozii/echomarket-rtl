import pg from 'pg';
const { Pool } = pg;

const connectionString =
  process.env.DATABASE_URL ||
  'postgresql://neondb_owner:npg_FkHeoPLv6B5M@ep-broad-star-b8r2jyan-pooler.c-14.us-east-1.aws.neon.tech/neondb?sslmode=require';

let pool: pg.Pool | null = null;

export function getPool(): pg.Pool {
  if (!pool) {
    pool = new Pool({
      connectionString,
      ssl: { rejectUnauthorized: false },
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
    });
  }
  return pool;
}

export async function query<T = any>(text: string, params?: any[]): Promise<T[]> {
  const p = getPool();
  try {
    const res = await p.query(text, params);
    return res.rows;
  } catch (error) {
    console.error('Database query error:', error, 'Query:', text);
    throw error;
  }
}

export interface Product {
  id: string;
  title: string;
  title_fa: string;
  slug: string;
  summary: string;
  description: string;
  category_id: string;
  vendor_name: string;
  vendor_logo: string;
  vendor_verified: boolean;
  rating: number;
  reviews_count: number;
  pricing_model: string;
  price_toman: number;
  status: string;
  demo_url?: string;
  deployment?: string;
  sla_guarantee?: string;
  features?: string[];
  tech_specs?: Record<string, string>;
  tags?: string[];
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
  name_fa: string;
  icon: string;
  description: string;
  count: number;
}

export interface Inquiry {
  id: string;
  product_id?: string;
  product_title?: string;
  buyer_name: string;
  buyer_email: string;
  buyer_company?: string;
  buyer_phone?: string;
  message?: string;
  requested_seats?: number;
  budget_range?: string;
  status: string;
  quote_amount?: number;
  created_at: string;
}

export interface Contract {
  id: string;
  contract_number: string;
  product_id?: string;
  product_title?: string;
  buyer_name: string;
  vendor_name: string;
  amount_toman: number;
  status: string;
  license_key?: string;
  expires_at?: string;
  created_at: string;
}

export interface Dispute {
  id: string;
  dispute_code: string;
  contract_id?: string;
  complainant_name: string;
  respondent_name: string;
  subject: string;
  description: string;
  status: string;
  priority: string;
  created_at: string;
}
