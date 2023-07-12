import { db } from '@vercel/postgres'
import { NextResponse } from 'next/server'

export async function GET() {
  const client = await db.connect()

  try {
    client.sql`INSERT INTO carts (user_id, text) VALUES (2, 'noiss')`
  } catch (error) {
    return NextResponse.json({ error })
  }

  return NextResponse.json('stuff')
}
