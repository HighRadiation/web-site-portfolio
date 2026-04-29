'use client';

import { useLanguage } from '@/context/LanguageContext';
import { useState } from 'react';
import { Modal } from '../ui/Modal';
import { ContactForm } from './ContactForm';

const EMAIL = 'bugraoksuz61@gmail.com';

export const ContactSection = (): React.JSX.Element => {
  const [copied, setCopied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useLanguage();

  function handleCopy(): void {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <h2 className="contact-title">{t('contact_title')}</h2>
        <p className="contact-desc">{t('contact_desc')}</p>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            marginTop: '2.5rem',
            flexWrap: 'wrap',
          }}
        >
          <div className="email-bar" style={{ margin: 0 }}>
            <span className="email-bar-text">{EMAIL}</span>
            <button
              className="email-bar-copy"
              onClick={handleCopy}
              type="button"
              title={t('contact_email_copied')}
            >
              {copied ? (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
              )}
            </button>
          </div>

          <span
            style={{
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              fontWeight: 500,
            }}
          >
            {t('contact_or')}
          </span>

          <button
            onClick={() => setIsModalOpen(true)}
            className="btn btn-primary"
            style={{
              padding: '0.75rem 2rem',
              fontSize: '0.9rem',
              borderRadius: '8px',
              height: '46px', // Explicit height to match email bar exactly
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {t('contact_button')}
          </button>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={t('contact_send_message')}
      >
        <ContactForm />
      </Modal>
    </section>
  );
};
