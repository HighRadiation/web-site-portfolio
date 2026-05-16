import { createClient } from '@/lib/supabase/server';
import { deleteMessage, markAsRead } from './actions';

interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  created_at: string;
}

export default async function AdminMessagesPage(): Promise<React.JSX.Element> {
  const supabase = await createClient();
  const { data: messages } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false });

  const items = messages || [];

  return (
    <div className="admin-page-container-sm">
      <div className="admin-header-row">
        <h1>Contact Messages</h1>
      </div>

      <div>
        {items && items.length > 0 ? (
          <ul className="admin-card-list">
            {items.map((msg: Message) => (
              <li
                key={msg.id}
                className={`admin-card-item ${!msg.read ? 'admin-card-unread' : ''}`}
                style={{ alignItems: 'flex-start', gap: '1rem' }}
              >
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '0.5rem',
                    }}
                  >
                    <h3 className="admin-card-title" style={{ margin: 0 }}>
                      {msg.name}{' '}
                      {!msg.read && (
                        <span className="admin-badge-new">
                          NEW
                        </span>
                      )}
                    </h3>
                    <span style={{ color: '#888', fontSize: '0.8rem' }}>
                      {new Date(msg.created_at).toLocaleString()}
                    </span>
                  </div>
                  <p className="admin-card-subtitle" style={{ marginBottom: '1rem' }}>
                    <a href={`mailto:${msg.email}`} style={{ color: '#a3a3a3' }}>
                      {msg.email}
                    </a>
                  </p>
                  <div className="admin-message-body">
                    {msg.message}
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {!msg.read && (
                    <form action={markAsRead.bind(null, msg.id)}>
                      <button
                        type="submit"
                        className="admin-btn-primary"
                        style={{
                          padding: '0.4rem 0.8rem',
                          fontSize: '0.8rem',
                          fontWeight: 500,
                          width: '100%',
                        }}
                      >
                        Mark Read
                      </button>
                    </form>
                  )}
                  <form action={deleteMessage.bind(null, msg.id)}>
                    <button
                      type="submit"
                      className="admin-btn-outline-danger"
                      style={{ width: '100%' }}
                    >
                      Delete
                    </button>
                  </form>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="admin-empty-state">
            <p style={{ color: '#888' }}>No messages found. Inbox is empty!</p>
          </div>
        )}
      </div>
    </div>
  );
}
