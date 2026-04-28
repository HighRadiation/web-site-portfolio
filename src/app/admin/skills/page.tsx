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
    <div style={{ maxWidth: '800px', width: '100%' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
        }}
      >
        <h1 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Manage Skills</h1>
        <a
          href="/admin/skills/new"
          style={{
            backgroundColor: '#ffffff',
            color: '#000000',
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            textDecoration: 'none',
            fontSize: '0.9rem',
            fontWeight: 500,
          }}
        >
          Add Skill
        </a>
      </div>

      <div>
        {items && items.length > 0 ? (
          <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '1rem' }}>
            {items.map((item: Skill) => (
              <li
                key={item.id}
                style={{
                  padding: '1.5rem',
                  border: '1px solid #222222',
                  borderRadius: '8px',
                  backgroundColor: '#111111',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{item.name}</h3>
                  <p style={{ color: '#a3a3a3', fontSize: '0.85rem' }}>
                    Category: <strong style={{ color: 'var(--accent)' }}>{item.category}</strong>
                  </p>
                </div>
                <form
                  action={async () => {
                    'use server';
                    await deleteSkill(item.id);
                  }}
                >
                  <button
                    type="submit"
                    style={{
                      backgroundColor: 'transparent',
                      color: '#ef4444',
                      border: '1px solid #ef4444',
                      padding: '0.4rem 0.8rem',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '0.8rem',
                      fontWeight: 500,
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
              border: '1px dashed #333',
              borderRadius: '8px',
            }}
          >
            <p style={{ color: '#888' }}>No skills found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
