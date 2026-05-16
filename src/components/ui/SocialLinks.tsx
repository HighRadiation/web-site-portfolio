import React from 'react';

interface SocialLink {
  href: string;
  label: string;
  ariaLabel: string;
  icon: React.JSX.Element;
}

const SOCIAL_LINKS: SocialLink[] = [
  {
    href: 'https://github.com/HighRadiation',
    label: 'GitHub',
    ariaLabel: 'GitHub',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /> {/* eslint-disable-line max-len */}
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </svg>
    ),
  },
  {
    href: 'https://www.linkedin.com/in/bu%C4%9Fra-%C3%B6ks%C3%BCz/',
    label: 'LinkedIn',
    ariaLabel: 'LinkedIn',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
        />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    href: 'https://www.instagram.com/bugra._.oksuz/',
    label: 'Instagram',
    ariaLabel: 'Instagram',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
];

interface SocialLinksProps {
  variant?: 'icon' | 'text';
  className?: string;
  iconClassName?: string;
}

export const SocialLinks = ({
  variant = 'icon',
  className = '',
  iconClassName = 'social-link',
}: SocialLinksProps): React.JSX.Element => {
  return (
    <div className={className}>
      {SOCIAL_LINKS.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={variant === 'icon' ? iconClassName : undefined}
          aria-label={link.ariaLabel}
        >
          {variant === 'icon' ? link.icon : link.label}
        </a>
      ))}
    </div>
  );
};
