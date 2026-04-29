'use client';

import { useLanguage } from '@/context/LanguageContext';
import { useEffect, useState } from 'react';

export const HeroSection = (): React.JSX.Element => {
  const [displayName, setDisplayName] = useState('');
  const { t } = useLanguage();
  const fullName = 'Buğra Öksüz';

  useEffect(() => {
    // Wait for 1 second before starting the animation
    const startTimeout = setTimeout(() => {
      let currentIndex = 0;
      const typingInterval = setInterval(() => {
        if (currentIndex <= fullName.length) {
          setDisplayName(fullName.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
        }
      }, 100); // Adjust speed here (lower is faster)

      return (): void => clearInterval(typingInterval);
    }, 1000);

    return (): void => clearTimeout(startTimeout);
  }, []);

  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero-content">
          <h1 style={{ minHeight: '1.2em' }}>
            {displayName}
            <span className="cursor">_</span>
          </h1>

          <p className="hero-subtitle">{t('hero_subtitle')}</p>

          <div className="hero-buttons">
            <a href="#projects" className="btn btn-primary">
              {t('hero_view_projects')}
            </a>
            <a href="#contact" className="btn btn-outline">
              {t('hero_contact_me')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
