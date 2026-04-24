import { logout } from '../login/actions'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--background)' }}>
      <aside style={{ 
        width: '260px', 
        borderRight: '1px solid var(--border)', 
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--card)'
      }}>
        <div style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.025em' }}>Portfolio Admin</h2>
        </div>
        
        <nav style={{ flex: 1 }}>
          <ul style={{ listStyle: 'none' }}>
            <li style={{ marginBottom: '0.5rem' }}>
              <a href="/admin" style={{ 
                display: 'block', 
                padding: '0.75rem 1rem', 
                borderRadius: 'var(--radius)',
                backgroundColor: 'var(--input)',
                fontWeight: 500
              }}>Dashboard</a>
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <a href="/admin/projects" style={{ 
                display: 'block', 
                padding: '0.75rem 1rem', 
                borderRadius: 'var(--radius)',
                color: 'var(--text-muted)'
              }}>Projeler</a>
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <a href="/admin/skills" style={{ 
                display: 'block', 
                padding: '0.75rem 1rem', 
                borderRadius: 'var(--radius)',
                color: 'var(--text-muted)'
              }}>Yetenekler</a>
            </li>
          </ul>
        </nav>

        <form action={logout} style={{ marginTop: 'auto' }}>
          <button type="submit" className="login-button" style={{ 
            backgroundColor: 'transparent', 
            border: '1px solid #ef4444', 
            color: '#ef4444',
            marginTop: '0'
          }}>
            Çıkış Yap
          </button>
        </form>
      </aside>
      
      <main style={{ flex: 1, padding: '3rem', overflowY: 'auto' }}>
        {children}
      </main>
    </div>
  )
}
