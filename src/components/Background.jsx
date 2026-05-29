import { useEffect, useRef } from "react";
import useReducedMotion from "../hooks/useReducedMotion.js";

// Interactive constellation canvas + floating glows + film grain.
export default function Background() {
  const canvasRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reduced) return;

    const ctx = canvas.getContext("2d");
    let w, h, dpr, particles = [];
    let raf;
    const mouse = { x: -9999, y: -9999 };
    const palette = ["124,92,255", "24,224,200", "255,93,143"];

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.width = window.innerWidth * dpr;
      h = canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      const count = Math.min(120, Math.floor((window.innerWidth * window.innerHeight) / 14000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4 * dpr,
        vy: (Math.random() - 0.5) * 0.4 * dpr,
        r: (Math.random() * 1.6 + 0.6) * dpr,
        c: palette[(Math.random() * palette.length) | 0],
      }));
    };

    const onMove = (e) => {
      mouse.x = e.clientX * dpr;
      mouse.y = e.clientY * dpr;
    };
    const onOut = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const linkDist = 130;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        const mdx = p.x - mouse.x;
        const mdy = p.y - mouse.y;
        const md = Math.hypot(mdx, mdy);
        if (md < 120 * dpr) {
          p.x += (mdx / md) * 0.8;
          p.y += (mdy / md) * 0.8;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.c}, 0.8)`;
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
            ctx.strokeStyle = `rgba(${p.c}, ${0.12 * (1 - dist / max)})`;
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
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onOut);
    };
  }, [reduced]);

  return (
    <>
      <canvas className="bg-canvas" ref={canvasRef} aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <div className="glow glow-1" aria-hidden="true" />
      <div className="glow glow-2" aria-hidden="true" />
    </>
  );
}
