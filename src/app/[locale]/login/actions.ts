'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { getLoginSchema } from '@/lib/validations/auth';
import { getTranslations, getLocale } from 'next-intl/server';
import type { ActionState } from '@/lib/action-state';

export async function login(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  try {
    const supabase = await createClient();
    const locale = await getLocale();
    const t = await getTranslations({ locale, namespace: 'Validation' });

    const parsed = getLoginSchema(t).safeParse({
      email: formData.get('email'),
      password: formData.get('password'),
    });

    if (!parsed.success) {
      return {
        ok: false,
        error: t('pleaseFix'),
        fieldErrors: parsed.error.flatten().fieldErrors,
      };
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: parsed.data.email,
      password: parsed.data.password,
    });

    if (error) {
      return { ok: false, error: t('loginFailed') };
    }

    redirect('/admin');
  } catch (err) {
    const errorObj = err as { digest?: string; message?: string };
    if (
      errorObj &&
      (errorObj.digest?.startsWith('NEXT_REDIRECT') || errorObj.message === 'NEXT_REDIRECT')
    ) {
      throw err;
    }
    console.error('Login action error:', err);
    const msg = errorObj.message || String(err);
    return { ok: false, error: `Server Error: ${msg}` };
  }
}


export async function logout(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/login');
}
