'use client';

import { useEffect, useRef, useSyncExternalStore } from 'react';

function subscribeReducedMotion(cb: () => void): () => void {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  mq.addEventListener('change', cb);
  return (): void => mq.removeEventListener('change', cb);
}

function getReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function getReducedMotionServer(): boolean {
  return false;
}

interface Particle {
  theta: number;
  thetaJitter: number;
  r: number;
  speed: number;
  width: number;
  alpha: number;
  offX: number;
  offY: number;
  vx: number;
  vy: number;
  scatterAngle: number;
  scatterLife: number;
}

export const HeroCanvas = (): React.JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animRef = useRef<number | null>(null);
  const reduced = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    getReducedMotionServer,
  );

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0;
    let H = 0;
    let CX = 0;
    let CY = 0;
    let MAX_R = 0;
    const mouse = { x: -9999, y: -9999 };

    const particles: Particle[] = [];

    function makeParticle(seed: boolean): Particle {
      const theta = Math.random() * Math.PI * 2;
      const r = seed ? Math.pow(Math.random(), 0.7) * MAX_R : Math.random() * 30 + 4;
      return {
        theta,
        thetaJitter: (Math.random() - 0.5) * 0.02,
        r,
        speed: 90 + Math.random() * 120,
        width: Math.random() < 0.15 ? 1.4 : 0.9,
        alpha: 0.25 + Math.random() * 0.55,
        offX: 0,
        offY: 0,
        vx: 0,
        vy: 0,
        scatterAngle: 0,
        scatterLife: 0,
      };
    }

    function buildParticles(): void {
      particles.length = 0;
      const isMobile = W < 720;
      const density = isMobile ? 4800 : 2400;
      const count = Math.min(900, Math.floor((W * H) / density));
      for (let i = 0; i < count; i++) {
        particles.push(makeParticle(true));
      }
    }

    function resize(): void {
      W = canvas!.clientWidth;
      H = canvas!.clientHeight;
      canvas!.width = W * dpr;
      canvas!.height = H * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      CX = W / 2;
      CY = H / 2;
      MAX_R = Math.hypot(W, H) / 2 + 80;
      buildParticles();
    }

    function onMove(e: MouseEvent | TouchEvent): void {
      const rect = canvas!.getBoundingClientRect();
      const point =
        'touches' in e && e.touches.length > 0
          ? { clientX: e.touches[0].clientX, clientY: e.touches[0].clientY }
          : (e as MouseEvent);
      mouse.x = point.clientX - rect.left;
      mouse.y = point.clientY - rect.top;
    }

    function onLeave(): void {
      mouse.x = -9999;
      mouse.y = -9999;
    }

    let t0 = performance.now();

    function frame(now: number): void {
      const dt = Math.min(0.05, (now - t0) / 1000);
      t0 = now;

      ctx!.clearRect(0, 0, W, H);

      const mx = mouse.x;
      const my = mouse.y;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        const depth = p.r / MAX_R;
        const speedMul = 0.5 + depth * 4.0;
        p.r += p.speed * speedMul * dt;

        const ang = p.theta + p.thetaJitter;
        const cosT = Math.cos(ang);
        const sinT = Math.sin(ang);
        const rx = CX + cosT * p.r;
        const ry = CY + sinT * p.r;

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
            const swirl = i % 2 === 0 ? 1 : -1;
            const sx = -ny * swirl;
            const sy = nx * swirl;
            const bias = p.theta * 1.7;
            const bx = Math.cos(bias);
            const by = Math.sin(bias);

            p.vx += (nx * 0.4 + sx * 0.9 + bx * 0.5) * f;
            p.vy += (ny * 0.4 + sy * 0.9 + by * 0.5) * f;
            p.scatterAngle = Math.atan2(p.vy, p.vx);
            p.scatterLife = 1;
          }
        }

        p.offX += p.vx * dt;
        p.offY += p.vy * dt;
        const damp = Math.pow(0.06, dt);
        p.vx *= damp;
        p.vy *= damp;
        p.offX *= Math.pow(0.18, dt);
        p.offY *= Math.pow(0.18, dt);
        p.scatterLife = Math.max(0, p.scatterLife - dt * 1.4);

        const fx = rx + p.offX;
        const fy = ry + p.offY;

        const radialAngle = ang;
        const angle =
          p.scatterLife > 0.05
            ? p.scatterAngle * p.scatterLife + radialAngle * (1 - p.scatterLife)
            : radialAngle;

        const len = 1.5 + depth * 22 + Math.hypot(p.vx, p.vy) * 0.02;

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

        ctx!.strokeStyle = `rgba(255, 255, 255, ${a})`;
        ctx!.lineWidth = p.width + depth * 0.6;
        ctx!.lineCap = 'round';
        ctx!.beginPath();
        ctx!.moveTo(x1, y1);
        ctx!.lineTo(x2, y2);
        ctx!.stroke();

        if (p.r > MAX_R) {
          const fresh = makeParticle(false);
          p.theta = fresh.theta;
          p.thetaJitter = fresh.thetaJitter;
          p.r = fresh.r;
          p.speed = fresh.speed;
          p.width = fresh.width;
          p.alpha = fresh.alpha;
          p.offX = 0;
          p.offY = 0;
          p.vx = 0;
          p.vy = 0;
          p.scatterLife = 0;
        }
      }



      animRef.current = requestAnimationFrame(frame);
    }

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('mouseleave', onLeave);
    animRef.current = requestAnimationFrame(frame);

    return (): void => {
      if (animRef.current !== null) cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('mouseleave', onLeave);
    };
  }, [reduced]);

  if (reduced) {
    return <div className="hero-fallback" aria-hidden="true" />;
  }

  return <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />;
};
