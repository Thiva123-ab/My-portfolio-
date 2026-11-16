import { useState } from "react";
import { Download, FileText, Printer, Eye, ExternalLink } from "lucide-react";
import Seo from "../components/Seo.jsx";
import { SITE, CV_HREF } from "../data/site.js";
import profile from "../assets/profile.png";

export default function ResumePage() {
  const [viewMode, setViewMode] = useState("interactive"); // "interactive" or "pdf"

  return (
    <>
      <Seo
        title="Resume — Thivanka Tharuka"
        description="Official Curriculum Vitae of Thivanka Tharuka — Full Stack Developer & Computer Science Student at NSBM Green University."
        path="/resume"
      />
      <section className="section page-section resume">
        <div className="resume-header">
          <div className="resume-title-wrap">
            <h1>Curriculum Vitae</h1>
            <p className="resume-subtitle">Official CV — interactive view, inline PDF, or download</p>
          </div>
          <div className="hero-cta">
            <a
              href={CV_HREF}
              download="Thivanka_Tharuka_CV.pdf"
              className="btn btn-primary"
              data-cursor="hover"
            >
              <Download size={16} />
              <span>Download PDF</span>
            </a>
            <button
              type="button"
              className={`btn ${viewMode === "pdf" ? "btn-primary" : "btn-ghost"}`}
              onClick={() => setViewMode((m) => (m === "pdf" ? "interactive" : "pdf"))}
              data-cursor="hover"
            >
              <FileText size={16} />
              <span>{viewMode === "pdf" ? "Interactive CV" : "Inline PDF Preview"}</span>
            </button>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => window.print()}
              data-cursor="hover"
            >
              <Printer size={16} />
              <span>Print</span>
            </button>
          </div>
        </div>

        {viewMode === "pdf" ? (
          <div className="cv-pdf-preview-wrap">
            <div className="cv-pdf-toolbar">
              <span>Official Document Preview (Thivanka_Tharuka_CV.pdf)</span>
              <a href={CV_HREF} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
                Open in new tab <ExternalLink size={13} />
              </a>
            </div>
            <iframe
              src={CV_HREF}
              title="Official CV PDF Preview"
              className="cv-pdf-frame"
            />
          </div>
        ) : (
        <div className="cv-sheet" id="cv">
          {/* Top CV Header */}
          <header className="cv-top-banner">
            <div className="cv-avatar-wrap">
              <img src={profile} alt={SITE.name} className="cv-avatar-img" />
            </div>
            <div className="cv-headline">
              <h2>{SITE.name}</h2>
              <p className="cv-role">FULL STACK DEVELOPER · COMPUTER SCIENCE STUDENT</p>
              <p className="cv-sub-school">NSBM Green University · BSc (Hons) Computer Science (2024 – 2028)</p>
            </div>
          </header>

          <div className="cv-grid">
            {/* Left Sidebar */}
            <aside className="cv-sidebar">
              <div className="cv-side-block">
                <h3>Contact</h3>
                <ul className="cv-info-list">
                  <li>
                    <span className="cv-label">Phone:</span>
                    <a href="tel:+94717359120">+94 717359120 (WhatsApp)</a>
                    <a href="tel:+94721470660">+94 721470660</a>
                  </li>
                  <li>
                    <span className="cv-label">Email:</span>
                    <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                  </li>
                  <li>
                    <span className="cv-label">Address:</span>
                    <span>No 62, Bategallana, Mahagama</span>
                  </li>
                  <li>
                    <span className="cv-label">Date of Birth:</span>
                    <span>2004.03.12</span>
                  </li>
                </ul>
              </div>

              <div className="cv-side-block">
                <h3>Tech Skills</h3>
                <div className="cv-tag-cloud">
                  {["Python", "Java", "Data Structures", "Algorithms", "SQL", "MySQL", "JavaScript", "HTML / CSS", "Spring Boot", "REST API", "Postman", "React", "TypeScript", "Next.js", "Git & GitHub"].map((s) => (
                    <span key={s} className="cv-skill-pill">{s}</span>
                  ))}
                </div>
              </div>

              <div className="cv-side-block">
                <h3>Soft Skills</h3>
                <ul className="cv-bullet-list">
                  <li>Teamwork &amp; Collaboration</li>
                  <li>Time Management</li>
                  <li>Leadership</li>
                  <li>Effective Communication</li>
                  <li>Critical Thinking &amp; Problem Solving</li>
                </ul>
              </div>

              <div className="cv-side-block">
                <h3>Languages</h3>
                <ul className="cv-bullet-list">
                  <li>English (Medium)</li>
                  <li>Sinhala (Native)</li>
                </ul>
              </div>

              <div className="cv-side-block">
                <h3>Links & Profiles</h3>
                <ul className="cv-info-list">
                  <li>
                    <span className="cv-label">GitHub:</span>
                    <a href={SITE.github} target="_blank" rel="noopener noreferrer">
                      github.com/Thiva123-ab
                    </a>
                  </li>
                  <li>
                    <span className="cv-label">LinkedIn:</span>
                    <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer">
                      linkedin.com/in/thivanka-tharuka
                    </a>
                  </li>
                  <li>
                    <span className="cv-label">Portfolio:</span>
                    <a href={SITE.url} target="_blank" rel="noopener noreferrer">
                      thiva123-ab.github.io/My-portfolio-
                    </a>
                  </li>
                </ul>
              </div>
            </aside>

            {/* Right Main Content */}
            <main className="cv-main-content">
              {/* Profile */}
              <section className="cv-block">
                <h3>Profile</h3>
                <p className="cv-profile-lead">
                  Motivated and dedicated software development student with hands-on
                  experience in building applications using Java, Spring Boot, and Git-based team
                  collaboration. Skilled in web design using HTML/CSS and creating responsive UI
                  components. Strong understanding of Java, JavaScript, Python, and version
                  control workflows. Eager to apply technical skills and gain practical industry
                  experience through full-stack software development roles.
                </p>
              </section>

              {/* Group Projects Section */}
              <section className="cv-block">
                <h3>👥 Group Projects (Team Collaboration)</h3>

                {/* Group Project 1: Crisis Copilot */}
                <article className="cv-project-card group-card">
                  <div className="cv-row">
                    <div className="cv-title-group">
                      <strong>Crisis Copilot — Emergency Response AI Platform</strong>
                      <span className="cv-type-badge group">Team Project</span>
                    </div>
                    <span className="cv-date-badge">2026</span>
                  </div>
                  <p>
                    An intelligent, full-stack disaster response and crisis communication platform designed to connect
                    victims with responders in real time. Features Google Gemini AI-driven emergency triage and severity
                    classification, live incident dispatch feeds, and high-priority responder dashboards built with
                    React 19, Supabase PostgreSQL, and Tailwind CSS.
                  </p>
                  <div className="cv-project-footer">
                    <div className="cv-tech-row">
                      <span className="cv-tech-label">Technologies Used:</span>
                      <span>React 19, Node.js, Express, Google Gemini AI, Supabase PostgreSQL, Tailwind CSS</span>
                    </div>
                    <a
                      href="https://github.com/Y-Udayanga/CrisisCopilot"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cv-repo-btn"
                      data-cursor="hover"
                    >
                      GitHub Repo ↗
                    </a>
                  </div>
                </article>

                {/* Group Project 2: Recruiter-AI */}
                <article className="cv-project-card group-card">
                  <div className="cv-row">
                    <div className="cv-title-group">
                      <strong>Recruiter-AI — Intelligent Talent Acquisition Platform</strong>
                      <span className="cv-type-badge group">Collaborative Team</span>
                    </div>
                    <span className="cv-date-badge">2026</span>
                  </div>
                  <p>
                    A comprehensive recruitment management system featuring dedicated candidate, recruiter, and admin
                    portals. Integrates Google Gemini AI to automatically parse applicant resumes, calculate role match
                    scores against job specifications, and streamline interview pipelines and scheduling.
                  </p>
                  <div className="cv-project-footer">
                    <div className="cv-tech-row">
                      <span className="cv-tech-label">Technologies Used:</span>
                      <span>React, Node.js, Express, Gemini AI, Tailwind CSS, REST APIs</span>
                    </div>
                    <a
                      href="https://github.com/mchithna/Recruiter-AI"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cv-repo-btn"
                      data-cursor="hover"
                    >
                      GitHub Repo ↗
                    </a>
                  </div>
                </article>

                {/* Group Project 3: NASA Space Apps */}
                <article className="cv-project-card group-card">
                  <div className="cv-row">
                    <div className="cv-title-group">
                      <strong>NovaExplorer — NASA Space Apps Challenge 2026</strong>
                      <span className="cv-type-badge group">Hackathon Team</span>
                    </div>
                    <span className="cv-date-badge">2026</span>
                  </div>
                  <p>
                    An interactive, gamified space exploration and education platform developed for the NASA Space Apps
                    Challenge 2026. Built with TypeScript and React, leveraging open NASA astrophysics datasets to deliver
                    interactive space learning modules, celestial exploration milestones, and scientific quizzes.
                  </p>
                  <div className="cv-project-footer">
                    <div className="cv-tech-row">
                      <span className="cv-tech-label">Technologies Used:</span>
                      <span>TypeScript, React, NASA Open Data, Tailwind CSS, Web APIs</span>
                    </div>
                    <a
                      href="https://github.com/mchithna/NASASpaceApps"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cv-repo-btn"
                      data-cursor="hover"
                    >
                      GitHub Repo ↗
                    </a>
                  </div>
                </article>

                {/* Group Project 4: SuwaDaru */}
                <article className="cv-project-card group-card">
                  <div className="cv-row">
                    <div className="cv-title-group">
                      <strong>SuwaDaru — Child Health &amp; Caregiver Companion</strong>
                      <span className="cv-type-badge group">Healthcare Team</span>
                    </div>
                    <span className="cv-date-badge">2026</span>
                  </div>
                  <p>
                    A mobile-first child development and caregiver health tracking platform. Connects to Supabase Auth,
                    PostgreSQL, and real-time database synchronization to record growth analytics, vaccination schedules,
                    pediatric appointments, and daily nutrition logs.
                  </p>
                  <div className="cv-project-footer">
                    <div className="cv-tech-row">
                      <span className="cv-tech-label">Technologies Used:</span>
                      <span>TypeScript, React, Supabase, PostgreSQL, Realtime, Tailwind CSS</span>
                    </div>
                    <a
                      href="https://github.com/Y-Udayanga/Suwadaru"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cv-repo-btn"
                      data-cursor="hover"
                    >
                      GitHub Repo ↗
                    </a>
                  </div>
                </article>

                {/* Group Project 5: Pharmacy Stock */}
                <article className="cv-project-card group-card">
                  <div className="cv-row">
                    <div className="cv-title-group">
                      <strong>Pharmacy Stock and Delivery System</strong>
                      <span className="cv-type-badge group">Team of 3</span>
                    </div>
                    <span className="cv-date-badge">September 2025</span>
                  </div>
                  <p>
                    Developed a full-stack web application to streamline pharmacy operations, including
                    medicine inventory management, online prescription uploads, real-time delivery tracking,
                    and automated order processing. The system improves both customer and staff experience
                    with a responsive UI, secure user authentication, and efficient workflow automation.
                    Pharmacy staff can manage stock levels, validate prescriptions, and track orders, while
                    customers can place medicine orders, upload prescriptions, and monitor delivery status.
                    Collaborated in a team of three using Git and GitHub for version control, branching, and
                    collaborative development.
                  </p>
                  <div className="cv-project-footer">
                    <div className="cv-tech-row">
                      <span className="cv-tech-label">Technologies Used:</span>
                      <span>HTML, CSS, JavaScript, Bootstrap, Java Spring Boot, MySQL, REST API, Git &amp; GitHub</span>
                    </div>
                    <a
                      href="https://github.com/Thiva123-ab/Pharmacy-stock-system"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cv-repo-btn"
                      data-cursor="hover"
                    >
                      GitHub Repo ↗
                    </a>
                  </div>
                </article>

                {/* Group Project 6: AutoSync Garage */}
                <article className="cv-project-card group-card">
                  <div className="cv-row">
                    <div className="cv-title-group">
                      <strong>AutoSync Garage Management System</strong>
                      <span className="cv-type-badge group">Collaborative Project</span>
                    </div>
                    <span className="cv-date-badge">2025 – 2026</span>
                  </div>
                  <p>
                    A comprehensive automotive service and garage management platform featuring a customer
                    service booking portal and an administrative dashboard for inventory, appointment scheduling,
                    and automated service updates. Powered by React, Firebase, and Firestore collections with
                    multi-user coordination and real-time stock alerts.
                  </p>
                  <div className="cv-project-footer">
                    <div className="cv-tech-row">
                      <span className="cv-tech-label">Technologies Used:</span>
                      <span>React, Firebase, Cloud Firestore, JavaScript, Flutter / Dart, Git &amp; GitHub</span>
                    </div>
                    <a
                      href="https://github.com/Thiva123-ab/My_Garage-"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cv-repo-btn"
                      data-cursor="hover"
                    >
                      GitHub Repo ↗
                    </a>
                  </div>
                </article>
              </section>

              {/* Individual / Solo Projects Section */}
              <section className="cv-block">
                <h3>👤 Individual &amp; Featured Projects</h3>

                {/* Solo Project 1 */}
                <article className="cv-project-card">
                  <div className="cv-row">
                    <div className="cv-title-group">
                      <strong>Sri Lanka Flood Relief Coordinator Live Map</strong>
                      <span className="cv-type-badge solo">Solo Project</span>
                    </div>
                    <span className="cv-date-badge">December 2025</span>
                  </div>
                  <p>
                    Developed a comprehensive, open-source disaster management platform designed to coordinate
                    flood relief efforts and connect victims with emergency responders. The system features a RESTful
                    backend engineered with Java Spring Boot, MySQL, and WebSockets to handle real-time data,
                    help requests, and verified emergency alerts. An interactive live map was implemented using
                    JavaScript, Leaflet.js, and OpenStreetMap, allowing users to pinpoint flood hazards, request
                    rescues, and locate safe zones using custom geolocation markers. Features role-based access
                    control via Spring Security for public users, victims, and administrative responders.
                  </p>
                  <div className="cv-project-footer">
                    <div className="cv-tech-row">
                      <span className="cv-tech-label">Technologies Used:</span>
                      <span>Java Spring Boot, MySQL, WebSockets, Spring Security, Leaflet.js, OpenStreetMap, JavaScript</span>
                    </div>
                    <a
                      href="https://github.com/Thiva123-ab/Sri-Lanka-Flood-Relief-Coordinator-Live-Map"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cv-repo-btn"
                      data-cursor="hover"
                    >
                      GitHub Repo ↗
                    </a>
                  </div>
                </article>

                {/* Solo Project 2 */}
                <article className="cv-project-card">
                  <div className="cv-row">
                    <div className="cv-title-group">
                      <strong>LectureLens — AI-Powered Bilingual Study Assistant</strong>
                      <span className="cv-type-badge solo">Lead Project</span>
                    </div>
                    <span className="cv-date-badge">June 2026</span>
                  </div>
                  <p>
                    Developed an AI-powered, bilingual study assistant utilizing a modern full-stack architecture
                    featuring React 19, TypeScript, Tailwind CSS, and TanStack Start for server-side rendering. The
                    robust backend utilizes Supabase and a PostgreSQL database equipped with Row-Level Security
                    (RLS), safeguarded by Google OAuth and protected routes. Integrates Lovable AI Gateway for
                    automated text extraction, structured summaries, flashcards, adaptive quizzes, Pomodoro timer,
                    and interactive document chat with one-tap Sinhala (සිංහල) translation.
                  </p>
                  <div className="cv-project-footer">
                    <div className="cv-tech-row">
                      <span className="cv-tech-label">Technologies Used:</span>
                      <span>React 19, TypeScript, Tailwind CSS, TanStack Start, Supabase, PostgreSQL, AI Gateway</span>
                    </div>
                    <a
                      href="https://github.com/Thiva123-ab/study_buddy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cv-repo-btn"
                      data-cursor="hover"
                    >
                      GitHub Repo ↗
                    </a>
                  </div>
                </article>

                {/* Solo Project 3 */}
                <article className="cv-project-card">
                  <div className="cv-row">
                    <div className="cv-title-group">
                      <strong>Nova Bank — Modern Online Banking Platform</strong>
                      <span className="cv-type-badge solo">New Full Stack Project</span>
                    </div>
                    <span className="cv-date-badge">2026</span>
                  </div>
                  <p>
                    A modern, full-stack financial web application engineered with TypeScript and React. Offers
                    secure account balance overviews, real-time transaction history, funds transfer simulations,
                    and rich responsive financial charts for seamless user money management.
                  </p>
                  <div className="cv-project-footer">
                    <div className="cv-tech-row">
                      <span className="cv-tech-label">Technologies Used:</span>
                      <span>TypeScript, React, Next.js / Node.js, Tailwind CSS, REST APIs</span>
                    </div>
                    <a
                      href="https://github.com/Thiva123-ab/Nova_bank-"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cv-repo-btn"
                      data-cursor="hover"
                    >
                      GitHub Repo ↗
                    </a>
                  </div>
                </article>

                {/* Solo Project 4 */}
                <article className="cv-project-card">
                  <div className="cv-row">
                    <div className="cv-title-group">
                      <strong>FocusFlow — Android Time Management &amp; Wellbeing</strong>
                      <span className="cv-type-badge solo">Mobile App</span>
                    </div>
                    <span className="cv-date-badge">2026</span>
                  </div>
                  <p>
                    Privacy-first Android digital wellbeing app built with Kotlin, Jetpack Compose, and Room SQLite.
                    Features on-device usage tracking with encrypted local persistence, five-pillar productivity
                    scoring, deep focus Pomodoro sessions, and an optional AI productivity coach.
                  </p>
                  <div className="cv-project-footer">
                    <div className="cv-tech-row">
                      <span className="cv-tech-label">Technologies Used:</span>
                      <span>Kotlin, Jetpack Compose, Room SQLite, Material 3, WorkManager</span>
                    </div>
                    <a
                      href="https://github.com/Thiva123-ab/Smart-Time-Management-MobileApp"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cv-repo-btn"
                      data-cursor="hover"
                    >
                      GitHub Repo ↗
                    </a>
                  </div>
                </article>

                {/* Solo Project 5 */}
                <article className="cv-project-card">
                  <div className="cv-row">
                    <div className="cv-title-group">
                      <strong>Recruiter-AI – Intelligent Hiring Assistant</strong>
                      <span className="cv-type-badge solo">AI Project</span>
                    </div>
                    <span className="cv-date-badge">July 2026 – Present</span>
                  </div>
                  <p>
                    Developed a JavaScript-based intelligent recruiting application designed to streamline and
                    automate the candidate screening process. Integrates generative AI (OpenAI API / Gemini API) to
                    extract candidate qualifications, match against job requirements, and generate structured
                    evaluations for talent teams.
                  </p>
                  <div className="cv-project-footer">
                    <div className="cv-tech-row">
                      <span className="cv-tech-label">Technologies Used:</span>
                      <span>React.js, Node.js, Gemini API / OpenAI API, JavaScript</span>
                    </div>
                    <a
                      href="https://github.com/Thiva123-ab"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cv-repo-btn"
                      data-cursor="hover"
                    >
                      GitHub Profile ↗
                    </a>
                  </div>
                </article>

                {/* Solo Project 6 */}
                <article className="cv-project-card">
                  <div className="cv-row">
                    <div className="cv-title-group">
                      <strong>Motion-Strike — Computer Vision Combat Demo</strong>
                      <span className="cv-type-badge solo">Interactive Demo</span>
                    </div>
                    <span className="cv-date-badge">2026</span>
                  </div>
                  <p>
                    Real-time browser 3D demo powered by MediaPipe Pose tracking and Three.js WebGL. Detects 33 human
                    landmarks via live webcam video feed to map physical punches, blocks, and body movement into 3D
                    space at interactive frame rates without additional hardware.
                  </p>
                  <div className="cv-project-footer">
                    <div className="cv-tech-row">
                      <span className="cv-tech-label">Technologies Used:</span>
                      <span>JavaScript, Three.js, MediaPipe Pose, WebGL, Vite</span>
                    </div>
                    <a
                      href="https://github.com/Thiva123-ab/Motion-Strike"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cv-repo-btn"
                      data-cursor="hover"
                    >
                      GitHub Repo ↗
                    </a>
                  </div>
                </article>
              </section>

              {/* Education */}
              <section className="cv-block">
                <h3>Education</h3>
                <div className="cv-edu-item">
                  <div className="cv-row">
                    <strong>BSc (Honours) in Computer Science</strong>
                    <span className="cv-date-badge">2024 – 2028</span>
                  </div>
                  <p className="cv-school-name">NSBM Green University, Sri Lanka</p>
                </div>

                <div className="cv-edu-item" style={{ marginTop: "14px" }}>
                  <div className="cv-row">
                    <strong>G.C.E. Advanced Level (A/L) Results</strong>
                  </div>
                  <div className="cv-al-grid">
                    <span className="cv-al-pill">Physics: <strong>S</strong></span>
                    <span className="cv-al-pill">Combined Mathematics: <strong>S</strong></span>
                    <span className="cv-al-pill">Information Technology (IT): <strong>C</strong></span>
                  </div>
                </div>
              </section>
            </main>
          </div>
        </div>
        )}
      </section>
    </>
  );
}
