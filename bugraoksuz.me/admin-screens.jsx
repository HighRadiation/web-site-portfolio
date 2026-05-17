// ============================================
// Admin screens — Dashboard, Projects, Skills, Timeline, Messages
// Uses globals: AdminI (icons), AdminField (field), Topbar
// ============================================

const I2 = AdminI;
const { useState: useS, useEffect: useE, useRef: useR } = React;

// ---------- DATA ----------
const SAMPLE_PROJECTS = [
  { id: 1, name: "sis-kuaför", nameTr: "sis-kuaför", desc: "Müşterimize hazırladığımız dijital kimlik paketi dahilinde ki websitesi.", stack: ["Next.js", "Supabase", "Vercel"], category: "client", featured: true, live: true, repo: "#", url: "#", updated: "2d ago" },
  { id: 2, name: "Born2beroot", desc: "System administration project about virtualization and server setup.", stack: ["Linux", "Bash", "VM"], category: "systems", updated: "1w" },
  { id: 3, name: "ft_printf", desc: "Recreated the C standard printf function from scratch.", stack: ["C", "Make"], category: "systems", updated: "2w" },
  { id: 4, name: "get_next_line", desc: "A function that returns a line read from a file descriptor.", stack: ["C", "Memory"], category: "systems", featured: true, updated: "3w" },
  { id: 5, name: "Bugraoksuz.me", desc: "Personal portfolio with a homemade design system.", stack: ["Next.js", "Supabase", "Vanilla CSS"], category: "web", live: true, updated: "today" },
  { id: 6, name: "minitalk", desc: "Communication system operating via Unix signals.", stack: ["C", "Unix"], category: "systems", updated: "1mo" },
  { id: 7, name: "push_swap", desc: "Algorithm to sort data with minimum operations on two stacks.", stack: ["C", "Algorithms"], category: "systems", updated: "1mo" },
  { id: 8, name: "libft", desc: "Recoded standard C library functions from the ground up.", stack: ["C"], category: "systems", updated: "1mo" },
];

const SAMPLE_SKILLS = [
  { id: 1, name: "C", cat: "systems" },
  { id: 2, name: "Linux", cat: "systems" },
  { id: 3, name: "Shell", cat: "systems" },
  { id: 4, name: "Make", cat: "systems" },
  { id: 5, name: "Figma", cat: "design" },
  { id: 6, name: "UI/UX", cat: "design" },
  { id: 7, name: "Flutter", cat: "mobile_web" },
  { id: 8, name: "Next.js", cat: "mobile_web" },
  { id: 9, name: "Architecture", cat: "mobile_web" },
  { id: 10, name: "Orchestration", cat: "ai" },
  { id: 11, name: "Management", cat: "ai" },
];

const CAT_LABEL = { systems: "Systems", design: "Design", mobile_web: "Mobile-Web", ai: "AI" };

const SAMPLE_TIMELINE = [
  { id: 1, role: "Confidential Stealth Project", org: "Systems & Backend Architecture", date: "2024 — PRESENT", type: "experience", desc: "Developing backend systems and scalable infrastructure." },
  { id: 2, role: "Visual & Interface Design", org: "Independent Product Design", date: "2024 — PRESENT", type: "experience", desc: "Designed UI/UX systems and prototypes in Figma for my own projects." },
  { id: 3, role: "Independent Developer", org: "Mobile-Web Research", date: "2024 — PRESENT", type: "experience", desc: "Focusing on mobile-web development and AI management." },
  { id: 4, role: "Industrial Design (BSc)", org: "1st Year Student", date: "2024 — PRESENT", type: "education", desc: "Studying design thinking and functional aesthetics." },
  { id: 5, role: "42 Istanbul", org: "1-Year Intensive Training", date: "2024 — 2025", type: "education", desc: "Focused on C, Unix systems, and low-level algorithms." },
  { id: 6, role: "High School", org: "Map, Land Registry and Cadastre", date: "2018 — 2022", type: "education", desc: "Focused on mapping, surveying, and land registry systems." },
];

