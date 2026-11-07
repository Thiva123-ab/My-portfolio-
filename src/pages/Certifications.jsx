import Seo from "../components/Seo.jsx";
import Reveal from "../components/Reveal.jsx";
import { CERTIFICATIONS } from "../data/certifications.js";

export default function Certifications() {
  return (
    <>
      <Seo
        title="Certifications"
        description="UoM CODL Python, KodeKloud Kubernetes beginners, Hack Day attendance, IDEATHON appreciation, AWS Educate Cloud 101."
        path="/certifications"
      />
      <section className="section page-section">
        <div className="section-head">
          <span className="section-index">Proof</span>
          <Reveal as="h1" className="section-title">Certifications</Reveal>
        </div>
        <p className="page-lead">
          Course and event credentials only. No Oracle, Microsoft Student Ambassador, or AWS associate/professional claims.
        </p>
        <div className="cert-grid">
          {CERTIFICATIONS.map((c, i) => (
            <Reveal as="article" className="cert-card" key={c.title} delay={i * 0.06}>
              <span className="cert-seal" aria-hidden="true">◆</span>
              <h2>{c.title}</h2>
              <p className="cert-issuer">{c.issuer}</p>
              <p className="cert-date">{c.date}</p>
              {c.code && <p className="cert-code">ID / code: {c.code}</p>}
              <p className="cert-note">{c.note}</p>
              {c.href && (
                <a className="work-link" href={c.href} target="_blank" rel="noopener noreferrer" data-cursor="hover">
                  Issuer site
                </a>
              )}
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
