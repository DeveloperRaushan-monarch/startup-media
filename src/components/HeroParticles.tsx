"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  radius: number;
  alpha: number;
  baseAlpha: number;
  color: string;
  life: number;
  maxLife: number;
}

function createParticle(w: number, h: number): Particle {
  const r = Math.random();
  const color = r < 0.6
    ? "255,107,0"        // warm orange
    : r < 0.85
      ? "255,197,98"     // gold
      : "255,139,60";    // mid orange
  const maxLife = 200 + Math.random() * 300;
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.7,
    vy: (Math.random() - 0.5) * 0.7,
    radius: Math.random() * 2 + 0.4,
    alpha: 0,
    baseAlpha: 0.3 + Math.random() * 0.5,
    color,
    life: Math.random() * maxLife,
    maxLife,
  };
}

interface Star { x: number; y: number; vx: number; vy: number; life: number; maxLife: number; }
function createStar(w: number, h: number): Star {
  const angle = Math.random() * Math.PI * 2;
  const speed = 2 + Math.random() * 4;
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    life: 0,
    maxLife: 40 + Math.random() * 40,
  };
}

export default function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef   = useRef<HTMLDivElement>(null);
  const mouse     = useRef({ x: -2000, y: -2000 });
  const particles = useRef<Particle[]>([]);
  const stars     = useRef<Star[]>([]);
  const frame     = useRef(0);
  const starTimer = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap   = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;

    const resize = () => {
      canvas.width  = wrap.offsetWidth;
      canvas.height = wrap.offsetHeight;
      const count = Math.floor((canvas.width * canvas.height) / 10000);
      particles.current = Array.from({ length: count }, () =>
        createParticle(canvas.width, canvas.height)
      );
    };

    const animate = () => {
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      frame.current++;

      // ── Spawn shooting star every 80 frames ──────────
      starTimer.current++;
      if (starTimer.current > 80 + Math.random() * 100) {
        stars.current.push(createStar(W, H));
        starTimer.current = 0;
      }

      // ── Draw shooting stars ───────────────────────────
      stars.current = stars.current.filter(s => s.life < s.maxLife);
      for (const s of stars.current) {
        const prog = s.life / s.maxLife;
        const alpha = prog < 0.3
          ? prog / 0.3
          : 1 - (prog - 0.3) / 0.7;
        const len = 20 + (1 - prog) * 40;
        const grd = ctx.createLinearGradient(s.x, s.y, s.x - s.vx * len, s.y - s.vy * len);
        grd.addColorStop(0, `rgba(255,197,98,${alpha})`);
        grd.addColorStop(1, `rgba(255,107,0,0)`);
        ctx.beginPath();
        ctx.strokeStyle = grd;
        ctx.lineWidth = 1.5;
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.vx * len, s.y - s.vy * len);
        ctx.stroke();
        s.x += s.vx;
        s.y += s.vy;
        s.life++;
      }

      // ── Update & draw particles ───────────────────────
      for (const p of particles.current) {
        // life fade
        p.life++;
        if (p.life >= p.maxLife) {
          Object.assign(p, createParticle(W, H));
          p.alpha = 0;
          continue;
        }
        const prog = p.life / p.maxLife;
        p.alpha = prog < 0.2
          ? (prog / 0.2) * p.baseAlpha
          : prog > 0.8
            ? ((1 - prog) / 0.2) * p.baseAlpha
            : p.baseAlpha;

        // mouse repulsion
        const dx = p.x - mouse.current.x;
        const dy = p.y - mouse.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120 && dist > 0) {
          const force = (1 - dist / 120) * 0.6;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }
        // dampen
        p.vx *= 0.97;
        p.vy *= 0.97;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > W) { p.vx *= -1; p.x = Math.max(0, Math.min(W, p.x)); }
        if (p.y < 0 || p.y > H) { p.vy *= -1; p.y = Math.max(0, Math.min(H, p.y)); }

        // draw particle with glow aura
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 3);
        glow.addColorStop(0, `rgba(${p.color},${p.alpha})`);
        glow.addColorStop(1, `rgba(${p.color},0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
        ctx.fill();
      }

      // ── Draw connection lines ─────────────────────────
      const all = particles.current;
      for (let i = 0; i < all.length; i++) {
        for (let j = i + 1; j < all.length; j++) {
          const dx = all[i].x - all[j].x;
          const dy = all[i].y - all[j].y;
          const d  = Math.sqrt(dx*dx + dy*dy);
          if (d < 90) {
            const a = (0.18 - d / 90) * Math.min(all[i].alpha, all[j].alpha) * 2;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255,107,0,${a})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(all[i].x, all[i].y);
            ctx.lineTo(all[j].x, all[j].y);
            ctx.stroke();
          }
        }

        // mouse lines — brighter gold
        const dxm = all[i].x - mouse.current.x;
        const dym = all[i].y - mouse.current.y;
        const dm  = Math.sqrt(dxm*dxm + dym*dym);
        if (dm < 160) {
          const a = (0.5 - dm / 160) * all[i].alpha;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255,197,98,${a})`;
          ctx.lineWidth = 1.5;
          ctx.moveTo(all[i].x, all[i].y);
          ctx.lineTo(mouse.current.x, mouse.current.y);
          ctx.stroke();
        }
      }

      raf = requestAnimationFrame(animate);
    };

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onLeave = () => { mouse.current = { x: -2000, y: -2000 }; };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    resize();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 0, pointerEvents: "none" }}
    >
      <canvas
        ref={canvasRef}
        style={{ display: "block", width: "100%", height: "100%", pointerEvents: "none" }}
      />
    </div>
  );
}
