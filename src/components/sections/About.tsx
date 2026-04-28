export const AboutSection = (): React.JSX.Element => {
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
                {'  '}
                <span className="key">&quot;systems&quot;</span>
                <span className="punctuation">:</span> <span className="bracket">[</span>
                <span className="string">&quot;C&quot;</span>
                <span className="punctuation">,</span>{' '}
                <span className="string">&quot;Linux&quot;</span>
                <span className="punctuation">,</span>{' '}
                <span className="string">&quot;Shell&quot;</span>
                <span className="bracket">]</span>
                <span className="punctuation">,</span>
                <br />
                {'  '}
                <span className="key">&quot;design&quot;</span>
                <span className="punctuation">:</span> <span className="bracket">[</span>
                <span className="string">&quot;Figma&quot;</span>
                <span className="punctuation">,</span>{' '}
                <span className="string">&quot;UI/UX&quot;</span>
                <span className="bracket">]</span>
                <span className="punctuation">,</span>
                <br />
                {'  '}
                <span className="key">&quot;mobile_web&quot;</span>
                <span className="punctuation">:</span> <span className="bracket">[</span>
                <span className="string">&quot;Flutter&quot;</span>
                <span className="punctuation">,</span>{' '}
                <span className="string">&quot;Architecture&quot;</span>
                <span className="bracket">]</span>
                <span className="punctuation">,</span>
                <br />
                {'  '}
                <span className="key">&quot;ai&quot;</span>
                <span className="punctuation">:</span>{' '}
                <span className="string">&quot;Management &amp; Orchestration&quot;</span>
                <br />
                <span className="bracket">{'}'}</span>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
