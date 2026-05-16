import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import type { Database } from '@/types/supabase';
import type { SupabaseClient, User } from '@supabase/supabase-js';

/**
 * Single standard authorization layer for server actions and components.
 * Redirects unauthenticated users to /login.
 * Returns the configured Supabase client and the authenticated user.
 */
export async function requireAdmin(): Promise<{
  supabase: SupabaseClient<Database>;
  user: User;
}> {
  const supabase = await createClient();
  
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return { supabase, user };
}
