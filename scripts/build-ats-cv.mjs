import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, UnderlineType } from "docx";
import { writeFileSync, existsSync, mkdirSync, readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { chromium } from "playwright";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, "..");
const pubDir = join(rootDir, "public");
const assetsDir = join(rootDir, "src", "assets");
mkdirSync(pubDir, { recursive: true });
mkdirSync(assetsDir, { recursive: true });

// --- 1. BUILD ATS DOCX ---
async function generateDocx() {
  const primaryColor = "111827"; // Off-black / charcoal for readability
  const headingColor = "1E293B"; // Slate 800
  const accentColor = "0F766E"; // Teal 700 for subtle professional accent in headings if needed, or stick to dark slate

  const doc = new Document({
    styles: {
      default: {
        document: {
          run: {
            font: "Calibri",
            size: 20, // 10pt (in half-points)
            color: primaryColor,
          },
          paragraph: {
            spacing: { line: 240, before: 0, after: 60 }, // 1.0 line spacing, tight margins
          },
        },
      },
    },
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 720, // 0.5 in
              right: 720,
              bottom: 720,
              left: 720,
            },
          },
        },
        children: [
          // Header: Name
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 0, after: 40 },
            children: [
              new TextRun({
                text: "THIVANKA THARUKA",
                bold: true,
                size: 36, // 18pt
                color: "0F172A",
              }),
            ],
          }),

          // Contact Row
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 0, after: 120 },
            children: [
              new TextRun({ text: "Mahagama, Sri Lanka  |  +94 71 735 9120  |  thivankatharuka36@gmail.com", size: 19 }),
              new TextRun({ text: "\nLinkedIn: linkedin.com/in/thivanka-tharuka  |  GitHub: github.com/Thiva123-ab  |  Portfolio: thivankatharuka.tech", size: 19 }),
            ],
          }),

          // Section 1: Summary
          createSectionHeading("PROFESSIONAL SUMMARY"),
          new Paragraph({
            spacing: { before: 40, after: 100 },
            children: [
              new TextRun({
                text: "Computer Science undergraduate at NSBM Green University with hands-on project experience in full-stack web and backend engineering using Java, Spring Boot, React, and TypeScript. Experienced in designing RESTful APIs, relational schemas (MySQL, PostgreSQL), and responsive user interfaces. Seeking a Software Engineering Intern role to build scalable, reliable software systems.",
                size: 20,
              }),
            ],
          }),

          // Section 2: Education
          createSectionHeading("EDUCATION"),
          new Paragraph({
            spacing: { before: 40, after: 20 },
            children: [
              new TextRun({ text: "NSBM Green University", bold: true, size: 21 }),
              new TextRun({ text: " — Colombo, Sri Lanka", size: 20 }),
              new TextRun({ text: "\tExpected Feb 2028", italics: true, size: 19 }),
            ],
          }),
          new Paragraph({
            spacing: { before: 0, after: 20 },
            children: [
              new TextRun({ text: "Bachelor of Science (Honours) in Computer Science", italics: true, size: 20 }),
            ],
          }),
          new Paragraph({
            spacing: { before: 0, after: 100 },
            children: [
              new TextRun({ text: "• Relevant Coursework: ", bold: true, size: 19 }),
              new TextRun({ text: "Object-Oriented Programming (Java), Data Structures & Algorithms, Database Management Systems, Enterprise Application Development, Operating Systems.", size: 19 }),
            ],
          }),

          // Section 3: Technical Skills
          createSectionHeading("TECHNICAL SKILLS"),
          createSkillLine("Languages", "Java, Kotlin, TypeScript, JavaScript, Python, SQL, HTML5, CSS3"),
          createSkillLine("Backend & APIs", "Spring Boot, Spring Security, RESTful APIs, WebSockets, Node.js, Express"),
          createSkillLine("Frontend & Mobile", "React, TanStack Start, Tailwind CSS, Android SDK, Jetpack Compose, Material 3"),
          createSkillLine("Databases & ORM", "MySQL, PostgreSQL, Supabase, Room SQLite, Spring Data JPA, Hibernate"),
          createSkillLine("Tools & Practices", "Git, GitHub, Postman, Vite, Linux, Clean Architecture, CI/CD Basics"),
          createSkillLine("Cloud (Familiar / Learning)", "Docker, AWS (Educate Cloud 101), Kubernetes (Beginner Concepts)"),

          // Section 4: Technical Projects
          createSectionHeading("TECHNICAL PROJECTS"),

          // Project 1: Flood Relief
          createProjectHeader(
            "Sri Lanka Flood Relief Live Map — Full-Stack Disaster Platform",
            "Java, Spring Boot, MySQL, WebSockets, Spring Security, Leaflet.js"
          ),
          createBulletPoint("Architected an open-source real-time disaster coordination web platform connecting flood victims with relief responders via an interactive live map."),
          createBulletPoint("Engineered Spring Boot RESTful APIs and WebSocket endpoints for low-latency incident dispatching and emergency SOS requests."),
          createBulletPoint("Configured Spring Security role-based access control (RBAC) to enforce distinct privileges across public citizens, emergency responders, and administrators."),

          // Project 2: Crisis Copilot
          createProjectHeader(
            "Crisis Copilot — Emergency Response AI Platform (Team Project)",
            "React 19, Supabase (PostgreSQL), Google Gemini AI, Tailwind CSS"
          ),
          createBulletPoint("Collaborated in an agile team to build a disaster-response platform featuring automated emergency triage powered by Google Gemini AI."),
          createBulletPoint("Implemented incident dispatch feeds and high-priority responder dashboards using React 19 and Tailwind CSS for responsive mobile coordination."),
          createBulletPoint("Integrated Supabase PostgreSQL with Row Level Security (RLS) to persist sensitive incident reports and manage concurrent responder assignments."),

          // Project 3: LectureLens
          createProjectHeader(
            "LectureLens / Smart Sinhala Study — Bilingual AI Assistant",
            "React, TypeScript, TanStack Start, Supabase, Google Gemini AI"
          ),
          createBulletPoint("Developed a bilingual study assistant that extracts course notes from lecture PDFs to generate summaries, flashcards, and recall quizzes."),
          createBulletPoint("Integrated Google Gemini AI for contextual document Q&A with citation anchors and instantaneous English-to-Sinhala translation."),
          createBulletPoint("Structured user authentication, file storage, and relational progress tracking with Supabase PostgreSQL and Row Level Security."),

          // Project 4: FocusFlow
          createProjectHeader(
            "FocusFlow — Local-First Android Time Management App",
            "Kotlin, Jetpack Compose, Room SQLite, Material 3, WorkManager"
          ),
          createBulletPoint("Built a privacy-focused, local-first Android productivity app utilizing UsageStatsManager and encrypted Room SQLite to track device usage habits."),
          createBulletPoint("Engineered an offline heuristic coaching engine evaluating a 5-pillar productivity algorithm, daily time blocks, and deep-focus Pomodoro sessions."),

          // Section 5: Extracurricular & Leadership Experience
          createSectionHeading("EXPERIENCE & LEADERSHIP"),
          new Paragraph({
            spacing: { before: 40, after: 20 },
            children: [
              new TextRun({ text: "IDEATHON 1.0 (CompuVate) — NSBM Green University", bold: true, size: 20 }),
              new TextRun({ text: "  |  Volunteer & Event Logistics", italics: true, size: 19 }),
              new TextRun({ text: "\tSep 2025", size: 19 }),
            ],
          }),
          createBulletPoint("Coordinated participant logistics, stage setup, and technical support for student ideation teams during a university-wide innovation hackathon."),

          new Paragraph({
            spacing: { before: 40, after: 20 },
            children: [
              new TextRun({ text: "AWS Student Community Day Sri Lanka", bold: true, size: 20 }),
              new TextRun({ text: "  |  Community Attendee & Workshop Participant", italics: true, size: 19 }),
              new TextRun({ text: "\t2025", size: 19 }),
            ],
          }),
          createBulletPoint("Participated in technical cloud sessions covering AWS architectural best practices, serverless paradigms, and container orchestration."),

          // Section 6: Certifications
          createSectionHeading("CERTIFICATIONS & CONTINUOUS LEARNING"),
          new Paragraph({
            spacing: { before: 30, after: 20 },
            children: [
              new TextRun({ text: "• AWS Educate Cloud 101", bold: true, size: 19 }),
              new TextRun({ text: " — Amazon Web Services (Foundational Cloud & Core Services)", size: 19 }),
            ],
          }),
          new Paragraph({
            spacing: { before: 0, after: 20 },
            children: [
              new TextRun({ text: "• Kubernetes for Beginners & AWS Hands-on Labs", bold: true, size: 19 }),
              new TextRun({ text: " — KodeKloud (Containers, Pods, Deployments)", size: 19 }),
            ],
          }),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  const docxPath = join(pubDir, "Thivanka_Tharuka_CV.docx");
  writeFileSync(docxPath, buffer);
  writeFileSync(join(rootDir, "Thivanka_Tharuka_CV.docx"), buffer);
  console.log("Generated ATS DOCX:", docxPath);
}

