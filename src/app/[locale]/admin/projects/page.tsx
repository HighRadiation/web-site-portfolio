import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { createClient } from '@/lib/supabase/server';
import { Topbar } from '@/components/admin/Topbar';
import { IconPlus } from '@/components/admin/icons';
import {
  ProjectsListClient,
  type AdminProject,
} from '@/components/admin/ProjectsListClient';

export default async function AdminProjectsPage(): Promise<React.JSX.Element> {
  const supabase = await createClient();
  const t = await getTranslations('Admin.projects');

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('featured', { ascending: false })
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Failed to fetch projects:', error.message);
  }

  const projects: AdminProject[] = (data ?? []).map((p) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    github_link: p.github_link,
    live_link: p.live_link,
    technologies: p.technologies,
    image_url: p.image_url,
    category: p.category ?? null,
    featured: p.featured ?? false,
    created_at: p.created_at,
  }));

  const liveCount = projects.filter((p) => p.live_link).length;

  return (
    <>
      <Topbar crumbs={['Admin', t('crumb')]} />
      <div className="page">
        <div className="page-head">
          <div>
            <div className="page-eyebrow">{t('eyebrow')}</div>
            <h1 className="page-title">{t('title')}</h1>
            <div className="page-sub">
              {t('subtitle', { total: projects.length, live: liveCount })}
            </div>
          </div>
          <Link href="/admin/projects/new" className="btn primary">
            <IconPlus />
            <span>{t('newProject')}</span>
          </Link>
        </div>

        <ProjectsListClient projects={projects} />
      </div>
    </>
  );
}
