'use server';

import { requireAdmin } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { skillFormSchema } from '@/lib/validations/skill';
import type { ActionState } from '@/lib/action-state';

export async function addSkill(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const { supabase, user } = await requireAdmin();

  const parsed = skillFormSchema.safeParse({
    name: formData.get('name'),
    category: formData.get('category'),
  });

  if (!parsed.success) {
    return {
      ok: false,
      error: 'Please fix the highlighted fields.',
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const { error } = await supabase.from('skills').insert({
    user_id: user.id,
    name: parsed.data.name,
    category: parsed.data.category,
  });

  if (error) {
    return { ok: false, error: `Failed to add skill: ${error.message}` };
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
