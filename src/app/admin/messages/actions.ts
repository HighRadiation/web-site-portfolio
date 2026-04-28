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

  const { error } = await supabase.from('contact_messages').delete().eq('id', id);

  if (error) {
    console.error('Error deleting message:', error);
    return;
  }

  revalidatePath('/admin/messages');
}

export async function markAsRead(id: string): Promise<void> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect('/login');
  }

  const { error } = await supabase.from('contact_messages').update({ read: true }).eq('id', id);

  if (error) {
    console.error('Error updating message:', error);
    return;
  }

  revalidatePath('/admin/messages');
}
