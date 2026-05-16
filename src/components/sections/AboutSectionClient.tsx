'use client';

import { useTranslations } from 'next-intl';

interface AboutSectionClientProps {
  categories: string[];
  groupedSkills: Record<string, string[]>;
}

export const AboutSectionClient = ({
  categories,
  groupedSkills,
}: AboutSectionClientProps): React.JSX.Element => {
  const t = useTranslations('About');
  const tCategory = useTranslations('SkillsCategory');

  return (
    <section id="about" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-icon">◇</span>
          <h2 className="section-title">{t('title')}</h2>
        </div>

        <div className="about-grid">
          <div className="about-text">
            <p>{t('p1')}</p>
            <p>{t('p2')}</p>
          </div>

          <div className="code-block">
            <div className="code-block-header">
              <div className="code-block-dots">
                <span />
                <span />
                <span />
              </div>
              <span className="code-block-filename">profile.json</span>
            </div>
            <div className="code-block-body">
              <pre>
                <span className="bracket">{'{'}</span>
                <br />
                {categories.map((category, index) => {
                  const isLast = index === categories.length - 1;
                  const items = groupedSkills[category];
                  const label = tCategory.has(category) ? tCategory(category) : category;

                  return (
                    <div key={category}>
                      {'  '}
                      <span className="key">&quot;{label}&quot;</span>
                      <span className="punctuation">:</span> <span className="bracket">[</span>
                      {items.map((item: string, itemIndex: number) => (
                        <span key={itemIndex}>
                          <span className="string">&quot;{item}&quot;</span>
                          {itemIndex < items.length - 1 && (
                            <>
                              <span className="punctuation">,</span>{' '}
                            </>
                          )}
                        </span>
                      ))}
                      <span className="bracket">]</span>
                      {!isLast && <span className="punctuation">,</span>}
                      <br />
                    </div>
                  );
                })}
                <span className="bracket">{'}'}</span>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
