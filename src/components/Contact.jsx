import { useState } from "react";
import { Mail, MessageSquare, Send, Check, Copy, ExternalLink, ShieldCheck } from "lucide-react";
import Reveal from "./Reveal.jsx";
import useMagnetic from "../hooks/useMagnetic.js";
import { SITE } from "../data/site.js";

const SOCIALS = [
  { key: "email", label: "Email", handle: SITE.email, href: `mailto:${SITE.email}`, icon: "mail" },
  { key: "whatsapp", label: "WhatsApp", handle: SITE.whatsappDisplay, href: SITE.whatsappHref, icon: "whatsapp" },
  { key: "linkedin", label: "LinkedIn", handle: "Thivanka Tharuka", href: SITE.linkedin, icon: "linkedin" },
  { key: "github", label: "GitHub", handle: "@Thiva123-ab", href: SITE.github, icon: "github" },
];

export default function Contact() {
  const emailRef = useMagnetic(0.2);
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "", honeypot: "" });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // "success" | "error" | null

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText(SITE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.honeypot) {
      // Spam honeypot triggered silently
      setStatus("success");
      return;
    }

    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      return;
    }

    setSubmitting(true);
    // Standard mailto link preparation or endpoint fallback
    try {
      const mailtoUrl = `mailto:${SITE.email}?subject=${encodeURIComponent(
        formData.subject || `Message from ${formData.name}`
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;
      window.location.href = mailtoUrl;
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "", honeypot: "" });
    } catch {
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="section contact" id="contact">
      <div className="section-head">
        <span className="section-index">06</span>
        <Reveal as="h2" className="section-title">
          Let’s Connect
        </Reveal>
      </div>

      <div className="contact-grid-container">
        <Reveal className="contact-info-col" delay={0.1}>
          <p className="contact-lead">
            Have an internship opportunity, technical inquiry, or collaborative project?
            Reach out directly via email, message on WhatsApp, or connect on LinkedIn. Sri Lanka timezone (UTC+5:30).
          </p>

          <div className="contact-primary-email-box">
            <a ref={emailRef} href={`mailto:${SITE.email}`} className="contact-email" data-cursor="hover">
              {SITE.email}
            </a>
            <button
              type="button"
              className="btn btn-ghost btn-sm copy-email-btn"
              onClick={handleCopyEmail}
              data-cursor="hover"
              aria-label="Copy email address"
            >
              {copied ? (
                <>
                  <Check size={14} className="copied-check" />
                  <span>Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy size={14} />
                  <span>Copy Email</span>
                </>
              )}
            </button>
          </div>

          <div className="contact-socials">
            {SOCIALS.map((s) => {
              const external = s.href.startsWith("http");
              return (
                <a
                  key={s.key}
                  href={s.href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="social-card"
                  data-cursor="hover"
                  aria-label={s.label}
                >
                  <span className="social-text">
                    <span className="social-label">{s.label}</span>
                    <span className="social-handle">{s.handle}</span>
                  </span>
                  <ExternalLink size={15} className="social-arrow" />
                </a>
              );
            })}
          </div>
        </Reveal>

        {/* Contact Form with Spam Honeypot */}
        <Reveal className="contact-form-col" delay={0.2}>
          <form className="contact-form" onSubmit={handleSubmit}>
            <h3>Send a Direct Message</h3>
            <p className="form-subtext">Replies are typically sent within 24–48 hours.</p>

            {/* Anti-spam Honeypot field (hidden from real users) */}
            <div style={{ display: "none" }} aria-hidden="true">
              <label htmlFor="form-hp">Do not fill this field</label>
              <input
                id="form-hp"
                type="text"
                value={formData.honeypot}
                onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div className="form-row">
              <div className="form-field">
                <label htmlFor="form-name">Your Name *</label>
                <input
                  id="form-name"
                  type="text"
                  required
                  placeholder="e.g. Alex Silva"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-field">
                <label htmlFor="form-email">Email Address *</label>
                <input
                  id="form-email"
                  type="email"
                  required
                  placeholder="alex@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="form-subject">Subject</label>
              <input
                id="form-subject"
                type="text"
                placeholder="Software Engineering Internship / Project Discussion"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              />
            </div>

            <div className="form-field">
              <label htmlFor="form-msg">Message *</label>
              <textarea
                id="form-msg"
                rows={4}
                required
                placeholder="Describe your project, team opportunity, or inquiry..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>

            <button type="submit" className="btn btn-primary btn-submit" disabled={submitting} data-cursor="hover">
              <Send size={15} />
              <span>{submitting ? "Opening Email Client..." : "Send Message"}</span>
            </button>

            {status === "success" && (
              <div className="form-status success">
                <Check size={16} />
                <span>Message client launched successfully! Looking forward to talking.</span>
              </div>
            )}
            {status === "error" && (
              <div className="form-status error">
                <span>Please ensure all required fields are filled out correctly.</span>
              </div>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
