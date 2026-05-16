'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useMemo, useState, useTransition } from 'react';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing, type Locale } from '@/i18n/routing';
import { SocialLinks } from '../ui/SocialLinks';

export const Navbar = (): React.JSX.Element => {
  const t = useTranslations('Nav');
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [, startTransition] = useTransition();
  const [activeSection, setActiveSection] = useState('home');

  const links = useMemo(
    () => [
      { href: '#home', label: t('home'), id: 'home' },
      { href: '#about', label: t('about'), id: 'about' },
      { href: '#experience', label: t('experience'), id: 'experience' },
      { href: '#projects', label: t('projects'), id: 'projects' },
    ],
    [t],
  );

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]): void => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    links.forEach((link) => {
      const element = document.getElementById(link.id);
      if (element) {
        observer.observe(element);
      }
    });

    return (): void => observer.disconnect();
  }, [links]);

  function switchLocale(nextLocale: Locale): void {
    if (nextLocale === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  }

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="nav-links">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
            >
              {link.label}
            </a>
          ))}
        </div>

        <SocialLinks variant="icon" className="nav-socials" />

        <div className="nav-actions">
          {routing.locales.map((code, index) => (
            <span key={code}>
              {index > 0 && <span className="lang-divider">/</span>}
              <button
                onClick={() => switchLocale(code)}
                className={`lang-btn ${locale === code ? 'active' : ''}`}
                type="button"
              >
                {code.toUpperCase()}
              </button>
            </span>
          ))}
        </div>
      </div>
    </nav>
  );
};
