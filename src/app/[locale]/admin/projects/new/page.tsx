'use client';

import { useActionState } from 'react';
import { Link } from '@/i18n/navigation';
import { addProject } from '../actions';
import type { ActionState } from '@/lib/action-state';

function Field({
  label,
  name,
  hint,
  error,
  textarea,
  placeholder,
  required,
}: {
  label: string;
  name: string;
  hint?: string;
  error?: string;
  textarea?: boolean;
  placeholder?: string;
  required?: boolean;
}): React.JSX.Element {
  return (
    <div className="admin-form-group">
      <label className="admin-label">
        {label}
        {required && <span style={{ color: '#ef4444', marginLeft: '2px' }}>*</span>}
      </label>
      {textarea ? (
        <textarea
          name={name}
          required={required}
          placeholder={placeholder}
          className="admin-input admin-textarea"
        />
      ) : (
        <input
          name={name}
          required={required}
          placeholder={placeholder}
          className="admin-input"
        />
      )}
      {hint && <span className="admin-help-text">{hint}</span>}
      {error && <span className="admin-error-text">{error}</span>}
    </div>
  );
}

export default function NewProjectPage(): React.JSX.Element {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(addProject, null);

  const fe = state && !state.ok ? state.fieldErrors ?? {} : {};

  return (
    <div className="admin-page-container-sm">
      <div className="admin-header-row">
        <h1>Add New Project</h1>
        <Link href="/admin/projects" className="admin-btn-outline">
          Cancel
        </Link>
      </div>

      <form action={formAction} className="admin-form" style={{ maxWidth: '640px' }}>
        {state && !state.ok && (
          <div role="alert" className="admin-alert-danger">
            {state.error}
          </div>
        )}

        {/* ── Title ─────────────────────────────────────────── */}
        <div className="admin-grid-2cols">
          <Field
            label="Project Name (EN)"
            name="name"
            required
            placeholder="e.g. get_next_line"
            error={fe.name?.[0]}
          />
          <Field
            label="Project Name (TR)"
            name="name_tr"
            placeholder="Türkçe başlık (opsiyonel)"
            error={fe.name_tr?.[0]}
          />
        </div>

        {/* ── Description ───────────────────────────────────── */}
        <div className="admin-grid-2cols">
          <Field
            label="Description (EN)"
            name="description"
            required
            textarea
            placeholder="What does this project do?"
            error={fe.description?.[0]}
          />
          <Field
            label="Description (TR)"
            name="description_tr"
            textarea
            placeholder="Proje açıklaması (opsiyonel)"
            error={fe.description_tr?.[0]}
          />
        </div>

        {/* ── Links ─────────────────────────────────────────── */}
        <div className="admin-grid-2cols">
          <Field
            label="GitHub Link"
            name="github_link"
            placeholder="https://github.com/…"
            error={fe.github_link?.[0]}
          />
          <Field
            label="Live Link"
            name="live_link"
            placeholder="https://…"
            error={fe.live_link?.[0]}
          />
        </div>

        {/* ── Image & Technologies ──────────────────────────── */}
        <Field
          label="Image URL"
          name="image_url"
          placeholder="https://… (optional)"
          error={fe.image_url?.[0]}
        />
        <Field
          label="Technologies"
          name="technologies"
          placeholder="Next.js, TypeScript, Supabase"
          hint="Comma-separated list"
          error={fe.technologies?.[0]}
        />

        {/* ── Category & Featured ───────────────────────────── */}
        <div className="admin-grid-2cols">
          <div className="admin-form-group">
            <label className="admin-label">Category</label>
            <select name="category" defaultValue="" className="admin-input">
              <option value="">— Uncategorized —</option>
              <option value="web">Web</option>
              <option value="client">Client work</option>
              <option value="systems">Systems / C</option>
            </select>
            {fe.category?.[0] && (
              <span className="admin-error-text">{fe.category[0]}</span>
            )}
          </div>
          <div className="admin-form-group">
            <label className="admin-label">Featured</label>
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                paddingTop: '0.5rem',
                fontSize: '0.9rem',
                color: '#a3a3a3',
              }}
            >
              <input type="checkbox" name="featured" />
              Show as a featured (wide) card
            </label>
            {fe.featured?.[0] && (
              <span className="admin-error-text">{fe.featured[0]}</span>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={pending}
          className="admin-btn-primary"
          style={{ marginTop: '0.5rem' }}
        >
          {pending ? 'Saving…' : 'Save Project'}
        </button>
      </form>
    </div>
  );
}
