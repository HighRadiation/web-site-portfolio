import { NextResponse } from 'next/server';
import openapiSpec from '@/lib/swagger/openapi.json';
import { createClient } from '@/lib/supabase/server';

export async function GET(): Promise<NextResponse> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.json(openapiSpec);
}
