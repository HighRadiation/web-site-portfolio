'use server';

import { requireAdmin } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getProjectFormSchema } from '@/lib/validations/project';
import { getTranslations, getLocale } from 'next-intl/server';
import type { ActionState } from '@/lib/action-state';

export async function addProject(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const { supabase, user } = await requireAdmin();
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: 'Validation' });

  const parsed = getProjectFormSchema(t).safeParse({
    name: formData.get('name'),
    name_tr: formData.get('name_tr') ?? '',
    description: formData.get('description'),
    description_tr: formData.get('description_tr') ?? '',
    github_link: formData.get('github_link') ?? '',
    live_link: formData.get('live_link') ?? '',
    image_url: formData.get('image_url') ?? '',
    technologies: formData.get('technologies') ?? '',
  });

  if (!parsed.success) {
    return {
      ok: false,
      error: t('pleaseFix'),
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const techArray = parsed.data.technologies
    ? parsed.data.technologies
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean)
    : [];

  const { error } = await supabase.from('projects').insert({
    user_id: user.id,
    title: parsed.data.name,
    title_tr: parsed.data.name_tr || null,
    description: parsed.data.description,
    description_tr: parsed.data.description_tr || null,
    github_link: parsed.data.github_link || null,
    live_link: parsed.data.live_link || null,
    image_url: parsed.data.image_url || null,
    technologies: techArray.length > 0 ? techArray : null,
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
