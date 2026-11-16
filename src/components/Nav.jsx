import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Search, Volume2, VolumeX, Menu, X, Sun, Moon } from "lucide-react";

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
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  // Scroll detection for navbar background styling
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Issue #1 Fix: IntersectionObserver for navbar scroll-spy
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
      { rootMargin: "-30% 0px -60% 0px" }
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

      {open && (
        <button
          className="nav-backdrop"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
        />
      )}

      <nav className={`nav-links ${open ? "open" : ""}`} aria-label="Primary">
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

        {/* Mobile menu toggle */}
        <button
          className={`nav-toggle ${open ? "open" : ""}`}
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </header>
  );
}
