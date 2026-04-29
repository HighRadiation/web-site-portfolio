'use client';

import { useLanguage } from '@/context/LanguageContext';

interface Project {
  id: string;
  title: string;
  description: string;
  github_link?: string;
  live_link?: string;
}

interface ProjectsSectionClientProps {
  projects: Project[];
}

export const ProjectsSectionClient = ({
  projects,
}: ProjectsSectionClientProps): React.JSX.Element => {
  const { t } = useLanguage();

  return (
    <section id="projects" className="section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{t('projects_title')}</h2>
        </div>

        <div className="projects-grid">
          {projects.map((project: Project) => (
            <div key={project.id} className="project-card">
              <div className="project-card-preview">
                <div className="project-card-preview-bar">
                  <div className="project-card-preview-dots">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
                <div className="project-card-preview-content">
                  <h3>{project.title}</h3>
                </div>
              </div>
              <div className="project-card-body">
                <p className="project-card-desc">
                  {/* Try to find a translated description using the title as a key */}
                  {t(`${project.title}_desc`) !== `${project.title}_desc`
                    ? t(`${project.title}_desc`)
                    : project.description}
                </p>

                {project.github_link && (
                  <div style={{ marginTop: '1.5rem' }}>
                    <a
                      href={project.github_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        color: 'var(--accent)',
                        textDecoration: 'none',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        borderBottom: '1px solid transparent',
                        transition: 'border-color 0.2s',
                      }}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        style={{ marginRight: '0.5rem' }}
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          /* eslint-disable max-len */
                          d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                          /* eslint-enable max-len */
                        />
                      </svg>
                      {t('projects_view_code')}
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
