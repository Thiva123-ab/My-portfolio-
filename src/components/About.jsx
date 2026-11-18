import { useRef, useEffect } from "react";
import { MapPin, GraduationCap, Clock } from "lucide-react";
import Reveal from "./Reveal.jsx";
import profile from "../assets/profile.png";
import { SITE } from "../data/site.js";
import NowBlock from "./NowBlock.jsx";
import AboutStatsBento from "./about/AboutStatsBento.jsx";
import AboutGlanceCard from "./about/AboutGlanceCard.jsx";
import AboutCoreStackCard from "./about/AboutCoreStackCard.jsx";
import AboutFeaturedCard from "./about/AboutFeaturedCard.jsx";
import AboutQuickActions from "./about/AboutQuickActions.jsx";

function TiltCard() {
  const wrapRef = useRef(null);
  const tiltRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const tilt = tiltRef.current;
    if (!wrap || !tilt) return;
    if (window.matchMedia("(max-width: 1023px)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onMove = (e) => {
      const r = wrap.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      tilt.style.transform = `rotateY(${px * 10}deg) rotateX(${-py * 10}deg)`;
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
          <p className="tilt-role">{SITE.role}</p>
          <ul className="tilt-list">
            <li>
              <MapPin size={14} /> Based in Sri Lanka
            </li>
            <li>
              <GraduationCap size={14} /> CS · NSBM Green University
            </li>
            <li>
              <Clock size={14} /> Graduating Feb 2028
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function About() {
  return (
    <section className="section about" id="about" aria-labelledby="about-heading">
      {/* Subtle floating ambient glow wrapped in clipping container */}
      <div className="about-glow-contain" aria-hidden="true">
        <div className="about-bg-glow" />
      </div>

      <div className="site-container">
        <div className="section-head">
          <span className="section-index">01</span>
          <Reveal as="h2" id="about-heading" className="section-title">
            About Me
          </Reveal>
        </div>

        <div className="about-grid">
          {/* =========================================================
              LEFT COLUMN (approx 7 / 12 on Desktop, Full Width on Mobile)
              Intro statement, paragraphs, bento stats, and Current Focus Now card
              ========================================================= */}
          <div className="about-text-col">
            {/* 1. Intro paragraphs */}
            <Reveal className="about-intro-block w-full min-w-0" delay={0.05}>
              <p className="lead">
                I’m {SITE.name} — a Full Stack Developer and Computer Science undergraduate at NSBM Green
                University, dedicated to architecting and building high-performance digital products.
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
            </Reveal>

            {/* 2. Bento Stats Row with Animated Count-up */}
            <Reveal delay={0.1} className="about-stats-bento-wrap w-full min-w-0">
              <AboutStatsBento />
            </Reveal>

            {/* 3. Mobile Only: Profile Card placed between Stats and Current Focus */}
            <div className="about-mobile-profile-wrap about-mobile-only w-full min-w-0">
              <TiltCard />
            </div>

            {/* 4. Current Focus · Now Card */}
            <Reveal delay={0.15} className="about-now-wrap w-full min-w-0">
              <div className="about-now-inner">
                <NowBlock />
              </div>
            </Reveal>

            {/* 5. Mobile Only: Additional Highlights Stack */}
            <div className="about-mobile-highlights about-mobile-only w-full min-w-0">
              <AboutGlanceCard />
              <AboutCoreStackCard />
              <AboutFeaturedCard />
              <AboutQuickActions />
            </div>
          </div>

          {/* =========================================================
              RIGHT COLUMN (Desktop Only >= 1024px, Sticky)
              Profile Card, At A Glance, Core Stack, Featured Spotlight, Quick Actions
              ========================================================= */}
          <aside className="about-sticky-col about-desktop-only" aria-label="Profile and quick highlights">
            <div className="about-cards-stack">
              {/* 1. Profile Tilt Card */}
              <Reveal delay={0.1} className="about-profile-card-wrap">
                <TiltCard />
              </Reveal>

              {/* 2. At A Glance Card */}
              <Reveal delay={0.18}>
                <AboutGlanceCard />
              </Reveal>

              {/* 3. Core Tech Stack Card */}
              <Reveal delay={0.26}>
                <AboutCoreStackCard />
              </Reveal>

              {/* 4. Featured Project Spotlight Card */}
              <Reveal delay={0.34}>
                <AboutFeaturedCard />
              </Reveal>

              {/* 5. Quick Actions Row */}
              <Reveal delay={0.42}>
                <AboutQuickActions />
              </Reveal>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
