import { createClient } from '@/lib/supabase/server';
import { NextResponse, NextRequest } from 'next/server';
import { z } from 'zod';

const profileSchema = z.object({
  full_name: z.string().max(255).optional(),
  bio: z.string().max(2000).optional(),
  avatar_url: z.union([z.string().url(), z.literal('')]).optional(),
  email: z.string().email().optional(),
  website: z.union([z.string().url(), z.literal('')]).optional(),
});

export async function PUT(request: NextRequest): Promise<NextResponse> {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const validationResult = profileSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const { data, error } = await supabase
      .from('profiles')
      .update(validationResult.data)
      .eq('id', user.id)
      .select()
      .maybeSingle();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
