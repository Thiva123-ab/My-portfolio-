import { Link } from "react-router-dom";
import { Award, ArrowRight } from "lucide-react";
import Reveal from "./Reveal.jsx";
import { CERTIFICATIONS } from "../data/certifications.js";

export default function CertStrip() {
  return (
    <section className="section cert-strip" id="certstrip">
      <div className="section-head">
        <span className="section-index">05</span>
        <Reveal as="h2" className="section-title">
          Certifications &amp; Credentials
        </Reveal>
      </div>
      <p className="section-lead">
        Verified certifications in Python, foundational cloud labs, and developer event attendance.
      </p>

      <div className="cert-strip-grid">
        {CERTIFICATIONS.map((c, i) => (
          <Reveal as="article" className="cert-mini" key={c.title} delay={i * 0.05}>
            <div className="cert-mini-top">
              <Award size={18} className="cert-mini-icon" />
              <span className="cert-mini-date">{c.date}</span>
            </div>
            <h3>{c.title}</h3>
            <p className="cert-mini-issuer">{c.issuer}</p>
            {c.code && <span className="cert-mini-code">ID: {c.code}</span>}
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2} className="section-more">
        <Link to="/certifications" className="btn btn-ghost" data-cursor="hover">
          <span>View Verified Credentials</span>
          <ArrowRight size={15} />
        </Link>
      </Reveal>
    </section>
  );
}
