'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

export const ContactForm = (): React.JSX.Element => {
  const t = useTranslations('Contact.form');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    setStatus('loading');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        if (errorData.details) {
          const firstError = Object.values(errorData.details)[0] as string[];
          throw new Error(firstError[0] || 'Validation failed');
        }
        throw new Error(errorData.error || 'Failed to send message');
      }

      setStatus('success');
    } catch (err) {
      const error = err as Error;
      console.error('Contact form error:', error);
      setErrorMessage(error.message || 'An unexpected error occurred');
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div style={{ textAlign: 'center', padding: '2rem 0' }}>
        <div
          style={{
            width: '64px',
            height: '64px',
            backgroundColor: 'rgba(34, 197, 94, 0.1)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
            color: '#22c55e',
          }}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{t('successTitle')}</h4>
        <p style={{ color: '#888', fontSize: '0.9rem' }}>{t('successBody')}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label htmlFor="name" style={{ fontSize: '0.85rem', color: '#888' }}>
          {t('name')}
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          placeholder={t('namePlaceholder')}
          style={{
            padding: '0.75rem',
            backgroundColor: '#0a0a0a',
            border: '1px solid #222',
            borderRadius: '6px',
            color: '#fff',
            outline: 'none',
          }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label htmlFor="email" style={{ fontSize: '0.85rem', color: '#888' }}>
          {t('email')}
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          placeholder={t('emailPlaceholder')}
          style={{
            padding: '0.75rem',
            backgroundColor: '#0a0a0a',
            border: '1px solid #222',
            borderRadius: '6px',
            color: '#fff',
            outline: 'none',
          }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label htmlFor="message" style={{ fontSize: '0.85rem', color: '#888' }}>
          {t('message')}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          placeholder={t('messagePlaceholder')}
          style={{
            padding: '0.75rem',
            backgroundColor: '#0a0a0a',
            border: '1px solid #222',
            borderRadius: '6px',
            color: '#fff',
            outline: 'none',
            resize: 'vertical',
          }}
        />
      </div>

      {status === 'error' && (
        <p style={{ color: '#ef4444', fontSize: '0.85rem', margin: 0 }}>{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        style={{
          backgroundColor: '#fff',
          color: '#000',
          border: 'none',
          padding: '0.85rem',
          borderRadius: '6px',
          fontWeight: 600,
          cursor: status === 'loading' ? 'not-allowed' : 'pointer',
          opacity: status === 'loading' ? 0.7 : 1,
          transition: 'all 0.2s',
        }}
      >
        {status === 'loading' ? t('sending') : t('send')}
      </button>
    </form>
  );
};
