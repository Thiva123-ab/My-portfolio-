import { useEffect, useRef } from "react";
import useReducedMotion from "../hooks/useReducedMotion.js";

// Interactive constellation canvas + floating glows + film grain.
export default function Background() {
  const canvasRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reduced) return;

    const isMobile = window.innerWidth < 768;
    const ctx = canvas.getContext("2d");
    let w, h, dpr, particles = [];
    let raf;
    let isPaused = false;
    const mouse = { x: -9999, y: -9999 };
    const palette = ["124,92,255", "24,224,200", "255,93,143"];

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = canvas.width = window.innerWidth * dpr;
      h = canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      
      // Significantly optimized particle density
      const maxCount = isMobile ? 32 : 65;
      const count = Math.min(maxCount, Math.floor((window.innerWidth * window.innerHeight) / 22000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3 * dpr,
        vy: (Math.random() - 0.5) * 0.3 * dpr,
        r: (Math.random() * 1.4 + 0.6) * dpr,
        c: palette[(Math.random() * palette.length) | 0],
      }));
    };

    const onMove = (e) => {
      if (isMobile) return;
      mouse.x = e.clientX * dpr;
      mouse.y = e.clientY * dpr;
    };
    const onOut = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const onVisibility = () => {
      isPaused = document.hidden;
      if (!isPaused) {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(draw);
      }
    };

    const linkDist = isMobile ? 85 : 120;
    const draw = () => {
      if (isPaused) return;
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        if (!isMobile) {
          const mdx = p.x - mouse.x;
          const mdy = p.y - mouse.y;
          const md = Math.hypot(mdx, mdy);
          if (md < 100 * dpr) {
            p.x += (mdx / md) * 0.6;
            p.y += (mdy / md) * 0.6;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.c}, 0.75)`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.hypot(dx, dy);
          const max = linkDist * dpr;
          if (dist < max) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(${p.c}, ${0.1 * (1 - dist / max)})`;
            ctx.lineWidth = dpr;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onOut);
    document.addEventListener("visibilitychange", onVisibility);
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onOut);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduced]);

  return (
    <div className="bg-canvas-wrap" aria-hidden="true">
      <div className="bg-gradient-glow" />
      <canvas ref={canvasRef} className="bg-canvas" />
    </div>
  );
}
