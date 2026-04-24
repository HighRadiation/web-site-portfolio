import { createClient } from '@/lib/supabase/server'
import { NextResponse, NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const sort = searchParams.get('sort') || 'desc'
  const tech = searchParams.get('tech')

  const supabase = await createClient()
  
  let query = supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: sort === 'asc' })

  if (tech) {
    query = query.contains('technologies', [tech])
  }

  const { data, error } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}
