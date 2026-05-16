'use client';

import { useActionState } from 'react';
import { Link } from '@/i18n/navigation';
import { addSkill } from '../actions';
import type { ActionState } from '@/lib/action-state';

export default function NewSkillPage(): React.JSX.Element {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(addSkill, null);

  return (
    <div className="admin-page-container-xs">
      <div className="admin-header-row">
        <h1>Add Skill</h1>
        <Link href="/admin/skills" className="admin-back-link">
          ← Back to Skills
        </Link>
      </div>

      <form action={formAction} className="admin-form">
        {state && !state.ok && (
          <div role="alert" className="admin-alert-danger">
            {state.error}
          </div>
        )}

        <div className="admin-form-group">
          <label htmlFor="name" className="admin-label">
            Skill Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="e.g. React.js"
            className="admin-input"
          />
          {state && !state.ok && state.fieldErrors?.name && (
            <span className="admin-error-text">
              {state.fieldErrors.name[0]}
            </span>
          )}
        </div>

        <div className="admin-form-group">
          <label htmlFor="category" className="admin-label">
            Category Key
          </label>
          <input
            type="text"
            id="category"
            name="category"
            required
            placeholder="e.g. systems, design, mobile_web"
            className="admin-input"
          />
          {state && !state.ok && state.fieldErrors?.category && (
            <span className="admin-error-text">
              {state.fieldErrors.category[0]}
            </span>
          )}
          <span className="admin-help-text">
            This key will be used as the property name in your profile.json block.
          </span>
        </div>

        <button
          type="submit"
          disabled={pending}
          className="admin-btn-primary"
        >
          {pending ? 'Saving…' : 'Save Skill'}
        </button>
      </form>
    </div>
  );
}
