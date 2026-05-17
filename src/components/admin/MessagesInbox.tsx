'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  deleteMessage,
  markAsRead,
} from '@/app/[locale]/admin/messages/actions';
import {
  IconMsg,
  IconReply,
  IconSearch,
  IconTrash,
} from './icons';

export interface InboxMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  created_at: string;
}

interface Props {
  messages: InboxMessage[];
}

function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const min = Math.floor(diff / 60_000);
  if (min < 1) return 'now';
  if (min < 60) return `${min}m`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h`;
  const d = Math.floor(hr / 24);
  if (d < 30) return `${d}d`;
  return `${Math.floor(d / 30)}mo`;
}

function initialsOf(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
}

export const MessagesInbox = ({ messages }: Props): React.JSX.Element => {
  const t = useTranslations('Admin.messages');
  const [activeId, setActiveId] = useState<string | null>(messages[0]?.id ?? null);
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!query.trim()) return messages;
    const q = query.toLowerCase();
    return messages.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q) ||
        m.message.toLowerCase().includes(q),
    );
  }, [messages, query]);

  const active = messages.find((m) => m.id === activeId) ?? null;

  if (messages.length === 0) {
    return (
      <div className="panel" style={{ minHeight: 400 }}>
        <div className="empty-state">
          <div className="glyph"><IconMsg /></div>
          <h4>{t('emptyInboxTitle')}</h4>
          <p>{t('emptyInboxDesc')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="panel" style={{ flex: 1, display: 'flex' }}>
      <div className="inbox-layout" style={{ width: '100%' }}>
        <div className="inbox-list">
          <div className="inbox-search">
            <div className="inbox-search-inner">
              <span style={{ display: 'flex' }}><IconSearch /></span>
              <input
                placeholder={t('searchPlaceholder')}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="inbox-items">
            {filtered.map((m) => (
              <button
                key={m.id}
                type="button"
                className={`inbox-item${activeId === m.id ? ' active' : ''}${
                  m.read ? '' : ' unread'
                }`}
                onClick={() => setActiveId(m.id)}
              >
                <div className="ii-top">
                  <div className="ii-from">{m.name}</div>
                  <div className="ii-when">{relativeTime(m.created_at)}</div>
                </div>
                <div className="ii-sub">{m.message.slice(0, 60)}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="msg-detail">
          {active ? (
            <>
              <div className="from-row">
                <div className="avatar">{initialsOf(active.name)}</div>
                <div className="from-info">
                  <div className="from-name">{active.name}</div>
                  <div className="from-email">
                    <a href={`mailto:${active.email}`} style={{ color: 'inherit' }}>
                      {active.email}
                    </a>
                  </div>
                </div>
                <div className="from-when">
                  {new Date(active.created_at).toLocaleString()}
                </div>
              </div>

              <div className="msg-body">{active.message}</div>

              <div className="msg-actions">
                <a
                  href={`mailto:${active.email}?subject=Re: your message&body=${encodeURIComponent(
                    `\n\n--- Original message ---\n${active.message}`,
                  )}`}
                  className="btn primary"
                >
                  <IconReply />
                  <span>{t('actionReply')}</span>
                </a>
                {!active.read && (
                  <form action={markAsRead.bind(null, active.id)}>
                    <button type="submit" className="btn">
                      {t('actionMarkRead')}
                    </button>
                  </form>
                )}
                <form
                  action={deleteMessage.bind(null, active.id)}
                  onSubmit={() => setActiveId(null)}
                >
                  <button type="submit" className="btn danger">
                    <IconTrash />
                    <span>{t('actionDelete')}</span>
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="empty-state">
              <div className="glyph"><IconMsg /></div>
              <h4>{t('emptyTitle')}</h4>
              <p>{t('emptyDesc')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
