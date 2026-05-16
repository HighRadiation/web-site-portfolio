import { NextResponse, NextRequest } from 'next/server';
import { getContactSchema } from '@/lib/validations/contact';
import { createClient } from '@/lib/supabase/server';
import { getRateLimiter } from '@/lib/rate-limit';
import { getTranslations } from 'next-intl/server';

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ?? '127.0.0.1';

    const limiter = getRateLimiter(10, '1 m');
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

    const body = await request.json();
    const acceptLang = request.headers.get('accept-language') || 'en';
    const locale = acceptLang.split(',')[0].split('-')[0] === 'tr' ? 'tr' : 'en';

    const t = await getTranslations({ locale, namespace: 'Validation' });
    const validationResult = getContactSchema(t).safeParse(body);

    if (!validationResult.success) {
      const errors = validationResult.error.flatten().fieldErrors;
      return NextResponse.json({ error: t('pleaseFix'), details: errors }, { status: 400 });
    }

    const validData = validationResult.data;

    const supabase = await createClient();

    const { error: dbError } = await supabase.from('contact_messages').insert({
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
