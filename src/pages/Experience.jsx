import Seo from "../components/Seo.jsx";
import Reveal from "../components/Reveal.jsx";
import { EXPERIENCE } from "../data/experience.js";

export default function Experience() {
  return (
    <>
      <Seo
        title="Experience"
        description="Honest campus and hackathon activity — intern candidate, Crisis Copilot hackathon, IDEATHON volunteer, AWS community attendee."
        path="/experience"
      />
      <section className="pro-section page-section">
        <div className="pro-head">
          <p>Experience</p>
          <Reveal as="h1">A clean timeline recruiters can trust</Reveal>
        </div>
        <p className="page-lead">
          No freelance book, Microsoft Student Ambassador, or AWS Student Builder leadership is claimed.
        </p>
        <ol className="pro-timeline pro-timeline-full">
          {EXPERIENCE.map((item, i) => (
            <Reveal as="li" key={item.org} delay={i * 0.06}>
              <span className="pro-dot" />
              <span className="pro-kind">{item.kind}</span>
              <span className="pro-when">{item.date}</span>
              <h2>{item.title}</h2>
              <p className="timeline-org">{item.org}</p>
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
