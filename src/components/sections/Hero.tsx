'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

const TYPE_INTERVAL = 32;
const HOLD_DURATION = 4200;

interface TypewriterProps {
  text: string;
  onComplete: () => void;
}

function Typewriter({ text, onComplete }: TypewriterProps): React.JSX.Element {
  const [typed, setTyped] = useState('');

  useEffect(() => {
    let i = 0;
    let holdTimeoutId: ReturnType<typeof setTimeout> | null = null;
    const intervalId = setInterval(() => {
      i++;
      setTyped(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(intervalId);
        holdTimeoutId = setTimeout(onComplete, HOLD_DURATION);
      }
    }, TYPE_INTERVAL);
    return (): void => {
      clearInterval(intervalId);
      if (holdTimeoutId) clearTimeout(holdTimeoutId);
    };
  }, [text, onComplete]);

  return <span>{typed}</span>;
}

export const HeroSection = (): React.JSX.Element => {
  const t = useTranslations('Hero');
  const taglines = t.raw('taglines') as string[];
  const [taglineIdx, setTaglineIdx] = useState(0);

  function next(): void {
    setTaglineIdx((x) => (x + 1) % taglines.length);
  }

  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <h1 className="hero-title">Buğra Öksüz</h1>
        <div className="hero-tagline">
          <Typewriter key={taglineIdx} text={taglines[taglineIdx] ?? ''} onComplete={next} />
          <span className="cursor" />
        </div>
      </div>
      <div className="hero-scroll">
        <span>{t('scroll')}</span>
        <span className="line" />
      </div>
    </section>
  );
};
