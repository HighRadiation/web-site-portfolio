import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { createClient } from '@/lib/supabase/server';
import { Topbar } from '@/components/admin/Topbar';
import { IconPlus } from '@/components/admin/icons';
import { deleteSkill } from './actions';
import type { Skill } from '@/types/database';

const CAT_LABEL: Record<string, string> = {
  systems: 'Systems',
  design: 'Design',
  mobile_web: 'Mobile-Web',
  ai: 'AI',
};

export default async function AdminSkillsPage(): Promise<React.JSX.Element> {
  const supabase = await createClient();
  const t = await getTranslations('Admin.skills');

  const { data } = await supabase
    .from('skills')
    .select('*')
    .order('category', { ascending: true });

  const skills = (data ?? []) as Skill[];

  const groups: Record<string, Skill[]> = {};
  for (const s of skills) {
    const key = s.category ?? 'other';
    (groups[key] = groups[key] || []).push(s);
  }
  const categories = Object.keys(groups);

  return (
    <>
      <Topbar crumbs={['Admin', t('crumb')]} />
      <div className="page">
        <div className="page-head">
          <div>
            <div className="page-eyebrow">{t('eyebrow')}</div>
            <h1 className="page-title">{t('title')}</h1>
            <div className="page-sub">
              {t('subtitle', { total: skills.length, categories: categories.length })}
            </div>
          </div>
          <Link href="/admin/skills/new" className="btn primary">
            <IconPlus />
            <span>{t('newSkill')}</span>
          </Link>
        </div>

        {skills.length === 0 ? (
          <div className="panel">
            <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-3)' }}>
              {t('noSkills')}
            </div>
          </div>
        ) : (
          <div className="panel">
            {categories.map((cat) => (
              <div key={cat} className="skill-group">
                <div className="skill-group-head">
                  <div className="skill-group-title">
                    {CAT_LABEL[cat] ?? cat}
                    <span className="count">{groups[cat].length}</span>
                  </div>
                </div>
                <div className="skill-chips">
                  {groups[cat].map((s) => (
                    <div key={s.id} className="skill-chip">
                      {s.name}
                      <form action={deleteSkill.bind(null, s.id)} style={{ display: 'inline' }}>
                        <button type="submit" className="x" aria-label={`Remove ${s.name}`}>
                          ×
                        </button>
                      </form>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
