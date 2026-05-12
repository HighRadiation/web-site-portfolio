'use server';

import { requireAdmin } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function addProject(formData: FormData): Promise<void> {
  const { supabase, user } = await requireAdmin();

  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const link = formData.get('link') as string;

  const { error } = await supabase.from('projects').insert([
    {
      user_id: user.id,
      title: name,
      description: description,
      github_link: link,
    },
  ]);

  if (error) {
    throw new Error(`Failed to add project: ${error.message}`);
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
