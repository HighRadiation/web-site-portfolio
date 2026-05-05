'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function makeMeAdmin(): Promise<void> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { error } = await supabase
    .from('profiles')
    .update({ is_admin: true })
    .eq('id', user.id);

  if (error) {
    console.error('Error upgrading to admin:', error);
    return;
  }

  revalidatePath('/admin');
  redirect('/admin?success=admin_upgraded');
}
