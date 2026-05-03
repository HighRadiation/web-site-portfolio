'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { ContactForm } from '../sections/ContactForm';

export const FloatingContact = (): React.JSX.Element => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = (): void => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 280); // Match animation duration
  };

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
        <div 
          className={`terminal-modal-overlay ${isClosing ? 'closing' : ''}`} 
          onClick={handleClose}
        >
          <div 
            className={`terminal-window ${isClosing ? 'closing' : ''}`} 
            onClick={(e) => e.stopPropagation()}
          >
            <div className="terminal-window-header">
              <div className="terminal-window-title">contact --message</div>
              <button className="terminal-close-btn" onClick={handleClose} type="button">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div className="terminal-window-body">
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
