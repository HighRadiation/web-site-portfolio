import { logout } from '../login/actions';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: '#0a0a0a',
        color: '#ffffff',
        fontFamily: 'var(--font-sans)',
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          width: '250px',
          backgroundColor: '#111111',
          borderRight: '1px solid #222222',
          padding: '2rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ marginBottom: '3rem', paddingLeft: '0.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, letterSpacing: '-0.02em' }}>
            Admin Panel
          </h2>
        </div>

        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <a
            href="/admin"
            style={{
              padding: '0.75rem 1rem',
              borderRadius: '6px',
              color: '#a3a3a3',
              textDecoration: 'none',
              transition: 'background 0.2s',
              fontSize: '0.9rem',
            }}
          >
            Dashboard
          </a>
          <a
            href="/admin/projects"
            style={{
              padding: '0.75rem 1rem',
              borderRadius: '6px',
              color: '#a3a3a3',
              textDecoration: 'none',
              transition: 'background 0.2s',
              fontSize: '0.9rem',
            }}
          >
            Projects
          </a>
          <a
            href="/admin/skills"
            style={{
              padding: '0.75rem 1rem',
              borderRadius: '6px',
              color: '#a3a3a3',
              textDecoration: 'none',
              transition: 'background 0.2s',
              fontSize: '0.9rem',
            }}
          >
            Skills
          </a>
          <a
            href="/admin/timeline"
            style={{
              padding: '0.75rem 1rem',
              borderRadius: '6px',
              color: '#a3a3a3',
              textDecoration: 'none',
              transition: 'background 0.2s',
              fontSize: '0.9rem',
            }}
          >
            Timeline
          </a>
          <a
            href="/admin/messages"
            style={{
              padding: '0.75rem 1rem',
              borderRadius: '6px',
              color: '#a3a3a3',
              textDecoration: 'none',
              transition: 'background 0.2s',
              fontSize: '0.9rem',
            }}
          >
            Messages
          </a>
        </nav>

        <form action={logout} style={{ marginTop: 'auto' }}>
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              borderRadius: '6px',
              background: 'none',
              border: '1px solid #ef4444',
              color: '#ef4444',
              cursor: 'pointer',
              textAlign: 'center',
              fontSize: '0.9rem',
              transition: 'all 0.2s',
            }}
          >
            Logout
          </button>
        </form>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '3rem 4rem', overflowY: 'auto' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>{children}</div>
      </main>
    </div>
  );
}
