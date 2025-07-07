import { NextResponse } from 'next/server'
import db from '@/lib/db'
import { writeFile } from 'fs/promises'
import path from 'path'
import { randomUUID } from 'crypto'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()

    const name = formData.get('name') as string
    const price = formData.get('price') as string
    const description = formData.get('description') as string
    const is_visible = formData.get('is_visible') === 'true'
    const image = formData.get('image') as File

    const categoryRaw = formData.get('category_id')
    const category_id = categoryRaw ? parseInt(categoryRaw.toString()) : NaN
    
    // Validation
    if (!name || typeof name !== 'string') {
      return NextResponse.json({ error: 'Valid name is required' }, { status: 400 })
    }

    const priceNum = parseFloat(price)
    if (isNaN(priceNum) || priceNum <= 0) {
      return NextResponse.json({ error: 'Valid positive price is required' }, { status: 400 })
    }

    if (isNaN(category_id)) {
      return NextResponse.json({ error: 'Valid category_id is required' }, { status: 400 })
    }

    if (!image) {
      return NextResponse.json({ error: 'Image is required' }, { status: 400 })
    }

    // Get file extension from MIME type
    const ext = image.type.split('/')[1]
    const fileName = `${randomUUID()}.${ext}`
    const filePath = path.join(process.cwd(), 'public/images', fileName)

    const arrayBuffer = await image.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    await writeFile(filePath, buffer)

    const image_url = `/images/${fileName}`

    // Insert into database
    const result = await db.query(
      `INSERT INTO menu_items (name, price, images, is_visible, description, category_id)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, name, price, images, is_visible, description, category_id`,
      [name, priceNum, image_url, is_visible, description, category_id]
    )

    console.log('category_id raw:', category_id)
    return NextResponse.json(result.rows[0], { status: 201 })
  } catch (error) {
    console.error('Error adding menu item:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Database operation failed' },
      { status: 500 }
    )
  }
}
