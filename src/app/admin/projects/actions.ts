'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function addProject(formData: FormData): Promise<void> {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    console.error('Unauthorized');
    return;
  }

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
    console.error('Error adding project:', error);
    return;
  }

  revalidatePath('/admin/projects');
  revalidatePath('/'); // Ana sayfayı da güncelle
  redirect('/admin/projects');
}

export async function deleteProject(id: string): Promise<void> {
  const supabase = await createClient();

  const { error } = await supabase.from('projects').delete().eq('id', id);

  if (error) {
    console.error('Error deleting project:', error);
    return;
  }

  revalidatePath('/admin/projects');
  revalidatePath('/');
}

export async function seedProjects(): Promise<void> {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    console.error('Unauthorized');
    return;
  }

  const oldProjects = [
    {
      user_id: user.id,
      title: 'Bugraoksuz.me',
      description: 'My personal portfolio website built with Next.js and Supabase.',
      github_link: 'https://github.com/HighRadiation/bugraoksuz.me',
    },
    {
      user_id: user.id,
      title: 'Born2beroot',
      description: 'System administration project about virtualization and server setup.',
      github_link: 'https://github.com/HighRadiation/Born2beroot',
    },
    {
      user_id: user.id,
      title: 'ft_printf',
      description: 'Recreated the C standard printf function from scratch.',
      github_link: 'https://github.com/HighRadiation/ft_printf',
    },
    {
      user_id: user.id,
      title: 'get_next_line',
      description: 'A function that returns a line read from a file descriptor.',
      github_link: 'https://github.com/HighRadiation/get_next_line',
    },
    {
      user_id: user.id,
      title: 'libft',
      description: 'Recoded standard C library functions from the ground up.',
      github_link: 'https://github.com/HighRadiation/libft',
    },
    {
      user_id: user.id,
      title: 'minitalk',
      description: 'Built a communication system operating via Unix signals.',
      github_link: 'https://github.com/HighRadiation/minitalk',
    },
    {
      user_id: user.id,
      title: 'push_swap',
      description: 'Developed an algorithm to sort data with a minimum number of operations.',
      github_link: 'https://github.com/HighRadiation/push_swap',
    },
  ];

  const { error } = await supabase.from('projects').insert(oldProjects);
  if (error) {
    console.error('Error seeding projects:', error);
  }

  revalidatePath('/admin/projects');
  revalidatePath('/');
}
