'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { logout } from '@/app/[locale]/login/actions';
import {
  IconDash,
  IconFolder,
  IconLogout,
  IconMsg,
  IconSkill,
  IconTL,
} from './icons';

interface SidebarProps {
  unread: number;
  user: { name: string; email: string };
}

interface NavItem {
  href: string;
  labelKey: 'dashboard' | 'projects' | 'skills' | 'timeline' | 'messages';
  Icon: typeof IconDash;
  badge?: number;
}

export const Sidebar = ({ unread, user }: SidebarProps): React.JSX.Element => {
  const t = useTranslations('Admin.sidebar');
  const pathname = usePathname();

  const items: NavItem[] = [
    { href: '/admin', labelKey: 'dashboard', Icon: IconDash },
    { href: '/admin/projects', labelKey: 'projects', Icon: IconFolder },
    { href: '/admin/skills', labelKey: 'skills', Icon: IconSkill },
    { href: '/admin/timeline', labelKey: 'timeline', Icon: IconTL },
    {
      href: '/admin/messages',
      labelKey: 'messages',
      Icon: IconMsg,
      badge: unread > 0 ? unread : undefined,
    },
  ];

  function isActive(href: string): boolean {
    if (href === '/admin') return pathname === '/admin';
    return pathname.startsWith(href);
  }

  const initials = user.name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <aside className="sidebar">
      <div className="sb-brand">
        <div className="glyph">BÖ</div>
        <div>
          <div className="name">bugraoksuz.me</div>
          <div className="role">{t('controlCenter')}</div>
        </div>
      </div>

      <div className="sb-section">{`// ${t('manage')}`}</div>
      <div className="sb-nav">
        {items.map((it) => (
          <Link
            key={it.href}
            href={it.href}
            className={`sb-link${isActive(it.href) ? ' active' : ''}`}
          >
            <it.Icon />
            <span>{t(it.labelKey)}</span>
            {it.badge && <span className="sb-badge">{it.badge}</span>}
          </Link>
        ))}
      </div>

      <div className="sb-foot">
        <div className="sb-user">
          <div className="avatar">{initials}</div>
          <div className="info">
            <div className="who">{user.name}</div>
            <div className="status">
              <span className="live-dot" /> {t('online')}
            </div>
          </div>
        </div>
        <form action={logout}>
          <button type="submit" className="sb-logout">
            <IconLogout />
            <span>{t('logout')}</span>
          </button>
        </form>
      </div>
    </aside>
  );
};
