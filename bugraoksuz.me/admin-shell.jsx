// ============================================
// Admin shell — Login, Sidebar, Topbar, common
// ============================================

const { useState, useEffect, useRef } = React;

// ---------- shared icons ----------
const I = {
  dash: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/></svg>,
  folder: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"/></svg>,
  skill: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15 8.5 22 9.3 17 14.1 18.2 21 12 17.8 5.8 21 7 14.1 2 9.3 9 8.5"/></svg>,
  tl: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="6" r="2"/><circle cx="6" cy="12" r="2"/><circle cx="6" cy="18" r="2"/><path d="M11 6h10"/><path d="M11 12h10"/><path d="M11 18h10"/></svg>,
  msg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
  user: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  bell: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 01-3.4 0"/></svg>,
  search: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.3-4.3"/></svg>,
  plus: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14"/><path d="M5 12h14"/></svg>,
  edit: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>,
  trash: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>,
  ext: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>,
  back: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>,
  reply: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 17 4 12 9 7"/><path d="M20 18v-2a4 4 0 00-4-4H4"/></svg>,
  archive: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="21 8 21 21 3 21 3 8"/><rect x="1" y="3" width="22" height="5"/><line x1="10" y1="12" x2="14" y2="12"/></svg>,
  logout: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
  bolt: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  upload: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>,
};

// ---------- Login ----------
function AdminLogin({ onSubmit }) {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [busy, setBusy] = useState(false);
  const canvasRef = useRef(null);

  // mini particle field for login background — slower than the marketing hero
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W = 0, H = 0, CX = 0, CY = 0, MAX_R = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const ps = [];
    function resize() {
      W = canvas.clientWidth; H = canvas.clientHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      CX = W / 2; CY = H / 2; MAX_R = Math.hypot(W, H) / 2 + 80;
      ps.length = 0;
      const count = Math.min(400, Math.floor(W * H / 5000));
      for (let i = 0; i < count; i++) {
        ps.push({
          theta: Math.random() * Math.PI * 2,
          r: Math.pow(Math.random(), 0.7) * MAX_R,
          speed: 50 + Math.random() * 80,
          width: 0.7 + Math.random() * 0.6,
          alpha: 0.15 + Math.random() * 0.35,
        });
      }
    }
    let raf = 0, t0 = performance.now();
    function tick(now) {
      const dt = Math.min(0.05, (now - t0) / 1000); t0 = now;
      ctx.clearRect(0, 0, W, H);
      const bg = ctx.createRadialGradient(CX, CY, 0, CX, CY, Math.max(W, H) * 0.7);
      bg.addColorStop(0, "rgba(30, 20, 60, 0.18)");
      bg.addColorStop(1, "rgba(8, 6, 10, 0)");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);
      for (const p of ps) {
        const depth = p.r / MAX_R;
        p.r += p.speed * (0.5 + depth * 4) * dt;
        const cos = Math.cos(p.theta), sin = Math.sin(p.theta);
        const x = CX + cos * p.r, y = CY + sin * p.r;
        const t = Math.min(1, depth * 1.1);
        const r = Math.round(220 - t * 90), g = Math.round(200 - t * 90), b = 255;
        const fadeIn = Math.min(1, p.r / 40);
        const fadeOut = 1 - Math.max(0, (p.r - MAX_R * 0.85) / (MAX_R * 0.25));
        const a = p.alpha * fadeIn * Math.max(0, fadeOut);
        const len = 1.5 + depth * 22;
        const half = len / 2;
        const x1 = x - cos * half, y1 = y - sin * half;
        const x2 = x + cos * half, y2 = y + sin * half;
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
        ctx.lineWidth = p.width + depth * 0.5;
        ctx.lineCap = "round";
        ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
        if (p.r > MAX_R) {
          p.theta = Math.random() * Math.PI * 2;
          p.r = Math.random() * 30 + 4;
        }
      }
      raf = requestAnimationFrame(tick);
    }
    resize();
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  function go(e) {
    e.preventDefault();
    if (!email || !pw) return;
    setBusy(true);
    setTimeout(() => { setBusy(false); onSubmit(email); }, 900);
  }

  return (
    <div className="login-screen">
      <canvas ref={canvasRef} className="login-bg" />
      <form className="login-card" onSubmit={go}>
        <div className="login-brand">
          <div className="glyph">BÖ</div>
          <div>
            <div className="brand-text">bugraoksuz.me</div>
            <div style={{ fontSize: 10, fontFamily: "var(--font-mono)", color: "var(--text-4)", letterSpacing: "0.14em", marginTop: 2 }}>// CONTROL CENTER</div>
          </div>
        </div>

        <div className="login-eyebrow">// AUTHENTICATE</div>
        <h1>Welcome back.</h1>
        <div className="sub">Enter your credentials to access the panel.</div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <Field label="// EMAIL" placeholder="admin@bugraoksuz.me" value={email} onChange={setEmail} type="email" />
          <Field label="// PASSWORD" placeholder="••••••••" value={pw} onChange={setPw} type="password" />
        </div>

        <button className={`transmit-btn${busy ? " sending" : ""}`} type="submit" disabled={busy} style={{ marginTop: 28 }}>
          <span className="transmit-streaks">
            {Array.from({ length: 10 }).map((_, i) => <span key={i} style={{ "--i": i }} />)}
          </span>
          <span className="transmit-label">{busy ? "Authenticating…" : "Login"}</span>
          {!busy && <svg className="transmit-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></svg>}
        </button>

        <div className="login-foot">
          <span><span className="live-dot" />SYSTEM ONLINE</span>
          <span>v 1.2.0 · {new Date().getFullYear()}</span>
        </div>
      </form>
    </div>
  );
}

