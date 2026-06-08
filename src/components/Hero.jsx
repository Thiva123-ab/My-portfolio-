import Reveal from "./Reveal.jsx";
import useMagnetic from "../hooks/useMagnetic.js";
import profile from "../assets/profile.png";

const TITLE_LINES = [
  [{ text: "Full-Stack", cls: "shimmer" }],
  [{ text: "Developer", cls: "gradient-text" }],
  [
    { text: "&", cls: "shimmer" },
    { text: "Designer", cls: "shimmer" },
  ],
];

export default function Hero() {
  const primaryRef = useMagnetic(0.25);
  const ghostRef = useMagnetic(0.25);
  let charIndex = 0;

  return (
    <section className="hero" id="hero">
      <div className="hero-layout">
        <div className="hero-inner">
          <Reveal as="p" className="hero-eyebrow" delay={0}>
            <span className="ping" /> Available for new opportunities
          </Reveal>
          <h1 className="hero-title">
            {TITLE_LINES.map((line, li) => (
              <span className="line" key={li}>
                {line.map((w, wi) => (
                  <span className={`word ${w.cls}`} key={wi}>
                    {[...w.text].map((ch, ci) => (
                      <span
                        className="char"
                        key={ci}
                        style={{ animationDelay: `${charIndex++ * 0.04}s` }}
                      >
                        {ch}
                      </span>
                    ))}
                    {wi < line.length - 1 ? "\u00A0" : null}
                  </span>
                ))}
              </span>
            ))}
          </h1>
          <Reveal as="p" className="hero-sub" delay={0.2}>
            I’m <strong>Thivanka Tharuka</strong> — a full-stack software developer
            and Computer Science student at NSBM Green University, Sri Lanka. I build
            scalable, cloud-ready applications with a strong focus on clean
            architecture and intuitive design.
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

        <Reveal className="hero-portrait" delay={0.3}>
          <div className="portrait-frame">
            <span className="portrait-ring" aria-hidden="true" />
            <img src={profile} alt="Portrait of Thivanka Tharuka" loading="eager" />
            <span className="portrait-badge">
              <span className="ping" /> Open to work
            </span>
          </div>
        </Reveal>
      </div>

      <Reveal className="hero-scroll" delay={0.5}>
        <span>Scroll</span>
        <span className="hero-scroll-line" />
      </Reveal>
    </section>
  );
}
