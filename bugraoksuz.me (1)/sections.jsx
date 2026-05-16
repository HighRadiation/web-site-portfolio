// ============================================
// Nav + sections (About, Experience, Projects, Contact)
// ============================================

const { useState, useEffect, useRef } = React;

// ---------- Nav ----------
function Nav({ active, lang, setLang }) {
  const links = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "experience", label: "Experience & Education" },
    { id: "projects", label: "Projects" },
  ];

  return (
    <>
      <div className="nav-wrap">
        <nav className="nav">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={`nav-link${active === l.id ? " active" : ""}`}
            >
              {l.label}
            </a>
          ))}
          <span className="nav-divider" />
          <div className="nav-icons">
            <a className="nav-icon" href="https://github.com/HighRadiation" target="_blank" rel="noreferrer" aria-label="GitHub">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.8 10.9.6.1.8-.2.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.4-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2.9-.3 1.9-.4 2.9-.4s2 .1 2.9.4c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.7.8 1.2 1.8 1.2 3.1 0 4.5-2.7 5.5-5.3 5.8.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.5-1.5 7.8-5.8 7.8-10.9C23.5 5.7 18.3.5 12 .5z"/></svg>
            </a>
            <a className="nav-icon" href="#" aria-label="LinkedIn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"/></svg>
            </a>
            <a className="nav-icon" href="#" aria-label="Instagram">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>
            </a>
          </div>
          <span className="nav-divider" />
          <div className="nav-lang">
            <button className={lang === "EN" ? "active" : ""} onClick={() => setLang("EN")}>EN</button>
            <span className="slash">/</span>
            <button className={lang === "TR" ? "active" : ""} onClick={() => setLang("TR")}>TR</button>
          </div>
        </nav>
      </div>
      <a href="#contact" className="contact-pill">Contact</a>
    </>
  );
}

// ---------- About ----------
function About({ lang }) {
  const en = (
    <>
      <p className="lead">
        I've never liked sticking to just one niche.
      </p>
      <p>
        My curiosity takes me everywhere — from <strong>game engines</strong> and <strong>AI orchestration</strong> to <strong>embedded systems</strong> and <strong>mobile-web</strong>. For me, software isn't about picking a "side"; it's about having the drive to explore how it all works under the hood.
      </p>
      <p>
        If there's something I don't know, I'll sit down and grind for a week — or a month — until I can build something real with it. I don't believe I've truly learned a technology until I've made it work in a project that someone else can actually use.
      </p>
    </>
  );
  const tr = (
    <>
      <p className="lead">
        Tek bir alana sıkışmayı hiç sevmedim.
      </p>
      <p>
        Merakım beni her yere götürür — <strong>oyun motorları</strong>, <strong>AI orkestrasyonu</strong>, <strong>gömülü sistemler</strong>, <strong>mobil-web</strong>. Yazılım benim için bir "taraf" seçmek değil, motoruna bakma içgüdüsünü beslemek.
      </p>
      <p>
        Bilmediğim bir şey varsa, bir hafta — ya da bir ay — oturup gerçekten bir şey üretene kadar uğraşırım. Bir teknolojiyi gerçekten öğrendiğimi ancak başkasının kullanabileceği bir projeye dönüştürdüğümde söyleyebilirim.
      </p>
    </>
  );

  return (
    <section id="about" data-screen-label="02 About">
      <div className="section-eyebrow"><span className="marker" /> 02 — ABOUT</div>
      <h2 className="section-title">A <span className="accent">generalist's</span> profile.</h2>
      <div className="about-grid">
        <div className="about-prose">
          {lang === "TR" ? tr : en}
        </div>
        <div className="code-card">
          <div className="code-card-bar">
            <div className="lights">
              <span className="light" /><span className="light" /><span className="light" />
            </div>
            <span className="filename">profile.json</span>
          </div>
          <pre className="code-body"><code>
{`{
  `}<span className="tk-key">"name"</span><span className="tk-punc">:</span> <span className="tk-str">"Buğra Öksüz"</span><span className="tk-punc">,</span>{`
  `}<span className="tk-key">"systems"</span><span className="tk-punc">:</span> <span className="tk-punc">[</span><span className="tk-str">"C"</span><span className="tk-punc">,</span> <span className="tk-str">"Linux"</span><span className="tk-punc">,</span> <span className="tk-str">"Shell"</span><span className="tk-punc">]</span><span className="tk-punc">,</span>{`
  `}<span className="tk-key">"design"</span><span className="tk-punc">:</span> <span className="tk-punc">[</span><span className="tk-str">"Figma"</span><span className="tk-punc">,</span> <span className="tk-str">"UI/UX"</span><span className="tk-punc">]</span><span className="tk-punc">,</span>{`
  `}<span className="tk-key">"mobile_web"</span><span className="tk-punc">:</span> <span className="tk-punc">[</span><span className="tk-str">"Flutter"</span><span className="tk-punc">,</span> <span className="tk-str">"Next.js"</span><span className="tk-punc">]</span><span className="tk-punc">,</span>{`
  `}<span className="tk-key">"ai"</span><span className="tk-punc">:</span> <span className="tk-punc">[</span><span className="tk-str">"Orchestration"</span><span className="tk-punc">,</span> <span className="tk-str">"Management"</span><span className="tk-punc">]</span><span className="tk-punc">,</span>{`
  `}<span className="tk-key">"location"</span><span className="tk-punc">:</span> <span className="tk-str">"İstanbul, TR"</span><span className="tk-punc">,</span>{`
  `}<span className="tk-key">"status"</span><span className="tk-punc">:</span> <span className="tk-str">"shipping"</span>{`
}`}
          </code></pre>
        </div>
      </div>
    </section>
  );
}

