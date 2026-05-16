import { Link } from '@/i18n/navigation';
import { createClient } from '@/lib/supabase/server';
import { deleteSkill } from './actions';
import { Skill } from '@/types/database';

export default async function AdminSkillsPage(): Promise<React.JSX.Element> {
  const supabase = await createClient();
  const { data: skillsData } = await supabase
    .from('skills')
    .select('*')
    .order('category', { ascending: true });

  const items = skillsData || [];

  return (
    <div className="admin-page-container-sm">
      <div className="admin-header-row">
        <h1>Manage Skills</h1>
        <Link href="/admin/skills/new" className="admin-btn-white">
          Add Skill
        </Link>
      </div>

      <div>
        {items && items.length > 0 ? (
          <ul className="admin-card-list">
            {items.map((item: Skill) => (
              <li key={item.id} className="admin-card-item">
                <div>
                  <h3 className="admin-card-title">{item.name}</h3>
                  <p className="admin-card-subtitle">
                    Category: <strong style={{ color: 'var(--accent)' }}>{item.category}</strong>
                  </p>
                </div>
                <form action={deleteSkill.bind(null, item.id)}>
                  <button type="submit" className="admin-btn-outline-danger">
                    Delete
                  </button>
                </form>
              </li>
            ))}
          </ul>
        ) : (
          <div className="admin-empty-state">
            <p style={{ color: '#888' }}>No skills found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
