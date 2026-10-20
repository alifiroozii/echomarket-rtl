import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const disputes = await query(`
      SELECT * FROM echomarket_disputes
      ORDER BY created_at DESC;
    `);
    return NextResponse.json({ success: true, data: disputes });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { contract_id, complainant_name, respondent_name, subject, description, priority } = body;

    const id = 'dsp-' + Date.now();
    const dispute_code = 'DSP-' + Math.floor(1000 + Math.random() * 9000);

    const sql = `
      INSERT INTO echomarket_disputes (
        id, dispute_code, contract_id, complainant_name, respondent_name,
        subject, description, status, priority
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *;
    `;

    const rows = await query(sql, [
      id,
      dispute_code,
      contract_id || null,
      complainant_name,
      respondent_name || 'تیم پشتیبانی اکومارکت',
      subject,
      description,
      'open',
      priority || 'medium',
    ]);

    return NextResponse.json({ success: true, data: rows[0] });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status } = body;
    const sql = `UPDATE echomarket_disputes SET status = $2 WHERE id = $1 RETURNING *;`;
    const rows = await query(sql, [id, status]);
    return NextResponse.json({ success: true, data: rows[0] });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
