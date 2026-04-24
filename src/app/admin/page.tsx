import { createClient } from '@/lib/supabase/server'

export default async function AdminDashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700 }}>Hoş Geldin, {user?.email}</h1>
        <p style={{ color: 'var(--text-muted)' }}>Portfolyonu buradan yönetebilirsin.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        <div className="login-card" style={{ maxWidth: 'none', padding: '1.5rem' }}>
          <h3>Projeler</h3>
          <p style={{ fontSize: '2rem', fontWeight: 700, marginTop: '1rem' }}>0</p>
        </div>
        <div className="login-card" style={{ maxWidth: 'none', padding: '1.5rem' }}>
          <h3>Yetenekler</h3>
          <p style={{ fontSize: '2rem', fontWeight: 700, marginTop: '1rem' }}>0</p>
        </div>
      </div>
    </div>
  )
}
