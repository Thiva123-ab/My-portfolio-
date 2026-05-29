import Reveal from "./Reveal.jsx";
import useMagnetic from "../hooks/useMagnetic.js";

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/Thiva123-ab" },
  { label: "LinkedIn", href: "#" },
  { label: "Twitter / X", href: "#" },
  { label: "Dribbble", href: "#" },
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
        <a ref={emailRef} href="mailto:hello@thiva.dev" className="contact-email" data-cursor="hover">
          hello@thiva.dev
        </a>
        <div className="contact-socials">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel={s.href.startsWith("http") ? "noopener" : undefined}
              data-cursor="hover"
            >
              {s.label}
            </a>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
