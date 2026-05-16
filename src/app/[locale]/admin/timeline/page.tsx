import { Link } from '@/i18n/navigation';
import { createClient } from '@/lib/supabase/server';
import { deleteTimelineItem } from './actions';
import type { TimelineItem } from '@/types/database';

export default async function AdminTimelinePage(): Promise<React.JSX.Element> {
  const supabase = await createClient();
  const { data: timelineData } = await supabase
    .from('timeline')
    .select('*')
    .order('created_at', { ascending: false });

  const items = timelineData || [];

  return (
    <div className="admin-page-container-sm">
      <div className="admin-header-row">
        <h1>Manage Timeline</h1>
        <Link href="/admin/timeline/new" className="admin-btn-white">
          Add Item
        </Link>
      </div>

      <div>
        {items && items.length > 0 ? (
          <ul className="admin-card-list">
            {items.map((item: TimelineItem) => (
              <li
                key={item.id}
                className="admin-card-item"
                style={{ alignItems: 'flex-start' }}
              >
                <div>
                  <h3 className="admin-card-title">
                    {item.role}{' '}
                    <span style={{ color: '#888', fontSize: '0.8rem' }}>({item.type})</span>
                  </h3>
                  <p className="admin-card-subtitle" style={{ marginBottom: '0.25rem' }}>
                    <strong>{item.company}</strong> • {item.date}
                  </p>
                  <p
                    className="admin-card-subtitle"
                    style={{ lineHeight: '1.5', maxWidth: '500px' }}
                  >
                    {item.description}
                  </p>
                </div>
                <form action={deleteTimelineItem.bind(null, item.id)}>
                  <button type="submit" className="admin-btn-outline-danger">
                    Delete
                  </button>
                </form>
              </li>
            ))}
          </ul>
        ) : (
          <div className="admin-empty-state">
            <p style={{ color: '#888' }}>No timeline items found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
