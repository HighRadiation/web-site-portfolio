import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

let redis: Redis | null = null;
let ratelimit: Ratelimit | null = null;

export function getRateLimiter(
  requests: number = 60,
  window: `${number} ms` | `${number} s` | `${number} m` | `${number} h` | `${number} d` = '1 m',
): Ratelimit | null {
  if (!ratelimit) {
    const rawUrl = process.env.UPSTASH_REDIS_REST_URL || '';
    const rawToken = process.env.UPSTASH_REDIS_REST_TOKEN || '';

    const cleanUrl = rawUrl.replace(/^["']|["']$/g, '');
    const cleanToken = rawToken.replace(/^["']|["']$/g, '');

    if (cleanUrl && cleanToken) {
      redis = new Redis({
        url: cleanUrl,
        token: cleanToken,
      });
      ratelimit = new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(requests, window),
        analytics: true,
      });
    }
  }
  return ratelimit;
}
