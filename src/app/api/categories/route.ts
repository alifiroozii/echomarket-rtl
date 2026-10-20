import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const categories = await query(`
      SELECT c.*, COUNT(p.id) as actual_product_count
      FROM echomarket_categories c
      LEFT JOIN echomarket_products p ON c.id = p.category_id AND p.status = 'published'
      GROUP BY c.id
      ORDER BY c.count DESC;
    `);
    return NextResponse.json({ success: true, data: categories });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
