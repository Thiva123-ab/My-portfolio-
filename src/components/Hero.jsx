import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Download, MapPin } from "lucide-react";
import { Linkedin } from "./BrandIcons.jsx";
import Reveal from "./Reveal.jsx";
import useMagnetic from "../hooks/useMagnetic.js";
import profile from "../assets/profile.png";
import { SITE, CV_HREF } from "../data/site.js";
import HeroHeading from "./HeroHeading.jsx";

const SPECIALTIES = [
  "Scalable Backend & Cloud Systems",
  "Modern React & TypeScript UIs",
  "Java & Spring Boot Architectures",
  "High-Performance Clean Code Solutions",
];

export default function Hero({ headingVariant = "gradient" }) {
  const primaryRef = useMagnetic(0.25);
  const ghostRef = useMagnetic(0.25);
  const linkedRef = useMagnetic(0.25);
  const [specIndex, setSpecIndex] = useState(0);

  // Specialties rotation timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSpecIndex((prev) => (prev + 1) % SPECIALTIES.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero" id="hero">
      <div className="hero-layout">
        <div className="hero-inner">
          {/* Status Badge */}
          <Reveal as="div" className="hero-eyebrow" delay={0}>
            <span className="ping" />
            <span>Available for Opportunities</span>
          </Reveal>

          {/* Redesigned Hero Intro Heading (Linear/Vercel Polish) */}
          <HeroHeading variant={headingVariant} />

          {/* Specialization Rotating Tagline */}
          <Reveal className="hero-tagline-wrap" delay={0.16}>
            <div className="hero-tagline-pill">
              <span className="hero-tagline-dot" />
              <span className="hero-tagline-label">Specializing in:</span>
              <span className="hero-tagline-swap" key={specIndex}>
                {SPECIALTIES[specIndex]}
              </span>
            </div>
          </Reveal>

          {/* Honest, calm bio */}
          <Reveal as="p" className="hero-sub" delay={0.22}>
            Computer Science undergraduate at NSBM Green University (graduating Feb 2028).
            Building scalable, high-performance full-stack systems with Java, Spring Boot, React, and Kotlin.
          </Reveal>

          {/* Call to Actions */}
          <Reveal className="hero-cta" delay={0.35}>
            <Link ref={primaryRef} to="/projects" className="btn btn-primary btn-hero-primary" data-cursor="hover">
              <span>View projects</span>
              <ArrowRight size={17} />
            </Link>
            <div className="hero-cta-secondary-row">
              <a
                ref={ghostRef}
                href={CV_HREF}
                download="Thivanka_Tharuka_CV.pdf"
                className="btn btn-ghost btn-hero-secondary"
                data-cursor="hover"
              >
                <Download size={16} />
                <span>Download CV</span>
              </a>
              <a
                ref={linkedRef}
                href={SITE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost btn-hero-secondary"
                data-cursor="hover"
              >
                <Linkedin size={16} />
                <span>LinkedIn</span>
              </a>
            </div>
          </Reveal>
        </div>

        {/* Framed Portrait Photo */}
        <Reveal className="hero-portrait" delay={0.3}>
          <div className="portrait-frame">
            <span className="portrait-ring" aria-hidden="true" />
            <img src={profile} alt={`Portrait of ${SITE.name}`} loading="eager" />
            <span className="portrait-badge">
              <MapPin size={13} className="portrait-badge-icon" />
              <span>Sri Lanka · NSBM Undergrad</span>
            </span>
          </div>
        </Reveal>
      </div>

      <Reveal className="hero-scroll" delay={0.5}>
        <span>Scroll down</span>
        <span className="hero-scroll-line" />
      </Reveal>
    </section>
  );
}
