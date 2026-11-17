import { Link } from "react-router-dom";
import { ArrowRight, Download, MapPin } from "lucide-react";
import { Linkedin } from "./BrandIcons.jsx";
import Reveal from "./Reveal.jsx";
import useMagnetic from "../hooks/useMagnetic.js";
import profile from "../assets/profile.png";
import { SITE, CV_HREF } from "../data/site.js";
import HeroHeading from "./HeroHeading.jsx";

export default function Hero({ headingVariant = "gradient" }) {
  const primaryRef = useMagnetic(0.25);
  const ghostRef = useMagnetic(0.25);
  const linkedRef = useMagnetic(0.25);

  return (
    <section className="hero" id="hero">
      <div className="hero-layout">
        <div className="hero-inner">
          {/* Status Badge */}
          <Reveal as="div" className="hero-eyebrow" delay={0}>
            <span className="ping" />
            <span>Available for Opportunities</span>
          </Reveal>

          {/* Redesigned Hero Intro Heading with TypingBox */}
          <HeroHeading variant={headingVariant} />

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
            <img
              src={profile}
              alt={`Portrait of ${SITE.name}`}
              width={340}
              height={410}
              loading="eager"
            />
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
