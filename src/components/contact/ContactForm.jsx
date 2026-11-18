import { useState, useRef, useEffect } from "react";
import { Send, CheckCircle2, AlertCircle, Clock, Loader2, Sparkles, RefreshCw } from "lucide-react";
import { SITE } from "../../data/site.js";

const QUICK_SUBJECTS = [
  "Internship Opportunity",
  "Project Collaboration",
  "Technical Inquiry",
  "Other Inquiry",
];

const MAX_MESSAGE_LENGTH = 1000;

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    hp: "", // Honeypot field
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // "success" | "error" | null
  const [errorMessage, setErrorMessage] = useState("");
  const [mountedAt, setMountedAt] = useState(0);

  const textareaRef = useRef(null);

  useEffect(() => {
    setMountedAt(Date.now());
  }, []);

  // Auto-grow textarea
  const handleMessageChange = (e) => {
    const val = e.target.value;
    if (val.length <= MAX_MESSAGE_LENGTH) {
      setFormData((prev) => ({ ...prev, message: val }));
      if (fieldErrors.message) {
        setFieldErrors((prev) => ({ ...prev, message: null }));
      }
    }

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.max(140, textareaRef.current.scrollHeight)}px`;
    }
  };

  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = "Please enter your name.";
    }

    const emailTrimmed = formData.email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailTrimmed) {
      errors.email = "Please enter your email address.";
    } else if (!emailRegex.test(emailTrimmed)) {
      errors.email = "Please provide a valid email address.";
    }

    if (!formData.message.trim()) {
      errors.message = "Please write a message.";
    } else if (formData.message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSelectQuickSubject = (subj) => {
    setFormData((prev) => ({ ...prev, subject: subj }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          renderedAt: mountedAt,
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (response.ok && result.success) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "", hp: "" });
      } else {
        throw new Error(result.error || "Failed to send message via server.");
      }
    } catch (err) {
      console.warn("[Contact Form] API delivery issue:", err.message);
      setSubmitStatus("error");
      setErrorMessage(err.message || "Failed to transmit message.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setSubmitStatus(null);
    setFormData({ name: "", email: "", subject: "", message: "", hp: "" });
    setFieldErrors({});
  };

  // Fallback mailto link in case of network issue
  const fallbackMailto = `mailto:${SITE.email}?subject=${encodeURIComponent(
    formData.subject || `Inquiry from ${formData.name || "Portfolio Visitor"}`
  )}&body=${encodeURIComponent(
    `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
  )}`;

  return (
    <div className="contact-form-card" role="region" aria-label="Direct Message Form">
      {/* Decorative gradient glow effect */}
      <div className="contact-form-card-glow" aria-hidden="true" />

      {/* Header */}
      <div className="contact-form-header">
        <h3 className="contact-form-title">Send a Direct Message</h3>
        <div className="contact-form-reply-badge">
          <Clock size={13} className="text-teal shrink-0" aria-hidden="true" />
          <span>Replies typically within 24–48 hours</span>
        </div>
      </div>

      {submitStatus === "success" ? (
        <div className="contact-form-success" role="status" aria-live="polite">
          <div className="contact-success-icon-wrap" aria-hidden="true">
            <CheckCircle2 size={36} className="text-teal" />
          </div>
          <h4 className="contact-success-title">Message Sent Successfully!</h4>
          <p className="contact-success-desc">
            Thank you for reaching out. I’ve received your message and will review it and reply within 24–48 hours.
          </p>
          <button
            type="button"
            className="btn btn-ghost btn-sm mt-4"
            onClick={handleResetForm}
            data-cursor="hover"
          >
            <RefreshCw size={14} />
            <span>Send Another Message</span>
          </button>
        </div>
      ) : (
        <form className="contact-form-body" onSubmit={handleSubmit} noValidate>
          {/* Honeypot field for anti-spam bots */}
          <div style={{ display: "none" }} aria-hidden="true">
            <label htmlFor="contact-hp">Leave this field blank</label>
            <input
              id="contact-hp"
              type="text"
              name="hp"
              value={formData.hp}
              onChange={(e) => setFormData({ ...formData, hp: e.target.value })}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {/* Row 1: Name and Email */}
          <div className="contact-form-row">
            <div className="contact-field-group">
              <label htmlFor="contact-name" className="contact-field-label">
                Your Name <span className="text-teal">*</span>
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                enterKeyHint="next"
                className={`contact-input ${fieldErrors.name ? "has-error" : ""}`}
                placeholder="e.g. Alex Silva"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  if (fieldErrors.name) setFieldErrors({ ...fieldErrors, name: null });
                }}
                aria-invalid={!!fieldErrors.name}
                aria-describedby={fieldErrors.name ? "contact-name-error" : undefined}
                required
              />
              {fieldErrors.name && (
                <span id="contact-name-error" className="contact-field-error" role="alert">
                  {fieldErrors.name}
                </span>
              )}
            </div>

            <div className="contact-field-group">
              <label htmlFor="contact-email" className="contact-field-label">
                Email Address <span className="text-teal">*</span>
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                enterKeyHint="next"
                className={`contact-input ${fieldErrors.email ? "has-error" : ""}`}
                placeholder="alex@company.com"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: null });
                }}
                aria-invalid={!!fieldErrors.email}
                aria-describedby={fieldErrors.email ? "contact-email-error" : undefined}
                required
              />
              {fieldErrors.email && (
                <span id="contact-email-error" className="contact-field-error" role="alert">
                  {fieldErrors.email}
                </span>
              )}
            </div>
          </div>

          {/* Row 2: Subject with Quick-Pick Chips */}
          <div className="contact-field-group">
            <div className="contact-subject-header">
              <label htmlFor="contact-subject" className="contact-field-label">
                Subject <span className="contact-field-optional">(Optional)</span>
              </label>
              <span className="contact-chips-hint">Quick picks:</span>
            </div>

            <div className="contact-quick-chips" role="group" aria-label="Quick subject selections">
              {QUICK_SUBJECTS.map((qs) => {
                const isSelected = formData.subject === qs;
                return (
                  <button
                    key={qs}
                    type="button"
                    className={`contact-chip ${isSelected ? "is-selected" : ""}`}
                    onClick={() => handleSelectQuickSubject(qs)}
                  >
                    <span>{qs}</span>
                  </button>
                );
              })}
            </div>

            <input
              id="contact-subject"
              name="subject"
              type="text"
              enterKeyHint="next"
              className="contact-input"
              placeholder="e.g. Software Engineering Internship / Team Inquiry"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            />
          </div>

          {/* Row 3: Message Textarea */}
          <div className="contact-field-group">
            <div className="contact-textarea-header">
              <label htmlFor="contact-message" className="contact-field-label">
                Message <span className="text-teal">*</span>
              </label>
              <span
                className={`contact-char-count ${
                  formData.message.length >= MAX_MESSAGE_LENGTH ? "is-limit" : ""
                }`}
                aria-live="polite"
              >
                {formData.message.length} / {MAX_MESSAGE_LENGTH}
              </span>
            </div>

            <textarea
              id="contact-message"
              name="message"
              ref={textareaRef}
              rows={4}
              enterKeyHint="send"
              className={`contact-textarea ${fieldErrors.message ? "has-error" : ""}`}
              placeholder="Describe your opportunity, team requirements, or technical inquiry..."
              value={formData.message}
              onChange={handleMessageChange}
              aria-invalid={!!fieldErrors.message}
              aria-describedby={fieldErrors.message ? "contact-message-error" : undefined}
              required
            />
            {fieldErrors.message && (
              <span id="contact-message-error" className="contact-field-error" role="alert">
                {fieldErrors.message}
              </span>
            )}
          </div>

          {/* Inline Error Banner if Submission Failed */}
          {submitStatus === "error" && (
            <div className="contact-error-banner" role="alert">
              <AlertCircle size={18} className="shrink-0 text-accent-3" />
              <div className="contact-error-text">
                <p>{errorMessage || "Failed to transmit message."}</p>
                <a href={fallbackMailto} className="contact-fallback-link">
                  Click here to send directly via your email client →
                </a>
              </div>
            </div>
          )}

          {/* Submit Action */}
          <div className="contact-submit-wrap">
            <button
              type="submit"
              className="btn btn-primary btn-contact-submit"
              disabled={isSubmitting}
              data-cursor="hover"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Transmitting Message...</span>
                </>
              ) : (
                <>
                  <Send size={16} className="contact-send-icon" />
                  <span>Send Message</span>
                </>
              )}
            </button>

            <span className="contact-privacy-note">
              Your details are used solely to reply to this inquiry. No tracking or marketing lists.
            </span>
          </div>
        </form>
      )}
    </div>
  );
}
