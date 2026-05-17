import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { createClient } from '@/lib/supabase/server';
import { Topbar } from '@/components/admin/Topbar';
import { StatCard } from '@/components/admin/StatCard';
import { FeedRow } from '@/components/admin/FeedRow';
import {
  IconFolder,
  IconSkill,
  IconTL,
  IconMsg,
  IconPlus,
} from '@/components/admin/icons';

const DAYS = 8;

function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const min = Math.floor(diff / 60_000);
  if (min < 1) return 'now';
  if (min < 60) return `${min}m`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h`;
  const d = Math.floor(hr / 24);
  if (d < 30) return `${d}d`;
  const w = Math.floor(d / 7);
  if (w < 5) return `${w}w`;
  const mo = Math.floor(d / 30);
  return `${mo}mo`;
}

function bucketByDay(rows: { created_at: string }[]): number[] {
  const buckets = new Array<number>(DAYS).fill(0);
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  for (const r of rows) {
    const d = new Date(r.created_at);
    d.setHours(0, 0, 0, 0);
    const days = Math.floor((now.getTime() - d.getTime()) / 86_400_000);
    if (days >= 0 && days < DAYS) {
      buckets[DAYS - 1 - days]++;
    }
  }
  return buckets;
}

export default async function AdminDashboard(): Promise<React.JSX.Element> {
  const supabase = await createClient();
  const t = await getTranslations('Admin.dashboard');
  const tActions = await getTranslations('Admin.actions');
  const tTargets = await getTranslations('Admin.targets');
  // eslint-disable-next-line react-hooks/purity
  const since = new Date(Date.now() - DAYS * 86_400_000).toISOString();

  const [
    { count: projects },
    { count: skills },
    { count: timeline },
    { count: unread },
    { data: projectRows },
    { data: skillRows },
    { data: timelineRows },
    { data: messageRows },
    { data: activities },
  ] = await Promise.all([
    supabase.from('projects').select('*', { count: 'exact', head: true }),
    supabase.from('skills').select('*', { count: 'exact', head: true }),
    supabase.from('timeline').select('*', { count: 'exact', head: true }),
    supabase
      .from('contact_messages')
      .select('*', { count: 'exact', head: true })
      .eq('read', false),
    supabase.from('projects').select('created_at').gte('created_at', since),
    supabase.from('skills').select('created_at').gte('created_at', since),
    supabase.from('timeline').select('created_at').gte('created_at', since),
    supabase.from('contact_messages').select('created_at').gte('created_at', since),
    supabase
      .from('activity_log')
      .select('id, action, target_type, target_label, created_at')
      .order('created_at', { ascending: false })
      .limit(5),
  ]);

  const projectSpark = bucketByDay(projectRows ?? []);
  const skillSpark = bucketByDay(skillRows ?? []);
  const timelineSpark = bucketByDay(timelineRows ?? []);
  const messageSpark = bucketByDay(messageRows ?? []);

  const sum = (a: number[]): number => a.reduce((x, y) => x + y, 0);

  const stats = [
    {
      label: t('statProjects'),
      value: projects ?? 0,
      delta: sum(projectSpark) > 0 ? `+${sum(projectSpark)}` : '+0',
      trend: sum(projectSpark) > 0 ? ('up' as const) : ('flat' as const),
      hint: t('last7Days'),
      icon: <IconFolder />,
      spark: projectSpark,
    },
    {
      label: t('statSkills'),
      value: skills ?? 0,
      delta: sum(skillSpark) > 0 ? `+${sum(skillSpark)}` : '+0',
      trend: sum(skillSpark) > 0 ? ('up' as const) : ('flat' as const),
      hint: t('last7Days'),
      icon: <IconSkill />,
      spark: skillSpark,
    },
    {
      label: t('statTimeline'),
      value: timeline ?? 0,
      delta: sum(timelineSpark) > 0 ? `+${sum(timelineSpark)}` : '+0',
      trend: sum(timelineSpark) > 0 ? ('up' as const) : ('flat' as const),
      hint: t('last7Days'),
      icon: <IconTL />,
      spark: timelineSpark,
    },
    {
      label: t('statUnread'),
      value: unread ?? 0,
      delta: sum(messageSpark) > 0 ? `+${sum(messageSpark)}` : '+0',
      trend: sum(messageSpark) > 0 ? ('up' as const) : ('flat' as const),
      hint: t('last7Days'),
      icon: <IconMsg />,
      spark: messageSpark,
    },
  ];

  function colorFor(action: string): 'green' | 'gray' | 'purple' {
    if (action === 'created') return 'green';
    if (action === 'deleted') return 'gray';
    return 'purple';
  }

  return (
    <>
      <Topbar crumbs={['Admin', t('crumb')]} unread={unread ?? 0} />
      <div className="page">
        <div className="page-head">
          <div>
            <div className="page-eyebrow">{t('eyebrow')}</div>
            <h1 className="page-title">{t('title')}</h1>
            <div className="page-sub">{t('subtitle')}</div>
          </div>
          <Link href="/admin/projects/new" className="btn primary">
            <IconPlus />
            <span>{t('newProject')}</span>
          </Link>
        </div>

        <div className="stats-row">
          {stats.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>

        <div className="col-grid">
          <div className="panel">
            <div className="panel-head">
              <h3>{t('recentActivity')}</h3>
              <span className="meta">{t('last7Days')}</span>
            </div>
            <div className="panel-body">
              {activities && activities.length > 0 ? (
                activities.map((a) => {
                  const targetLabel = tTargets(
                    a.target_type as 'project' | 'skill' | 'timeline' | 'message',
                  );
                  return (
                    <FeedRow
                      key={a.id}
                      color={colorFor(a.action)}
                      who={tActions(
                        a.action as 'created' | 'updated' | 'deleted' | 'replied',
                        { type: targetLabel },
                      )}
                      what={<em>{a.target_label ?? '—'}</em>}
                      when={relativeTime(a.created_at)}
                    />
                  );
                })
              ) : (
                <div style={{ padding: '24px 18px', color: 'var(--text-3)', fontSize: 13 }}>
                  {t('noActivity')}
                </div>
              )}
            </div>
          </div>

          <div className="panel">
            <div className="panel-head">
              <h3>{t('quickActions')}</h3>
              <span className="meta">{t('shortcuts')}</span>
            </div>
            <div className="quick-tiles">
              <Link href="/admin/projects/new" className="qt">
                <span className="icon"><IconPlus /></span>
                <span className="label">{t('qaAddProject')}</span>
                <span className="desc">{t('qaAddProjectDesc')}</span>
              </Link>
              <Link href="/admin/skills/new" className="qt">
                <span className="icon"><IconSkill /></span>
                <span className="label">{t('qaAddSkill')}</span>
                <span className="desc">{t('qaAddSkillDesc')}</span>
              </Link>
              <Link href="/admin/timeline/new" className="qt">
                <span className="icon"><IconTL /></span>
                <span className="label">{t('qaAddTimeline')}</span>
                <span className="desc">{t('qaAddTimelineDesc')}</span>
              </Link>
              <Link href="/admin/messages" className="qt">
                <span className="icon"><IconMsg /></span>
                <span className="label">{t('qaOpenInbox')}</span>
                <span className="desc">{t('qaOpenInboxDesc', { count: unread ?? 0 })}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
