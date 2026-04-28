import { createClient } from '@/lib/supabase/server';

async function getStats(): Promise<{
  projects: number;
  skills: number;
  messages: number;
}> {
  const supabase = await createClient();

  const [{ count: projects }, { count: skills }, { count: messages }] =
    await Promise.all([
      supabase.from('projects').select('*', { count: 'exact', head: true }),
      supabase.from('skills').select('*', { count: 'exact', head: true }),
      supabase
        .from('contact_messages')
        .select('*', { count: 'exact', head: true }),
    ]);

  return {
    projects: projects ?? 0,
    skills: skills ?? 0,
    messages: messages ?? 0,
  };
}

export default async function AdminDashboard(): Promise<React.JSX.Element> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const stats = await getStats();

  const cards = [
    { label: 'Projects', value: stats.projects, href: '/admin/projects' },
    { label: 'Skills', value: stats.skills, href: '/admin/skills' },
    { label: 'Messages', value: stats.messages, href: '/admin/messages' },
  ];

  return (
    <div>
      <header style={{ marginBottom: '2.5rem' }}>
        <h1
          style={{
            fontSize: '1.75rem',
            fontWeight: 700,
            color: '#ffffff',
            marginBottom: '0.5rem',
          }}
        >
          Dashboard
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Logged in as{' '}
          <span style={{ color: 'var(--accent)' }}>{user?.email}</span>
        </p>
      </header>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {cards.map((card) => (
          <a
            key={card.label}
            href={card.href}
            style={{ textDecoration: 'none' }}
          >
            <div
              style={{
                background: 'var(--card-bg)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '8px',
                padding: '1.75rem',
                transition: 'border-color 0.2s ease',
                cursor: 'pointer',
              }}
            >
              <p
                style={{
                  fontSize: '0.8rem',
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: '0.75rem',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                {card.label}
              </p>
              <p
                style={{
                  fontSize: '2.5rem',
                  fontWeight: 700,
                  color: '#ffffff',
                  lineHeight: 1,
                }}
              >
                {card.value}
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
