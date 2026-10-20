import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const contracts = await query(`
      SELECT * FROM echomarket_contracts
      ORDER BY created_at DESC;
    `);
    return NextResponse.json({ success: true, data: contracts });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status } = body;

    const sql = `
      UPDATE echomarket_contracts
      SET status = $2
      WHERE id = $1
      RETURNING *;
    `;
    const rows = await query(sql, [id, status]);
    return NextResponse.json({ success: true, data: rows[0] });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
