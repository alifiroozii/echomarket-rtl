import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('product_id');

    let sql = `
      SELECT i.*, p.title_fa as product_title, p.vendor_name
      FROM echomarket_inquiries i
      LEFT JOIN echomarket_products p ON i.product_id = p.id
      WHERE 1=1
    `;
    const params: any[] = [];

    if (productId) {
      params.push(productId);
      sql += ` AND i.product_id = $${params.length}`;
    }

    sql += ` ORDER BY i.created_at DESC`;

    const inquiries = await query(sql, params);
    return NextResponse.json({ success: true, count: inquiries.length, data: inquiries });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      product_id,
      buyer_name,
      buyer_email,
      buyer_company,
      buyer_phone,
      message,
      requested_seats,
      budget_range,
    } = body;

    if (!buyer_name || !buyer_email) {
      return NextResponse.json(
        { success: false, error: 'نام و ایمیل الزامی است' },
        { status: 400 }
      );
    }

    const id = 'inq-' + Date.now();
    const sql = `
      INSERT INTO echomarket_inquiries (
        id, product_id, buyer_name, buyer_email, buyer_company, buyer_phone,
        message, requested_seats, budget_range, status, quote_amount
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *;
    `;

    const rows = await query(sql, [
      id,
      product_id || null,
      buyer_name,
      buyer_email,
      buyer_company || '',
      buyer_phone || '',
      message || '',
      requested_seats || 1,
      budget_range || '',
      'pending',
      0,
    ]);

    return NextResponse.json({ success: true, data: rows[0] });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
