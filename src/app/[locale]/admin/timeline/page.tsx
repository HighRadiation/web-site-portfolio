import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { createClient } from '@/lib/supabase/server';
import { Topbar } from '@/components/admin/Topbar';
import { IconPlus, IconTrash } from '@/components/admin/icons';
import { deleteTimelineItem } from './actions';
import type { TimelineItem } from '@/types/database';

export default async function AdminTimelinePage(): Promise<React.JSX.Element> {
  const supabase = await createClient();
  const t = await getTranslations('Admin.timeline');

  const { data } = await supabase
    .from('timeline')
    .select('*')
    .order('created_at', { ascending: false });

  const items = (data ?? []) as TimelineItem[];
  const expCount = items.filter((i) => i.type === 'experience').length;
  const eduCount = items.filter((i) => i.type === 'education').length;

  return (
    <>
      <Topbar crumbs={['Admin', t('crumb')]} />
      <div className="page">
        <div className="page-head">
          <div>
            <div className="page-eyebrow">{t('eyebrow')}</div>
            <h1 className="page-title">{t('title')}</h1>
            <div className="page-sub">
              {t('subtitle', { exp: expCount, edu: eduCount })}
            </div>
          </div>
          <Link href="/admin/timeline/new" className="btn primary">
            <IconPlus />
            <span>{t('newItem')}</span>
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="panel">
            <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-3)' }}>
              {t('noItems')}
            </div>
          </div>
        ) : (
          <div className="panel">
            <div className="tl-list">
              {items.map((it) => (
                <div key={it.id} className="tl-row">
                  <div className="tl-dot" />
                  <div>
                    <div className="tl-period">{it.date}</div>
                    <h4>
                      {it.role}
                      <span className={`tl-pill${it.type === 'experience' ? ' exp' : ''}`}>
                        {it.type === 'experience' ? t('typeExp') : t('typeEdu')}
                      </span>
                    </h4>
                    <div className="sub">{it.company}</div>
                    {it.description && <div className="desc">{it.description}</div>}
                  </div>
                  <div className="tl-actions">
                    <form action={deleteTimelineItem.bind(null, it.id)}>
                      <button type="submit" className="icon-btn danger" title="Delete">
                        <IconTrash />
                      </button>
                    </form>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
