'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function addSkill(formData: FormData): Promise<void> {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    console.error('Unauthorized');
    return;
  }

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
    console.error('Error adding skill:', error);
    return;
  }

  revalidatePath('/admin/skills');
  revalidatePath('/');
  redirect('/admin/skills');
}

export async function deleteSkill(id: string): Promise<void> {
  const supabase = await createClient();

  const { error } = await supabase.from('skills').delete().eq('id', id);

  if (error) {
    console.error('Error deleting skill:', error);
    return;
  }

  revalidatePath('/admin/skills');
  revalidatePath('/');
}

export async function seedSkills(): Promise<void> {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    console.error('Unauthorized');
    return;
  }

  const items = [
    { user_id: user.id, name: 'C', category: 'systems' },
    { user_id: user.id, name: 'Linux', category: 'systems' },
    { user_id: user.id, name: 'Shell', category: 'systems' },
    { user_id: user.id, name: 'Figma', category: 'design' },
    { user_id: user.id, name: 'UI/UX', category: 'design' },
    { user_id: user.id, name: 'Flutter', category: 'mobile_web' },
    { user_id: user.id, name: 'Architecture', category: 'mobile_web' },
    { user_id: user.id, name: 'Management & Orchestration', category: 'ai' },
  ];

  const { error } = await supabase.from('skills').insert(items);

  if (error) {
    console.error('Error seeding skills:', error);
    return;
  }

  revalidatePath('/admin/skills');
  revalidatePath('/');
  redirect('/admin/skills');
}
