import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';

/**
 * Service-role Supabase client. Bypasses RLS — only use server-side and
 * never expose `SUPABASE_SERVICE_ROLE_KEY` to the browser.
 */
export function createAdminClient(): SupabaseClient<Database> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    throw new Error('Missing Supabase URL or SUPABASE_SERVICE_ROLE_KEY');
  }
  return createSupabaseClient<Database>(url, serviceKey);
}
