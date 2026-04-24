import { createClient } from '@/lib/supabase/server'
import { NextResponse, NextRequest } from 'next/server'
import { contactSchema } from '@/lib/validations/contact'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

// Initialize Upstash Redis & Rate Limiter
// Warning: These env variables must exist in .env.local
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
})

// Create a new ratelimiter, allowing 5 requests per 1 minute
const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, '1 m'),
  analytics: true,
})

export async function POST(request: NextRequest) {
  try {
    // 1. Rate Limiting Check
    // Get IP address for rate limiting
    const ip = request.headers.get('x-forwarded-for') ?? request.ip ?? '127.0.0.1'
    
    // Check rate limit only if Upstash variables are configured
    if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
      const { success } = await ratelimit.limit(`contact_rate_limit_${ip}`)
      if (!success) {
        return NextResponse.json(
          { error: 'Too many requests. Please try again later.' },
          { status: 429 }
        )
      }
    }

    // 2. Body Parsing & Validation
    const body = await request.json()
    // contactSchema.safeParse does validation without throwing an error
    const validationResult = contactSchema.safeParse(body)
    
    if (!validationResult.success) {
      // Map Zod errors
      const errors = validationResult.error.flatten().fieldErrors
      return NextResponse.json({ error: 'Validation failed', details: errors }, { status: 400 })
    }

    const validData = validationResult.data

    // 3. Database Insertion
    const supabase = await createClient()
    
    const { error: dbError } = await supabase
      .from('contact_messages')
      .insert({
        name: validData.name,
        email: validData.email,
        message: validData.message,
      })

    if (dbError) {
      console.error('DB Error:', dbError)
      return NextResponse.json({ error: 'Failed to save message. Please try again later.' }, { status: 500 })
    }

    return NextResponse.json({ message: 'Message sent successfully.' }, { status: 201 })
  } catch (err) {
    console.error('Contact API Error:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
