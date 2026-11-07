import Seo from "../components/Seo.jsx";
import Reveal from "../components/Reveal.jsx";
import { EXPERIENCE } from "../data/experience.js";

export default function Experience() {
  return (
    <>
      <Seo
        title="Experience"
        description="Volunteer, workshops, and community attendance — IDEATHON 1.0, AWS Student Community Day, IEEE DevForge, Hacktoberfest Hack Day."
        path="/experience"
      />
      <section className="section page-section">
        <div className="section-head">
          <span className="section-index">Path</span>
          <Reveal as="h1" className="section-title">Experience</Reveal>
        </div>
        <p className="page-lead">
          Campus and community activity only. No freelance gigs are listed because none were provided for this site.
          Titles match the certificate or ticket — not inflated leadership.
        </p>
        <ol className="timeline">
          {EXPERIENCE.map((item, i) => (
            <Reveal as="li" className="timeline-item" key={item.org} delay={i * 0.08}>
              <span className="timeline-kind">{item.kind}</span>
              <h2>{item.title}</h2>
              <p className="timeline-org">{item.org}</p>
              <p className="timeline-date">{item.date}</p>
              <ul className="work-features">
                {item.points.map((p) => <li key={p}>{p}</li>)}
              </ul>
            </Reveal>
          ))}
        </ol>
      </section>
    </>
  );
}
