import Seo from "../components/Seo.jsx";
import Reveal from "../components/Reveal.jsx";
import { SITE, CV_HREF } from "../data/site.js";

export default function ResumePage() {
  return (
    <>
      <Seo
        title="Resume"
        description="One-page intern CV: NSBM CS, Java/Spring/React/Kotlin projects, honest certs. No home address."
        path="/resume"
      />
      <section className="section page-section resume">
        <div className="resume-header">
          <div className="resume-title-wrap">
            <h1>Resume</h1>
            <p className="resume-subtitle">One-page intern CV — print or download PDF</p>
          </div>
          <div className="hero-cta">
            <a href={CV_HREF} download className="btn btn-primary" data-cursor="hover">
              Download PDF
            </a>
            <button type="button" className="btn btn-ghost" onClick={() => window.print()} data-cursor="hover">
              Print
            </button>
          </div>
        </div>

        <div className="cv-sheet" id="cv">
          <header className="cv-top">
            <div>
              <h2>{SITE.name}</h2>
              <p>{SITE.legalName}</p>
              <p className="cv-role">{SITE.role}</p>
            </div>
            <ul className="cv-contacts">
              <li><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
              <li><a href={SITE.whatsappHref}>{SITE.whatsappDisplay}</a></li>
              <li><a href={SITE.linkedin}>linkedin.com/in/thivanka-tharuka</a></li>
              <li><a href={SITE.github}>github.com/Thiva123-ab</a></li>
              <li>Sri Lanka · NSBM Green University</li>
            </ul>
          </header>

          <section className="cv-block">
            <h3>Profile</h3>
            <p>
              Computer Science undergraduate (NSBM, graduating Feb 2028) seeking a Software Engineering internship.
              I ship full-stack apps in Java/Spring Boot, React, and Kotlin. Cloud practice: Docker, AWS Educate Cloud 101,
              KodeKloud AWS labs, and beginner Kubernetes — not multi-cloud expert claims.
            </p>
          </section>

          <section className="cv-block">
            <h3>Education</h3>
            <div className="cv-row">
              <strong>BSc (Hons) Computer Science</strong>
              <span>2024 – Feb 2028</span>
            </div>
            <p>NSBM Green University, Sri Lanka</p>
          </section>

          <section className="cv-block">
            <h3>Projects</h3>
            <div className="cv-item">
              <div className="cv-row"><strong>Sri Lanka Flood Relief Live Map</strong><span>Java, Spring Boot, MySQL, WebSockets, Spring Security, Leaflet</span></div>
              <p>Realtime disaster coordination: reports, SOS feed, admin dashboard, live map. github.com/Thiva123-ab/Sri-Lanka-Flood-Relief-Coordinator-Live-Map</p>
            </div>
            <div className="cv-item">
              <div className="cv-row"><strong>LectureLens / Smart Sinhala Study</strong><span>React, TypeScript, TanStack Start, Supabase, AI</span></div>
              <p>Bilingual study assistant (EN/සිංහල): summaries, flashcards, quizzes, PDF chat. Not Next.js. github.com/Thiva123-ab/study_buddy</p>
            </div>
            <div className="cv-item">
              <div className="cv-row"><strong>Recruiter-AI</strong><span>React, Node, Gemini</span></div>
              <p>Candidate screening assistant against a job spec. Public repo pending — github.com/Thiva123-ab</p>
            </div>
            <div className="cv-item">
              <div className="cv-row"><strong>FocusFlow</strong><span>Kotlin, Jetpack Compose, Room</span></div>
              <p>Local-first Android wellbeing app: usage stats, scoring, Pomodoro. github.com/Thiva123-ab/Smart-Time-Management-MobileApp</p>
            </div>
            <div className="cv-item">
              <div className="cv-row"><strong>Pharmacy Stock &amp; DEA Spring Boot</strong><span>Java, Spring Boot, MySQL, JWT</span></div>
              <p>Inventory, Rx upload, role-based delivery. github.com/Thiva123-ab/Pharmacy-stock-system · DEA-Spring-Boot-Project</p>
            </div>
          </section>

          <section className="cv-block">
            <h3>Activity</h3>
            <p>IDEATHON 1.0 (30 Sep 2025) — Certificate of Appreciation for support/organizing, CompuVate NSBM (not a winning-project award).</p>
            <p>AWS Student Community Day attendee · IEEE DevForge workshop · Hacktoberfest Hack Day Colombo attendance (24 Oct 2026).</p>
          </section>

          <section className="cv-block">
            <h3>Certifications</h3>
            <p>UoM CODL Python Programming (lRLDVaVaQ9) · Python for Beginners 24 Nov 2025 (6RBEI4FAxS) · KodeKloud Kubernetes for Absolute Beginners 19 Jul 2026 (c598c4d3-8d45-4266-92e1-b2ef614b52bd) · AWS Educate Introduction to Cloud 101, Jan 2026 (Credly).</p>
          </section>

          <section className="cv-block">
            <h3>Skills</h3>
            <p>Java, Spring Boot, Spring Security, MySQL, REST, WebSockets · React, TypeScript, Supabase · Kotlin, Jetpack Compose, Room · Docker, AWS Educate, Kubernetes (beginner) · Git, Figma.</p>
          </section>
        </div>
      </section>
    </>
  );
}
