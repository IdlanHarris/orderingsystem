// app/api/admin/inventory/edit/route.ts

import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export async function PUT(req: NextRequest) {
  try {
    const { id, name, price, is_visible } = await req.json();

    if (!id || !name || price == null || is_visible == null) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { rows } = await db.query(
      'UPDATE menu_items SET name = $1, price = $2, is_visible = $3 WHERE id = $4 RETURNING *',
      [name, price, is_visible, id]
    );

    if (rows.length === 0) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    return NextResponse.json(rows[0]);
  } catch (err) {
    console.error('Error updating item:', err);
    return NextResponse.json({ error: 'Failed to update item' }, { status: 500 });
  }
}
