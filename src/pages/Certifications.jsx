import { Award, ExternalLink, ShieldCheck, CheckCircle2 } from "lucide-react";
import Seo from "../components/Seo.jsx";
import Reveal from "../components/Reveal.jsx";
import { CERTIFICATIONS } from "../data/certifications.js";

export default function Certifications() {
  return (
    <>
      <Seo
        title="Certifications & Course Credentials"
        description="Verified credentials — UoM CODL Python, KodeKloud Kubernetes & Docker beginners, Hack Day attendance, IDEATHON appreciation, AWS Educate Cloud 101."
        path="/certifications"
      />
      <section className="section page-section">
        <div className="section-head">
          <span className="section-index">05</span>
          <Reveal as="h1" className="section-title">
            Certifications &amp; Credentials
          </Reveal>
        </div>
        <p className="page-lead">
          Verified course completions, lab training badges, and event attendance certificates.
          No Oracle certifications, Microsoft Student Ambassador status, or AWS associate/professional certs are claimed.
        </p>

        <div className="cert-grid">
          {CERTIFICATIONS.map((c, i) => (
            <Reveal as="article" className="cert-card" key={c.title} delay={i * 0.05}>
              <div className="cert-card-top">
                <div className="cert-icon-badge">
                  <Award size={20} />
                </div>
                <span className="cert-date-tag">{c.date}</span>
              </div>

              <h2 className="cert-title">{c.title}</h2>
              <p className="cert-issuer">{c.issuer}</p>

              {c.code && (
                <div className="cert-code-box">
                  <ShieldCheck size={14} className="code-shield" />
                  <span>Credential ID: <strong>{c.code}</strong></span>
                </div>
              )}

              <p className="cert-note">{c.note}</p>

              {c.href && (
                <div className="cert-actions">
                  <a
                    className="btn btn-ghost btn-sm"
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="hover"
                  >
                    <span>Verify Credential</span>
                    <ExternalLink size={13} />
                  </a>
                </div>
              )}
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
