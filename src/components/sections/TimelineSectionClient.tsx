'use client';

import { useLanguage } from '@/context/LanguageContext';

interface TimelineItem {
  id: string;
  date: string;
  role: string;
  company: string;
  description: string;
  type: string;
}

interface TimelineSectionClientProps {
  experiences: TimelineItem[];
  education: TimelineItem[];
}

export const TimelineSectionClient = ({
  experiences,
  education,
}: TimelineSectionClientProps): React.JSX.Element => {
  const { t } = useLanguage();

  function renderTimeline(items: TimelineItem[]): React.JSX.Element {
    if (!items || items.length === 0) {
      return <p style={{ color: 'var(--text-muted)' }}>{t('timeline_no_data')}</p>;
    }

    return (
      <div className="timeline-list">
        {items.map((item) => {
          // Translate "PRESENT" in date if it exists
          const translatedDate = item.date.replace('PRESENT', t('PRESENT'));

          return (
            <div key={item.id} className="timeline-item">
              <span className="timeline-date">{translatedDate}</span>
              <h4 className="timeline-role">{t(item.role)}</h4>
              <p className="timeline-company">{t(item.company)}</p>
              <p className="timeline-desc">{t(item.description)}</p>
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
          <h2 className="section-title">{t('experience_education_title')}</h2>
        </div>

        <div className="timeline-grid">
          <div>
            <h3 className="timeline-title">{t('experience_title')}</h3>
            {renderTimeline(experiences)}
          </div>
          <div>
            <h3 className="timeline-title">{t('education_title')}</h3>
            {renderTimeline(education)}
          </div>
        </div>
      </div>
    </section>
  );
};
