'use client';

import { useActionState, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { addProject } from '../actions';
import type { ActionState } from '@/lib/action-state';
import { ProjectImageUpload } from '@/components/admin/ProjectImageUpload';
import { TagPillInput } from '@/components/admin/TagPillInput';
import { IconBack, IconBolt } from '@/components/admin/icons';
import { Topbar } from '@/components/admin/Topbar';

export default function NewProjectPage(): React.JSX.Element {
  const t = useTranslations('Admin.projectForm');
  const tProjects = useTranslations('Admin.projects');
  const [state, formAction, pending] = useActionState<ActionState, FormData>(addProject, null);
  const fe = state && !state.ok ? state.fieldErrors ?? {} : {};

  return (
    <>
      <Topbar crumbs={['Admin', tProjects('crumb'), 'New']} />
      <div className="page">
        <Link href="/admin/projects" className="back-link">
          <IconBack />
          <span>{t('back')}</span>
        </Link>

        <div className="page-head">
          <div>
            <div className="page-eyebrow">{t('newEyebrow')}</div>
            <h1 className="page-title">{t('newTitle')}</h1>
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
            <FormGroup label={t('nameEnLabel')} required error={fe.name?.[0]}>
              <input
                name="name"
                required
                placeholder="e.g. get_next_line"
                className="form-input"
              />
            </FormGroup>
            <FormGroup label={t('nameTrLabel')} error={fe.name_tr?.[0]}>
              <input
                name="name_tr"
                placeholder="Türkçe başlık (opsiyonel)"
                className="form-input"
              />
            </FormGroup>

            <FormGroup label={t('descEnLabel')} required error={fe.description?.[0]}>
              <textarea
                name="description"
                required
                placeholder="What does this project do?"
                className="form-textarea"
              />
            </FormGroup>
            <FormGroup label={t('descTrLabel')} error={fe.description_tr?.[0]}>
              <textarea
                name="description_tr"
                placeholder="Proje açıklaması (opsiyonel)"
                className="form-textarea"
              />
            </FormGroup>

            <FormGroup label={t('githubLabel')} error={fe.github_link?.[0]}>
              <input
                name="github_link"
                placeholder="https://github.com/…"
                className="form-input"
              />
            </FormGroup>
            <FormGroup label={t('liveLabel')} error={fe.live_link?.[0]}>
              <input
                name="live_link"
                placeholder="https://…"
                className="form-input"
              />
            </FormGroup>

            <div className="form-group full">
              <label className="form-label">{t('imageLabel')}</label>
              <ProjectImageUpload
                name="image_url"
                labels={{
                  label: t('dropzoneLabel'),
                  hint: t('dropzoneHint'),
                  chooseFile: t('chooseFile'),
                  uploading: t('uploading'),
                  remove: t('removeImage'),
                }}
              />
              {fe.image_url?.[0] && <div className="form-error">{fe.image_url[0]}</div>}
            </div>

            <div className="form-group full">
              <label className="form-label">{t('techLabel')}</label>
              <TagPillInput
                name="technologies"
                placeholder="Next.js, TypeScript, Supabase…"
                help={t('techHelp')}
              />
              {fe.technologies?.[0] && (
                <div className="form-error">{fe.technologies[0]}</div>
              )}
            </div>

            <FormGroup label={t('categoryLabel')} error={fe.category?.[0]}>
              <select name="category" defaultValue="" className="form-select">
                <option value="">{t('categoryUncategorized')}</option>
                <option value="web">{t('categoryWeb')}</option>
                <option value="client">{t('categoryClient')}</option>
                <option value="systems">{t('categorySystems')}</option>
              </select>
            </FormGroup>

            <FormGroup label={t('featuredLabel')}>
              <FeaturedToggle
                name="featured"
                labels={{ on: t('featuredOn'), off: t('featuredOff') }}
              />
            </FormGroup>
          </div>

          <div className="form-foot">
            <span className="left">{t('footLeft')}</span>
            <div className="right">
              <Link href="/admin/projects" className="btn ghost">
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

function FormGroup({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <div className="form-group">
      <label className="form-label">
        {label}
        {required && <span className="req">*</span>}
      </label>
      {children}
      {error && <span className="form-error">{error}</span>}
    </div>
  );
}

function FeaturedToggle({
  name,
  labels,
}: {
  name: string;
  labels: { on: string; off: string };
}): React.JSX.Element {
  const [on, setOn] = useState(false);
  return (
    <div className="form-row">
      <button
        type="button"
        className={`toggle${on ? ' on' : ''}`}
        onClick={() => setOn(!on)}
        aria-pressed={on}
      />
      <span style={{ fontSize: 13, color: 'var(--text-2)' }}>
        {on ? labels.on : labels.off}
      </span>
      <input type="hidden" name={name} value={on ? 'on' : ''} />
    </div>
  );
}
