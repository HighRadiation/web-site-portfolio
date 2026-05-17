// ============================================
// App root — glue everything together
// ============================================

const { useState, useEffect } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accentHue": 265,
  "particleDensity": 1,
  "showStatusBar": true
}/*EDITMODE-END*/;

function App() {
  const [active, setActive] = useState("home");
  const [lang, setLang] = useState("EN");
  const t = useTweaks(TWEAK_DEFAULTS);

  // apply accent hue
  useEffect(() => {
    const hue = t.accentHue;
    const root = document.documentElement;
    root.style.setProperty("--accent", `oklch(0.78 0.16 ${hue})`);
    root.style.setProperty("--accent-2", `oklch(0.65 0.21 ${hue})`);
    root.style.setProperty("--accent-deep", `oklch(0.45 0.20 ${hue})`);
    root.style.setProperty("--accent-glow", `oklch(0.78 0.16 ${hue} / 0.4)`);
  }, [t.accentHue]);

  // active section tracking
  useEffect(() => {
    const sections = ["home", "about", "experience", "projects"];
    const handler = () => {
      let cur = "home";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.5) cur = id;
      }
      setActive(cur);
    };
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // scroll reveal
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <Nav active={active} lang={lang} setLang={setLang} />
      <Hero />
      <div className="reveal"><About lang={lang} /></div>
      <div className="reveal"><Experience /></div>
      <div className="reveal"><Projects /></div>
      <div className="reveal"><Contact /></div>
      <Footer />

      <TweaksPanel title="Tweaks" defaultPos={{ right: 24, bottom: 24 }}>
        <TweakSection title="Accent">
          <TweakSlider
            label="Hue"
            value={t.accentHue}
            min={0} max={360} step={1}
            onChange={(v) => t.set("accentHue", v)}
            hint="265 = original violet"
          />
        </TweakSection>
        <TweakSection title="Hero">
          <TweakSlider
            label="Particle density"
            value={t.particleDensity}
            min={0.3} max={1.6} step={0.1}
            onChange={(v) => t.set("particleDensity", v)}
          />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
