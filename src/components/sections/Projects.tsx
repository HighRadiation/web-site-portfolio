import { getLocale } from 'next-intl/server';
import { createClient } from '@/lib/supabase/server';
import { ProjectsSectionClient, type DisplayProject } from './ProjectsSectionClient';

export const ProjectsSection = async (): Promise<React.JSX.Element> => {
  const supabase = await createClient();
  const locale = await getLocale();

  const { data: projects, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Failed to fetch projects:', error.message);
  }

  const displayProjects: DisplayProject[] = (projects ?? []).map((project) => ({
    id: project.id,
    title: (locale === 'tr' && project.title_tr) || project.title,
    description: (locale === 'tr' && project.description_tr) || project.description,
    github_link: project.github_link,
    technologies: project.technologies,
  }));

  return <ProjectsSectionClient projects={displayProjects} />;
};
