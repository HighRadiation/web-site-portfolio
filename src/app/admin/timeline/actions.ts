'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function addTimelineItem(formData: FormData): Promise<void> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    console.error('Unauthorized');
    return;
  }

  const role = formData.get('role') as string;
  const company = formData.get('company') as string;
  const date = formData.get('date') as string;
  const description = formData.get('description') as string;
  const type = formData.get('type') as string;

  const { error } = await supabase.from('timeline').insert([
    {
      role,
      company,
      date,
      description,
      type,
    },
  ]);

  if (error) {
    console.error('Error adding timeline item:', error);
    return;
  }

  revalidatePath('/admin/timeline');
  revalidatePath('/');
  redirect('/admin/timeline');
}

export async function deleteTimelineItem(id: string): Promise<void> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    console.error('Unauthorized');
    return;
  }

  const { error } = await supabase.from('timeline').delete().eq('id', id);

  if (error) {
    console.error('Error deleting timeline item:', error);
    return;
  }

  revalidatePath('/admin/timeline');
  revalidatePath('/');
}

export async function seedTimeline(): Promise<void> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    console.error('Unauthorized');
    return;
  }

  const items = [
    {
      date: '2024 – PRESENT',
      role: 'Confidential Stealth Project',
      company: 'Systems & Backend Architecture',
      description: 'Developing backend systems and scalable infrastructure.',
      type: 'experience',
    },
    {
      date: '2024 – PRESENT',
      role: 'Visual & Interface Design',
      company: 'Independent Product Design',
      description: 'Designed UI/UX systems and prototypes in Figma for my own projects.',
      type: 'experience',
    },
    {
      date: '2024 – PRESENT',
      role: 'Independent Developer',
      company: 'Mobile-Web Research',
      description: 'Focusing on mobile-web development and AI management.',
      type: 'experience',
    },
    {
      date: '2024 – PRESENT',
      role: 'Industrial Design (BSc)',
      company: '1st Year Student',
      description: 'Studying design thinking and functional aesthetics.',
      type: 'education',
    },
    {
      date: '2024 – 2025',
      role: '42 Istanbul',
      company: '1-Year Intensive Training',
      description: 'Focused on C, Unix systems, and low-level algorithms.',
      type: 'education',
    },
  ];

  const { error } = await supabase.from('timeline').insert(items);

  if (error) {
    console.error('Error seeding timeline:', error);
    return;
  }

  revalidatePath('/admin/timeline');
  revalidatePath('/');
  redirect('/admin/timeline');
}
