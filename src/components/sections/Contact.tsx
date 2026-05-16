'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Modal } from '../ui/Modal';
import { ContactForm } from './ContactForm';

const EMAIL = 'bugraoksuz61@gmail.com';

export const ContactSection = (): React.JSX.Element => {
  const t = useTranslations('Contact');
  const tSections = useTranslations('Sections');
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  function handleLinkClick(e: React.MouseEvent<HTMLButtonElement>): void {
    e.preventDefault();
    void navigator.clipboard?.writeText(EMAIL).catch(() => undefined);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
    setIsOpen(true);
  }

  return (
    <section id="contact" className="contact-section">
      <div className="section-eyebrow">
        <span className="marker" />
        {tSections('eyebrow.contact')}
      </div>
      <h2 className="contact-large">
        {t('headlinePrefix')}{' '}
        <button type="button" className="underline" onClick={handleLinkClick}>
          {copied ? t('copied') : t('linkText')}
        </button>
      </h2>
      <div className="contact-meta">
        <span>
          <span className="live-dot" /> {t('available')}
        </span>
        <span>{t('location')}</span>
        <span>{copied ? `${EMAIL} ✓` : EMAIL}</span>
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title={t('sendMessage')}>
        <ContactForm />
      </Modal>
    </section>
  );
};
