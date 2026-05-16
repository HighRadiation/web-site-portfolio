import { Link } from '@/i18n/navigation';
import { logout } from '../login/actions';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-brand">
          <h2>Admin Panel</h2>
        </div>

        <nav className="admin-sidebar-nav">
          <Link href="/admin" className="admin-nav-link">
            Dashboard
          </Link>
          <Link href="/admin/projects" className="admin-nav-link">
            Projects
          </Link>
          <Link href="/admin/skills" className="admin-nav-link">
            Skills
          </Link>
          <Link href="/admin/timeline" className="admin-nav-link">
            Timeline
          </Link>
          <Link href="/admin/messages" className="admin-nav-link">
            Messages
          </Link>
        </nav>

        <form action={logout} className="admin-sidebar-footer">
          <button type="submit" className="admin-logout-btn">
            Logout
          </button>
        </form>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <div className="admin-content-wrapper">{children}</div>
      </main>
    </div>
  );
}
