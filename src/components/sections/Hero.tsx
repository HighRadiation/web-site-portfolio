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
    let startTimeoutId: ReturnType<typeof setTimeout> | null = null;
    let titleIntervalId: ReturnType<typeof setInterval> | null = null;
    let subTimeoutId: ReturnType<typeof setTimeout> | null = null;
    let subIntervalId: ReturnType<typeof setInterval> | null = null;

    startTimeoutId = setTimeout(() => {
      let titleIndex = 0;
      titleIntervalId = setInterval(() => {
        if (titleIndex <= fullName.length) {
          setDisplayName(fullName.slice(0, titleIndex));
          titleIndex++;
        } else {
          if (titleIntervalId) clearInterval(titleIntervalId);

          subTimeoutId = setTimeout(() => {
            let subIndex = 0;
            subIntervalId = setInterval(() => {
              if (subIndex <= subtitle.length) {
                setDisplaySubtitle(subtitle.slice(0, subIndex));
                subIndex++;
              } else {
                if (subIntervalId) clearInterval(subIntervalId);
              }
            }, 50);
          }, 500);
        }
      }, 100);
    }, 1000);

    return (): void => {
      if (startTimeoutId) clearTimeout(startTimeoutId);
      if (titleIntervalId) clearInterval(titleIntervalId);
      if (subTimeoutId) clearTimeout(subTimeoutId);
      if (subIntervalId) clearInterval(subIntervalId);
    };
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