// ---------- Sidebar ----------
function Sidebar({ active, onNav, unread }) {
  const items = [
    { id: "dashboard", label: "Dashboard", icon: I.dash },
    { id: "projects", label: "Projects", icon: I.folder },
    { id: "skills", label: "Skills", icon: I.skill },
    { id: "timeline", label: "Timeline", icon: I.tl },
    { id: "messages", label: "Messages", icon: I.msg, badge: unread > 0 ? unread : null },
  ];
  return (
    <aside className="sidebar">
      <div className="sb-brand">
        <div className="glyph">BÖ</div>
        <div>
          <div className="name">bugraoksuz.me</div>
          <div className="role">Control Center</div>
        </div>
      </div>

      <div className="sb-section">// MANAGE</div>
      <div className="sb-nav">
        {items.map((it) => (
          <div
            key={it.id}
            className={`sb-link${active === it.id ? " active" : ""}`}
            onClick={() => onNav(it.id)}
          >
            {it.icon}
            <span>{it.label}</span>
            {it.badge && <span className="sb-badge">{it.badge}</span>}
          </div>
        ))}
      </div>

      <div className="sb-foot">
        <div className="sb-user">
          <div className="avatar">BÖ</div>
          <div className="info">
            <div className="who">Buğra Öksüz</div>
            <div className="status"><span className="live-dot" /> Online</div>
          </div>
        </div>
        <button className="sb-logout">
          {I.logout}
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

// ---------- Topbar ----------
function Topbar({ crumbs, search = true, actions }) {
  return (
    <div className="topbar">
      <div className="crumbs">
        {crumbs.map((c, i) => (
          <React.Fragment key={i}>
            {i > 0 && <span className="sep">/</span>}
            <span className={i === crumbs.length - 1 ? "cur" : ""}>{c}</span>
          </React.Fragment>
        ))}
      </div>
      <div className="tb-right">
        {search && (
          <div className="tb-search">
            <span style={{ display: "flex" }}>{I.search}</span>
            <input placeholder="Search projects, skills, messages…" />
            <kbd>⌘K</kbd>
          </div>
        )}
        <div className="tb-pill prod"><span className="dot" /> PROD</div>
        <button className="tb-icon-btn">{I.bell}<span className="badge">2</span></button>
        {actions}
      </div>
    </div>
  );
}

// reusable underline field (used in login + modal-like uses)
function Field({ label, value, onChange, placeholder, type = "text", textarea }) {
  const [focused, setFocused] = useState(false);
  return (
    <label className={`field${focused ? " focused" : ""}${value ? " filled" : ""}`}>
      <span className="field-label">{label}</span>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          rows={3}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
        />
      )}
      <span className="field-underline" />
    </label>
  );
}

Object.assign(window, { AdminLogin, Sidebar, Topbar, AdminI: I, AdminField: Field });
