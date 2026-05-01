'use client';

import { useLanguage } from '@/context/LanguageContext';

export const Navbar = (): React.JSX.Element => {
  const { language, setLanguage, t } = useLanguage();

  const links = [
    { href: '#home', label: t('home') },
    { href: '#about', label: t('about') },
    { href: '#experience', label: t('experience') },
    { href: '#projects', label: t('projects') },
    { href: '#contact', label: t('contact') },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="nav-links">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
        </div>

        <div className="nav-actions">
          <button
            onClick={() => setLanguage('en')}
            className={`lang-btn ${language === 'en' ? 'active' : ''}`}
            type="button"
          >
            EN
          </button>
          <span className="lang-divider">/</span>
          <button
            onClick={() => setLanguage('tr')}
            className={`lang-btn ${language === 'tr' ? 'active' : ''}`}
            type="button"
          >
            TR
          </button>
        </div>
      </div>
    </nav>
  );
};
