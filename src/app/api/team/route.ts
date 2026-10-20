import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const members = await query(`
      SELECT * FROM echomarket_team_members
      ORDER BY last_active DESC;
    `);
    return NextResponse.json({ success: true, data: members });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { full_name, email, role, permissions } = body;

    const id = 'usr-' + Date.now();
    const sql = `
      INSERT INTO echomarket_team_members (id, full_name, email, role, permissions, status)
      VALUES ($1, $2, $3, $4, $5, 'active')
      RETURNING *;
    `;
    const rows = await query(sql, [id, full_name, email, role, JSON.stringify(permissions || [])]);
    return NextResponse.json({ success: true, data: rows[0] });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, permissions, status } = body;

    let sets = [];
    let params: any[] = [id];

    if (permissions) {
      params.push(JSON.stringify(permissions));
      sets.push(`permissions = $${params.length}`);
    }

    if (status) {
      params.push(status);
      sets.push(`status = $${params.length}`);
    }

    const sql = `UPDATE echomarket_team_members SET ${sets.join(', ')} WHERE id = $1 RETURNING *;`;
    const rows = await query(sql, params);
    return NextResponse.json({ success: true, data: rows[0] });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
