import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal.jsx";

function Counter({ target }) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        const dur = 1400;
        const start = performance.now();
        const step = (now) => {
          const p = Math.min(1, (now - start) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          setVal(Math.round(eased * target));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        io.unobserve(el);
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target]);

  return (
    <span className="num" ref={ref}>
      {val}
      {target >= 40 ? "+" : ""}
    </span>
  );
}

function TiltCard() {
  const wrapRef = useRef(null);
  const tiltRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const tilt = tiltRef.current;
    if (!wrap || !tilt) return;
    if (window.matchMedia("(max-width: 900px)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onMove = (e) => {
      const r = wrap.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      tilt.style.transform = `rotateY(${px * 14}deg) rotateX(${-py * 14}deg)`;
    };
    const onLeave = () => {
      tilt.style.transform = "rotateY(0) rotateX(0)";
    };
    wrap.addEventListener("mousemove", onMove);
    wrap.addEventListener("mouseleave", onLeave);
    return () => {
      wrap.removeEventListener("mousemove", onMove);
      wrap.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div className="about-card" ref={wrapRef}>
      <div className="tilt" ref={tiltRef}>
        <div className="tilt-inner">
          <span className="tilt-emoji">👨‍💻</span>
          <h3>Thiva</h3>
          <p>Creative Developer</p>
          <ul className="tilt-list">
            <li>Based remotely · Worldwide</li>
            <li>Frontend &amp; creative engineering</li>
            <li>Open to freelance &amp; full-time</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function About() {
  return (
    <section className="section about" id="about">
      <div className="section-head">
        <span className="section-index">01</span>
        <Reveal as="h2" className="section-title">About</Reveal>
      </div>
      <div className="about-grid">
        <Reveal className="about-text" delay={0.1}>
          <p className="lead">
            I’m a developer who lives at the intersection of engineering and art.
            For me, a great interface should feel alive — responsive, intentional,
            and a little bit magical.
          </p>
          <p>
            Over the years I’ve shipped products for startups and brands, turning
            complex ideas into interfaces people love to use. I care deeply about
            performance, accessibility, and the tiny details that make experiences
            memorable.
          </p>
          <div className="about-stats">
            <div className="stat"><Counter target={5} /><small>Years coding</small></div>
            <div className="stat"><Counter target={40} /><small>Projects shipped</small></div>
            <div className="stat"><Counter target={20} /><small>Happy clients</small></div>
          </div>
        </Reveal>
        <Reveal delay={0.25}>
          <TiltCard />
        </Reveal>
      </div>
    </section>
  );
}
