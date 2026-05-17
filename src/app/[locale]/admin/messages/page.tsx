import { getTranslations } from 'next-intl/server';
import { createClient } from '@/lib/supabase/server';
import { Topbar } from '@/components/admin/Topbar';
import {
  MessagesInbox,
  type InboxMessage,
} from '@/components/admin/MessagesInbox';

export default async function AdminMessagesPage(): Promise<React.JSX.Element> {
  const supabase = await createClient();
  const t = await getTranslations('Admin.messages');

  const { data } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false });

  const messages: InboxMessage[] = (data ?? []).map((m) => ({
    id: m.id,
    name: m.name,
    email: m.email,
    message: m.message,
    read: m.read,
    created_at: m.created_at,
  }));

  const unread = messages.filter((m) => !m.read).length;

  return (
    <>
      <Topbar crumbs={['Admin', t('crumb')]} unread={unread} />
      <div
        className="page"
        style={{ padding: 18, display: 'flex', flexDirection: 'column' }}
      >
        <div className="page-head" style={{ padding: '0 14px 14px', marginBottom: 0 }}>
          <div>
            <div className="page-eyebrow">{t('eyebrow')}</div>
            <h1 className="page-title">{t('title')}</h1>
            <div className="page-sub">
              {t('subtitle', { unread, total: messages.length })}
            </div>
          </div>
        </div>

        <MessagesInbox messages={messages} />
      </div>
    </>
  );
}
