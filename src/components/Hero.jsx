import Reveal from "./Reveal.jsx";
import useMagnetic from "../hooks/useMagnetic.js";

export default function Hero() {
  const primaryRef = useMagnetic(0.25);
  const ghostRef = useMagnetic(0.25);

  return (
    <section className="hero" id="hero">
      <div className="hero-inner">
        <Reveal as="p" className="hero-eyebrow" delay={0}>
          <span className="ping" /> Available for new projects
        </Reveal>
        <h1 className="hero-title">
          <span className="line"><span className="word">Creative</span></span>
          <span className="line"><span className="word gradient-text">Developer</span></span>
          <span className="line"><span className="word">&amp; Designer</span></span>
        </h1>
        <Reveal as="p" className="hero-sub" delay={0.2}>
          I’m <strong>Thiva</strong> — I craft immersive, high-performance web
          experiences where bold design meets clean, scalable code.
        </Reveal>
        <Reveal className="hero-cta" delay={0.35}>
          <a ref={primaryRef} href="#work" className="btn btn-primary" data-cursor="hover">
            <span>View my work</span>
            <svg viewBox="0 0 24 24" width="18" height="18">
              <path
                d="M5 12h14M13 6l6 6-6 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <a ref={ghostRef} href="#contact" className="btn btn-ghost" data-cursor="hover">
            Get in touch
          </a>
        </Reveal>
      </div>
      <Reveal className="hero-scroll" delay={0.5}>
        <span>Scroll</span>
        <span className="hero-scroll-line" />
      </Reveal>
    </section>
  );
}
