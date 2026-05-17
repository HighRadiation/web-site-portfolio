'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

const TYPE_INTERVAL = 32;
const ERASE_INTERVAL = 18;
const HOLD_DURATION = 4200;
const EMPTY_PAUSE = 450;

interface TypewriterProps {
  text: string;
  onComplete: () => void;
}

function Typewriter({ text, onComplete }: TypewriterProps): React.JSX.Element {
  const [typed, setTyped] = useState('');

  useEffect(() => {
    let i = 0;
    let intervalId: ReturnType<typeof setInterval> | null = null;
    let holdTimeoutId: ReturnType<typeof setTimeout> | null = null;

    function startErasing(): void {
      intervalId = setInterval(() => {
        i--;
        setTyped(text.slice(0, Math.max(0, i)));
        if (i <= 0) {
          if (intervalId) clearInterval(intervalId);
          holdTimeoutId = setTimeout(onComplete, EMPTY_PAUSE);
        }
      }, ERASE_INTERVAL);
    }

    function startTyping(): void {
      intervalId = setInterval(() => {
        i++;
        setTyped(text.slice(0, i));
        if (i >= text.length) {
          if (intervalId) clearInterval(intervalId);
          holdTimeoutId = setTimeout(startErasing, HOLD_DURATION);
        }
      }, TYPE_INTERVAL);
    }

    startTyping();

    return (): void => {
      if (intervalId) clearInterval(intervalId);
      if (holdTimeoutId) clearTimeout(holdTimeoutId);
    };
  }, [text, onComplete]);

  return <span>{typed}</span>;
}

export const HeroSection = (): React.JSX.Element => {
  const taglines = useTranslations('Hero').raw('taglines') as string[];
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
    </section>
  );
};
