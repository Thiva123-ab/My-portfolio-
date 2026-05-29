/* =========================================================
   THIVA — Portfolio interactions
   ========================================================= */
(() => {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isTouch = window.matchMedia("(max-width: 900px)").matches;

  /* ---------- Loader ---------- */
  const loader = document.getElementById("loader");
  const barFill = document.getElementById("loader-bar-fill");
  let progress = 0;
  const tick = setInterval(() => {
    progress = Math.min(100, progress + Math.random() * 18);
    if (barFill) barFill.style.width = progress + "%";
    if (progress >= 100) {
      clearInterval(tick);
      setTimeout(() => loader && loader.classList.add("done"), 350);
    }
  }, 140);
  window.addEventListener("load", () => {
    progress = 100;
    if (barFill) barFill.style.width = "100%";
  });

  /* ---------- Year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Nav scroll state + mobile toggle ---------- */
  const nav = document.getElementById("nav");
  const navToggle = document.getElementById("nav-toggle");
  const navLinks = document.getElementById("nav-links");

  const onScroll = () => {
    if (nav) nav.classList.toggle("scrolled", window.scrollY > 40);
    const sp = document.getElementById("scroll-progress");
    if (sp) {
      const h = document.documentElement;
      const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight);
      sp.style.width = (scrolled * 100).toFixed(2) + "%";
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const open = navLinks.classList.toggle("open");
      navToggle.classList.toggle("open", open);
    });
    navLinks.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        navLinks.classList.remove("open");
        navToggle.classList.remove("open");
      })
    );
  }

  /* ---------- Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  revealEls.forEach((el) => {
    const d = el.getAttribute("data-delay");
    if (d) el.style.setProperty("--reveal-delay", d + "s");
  });
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
  );
  revealEls.forEach((el) => io.observe(el));

  /* ---------- Animated counters ---------- */
  const counters = document.querySelectorAll(".num[data-count]");
  const counterIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = +el.getAttribute("data-count");
        const dur = 1400;
        const start = performance.now();
        const step = (now) => {
          const p = Math.min(1, (now - start) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(eased * target) + (target >= 40 ? "+" : "");
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        counterIO.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );
  counters.forEach((c) => counterIO.observe(c));

  /* ---------- Skill card spotlight ---------- */
  document.querySelectorAll(".skill-card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    });
  });

  /* ---------- Magnetic buttons ---------- */
  if (!isTouch && !reduceMotion) {
    document.querySelectorAll(".magnetic").forEach((el) => {
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        el.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
      });
      el.addEventListener("mouseleave", () => {
        el.style.transform = "translate(0,0)";
      });
    });
  }

  /* ---------- 3D tilt card ---------- */
  if (!isTouch && !reduceMotion) {
    document.querySelectorAll("[data-tilt]").forEach((el) => {
      const parent = el.parentElement;
      parent.addEventListener("mousemove", (e) => {
        const r = parent.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = `rotateY(${px * 14}deg) rotateX(${-py * 14}deg)`;
      });
      parent.addEventListener("mouseleave", () => {
        el.style.transform = "rotateY(0) rotateX(0)";
      });
    });
  }

  /* ---------- Custom cursor ---------- */
  if (!isTouch) {
    const dot = document.getElementById("cursor-dot");
    const ring = document.getElementById("cursor-ring");
    let mx = innerWidth / 2, my = innerHeight / 2;
    let rx = mx, ry = my;

    window.addEventListener("mousemove", (e) => {
      mx = e.clientX; my = e.clientY;
      if (dot) { dot.style.left = mx + "px"; dot.style.top = my + "px"; }
    });
    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (ring) { ring.style.left = rx + "px"; ring.style.top = ry + "px"; }
      requestAnimationFrame(loop);
    };
    loop();

    document.querySelectorAll('[data-cursor="hover"], a, button').forEach((el) => {
      el.addEventListener("mouseenter", () => ring && ring.classList.add("is-hover"));
      el.addEventListener("mouseleave", () => ring && ring.classList.remove("is-hover"));
    });
  }

  /* ---------- Particle / constellation background ---------- */
  const canvas = document.getElementById("bg-canvas");
  if (canvas && !reduceMotion) {
    const ctx = canvas.getContext("2d");
    let w, h, dpr, particles = [];
    const mouse = { x: -9999, y: -9999 };

    const palette = ["124,92,255", "24,224,200", "255,93,143"];

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.width = innerWidth * dpr;
      h = canvas.height = innerHeight * dpr;
      canvas.style.width = innerWidth + "px";
      canvas.style.height = innerHeight + "px";
      const count = Math.min(120, Math.floor((innerWidth * innerHeight) / 14000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4 * dpr,
        vy: (Math.random() - 0.5) * 0.4 * dpr,
        r: (Math.random() * 1.6 + 0.6) * dpr,
        c: palette[(Math.random() * palette.length) | 0],
      }));
    };

    window.addEventListener("mousemove", (e) => {
      mouse.x = e.clientX * dpr;
      mouse.y = e.clientY * dpr;
    });
    window.addEventListener("mouseout", () => { mouse.x = -9999; mouse.y = -9999; });

    const linkDist = 130;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        // gentle mouse repel
        const mdx = p.x - mouse.x, mdy = p.y - mouse.y;
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
          const dx = p.x - q.x, dy = p.y - q.y;
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
      requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    draw();
  }
})();
