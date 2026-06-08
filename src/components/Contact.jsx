import Reveal from "./Reveal.jsx";
import useMagnetic from "../hooks/useMagnetic.js";

const ICONS = {
  github: (
    <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.46-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05A9.36 9.36 0 0 1 12 6.84c.85 0 1.71.12 2.51.34 1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.82 0 .27.18.6.69.49A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
  ),
  linkedin: (
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.64h.05c.53-1 1.83-2.06 3.76-2.06C21.4 8.58 22 11.09 22 14.35V21h-4v-5.86c0-1.4-.03-3.2-1.95-3.2-1.96 0-2.26 1.53-2.26 3.1V21h-4V9Z" />
  ),
  email: (
    <path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm9 7.01L4.4 7h15.2L12 12.01ZM4 8.24V18h16V8.24l-7.4 4.9a1 1 0 0 1-1.2 0L4 8.24Z" />
  ),
  whatsapp: (
    <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.48 1.34 5L2 22l5.18-1.36a9.9 9.9 0 0 0 4.86 1.24h.01c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2Zm0 18.13h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.08.81.82-3-.2-.31a8.13 8.13 0 0 1-1.25-4.34c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.69 8.23-8.23 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z" />
  ),
};

const SOCIALS = [
  {
    key: "github",
    label: "GitHub",
    handle: "@Thiva123-ab",
    href: "https://github.com/Thiva123-ab",
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    handle: "Thivanka Tharuka",
    href: "https://www.linkedin.com/in/thivanka-tharuka",
  },
  {
    key: "whatsapp",
    label: "WhatsApp",
    handle: "+94 71 735 9120",
    href: "https://wa.me/94717359120",
  },
  {
    key: "email",
    label: "Email",
    handle: "thivankatharuka36@gmail.com",
    href: "mailto:thivankatharuka36@gmail.com",
  },
];

export default function Contact() {
  const emailRef = useMagnetic(0.2);

  return (
    <section className="section contact" id="contact">
      <div className="section-head">
        <span className="section-index">04</span>
        <Reveal as="h2" className="section-title">Let’s build something</Reveal>
      </div>
      <Reveal className="contact-inner" delay={0.1}>
        <p className="contact-lead">
          Have a project in mind or just want to say hi? My inbox is always open.
        </p>
        <a ref={emailRef} href="mailto:thivankatharuka36@gmail.com" className="contact-email" data-cursor="hover">
          thivankatharuka36@gmail.com
        </a>
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
                <span className="social-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                    {ICONS[s.key]}
                  </svg>
                </span>
                <span className="social-text">
                  <span className="social-label">{s.label}</span>
                  <span className="social-handle">{s.handle}</span>
                </span>
                <svg className="social-arrow" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                  <path d="M7 17 17 7M9 7h8v8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}
