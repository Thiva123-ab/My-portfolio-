import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Download, MapPin, GraduationCap, Server, Layout, ChevronDown } from "lucide-react";
import { Linkedin, Github } from "./BrandIcons.jsx";
import useMagnetic from "../hooks/useMagnetic.js";
import profile from "../assets/profile.png";
import { SITE, CV_HREF } from "../data/site.js";
import TypingBox from "./TypingBox.jsx";
import HeroTechMarquee from "./HeroTechMarquee.jsx";

export default function Hero({ mobileAlign = "center" }) {
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

  // Mobile entrance container & item variants (80ms stagger)
  const mobileContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
        delayChildren: shouldReduceMotion ? 0 : 0.04,
      },
    },
  };

  const mobileItemVariants = {
    hidden: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: easeCurve },
    },
  };

  // Desktop animation variants
  const desktopContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.07,
        delayChildren: shouldReduceMotion ? 0 : 0.04,
      },
    },
  };

  const desktopItemVariants = {
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
    <section className="hero-section overflow-x-clip" id="hero" aria-labelledby="hero-title">
      {/* Background ambient radial glow in clipped container */}
      <div className="hero-glow-contain" aria-hidden="true">
        <div className="hero-ambient-glow" />
        <div className="hero-bottom-fade" />
      </div>

      {/* Shared container strictly aligned across site */}
      <div className="hero-container">
        {/* =========================================================
            1. MOBILE HERO VIEW (< 640px)
            Centered, flex-col, items-center, text-center, px-5
            ========================================================= */}
        <motion.div
          className="hero-mobile-view flex flex-col items-center text-center px-5 pt-24 sm:hidden w-full max-w-md mx-auto"
          variants={mobileContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* 1. Photo Block (Centered, Hero Focal Point) */}
          <motion.div variants={mobileItemVariants} className="hero-mobile-photo-container">
            <div className="hero-mobile-photo-wrap relative w-36 aspect-[4/5] mx-auto mb-3">
              {/* Soft radial purple/teal aurora glow behind photo */}
              <div className="hero-mobile-photo-aurora" aria-hidden="true" />

              {/* Conic rotating gradient ring */}
              <div className="hero-mobile-photo-ring" aria-hidden="true" />

              {/* Photo frame: 144px wide (w-36), aspect 4/5, rounded-[28px], fixed size */}
              <div className="hero-mobile-photo-frame relative w-36 h-[180px] rounded-[28px] overflow-hidden bg-[#07070c] z-10">
                <img
                  src={profile}
                  alt="Portrait of Thivanka Tharuka"
                  className="hero-mobile-photo-img w-full h-full object-cover object-top"
                  width={144}
                  height={180}
                  loading="eager"
                  fetchPriority="high"
                />
              </div>

              {/* Small glass pill overlapping bottom edge: MapPin + 'Sri Lanka · NSBM' */}
              <div className="hero-mobile-photo-pill" aria-label="Location and affiliation">
                <MapPin size={11} className="text-teal shrink-0" aria-hidden="true" />
                <span>Sri Lanka · NSBM</span>
              </div>
            </div>
          </motion.div>

          {/* 2. Available for Opportunities Glass Pill */}
          <motion.div variants={mobileItemVariants} className="mt-1">
            <div className="hero-mobile-status-pill" role="status" aria-label="Available for Opportunities">
              <span className="hero-status-pulse" aria-hidden="true">
                <span className="pulse-ring" />
                <span className="pulse-dot" />
              </span>
              <span className="hero-mobile-status-text">Available for Opportunities</span>
            </div>
          </motion.div>

          {/* 3. Eyebrow: '— HELLO, I'M' with gradient lines */}
          <motion.div variants={mobileItemVariants} className="w-full">
            <p className="hero-mobile-eyebrow">
              <span className="hero-mobile-eyebrow-line line-left" aria-hidden="true" />
              <span>— HELLO, I’M</span>
              <span className="hero-mobile-eyebrow-line line-right" aria-hidden="true" />
            </p>
          </motion.div>

          {/* 4. Name: 'Thivanka' white & 'Tharuka' gradient with animated underline */}
          <motion.div variants={mobileItemVariants} className="w-full">
            <h1 className="hero-mobile-name" id="hero-title" aria-label="Thivanka Tharuka">
              <span className="sr-only">Thivanka Tharuka</span>
              <span className="hero-mobile-name-white" aria-hidden="true">Thivanka</span>
              <span className="hero-mobile-name-gradient" aria-hidden="true">Tharuka</span>
              <motion.span
                className="hero-mobile-underline"
                aria-hidden="true"
                initial={shouldReduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.65, delay: 0.35, ease: easeCurve }}
              />
            </h1>
          </motion.div>

          {/* 5. TypingBox (Stacked Glass Card, Full Width, Fixed Min-Height) */}
          <motion.div variants={mobileItemVariants} className="w-full">
            <TypingBox
              words={[
                "Full Stack Developer",
                "Java & Spring Boot",
                "React & TypeScript",
                "Kotlin",
              ]}
              prefix="SPECIALIZING IN:"
              typeSpeed={70}
              deleteSpeed={40}
              pauseTime={1400}
              layout="stacked"
            />
          </motion.div>

          {/* 6. Bio Paragraph (Centered, max-w-sm, text-[15px]) */}
          <motion.div variants={mobileItemVariants} className="w-full">
            <p className="hero-mobile-bio">
              Computer Science undergraduate at NSBM Green University (graduating Feb 2028).
              Building scalable, high&#8209;performance full&#8209;stack systems with{" "}
              <strong className="text-white font-semibold">Java</strong>,{" "}
              <strong className="text-white font-semibold">Spring Boot</strong>,{" "}
              <strong className="text-white font-semibold">React</strong>, and{" "}
              <strong className="text-white font-semibold">Kotlin</strong>.
            </p>
          </motion.div>

          {/* 7. Buttons (Full width 52px tall, rounded-2xl) */}
          <motion.div variants={mobileItemVariants} className="w-full">
            <div className="hero-mobile-cta-col">
              {/* Primary View projects button */}
              <Link
                to="/projects"
                className="hero-mobile-btn-white"
                title="Explore full projects portfolio"
              >
                <span>View projects</span>
                <ArrowRight size={16} />
              </Link>

              {/* 2-column row: Download CV & LinkedIn (whitespace-nowrap) */}
              <div className="hero-mobile-btn-glass-row">
                <a
                  href={CV_HREF}
                  download="Thivanka_Tharuka_CV.pdf"
                  className="hero-mobile-btn-glass"
                  title="Download verified Curriculum Vitae (PDF)"
                >
                  <Download size={14} className="shrink-0" />
                  <span>Download CV</span>
                </a>

                <a
                  href={SITE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-mobile-btn-glass"
                  title="LinkedIn Profile"
                  aria-label="Connect with Thivanka Tharuka on LinkedIn"
                >
                  <Linkedin size={14} className="shrink-0" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* 8. Info Row (Single Glass Card with Clean Dividers) */}
          <motion.div variants={mobileItemVariants} className="w-full">
            <div className="hero-mobile-info-card" aria-label="Academic & Geographic Details">
              <span className="hero-mobile-info-item">
                <MapPin size={13} className="text-teal shrink-0" aria-hidden="true" />
                <span>Sri Lanka</span>
              </span>
              <span className="hero-mobile-info-dot" aria-hidden="true">•</span>
              <span className="hero-mobile-info-item">
                <GraduationCap size={13} className="text-accent-purple shrink-0" aria-hidden="true" />
                <span>NSBM Green University</span>
              </span>
              <span className="hero-mobile-info-dot" aria-hidden="true">•</span>
              <span className="hero-mobile-info-item text-teal">
                <span className="hero-typing-dot shrink-0" aria-hidden="true" />
                <span>Open to Internships</span>
              </span>
            </div>
          </motion.div>

          {/* 9. Optional Animated Scroll Chevron */}
          <motion.div variants={mobileItemVariants} className="hero-mobile-scroll-indicator" aria-hidden="true">
            <ChevronDown size={18} className="animate-bounce opacity-50" />
          </motion.div>
        </motion.div>

        {/* =========================================================
            2. DESKTOP & TABLET HERO VIEW (>= 640px)
            100% Unchanged original layout & 3D tilt
            ========================================================= */}
        <div className="hidden sm:block w-full">
          <motion.div
            className="hero-grid"
            variants={desktopContainerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Left Column (7 cols) */}
            <div className="hero-content-col">
              {/* Availability Status Badge */}
              <motion.div variants={desktopItemVariants}>
                <div className="hero-status-pill" role="status" aria-label="Available for Opportunities">
                  <span className="hero-status-pulse" aria-hidden="true">
                    <span className="pulse-ring" />
                    <span className="pulse-dot" />
                  </span>
                  <span className="hero-status-text">Available for Opportunities</span>
                </div>
              </motion.div>

              {/* Eyebrow Greeting */}
              <motion.div variants={desktopItemVariants}>
                <p className="hero-eyebrow-mono">
                  <span className="eyebrow-dash">—</span>
                  <span>HELLO, I’M</span>
                </p>
              </motion.div>

              {/* Primary Name Heading */}
              <motion.div variants={desktopItemVariants} className="w-full min-w-0">
                <div className="hero-heading-title" aria-label="Thivanka Tharuka">
                  <span className="hero-name-line line-first" aria-hidden="true">
                    <span className="name-word name-word-white">Thivanka</span>
                  </span>
                  <span className="hero-name-line line-second" aria-hidden="true">
                    <span className="name-word name-word-gradient">Tharuka</span>
                    <span className="hero-gradient-underline" aria-hidden="true" />
                  </span>
                </div>
              </motion.div>

              {/* Desktop Typing Pill */}
              <motion.div variants={desktopItemVariants} className="hero-typing-wrap w-full min-w-0">
                <TypingBox
                  words={[
                    "Full Stack Developer",
                    "Java & Spring Boot",
                    "React & TypeScript",
                    "Kotlin",
                  ]}
                  prefix="SPECIALIZING IN:"
                  layout="inline"
                />
              </motion.div>

              {/* Bio Paragraph */}
              <motion.div variants={desktopItemVariants} className="w-full min-w-0">
                <p className="hero-bio-lead">
                  Computer Science undergraduate at NSBM Green University (graduating Feb 2028).
                  Building scalable, high&#8209;performance full&#8209;stack systems with{" "}
                  <strong className="tech-highlight">Java</strong>,{" "}
                  <strong className="tech-highlight">Spring Boot</strong>,{" "}
                  <strong className="tech-highlight">React</strong>, and{" "}
                  <strong className="tech-highlight">Kotlin</strong>.
                </p>
              </motion.div>

              {/* Desktop CTA Action Row */}
              <motion.div variants={desktopItemVariants} className="w-full">
                <div className="hero-cta-group">
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

              {/* Trust Row */}
              <motion.div variants={desktopItemVariants} className="w-full min-w-0">
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

            {/* Right Column (5 cols, 3D Framed Portrait) */}
            <div className="hero-portrait-col" ref={cardRef}>
              <motion.div className="hero-portrait-wrap" variants={portraitVariants}>
                <div className="hero-halo-ring" aria-hidden="true" />
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
                  <div className="hero-portrait-badge">
                    <MapPin size={12} className="text-teal shrink-0" aria-hidden="true" />
                    <span>Sri Lanka · NSBM Undergrad</span>
                  </div>
                </div>
                <div className="hero-floating-chip chip-spring-boot" aria-hidden="true">
                  <Server size={13} className="text-accent-purple shrink-0" />
                  <span>Spring Boot</span>
                </div>
                <div className="hero-floating-chip chip-react" aria-hidden="true">
                  <Layout size={13} className="text-teal shrink-0" />
                  <span>React</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* BOTTOM OF HERO: Tech Marquee Strip */}
      <HeroTechMarquee />
    </section>
  );
}
