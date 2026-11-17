import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Download, MapPin, Mail, MessageCircle } from "lucide-react";
import { Github, Linkedin } from "./BrandIcons.jsx";
import { useReducedMotion } from "framer-motion";
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

const ROLES = [
  "Java & Spring Boot Architectures",
  "React & TypeScript UIs",
  "Native Android with Kotlin",
  "Scalable Cloud & REST APIs",
];

export default function Hero({ headingVariant = "gradient" }) {
  const shouldReduceMotion = useReducedMotion();
  const primaryRef = useMagnetic(0.25);
  const ghostRef = useMagnetic(0.25);
  const linkedRef = useMagnetic(0.25);

  // Desktop specialties rotation timer
  const [specIndex, setSpecIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setSpecIndex((prev) => (prev + 1) % SPECIALTIES.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  // Mobile typewriter state machine
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayedText(ROLES[0]);
      return;
    }

    const currentRole = ROLES[roleIndex];
    let timeout;

    if (!isDeleting) {
      if (displayedText.length < currentRole.length) {
        timeout = setTimeout(() => {
          setDisplayedText(currentRole.slice(0, displayedText.length + 1));
        }, 55);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2200);
      }
    } else {
      if (displayedText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(currentRole.slice(0, displayedText.length - 1));
        }, 30);
      } else {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % ROLES.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, roleIndex, shouldReduceMotion]);

  return (
    <section className="hero" id="hero">
      {/* =========================================================
          MOBILE HERO VIEW (< 640px)
          Centered, 112px rounded-3xl profile, typing line, stacked buttons,
          and 56px circular social row.
          ========================================================= */}
      <div className="hero-mobile-view mobile-only">
        {/* Faint Background Particle Glow for Mobile Hero */}
        <div className="mobile-hero-bg-glow" aria-hidden="true" />

        {/* 1. Profile Photo (112px, rounded-3xl, gradient border & soft glow) */}
        <div className="mobile-hero-avatar-wrap">
          <div className="mobile-hero-avatar-glow" aria-hidden="true" />
          <div className="mobile-hero-avatar-frame">
            <img
              src={profile}
              alt={`Portrait of ${SITE.name}`}
              className="mobile-hero-avatar-img"
              width={112}
              height={112}
              loading="eager"
            />
          </div>
          {/* Overlapping Location Pill at bottom edge */}
          <div className="mobile-hero-location-pill">
            <MapPin size={12} className="mobile-location-icon" aria-hidden="true" />
            <span>Sri Lanka · NSBM Undergrad</span>
          </div>
        </div>

        {/* 2. Available for Opportunities Pill */}
        <div className="mobile-hero-status-pill">
          <span className="mobile-status-ping-wrap" aria-hidden="true">
            <span className="mobile-status-ping-ring" />
            <span className="mobile-status-ping-dot" />
          </span>
          <span className="mobile-status-text">Available for Opportunities</span>
        </div>

        {/* 3. Heading: "Hi 👋, I'm" + "Thivanka Tharuka" */}
        <div className="mobile-hero-heading-group">
          <p className="mobile-hero-greeting">Hi 👋, I&apos;m</p>
          <h1 className="mobile-hero-name" aria-label="Thivanka Tharuka">
            <span className="mobile-name-gradient">Thivanka Tharuka</span>
          </h1>
        </div>

        {/* 4. Typewriter Role Line with Blinking Caret */}
        <div className="mobile-hero-typewriter-row" aria-live="polite">
          <span className="typewriter-prefix">I build </span>
          <span className="typewriter-text">{displayedText}</span>
          {!shouldReduceMotion && <span className="typewriter-caret" aria-hidden="true">|</span>}
        </div>

        {/* 5. Short Bio (Centered, text-base, muted, max-w-sm) */}
        <p className="mobile-hero-bio">
          Computer Science undergraduate at NSBM (graduating Feb 2028). Building scalable backend architectures and high-performance applications with Java, Spring Boot, React, and Kotlin.
        </p>

        {/* 6. Stacked Buttons (48px height, gap-3, full-width) */}
        <div className="mobile-hero-actions-stack">
          {/* a) Primary Button: View projects → */}
          <Link to="/projects" className="mobile-btn-primary" data-cursor="hover">
            <span>View projects</span>
            <ArrowRight size={17} />
          </Link>

          {/* b) Outline Button: Download CV */}
          <a
            href={CV_HREF}
            download="Thivanka_Tharuka_CV.pdf"
            className="mobile-btn-outline"
            data-cursor="hover"
          >
            <Download size={16} />
            <span>Download CV</span>
          </a>

          {/* c) Outline Button: LinkedIn */}
          <a
            href={SITE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-btn-outline"
            data-cursor="hover"
          >
            <Linkedin size={16} />
            <span>LinkedIn</span>
          </a>
        </div>

        {/* 7. Social Icon Row (4 circular 56px buttons) */}
        <div className="mobile-hero-social-grid" aria-label="Social and contact links">
          <a
            href={SITE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-social-circle-btn"
            aria-label="GitHub Profile"
          >
            <Github size={22} />
          </a>
          <a
            href={SITE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-social-circle-btn"
            aria-label="LinkedIn Profile"
          >
            <Linkedin size={22} />
          </a>
          <a
            href={`mailto:${SITE.email}`}
            className="mobile-social-circle-btn"
            aria-label="Send Email"
          >
            <Mail size={22} />
          </a>
          <a
            href={SITE.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-social-circle-btn"
            aria-label="Chat on WhatsApp"
          >
            <MessageCircle size={22} />
          </a>
        </div>
      </div>

      {/* =========================================================
          DESKTOP & TABLET HERO VIEW (>= 640px)
          Original desktop side-by-side layout preserved with 0 regressions.
          ========================================================= */}
      <div className="hero-desktop-view desktop-tablet-only">
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
      </div>
    </section>
  );
}
