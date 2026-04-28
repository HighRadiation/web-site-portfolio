import { createClient } from '@/lib/supabase/server';
import { Skill } from '@/types/database';

export const AboutSection = async (): Promise<React.JSX.Element> => {
  const supabase = await createClient();
  const { data: skillsData } = await supabase.from('skills').select('*').order('created_at');

  const skills = skillsData || [];

  // Group skills by category
  const groupedSkills = skills.reduce((acc: Record<string, string[]>, skill: Skill) => {
    const category = skill.category || 'other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill.name);
    return acc;
  }, {});

  const categories = Object.keys(groupedSkills);

  return (
    <section id="about" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-icon">◇</span>
          <h2 className="section-title">About</h2>
        </div>

        <div className="about-grid">
          <div className="about-text">
            <p>
              I’ve never liked sticking to just one niche. My curiosity takes me everywhere—from
              game engines and AI to embedded systems and mobile-web. For me, software isn’t about
              picking a &apos;side&apos;; it’s about having the drive to explore how it all works
              under the hood.
            </p>
            <p>
              I’m a builder, not a reader. If there’s something I don’t know, I’ll sit down and
              grind for a week or a month until I can actually build something with it. I don&apos;t
              believe I&apos;ve truly learned a technology until I’ve made it work in a real-world
              project.
            </p>
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

                  return (
                    <div key={category}>
                      {'  '}
                      <span className="key">&quot;{category}&quot;</span>
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