function createSectionHeading(title) {
  return new Paragraph({
    spacing: { before: 100, after: 40 },
    children: [
      new TextRun({
        text: title,
        bold: true,
        size: 22, // 11pt
        color: "0F172A",
      }),
    ],
    border: {
      bottom: {
        color: "94A3B8", // slate-400 clean divider line
        space: 2,
        value: "single",
        size: 6,
      },
    },
  });
}

function createSkillLine(category, skills) {
  return new Paragraph({
    spacing: { before: 0, after: 20 },
    children: [
      new TextRun({ text: `• ${category}: `, bold: true, size: 19 }),
      new TextRun({ text: skills, size: 19 }),
    ],
  });
}

function createProjectHeader(title, tech) {
  return new Paragraph({
    spacing: { before: 60, after: 20 },
    children: [
      new TextRun({ text: title, bold: true, size: 20 }),
      new TextRun({ text: `  [${tech}]`, italics: true, size: 18, color: "334155" }),
    ],
  });
}

function createBulletPoint(text) {
  return new Paragraph({
    spacing: { before: 0, after: 20 },
    children: [
      new TextRun({ text: `  • ${text}`, size: 19 }),
    ],
  });
}

// --- 2. BUILD ATS PDF (Single-page guaranteed via HTML + Playwright) ---
async function generatePdf() {
  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Thivanka Tharuka - CV</title>
<style>
  @page {
    size: A4 portrait;
    margin: 10mm 12mm 10mm 12mm;
  }
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    color: #111827;
    background: #ffffff;
    font-size: 9.2pt;
    line-height: 1.28;
    max-width: 100%;
  }
  header {
    text-align: center;
    margin-bottom: 7px;
  }
  h1 {
    font-size: 17pt;
    font-weight: 800;
    letter-spacing: -0.3px;
    color: #0f172a;
    text-transform: uppercase;
    margin-bottom: 2px;
  }
  .contact-bar {
    font-size: 8.4pt;
    color: #334155;
    line-height: 1.35;
  }
  .contact-bar a {
    color: #0f766e;
    text-decoration: none;
  }
  .contact-bar a:hover {
    text-decoration: underline;
  }
  .section-title {
    font-size: 9.8pt;
    font-weight: 700;
    color: #0f172a;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    border-bottom: 1px solid #cbd5e1;
    padding-bottom: 1.5px;
    margin-top: 6px;
    margin-bottom: 3.5px;
  }
  p.summary {
    font-size: 8.8pt;
    color: #1f2937;
    text-align: justify;
    line-height: 1.32;
    margin-bottom: 4px;
  }
  .edu-row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    font-size: 9pt;
  }
  .edu-row .inst {
    font-weight: 700;
    color: #0f172a;
  }
  .edu-row .date {
    font-style: italic;
    color: #475569;
    font-size: 8.5pt;
  }
  .degree {
    font-style: italic;
    color: #1e293b;
    font-size: 8.8pt;
    margin-bottom: 1.5px;
  }
  .coursework {
    font-size: 8.3pt;
    color: #334155;
    margin-bottom: 3px;
  }
  .skills-list {
    list-style: none;
    font-size: 8.5pt;
    margin-bottom: 3px;
  }
  .skills-list li {
    margin-bottom: 1.5px;
    line-height: 1.25;
  }
  .skills-list strong {
    color: #0f172a;
  }
  .project-item {
    margin-bottom: 4px;
  }
  .project-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    font-size: 8.9pt;
    margin-bottom: 1px;
  }
  .project-title {
    font-weight: 700;
    color: #0f172a;
  }
  .project-tech {
    font-size: 8pt;
    color: #475569;
    font-style: italic;
  }
  ul.bullets {
    list-style-type: square;
    padding-left: 14px;
    font-size: 8.4pt;
    color: #1f2937;
  }
  ul.bullets li {
    margin-bottom: 1px;
    line-height: 1.26;
  }
  .exp-row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    font-size: 8.8pt;
    margin-top: 2px;
  }
  .exp-title {
    font-weight: 700;
    color: #0f172a;
  }
  .exp-role {
    font-style: italic;
    color: #334155;
  }
  .exp-date {
    font-size: 8.3pt;
    color: #64748b;
  }
  .certs-list {
    list-style: none;
    font-size: 8.4pt;
    color: #1e293b;
  }
  .certs-list li {
    margin-bottom: 1.5px;
    line-height: 1.25;
  }
