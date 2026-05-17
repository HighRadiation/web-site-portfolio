import React from 'react';

interface IconProps {
  className?: string;
}

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

export const IconDash = ({ className }: IconProps): React.JSX.Element => (
  <svg {...base} className={className}>
    <rect x="3" y="3" width="7" height="9" />
    <rect x="14" y="3" width="7" height="5" />
    <rect x="14" y="12" width="7" height="9" />
    <rect x="3" y="16" width="7" height="5" />
  </svg>
);

export const IconFolder = ({ className }: IconProps): React.JSX.Element => (
  <svg {...base} className={className}>
    <path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
  </svg>
);

export const IconSkill = ({ className }: IconProps): React.JSX.Element => (
  <svg {...base} className={className}>
    <polygon points="12 2 15 8.5 22 9.3 17 14.1 18.2 21 12 17.8 5.8 21 7 14.1 2 9.3 9 8.5" />
  </svg>
);

export const IconTL = ({ className }: IconProps): React.JSX.Element => (
  <svg {...base} className={className}>
    <circle cx="6" cy="6" r="2" />
    <circle cx="6" cy="12" r="2" />
    <circle cx="6" cy="18" r="2" />
    <path d="M11 6h10" />
    <path d="M11 12h10" />
    <path d="M11 18h10" />
  </svg>
);

export const IconMsg = ({ className }: IconProps): React.JSX.Element => (
  <svg {...base} className={className}>
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
  </svg>
);

export const IconBell = ({ className }: IconProps): React.JSX.Element => (
  <svg {...base} className={className}>
    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.7 21a2 2 0 01-3.4 0" />
  </svg>
);

export const IconSearch = ({ className }: IconProps): React.JSX.Element => (
  <svg {...base} className={className}>
    <circle cx="11" cy="11" r="8" />
    <path d="M21 21l-4.3-4.3" />
  </svg>
);

export const IconPlus = ({ className }: IconProps): React.JSX.Element => (
  <svg {...base} strokeWidth={2} className={className}>
    <path d="M12 5v14" />
    <path d="M5 12h14" />
  </svg>
);

export const IconEdit = ({ className }: IconProps): React.JSX.Element => (
  <svg {...base} className={className}>
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
  </svg>
);

export const IconTrash = ({ className }: IconProps): React.JSX.Element => (
  <svg {...base} className={className}>
    <path d="M3 6h18" />
    <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
    <path d="M10 11v6M14 11v6" />
    <path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2" />
  </svg>
);

export const IconExt = ({ className }: IconProps): React.JSX.Element => (
  <svg {...base} className={className}>
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

export const IconBack = ({ className }: IconProps): React.JSX.Element => (
  <svg {...base} className={className}>
    <path d="M19 12H5" />
    <path d="M12 19l-7-7 7-7" />
  </svg>
);

export const IconReply = ({ className }: IconProps): React.JSX.Element => (
  <svg {...base} className={className}>
    <polyline points="9 17 4 12 9 7" />
    <path d="M20 18v-2a4 4 0 00-4-4H4" />
  </svg>
);

export const IconArchive = ({ className }: IconProps): React.JSX.Element => (
  <svg {...base} className={className}>
    <polyline points="21 8 21 21 3 21 3 8" />
    <rect x="1" y="3" width="22" height="5" />
    <line x1="10" y1="12" x2="14" y2="12" />
  </svg>
);

export const IconLogout = ({ className }: IconProps): React.JSX.Element => (
  <svg {...base} className={className}>
    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

export const IconBolt = ({ className }: IconProps): React.JSX.Element => (
  <svg {...base} className={className}>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

export const IconUpload = ({ className }: IconProps): React.JSX.Element => (
  <svg {...base} className={className}>
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);
