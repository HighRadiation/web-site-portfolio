'use server';

import { requireAdmin } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getTimelineFormSchema } from '@/lib/validations/timeline';
import { getTranslations, getLocale } from 'next-intl/server';
import { logActivity } from '@/lib/admin/activity';
import type { ActionState } from '@/lib/action-state';

export async function addTimelineItem(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const { supabase, user } = await requireAdmin();
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: 'Validation' });

  const parsed = getTimelineFormSchema(t).safeParse({
    role: formData.get('role'),
    company: formData.get('company'),
    date: formData.get('date'),
    description: formData.get('description'),
    type: formData.get('type'),
  });

  if (!parsed.success) {
    return {
      ok: false,
      error: t('pleaseFix'),
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const { error } = await supabase.from('timeline').insert({
    user_id: user.id,
    role: parsed.data.role,
    company: parsed.data.company,
    date: parsed.data.date,
    description: parsed.data.description,
    type: parsed.data.type,
  });

  if (error) {
    return { ok: false, error: `Failed to add timeline item: ${error.message}` };
  }

  await logActivity(
    supabase,
    user.id,
    'created',
    'timeline',
    `${parsed.data.role} · ${parsed.data.company}`,
  );

  revalidatePath('/admin/timeline');
  revalidatePath('/');
  redirect('/admin/timeline');
}

export async function deleteTimelineItem(id: string): Promise<void> {
  const { supabase, user } = await requireAdmin();

  const { data: deleted, error } = await supabase
    .from('timeline')
    .delete()
    .eq('id', id)
    .select('id, role, company');

  if (error) {
    throw new Error(`Failed to delete timeline item: ${error.message}`);
  }
  if (!deleted || deleted.length === 0) {
    throw new Error(
      'Timeline item was not deleted. RLS policy likely blocked the delete — verify the ' +
        '"Admins can delete timeline." policy and that your profile has is_admin=true.',
    );
  }

  await logActivity(
    supabase,
    user.id,
    'deleted',
    'timeline',
    `${deleted[0].role} · ${deleted[0].company}`,
  );

  revalidatePath('/admin/timeline');
  revalidatePath('/');
  redirect('/admin/timeline');
}
