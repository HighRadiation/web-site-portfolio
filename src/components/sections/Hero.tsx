'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

export const HeroSection = (): React.JSX.Element => {
  const [displayName, setDisplayName] = useState('');
  const [displaySubtitle, setDisplaySubtitle] = useState('');
  const t = useTranslations('Hero');

  const fullName = 'Buğra Öksüz';
  const subtitle = t('subtitle');

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      let titleIndex = 0;
      const titleInterval = setInterval(() => {
        if (titleIndex <= fullName.length) {
          setDisplayName(fullName.slice(0, titleIndex));
          titleIndex++;
        } else {
          clearInterval(titleInterval);

          setTimeout(() => {
            let subIndex = 0;
            const subInterval = setInterval(() => {
              if (subIndex <= subtitle.length) {
                setDisplaySubtitle(subtitle.slice(0, subIndex));
                subIndex++;
              } else {
                clearInterval(subInterval);
              }
            }, 50);
          }, 500);
        }
      }, 100);

      return (): void => clearInterval(titleInterval);
    }, 1000);

    return (): void => clearTimeout(startTimeout);
  }, [subtitle]);

  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero-content">
          <h1 style={{ minHeight: '1.2em' }}>
            {displayName}
            {displayName.length < fullName.length && <span className="cursor">_</span>}
          </h1>

          <p className="hero-subtitle" style={{ minHeight: '1.5em' }}>
            {displaySubtitle}
            {displayName.length === fullName.length && <span className="cursor">_</span>}
          </p>
        </div>
      </div>
    </section>
  );
};
