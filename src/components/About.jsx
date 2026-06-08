import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal.jsx";
import profile from "../assets/profile.png";

function Counter({ target, suffix = "" }) {
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
      {suffix}
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
          <div className="tilt-photo">
            <img src={profile} alt="Portrait of Thivanka Tharuka" loading="lazy" />
          </div>
          <h3>Thivanka Tharuka</h3>
          <p>Full-Stack Developer</p>
          <ul className="tilt-list">
            <li>Based in Sri Lanka</li>
            <li>CS Student · NSBM Green University</li>
            <li>Open to internships &amp; freelance</li>
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
            I’m a full-stack software developer and Computer Science student at
            NSBM Green University, Sri Lanka — focused on backend architecture and
            scalable, cloud-ready applications.
          </p>
          <p>
            My core expertise is in backend development with <strong>Java</strong>,
            <strong> Spring Boot</strong>, and <strong>MySQL</strong>, paired with
            deploying scalable, containerized applications across cloud platforms
            like AWS, GCP, and Azure.
          </p>
          <p>
            Beyond the code, I’m deeply interested in Human-Computer Interaction
            (HCI) and UI/UX design. I use tools like Figma to make sure my
            applications aren’t just functionally sound, but genuinely intuitive —
            whether I’m mapping geospatial data for disaster management or building
            streamlined campus utility platforms, I’m passionate about engineering
            solutions that make a real-world impact.
          </p>
          <div className="about-stats">
            <div className="stat"><Counter target={3} /><small>Cloud platforms</small></div>
            <div className="stat"><Counter target={4} /><small>Featured projects</small></div>
            <div className="stat"><Counter target={100} suffix="%" /><small>Dedication</small></div>
          </div>
        </Reveal>
        <Reveal delay={0.25}>
          <TiltCard />
        </Reveal>
      </div>
    </section>
  );
}
