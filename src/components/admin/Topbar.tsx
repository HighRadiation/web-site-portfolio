import { useTranslations } from 'next-intl';
import { IconBell, IconSearch } from './icons';

interface TopbarProps {
  crumbs: string[];
  unread?: number;
  actions?: React.ReactNode;
}

export const Topbar = ({
  crumbs,
  unread = 0,
  actions,
}: TopbarProps): React.JSX.Element => {
  const t = useTranslations('Admin.topbar');

  return (
    <div className="topbar">
      <div className="crumbs">
        {crumbs.map((c, i) => (
          <span key={i}>
            {i > 0 && <span className="sep">/ </span>}
            <span className={i === crumbs.length - 1 ? 'cur' : ''}>{c}</span>
          </span>
        ))}
      </div>
      <div className="tb-right">
        <div className="tb-search">
          <span style={{ display: 'flex' }}>
            <IconSearch />
          </span>
          <input placeholder={t('searchPlaceholder')} />
          <kbd>⌘K</kbd>
        </div>
        <div className="tb-pill prod">
          <span className="dot" /> PROD
        </div>
        <button type="button" className="tb-icon-btn" aria-label="Notifications">
          <IconBell />
          {unread > 0 && <span className="badge">{unread}</span>}
        </button>
        {actions}
      </div>
    </div>
  );
};
