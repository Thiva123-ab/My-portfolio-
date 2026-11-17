import { Link } from "react-router-dom";
import { Award, ArrowRight, ExternalLink } from "lucide-react";
import Card from "./Card.jsx";
import { CERTIFICATIONS } from "../data/certifications.js";

export default function CertStrip() {
  // Show first 4 on home for a clean single row on desktop, 2x2 on tablet
  const previewCerts = CERTIFICATIONS.slice(0, 4);

  return (
    <section className="section cert-strip-section" id="certstrip">
      <div className="section-head">
        <span className="section-index">05</span>
        <h2 className="section-title">
          Certifications &amp; Credentials
        </h2>
      </div>
      <p className="section-lead max-w-2xl leading-relaxed">
        Verified certifications in Python, foundational cloud labs, and developer event attendance.
      </p>

      <div className="cert-strip-grid">
        {previewCerts.map((c, i) => {
          const isCompleted = c.date === "Completed";
          return (
            <Card key={c.title} delay={i * 0.05} className="cert-strip-card h-full flex flex-col">
              <div className="cert-card-header">
                <div className="cert-award-tile" aria-hidden="true">
                  <Award size={18} />
                </div>
                {isCompleted ? (
                  <span className="cert-status-pill status-completed">Completed</span>
                ) : (
                  <span className="cert-status-pill status-date">{c.date}</span>
                )}
              </div>

              <h3 className="cert-card-title">{c.title}</h3>
              <p className="cert-card-issuer">{c.issuer}</p>

              {c.code && (
                <div className="cert-code-inset" title={`Credential ID: ${c.code}`}>
                  <span className="cert-code-text truncate">ID: {c.code}</span>
                </div>
              )}

              {c.href && (
                <div className="cert-card-footer mt-auto">
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cert-external-link"
                    data-cursor="hover"
                  >
                    <span>View credential</span>
                    <ExternalLink size={13} />
                  </a>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      <div className="section-more">
        <Link to="/certifications" className="btn btn-primary" data-cursor="hover">
          <span>Explore All 8 Verified Credentials</span>
          <ArrowRight size={15} />
        </Link>
      </div>
    </section>
  );
}
