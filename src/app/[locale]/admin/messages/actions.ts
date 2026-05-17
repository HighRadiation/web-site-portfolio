'use server';

import { requireAdmin } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { logActivity } from '@/lib/admin/activity';

export async function deleteMessage(id: string): Promise<void> {
  const { supabase, user } = await requireAdmin();

  const { data: deleted, error } = await supabase
    .from('contact_messages')
    .delete()
    .eq('id', id)
    .select('id, name');

  if (error) {
    throw new Error(`Failed to delete message: ${error.message}`);
  }
  if (!deleted || deleted.length === 0) {
    throw new Error(
      'Message was not deleted. RLS policy likely blocked the delete — verify the ' +
        '"Admins can delete contact messages." policy and that your profile has is_admin=true.',
    );
  }

  await logActivity(supabase, user.id, 'deleted', 'message', deleted[0].name);

  revalidatePath('/admin/messages');
  redirect('/admin/messages');
}

export async function markAsRead(id: string): Promise<void> {
  const { supabase, user } = await requireAdmin();

  const { data: updated, error } = await supabase
    .from('contact_messages')
    .update({ read: true })
    .eq('id', id)
    .select('id, name');

  if (error) {
    throw new Error(`Failed to update message: ${error.message}`);
  }
  if (!updated || updated.length === 0) {
    throw new Error(
      'Message was not updated. RLS policy likely blocked the update — verify the ' +
        '"Admins can update contact messages." policy and that your profile has is_admin=true.',
    );
  }

  await logActivity(supabase, user.id, 'updated', 'message', updated[0].name);

  revalidatePath('/admin/messages');
}
