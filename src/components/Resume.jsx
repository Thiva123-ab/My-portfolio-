import Reveal from "./Reveal.jsx";

export default function Resume() {
  return (
    <section className="section resume" id="resume">
      <div className="section-head">
        <span className="section-index">05</span>
        <Reveal as="h2" className="section-title">Resume</Reveal>
      </div>
      
      <div className="resume-content">
        <Reveal className="resume-header" delay={0.1}>
          <div className="resume-title-wrap">
            <h3>Thivanka Tharuka</h3>
            <p className="resume-subtitle">Computer Science Student & Full-Stack Developer</p>
          </div>
          <a href="/Thivanka_Tharuka_CV.pdf" download className="btn btn-primary" data-cursor="hover">
            <span>Download PDF</span>
            <svg viewBox="0 0 24 24" width="18" height="18">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4m4-5 5 5 5-5m-5 5V3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </Reveal>

        <div className="resume-grid">
          <div className="resume-main">
            <Reveal as="div" className="resume-block" delay={0.2}>
              <h4 className="resume-heading">Profile</h4>
              <p>Motivated Computer Science undergraduate and dedicated Full-Stack Developer with hands-on experience building scalable web applications. Proficient in backend development using Java, Spring Boot, and MySQL, paired with modern frontend frameworks including React.js, Next.js, and Tailwind CSS. Skilled in Git-based team collaboration, containerization (Docker), and integrating AI-driven APIs. Eager to apply technical versatility and strong problem-solving skills to drive impactful solutions in a software engineering internship.</p>
            </Reveal>

            <Reveal as="div" className="resume-block" delay={0.3}>
              <h4 className="resume-heading">Projects</h4>
              
              <div className="resume-item">
                <div className="resume-item-header">
                  <h5>Recruiter-AI</h5>
                  <span className="resume-date">July 2026 - Present</span>
                </div>
                <p>Developed a JavaScript-based intelligent recruiting application designed to streamline and automate the hiring process. Integrated AI capabilities using the Gemini API to assist in evaluating candidate profiles and improving screening efficiency. Built with React.js and Node.js, the project demonstrates a strong ability to build practical, AI-driven solutions for modern human resources challenges.</p>
              </div>

              <div className="resume-item">
                <div className="resume-item-header">
                  <h5>LectureLens — AI-Powered Bilingual Study Assistant</h5>
                  <span className="resume-date">June 2026</span>
                </div>
                <p>Developed an AI-powered, bilingual study assistant utilizing a modern full-stack architecture featuring React 19, TypeScript, Tailwind CSS, and TanStack Start for server-side rendering. The robust backend utilizes Supabase and a PostgreSQL database equipped with Row-Level Security (RLS), safeguarded by Google OAuth and protected routes. By integrating the Lovable AI Gateway, the application enables users to upload lecture documents for AI-driven text extraction, automatically generating structured summaries, interactive flashcards, and adaptive quizzes backed by a real-time skills analytics dashboard. A core feature is the intelligent conversational AI tutor that allows users to chat directly with their PDFs, alongside a seamless, one-tap translation tool converting study materials into native Sinhala script. To optimize learning and user retention, the platform incorporates automated weak-topic detection, a built-in Pomodoro focus timer, robust document management with Markdown export capabilities, and interactive gamification elements such as daily study streaks and unlockable achievement badges.</p>
              </div>

              <div className="resume-item">
                <div className="resume-item-header">
                  <h5>Sri-Lanka-Flood-Relief-Coordinator-Live-Map</h5>
                  <span className="resume-date">December 2025</span>
                </div>
                <p>Developed a comprehensive, open-source disaster management platform designed to coordinate flood relief efforts and connect victims with emergency responders. The system features a RESTful backend engineered with Java Spring Boot, MySQL, and WebSockets to handle real-time data, help requests, and verified emergency alerts. An interactive live map was implemented using JavaScript, Leaflet.js, and OpenStreetMap, allowing users to pinpoint flood hazards, request rescues, and locate safe zones using custom geolocation markers. The application incorporates a robust role-based authentication system utilizing Spring Security to securely manage data access for public users, victims, and administrative responders. Additionally, a responsive frontend dashboard was designed to aggregate community reports and government alerts, facilitating rapid decision-making and resource allocation during crisis situations.</p>
              </div>

              <div className="resume-item">
                <div className="resume-item-header">
                  <h5>Pharmacy stock and Delivery System</h5>
                  <span className="resume-date">September 2025</span>
                </div>
                <p>Developed a full-stack web application to streamline pharmacy operations, including medicine inventory management, online prescription uploads, real-time delivery tracking, and automated order processing. The system improves both customer and staff experience with a responsive UI, secure user authentication, and efficient workflow automation. Pharmacy staff can manage stock levels, validate prescriptions, and track orders, while customers can place medicine orders, upload prescriptions, and monitor delivery status. Collaborated in a team of three using Git and GitHub for version control, branching, and collaborative development.</p>
                <p className="resume-tech"><strong>Technologies Used:</strong> HTML, CSS, JavaScript, Bootstrap, Java Spring Boot, MySQL, REST API, Git &amp; GitHub</p>
              </div>
            </Reveal>

            <Reveal as="div" className="resume-block" delay={0.4}>
              <h4 className="resume-heading">Education</h4>
              <div className="resume-item">
                <div className="resume-item-header">
                  <h5>BSc(Honours) in Computer Science</h5>
                  <span className="resume-date">2024 - 2028</span>
                </div>
                <p>NSBM Green University</p>
              </div>
              <div className="resume-item">
                <div className="resume-item-header">
                  <h5>A/L Result</h5>
                </div>
                <p>Physics - S | Combine Mathematics - S | IT - C</p>
              </div>
            </Reveal>
          </div>

          <div className="resume-sidebar">
            <Reveal as="div" className="resume-block" delay={0.2}>
              <h4 className="resume-heading">Contact</h4>
              <ul className="resume-list">
                <li><a href="tel:+94717359120">+94 717359120 (WhatsApp)</a></li>
                <li><a href="tel:+94721470660">+94 721470660</a></li>
                <li><a href="mailto:thivankatharuka36@gmail.com">thivankatharuka36@gmail.com</a></li>
                <li>No 62, Bategallana, Mahagama</li>
              </ul>
            </Reveal>

            <Reveal as="div" className="resume-block" delay={0.3}>
              <h4 className="resume-heading">Tech Skills</h4>
              <div className="resume-tags">
                <span>Python</span>
                <span>Java</span>
                <span>Data Structures</span>
                <span>Algorithms</span>
                <span>SQL, MySQL</span>
                <span>JavaScript</span>
                <span>Web Dev (HTML/CSS)</span>
                <span>Spring Boot</span>
                <span>API / Postman</span>
              </div>
            </Reveal>

            <Reveal as="div" className="resume-block" delay={0.4}>
              <h4 className="resume-heading">Soft Skills</h4>
              <ul className="resume-list">
                <li>Teamwork</li>
                <li>Time Management</li>
                <li>Leadership</li>
                <li>Effective Communication</li>
                <li>Critical Thinking</li>
              </ul>
            </Reveal>

            <Reveal as="div" className="resume-block" delay={0.5}>
              <h4 className="resume-heading">Languages</h4>
              <ul className="resume-list">
                <li>English (Medium)</li>
                <li>Sinhala</li>
              </ul>
            </Reveal>

            <Reveal as="div" className="resume-block" delay={0.6}>
              <h4 className="resume-heading">Links</h4>
              <ul className="resume-list links">
                <li><a href="https://www.linkedin.com/in/thivanka-tharuka" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                <li><a href="https://github.com/Thiva123-ab" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                <li><a href="https://thiva123-ab.github.io/My-portfolio-/" target="_blank" rel="noopener noreferrer">Portfolio</a></li>
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
