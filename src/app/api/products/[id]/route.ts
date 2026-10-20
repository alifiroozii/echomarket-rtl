import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const sql = `
      SELECT p.*, c.name_fa as category_name_fa 
      FROM echomarket_products p
      LEFT JOIN echomarket_categories c ON p.category_id = c.id
      WHERE p.id = $1 OR p.slug = $1
      LIMIT 1
    `;
    const rows = await query(sql, [id]);
    if (rows.length === 0) {
      return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: rows[0] });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { status, vendor_verified } = body;

    let setClauses = [];
    let sqlParams: any[] = [id];

    if (status !== undefined) {
      sqlParams.push(status);
      setClauses.push(`status = $${sqlParams.length}`);
    }

    if (vendor_verified !== undefined) {
      sqlParams.push(vendor_verified);
      setClauses.push(`vendor_verified = $${sqlParams.length}`);
    }

    if (setClauses.length === 0) {
      return NextResponse.json({ success: false, error: 'No fields to update' }, { status: 400 });
    }

    const sql = `
      UPDATE echomarket_products
      SET ${setClauses.join(', ')}
      WHERE id = $1
      RETURNING *;
    `;

    const rows = await query(sql, sqlParams);
    return NextResponse.json({ success: true, data: rows[0] });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