</style>
</head>
<body>

<header>
  <h1>THIVANKA THARUKA</h1>
  <div class="contact-bar">
    Mahagama, Sri Lanka &nbsp;•&nbsp; +94 71 735 9120 &nbsp;•&nbsp; <a href="mailto:thivankatharuka36@gmail.com">thivankatharuka36@gmail.com</a><br>
    <a href="https://linkedin.com/in/thivanka-tharuka" target="_blank">linkedin.com/in/thivanka-tharuka</a> &nbsp;•&nbsp;
    <a href="https://github.com/Thiva123-ab" target="_blank">github.com/Thiva123-ab</a> &nbsp;•&nbsp;
    <a href="https://www.thivankatharuka.tech/" target="_blank">thivankatharuka.tech</a>
  </div>
</header>

<div class="section-title">Professional Summary</div>
<p class="summary">
  Computer Science undergraduate at NSBM Green University with hands-on project experience in full-stack web and backend engineering using Java, Spring Boot, React, and TypeScript. Experienced in designing RESTful APIs, relational schemas (MySQL, PostgreSQL), and responsive user interfaces. Seeking a Software Engineering Intern role to build scalable, reliable software systems.
</p>

<div class="section-title">Education</div>
<div class="edu-row">
  <span class="inst">NSBM Green University — Colombo, Sri Lanka</span>
  <span class="date">Expected Feb 2028</span>
