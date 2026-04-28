export const HeroSection = (): React.JSX.Element => {
  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero-content">
          <h1>
            Buğra Öksüz<span className="cursor">_</span>
          </h1>

          <p className="hero-subtitle">
            I craft mobile-web apps from first principles.
          </p>

          <div className="hero-buttons">
            <a href="#projects" className="btn btn-primary">
              VIEW_PROJECTS
            </a>
            <a href="#contact" className="btn btn-outline">
              CONTACT_ME
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
