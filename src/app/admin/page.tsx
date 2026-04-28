import { createClient } from '@/lib/supabase/server';

async function getStats(): Promise<{
  projects: number;
  skills: number;
  messages: number;
}> {
  const supabase = await createClient();

  const [{ count: projects }, { count: skills }, { count: messages }] = await Promise.all([
    supabase.from('projects').select('*', { count: 'exact', head: true }),
    supabase.from('skills').select('*', { count: 'exact', head: true }),
    supabase.from('contact_messages').select('*', { count: 'exact', head: true }),
  ]);

  return {
    projects: projects ?? 0,
    skills: skills ?? 0,
    messages: messages ?? 0,
  };
}

export default async function AdminDashboard(): Promise<React.JSX.Element> {
  const supabase = await createClient();
  await supabase.auth.getUser();

  const stats = await getStats();

  const cards = [
    { label: 'Projects', value: stats.projects, href: '/admin/projects' },
    { label: 'Skills', value: stats.skills, href: '/admin/skills' },
    { label: 'Messages', value: stats.messages, href: '/admin/messages' },
  ];

  return (
    <div>
      <div style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          Dashboard Overview
        </h1>
        <p style={{ color: '#a3a3a3' }}>Welcome back. Here's a quick look at your system status.</p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {cards.map((card) => (
          <a
            key={card.label}
            href={card.href}
            style={{
              backgroundColor: '#111111',
              border: '1px solid #222222',
              borderRadius: '8px',
              padding: '1.5rem',
              color: '#ffffff',
              textDecoration: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              transition: 'border-color 0.2s ease',
            }}
          >
            <span style={{ fontSize: '1rem', fontWeight: 600, color: '#e5e5e5' }}>
              {card.label}
            </span>
            <span style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--accent)' }}>
              {card.value}
            </span>
            <span style={{ fontSize: '0.85rem', color: '#737373' }}>Total Records</span>
          </a>
        ))}
      </div>
    </div>
  );
}
