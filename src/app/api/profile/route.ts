import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = await createClient()
  
  // Portfolyo için genellikle en güncel tek bir profil döner
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .limit(1)
    .single()

  if (error && error.code !== 'PGRST116') { // PGRST116: no rows returned
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data || {})
}
