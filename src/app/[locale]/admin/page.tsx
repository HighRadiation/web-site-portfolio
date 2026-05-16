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
  const stats = await getStats();

  const cards = [
    { label: 'Projects', value: stats.projects, href: '/admin/projects' },
    { label: 'Skills', value: stats.skills, href: '/admin/skills' },
    { label: 'Messages', value: stats.messages, href: '/admin/messages' },
  ];

  return (
    <div>
      <div className="admin-section-header">
        <h1>Dashboard Overview</h1>
        <p>Welcome back. Here&apos;s a quick look at your system status.</p>
      </div>

      <div className="admin-stats-grid">
        {cards.map((card) => (
          <a key={card.label} href={card.href} className="admin-stat-card">
            <span className="admin-stat-label">{card.label}</span>
            <span className="admin-stat-value">{card.value}</span>
            <span className="admin-stat-footer">Total Records</span>
          </a>
        ))}
      </div>
    </div>
  );
}
