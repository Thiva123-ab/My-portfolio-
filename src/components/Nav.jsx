import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/projects", label: "Projects" },
  { to: "/experience", label: "Experience" },
  { to: "/certifications", label: "Certifications" },
  { to: "/resume", label: "Resume" },
  { to: "/contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className={`nav ${scrolled ? "scrolled" : ""}`}>
      <NavLink to="/" className="nav-logo" data-cursor="hover" onClick={() => setOpen(false)}>
        <span className="logo-mark">◆</span> Thivanka<span className="dot">.</span>
      </NavLink>
      {open && <button className="nav-backdrop" aria-label="Close menu" onClick={() => setOpen(false)} />}
      <nav className={`nav-links ${open ? "open" : ""}`} aria-label="Primary">
        {LINKS.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.end}
            data-cursor="hover"
            onClick={() => setOpen(false)}
          >
            {l.label}
          </NavLink>
        ))}
      </nav>
      <button
        className={`nav-toggle ${open ? "open" : ""}`}
        aria-label="Toggle menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span />
        <span />
      </button>
    </header>
  );
}
