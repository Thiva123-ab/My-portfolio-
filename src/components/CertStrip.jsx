import { Link } from "react-router-dom";
import Reveal from "./Reveal.jsx";
import { CERTIFICATIONS } from "../data/certifications.js";

export default function CertStrip() {
  return (
    <section className="section cert-strip" id="certs">
      <div className="section-head">
        <span className="section-index">04</span>
        <Reveal as="h2" className="section-title">Certifications</Reveal>
      </div>
      <div className="cert-strip-grid">
        {CERTIFICATIONS.map((c, i) => (
          <Reveal as="article" className="cert-mini" key={c.title} delay={i * 0.06}>
            <h3>{c.title}</h3>
            <p>{c.issuer}</p>
            <span>{c.date}</span>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.2}>
        <Link to="/certifications" className="work-link" data-cursor="hover">
          Full certification grid →
        </Link>
      </Reveal>
    </section>
  );
}
