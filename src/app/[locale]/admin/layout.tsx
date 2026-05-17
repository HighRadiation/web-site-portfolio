import { requireAdmin } from '@/lib/auth';
import { Sidebar } from '@/components/admin/Sidebar';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}): Promise<React.JSX.Element> {
  const { supabase, user } = await requireAdmin();

  const { count: unread } = await supabase
    .from('contact_messages')
    .select('*', { count: 'exact', head: true })
    .eq('read', false);

  const displayName = user.email?.split('@')[0] ?? 'Admin';

  return (
    <div className="admin-layout">
      <Sidebar
        unread={unread ?? 0}
        user={{ name: displayName, email: user.email ?? '' }}
      />
      <main className="main">{children}</main>
    </div>
  );
}
