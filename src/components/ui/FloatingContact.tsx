'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { ContactForm } from '../sections/ContactForm';

export const FloatingContact = (): React.JSX.Element => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)} 
        className="floating-contact"
        type="button"
      >
        {t('contact') || 'Contact'}
      </button>

      {isOpen && (
        <div className="terminal-modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="terminal-window" onClick={(e) => e.stopPropagation()}>
            <div className="terminal-window-header">
              <div className="terminal-window-dots">
                <div className="dot red" onClick={() => setIsOpen(false)} />
                <div className="dot yellow" />
                <div className="dot green" />
              </div>
              <div className="terminal-window-title">contact --message</div>
            </div>
            <div className="terminal-window-body">
              <div className="terminal-line">
                <span className="prompt">visitor@bugraoksuz:~$</span>
                <span className="command">send --message</span>
              </div>
              <div className="terminal-window-content">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
