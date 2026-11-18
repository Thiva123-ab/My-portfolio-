import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Download, MapPin, GraduationCap, Server, Layout } from "lucide-react";
import { Linkedin, Github } from "./BrandIcons.jsx";
import useMagnetic from "../hooks/useMagnetic.js";
import profile from "../assets/profile.png";
import { SITE, CV_HREF } from "../data/site.js";
import TypingBox from "./TypingBox.jsx";
import HeroTechMarquee from "./HeroTechMarquee.jsx";

export default function Hero({ mobileAlign = "left" }) {
  const shouldReduceMotion = useReducedMotion();
  const primaryRef = useMagnetic(0.2);
  const secondaryRef = useMagnetic(0.2);
  const cardRef = useRef(null);
  const frameRef = useRef(null);

  // Subtle 3D tilt with spring physics for desktop pointer only
  useEffect(() => {
    const card = cardRef.current;
    const frame = frameRef.current;
    if (!card || !frame || shouldReduceMotion) return;
    if (window.matchMedia("(max-width: 1023px)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let animId;

    const onMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = px * 6; // Max 6 degrees
      targetY = -py * 6;
    };

    const onMouseLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    const updateTilt = () => {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      frame.style.transform = `perspective(900px) rotateY(${currentX.toFixed(2)}deg) rotateX(${currentY.toFixed(2)}deg)`;
      animId = requestAnimationFrame(updateTilt);
    };

    card.addEventListener("mousemove", onMouseMove);
    card.addEventListener("mouseleave", onMouseLeave);
    animId = requestAnimationFrame(updateTilt);

    return () => {
      card.removeEventListener("mousemove", onMouseMove);
      card.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, [shouldReduceMotion]);

  // Framer Motion spring and easing curves
  const easeCurve = [0.22, 1, 0.36, 1];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.07,
        delayChildren: shouldReduceMotion ? 0 : 0.04,
      },
    },
  };

  const itemVariants = {
    hidden: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: easeCurve },
    },
  };

  const portraitVariants = {
    hidden: shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.75, ease: easeCurve, delay: shouldReduceMotion ? 0 : 0.18 },
    },
  };

  return (
    <section className="hero-section" id="hero" aria-labelledby="hero-title">
      {/* Background ambient radial glow in clipped container */}
      <div className="hero-glow-contain" aria-hidden="true">
        <div className="hero-ambient-glow" />
      </div>

      {/* Shared container strictly aligned across site */}
      <div className="hero-container">
        <motion.div
          className="hero-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* =========================================================
              LEFT COLUMN (7 cols on Desktop, Full Width on Mobile)
              ========================================================= */}
          <div className={`hero-content-col ${mobileAlign === "center" ? "mobile-align-center" : ""}`}>
            {/* Desktop Only: Availability Status Badge */}
            <motion.div variants={itemVariants} className="hero-desktop-only">
              <div className="hero-status-pill" role="status" aria-label="Available for Opportunities">
                <span className="hero-status-pulse" aria-hidden="true">
                  <span className="pulse-ring" />
                  <span className="pulse-dot" />
                </span>
                <span className="hero-status-text">Available for Opportunities</span>
              </div>
            </motion.div>

            {/* Desktop Only: Eyebrow Greeting */}
            <motion.div variants={itemVariants} className="hero-desktop-only">
              <p className="hero-eyebrow-mono">
                <span className="eyebrow-dash">—</span>
                <span>HELLO, I’M</span>
              </p>
            </motion.div>

            {/* Mobile Only: Top Compact Identity Row
                Left: Badge + Eyebrow | Right: Sized Responsive Portrait
                Stays fully inside the container with zero overflow */}
            <motion.div variants={itemVariants} className="hero-mobile-identity-row hero-mobile-only">
              <div className="hero-mobile-meta">
                <div className="hero-status-pill" role="status" aria-label="Available for Opportunities">
                  <span className="hero-status-pulse" aria-hidden="true">
                    <span className="pulse-ring" />
                    <span className="pulse-dot" />
                  </span>
                  <span className="hero-status-text">Available for Opportunities</span>
                </div>

                <p className="hero-eyebrow-mono">
                  <span className="eyebrow-dash">—</span>
                  <span>HELLO, I’M</span>
                </p>
              </div>

              <div className="hero-mobile-portrait-wrap">
                <div className="hero-mobile-portrait-frame">
                  <img
                    src={profile}
                    alt="Portrait of Thivanka Tharuka"
                    className="hero-mobile-portrait-img"
                    width={96}
                    height={96}
                    loading="eager"
                    fetchPriority="high"
                  />
                </div>
              </div>
            </motion.div>

            {/* Primary Name Heading (Single <h1> for Accessibility & SEO) */}
            <motion.div variants={itemVariants} className="w-full min-w-0">
              <h1 className="hero-heading-title" id="hero-title" aria-label="Thivanka Tharuka">
                <span className="sr-only">Thivanka Tharuka</span>
                <span className="hero-name-line line-first" aria-hidden="true">
                  <span className="name-word name-word-white">Thivanka</span>
                </span>
                <span className="hero-name-line line-second" aria-hidden="true">
                  <span className="name-word name-word-gradient">Tharuka</span>
                  <span className="hero-gradient-underline" aria-hidden="true" />
                </span>
              </h1>
            </motion.div>

            {/* Compact Specializing In Typing Pill */}
            <motion.div variants={itemVariants} className="hero-typing-wrap w-full min-w-0">
              <TypingBox
                words={[
                  "Full Stack Developer",
                  "Java & Spring Boot",
                  "React & TypeScript",
                  "Kotlin",
                ]}
                prefix="SPECIALIZING IN:"
              />
            </motion.div>

            {/* Balanced Bio Paragraph (16px, max-w-full, text-wrap: pretty) */}
            <motion.div variants={itemVariants} className="w-full min-w-0">
              <p className="hero-bio-lead">
                Computer Science undergraduate at NSBM Green University (graduating Feb 2028).
                Building scalable, high&#8209;performance full&#8209;stack systems with{" "}
                <strong className="tech-highlight">Java</strong>,{" "}
                <strong className="tech-highlight">Spring Boot</strong>,{" "}
                <strong className="tech-highlight">React</strong>, and{" "}
                <strong className="tech-highlight">Kotlin</strong>.
              </p>
            </motion.div>

            {/* Desktop CTA Action Row (>= 1024px) */}
            <motion.div variants={itemVariants} className="hero-desktop-only w-full">
              <div className="hero-cta-group">
                {/* Primary Button */}
                <Link
                  ref={primaryRef}
                  to="/projects"
                  className="btn btn-primary btn-hero-primary"
                  data-cursor="hover"
                  title="Explore full projects portfolio"
                >
                  <span>View projects</span>
                  <ArrowRight size={16} className="hero-cta-arrow" />
                </Link>

                {/* Secondary Button */}
                <a
                  ref={secondaryRef}
                  href={CV_HREF}
                  download="Thivanka_Tharuka_CV.pdf"
                  className="btn btn-secondary-glass btn-hero-secondary"
                  data-cursor="hover"
                  title="Download verified Curriculum Vitae (PDF)"
                >
                  <Download size={15} />
                  <span>Download CV</span>
                </a>

                {/* Social Icon Buttons */}
                <div className="hero-cta-socials">
                  <a
                    href={SITE.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost-icon btn-hero-social"
                    data-cursor="hover"
                    title="Connect on LinkedIn"
                    aria-label="Connect with Thivanka Tharuka on LinkedIn"
                  >
                    <Linkedin size={18} />
                  </a>

                  <a
                    href={SITE.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost-icon btn-hero-social"
                    data-cursor="hover"
                    title="Explore GitHub Profile"
                    aria-label="Explore Thivanka Tharuka's GitHub Profile"
                  >
                    <Github size={18} />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Mobile CTA Action Group (< 1024px)
                Primary 'View projects' full-width (52px), then 'Download CV' and 'LinkedIn' in a 2-col row (48px) */}
            <motion.div variants={itemVariants} className="hero-mobile-only w-full min-w-0">
              <div className="hero-mobile-cta-stack">
                <Link
                  to="/projects"
                  className="btn btn-primary hero-mobile-btn-primary"
                  title="Explore full projects portfolio"
                >
                  <span>View projects</span>
                  <ArrowRight size={16} />
                </Link>

                <div className="hero-mobile-cta-row">
                  <a
                    href={CV_HREF}
                    download="Thivanka_Tharuka_CV.pdf"
                    className="btn btn-secondary-glass hero-mobile-btn-secondary"
                    title="Download CV (PDF)"
                  >
                    <Download size={15} />
                    <span>Download CV</span>
                  </a>

                  <a
                    href={SITE.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary-glass hero-mobile-btn-secondary"
                    title="LinkedIn Profile"
                  >
                    <Linkedin size={15} />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Trust Row (Wrapped, Real Data Only) */}
            <motion.div variants={itemVariants} className="w-full min-w-0">
              <div className="hero-trust-row" aria-label="Academic & Geographic Details">
                <span className="trust-item">
                  <MapPin size={13} className="trust-icon text-teal" aria-hidden="true" />
                  <span>Sri Lanka</span>
                </span>
                <span className="trust-dot" aria-hidden="true">•</span>
                <span className="trust-item">
                  <GraduationCap size={13} className="trust-icon text-accent-purple" aria-hidden="true" />
                  <span>NSBM Green University</span>
                </span>
                <span className="trust-dot" aria-hidden="true">•</span>
                <span className="trust-item">
                  <span className="trust-pulse" aria-hidden="true" />
                  <span className="trust-status-text">Open to Internships</span>
                </span>
              </div>
            </motion.div>
          </div>

          {/* =========================================================
              RIGHT COLUMN (5 cols on Desktop, Hidden on Mobile < 1024px)
              3D Framed Portrait + Floating Tech Chips + Location Badge
              ========================================================= */}
          <div className="hero-portrait-col hero-desktop-only" ref={cardRef}>
            <motion.div className="hero-portrait-wrap" variants={portraitVariants}>
              {/* Rotating thin gradient halo ring */}
              <div className="hero-halo-ring" aria-hidden="true" />

              {/* 3D Tilt Frame */}
              <div className="hero-portrait-frame" ref={frameRef}>
                <img
                  src={profile}
                  alt="Portrait of Thivanka Tharuka"
                  className="hero-portrait-img"
                  width={340}
                  height={420}
                  loading="eager"
                  fetchPriority="high"
                />

                {/* Portrait Overlay Badge */}
                <div className="hero-portrait-badge">
                  <MapPin size={12} className="text-teal shrink-0" aria-hidden="true" />
                  <span>Sri Lanka · NSBM Undergrad</span>
                </div>
              </div>

              {/* Floating Glass Chip 1 (Top Left): Spring Boot */}
              <div className="hero-floating-chip chip-spring-boot" aria-hidden="true">
                <Server size={13} className="text-accent-purple shrink-0" />
                <span>Spring Boot</span>
              </div>

              {/* Floating Glass Chip 2 (Bottom Right): React */}
              <div className="hero-floating-chip chip-react" aria-hidden="true">
                <Layout size={13} className="text-teal shrink-0" />
                <span>React</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* =========================================================
          BOTTOM OF HERO: Subtly Styled Tech Marquee Strip
          ========================================================= */}
      <HeroTechMarquee />
    </section>
  );
}
