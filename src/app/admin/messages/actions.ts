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
    throw new Error('Unauthorized: admin privileges required to delete a message');
  }

  const { data: deleted, error } = await supabase
    .from('contact_messages')
    .delete()
    .eq('id', id)
    .select('id');

  if (error) {
    throw new Error(`Failed to delete message: ${error.message}`);
  }
  if (!deleted || deleted.length === 0) {
    throw new Error(
      'Message was not deleted. RLS policy likely blocked the delete — verify the ' +
        '"Admins can delete contact messages." policy and that your profile has is_admin=true.',
    );
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
    throw new Error('Unauthorized: admin privileges required to mark a message as read');
  }

  const { data: updated, error } = await supabase
    .from('contact_messages')
    .update({ read: true })
    .eq('id', id)
    .select('id');

  if (error) {
    throw new Error(`Failed to update message: ${error.message}`);
  }
  if (!updated || updated.length === 0) {
    throw new Error(
      'Message was not updated. RLS policy likely blocked the update — verify the ' +
        '"Admins can update contact messages." policy and that your profile has is_admin=true.',
    );
  }

  revalidatePath('/admin/messages');
}
