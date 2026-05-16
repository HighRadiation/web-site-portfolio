'use client';

import { useActionState } from 'react';
import { Link } from '@/i18n/navigation';
import { addTimelineItem } from '../actions';
import type { ActionState } from '@/lib/action-state';

export default function NewTimelineItemPage(): React.JSX.Element {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    addTimelineItem,
    null,
  );

  return (
    <div className="admin-page-container-xs">
      <div className="admin-header-row">
        <h1>Add Timeline Item</h1>
        <Link href="/admin/timeline" className="admin-back-link">
          ← Back to Timeline
        </Link>
      </div>

      <form action={formAction} className="admin-form">
        {state && !state.ok && (
          <div role="alert" className="admin-alert-danger">
            {state.error}
          </div>
        )}

        <div className="admin-form-group">
          <label htmlFor="role" className="admin-label">
            Role / Title
          </label>
          <input
            type="text"
            id="role"
            name="role"
            required
            placeholder="e.g. Independent Developer"
            className="admin-input"
          />
          {state && !state.ok && state.fieldErrors?.role && (
            <span className="admin-error-text">
              {state.fieldErrors.role[0]}
            </span>
          )}
        </div>

        <div className="admin-form-group">
          <label htmlFor="company" className="admin-label">
            Company / Organization
          </label>
          <input
            type="text"
            id="company"
            name="company"
            required
            placeholder="e.g. 42 Istanbul"
            className="admin-input"
          />
          {state && !state.ok && state.fieldErrors?.company && (
            <span className="admin-error-text">
              {state.fieldErrors.company[0]}
            </span>
          )}
        </div>

        <div className="admin-form-group">
          <label htmlFor="date" className="admin-label">
            Date
          </label>
          <input
            type="text"
            id="date"
            name="date"
            required
            placeholder="e.g. 2024 – PRESENT"
            className="admin-input"
          />
          {state && !state.ok && state.fieldErrors?.date && (
            <span className="admin-error-text">
              {state.fieldErrors.date[0]}
            </span>
          )}
        </div>

        <div className="admin-form-group">
          <label htmlFor="type" className="admin-label">
            Type
          </label>
          <select
            id="type"
            name="type"
            required
            className="admin-input"
          >
            <option value="experience">Experience</option>
            <option value="education">Education</option>
          </select>
          {state && !state.ok && state.fieldErrors?.type && (
            <span className="admin-error-text">
              {state.fieldErrors.type[0]}
            </span>
          )}
        </div>

        <div className="admin-form-group">
          <label htmlFor="description" className="admin-label">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows={4}
            placeholder="Describe what you did..."
            className="admin-input admin-textarea"
          />
          {state && !state.ok && state.fieldErrors?.description && (
            <span className="admin-error-text">
              {state.fieldErrors.description[0]}
            </span>
          )}
        </div>

        <button
          type="submit"
          disabled={pending}
          className="admin-btn-primary"
        >
          {pending ? 'Saving…' : 'Save Timeline Item'}
        </button>
      </form>
    </div>
  );
}
