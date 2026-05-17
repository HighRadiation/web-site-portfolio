'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { deleteProject } from '@/app/[locale]/admin/projects/actions';
import { IconExt, IconTrash } from './icons';

export interface AdminProject {
  id: string;
  title: string;
  description: string | null;
  github_link: string | null;
  live_link: string | null;
  technologies: string[] | null;
  image_url: string | null;
  category: string | null;
  featured: boolean;
  created_at: string;
}

type FilterId = 'all' | 'web' | 'client' | 'systems' | 'featured';
type ViewMode = 'list' | 'grid';

const FILTERS: FilterId[] = ['all', 'web', 'client', 'systems', 'featured'];

interface Props {
  projects: AdminProject[];
}

export const ProjectsListClient = ({ projects }: Props): React.JSX.Element => {
  const t = useTranslations('Admin.projects');
  const [filter, setFilter] = useState<FilterId>('all');
  const [view, setView] = useState<ViewMode>('list');

  const visible = useMemo(() => {
    return projects.filter((p) => {
      if (filter === 'all') return true;
      if (filter === 'featured') return p.featured;
      return p.category === filter;
    });
  }, [projects, filter]);

  const filterLabel = (id: FilterId): string => {
    const map: Record<FilterId, string> = {
      all: t('filterAll'),
      web: t('filterWeb'),
      client: t('filterClient'),
      systems: t('filterSystems'),
      featured: t('filterFeatured'),
    };
    return map[id];
  };

  function counts(id: FilterId): number {
    if (id === 'all') return projects.length;
    if (id === 'featured') return projects.filter((p) => p.featured).length;
    return projects.filter((p) => p.category === id).length;
  }

  if (projects.length === 0) {
    return (
      <div className="panel">
        <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-3)' }}>
          {t('noProjects')}
        </div>
      </div>
    );
  }

  return (
    <div className="panel">
      <div className="filter-bar">
        <div className="chips">
          {FILTERS.map((id) => (
            <button
              key={id}
              type="button"
              className={`chip${filter === id ? ' active' : ''}`}
              onClick={() => setFilter(id)}
            >
              {filterLabel(id)} · {counts(id)}
            </button>
          ))}
        </div>
        <div className="filter-spacer" />
        <div className="view-toggle">
          <button
            type="button"
            className={view === 'list' ? 'active' : ''}
            onClick={() => setView('list')}
          >
            {t('viewList')}
          </button>
          <button
            type="button"
            className={view === 'grid' ? 'active' : ''}
            onClick={() => setView('grid')}
          >
            {t('viewGrid')}
          </button>
        </div>
      </div>

      {view === 'list' ? (
        <div className="list">
          {visible.map((p) => (
            <ProjectRow key={p.id} project={p} t={t} />
          ))}
        </div>
      ) : (
        <div className="admin-grid">
          {visible.map((p) => (
            <ProjectGridCard key={p.id} project={p} t={t} />
          ))}
        </div>
      )}
    </div>
  );
};

interface RowProps {
  project: AdminProject;
  t: (key: string) => string;
}

function ProjectRow({ project, t }: RowProps): React.JSX.Element {
  return (
    <div className="list-row">
      <div className="thumb">
        {project.image_url ? (
          <img src={project.image_url} alt="" />
        ) : (
          project.title.slice(0, 2).toUpperCase()
        )}
      </div>
      <div className="main">
        <div className="name">
          {project.title}
          {project.live_link && (
            <span className="pill live">
              <span className="dot" /> {t('pillLive')}
            </span>
          )}
          {project.featured && <span className="pill featured">{t('pillFeatured')}</span>}
          {!project.featured && !project.live_link && project.category && (
            <span className="pill draft">{project.category}</span>
          )}
        </div>
        <div className="desc">{project.description ?? '—'}</div>
      </div>
      <div className="stack">
        {(project.technologies ?? []).slice(0, 4).map((s) => (
          <span key={s}>{s}</span>
        ))}
      </div>
      <div className="updated">{new Date(project.created_at).toLocaleDateString()}</div>
      <div className="row-actions">
        {project.live_link && (
          <a
            href={project.live_link}
            target="_blank"
            rel="noopener noreferrer"
            className="icon-btn"
            title={t('actionOpenLive')}
            onClick={(e) => e.stopPropagation()}
          >
            <IconExt />
          </a>
        )}
        <form action={deleteProject.bind(null, project.id)}>
          <button type="submit" className="icon-btn danger" title={t('actionDelete')}>
            <IconTrash />
          </button>
        </form>
      </div>
    </div>
  );
}

function ProjectGridCard({ project, t }: RowProps): React.JSX.Element {
  return (
    <div className="admin-grid-card">
      <div className="name">
        {project.title}
        {project.live_link && (
          <span className="pill live">
            <span className="dot" /> {t('pillLive')}
          </span>
        )}
        {project.featured && <span className="pill featured">{t('pillFeatured')}</span>}
      </div>
      <div className="desc">{project.description ?? '—'}</div>
      <div className="stack">
        {(project.technologies ?? []).slice(0, 6).map((s) => (
          <span
            key={s}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              padding: '2px 7px',
              borderRadius: 999,
              background: 'rgba(255,255,255,0.04)',
              color: 'var(--text-2)',
            }}
          >
            {s}
          </span>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        {project.live_link && (
          <a
            href={project.live_link}
            target="_blank"
            rel="noopener noreferrer"
            className="btn sm"
          >
            <IconExt /> {t('actionOpenLive')}
          </a>
        )}
        <form
          action={deleteProject.bind(null, project.id)}
          style={{ marginLeft: 'auto' }}
        >
          <button type="submit" className="btn sm danger">
            {t('actionDelete')}
          </button>
        </form>
      </div>
    </div>
  );
}
