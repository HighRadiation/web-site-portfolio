'use client';

import { useActionState } from 'react';
import { Link } from '@/i18n/navigation';
import { addProject } from '../actions';
import type { ActionState } from '@/lib/action-state';

const inputStyle: React.CSSProperties = {
  background: '#111111',
  border: '1px solid #222222',
  color: '#ffffff',
  padding: '0.75rem',
  borderRadius: '6px',
  fontSize: '0.9rem',
  width: '100%',
  boxSizing: 'border-box',
};

const labelStyle: React.CSSProperties = {
  fontSize: '0.85rem',
  color: '#a3a3a3',
  fontWeight: 500,
};

const hintStyle: React.CSSProperties = {
  fontSize: '0.75rem',
  color: '#555555',
  marginTop: '0.25rem',
};

const errorStyle: React.CSSProperties = {
  color: '#ef4444',
  fontSize: '0.8rem',
};

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
    <div style={{ display: 'grid', gap: '0.4rem' }}>
      <label style={labelStyle}>
        {label}
        {required && <span style={{ color: '#ef4444', marginLeft: '2px' }}>*</span>}
      </label>
      {textarea ? (
        <textarea
          name={name}
          required={required}
          placeholder={placeholder}
          style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' }}
        />
      ) : (
        <input
          name={name}
          required={required}
          placeholder={placeholder}
          style={inputStyle}
        />
      )}
      {hint && <span style={hintStyle}>{hint}</span>}
      {error && <span style={errorStyle}>{error}</span>}
    </div>
  );
}

export default function NewProjectPage(): React.JSX.Element {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(addProject, null);

  const fe = state && !state.ok ? state.fieldErrors ?? {} : {};

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '3rem',
        }}
      >
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Add New Project</h1>
        <Link
          href="/admin/projects"
          style={{
            color: '#a3a3a3',
            textDecoration: 'none',
            fontSize: '0.9rem',
            padding: '0.5rem 1rem',
            border: '1px solid #333',
            borderRadius: '6px',
          }}
        >
          Cancel
        </Link>
      </div>

      <form action={formAction} style={{ display: 'grid', gap: '1.5rem', maxWidth: '640px' }}>
        {state && !state.ok && (
          <div
            role="alert"
            style={{
              padding: '0.75rem 1rem',
              border: '1px solid #ef4444',
              borderRadius: '6px',
              color: '#ef4444',
              fontSize: '0.9rem',
            }}
          >
            {state.error}
          </div>
        )}

        {/* ── Title ─────────────────────────────────────────── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem',
          }}
        >
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
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem',
          }}
        >
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
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem',
          }}
        >
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

        <button
          type="submit"
          disabled={pending}
          style={{
            background: '#ffffff',
            color: '#000000',
            border: 'none',
            padding: '0.75rem',
            borderRadius: '6px',
            cursor: pending ? 'wait' : 'pointer',
            fontWeight: 600,
            marginTop: '0.5rem',
            transition: 'opacity 0.2s',
            opacity: pending ? 0.6 : 1,
          }}
        >
          {pending ? 'Saving…' : 'Save Project'}
        </button>
      </form>
    </div>
  );
}
