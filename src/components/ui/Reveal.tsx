'use client';

import { useEffect, useRef } from 'react';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
}

export const Reveal = ({ children, className = '' }: RevealProps): React.JSX.Element => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    ) {
      el.classList.add('in');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    observer.observe(el);
    return (): void => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${className}`.trim()}>
      {children}
    </div>
  );
};
