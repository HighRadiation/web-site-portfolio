'use client';

import { useActionState } from 'react';
import { addSkill } from '../actions';
import type { ActionState } from '@/lib/action-state';

export default function NewSkillPage(): React.JSX.Element {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(addSkill, null);

  return (
    <div style={{ maxWidth: '600px', width: '100%' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
        }}
      >
        <h1 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Add Skill</h1>
        <a
          href="/admin/skills"
          style={{
            color: '#a3a3a3',
            textDecoration: 'none',
            fontSize: '0.9rem',
          }}
        >
          ← Back to Skills
        </a>
      </div>

      <form
        action={formAction}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
          backgroundColor: '#111111',
          padding: '2rem',
          borderRadius: '8px',
          border: '1px solid #222222',
        }}
      >
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

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label htmlFor="name" style={{ fontSize: '0.9rem', color: '#e5e5e5' }}>
            Skill Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="e.g. React.js"
            style={{
              padding: '0.75rem',
              borderRadius: '4px',
              border: '1px solid #333',
              backgroundColor: '#0a0a0a',
              color: '#fff',
              fontFamily: 'var(--font-sans)',
            }}
          />
          {state && !state.ok && state.fieldErrors?.name && (
            <span style={{ color: '#ef4444', fontSize: '0.8rem' }}>
              {state.fieldErrors.name[0]}
            </span>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label htmlFor="category" style={{ fontSize: '0.9rem', color: '#e5e5e5' }}>
            Category Key
          </label>
          <input
            type="text"
            id="category"
            name="category"
            required
            placeholder="e.g. systems, design, mobile_web"
            style={{
              padding: '0.75rem',
              borderRadius: '4px',
              border: '1px solid #333',
              backgroundColor: '#0a0a0a',
              color: '#fff',
              fontFamily: 'var(--font-sans)',
            }}
          />
          {state && !state.ok && state.fieldErrors?.category && (
            <span style={{ color: '#ef4444', fontSize: '0.8rem' }}>
              {state.fieldErrors.category[0]}
            </span>
          )}
          <span style={{ fontSize: '0.8rem', color: '#888' }}>
            This key will be used as the property name in your profile.json block.
          </span>
        </div>

        <button
          type="submit"
          disabled={pending}
          style={{
            marginTop: '1rem',
            padding: '0.75rem',
            backgroundColor: '#fff',
            color: '#000',
            border: 'none',
            borderRadius: '4px',
            fontWeight: 600,
            cursor: pending ? 'wait' : 'pointer',
            opacity: pending ? 0.6 : 1,
          }}
        >
          {pending ? 'Saving…' : 'Save Skill'}
        </button>
      </form>
    </div>
  );
}
