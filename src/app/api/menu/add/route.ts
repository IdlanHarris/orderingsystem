// app/api/menu/route.ts
import { NextResponse } from 'next/server'
import db from '@/lib/db' // Your existing db connection

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, price, image = null, is_visible = true } = body

    // Validate required fields
    if (!name || typeof name !== 'string') {
      return NextResponse.json(
        { error: 'Valid name is required' },
        { status: 400 }
      )
    }

    const priceNum = parseFloat(price)
    if (isNaN(priceNum) || priceNum <= 0) {
      return NextResponse.json(
        { error: 'Valid positive price is required' },
        { status: 400 }
      )
    }

    // Insert new menu item with all your fields
    const result = await db.query(
      `INSERT INTO menu_items (name, price, is_visible) 
       VALUES ($1, $2, $3) 
       RETURNING id, name, price, is_visible`,
      [name, priceNum, is_visible]
    )

    if (result.rows.length === 0) {
      throw new Error('Failed to create menu item')
    }

    return NextResponse.json(result.rows[0], { status: 201 })
  } catch (error) {
    console.error('Error adding menu item:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Database operation failed' },
      { status: 500 }
    )
  }
}