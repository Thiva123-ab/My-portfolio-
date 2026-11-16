import { Link } from "react-router-dom";
import { ArrowUp, Mail, ExternalLink } from "lucide-react";
import { SITE } from "../data/site.js";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top-row">
          <div className="footer-brand">
            <span className="footer-logo">
              <span className="logo-mark">◆</span> Thivanka<span className="dot">.</span>
            </span>
            <p className="footer-tagline">
              Architecting full-stack systems with Java, Spring Boot, React, and Kotlin.
              CS Undergraduate at NSBM Green University.
            </p>
          </div>

          <nav className="footer-nav-grid" aria-label="Footer navigation">
            <div className="footer-nav-group">
              <span className="footer-group-title">Navigation</span>
              <Link to="/" data-cursor="hover">Home</Link>
              <Link to="/projects" data-cursor="hover">Projects Portfolio</Link>
              <Link to="/experience" data-cursor="hover">Experience &amp; Education</Link>
              <Link to="/certifications" data-cursor="hover">Certifications</Link>
              <Link to="/resume" data-cursor="hover">Curriculum Vitae</Link>
              <Link to="/contact" data-cursor="hover">Contact</Link>
            </div>

            <div className="footer-nav-group">
              <span className="footer-group-title">Connect</span>
              <a href={SITE.github} target="_blank" rel="noopener noreferrer" data-cursor="hover">
                GitHub ↗
              </a>
              <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" data-cursor="hover">
                LinkedIn ↗
              </a>
              <a href={SITE.whatsappHref} target="_blank" rel="noopener noreferrer" data-cursor="hover">
                WhatsApp ↗
              </a>
              <a href={`mailto:${SITE.email}`} data-cursor="hover">
                Direct Email ↗
              </a>
            </div>
          </nav>
        </div>

        <div className="footer-bottom-bar">
          <p className="footer-crafted">
            Designed &amp; built by <strong>{SITE.name}</strong> · © {new Date().getFullYear()} All rights reserved.
          </p>

          <button
            type="button"
            className="footer-back-to-top"
            onClick={scrollToTop}
            data-cursor="hover"
            aria-label="Scroll back to top"
          >
            <span>Back to top</span>
            <ArrowUp size={15} />
          </button>
        </div>
      </div>
    </footer>
  );
}