</div>
<div class="degree">Bachelor of Science (Honours) in Computer Science</div>
<div class="coursework">
  <strong>Relevant Coursework:</strong> Object-Oriented Programming (Java), Data Structures & Algorithms, Database Management Systems, Enterprise Application Development, Operating Systems.
</div>

<div class="section-title">Technical Skills</div>
<ul class="skills-list">
  <li><strong>Languages:</strong> Java, Kotlin, TypeScript, JavaScript, Python, SQL, HTML5, CSS3</li>
  <li><strong>Backend & APIs:</strong> Spring Boot, Spring Security, RESTful APIs, WebSockets, Node.js, Express</li>
  <li><strong>Frontend & Mobile:</strong> React, TanStack Start, Tailwind CSS, Android SDK, Jetpack Compose, Material 3</li>
  <li><strong>Databases & ORM:</strong> MySQL, PostgreSQL, Supabase, Room SQLite, Spring Data JPA, Hibernate</li>
  <li><strong>Tools & Practices:</strong> Git, GitHub, Postman, Vite, Linux Shell, Clean Architecture</li>
  <li><strong>Cloud (Familiar / Learning):</strong> Docker, AWS (Educate Cloud 101), Kubernetes (Beginner concepts)</li>
</ul>

<div class="section-title">Technical Projects</div>

<div class="project-item">
  <div class="project-header">
    <span class="project-title">Sri Lanka Flood Relief Live Map — Full-Stack Disaster Platform</span>
    <span class="project-tech">Java, Spring Boot, MySQL, WebSockets, Spring Security, Leaflet.js</span>
  </div>
  <ul class="bullets">
    <li>Architected an open-source real-time disaster coordination web platform connecting flood victims with relief responders via an interactive live map.</li>
    <li>Engineered Spring Boot RESTful APIs and WebSocket endpoints for low-latency incident dispatching and emergency SOS requests.</li>
    <li>Configured Spring Security role-based access control (RBAC) to enforce distinct privileges across public citizens, emergency responders, and administrators.</li>
  </ul>
</div>

