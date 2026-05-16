// ============================================
// Hero — radial "vanishing point" particle field
// Particles spawn near center, accelerate outward along
// perspective rays (like a slow hyperspace), and respawn
// when they leave the screen. Mouse disturbs the flow.
// ============================================

const { useRef, useEffect, useState } = React;

function HeroCanvas() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0, H = 0, CX = 0, CY = 0, MAX_R = 0;
    const mouse = { x: -9999, y: -9999 };

    const particles = [];

    function resize() {
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      CX = W / 2;
      CY = H / 2;
      MAX_R = Math.hypot(W, H) / 2 + 80;
      buildParticles();
    }

    function makeParticle(seed = false) {
      // each particle has its own ray (theta) and a "depth" radius
      const theta = Math.random() * Math.PI * 2;
      // when seeding initial scene, distribute depths across the field
      // when respawning, start near the vanishing point
      const r = seed
        ? Math.pow(Math.random(), 0.7) * MAX_R
        : Math.random() * 30 + 4;
      return {
        theta,
        // small angular jitter so the rays aren't mathematically perfect
        thetaJitter: (Math.random() - 0.5) * 0.02,
        r,
        // speed scales with depth -> perspective acceleration
        speed: 140 + Math.random() * 180,
        baseSpeed: 140 + Math.random() * 180,
        // dash properties
        width: Math.random() < 0.15 ? 1.4 : 0.9,
        alpha: 0.25 + Math.random() * 0.55,
        // perturbation from mouse — separate offset from the radial path
        offX: 0,
        offY: 0,
        vx: 0,
        vy: 0,
        // angle override when scattered
        scatterAngle: 0,
        scatterLife: 0,
      };
    }

    function buildParticles() {
      particles.length = 0;
      const count = Math.min(900, Math.floor((W * H) / 2400));
      for (let i = 0; i < count; i++) {
        particles.push(makeParticle(true));
      }
    }

    function onMove(e) {
      const rect = canvas.getBoundingClientRect();
      mouse.x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
      mouse.y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
    }

    function onLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
    }

    let t0 = performance.now();

    function frame(now) {
      const dt = Math.min(0.05, (now - t0) / 1000);
      t0 = now;

      ctx.clearRect(0, 0, W, H);

      // depth haze: dark center, opens up outward
      const bgGrad = ctx.createRadialGradient(CX, CY, 0, CX, CY, Math.max(W, H) * 0.7);
      bgGrad.addColorStop(0, "rgba(30, 20, 60, 0.28)");
      bgGrad.addColorStop(0.5, "rgba(15, 10, 35, 0.12)");
      bgGrad.addColorStop(1, "rgba(10, 10, 12, 0)");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, W, H);

      const mx = mouse.x;
      const my = mouse.y;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // perspective acceleration: the further out, the faster.
        // r grows along its ray. easeQuad on r/MAX_R gives the "warping" feel.
        const depth = p.r / MAX_R;
        const speedMul = 0.8 + depth * 6.5;
        p.r += p.speed * speedMul * dt;

        // current position on the ray
        const ang = p.theta + p.thetaJitter;
        const cosT = Math.cos(ang);
        const sinT = Math.sin(ang);
        const rx = CX + cosT * p.r;
        const ry = CY + sinT * p.r;

        // mouse scatter — knocks the particle off its ray temporarily
        if (mx > -1000) {
          const dx = rx + p.offX - mx;
          const dy = ry + p.offY - my;
          const dist2 = dx * dx + dy * dy;
          const radius = 200;
          if (dist2 < radius * radius) {
            const dist = Math.sqrt(dist2) || 0.001;
            const force = 1 - dist / radius;
            const f = force * force * 480 * dt;
            const nx = dx / dist;
            const ny = dy / dist;
            // swirl perpendicular component for chaos
            const swirl = (i % 2 === 0 ? 1 : -1);
            const sx = -ny * swirl;
            const sy = nx * swirl;
            // personal random bias
            const bias = p.theta * 1.7;
            const bx = Math.cos(bias);
            const by = Math.sin(bias);

            p.vx += (nx * 0.4 + sx * 0.9 + bx * 0.5) * f;
            p.vy += (ny * 0.4 + sy * 0.9 + by * 0.5) * f;
            p.scatterAngle = Math.atan2(p.vy, p.vx);
            p.scatterLife = 1;
          }
        }

        // integrate the perturbation offset; spring it back toward 0
        p.offX += p.vx * dt;
        p.offY += p.vy * dt;
        // damping (drag in space)
        const damp = Math.pow(0.06, dt); // strong damping per second
        p.vx *= damp;
        p.vy *= damp;
        // spring back to the ray
        p.offX *= Math.pow(0.18, dt);
        p.offY *= Math.pow(0.18, dt);
        p.scatterLife = Math.max(0, p.scatterLife - dt * 1.4);

        // final draw position
        const fx = rx + p.offX;
        const fy = ry + p.offY;

        // dash orientation:
        // - normally aligned with the radial direction (motion streak)
        // - when scattered, follows the kick direction
        const radialAngle = ang; // points away from center
        const angle = p.scatterLife > 0.05
          ? p.scatterAngle * p.scatterLife + radialAngle * (1 - p.scatterLife)
          : radialAngle;

        // dash length grows with depth — closer to vanishing point is a dot,
        // further out is a long streak (perspective motion blur)
        const len = 1.5 + depth * 22 + Math.hypot(p.vx, p.vy) * 0.02;

        // color: inner = warm violet, outer = cool pale lavender
        const t = Math.min(1, depth * 1.1);
        const r = Math.round(150 + t * 90);
        const g = Math.round(120 + t * 100);
        const b = Math.round(250);
        // fade in from center, fade out near edge
        const fadeIn = Math.min(1, p.r / 40);
        const fadeOut = 1 - Math.max(0, (p.r - MAX_R * 0.85) / (MAX_R * 0.25));
        const a = p.alpha * fadeIn * Math.max(0, fadeOut);

        const half = len / 2;
        const cosA = Math.cos(angle);
        const sinA = Math.sin(angle);
        const x1 = fx - cosA * half;
        const y1 = fy - sinA * half;
        const x2 = fx + cosA * half;
        const y2 = fy + sinA * half;

        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
        ctx.lineWidth = p.width + depth * 0.6;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        // respawn when past the edge — start near the vanishing point with fresh ray
        if (p.r > MAX_R) {
          const fresh = makeParticle(false);
          // overwrite in place so the array stays stable
          p.theta = fresh.theta;
          p.thetaJitter = fresh.thetaJitter;
          p.r = fresh.r;
          p.speed = fresh.speed;
          p.width = fresh.width;
          p.alpha = fresh.alpha;
          p.offX = 0; p.offY = 0;
          p.vx = 0; p.vy = 0;
          p.scatterLife = 0;
        }
      }

      // central glow at the vanishing point
      const glow = ctx.createRadialGradient(CX, CY, 0, CX, CY, 280);
      glow.addColorStop(0, "rgba(167, 139, 250, 0.22)");
      glow.addColorStop(0.4, "rgba(139, 92, 246, 0.08)");
      glow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, W, H);

      animRef.current = requestAnimationFrame(frame);
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);
    animRef.current = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-canvas" />;
}

function Hero() {
  const [typed, setTyped] = useState("");
  const taglines = [
    "I craft mobile-web apps from first principles.",
    "I orchestrate AI systems & embedded experiences.",
    "I build software that doesn't lie about how it works.",
  ];
  const [taglineIdx, setTaglineIdx] = useState(0);

  useEffect(() => {
    const full = taglines[taglineIdx];
    let i = 0;
    setTyped("");
    const interval = setInterval(() => {
      i++;
      setTyped(full.slice(0, i));
      if (i >= full.length) {
        clearInterval(interval);
        setTimeout(() => {
          setTaglineIdx((x) => (x + 1) % taglines.length);
        }, 4200);
      }
    }, 32);
    return () => clearInterval(interval);
  }, [taglineIdx]);

  return (
    <section className="hero" id="home" data-screen-label="01 Hero">
      <HeroCanvas />
      <div className="hero-vignette" />
      <div className="hero-content">
        <h1 className="hero-title">Buğra Öksüz</h1>
        <div className="hero-tagline">
          <span>{typed}</span>
          <span className="cursor" />
        </div>
      </div>
      <div className="hero-scroll">
        <span>SCROLL</span>
        <span className="line" />
      </div>
    </section>
  );
}

window.Hero = Hero;
