import Reveal from "./Reveal.jsx";
import useMagnetic from "../hooks/useMagnetic.js";

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/Thiva123-ab" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/thivanka-tharuka" },
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