const SAMPLE_MSGS = [
  { id: 1, from: "Cahit Alpdemir", email: "cahit@azurago.co", subj: "Re: dijital kimlik paketi", when: "12m ago", unread: true, body: "Selam Buğra,\n\nKardeşim sis-kuaför çıkar çıkmaz nasıl bir çıkış yaptı görmedin. Acentemde bir kaç müşteri daha var, onlara da benzer bir paket çıkarsak. Bu hafta görüşelim mi?\n\n— C." },
  { id: 2, from: "Selma Yılmaz", email: "hello@selma.studio", subj: "Quick chat about a Flutter project", when: "2h ago", unread: true, body: "Hi Buğra — saw your portfolio, the hyperspace hero is gorgeous. I'm prototyping a small consumer app and would love 30 min to talk through stack. Are you taking on selective freelance work right now?" },
  { id: 3, from: "Recruiter @ NorthStar", email: "talent@northstar.tech", subj: "Senior systems role — remote", when: "1d", unread: false, body: "Hello — we're hiring a systems engineer for our edge platform team. Remote, EUR salary, async culture. Would you like the JD?" },
  { id: 4, from: "Eren K.", email: "eren@42.fr", subj: "minitalk inspiration", when: "3d", unread: false, body: "Senin minitalk implementasyonuna baktım, çok temiz. Benim de küçük bir signal-based RPC denemesi var, geri bildirimin olur mu?" },
  { id: 5, from: "AzuraNest", email: "ops@azuranest.com", subj: "Yıllık plan yenileme", when: "1w", unread: false, body: "Yıllık hosting planınız 14 gün içerisinde yenilenecek. Bilginize." },
];

