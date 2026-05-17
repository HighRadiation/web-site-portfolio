'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useMemo, useState, useTransition } from 'react';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing, type Locale } from '@/i18n/routing';
import { SocialLinks } from '../ui/SocialLinks';
import { Modal } from '../ui/Modal';
import { ContactForm } from '../sections/ContactForm';

export const Navbar = (): React.JSX.Element => {
  const t = useTranslations('Nav');
  const tContact = useTranslations('Contact');
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [, startTransition] = useTransition();
  const [activeSection, setActiveSection] = useState('home');
  const [isContactOpen, setIsContactOpen] = useState(false);

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
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { root: null, rootMargin: '-50% 0px -50% 0px', threshold: 0 },
    );

    links.forEach((link) => {
      const element = document.getElementById(link.id);
      if (element) observer.observe(element);
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
    <>
      <div className="nav-wrap">
        <nav className="nav">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`nav-link${activeSection === link.id ? ' active' : ''}`}
            >
              {link.label}
            </a>
          ))}
          <span className="nav-divider" />
          <SocialLinks variant="icon" className="nav-icons" iconClassName="nav-icon" />
          <span className="nav-divider" />
          <div className="nav-lang">
            {routing.locales.map((code, index) => (
              <span key={code}>
                {index > 0 && <span className="slash">/</span>}
                <button
                  onClick={() => switchLocale(code)}
                  className={locale === code ? 'active' : ''}
                  type="button"
                >
                  {code.toUpperCase()}
                </button>
              </span>
            ))}
          </div>
        </nav>
      </div>
      <button
        type="button"
        className="contact-pill"
        onClick={() => setIsContactOpen(true)}
      >
        {t('contact')}
      </button>

      <Modal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        title={tContact('sendMessage')}
      >
        <ContactForm />
      </Modal>
    </>
  );
};
