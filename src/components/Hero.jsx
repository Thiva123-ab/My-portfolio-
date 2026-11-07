import { Link } from "react-router-dom";
import Reveal from "./Reveal.jsx";
import useMagnetic from "../hooks/useMagnetic.js";
import profile from "../assets/profile.png";
import { SITE, CV_HREF } from "../data/site.js";

const TITLE_LINES = [
  [{ text: "Software", cls: "shimmer" }, { text: "Engineering", cls: "shimmer" }],
  [{ text: "Intern", cls: "gradient-text" }, { text: "candidate", cls: "shimmer" }],
];

export default function Hero() {
  const primaryRef = useMagnetic(0.25);
  const ghostRef = useMagnetic(0.25);
  const linkedRef = useMagnetic(0.25);
  let charIndex = 0;

  return (
    <section className="hero" id="hero">
      <div className="hero-layout">
        <div className="hero-inner">
          <Reveal as="p" className="hero-eyebrow" delay={0}>
            <span className="ping" /> Open to internships
          </Reveal>
          <h1 className="hero-title">
            {TITLE_LINES.map((line, li) => (
              <span className="line" key={li}>
                {line.map((w, wi) => (
                  <span className={`word ${w.cls}`} key={wi}>
                    {[...w.text].map((ch, ci, arr) => (
                      <span
                        className="char"
                        key={ci}
                        style={{
                          animationDelay: `${charIndex++ * 0.04}s`,
                          ...(w.cls.includes("gradient-text")
                            ? {
                                backgroundSize: `${arr.length * 100}% auto`,
                                backgroundPosition: `${(ci / (arr.length - 1 || 1)) * 100}% center`,
                              }
                            : {}),
                        }}
                      >
                        {ch}
                      </span>
                    ))}
                    {wi < line.length - 1 ? "\u00A0" : null}
                  </span>
                ))}
              </span>
            ))}
          </h1>
          <Reveal as="p" className="hero-sub" delay={0.2}>
            CS undergraduate at NSBM (graduating Feb 2028). I build scalable
            full-stack apps with Java, Spring Boot, React, and Kotlin.
          </Reveal>
          <Reveal className="hero-cta" delay={0.35}>
            <Link ref={primaryRef} to="/projects" className="btn btn-primary" data-cursor="hover">
              <span>View projects</span>
              <svg viewBox="0 0 24 24" width="18" height="18">
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <a ref={ghostRef} href={CV_HREF} download className="btn btn-ghost" data-cursor="hover">
              Download CV
            </a>
            <a
              ref={linkedRef}
              href={SITE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
              data-cursor="hover"
            >
              LinkedIn
            </a>
          </Reveal>
        </div>

        <Reveal className="hero-portrait" delay={0.3}>
          <div className="portrait-frame">
            <span className="portrait-ring" aria-hidden="true" />
            <img src={profile} alt={`Portrait of ${SITE.name}`} loading="eager" />
            <span className="portrait-badge">
              <span className="ping" /> Open to internships
            </span>
          </div>
        </Reveal>
      </div>

      <Reveal className="hero-scroll" delay={0.5}>
        <span>Scroll</span>
        <span className="hero-scroll-line" />
      </Reveal>
    </section>
  );
}
