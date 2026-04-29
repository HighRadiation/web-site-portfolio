import { createClient } from '@/lib/supabase/server';
import { deleteProject, seedProjects } from './actions';

interface Project {
  id: string;
  title?: string;
  name?: string;
  description?: string;
  desc?: string;
  github_link?: string;
}

export default async function AdminProjectsPage(): Promise<React.JSX.Element> {
  const supabase = await createClient();
  const { data: projects, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    // Silently handle error or show a generic error state without leaking schema details
  }

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
          borderBottom: '1px solid #222222',
          paddingBottom: '1rem',
        }}
      >
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Project List</h1>
          <p style={{ color: '#a3a3a3', marginTop: '0.5rem', fontSize: '0.9rem' }}>
            Manage your portfolio projects
          </p>
        </div>
        <a
          href="/admin/projects/new"
          style={{
            background: '#ffffff',
            color: '#000000',
            textDecoration: 'none',
            padding: '0.6rem 1.2rem',
            borderRadius: '6px',
            fontWeight: 600,
            fontSize: '0.9rem',
            transition: 'opacity 0.2s',
          }}
        >
          + Add Project
        </a>
      </div>

      <div>
        {projects && projects.length > 0 ? (
          <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '1rem' }}>
            {projects.map((project: Project) => (
              <li
                key={project.id}
                style={{
                  backgroundColor: '#111111',
                  border: '1px solid #222222',
                  borderRadius: '8px',
                  padding: '1.5rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                }}
              >
                <div>
                  <span style={{ color: '#ffffff', fontWeight: 600, fontSize: '1.1rem' }}>
                    {project.title || project.name}
                  </span>
                  <p
                    style={{
                      color: '#a3a3a3',
                      fontSize: '0.9rem',
                      marginTop: '0.5rem',
                      lineHeight: 1.5,
                    }}
                  >
                    {project.description || project.desc || 'No description.'}
                  </p>
                </div>
                <form
                  action={async () => {
                    'use server';
                    await deleteProject(project.id);
                  }}
                >
                  <button
                    type="submit"
                    style={{
                      background: 'none',
                      border: '1px solid #ef4444',
                      color: '#ef4444',
                      padding: '0.4rem 0.75rem',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                      fontWeight: 500,
                      transition: 'all 0.2s',
                    }}
                  >
                    Delete
                  </button>
                </form>
              </li>
            ))}
          </ul>
        ) : (
          <div
            style={{
              padding: '3rem',
              textAlign: 'center',
              backgroundColor: '#111111',
              border: '1px dashed #333333',
              borderRadius: '8px',
            }}
          >
            <p style={{ color: '#a3a3a3', marginBottom: '1.5rem' }}>
              No projects found in database.
            </p>
            <form action={seedProjects}>
              <button
                type="submit"
                style={{
                  padding: '0.6rem 1.2rem',
                  background: '#ffffff',
                  color: '#000000',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 600,
                }}
              >
                Import
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
