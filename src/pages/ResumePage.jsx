import Seo from "../components/Seo.jsx";
import { SITE, CV_HREF } from "../data/site.js";
import profile from "../assets/profile.png";

export default function ResumePage() {
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
            <p className="resume-subtitle">Official CV — download PDF or print</p>
          </div>
          <div className="hero-cta">
            <a
              href={CV_HREF}
              download="Thivanka_Tharuka_CV.pdf"
              className="btn btn-primary"
              data-cursor="hover"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>Download PDF</span>
            </a>
            <a
              href={CV_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
              data-cursor="hover"
            >
              View PDF
            </a>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => window.print()}
              data-cursor="hover"
            >
              Print
            </button>
          </div>
        </div>

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
                  {["Python", "Java", "Data Structures", "Algorithms", "SQL", "MySQL", "JavaScript", "HTML / CSS", "Spring Boot", "REST API", "Postman", "React", "TypeScript", "Git & GitHub"].map((s) => (
                    <span key={s} className="cv-skill-pill">{s}</span>
                  ))}
                </div>
              </div>

              <div className="cv-side-block">
                <h3>Soft Skills</h3>
                <ul className="cv-bullet-list">
                  <li>Teamwork</li>
                  <li>Time Management</li>
                  <li>Leadership</li>
                  <li>Effective Communication</li>
                  <li>Critical Thinking</li>
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
                    <span className="cv-label">LinkedIn:</span>
                    <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer">
                      linkedin.com/in/thivanka-tharuka
                    </a>
                  </li>
                  <li>
                    <span className="cv-label">GitHub:</span>
                    <a href={SITE.github} target="_blank" rel="noopener noreferrer">
                      github.com/Thiva123-ab
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

              {/* Projects */}
              <section className="cv-block">
                <h3>Featured Projects</h3>

                {/* Project 1 */}
                <article className="cv-project-card">
                  <div className="cv-row">
                    <strong>Pharmacy Stock and Delivery System</strong>
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
                  <div className="cv-tech-row">
                    <span className="cv-tech-label">Technologies Used:</span>
                    <span>HTML, CSS, JavaScript, Bootstrap, Java Spring Boot, MySQL, REST API, Git &amp; GitHub</span>
                  </div>
                </article>

                {/* Project 2 */}
                <article className="cv-project-card">
                  <div className="cv-row">
                    <strong>Sri Lanka Flood Relief Coordinator Live Map</strong>
                    <span className="cv-date-badge">December 2025</span>
                  </div>
                  <p>
                    Developed a comprehensive, open-source disaster management platform designed to coordinate
                    flood relief efforts and connect victims with emergency responders. The system features a RESTful
                    backend engineered with Java Spring Boot, MySQL, and WebSockets to handle real-time data,
                    help requests, and verified emergency alerts. An interactive live map was implemented using
                    JavaScript, Leaflet.js, and OpenStreetMap, allowing users to pinpoint flood hazards, request
                    rescues, and locate safe zones using custom geolocation markers. The application incorporates a
                    robust role-based authentication system utilizing Spring Security to securely manage data access
                    for public users, victims, and administrative responders. Additionally, a responsive frontend
                    dashboard was designed to aggregate community reports and government alerts, facilitating rapid
                    decision-making and resource allocation during crisis situations.
                  </p>
                  <div className="cv-tech-row">
                    <span className="cv-tech-label">Technologies Used:</span>
                    <span>Java Spring Boot, MySQL, WebSockets, Spring Security, Leaflet.js, OpenStreetMap, JavaScript</span>
                  </div>
                </article>

                {/* Project 3 */}
                <article className="cv-project-card">
                  <div className="cv-row">
                    <strong>LectureLens — AI-Powered Bilingual Study Assistant</strong>
                    <span className="cv-date-badge">June 2026</span>
                  </div>
                  <p>
                    Developed an AI-powered, bilingual study assistant utilizing a modern full-stack architecture
                    featuring React 19, TypeScript, Tailwind CSS, and TanStack Start for server-side rendering. The
                    robust backend utilizes Supabase and a PostgreSQL database equipped with Row-Level Security
                    (RLS), safeguarded by Google OAuth and protected routes. By integrating the Lovable AI Gateway,
                    the application enables users to upload lecture documents for AI-driven text extraction,
                    automatically generating structured summaries, interactive flashcards, and adaptive quizzes
                    backed by a real-time skills analytics dashboard. A core feature is the intelligent conversational AI
                    tutor that allows users to chat directly with their PDFs, alongside a seamless, one-tap translation
                    tool converting study materials into native Sinhala script. To optimize learning and user retention,
                    the platform incorporates automated weak-topic detection, a built-in Pomodoro focus timer,
                    robust document management with Markdown export capabilities, and interactive gamification
                    elements such as daily study streaks and unlockable achievement badges.
                  </p>
                  <div className="cv-tech-row">
                    <span className="cv-tech-label">Technologies Used:</span>
                    <span>React 19, TypeScript, Tailwind CSS, TanStack Start, Supabase, PostgreSQL, AI Gateway</span>
                  </div>
                </article>

                {/* Project 4 */}
                <article className="cv-project-card">
                  <div className="cv-row">
                    <strong>Recruiter-AI – Intelligent Hiring Assistant</strong>
                    <span className="cv-date-badge">July 2026 – Present</span>
                  </div>
                  <p>
                    Developed a JavaScript-based intelligent recruiting application designed to streamline and
                    automate the hiring process. Integrated AI capabilities using OpenAI API / Gemini API to assist
                    in evaluating candidate profiles and improving screening efficiency. Built with React.js and
                    Node.js, the project demonstrates a strong ability to build practical, AI-driven solutions for
                    modern human resources challenges.
                  </p>
                  <div className="cv-tech-row">
                    <span className="cv-tech-label">Technologies Used:</span>
                    <span>React.js, Node.js, Gemini API / OpenAI API, JavaScript</span>
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
      </section>
    </>
  );
}
