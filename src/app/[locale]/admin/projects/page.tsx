import { Link } from '@/i18n/navigation';
import { createClient } from '@/lib/supabase/server';
import { deleteProject } from './actions';
import type { Project } from '@/types/database';

export default async function AdminProjectsPage(): Promise<React.JSX.Element> {
  const supabase = await createClient();
  const { data: projects, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Failed to fetch projects from database');
  }

  return (
    <div className="admin-page-container-sm">
      <div className="admin-header-row admin-header-row-bordered">
        <div>
          <h1>Project List</h1>
          <p className="admin-card-subtitle">
            Manage your portfolio projects
          </p>
        </div>
        <Link href="/admin/projects/new" className="admin-btn-white">
          + Add Project
        </Link>
      </div>

      <div>
        {projects && projects.length > 0 ? (
          <ul className="admin-card-list">
            {projects.map((project: Project) => (
              <li
                key={project.id}
                className="admin-card-item"
                style={{ alignItems: 'flex-start' }}
              >
                <div>
                  <span className="admin-card-title" style={{ color: '#ffffff', fontWeight: 600 }}>
                    {project.title}
                  </span>
                  <p
                    className="admin-card-subtitle"
                    style={{ marginTop: '0.5rem', lineHeight: 1.5 }}
                  >
                    {project.description || 'No description.'}
                  </p>
                </div>
                <form action={deleteProject.bind(null, project.id)}>
                  <button type="submit" className="admin-btn-outline-danger">
                    Delete
                  </button>
                </form>
              </li>
            ))}
          </ul>
        ) : (
          <div className="admin-empty-state">
            <p>No projects found in database.</p>
          </div>
        )}
      </div>
    </div>
  );
}
