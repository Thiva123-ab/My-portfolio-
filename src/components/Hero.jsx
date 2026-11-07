import Reveal from "./Reveal.jsx";
import profile from "../assets/profile.png";
import { SITE, CV_HREF } from "../data/site.js";

export default function Hero() {
  return (
    <section className="hero-pro" id="about">
      <Reveal as="p" className="hero-pro-badge">
        Open to internships · Career fair 21–22 Nov 2026
      </Reveal>
      <div className="hero-pro-grid">
        <div>
          <h1 className="hero-pro-title">
            Software Engineering Intern
            <span> building reliable full-stack systems.</span>
          </h1>
          <p className="hero-pro-sub">
            {SITE.name} — CS undergraduate at NSBM Green University, graduating Feb 2028.
            Core stack: Spring Boot, React, Docker, and AWS Educate Cloud 101 (not a multi-cloud expert, not Next.js-first).
          </p>
          <div className="hero-pro-cta">
            <a href={CV_HREF} download className="btn-pro btn-pro-primary">
              Download Resume
            </a>
            <a href={SITE.github} target="_blank" rel="noopener noreferrer" className="btn-pro btn-pro-ghost">
              View GitHub
            </a>
          </div>
        </div>
        <div className="hero-pro-photo">
          <img src={profile} alt={`Portrait of ${SITE.name}`} />
        </div>
      </div>
    </section>
  );
}
