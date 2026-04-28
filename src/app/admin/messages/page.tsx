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
    <div style={{ maxWidth: '800px', width: '100%' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
        }}
      >
        <h1 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Contact Messages</h1>
      </div>

      <div>
        {items && items.length > 0 ? (
          <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '1rem' }}>
            {items.map((msg: Message) => (
              <li
                key={msg.id}
                style={{
                  padding: '1.5rem',
                  border: msg.read ? '1px solid #222222' : '1px solid var(--accent)',
                  borderRadius: '8px',
                  backgroundColor: '#111111',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: '1rem',
                }}
              >
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '0.5rem',
                    }}
                  >
                    <h3 style={{ fontSize: '1.1rem', margin: 0 }}>
                      {msg.name}{' '}
                      {!msg.read && (
                        <span
                          style={{
                            fontSize: '0.7rem',
                            backgroundColor: 'var(--accent)',
                            color: '#fff',
                            padding: '0.1rem 0.4rem',
                            borderRadius: '4px',
                            marginLeft: '0.5rem',
                          }}
                        >
                          NEW
                        </span>
                      )}
                    </h3>
                    <span style={{ color: '#888', fontSize: '0.8rem' }}>
                      {new Date(msg.created_at).toLocaleString()}
                    </span>
                  </div>
                  <p style={{ color: '#a3a3a3', fontSize: '0.9rem', marginBottom: '1rem' }}>
                    <a href={`mailto:${msg.email}`} style={{ color: '#a3a3a3' }}>
                      {msg.email}
                    </a>
                  </p>
                  <div
                    style={{
                      color: '#e5e5e5',
                      fontSize: '0.9rem',
                      lineHeight: '1.6',
                      backgroundColor: '#0a0a0a',
                      padding: '1rem',
                      borderRadius: '6px',
                      border: '1px solid #222',
                    }}
                  >
                    {msg.message}
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {!msg.read && (
                    <form
                      action={async () => {
                        'use server';
                        await markAsRead(msg.id);
                      }}
                    >
                      <button
                        type="submit"
                        style={{
                          backgroundColor: 'var(--accent)',
                          color: '#fff',
                          border: 'none',
                          padding: '0.4rem 0.8rem',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '0.8rem',
                          fontWeight: 500,
                          width: '100%',
                        }}
                      >
                        Mark Read
                      </button>
                    </form>
                  )}
                  <form
                    action={async () => {
                      'use server';
                      await deleteMessage(msg.id);
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
                        width: '100%',
                      }}
                    >
                      Delete
                    </button>
                  </form>
                </div>
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
            <p style={{ color: '#888' }}>No messages found. Inbox is empty!</p>
          </div>
        )}
      </div>
    </div>
  );
}
