import { NextRequest, NextResponse } from 'next/server'
import db from '@/lib/db'

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id)

  if (isNaN(id)) {
    return NextResponse.json({ message: 'Invalid ID' }, { status: 400 })
  }

  try {
    const body = await req.json()
    const { is_visible } = body

    if (typeof is_visible !== 'boolean') {
      return NextResponse.json({ message: 'Invalid is_visible value' }, { status: 400 })
    }

    const result = await db.query(
      'UPDATE menu_items SET is_visible = $1 WHERE id = $2 RETURNING *',
      [is_visible, id]
    )

    if (result.rows.length === 0) {
      return NextResponse.json({ message: 'Menu item not found' }, { status: 404 })
    }

    return NextResponse.json(result.rows[0], { status: 200 })
  } catch (error) {
    console.error('PATCH error:', error)
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}

export function GET() {
  return NextResponse.json({ message: 'Method GET not allowed' }, { status: 405 })
}
