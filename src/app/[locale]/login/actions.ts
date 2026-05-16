'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { loginSchema } from '@/lib/validations/auth';
import type { ActionState } from '@/lib/action-state';

export async function login(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const supabase = await createClient();

  const parsed = loginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!parsed.success) {
    return {
      ok: false,
      error: 'Please fix the highlighted fields.',
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error) {
    return { ok: false, error: 'Login failed. Please check your credentials.' };
  }

  redirect('/admin');
}


export async function logout(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/login');
}
