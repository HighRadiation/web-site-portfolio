'use client';

import { useActionState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { login } from './actions';
import type { ActionState } from '@/lib/action-state';

function LoginForm(): React.JSX.Element {
  const searchParams = useSearchParams();
  const urlError = searchParams.get('error');
  const [state, formAction, pending] = useActionState<ActionState, FormData>(login, null);

  const fe = state && !state.ok ? state.fieldErrors ?? {} : {};

  return (
    <div className="login-card">
      <div className="login-header">
        <h1>Admin Login</h1>
        <p>Enter your credentials to continue</p>
      </div>

      {(urlError || (state && !state.ok && state.error)) && (
        <div className="error-message">
          {state && !state.ok && state.error
            ? state.error
            : urlError === 'true'
              ? 'Login failed. Please check your credentials.'
              : urlError}
        </div>
      )}

      <form action={formAction}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            placeholder="admin@example.com" 
            required 
            style={fe.email ? { borderColor: '#ef4444' } : undefined}
          />
          {fe.email && (
            <span
              style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}
            >
              {fe.email[0]}
            </span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            placeholder="••••••••" 
            required 
            style={fe.password ? { borderColor: '#ef4444' } : undefined}
          />
          {fe.password && (
            <span
              style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}
            >
              {fe.password[0]}
            </span>
          )}
        </div>
        <button type="submit" className="login-button" disabled={pending}>
          {pending ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}

export default function LoginPage(): React.JSX.Element {
  return (
    <div className="login-container">
      <Suspense fallback={<div className="login-card"><p>Loading...</p></div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}

