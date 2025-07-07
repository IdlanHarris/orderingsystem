import db from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const { rows } = await db.query('SELECT * FROM menu_items ORDER BY id')
    return NextResponse.json(rows)
  } catch (err) {
    return NextResponse.json(
      { message: 'Database error', error: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    const { is_visible } = await req.json()

    if (!id) {
      return NextResponse.json(
        { message: 'ID parameter is required' },
        { status: 400 }
      )
    }

    const { rows } = await db.query(
      'UPDATE menu_items SET is_visible = $1 WHERE id = $2 RETURNING *',
      [is_visible, id]
    )

    return NextResponse.json(rows[0])
  } catch (err) {
    return NextResponse.json(
      { message: 'Database error', error: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    )
  }
}