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

  function renderTimeline(items: DisplayTimelineItem[]): React.JSX.Element {
    if (!items || items.length === 0) {
      return <p style={{ color: 'var(--text-muted)' }}>{t('noData')}</p>;
    }

    return (
      <div className="timeline-list">
        {items.map((item) => {
          const translatedDate = item.date.replace('PRESENT', t('present'));

          return (
            <div key={item.id} className="timeline-item">
              <span className="timeline-date">{translatedDate}</span>
              <h4 className="timeline-role">{item.role}</h4>
              <p className="timeline-company">{item.company}</p>
              {item.description && <p className="timeline-desc">{item.description}</p>}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <section id="experience" className="section-alt">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{t('title')}</h2>
        </div>

        <div className="timeline-grid">
          <div>
            <h3 className="timeline-title">{t('experience')}</h3>
            {renderTimeline(experiences)}
          </div>
          <div>
            <h3 className="timeline-title">{t('education')}</h3>
            {renderTimeline(education)}
          </div>
        </div>
      </div>
    </section>
  );
};
