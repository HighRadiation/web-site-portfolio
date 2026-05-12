'use server';

import { requireAdmin } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function addSkill(formData: FormData): Promise<void> {
  const { supabase, user } = await requireAdmin();

  const name = formData.get('name') as string;
  const category = formData.get('category') as string;

  const { error } = await supabase.from('skills').insert([
    {
      user_id: user.id,
      name,
      category,
    },
  ]);

  if (error) {
    throw new Error(`Failed to add skill: ${error.message}`);
  }

  revalidatePath('/admin/skills');
  revalidatePath('/');
  redirect('/admin/skills');
}

export async function deleteSkill(id: string): Promise<void> {
  const { supabase } = await requireAdmin();

  const { data: deleted, error } = await supabase
    .from('skills')
    .delete()
    .eq('id', id)
    .select('id');

  if (error) {
    throw new Error(`Failed to delete skill: ${error.message}`);
  }
  if (!deleted || deleted.length === 0) {
    throw new Error(
      'Skill was not deleted. RLS policy likely blocked the delete — verify the ' +
        '"Admins can delete skills." policy and that your profile has is_admin=true.',
    );
  }

  revalidatePath('/admin/skills');
  revalidatePath('/');
  redirect('/admin/skills');
}
