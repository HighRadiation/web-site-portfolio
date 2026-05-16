'use client';

import { useTranslations } from 'next-intl';
import { useMemo, useRef, useState } from 'react';

export interface DisplayProject {
  id: string;
  title: string;
  description: string | null;
  github_link: string | null;
  live_link: string | null;
  technologies: string[] | null;
  image_url: string | null;
  category: string | null;
  featured: boolean;
}

interface ProjectsSectionClientProps {
  projects: DisplayProject[];
}

type FilterId = 'all' | 'web' | 'client' | 'systems';

const FILTERS: FilterId[] = ['all', 'web', 'client', 'systems'];

export const ProjectsSectionClient = ({
  projects,
}: ProjectsSectionClientProps): React.JSX.Element => {
  const t = useTranslations('Projects');
  const tFilters = useTranslations('Projects.filters');
  const tSections = useTranslations('Sections');
  const [filter, setFilter] = useState<FilterId>('all');

  const visible = useMemo(
    () => (filter === 'all' ? projects : projects.filter((p) => p.category === filter)),
    [projects, filter],
  );

  return (
    <section id="projects">
      <div className="section-eyebrow">
        <span className="marker" />
        {tSections('eyebrow.projects')}
      </div>
      <h2 className="section-title">
        {tSections.rich('title.projects', {
          accent: (chunks) => <span className="accent">{chunks}</span>,
        })}
      </h2>

      <div className="proj-filter">
        {FILTERS.map((id) => (
          <button
            key={id}
            type="button"
            className={filter === id ? 'active' : ''}
            onClick={() => setFilter(id)}
          >
            {tFilters(id)}
          </button>
        ))}
      </div>

      <div className="proj-grid">
        {visible.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            liveLabel={t('live')}
            codeLabel={t('code')}
            visitLabel={t('visit')}
          />
        ))}
      </div>
    </section>
  );
};

interface ProjectCardProps {
  project: DisplayProject;
  liveLabel: string;
  codeLabel: string;
  visitLabel: string;
}

function ProjectCard({
  project,
  liveLabel,
  codeLabel,
  visitLabel,
}: ProjectCardProps): React.JSX.Element {
  const ref = useRef<HTMLElement | null>(null);

  function onMove(e: React.MouseEvent<HTMLElement>): void {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  }

  const isLive = Boolean(project.live_link);

  return (
    <article
      ref={ref}
      onMouseMove={onMove}
      className={`proj-card${project.featured ? ' featured' : ''}`}
    >
      <h4>
        {project.title}
        {isLive && (
          <span className="proj-status-pill">
            <span className="live-dot" /> {liveLabel}
          </span>
        )}
      </h4>
      <p>{project.description ?? ''}</p>

      {project.technologies && project.technologies.length > 0 && (
        <div className="proj-stack">
          {project.technologies.map((tech, i) => (
            <span key={tech} className={i === 0 ? 'hl' : ''}>
              {tech}
            </span>
          ))}
        </div>
      )}

      <div className="proj-actions">
        {project.github_link && (
          <a
            className="proj-btn primary"
            href={project.github_link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.8 10.9.6.1.8-.2.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.4-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2.9-.3 1.9-.4 2.9-.4s2 .1 2.9.4c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.7.8 1.2 1.8 1.2 3.1 0 4.5-2.7 5.5-5.3 5.8.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.5-1.5 7.8-5.8 7.8-10.9C23.5 5.7 18.3.5 12 .5z" /> {/* eslint-disable-line max-len */}
            </svg>
            {codeLabel}
          </a>
        )}
        {project.live_link && (
          <a
            className="proj-btn"
            href={project.live_link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 17L17 7" />
              <path d="M8 7h9v9" />
            </svg>
            {visitLabel}
          </a>
        )}
      </div>
    </article>
  );
}