// ============================================
// Dashboard
// ============================================
function Dashboard({ onNav }) {
  const stats = [
    { label: "PROJECTS", value: 8, delta: "+2", up: true, hint: "2 added this month", icon: I2.folder, spark: [3, 4, 4, 5, 6, 6, 7, 8] },
    { label: "SKILLS", value: 11, delta: "+0", flat: true, hint: "4 categories", icon: I2.skill, spark: [9, 10, 10, 10, 11, 11, 11, 11] },
    { label: "TIMELINE", value: 6, delta: "+1", up: true, hint: "across exp + edu", icon: I2.tl, spark: [4, 4, 5, 5, 6, 6, 6, 6] },
    { label: "UNREAD MESSAGES", value: 2, delta: "new", up: true, hint: "since yesterday", icon: I2.msg, spark: [0, 1, 0, 0, 2, 1, 1, 2] },
  ];

  return (
    <>
      <Topbar crumbs={["Admin", "Dashboard"]} />
      <div className="page">
        <div className="page-head">
          <div>
            <div className="page-eyebrow">// 00 — OVERVIEW</div>
            <h1 className="page-title">Mission Control</h1>
            <div className="page-sub">Welcome back, Buğra. Here's what changed while you were gone.</div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn ghost">Export JSON</button>
            <button className="btn primary" onClick={() => onNav("project-new")}>{I2.plus}<span>New project</span></button>
          </div>
        </div>

        <div className="stats-row">
          {stats.map((s) => <StatCard key={s.label} {...s} />)}
        </div>

        <div className="col-grid">
          <div className="panel">
            <div className="panel-head">
              <h3>Recent activity</h3>
              <span className="meta">LAST 7 DAYS</span>
            </div>
            <div className="panel-body">
              <FeedRow color="purple" who="New message" what={<>From <em>Cahit Alpdemir</em> · <em>dijital kimlik paketi</em></>} when="12m" />
              <FeedRow color="green" who="Project published" what={<><em>sis-kuaför</em> set to LIVE</>} when="2d" />
              <FeedRow color="purple" who="Skill added" what={<><em>Orchestration</em> under <em>AI</em></>} when="3d" />
              <FeedRow color="green" who="Message replied" what={<>To <em>Recruiter @ NorthStar</em></>} when="5d" />
              <FeedRow color="gray" who="Timeline entry edited" what={<><em>42 Istanbul</em> · end date set to 2025</>} when="1w" />
            </div>
          </div>

          <div className="panel">
            <div className="panel-head">
              <h3>Quick actions</h3>
              <span className="meta">SHORTCUTS</span>
            </div>
            <div className="quick-tiles">
              <div className="qt" onClick={() => onNav("project-new")}>
                <span className="icon">{I2.plus}</span>
                <span className="label">Add project</span>
                <span className="desc">Push a new repo to portfolio</span>
              </div>
              <div className="qt" onClick={() => onNav("skill-new")}>
                <span className="icon">{I2.skill}</span>
                <span className="label">Add skill</span>
                <span className="desc">Update the profile.json block</span>
              </div>
              <div className="qt" onClick={() => onNav("timeline-new")}>
                <span className="icon">{I2.tl}</span>
                <span className="label">Add timeline item</span>
                <span className="desc">Experience or education</span>
              </div>
              <div className="qt" onClick={() => onNav("messages")}>
                <span className="icon">{I2.msg}</span>
                <span className="label">Open inbox</span>
                <span className="desc">2 unread waiting</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function FeedRow({ color, who, what, when }) {
  return (
    <div className="feed-row">
      <div className="timeline-marker"><div className={`dot ${color}`} /></div>
      <div className="body">
        <div className="top">
          <div className="who">{who}</div>
          <div className="when">{when}</div>
        </div>
        <div className="what">{what}</div>
      </div>
    </div>
  );
}

function StatCard({ label, value, delta, up, flat, hint, icon, spark }) {
  // build a tiny sparkline path
  const w = 80, h = 28;
  const max = Math.max(...spark, 1);
  const pts = spark.map((v, i) => {
    const x = (i / (spark.length - 1)) * w;
    const y = h - (v / max) * (h - 4) - 2;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");
  return (
    <div className="stat-card">
      <div className="icon-wrap">{icon}</div>
      <svg className="spark" viewBox={`0 0 ${w} ${h}`}>
        <defs>
          <linearGradient id={`sp-${label}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="rgba(167,139,250,0.45)" />
            <stop offset="100%" stopColor="rgba(167,139,250,0)" />
          </linearGradient>
        </defs>
        <polyline fill="none" stroke="currentColor" strokeWidth="1.2" points={pts} style={{ color: "var(--accent)" }} />
        <polygon fill={`url(#sp-${label})`} points={`0,${h} ${pts} ${w},${h}`} />
      </svg>
      <div className="label">{label}</div>
      <div className="value">
        {value}
        <span className={`delta ${up ? "up" : flat ? "flat" : ""}`}>{delta}</span>
      </div>
      <div className="meta">{hint}</div>
    </div>
  );
}

// ============================================
// Projects list
// ============================================
function ProjectsList({ onNav }) {
  const [filter, setFilter] = useS("all");
  const [view, setView] = useS("list");
  const filters = [
    { id: "all", label: "All · 8" },
    { id: "web", label: "Web · 2" },
    { id: "client", label: "Client · 1" },
    { id: "systems", label: "Systems / C · 6" },
    { id: "featured", label: "Featured · 2" },
  ];

  const items = SAMPLE_PROJECTS.filter((p) => {
    if (filter === "all") return true;
    if (filter === "featured") return p.featured;
    return p.category === filter;
  });

  return (
    <>
      <Topbar crumbs={["Admin", "Projects"]} />
      <div className="page">
        <div className="page-head">
          <div>
            <div className="page-eyebrow">// 01 — REPOSITORY</div>
            <h1 className="page-title">Projects</h1>
            <div className="page-sub">8 entries · 2 live · last update today</div>
          </div>
          <button className="btn primary" onClick={() => onNav("project-new")}>{I2.plus}<span>New project</span></button>
        </div>

        <div className="panel">
          <div className="filter-bar">
            <div className="chips">
              {filters.map((f) => (
                <button key={f.id} className={`chip${filter === f.id ? " active" : ""}`} onClick={() => setFilter(f.id)}>{f.label}</button>
              ))}
            </div>
            <div className="filter-spacer" />
            <div className="view-toggle">
              <button className={view === "list" ? "active" : ""} onClick={() => setView("list")}>LIST</button>
              <button className={view === "grid" ? "active" : ""} onClick={() => setView("grid")}>GRID</button>
            </div>
          </div>

          <div className="list">
            {items.map((p) => (
              <div key={p.id} className="list-row" onClick={() => onNav("project-edit")}>
                <div className="thumb">{p.name.slice(0, 2).toUpperCase()}</div>
                <div className="main">
                  <div className="name">
                    {p.name}
                    {p.live && <span className="pill live"><span className="dot" /> LIVE</span>}
                    {p.featured && <span className="pill featured">FEATURED</span>}
                    {!p.live && !p.featured && <span className="pill draft">{CAT_LABEL[p.category] || p.category}</span>}
                  </div>
                  <div className="desc">{p.desc}</div>
                </div>
                <div className="stack">
                  {p.stack.slice(0, 4).map((s) => <span key={s}>{s}</span>)}
                </div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-4)", letterSpacing: "0.06em" }}>
                  {p.updated}
                </div>
                <div className="row-actions">
                  {p.live && <button className="icon-btn" title="Open live">{I2.ext}</button>}
                  <button className="icon-btn" title="Edit">{I2.edit}</button>
                  <button className="icon-btn danger" title="Delete">{I2.trash}</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// ============================================
// Project form
// ============================================
function ProjectForm({ onNav, editing }) {
  const [state, setState] = useS({
    nameEn: editing ? "sis-kuaför" : "",
    nameTr: editing ? "sis-kuaför" : "",
    descEn: editing ? "Dijital kimlik paketi dahilinde müşterimize hazırladığımız işletme websitesi." : "",
    descTr: editing ? "Dijital kimlik paketi dahilinde müşterimize hazırladığımız işletme websitesi." : "",
    repo: editing ? "https://github.com/HighRadiation/sis-kuafor" : "",
    live: editing ? "https://sis-kuafor.com" : "",
    image: "",
    stack: editing ? ["Next.js", "Supabase", "Vercel"] : [],
    category: editing ? "client" : "uncategorized",
    featured: !!editing,
  });
  const [stackInput, setStackInput] = useS("");
  const set = (k, v) => setState((s) => ({ ...s, [k]: v }));

  function addStack(e) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const v = stackInput.trim().replace(/,$/, "");
      if (v && !state.stack.includes(v)) set("stack", [...state.stack, v]);
      setStackInput("");
    } else if (e.key === "Backspace" && !stackInput && state.stack.length) {
      set("stack", state.stack.slice(0, -1));
    }
  }
  function rmStack(s) { set("stack", state.stack.filter((x) => x !== s)); }

  return (
    <>
      <Topbar crumbs={["Admin", "Projects", editing ? "Edit" : "New"]} />
      <div className="page">
        <div className="back-link" onClick={() => onNav("projects")}>{I2.back}<span>BACK TO PROJECTS</span></div>
        <div className="page-head">
          <div>
            <div className="page-eyebrow">// {editing ? "EDIT" : "COMPOSE"}</div>
            <h1 className="page-title">{editing ? "Edit project" : "Add new project"}</h1>
            <div className="page-sub">Fields marked with <span style={{ color: "var(--accent)" }}>*</span> are required.</div>
          </div>
        </div>

        <div className="form-shell">
          <div className="form-grid">
            <FormField label="// PROJECT NAME (EN)" required>
              <input className="form-input" placeholder="e.g. get_next_line" value={state.nameEn} onChange={(e) => set("nameEn", e.target.value)} />
            </FormField>
            <FormField label="// PROJECT NAME (TR)">
              <input className="form-input" placeholder="Türkçe başlık (opsiyonel)" value={state.nameTr} onChange={(e) => set("nameTr", e.target.value)} />
            </FormField>

            <FormField label="// DESCRIPTION (EN)" required>
              <textarea className="form-textarea" placeholder="What does this project do?" value={state.descEn} onChange={(e) => set("descEn", e.target.value)} />
            </FormField>
            <FormField label="// DESCRIPTION (TR)">
              <textarea className="form-textarea" placeholder="Proje açıklaması (opsiyonel)" value={state.descTr} onChange={(e) => set("descTr", e.target.value)} />
            </FormField>

            <FormField label="// GITHUB LINK">
              <input className="form-input" placeholder="https://github.com/…" value={state.repo} onChange={(e) => set("repo", e.target.value)} />
            </FormField>
            <FormField label="// LIVE LINK">
              <input className="form-input" placeholder="https://…" value={state.live} onChange={(e) => set("live", e.target.value)} />
            </FormField>

            <div className="form-group full">
              <label className="form-label">// PREVIEW IMAGE</label>
              <div className="dropzone">
                <span className="icon">{I2.upload}</span>
                <div style={{ flex: 1 }}>
                  <div className="lab">Drop an image or click to upload</div>
                  <div className="hint">PNG, JPG, WebP · up to 2 MB · 16:9 recommended</div>
                </div>
                <button className="btn sm">Choose file</button>
              </div>
            </div>

            <div className="form-group full">
              <label className="form-label">// TECHNOLOGIES</label>
              <div className="tag-input">
                {state.stack.map((s) => (
                  <span key={s} className="tag-pill">{s}<span className="x" onClick={() => rmStack(s)}>×</span></span>
                ))}
                <input placeholder={state.stack.length ? "Add another…" : "Next.js, TypeScript, Supabase…"} value={stackInput} onChange={(e) => setStackInput(e.target.value)} onKeyDown={addStack} />
              </div>
              <div className="form-help">Press Enter or , to add. Backspace to remove the last one.</div>
            </div>

            <FormField label="// CATEGORY">
              <select className="form-select" value={state.category} onChange={(e) => set("category", e.target.value)}>
                <option value="uncategorized">— Uncategorized —</option>
                <option value="web">Web</option>
                <option value="client">Client work</option>
                <option value="systems">Systems / C</option>
              </select>
            </FormField>

            <FormField label="// FEATURED">
              <div className="form-row">
                <button type="button" className={`toggle ${state.featured ? "on" : ""}`} onClick={() => set("featured", !state.featured)} />
                <span style={{ fontSize: 13, color: "var(--text-2)" }}>{state.featured ? "Show as wide / featured card" : "Standard card"}</span>
              </div>
            </FormField>
          </div>

          <div className="form-foot">
            <span className="left">// AUTOSAVE OFF · COMMIT MANUALLY</span>
            <div className="right">
              <button className="btn ghost" onClick={() => onNav("projects")}>Cancel</button>
              <button className="btn primary">{I2.bolt}<span>{editing ? "Save changes" : "Save project"}</span></button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function FormField({ label, required, children }) {
  return (
    <div className="form-group">
      <label className="form-label">{label}{required && <span className="req">*</span>}</label>
      {children}
    </div>
  );
}

// ============================================
// Skills
// ============================================
function SkillsList({ onNav }) {
  const groups = {};
  SAMPLE_SKILLS.forEach((s) => { (groups[s.cat] = groups[s.cat] || []).push(s); });

  return (
    <>
      <Topbar crumbs={["Admin", "Skills"]} />
      <div className="page">
        <div className="page-head">
          <div>
            <div className="page-eyebrow">// 02 — STACK</div>
            <h1 className="page-title">Skills</h1>
            <div className="page-sub">11 entries across 4 categories · used in profile.json block</div>
          </div>
          <button className="btn primary" onClick={() => onNav("skill-new")}>{I2.plus}<span>New skill</span></button>
        </div>

        <div className="panel">
          {Object.entries(groups).map(([cat, list]) => (
            <div key={cat} className="skill-group">
              <div className="skill-group-head">
                <div className="skill-group-title">
                  {CAT_LABEL[cat] || cat}
                  <span className="count">{list.length}</span>
                </div>
                <button className="btn sm ghost">{I2.plus}<span>Add to {CAT_LABEL[cat]}</span></button>
              </div>
              <div className="skill-chips">
                {list.map((s) => (
                  <div key={s.id} className="skill-chip">
                    {s.name}
                    <button className="x" title="Remove">×</button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function SkillForm({ onNav }) {
  const [state, setState] = useS({ name: "", cat: "systems" });
  return (
    <>
      <Topbar crumbs={["Admin", "Skills", "New"]} />
      <div className="page">
        <div className="back-link" onClick={() => onNav("skills")}>{I2.back}<span>BACK TO SKILLS</span></div>
        <div className="page-head">
          <div>
            <div className="page-eyebrow">// COMPOSE</div>
            <h1 className="page-title">Add skill</h1>
            <div className="page-sub">Skill names appear in the profile.json block and skill filters.</div>
          </div>
        </div>

        <div className="form-shell" style={{ maxWidth: 540 }}>
          <div className="form-grid" style={{ gridTemplateColumns: "1fr" }}>
            <FormField label="// SKILL NAME" required>
              <input className="form-input" placeholder="e.g. React.js" value={state.name} onChange={(e) => setState((s) => ({ ...s, name: e.target.value }))} />
            </FormField>
            <FormField label="// CATEGORY">
              <select className="form-select" value={state.cat} onChange={(e) => setState((s) => ({ ...s, cat: e.target.value }))}>
                <option value="systems">Systems</option>
                <option value="design">Design</option>
                <option value="mobile_web">Mobile-Web</option>
                <option value="ai">AI</option>
              </select>
              <div className="form-help">Used as the property name in your profile.json block.</div>
            </FormField>
          </div>

          <div className="form-foot">
            <span className="left">// CATEGORY KEY = "{state.cat}"</span>
            <div className="right">
              <button className="btn ghost" onClick={() => onNav("skills")}>Cancel</button>
              <button className="btn primary">{I2.bolt}<span>Save skill</span></button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ============================================
// Timeline
// ============================================
function TimelineList({ onNav }) {
  return (
    <>
      <Topbar crumbs={["Admin", "Timeline"]} />
      <div className="page">
        <div className="page-head">
          <div>
            <div className="page-eyebrow">// 03 — JOURNEY</div>
            <h1 className="page-title">Timeline</h1>
            <div className="page-sub">3 experience · 3 education</div>
          </div>
          <button className="btn primary" onClick={() => onNav("timeline-new")}>{I2.plus}<span>New item</span></button>
        </div>

        <div className="panel">
          <div className="tl-list">
            {SAMPLE_TIMELINE.map((t) => (
              <div key={t.id} className="tl-row">
                <div className="tl-dot" />
                <div>
                  <div className="tl-period">{t.date}</div>
                  <h4>{t.role}<span className={`tl-pill ${t.type === "experience" ? "exp" : ""}`}>{t.type}</span></h4>
                  <div className="sub">{t.org}</div>
                  <div className="desc">{t.desc}</div>
                </div>
                <div className="tl-actions">
                  <button className="icon-btn" title="Edit">{I2.edit}</button>
                  <button className="icon-btn danger" title="Delete">{I2.trash}</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function TimelineForm({ onNav }) {
  const [s, setS] = useS({ role: "", org: "", date: "", type: "experience", desc: "" });
  const set = (k, v) => setS((p) => ({ ...p, [k]: v }));
  return (
    <>
      <Topbar crumbs={["Admin", "Timeline", "New"]} />
      <div className="page">
        <div className="back-link" onClick={() => onNav("timeline")}>{I2.back}<span>BACK TO TIMELINE</span></div>
        <div className="page-head">
          <div>
            <div className="page-eyebrow">// COMPOSE</div>
            <h1 className="page-title">Add timeline item</h1>
            <div className="page-sub">Experiences and education entries appear in the Timeline section.</div>
          </div>
        </div>

        <div className="form-shell">
          <div className="form-grid">
            <FormField label="// ROLE / TITLE" required>
              <input className="form-input" placeholder="e.g. Independent Developer" value={s.role} onChange={(e) => set("role", e.target.value)} />
            </FormField>
            <FormField label="// COMPANY / ORG">
              <input className="form-input" placeholder="e.g. 42 Istanbul" value={s.org} onChange={(e) => set("org", e.target.value)} />
            </FormField>
            <FormField label="// DATE RANGE">
              <input className="form-input" placeholder="e.g. 2024 — PRESENT" value={s.date} onChange={(e) => set("date", e.target.value)} />
            </FormField>
            <FormField label="// TYPE">
              <select className="form-select" value={s.type} onChange={(e) => set("type", e.target.value)}>
                <option value="experience">Experience</option>
                <option value="education">Education</option>
              </select>
            </FormField>
            <div className="form-group full">
              <label className="form-label">// DESCRIPTION</label>
              <textarea className="form-textarea" placeholder="Describe what you did…" value={s.desc} onChange={(e) => set("desc", e.target.value)} />
            </div>
          </div>

          <div className="form-foot">
            <span className="left">// {s.type === "experience" ? "EXPERIENCE" : "EDUCATION"} · NEW ENTRY</span>
            <div className="right">
              <button className="btn ghost" onClick={() => onNav("timeline")}>Cancel</button>
              <button className="btn primary">{I2.bolt}<span>Save timeline item</span></button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ============================================
// Messages (inbox)
// ============================================
function Messages() {
  const [active, setActive] = useS(SAMPLE_MSGS[0].id);
  const [list, setList] = useS(SAMPLE_MSGS);
  const cur = list.find((m) => m.id === active);

  function open(id) {
    setActive(id);
    setList((l) => l.map((m) => m.id === id ? { ...m, unread: false } : m));
  }

  return (
    <>
      <Topbar crumbs={["Admin", "Messages"]} />
      <div className="page" style={{ padding: 18, display: "flex", flexDirection: "column" }}>
        <div className="page-head" style={{ padding: "0 14px 14px", marginBottom: 0 }}>
          <div>
            <div className="page-eyebrow">// 04 — INBOX</div>
            <h1 className="page-title">Messages</h1>
            <div className="page-sub">{list.filter((m) => m.unread).length} unread · {list.length} total</div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn ghost">Mark all read</button>
            <button className="btn ghost">{I2.archive}<span>Archive</span></button>
          </div>
        </div>

        <div className="panel" style={{ flex: 1, display: "flex" }}>
          <div className="inbox-layout" style={{ width: "100%" }}>
            <div className="inbox-list">
              <div className="inbox-search">
                <div className="inbox-search-inner">
                  <span style={{ display: "flex" }}>{I2.search}</span>
                  <input placeholder="Search inbox" />
                </div>
              </div>
              <div className="inbox-items">
                {list.map((m) => (
                  <div
                    key={m.id}
                    className={`inbox-item${active === m.id ? " active" : ""}${m.unread ? " unread" : ""}`}
                    onClick={() => open(m.id)}
                  >
                    <div className="ii-top">
                      <div className="ii-from">{m.from}</div>
                      <div className="ii-when">{m.when}</div>
                    </div>
                    <div className="ii-sub">{m.subj}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="msg-detail">
              {cur ? (
                <>
                  <div className="from-row">
                    <div className="avatar">{cur.from.split(" ").map((w) => w[0]).slice(0, 2).join("")}</div>
                    <div className="from-info">
                      <div className="from-name">{cur.from}</div>
                      <div className="from-email">{cur.email}</div>
                    </div>
                    <div className="from-when">{cur.when.toUpperCase()}</div>
                  </div>

                  <div style={{ fontSize: 17, fontWeight: 600, marginBottom: 16, letterSpacing: "-0.01em" }}>{cur.subj}</div>
                  <div className="msg-body">{cur.body}</div>

                  <div className="msg-actions">
                    <button className="btn primary">{I2.reply}<span>Reply</span></button>
                    <button className="btn">{I2.archive}<span>Archive</span></button>
                    <button className="btn danger">{I2.trash}<span>Delete</span></button>
                  </div>
                </>
              ) : (
                <div className="empty-state">
                  <div className="glyph">{I2.msg}</div>
                  <h4>No message selected</h4>
                  <p>Pick a message from the list to read it here.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Object.assign(window, { Dashboard, ProjectsList, ProjectForm, SkillsList, SkillForm, TimelineList, TimelineForm, Messages });
