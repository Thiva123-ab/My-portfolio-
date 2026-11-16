import { GraduationCap, Calendar, MapPin, CheckCircle2 } from "lucide-react";
import { EDUCATION } from "../data/education.js";

export default function EducationTimeline() {
  return (
    <div className="edu-timeline">
      <div className="edu-head">
        <GraduationCap className="edu-head-icon" size={24} />
        <div>
          <h3>Academic Background</h3>
          <p>Formal education &amp; certified foundations</p>
        </div>
      </div>

      <div className="edu-list">
        {EDUCATION.map((edu, idx) => (
          <div key={idx} className="edu-card">
            <div className="edu-card-top">
              <div>
                <h4 className="edu-degree">{edu.degree}</h4>
                <p className="edu-inst">{edu.institution}</p>
              </div>
              <div className="edu-meta-badges">
                <span className="edu-badge-period">
                  <Calendar size={13} /> {edu.period}
                </span>
                <span className="edu-badge-status">{edu.status}</span>
              </div>
            </div>

            <div className="edu-loc">
              <MapPin size={13} /> {edu.location}
            </div>

            <ul className="edu-points">
              {edu.details.map((point, pIdx) => (
                <li key={pIdx}>
                  <CheckCircle2 size={14} className="point-check" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
