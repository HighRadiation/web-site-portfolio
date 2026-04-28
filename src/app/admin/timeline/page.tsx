import { createClient } from '@/lib/supabase/server';
import { deleteTimelineItem } from './actions';

interface TimelineItem {
  id: string;
  date: string;
  role: string;
  company: string;
  description: string;
  type: string;
}

export default async function AdminTimelinePage(): Promise<React.JSX.Element> {
  const supabase = await createClient();
  const { data: timelineData } = await supabase
    .from('timeline')
    .select('*')
    .order('created_at', { ascending: false });

  const items = timelineData || [];

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
        <h1 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Manage Timeline</h1>
        <a
          href="/admin/timeline/new"
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
          Add Item
        </a>
      </div>

      <div>
        {items && items.length > 0 ? (
          <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '1rem' }}>
            {items.map((item: TimelineItem) => (
              <li
                key={item.id}
                style={{
                  padding: '1.5rem',
                  border: '1px solid #222222',
                  borderRadius: '8px',
                  backgroundColor: '#111111',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                }}
              >
                <div>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                    {item.role}{' '}
                    <span style={{ color: '#888', fontSize: '0.8rem' }}>({item.type})</span>
                  </h3>
                  <p style={{ color: '#a3a3a3', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                    <strong>{item.company}</strong> • {item.date}
                  </p>
                  <p
                    style={{
                      color: '#a3a3a3',
                      fontSize: '0.85rem',
                      lineHeight: '1.5',
                      maxWidth: '500px',
                    }}
                  >
                    {item.description}
                  </p>
                </div>
                <form
                  action={async () => {
                    'use server';
                    await deleteTimelineItem(item.id);
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
            <p style={{ color: '#888' }}>No timeline items found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
