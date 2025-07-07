//src/app/api/admin/inventory/remove

import { NextResponse } from 'next/server'
import db from '@/lib/db'

export async function DELETE(req: Request) {
  const client = await db.connect();
  try {
    const { id } = await req.json()

    // Validate the ID
    if (!id) {
      return NextResponse.json(
        { error: 'Item ID is required' },
        { status: 400 }
      )
    }

    // Check if item exists first
    const checkQuery = 'SELECT * FROM menu_items WHERE id = $1';
    const checkResult = await client.query(checkQuery, [id]);
    
    if (checkResult.rows.length === 0) {
      return NextResponse.json(
        { error: 'Item not found' },
        { status: 404 }
      )
    }

    // Delete the item
    const deleteQuery = 'DELETE FROM menu_items WHERE id = $1 RETURNING *';
    const deleteResult = await client.query(deleteQuery, [id]);

    return NextResponse.json(
      { 
        message: 'Item removed successfully',
        deletedItem: deleteResult.rows[0]
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error removing item:', error)
    return NextResponse.json(
      { 
        error: 'Failed to remove item',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  } finally {
    client.release();
  }
}