// ---------- Experience & Education ----------
function Experience() {
  const exp = [
    { period: "2024 — PRESENT", title: "Confidential Stealth Project", sub: "Systems & Backend Architecture", desc: "Developing backend systems and scalable infrastructure." },
    { period: "2024 — PRESENT", title: "Visual & Interface Design", sub: "Independent Product Design", desc: "Designed UI/UX systems and prototypes in Figma for my own projects." },
    { period: "2024 — PRESENT", title: "Independent Developer", sub: "Mobile-Web Research", desc: "Focusing on mobile-web development and AI management." },
  ];
  const edu = [
    { period: "2024 — PRESENT", title: "Industrial Design (BSc)", sub: "1st Year Student", desc: "Studying design thinking and functional aesthetics." },
    { period: "2024 — 2025", title: "42 Istanbul", sub: "1-Year Intensive Training", desc: "Focused on C, Unix systems, and low-level algorithms." },
    { period: "2018 — 2022", title: "High School", sub: "Map, Land Registry and Cadastre", desc: "Focused on mapping, surveying, and land registry systems." },
  ];

  return (
    <section id="experience" data-screen-label="03 Experience">
      <div className="section-eyebrow"><span className="marker" /> 03 — TIMELINE</div>
      <h2 className="section-title">Experience <span className="accent">&</span> Education</h2>
      <div className="exp-grid">
        <div className="exp-column">
          <h3>Experience</h3>
          <div className="timeline">
            {exp.map((e, i) => (
              <div className="timeline-item" key={i}>
                <span className="timeline-dot" />
                <div className="timeline-period">{e.period}</div>
                <div className="timeline-title">{e.title}</div>
                <div className="timeline-sub">{e.sub}</div>
                <div className="timeline-desc">{e.desc}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="exp-column">
          <h3>Education</h3>
          <div className="timeline">
            {edu.map((e, i) => (
              <div className="timeline-item" key={i}>
                <span className="timeline-dot" />
                <div className="timeline-period">{e.period}</div>
                <div className="timeline-title">{e.title}</div>
                <div className="timeline-sub">{e.sub}</div>
                <div className="timeline-desc">{e.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Projects ----------
const PROJECTS = [
  {
    name: "sis-kuaför",
    desc: "Dijital kimlik paketi dahilinde müşterimize hazırladığımız işletme websitesi. Booking, multi-language, CMS.",
    stack: ["Next.js", "Supabase", "Vercel"],
    tag: "client",
    featured: true,
    live: true,
    url: "#",
    repo: "#",
  },
  {
    name: "Born2beroot",
    desc: "System administration project about virtualization and server setup.",
    stack: ["Linux", "Bash", "VM"],
    tag: "systems",
    repo: "#",
  },
  {
    name: "ft_printf",
    desc: "Recreated the C standard printf function from scratch with full format support.",
    stack: ["C", "Make"],
    tag: "systems",
    repo: "#",
  },
  {
    name: "get_next_line",
    desc: "A buffered function that returns a line read from a file descriptor — handles any buffer size.",
    stack: ["C", "Memory"],
    tag: "systems",
    featured: true,
    repo: "#",
  },
  {
    name: "Bugraoksuz.me",
    desc: "This site. Personal portfolio built with Next.js, Supabase auth, and a homemade design system.",
    stack: ["Next.js", "Supabase", "Vanilla CSS"],
    tag: "web",
    live: true,
    url: "#",
    repo: "#",
  },
  {
    name: "minitalk",
    desc: "Built a communication system operating via Unix signals — server/client architecture.",
    stack: ["C", "Unix"],
    tag: "systems",
    repo: "#",
  },
  {
    name: "push_swap",
    desc: "Developed an algorithm to sort data with a minimum number of operations on two stacks.",
    stack: ["C", "Algorithms"],
    tag: "systems",
    repo: "#",
  },
  {
    name: "libft",
    desc: "Recoded standard C library functions from the ground up. The foundation everyone builds on.",
    stack: ["C"],
    tag: "systems",
    repo: "#",
  },
];

function Projects() {
  const [filter, setFilter] = useState("all");
  const filters = [
    { id: "all", label: "All" },
    { id: "web", label: "Web" },
    { id: "client", label: "Client work" },
    { id: "systems", label: "Systems / C" },
  ];

  const visible = PROJECTS.filter((p) => filter === "all" || p.tag === filter);

  return (
    <section id="projects" data-screen-label="04 Projects">
      <div className="section-eyebrow"><span className="marker" /> 04 — WORK</div>
      <h2 className="section-title">Selected <span className="accent">projects</span>.</h2>

      <div className="proj-filter">
        {filters.map((f) => (
          <button
            key={f.id}
            className={filter === f.id ? "active" : ""}
            onClick={() => setFilter(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="proj-grid">
        {visible.map((p, i) => (
          <ProjectCard key={p.name} project={p} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project }) {
  const ref = useRef(null);
  function onMove(e) {
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--mx", `${e.clientX - r.left}px`);
    ref.current.style.setProperty("--my", `${e.clientY - r.top}px`);
  }

  return (
    <article
      ref={ref}
      onMouseMove={onMove}
      className={`proj-card${project.featured ? " featured" : ""}`}
    >
      <h4>
        {project.name}
        {project.live && (
          <span className="proj-status-pill">
            <span className="live-dot" /> LIVE
          </span>
        )}
      </h4>
      <p>{project.desc}</p>
      <div className="proj-stack">
        {project.stack.map((s, i) => (
          <span key={s} className={i === 0 ? "hl" : ""}>{s}</span>
        ))}
      </div>
      <div className="proj-actions">
        <a className="proj-btn primary" href={project.repo || "#"}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.8 10.9.6.1.8-.2.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.4-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2.9-.3 1.9-.4 2.9-.4s2 .1 2.9.4c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.7.8 1.2 1.8 1.2 3.1 0 4.5-2.7 5.5-5.3 5.8.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.5-1.5 7.8-5.8 7.8-10.9C23.5 5.7 18.3.5 12 .5z"/></svg>
          Code
        </a>
        {project.live && (
          <a className="proj-btn" href={project.url || "#"}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7"/><path d="M8 7h9v9"/></svg>
            Visit
          </a>
        )}
      </div>
    </article>
  );
}

// ---------- Contact ----------
function Contact() {
  const [copied, setCopied] = useState(false);
  const email = "hi@bugraoksuz.me";

  function copy() {
    navigator.clipboard?.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <section id="contact" className="contact-section" data-screen-label="05 Contact">
      <div className="section-eyebrow"><span className="marker" /> 05 — CONTACT</div>
      <h2 className="contact-large">
        Have something<br />
        worth building? <span className="underline" onClick={copy}>Let's talk{copied ? " ✓" : "."}</span>
      </h2>
      <div className="contact-meta">
        <span><span className="live-dot" /> Available · Q3 2026</span>
        <span>İstanbul, TR — UTC+3</span>
        <span>{copied ? "copied to clipboard" : email}</span>
      </div>
    </section>
  );
}

// ---------- Footer ----------
function Footer() {
  return (
    <footer>
      <span>© 2026 Buğra Öksüz · all rights reserved.</span>
      <div className="links">
        <a href="https://github.com/HighRadiation" target="_blank" rel="noreferrer">GitHub</a>
        <a href="#">LinkedIn</a>
        <a href="#">Instagram</a>
      </div>
    </footer>
  );
}

Object.assign(window, { Nav, About, Experience, Projects, Contact, Footer });
