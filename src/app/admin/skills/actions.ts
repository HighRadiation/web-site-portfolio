'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function addSkill(formData: FormData): Promise<void> {
  const supabase = await createClient();

  const name = formData.get('name') as string;
  const category = formData.get('category') as string;

  const { error } = await supabase.from('skills').insert([
    {
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

  const items = [
    { name: 'C', category: 'systems' },
    { name: 'Linux', category: 'systems' },
    { name: 'Shell', category: 'systems' },
    { name: 'Figma', category: 'design' },
    { name: 'UI/UX', category: 'design' },
    { name: 'Flutter', category: 'mobile_web' },
    { name: 'Architecture', category: 'mobile_web' },
    { name: 'Management & Orchestration', category: 'ai' },
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
