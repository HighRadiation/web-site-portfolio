'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function deleteMessage(id: string): Promise<void> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect('/login');
  }

  // Admin Check
  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', user.id)
    .single();

  if (!profile?.is_admin) {
    console.error('Unauthorized delete attempt');
    return;
  }

  const { error } = await supabase.from('contact_messages').delete().eq('id', id);

  if (error) {
    console.error('Error deleting message:', error);
    return;
  }

  revalidatePath('/admin/messages');
  redirect('/admin/messages');
}

export async function markAsRead(id: string): Promise<void> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect('/login');
  }

  // Admin Check
  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', user.id)
    .single();

  if (!profile?.is_admin) {
    console.error('Unauthorized markAsRead attempt');
    return;
  }

  const { error } = await supabase.from('contact_messages').update({ read: true }).eq('id', id);

  if (error) {
    console.error('Error updating message:', error);
    return;
  }

  revalidatePath('/admin/messages');
}
