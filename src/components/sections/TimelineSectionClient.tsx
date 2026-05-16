'use client';

import { useTranslations } from 'next-intl';

export interface DisplayTimelineItem {
  id: string;
  date: string;
  role: string;
  company: string;
  description: string | null;
  type: 'experience' | 'education';
}

interface TimelineSectionClientProps {
  experiences: DisplayTimelineItem[];
  education: DisplayTimelineItem[];
}

export const TimelineSectionClient = ({
  experiences,
  education,
}: TimelineSectionClientProps): React.JSX.Element => {
  const t = useTranslations('Timeline');
  const tSections = useTranslations('Sections');

  function renderTimeline(items: DisplayTimelineItem[]): React.JSX.Element {
    if (!items || items.length === 0) {
      return <p style={{ color: 'var(--text-3)' }}>{t('noData')}</p>;
    }

    return (
      <div className="timeline">
        {items.map((item) => {
          const period = item.date.replace('PRESENT', t('present'));
          return (
            <div key={item.id} className="timeline-item">
              <span className="timeline-dot" />
              <div className="timeline-period">{period}</div>
              <div className="timeline-title">{item.role}</div>
              <div className="timeline-sub">{item.company}</div>
              {item.description && <div className="timeline-desc">{item.description}</div>}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <section id="experience">
      <div className="section-eyebrow">
        <span className="marker" />
        {tSections('eyebrow.experience')}
      </div>
      <h2 className="section-title">
        {tSections.rich('title.experience', {
          accent: (chunks) => <span className="accent">{chunks}</span>,
        })}
      </h2>

      <div className="exp-grid">
        <div className="exp-column">
          <h3>{t('experience')}</h3>
          {renderTimeline(experiences)}
        </div>
        <div className="exp-column">
          <h3>{t('education')}</h3>
          {renderTimeline(education)}
        </div>
      </div>
    </section>
  );
};
