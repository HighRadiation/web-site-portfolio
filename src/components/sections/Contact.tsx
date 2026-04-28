'use client';

import { useState } from 'react';

const EMAIL = 'bugraoksuz61@gmail.com';

export const ContactSection = (): React.JSX.Element => {
  const [copied, setCopied] = useState(false);

  function handleCopy(): void {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <h2 className="contact-title">
          Contact Me
        </h2>
        <p className="contact-desc">
          Open to new opportunities and
          collaborations.
        </p>
        <div className="email-bar">
          <span className="email-bar-text">
            {EMAIL}
          </span>
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
                <rect
                  x="9"
                  y="9"
                  width="13"
                  height="13"
                  rx="2"
                  ry="2"
                />
                <path
                  d="M5 15H4a2 2 0 0 1-2-2V4a2
                   2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};