<div class="project-item">
  <div class="project-header">
    <span class="project-title">Crisis Copilot — Emergency Response AI Platform (Team Project)</span>
    <span class="project-tech">React 19, Supabase (PostgreSQL), Google Gemini AI, Tailwind CSS</span>
  </div>
  <ul class="bullets">
    <li>Collaborated in an agile team to build a disaster-response platform featuring automated emergency triage powered by Google Gemini AI.</li>
    <li>Implemented incident dispatch feeds and high-priority responder dashboards using React 19 and Tailwind CSS for responsive mobile coordination.</li>
    <li>Integrated Supabase PostgreSQL with Row Level Security (RLS) to persist sensitive incident reports and manage concurrent responder assignments.</li>
  </ul>
</div>

<div class="project-item">
  <div class="project-header">
    <span class="project-title">LectureLens / Smart Sinhala Study — Bilingual AI Assistant</span>
    <span class="project-tech">React, TypeScript, TanStack Start, Supabase, Google Gemini AI</span>
  </div>
  <ul class="bullets">
    <li>Developed a bilingual study assistant that extracts course notes from lecture PDFs to generate summaries, flashcards, and recall quizzes.</li>
    <li>Integrated Google Gemini AI for contextual document Q&A with citation anchors and instantaneous English-to-Sinhala translation.</li>
    <li>Structured user authentication, file storage, and relational progress tracking with Supabase PostgreSQL and Row Level Security.</li>
  </ul>
</div>

<div class="project-item">
  <div class="project-header">
    <span class="project-title">FocusFlow — Local-First Android Time Management App</span>
    <span class="project-tech">Kotlin, Jetpack Compose, Room SQLite, Material 3, WorkManager</span>
  </div>
  <ul class="bullets">
    <li>Built a privacy-focused, local-first Android productivity app utilizing UsageStatsManager and encrypted Room SQLite to track device usage habits.</li>
    <li>Engineered an offline heuristic coaching engine evaluating a 5-pillar productivity algorithm, daily time blocks, and deep-focus Pomodoro sessions.</li>
  </ul>
</div>

<div class="section-title">Leadership & Community Experience</div>
<div class="exp-row">
  <div><span class="exp-title">IDEATHON 1.0 (CompuVate) — NSBM Green University</span> <span class="exp-role">| Volunteer & Event Logistics</span></div>
  <span class="exp-date">Sep 2025</span>
</div>
<ul class="bullets">
  <li>Coordinated participant logistics, stage setup, and technical support for student ideation teams during a campus hackathon.</li>
</ul>

<div class="exp-row">
  <div><span class="exp-title">AWS Student Community Day Sri Lanka</span> <span class="exp-role">| Community Attendee & Workshop Participant</span></div>
  <span class="exp-date">2025</span>
</div>
<ul class="bullets">
  <li>Participated in technical cloud sessions covering AWS architectural best practices, serverless paradigms, and container orchestration.</li>
</ul>

<div class="section-title">Certifications & Continuous Learning</div>
<ul class="certs-list">
  <li>• <strong>AWS Educate Cloud 101</strong> — Amazon Web Services (Foundational Cloud & Core Architecture)</li>
  <li>• <strong>Kubernetes for Beginners & AWS Hands-on Labs</strong> — KodeKloud (Containers, Pods, Deployments)</li>
</ul>

</body>
</html>`;

  let browser;
  try {
    try {
      browser = await chromium.launch({ channel: "msedge", headless: true });
    } catch {
      browser = await chromium.launch({ headless: true });
    }
  } catch (err) {
    console.warn("Playwright browser not available in this environment. Preserving existing PDF assets:", err.message);
    return;
  }
  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: "networkidle" });

  const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true,
    margin: {
      top: "8mm",
      bottom: "8mm",
      left: "12mm",
      right: "12mm",
    },
  });

  await browser.close();

  const pdfPub = join(pubDir, "Thivanka_Tharuka_CV.pdf");
  const pdfAsset = join(assetsDir, "Thivanka_Tharuka_CV.pdf");
  writeFileSync(pdfPub, pdfBuffer);
  writeFileSync(pdfAsset, pdfBuffer);
  writeFileSync(join(rootDir, "Thivanka_Tharuka_CV.pdf"), pdfBuffer);
  console.log("Generated ATS PDF:", pdfPub);
}

async function run() {
  await generateDocx();
  await generatePdf();
  console.log("CV generation completed successfully!");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
