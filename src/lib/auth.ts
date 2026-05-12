import { NextResponse } from 'next/server';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import type { Database } from '@/types/supabase';
import type { SupabaseClient, User } from '@supabase/supabase-js';

type AuthResult =
  | { ok: true; user: User }
  | { ok: false; status: 401 | 403; message: string };

async function checkAdmin(supabase: SupabaseClient<Database>): Promise<AuthResult> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { ok: false, status: 401, message: 'Unauthorized' };
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', user.id)
    .single();

  if (!profile?.is_admin) {
    return { ok: false, status: 403, message: 'Forbidden: admin privileges required' };
  }

  return { ok: true, user };
}

/**
 * For server actions and server components. Redirects unauthenticated users to
 * /login; throws if the user is signed in but not an admin.
 */
export async function requireAdmin(): Promise<{
  supabase: SupabaseClient<Database>;
  user: User;
}> {
  const supabase = await createClient();
  const result = await checkAdmin(supabase);
  if (!result.ok) {
    if (result.status === 401) redirect('/login');
    throw new Error(result.message);
  }
  return { supabase, user: result.user };
}

/**
 * For API route handlers. Returns the Supabase client + user on success, or a
 * pre-baked NextResponse to short-circuit the handler on failure.
 */
export async function requireAdminApi(): Promise<
  | { supabase: SupabaseClient<Database>; user: User; response?: undefined }
  | { response: NextResponse; supabase?: undefined; user?: undefined }
> {
  const supabase = await createClient();
  const result = await checkAdmin(supabase);
  if (!result.ok) {
    return {
      response: NextResponse.json({ error: result.message }, { status: result.status }),
    };
  }
  return { supabase, user: result.user };
}
