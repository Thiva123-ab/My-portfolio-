import { useState } from "react";
import { Mail, Check, Copy, ExternalLink, Calendar, Download, Sparkles, Send } from "lucide-react";
import Reveal from "./Reveal.jsx";
import ContactChannelCards from "./contact/ContactChannelCards.jsx";
import ContactForm from "./contact/ContactForm.jsx";
import useSriLankaTime from "./contact/useSriLankaTime.js";
import { downloadVCard } from "./contact/vcard.js";
import { SITE } from "../data/site.js";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const sriLankaTime = useSriLankaTime();

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText(SITE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  return (
    <section className="section contact-section" id="contact" aria-labelledby="contact-heading">
      {/* Background radial glow */}
      <div className="contact-bg-glow" aria-hidden="true" />

      {/* Consistent Section Header */}
      <div className="section-head">
        <span className="section-index">06</span>
        <div className="contact-heading-wrap">
          <Reveal as="h2" id="contact-heading" className="section-title">
            Let’s Connect
          </Reveal>
          <span className="contact-eyebrow-tag">Open For Inquiries</span>
        </div>
      </div>

      <div className="contact-main-grid">
        {/* =========================================================
            LEFT COLUMN (5 / 12 on Desktop)
            Intro, Primary Email, Live Sri Lanka Status, 2x2 Channels, vCard
            ========================================================= */}
        <div className="contact-left-col">
          <Reveal delay={0.05}>
            <p className="contact-lead-text">
              Have an internship opportunity, full-stack software project, or technical inquiry?
              Reach out directly through any of the channels below. Replies are sent within 24–48 hours.
            </p>
          </Reveal>

          {/* Primary Email Showcase Box */}
          <Reveal delay={0.1}>
            <div className="contact-primary-email-card">
              <span className="contact-card-eyebrow">PRIMARY INBOX</span>

              <div className="contact-email-row">
                <a
                  href={`mailto:${SITE.email}`}
                  className="contact-email-link"
                  data-cursor="hover"
                  title="Send email via mailto"
                >
                  <span className="contact-email-text">{SITE.email}</span>
                </a>

                <div className="contact-email-actions">
                  <button
                    type="button"
                    className={`btn btn-ghost btn-sm contact-action-btn ${copied ? "is-copied" : ""}`}
                    onClick={handleCopyEmail}
                    data-cursor="hover"
                    aria-label="Copy email address to clipboard"
                  >
                    {copied ? (
                      <>
                        <Check size={14} className="text-teal" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        <span>Copy</span>
                      </>
                    )}
                  </button>

                  <a
                    href={`mailto:${SITE.email}`}
                    className="btn btn-primary btn-sm contact-action-btn"
                    data-cursor="hover"
                    title="Open default email application"
                  >
                    <Send size={13} />
                    <span>Send</span>
                  </a>
                </div>
              </div>

              {/* Accessible live region for copy confirmation */}
              <div className="sr-only" aria-live="polite">
                {copied ? "Email address copied to clipboard." : ""}
              </div>
            </div>
          </Reveal>

          {/* Live Status & Timezone Chip */}
          <Reveal delay={0.15}>
            <div className="contact-status-chip" role="status" aria-label="Availability and local time">
              <div className="contact-status-left">
                <span className="contact-live-pulse" aria-hidden="true">
                  <span className="contact-pulse-ring" />
                  <span className="contact-pulse-dot" />
                </span>
                <span className="contact-status-text">{SITE.availability || "Open to Opportunities"}</span>
              </div>

              <span className="contact-status-sep" aria-hidden="true">·</span>

              <div className="contact-status-right">
                <span className="contact-location-flag" aria-hidden="true">🇱🇰</span>
                <span className="contact-time-text">
                  Sri Lanka: <strong>{sriLankaTime}</strong>
                </span>
              </div>
            </div>
          </Reveal>

          {/* 2x2 Aligned Communication Channels Grid */}
          <Reveal delay={0.2}>
            <ContactChannelCards />
          </Reveal>

          {/* Extra Utilities: Download vCard & Optional Calendly Slot */}
          <Reveal delay={0.25}>
            <div className="contact-extras-row">
              <button
                type="button"
                className="contact-extra-link"
                onClick={downloadVCard}
                data-cursor="hover"
                title="Save verified contact information to your address book"
              >
                <Download size={14} className="contact-extra-icon" />
                <span>Save Contact (vCard .vcf)</span>
              </button>

              {/* [ADD: Calendly / cal.com link] - Renders only when a valid calLink URL is provided in site.js */}
              {SITE.calLink && (
                <a
                  href={SITE.calLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-extra-link"
                  data-cursor="hover"
                >
                  <Calendar size={14} className="contact-extra-icon" />
                  <span>Book a 15-min chat</span>
                  <ExternalLink size={12} className="opacity-60" />
                </a>
              )}
            </div>
          </Reveal>
        </div>

        {/* =========================================================
            RIGHT COLUMN (7 / 12 on Desktop)
            Direct Message Form with rotating gradient glass card
            ========================================================= */}
        <div className="contact-right-col">
          <Reveal delay={0.15}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
