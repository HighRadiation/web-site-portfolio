import { NextResponse, NextRequest } from 'next/server';
import { contactSchema } from '@/lib/validations/contact';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { getRateLimiter } from '@/lib/rate-limit';

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // 1. Rate Limiting Check
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ?? '127.0.0.1';

    const limiter = getRateLimiter(5, '1 m');
    if (!limiter) {
      console.error('Rate limiting is not configured (missing Redis credentials).');
      return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 });
    }

    const { success } = await limiter.limit(`contact_rate_limit_${ip}`);
    if (!success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 },
      );
    }

    // 2. Body Parsing & Validation
    const body = await request.json();
    const validationResult = contactSchema.safeParse(body);

    if (!validationResult.success) {
      const errors = validationResult.error.flatten().fieldErrors;
      return NextResponse.json({ error: 'Validation failed', details: errors }, { status: 400 });
    }

    const validData = validationResult.data;

    // 3. Database Insertion (using Admin / Service Role Client to bypass RLS if configured)
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseServiceKey) {
      console.error('Missing SUPABASE_SERVICE_ROLE_KEY environment variable');
      return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 });
    }

    const supabaseAdmin = createSupabaseClient(supabaseUrl, supabaseServiceKey);

    const { error: dbError } = await supabaseAdmin.from('contact_messages').insert({
      name: validData.name,
      email: validData.email,
      message: validData.message,
    });

    if (dbError) {
      console.error('DB insert failed');
      return NextResponse.json(
        { error: 'Failed to save message. Please try again later.' },
        { status: 500 },
      );
    }

    return NextResponse.json({ message: 'Message sent successfully.' }, { status: 201 });
  } catch (_err) {
    console.error('Contact API Error:', _err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
