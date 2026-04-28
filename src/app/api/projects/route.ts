/*
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
*/

/*
import { createClient } from '@/lib/supabase/server'
import { NextResponse, NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const supabase = await createClient()

  const { data, error } = await supabase.from('projects').select('*')

  console.log('DATA:', data)
  console.log('ERROR:', error)

  if (error) {
    return NextResponse.json({ error: error.message, details: error }, { status: 500 })
  }

  return NextResponse.json(data)
}
*/

import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(_request: NextRequest): Promise<NextResponse> {
  const supabase = createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  const { data, error } = await supabase.from('projects').select('*');

  console.log('DATA:', data);
  console.log('ERROR:', error);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
