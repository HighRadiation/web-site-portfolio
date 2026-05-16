'use server';

import { requireAdmin } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { projectFormSchema } from '@/lib/validations/project';
import type { ActionState } from '@/lib/action-state';

export async function addProject(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const { supabase, user } = await requireAdmin();

  const parsed = projectFormSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
    link: formData.get('link') ?? '',
  });

  if (!parsed.success) {
    return {
      ok: false,
      error: 'Please fix the highlighted fields.',
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const { error } = await supabase.from('projects').insert({
    user_id: user.id,
    title: parsed.data.name,
    description: parsed.data.description,
    github_link: parsed.data.link || null,
  });

  if (error) {
    return { ok: false, error: `Failed to add project: ${error.message}` };
  }

  revalidatePath('/admin/projects');
  revalidatePath('/');
  redirect('/admin/projects');
}

export async function deleteProject(id: string): Promise<void> {
  const { supabase } = await requireAdmin();

  const { data: deleted, error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id)
    .select('id');

  if (error) {
    throw new Error(`Failed to delete project: ${error.message}`);
  }
  if (!deleted || deleted.length === 0) {
    throw new Error(
      'Project was not deleted. RLS policy likely blocked the delete — verify the ' +
        '"Admins can delete projects." policy and that your profile has is_admin=true.',
    );
  }

  revalidatePath('/admin/projects');
  revalidatePath('/');
  redirect('/admin/projects');
}
