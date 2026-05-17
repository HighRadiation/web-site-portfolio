'use client';

import { useActionState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { addSkill } from '../actions';
import type { ActionState } from '@/lib/action-state';
import { Topbar } from '@/components/admin/Topbar';
import { IconBack, IconBolt } from '@/components/admin/icons';

export default function NewSkillPage(): React.JSX.Element {
  const t = useTranslations('Admin.skillForm');
  const tSkills = useTranslations('Admin.skills');
  const [state, formAction, pending] = useActionState<ActionState, FormData>(addSkill, null);
  const fe = state && !state.ok ? state.fieldErrors ?? {} : {};

  return (
    <>
      <Topbar crumbs={['Admin', tSkills('crumb'), 'New']} />
      <div className="page">
        <Link href="/admin/skills" className="back-link">
          <IconBack />
          <span>{t('back')}</span>
        </Link>

        <div className="page-head">
          <div>
            <div className="page-eyebrow">{t('eyebrow')}</div>
            <h1 className="page-title">{t('title')}</h1>
            <div className="page-sub">{t('subtitle')}</div>
          </div>
        </div>

        <form action={formAction} className="form-shell" style={{ maxWidth: 540 }}>
          {state && !state.ok && state.error && (
            <div role="alert" className="form-alert">
              {state.error}
            </div>
          )}

          <div className="form-grid" style={{ gridTemplateColumns: '1fr' }}>
            <div className="form-group">
              <label className="form-label">
                {t('nameLabel')}
                <span className="req">*</span>
              </label>
              <input
                name="name"
                required
                placeholder="e.g. React.js"
                className="form-input"
              />
              {fe.name?.[0] && <span className="form-error">{fe.name[0]}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">{t('categoryLabel')}</label>
              <select name="category" defaultValue="systems" className="form-select">
                <option value="systems">Systems</option>
                <option value="design">Design</option>
                <option value="mobile_web">Mobile-Web</option>
                <option value="ai">AI</option>
              </select>
              {fe.category?.[0] && <span className="form-error">{fe.category[0]}</span>}
            </div>
          </div>

          <div className="form-foot">
            <span className="left">{t('footLeft')}</span>
            <div className="right">
              <Link href="/admin/skills" className="btn ghost">
                {t('cancel')}
              </Link>
              <button type="submit" disabled={pending} className="btn primary">
                <IconBolt />
                <span>{pending ? t('saving') : t('save')}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
