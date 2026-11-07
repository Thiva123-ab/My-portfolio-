import { Link } from "react-router-dom";
import { SITE } from "../data/site.js";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-copy">
        <p>© {new Date().getFullYear()} {SITE.name}. Built for internship recruiting.</p>
        <nav className="footer-nav" aria-label="Footer">
          <Link to="/projects">Projects</Link>
          <Link to="/hackerrank">HackerRank</Link>
          <Link to="/resume">Resume</Link>
          <Link to="/contact">Contact</Link>
          <a href={SITE.github} target="_blank" rel="noopener noreferrer" data-cursor="hover">GitHub</a>
          <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" data-cursor="hover">LinkedIn</a>
        </nav>
      </div>
      <Link to="/" className="footer-top" data-cursor="hover">
        Back to top ↑
      </Link>
    </footer>
  );
}
