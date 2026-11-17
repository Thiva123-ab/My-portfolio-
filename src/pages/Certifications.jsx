import { useState } from "react";
import { Award, ExternalLink, Copy, Check } from "lucide-react";
import Seo from "../components/Seo.jsx";
import Card from "../components/Card.jsx";
import { CERTIFICATIONS } from "../data/certifications.js";

export default function Certifications() {
  const [copiedCode, setCopiedCode] = useState(null);

  const handleCopy = (code) => {
    if (!code) return;
    navigator.clipboard.writeText(code).then(() => {
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 1500);
    });
  };

  return (
    <>
      <Seo
        title="Certifications & Course Credentials"
        description="Verified credentials — UoM CODL Python, KodeKloud Kubernetes & Docker beginners, Hack Day attendance, IDEATHON appreciation, AWS Educate Cloud 101."
        path="/certifications"
      />
      <section className="section page-section">
        {/* Consistent Section Heading Pattern */}
        <div className="section-head">
          <span className="section-index">05</span>
          <h1 className="section-title">
            Certifications &amp; Credentials
          </h1>
        </div>
        <p className="page-lead max-w-2xl leading-relaxed">
          Verified course completions, lab training badges, and event attendance certificates.
          No Oracle certifications, Microsoft Student Ambassador status, or AWS associate/professional certs are claimed.
        </p>

        {/* Balanced Grid: 1 col on mobile, 2 col on sm/md, 4 col on lg (2 full rows of 4) */}
        <div className="cert-balanced-grid">
          {CERTIFICATIONS.map((c, i) => {
            const isCompleted = c.date === "Completed";
            const isCopied = copiedCode === c.code;

            return (
              <Card
                key={c.title}
                delay={i * 0.05}
                className="cert-credential-card h-full flex flex-col"
              >
                {/* 1. Top Row: Award Tile + Date / Status Pill */}
                <div className="cert-card-header">
                  <div className="cert-award-tile" aria-hidden="true">
                    <Award size={19} />
                  </div>
                  {isCompleted ? (
                    <span className="cert-status-pill status-completed">
                      Completed
                    </span>
                  ) : (
                    <span className="cert-status-pill status-date">
                      {c.date}
                    </span>
                  )}
                </div>

                {/* 2. Title: Up to 2 lines */}
                <h2 className="cert-card-title" title={c.title}>
                  {c.title}
                </h2>

                {/* 3. Issuer with subtle separator */}
                <p className="cert-card-issuer">
                  {c.issuer}
                </p>

                {/* 4. Credential ID with Copy to Clipboard Button */}
                {c.code && (
                  <div className="cert-code-inset" title={`Credential ID: ${c.code}`}>
                    <span className="cert-code-text truncate">
                      ID: {c.code}
                    </span>
                    <button
                      type="button"
                      className="cert-copy-btn"
                      onClick={() => handleCopy(c.code)}
                      aria-label={isCopied ? "Copied credential ID" : "Copy credential ID to clipboard"}
                      title={isCopied ? "Copied!" : "Copy ID"}
                    >
                      {isCopied ? (
                        <span className="cert-copied-msg">
                          <Check size={13} className="text-[#2DE2C8]" />
                          <span>Copied</span>
                        </span>
                      ) : (
                        <Copy size={13} />
                      )}
                    </button>
                  </div>
                )}

                {/* Notes/Disclaimers */}
                {c.note && (
                  <p className="cert-card-note">
                    {c.note}
                  </p>
                )}

                {/* 5. Bottom Link: View Credential (mt-auto) */}
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
      </section>
    </>
  );
}
