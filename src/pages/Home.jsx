import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import Hero from "../components/Hero.jsx";
import Reveal from "../components/Reveal.jsx";
import { getFeatured } from "../data/projects.js";
import { EXPERIENCE } from "../data/experience.js";
import { CERTIFICATIONS } from "../data/certifications.js";
import { SITE } from "../data/site.js";

const TOOLS = [
  "Java", "Spring Boot", "MySQL", "React", "TypeScript",
  "Kotlin", "Docker", "AWS Educate", "Kubernetes (beginner)", "Git",
];

export default function Home() {
  const featured = getFeatured();

  return (
    <>
      <Seo path="/" />
      <Hero />

      <section className="pro-section" id="projects">
        <div className="pro-head">
          <p>Featured work</p>
          <h2>Projects recruiters can open on GitHub</h2>
        </div>
        <div className="pro-grid">
          {featured.map((p) => (
            <Reveal as="article" key={p.slug} className="pro-card">
              <h3>{p.title}</h3>
              <p>{p.blurb}</p>
              <div className="pro-chips">
                {p.tags.slice(0, 4).map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
              <div className="pro-card-links">
                <a href={p.github} target="_blank" rel="noopener noreferrer" aria-label={`View code for ${p.title}`}>
                  View code
                  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                    <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.46-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05A9.36 9.36 0 0 1 12 6.84c.85 0 1.71.12 2.51.34 1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.82 0 .27.18.6.69.49A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" fill="currentColor" />
                  </svg>
                </a>
                {p.caseStudy && <Link to={`/projects/${p.slug}`}>Case study</Link>}
              </div>
            </Reveal>
          ))}
        </div>
        <Link to="/projects" className="pro-more">All projects →</Link>
      </section>

      <section className="pro-section" id="experience">
        <div className="pro-head">
          <p>Path</p>
          <h2>Experience &amp; campus leadership — accurate titles only</h2>
        </div>
        <ol className="pro-timeline">
          {EXPERIENCE.slice(0, 4).map((item) => (
            <li key={item.org}>
              <span className="pro-dot" />
              <span className="pro-when">{item.date}</span>
              <h3>{item.title}</h3>
              <p>{item.org}</p>
            </li>
          ))}
        </ol>
        <Link to="/experience" className="pro-more">Full timeline →</Link>
      </section>

      <section className="pro-section" id="stack">
        <div className="pro-head">
          <p>Stack &amp; credentials</p>
          <h2>Tools I actually use, plus verifiable courses</h2>
        </div>
        <div className="pro-logos">
          {TOOLS.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        <div className="pro-certs">
          {CERTIFICATIONS.filter((c) => c.code || c.issuer.includes("AWS")).map((c) => (
            <article key={c.title}>
              <h3>{c.title}</h3>
              <p>{c.issuer}</p>
            </article>
          ))}
        </div>
        <p className="pro-fine">No Oracle, IBM, or associate AWS badges are listed. Docker is used in coursework; Kubernetes is KodeKloud beginners.</p>
      </section>

      <section className="pro-section pro-contact-band">
        <h2>Let’s talk at the fair</h2>
        <p>{SITE.email} · {SITE.whatsappDisplay}</p>
        <Link to="/contact" className="btn-pro btn-pro-primary">Contact</Link>
      </section>
    </>
  );
}
