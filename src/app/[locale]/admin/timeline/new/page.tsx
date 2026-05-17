'use client';

import { useActionState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { addTimelineItem } from '../actions';
import type { ActionState } from '@/lib/action-state';
import { Topbar } from '@/components/admin/Topbar';
import { IconBack, IconBolt } from '@/components/admin/icons';

export default function NewTimelineItemPage(): React.JSX.Element {
  const t = useTranslations('Admin.timelineForm');
  const tTimeline = useTranslations('Admin.timeline');
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    addTimelineItem,
    null,
  );
  const fe = state && !state.ok ? state.fieldErrors ?? {} : {};

  return (
    <>
      <Topbar crumbs={['Admin', tTimeline('crumb'), 'New']} />
      <div className="page">
        <Link href="/admin/timeline" className="back-link">
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

        <form action={formAction} className="form-shell">
          {state && !state.ok && state.error && (
            <div role="alert" className="form-alert">
              {state.error}
            </div>
          )}

          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">
                {t('roleLabel')}
                <span className="req">*</span>
              </label>
              <input
                name="role"
                required
                placeholder="e.g. Independent Developer"
                className="form-input"
              />
              {fe.role?.[0] && <span className="form-error">{fe.role[0]}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">
                {t('companyLabel')}
                <span className="req">*</span>
              </label>
              <input
                name="company"
                required
                placeholder="e.g. 42 Istanbul"
                className="form-input"
              />
              {fe.company?.[0] && <span className="form-error">{fe.company[0]}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">
                {t('dateLabel')}
                <span className="req">*</span>
              </label>
              <input
                name="date"
                required
                placeholder="2024 — PRESENT"
                className="form-input"
              />
              {fe.date?.[0] && <span className="form-error">{fe.date[0]}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">{t('typeLabel')}</label>
              <select name="type" defaultValue="experience" className="form-select">
                <option value="experience">{t('typeExp')}</option>
                <option value="education">{t('typeEdu')}</option>
              </select>
              {fe.type?.[0] && <span className="form-error">{fe.type[0]}</span>}
            </div>

            <div className="form-group full">
              <label className="form-label">
                {t('descLabel')}
                <span className="req">*</span>
              </label>
              <textarea
                name="description"
                required
                placeholder="Describe what you did…"
                className="form-textarea"
              />
              {fe.description?.[0] && (
                <span className="form-error">{fe.description[0]}</span>
              )}
            </div>
          </div>

          <div className="form-foot">
            <span className="left">{t('footLeft')}</span>
            <div className="right">
              <Link href="/admin/timeline" className="btn ghost">
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
