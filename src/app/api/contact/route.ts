import { NextResponse, NextRequest } from 'next/server';
import { contactSchema } from '@/lib/validations/contact';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

// Lazy initialization for Redis and Ratelimit to prevent build-time errors
let redis: Redis | null = null;
let ratelimit: Ratelimit | null = null;

function getRateLimiter(): Ratelimit | null {
  if (!ratelimit) {
    const rawUrl = process.env.UPSTASH_REDIS_REST_URL || '';
    const rawToken = process.env.UPSTASH_REDIS_REST_TOKEN || '';

    // Strip external quotes that might have been copied into Vercel env settings
    const cleanUrl = rawUrl.replace(/^["']|["']$/g, '');
    const cleanToken = rawToken.replace(/^["']|["']$/g, '');

    if (cleanUrl && cleanToken) {
      redis = new Redis({
        url: cleanUrl,
        token: cleanToken,
      });
      ratelimit = new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(5, '1 m'),
        analytics: true,
      });
    }
  }
  return ratelimit;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // 1. Rate Limiting Check
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ?? '127.0.0.1';

    const limiter = getRateLimiter();
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
      console.error('Database Error Details:', {
        message: dbError.message,
        details: dbError.details,
        hint: dbError.hint,
        code: dbError.code,
      });
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
