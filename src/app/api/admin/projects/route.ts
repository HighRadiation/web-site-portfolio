import { createClient } from '@/lib/supabase/server';
import { NextResponse, NextRequest } from 'next/server';
import { z } from 'zod';

const projectSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().max(2000).optional(),
  image_url: z.union([z.string().url(), z.literal('')]).optional(),
  live_link: z.union([z.string().url(), z.literal('')]).optional(),
  github_link: z.union([z.string().url(), z.literal('')]).optional(),
  technologies: z.array(z.string()).optional(),
});

export async function POST(request: NextRequest): Promise<NextResponse> {
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
    const validationResult = projectSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const { data, error } = await supabase
      .from('projects')
      .insert({ ...validationResult.data, user_id: user.id })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
