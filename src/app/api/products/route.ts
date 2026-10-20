import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const status = searchParams.get('status') || 'published';

    let sql = `
      SELECT p.*, c.name_fa as category_name_fa 
      FROM echomarket_products p
      LEFT JOIN echomarket_categories c ON p.category_id = c.id
      WHERE 1=1
    `;
    const params: any[] = [];

    if (status !== 'all') {
      params.push(status);
      sql += ` AND p.status = $${params.length}`;
    }

    if (category && category !== 'all') {
      params.push(category);
      sql += ` AND p.category_id = $${params.length}`;
    }

    if (search) {
      params.push(`%${search}%`);
      sql += ` AND (p.title_fa ILIKE $${params.length} OR p.title ILIKE $${params.length} OR p.summary ILIKE $${params.length})`;
    }

    sql += ` ORDER BY p.rating DESC, p.reviews_count DESC`;

    const products = await query(sql, params);
    return NextResponse.json({ success: true, count: products.length, data: products });
  } catch (error: any) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Database query failed' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      title_fa,
      slug,
      summary,
      description,
      category_id,
      vendor_name,
      pricing_model,
      price_toman,
      demo_url,
      deployment,
      sla_guarantee,
      features,
      tech_specs,
      tags,
    } = body;

    const id = 'prod-' + Date.now();
    const finalSlug = slug || 'prod-' + Math.random().toString(36).substring(2, 8);

    const sql = `
      INSERT INTO echomarket_products (
        id, title, title_fa, slug, summary, description, category_id,
        vendor_name, vendor_logo, vendor_verified, rating, reviews_count,
        pricing_model, price_toman, status, demo_url, deployment,
        sla_guarantee, features, tech_specs, tags
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21
      ) RETURNING *;
    `;

    const rows = await query(sql, [
      id,
      title || title_fa,
      title_fa,
      finalSlug,
      summary || '',
      description || '',
      category_id || 'crm-hr',
      vendor_name || 'ارائه‌دهنده تاییدنشده',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=150&auto=format&fit=crop&q=80',
      false,
      5.0,
      1,
      pricing_model || 'اشتراک ماهانه',
      price_toman || 0,
      'under_review',
      demo_url || '',
      deployment || 'SaaS ابری',
      sla_guarantee || '۹۹.۹٪',
      JSON.stringify(features || []),
      JSON.stringify(tech_specs || {}),
      tags || [],
    ]);

    return NextResponse.json({ success: true, data: rows[0] });
  } catch (error: any) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Product creation failed' },
      { status: 500 }
    );
  }
}
