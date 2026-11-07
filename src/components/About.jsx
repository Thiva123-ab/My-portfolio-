import { useRef, useEffect } from "react";
import Reveal from "./Reveal.jsx";
import profile from "../assets/profile.png";
import { SITE } from "../data/site.js";

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
            <img src={profile} alt={`Portrait of ${SITE.name}`} loading="lazy" />
          </div>
          <h3>{SITE.name}</h3>
          <p>{SITE.role}</p>
          <ul className="tilt-list">
            <li>Based in Sri Lanka</li>
            <li>CS · NSBM Green University</li>
            <li>Graduating Feb 2028</li>
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
            I’m {SITE.name} — a Computer Science undergraduate at NSBM Green
            University, targeting a Software Engineering internship.
          </p>
          <p>
            I build full-stack systems in <strong>Java</strong>,
            <strong> Spring Boot</strong>, <strong>React</strong>, and
            <strong> Kotlin</strong>. Evidence is in the repos: flood-relief
            coordination (Spring, WebSockets, Leaflet), LectureLens (React,
            TypeScript, Supabase, AI), and FocusFlow (Compose + Room).
          </p>
          <p>
            Cloud practice is honest and still growing: <strong>Docker</strong>,
            AWS Educate Cloud 101, KodeKloud AWS labs, and Kubernetes for
            beginners. I do not claim equal expertise across AWS, GCP, and Azure.
          </p>
          <div className="about-facts">
            <div className="fact"><strong>NSBM</strong><small>BSc (Hons) CS · 2024–Feb 2028</small></div>
            <div className="fact"><strong>8</strong><small>Featured public projects</small></div>
            <div className="fact"><strong>Intern</strong><small>Open for Nov 2026 career fair</small></div>
          </div>
        </Reveal>
        <Reveal delay={0.25}>
          <TiltCard />
        </Reveal>
      </div>
    </section>
  );
}
