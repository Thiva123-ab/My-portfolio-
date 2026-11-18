import { useEffect, useRef, useState, useCallback } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Search, Volume2, VolumeX, Download, ArrowUpRight, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin } from "./BrandIcons.jsx";
import { SITE, CV_HREF } from "../data/site.js";
import useSriLankaTime from "./contact/useSriLankaTime.js";

const NAV_ITEMS = [
  { path: "/", sectionId: "hero", num: "01", label: "Home" },
  { path: "/#about", sectionId: "about", num: "02", label: "About" },
  { path: "/#skills", sectionId: "skills", num: "03", label: "Skills" },
  { path: "/experience", sectionId: "experience", num: "04", label: "Experience" },
  { path: "/projects", sectionId: "work", num: "05", label: "Projects" },
  { path: "/github", sectionId: "github", num: "06", label: "GitHub" },
  { path: "/certifications", num: "07", label: "Certifications" },
  { path: "/resume", num: "08", label: "Resume" },
  { path: "/contact", num: "09", label: "Contact" },
];

export default function Nav({ onOpenCmd, soundEnabled, onToggleSound, mobileNav = "menu" }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const hamburgerRef = useRef(null);
  const menuSheetRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";
  const sriLankaTime = useSriLankaTime();

  // Scroll detection for compact navbar styling
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Body scroll lock & Escape key handling when mobile menu is open
  useEffect(() => {
    if (open) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
      document.body.style.overscrollBehavior = "contain";
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      document.body.style.overscrollBehavior = "";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
      }
    }

    const handleKeyDown = (e) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        hamburgerRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      document.body.style.overscrollBehavior = "";
    };
  }, [open]);

  // Close mobile drawer on desktop resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && open) {
        setOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [open]);

  // Robust scroll-spy for home sections based on actual scroll position
  useEffect(() => {
    if (!isHome) return;

    const handleScrollSpy = () => {
      const scrollPos = window.scrollY + 140;
      const sections = ["hero", "about", "skills", "experience", "work", "github", "certstrip", "contact"];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScrollSpy, { passive: true });
    handleScrollSpy();
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, [isHome]);

  const handleNavClick = useCallback(
    (item) => {
      setOpen(false);
      if (item.sectionId && isHome) {
        const el = document.getElementById(item.sectionId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          return;
        }
      }
      navigate(item.path);
    },
    [isHome, navigate]
  );

  return (
    <header className={`nav-header ${scrolled ? "is-scrolled" : ""} ${open ? "menu-open" : ""}`}>
      <div className="nav-container">
        {/* =========================================================
            1. SINGLE CLEAN BRAND LOCKUP (Never duplicated)
            ========================================================= */}
        <NavLink
          to="/"
          className="nav-brand"
          onClick={() => {
            setOpen(false);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          aria-label="Thivanka Tharuka — Home"
        >
          <span className="logo-mark" aria-hidden="true">◆</span>
          <span className="brand-word">Thivanka</span>
          <span className="brand-dot" aria-hidden="true">.</span>
        </NavLink>

        {/* =========================================================
            2. DESKTOP NAVIGATION LINKS (Visible >= 1024px)
            ========================================================= */}
        <nav className="nav-desktop-links" aria-label="Primary desktop navigation">
          {NAV_ITEMS.map((item) => {
            const isActive = isHome
              ? (item.sectionId
                  ? activeSection === item.sectionId
                  : item.path === "/github" && activeSection === "github")
              : location.pathname === item.path;

            return (
              <button
                key={item.label}
                type="button"
                className={`nav-link-btn ${isActive ? "active" : ""}`}
                onClick={() => handleNavClick(item)}
                data-cursor="hover"
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* =========================================================
            3. DESKTOP CONTROLS (Visible >= 1024px)
            ========================================================= */}
        <div className="nav-desktop-actions">
          {/* Search / Command Palette */}
          <button
            type="button"
            className="nav-cmd-btn"
            onClick={() => onOpenCmd(true)}
            title="Search / Command Palette (Ctrl+K)"
            data-cursor="hover"
            aria-label="Open Command Palette"
          >
            <Search size={15} />
            <span className="cmd-key-hint">⌘K</span>
          </button>

          {/* Sound Toggle */}
          <button
            type="button"
            className={`nav-sound-btn ${soundEnabled ? "sound-on" : ""}`}
            onClick={onToggleSound}
            title={soundEnabled ? "Sound enabled (Click to mute)" : "Sound muted (Click to enable audio)"}
            data-cursor="hover"
            aria-label={soundEnabled ? "Disable audio feedback" : "Enable audio feedback"}
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>
        </div>

        {/* =========================================================
            4. MOBILE TOP BAR CONTROLS (Visible < 1024px)
            Exact order: Search -> Sound -> Animated Hamburger
            Each button has 44x44px min tap target and 8px spacing
            ========================================================= */}
        <div className="nav-mobile-controls" role="group" aria-label="Mobile Navigation Controls">
          {/* 1. Search Button (Opens command palette on mobile) */}
          <button
            type="button"
            className="mobile-action-btn"
            onClick={() => onOpenCmd(true)}
            title="Search & Commands"
            aria-label="Open Command Palette"
          >
            <Search size={19} />
          </button>

          {/* 2. Sound Toggle Button */}
          <button
            type="button"
            className={`mobile-action-btn ${soundEnabled ? "is-sound-active" : ""}`}
            onClick={onToggleSound}
            title={soundEnabled ? "Mute audio" : "Enable audio"}
            aria-label={soundEnabled ? "Disable audio feedback" : "Enable audio feedback"}
          >
            {soundEnabled ? <Volume2 size={19} /> : <VolumeX size={19} />}
          </button>

          {/* 3. Hamburger Button (Morphs into an animated X) */}
          <button
            ref={hamburgerRef}
            type="button"
            className={`mobile-hamburger-btn ${open ? "is-open" : ""}`}
            onClick={() => setOpen((prev) => !prev)}
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            aria-controls="mobile-menu-drawer"
          >
            <span className="hamburger-line line-1" aria-hidden="true" />
            <span className="hamburger-line line-2" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* =========================================================
          5. FULL-SCREEN MOBILE NAVIGATION MENU DRAWER (< 1024px)
          ========================================================= */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu-drawer"
            className="mobile-drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
          >
            {/* Subtle background ambient glow */}
            <div className="mobile-drawer-ambient" aria-hidden="true" />

            <motion.div
              ref={menuSheetRef}
              className="mobile-drawer-sheet"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top Bar inside Menu */}
              <div className="mobile-drawer-top">
                <span className="drawer-brand">
                  <span className="logo-mark">◆</span> Thivanka<span className="brand-dot">.</span>
                </span>
                <span className="drawer-eyebrow">NAVIGATION</span>
              </div>

              {/* Large Links List with Number Prefixes (24-28px, semi-bold) */}
              <nav className="mobile-drawer-links" aria-label="Mobile Navigation Links">
                {NAV_ITEMS.map((item, idx) => {
                  const isActive = isHome
                    ? (item.sectionId
                        ? activeSection === item.sectionId
                        : item.path === "/github" && activeSection === "github")
                    : location.pathname === item.path;

                  return (
                    <motion.button
                      key={item.label}
                      type="button"
                      className={`mobile-drawer-link-btn ${isActive ? "is-active" : ""}`}
                      onClick={() => handleNavClick(item)}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.04 + idx * 0.04,
                        duration: 0.35,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <div className="mobile-link-left">
                        <span className="mobile-link-num">{item.num}</span>
                        <span className="mobile-link-label">{item.label}</span>
                        {isActive && <span className="mobile-link-dot" aria-hidden="true" />}
                      </div>
                      <ArrowUpRight size={18} className="mobile-link-arrow" aria-hidden="true" />
                    </motion.button>
                  );
                })}
              </nav>

              {/* Drawer Footer Actions */}
              <div className="mobile-drawer-footer">
                {/* Full-width Download CV Button */}
                <a
                  href={CV_HREF}
                  download="Thivanka_Tharuka_CV.pdf"
                  className="btn btn-primary mobile-drawer-cv-btn"
                  onClick={() => setOpen(false)}
                >
                  <Download size={16} />
                  <span>Download CV (PDF)</span>
                </a>

                {/* Social Icon Buttons Row */}
                <div className="mobile-drawer-socials" role="group" aria-label="Social Profiles">
                  <a
                    href={SITE.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mobile-social-btn"
                    aria-label="LinkedIn Profile"
                    title="LinkedIn"
                  >
                    <Linkedin size={20} />
                  </a>
                  <a
                    href={SITE.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mobile-social-btn"
                    aria-label="GitHub Profile"
                    title="GitHub"
                  >
                    <Github size={20} />
                  </a>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="mobile-social-btn"
                    aria-label="Direct Email"
                    title="Email"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </a>
                  <a
                    href={SITE.whatsappPrefillHref || SITE.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mobile-social-btn"
                    aria-label="WhatsApp Chat"
                    title="WhatsApp"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                    </svg>
                  </a>
                </div>

                {/* Live Status Chip with Sri Lanka Time */}
                <div className="mobile-drawer-status-chip">
                  <span className="drawer-status-pulse" aria-hidden="true" />
                  <span className="drawer-status-text">
                    Open to Opportunities · Sri Lanka <strong>{sriLankaTime}</strong>
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
