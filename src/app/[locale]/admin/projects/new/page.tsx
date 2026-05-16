'use client';

import { useActionState } from 'react';
import { addProject } from '../actions';
import type { ActionState } from '@/lib/action-state';

export default function NewProjectPage(): React.JSX.Element {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(addProject, null);

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
        <a
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
        </a>
      </div>

      <form action={formAction} style={{ display: 'grid', gap: '1.5rem', maxWidth: '600px' }}>
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
        <div style={{ display: 'grid', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.85rem', color: '#a3a3a3', fontWeight: 500 }}>
            Project Name
          </label>
          <input
            name="name"
            required
            style={{
              background: '#111111',
              border: '1px solid #222222',
              color: '#ffffff',
              padding: '0.75rem',
              borderRadius: '6px',
              fontSize: '0.9rem',
            }}
          />
          {state && !state.ok && state.fieldErrors?.name && (
            <span style={{ color: '#ef4444', fontSize: '0.8rem' }}>
              {state.fieldErrors.name[0]}
            </span>
          )}
        </div>
        <div style={{ display: 'grid', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.85rem', color: '#a3a3a3', fontWeight: 500 }}>
            Description
          </label>
          <textarea
            name="description"
            required
            style={{
              background: '#111111',
              border: '1px solid #222222',
              color: '#ffffff',
              padding: '0.75rem',
              borderRadius: '6px',
              fontSize: '0.9rem',
              minHeight: '120px',
            }}
          />
          {state && !state.ok && state.fieldErrors?.description && (
            <span style={{ color: '#ef4444', fontSize: '0.8rem' }}>
              {state.fieldErrors.description[0]}
            </span>
          )}
        </div>
        <div style={{ display: 'grid', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.85rem', color: '#a3a3a3', fontWeight: 500 }}>
            Link (GitHub/Live)
          </label>
          <input
            name="link"
            style={{
              background: '#111111',
              border: '1px solid #222222',
              color: '#ffffff',
              padding: '0.75rem',
              borderRadius: '6px',
              fontSize: '0.9rem',
            }}
          />
          {state && !state.ok && state.fieldErrors?.link && (
            <span style={{ color: '#ef4444', fontSize: '0.8rem' }}>
              {state.fieldErrors.link[0]}
            </span>
          )}
        </div>

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
            marginTop: '1rem',
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
