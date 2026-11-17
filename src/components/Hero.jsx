import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Download, MapPin } from "lucide-react";
import { Linkedin } from "./BrandIcons.jsx";
import Reveal from "./Reveal.jsx";
import useMagnetic from "../hooks/useMagnetic.js";
import profile from "../assets/profile.png";
import { SITE, CV_HREF } from "../data/site.js";

const TITLE_LINES = [
  [{ text: "Hi,", cls: "shimmer" }, { text: "I’m", cls: "shimmer" }],
  [{ text: "Thivanka", cls: "gradient-text" }, { text: "Tharuka", cls: "gradient-text" }],
];

const ROLES = [
  "Full Stack Developer",
  "Software Engineer",
  "Java & Spring Boot Developer",
  "React & TypeScript Developer",
];

const SPECIALTIES = [
  "Scalable Backend & Cloud Systems",
  "Modern React & TypeScript UIs",
  "Java & Spring Boot Architectures",
  "High-Performance Clean Code Solutions",
];

export default function Hero() {
  const primaryRef = useMagnetic(0.25);
  const ghostRef = useMagnetic(0.25);
  const linkedRef = useMagnetic(0.25);
  const [specIndex, setSpecIndex] = useState(0);

  // Typewriter effect state
  const [roleIndex, setRoleIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  let charIndex = 0;

  // Specialties rotation timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSpecIndex((prev) => (prev + 1) % SPECIALTIES.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  // Continuous professional typewriter animation
  useEffect(() => {
    const currentFull = ROLES[roleIndex];
    let timeout;

    if (!isDeleting) {
      if (typedText.length < currentFull.length) {
        timeout = setTimeout(() => {
          setTypedText(currentFull.slice(0, typedText.length + 1));
        }, 85);
      } else {
        // Word completed: pause before erasing
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2200);
      }
    } else {
      if (typedText.length > 0) {
        timeout = setTimeout(() => {
          setTypedText(currentFull.slice(0, typedText.length - 1));
        }, 40);
      } else {
        // Erased: switch to next role
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % ROLES.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, roleIndex]);

  return (
    <section className="hero" id="hero">
      <div className="hero-layout">
        <div className="hero-inner">
          <Reveal as="div" className="hero-eyebrow" delay={0}>
            <span className="ping" />
            <span>Available for Opportunities</span>
          </Reveal>

          {/* Main Title: Hi, I'm Thivanka Tharuka */}
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

          {/* Subtitle Line with Continuous Professional Typewriter Animation */}
          <Reveal className="hero-typewriter-wrap" delay={0.12}>
            <div className="hero-typewriter-box">
              <span className="typewriter-badge">Role</span>
              <h2 className="hero-typewriter-text">
                <span>{typedText}</span>
                <span className="hero-typewriter-cursor">|</span>
              </h2>
            </div>
          </Reveal>

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

          <Reveal as="p" className="hero-sub" delay={0.2}>
            Computer Science undergraduate at NSBM Green University (graduating Feb 2028).
            Building scalable, high-performance full-stack systems with Java, Spring Boot, React, and Kotlin.
          </Reveal>

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
