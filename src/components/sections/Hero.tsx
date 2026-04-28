'use client';

import { useState, useEffect } from 'react';

export const HeroSection = (): React.JSX.Element => {
  const [displayName, setDisplayName] = useState('');
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

          <p className="hero-subtitle">I craft mobile-web apps from first principles.</p>

          <div className="hero-buttons">
            <a href="#projects" className="btn btn-primary">
              VIEW_PROJECTS
            </a>
            <a href="#contact" className="btn btn-outline">
              CONTACT_ME
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
