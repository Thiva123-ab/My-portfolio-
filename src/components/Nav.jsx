import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Search, Volume2, VolumeX, Menu, X, Download, Mail, ExternalLink } from "lucide-react";
import { Github, Linkedin } from "./BrandIcons.jsx";
import { SITE, CV_HREF } from "../data/site.js";

const NAV_ITEMS = [
  { path: "/", sectionId: "hero", label: "Home" },
  { path: "/#about", sectionId: "about", label: "About" },
  { path: "/#skills", sectionId: "skills", label: "Skills" },
  { path: "/projects", sectionId: "work", label: "Projects" },
  { path: "/experience", label: "Experience" },
  { path: "/certifications", label: "Certifications" },
  { path: "/resume", label: "Resume" },
  { path: "/contact", label: "Contact" },
];

export default function Nav({ onOpenCmd, soundEnabled, onToggleSound }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const menuRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  // Compact navbar height on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll and handle Escape key for accessibility when mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    const handleKeyDown = (e) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  // Navbar scroll-spy for home sections
  useEffect(() => {
    if (!isHome) return;

    const sections = ["hero", "about", "skills", "work", "certstrip", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -55% 0px" }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isHome]);

  const handleNavClick = (item) => {
    setOpen(false);
    if (item.sectionId && isHome) {
      const el = document.getElementById(item.sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    navigate(item.path);
  };

  return (
    <header className={`nav ${scrolled ? "scrolled" : ""}`}>
      <NavLink
        to="/"
        className="nav-logo"
        data-cursor="hover"
        onClick={() => {
          setOpen(false);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        <span className="logo-mark">◆</span>
        <span>Thivanka</span>
        <span className="dot">.</span>
      </NavLink>

      {/* Desktop Horizontal Navigation (> 1024px) */}
      <nav className="nav-links desktop-only" aria-label="Primary desktop navigation">
        {NAV_ITEMS.map((item) => {
          const isActive = isHome
            ? (item.sectionId ? activeSection === item.sectionId : false)
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

      {/* Controls: Search, Audio, Mobile Hamburger */}
      <div className="nav-actions">
        {/* Command Palette Trigger */}
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

        {/* Sound Toggle (Default OFF, Persisted) */}
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

        {/* Mobile menu toggle (Visible below 1024px) */}
        <button
          className={`nav-toggle ${open ? "open" : ""}`}
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile & Tablet Full-Screen Drawer (< 1024px) */}
      {open && (
        <div className="mobile-menu-overlay" onClick={() => setOpen(false)}>
          <div
            className="mobile-menu-drawer"
            ref={menuRef}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Drawer"
          >
            <div className="mobile-menu-head">
              <span className="mobile-menu-brand">
                <span className="logo-mark">◆</span> Thivanka<span className="dot">.</span>
              </span>
              <button
                type="button"
                className="mobile-close-btn"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>

            <nav className="mobile-nav-list" aria-label="Mobile Navigation">
              {NAV_ITEMS.map((item, idx) => {
                const isActive = isHome
                  ? (item.sectionId ? activeSection === item.sectionId : false)
                  : location.pathname === item.path;

                return (
                  <button
                    key={item.label}
                    type="button"
                    className={`mobile-nav-link ${isActive ? "active" : ""}`}
                    onClick={() => handleNavClick(item)}
                    style={{ animationDelay: `${idx * 0.04}s` }}
                  >
                    <span className="mobile-nav-num">0{idx + 1}</span>
                    <span className="mobile-nav-label">{item.label}</span>
                  </button>
                );
              })}
            </nav>

            <div className="mobile-menu-footer">
              <a
                href={CV_HREF}
                download="Thivanka_Tharuka_CV.pdf"
                className="btn btn-primary btn-mobile-cv"
                onClick={() => setOpen(false)}
              >
                <Download size={16} />
                <span>Download CV (PDF)</span>
              </a>

              <div className="mobile-social-row">
                <a
                  href={SITE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mobile-social-icon"
                  aria-label="GitHub Profile"
                >
                  <Github size={20} />
                </a>
                <a
                  href={SITE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mobile-social-icon"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href={`mailto:${SITE.email}`}
                  className="mobile-social-icon"
                  aria-label="Send Email"
                >
                  <Mail size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
