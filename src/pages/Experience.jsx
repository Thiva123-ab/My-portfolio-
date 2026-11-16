import { Calendar, Users, Award, ExternalLink, CheckCircle2 } from "lucide-react";
import Seo from "../components/Seo.jsx";
import Reveal from "../components/Reveal.jsx";
import EducationTimeline from "../components/EducationTimeline.jsx";
import { EXPERIENCE } from "../data/experience.js";

export default function Experience() {
  return (
    <>
      <Seo
        title="Experience & Academic Timeline"
        description="Volunteer, workshops, community attendance, and academic timeline — NSBM Green University, IDEATHON 1.0, AWS Student Community Day, IEEE DevForge, Hacktoberfest Hack Day."
        path="/experience"
      />
      <section className="section page-section">
        <div className="section-head">
          <span className="section-index">04</span>
          <Reveal as="h1" className="section-title">
            Experience &amp; Education
          </Reveal>
        </div>
        <p className="page-lead">
          Campus, community, and workshop participation. Titles strictly mirror the certificates, credentials,
          or registration badges awarded — zero inflated leadership claims.
        </p>

        {/* Education Timeline */}
        <div style={{ marginBottom: "56px" }}>
          <EducationTimeline />
        </div>

        {/* Community & Volunteer Experience Timeline */}
        <div className="section-subhead">
          <Users size={22} className="subhead-icon" />
          <div>
            <h3>Community, Hackathons &amp; Workshops</h3>
            <p>Practical organizing support, collaborative workshops, and technical attendance</p>
          </div>
        </div>

        <ol className="timeline">
          {EXPERIENCE.map((item, i) => (
            <Reveal as="li" className="timeline-item" key={item.org} delay={i * 0.06}>
              <div className="timeline-badge-row">
                <span className="timeline-kind">{item.kind}</span>
                <span className="timeline-date">
                  <Calendar size={13} /> {item.date}
                </span>
              </div>
              <h2 className="timeline-title">{item.title}</h2>
              <p className="timeline-org">{item.org}</p>
              <ul className="work-features timeline-points">
                {item.points.map((p) => (
                  <li key={p}>
                    <CheckCircle2 size={14} className="point-icon" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ol>
      </section>
    </>
  );
}
