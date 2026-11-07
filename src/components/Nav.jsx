import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const LINKS = [
  { to: "/", label: "About", end: true },
  { to: "/projects", label: "Projects" },
  { to: "/experience", label: "Experience" },
  { to: "/hackerrank", label: "HackerRank" },
  { to: "/contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className={`nav-pro ${scrolled ? "is-scrolled" : ""}`}>
      <NavLink to="/" className="nav-pro-logo" onClick={() => setOpen(false)}>
        <span className="nav-pro-mark" />
        Thivanka
      </NavLink>
      {open && <button className="nav-backdrop" aria-label="Close menu" onClick={() => setOpen(false)} />}
      <nav className={`nav-pro-links ${open ? "open" : ""}`} aria-label="Primary">
        {LINKS.map((l) => (
          <NavLink key={l.to} to={l.to} end={l.end} onClick={() => setOpen(false)}>
            {l.label}
          </NavLink>
        ))}
        <NavLink to="/resume" className="nav-pro-cta" onClick={() => setOpen(false)}>
          Resume
        </NavLink>
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
