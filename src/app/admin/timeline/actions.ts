'use server';

import { requireAdmin } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function addTimelineItem(formData: FormData): Promise<void> {
  const { supabase, user } = await requireAdmin();

  const role = formData.get('role') as string;
  const company = formData.get('company') as string;
  const date = formData.get('date') as string;
  const description = formData.get('description') as string;
  const type = formData.get('type') as 'experience' | 'education';

  const { error } = await supabase.from('timeline').insert([
    {
      role,
      company,
      date,
      description,
      type,
      user_id: user.id,
    },
  ]);

  if (error) {
    throw new Error(`Failed to add timeline item: ${error.message}`);
  }

  revalidatePath('/admin/timeline');
  revalidatePath('/');
  redirect('/admin/timeline');
}

export async function deleteTimelineItem(id: string): Promise<void> {
  const { supabase } = await requireAdmin();

  const { data: deleted, error } = await supabase
    .from('timeline')
    .delete()
    .eq('id', id)
    .select('id');

  if (error) {
    throw new Error(`Failed to delete timeline item: ${error.message}`);
  }
  if (!deleted || deleted.length === 0) {
    throw new Error(
      'Timeline item was not deleted. RLS policy likely blocked the delete — verify the ' +
        '"Admins can delete timeline." policy and that your profile has is_admin=true.',
    );
  }

  revalidatePath('/admin/timeline');
  revalidatePath('/');
  redirect('/admin/timeline');
}
