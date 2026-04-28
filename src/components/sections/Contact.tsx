'use client';

import { useState } from 'react';
import { Modal } from '../ui/Modal';
import { ContactForm } from './ContactForm';

const EMAIL = 'bugraoksuz61@gmail.com';

export const ContactSection = (): React.JSX.Element => {
  const [copied, setCopied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleCopy(): void {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <h2 className="contact-title">Get in Touch</h2>
        <p className="contact-desc">
          Have a question or want to work together? Feel free to reach out!
        </p>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.5rem',
            marginTop: '2.5rem',
          }}
        >
          <button
            onClick={() => setIsModalOpen(true)}
            style={{
              backgroundColor: 'var(--accent-purple)',
              color: '#fff',
              border: 'none',
              padding: '1rem 2.5rem',
              borderRadius: '50px',
              fontSize: '1.1rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 10px 20px -5px rgba(124, 58, 237, 0.4)',
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = 'translateY(-3px)')}
            onMouseOut={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            Contact Me
          </button>

          <div className="email-bar">
            <span className="email-bar-text">{EMAIL}</span>
            <button
              className="email-bar-copy"
              onClick={handleCopy}
              type="button"
              title="Copy email"
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
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Send a Message">
        <ContactForm />
      </Modal>
    </section>
  );
};
