import { createClient } from '@/lib/supabase/server';
import { ProjectsSectionClient } from './ProjectsSectionClient';

interface Project {
  id: string;
  title: string;
  description: string;
  github_link?: string;
  live_link?: string;
}

export const ProjectsSection = async (): Promise<React.JSX.Element> => {
  const supabase = await createClient();

  const { data: projects, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Frontend proje çekme hatası:', error.message);
  }

  const displayProjects = projects || [];

  return <ProjectsSectionClient projects={displayProjects} />;
};
