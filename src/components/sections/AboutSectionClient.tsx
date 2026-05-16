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
  const tCode = useTranslations('About.code');
  const tCategory = useTranslations('SkillsCategory');
  const tSections = useTranslations('Sections');

  return (
    <section id="about">
      <div className="section-eyebrow">
        <span className="marker" />
        {tSections('eyebrow.about')}
      </div>
      <h2 className="section-title">
        {tSections.rich('title.about', {
          accent: (chunks) => <span className="accent">{chunks}</span>,
        })}
      </h2>

      <div className="about-grid">
        <div className="about-prose">
          <p className="lead">{t('lead')}</p>
          <p>
            {t.rich('p1', {
              strong: (chunks) => <strong>{chunks}</strong>,
            })}
          </p>
          <p>
            {t.rich('p2', {
              strong: (chunks) => <strong>{chunks}</strong>,
            })}
          </p>
        </div>

        <div className="code-card">
          <div className="code-card-bar">
            <div className="lights">
              <span className="light" />
              <span className="light" />
              <span className="light" />
            </div>
            <span className="filename">{tCode('filename')}</span>
          </div>
          <pre className="code-body">
            <code>
              {'{\n'}
              {'  '}
              <span className="tk-key">&quot;name&quot;</span>
              <span className="tk-punc">:</span>{' '}
              <span className="tk-str">&quot;{tCode('name')}&quot;</span>
              <span className="tk-punc">,</span>
              {'\n'}
              {categories.map((category) => {
                const items = groupedSkills[category];
                const label = tCategory.has(category) ? tCategory(category) : category;
                return (
                  <span key={category}>
                    {'  '}
                    <span className="tk-key">&quot;{label}&quot;</span>
                    <span className="tk-punc">:</span>{' '}
                    <span className="tk-punc">[</span>
                    {items.map((item, idx) => (
                      <span key={idx}>
                        <span className="tk-str">&quot;{item}&quot;</span>
                        {idx < items.length - 1 && (
                          <>
                            <span className="tk-punc">,</span>{' '}
                          </>
                        )}
                      </span>
                    ))}
                    <span className="tk-punc">]</span>
                    <span className="tk-punc">,</span>
                    {'\n'}
                  </span>
                );
              })}
              {'  '}
              <span className="tk-key">&quot;location&quot;</span>
              <span className="tk-punc">:</span>{' '}
              <span className="tk-str">&quot;{tCode('location')}&quot;</span>
              <span className="tk-punc">,</span>
              {'\n'}
              {'  '}
              <span className="tk-key">&quot;status&quot;</span>
              <span className="tk-punc">:</span>{' '}
              <span className="tk-str">&quot;{tCode('status')}&quot;</span>
              {'\n}'}
            </code>
          </pre>
        </div>
      </div>
    </section>
  );
};
