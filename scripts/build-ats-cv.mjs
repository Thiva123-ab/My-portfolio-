import { Document, Packer, Paragraph, TextRun, AlignmentType, BorderStyle } from "docx";
import { writeFileSync, existsSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { chromium } from "playwright";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, "..");
const pubDir = join(rootDir, "public");
const assetsDir = join(rootDir, "src", "assets");
mkdirSync(pubDir, { recursive: true });
mkdirSync(assetsDir, { recursive: true });

// --- 1. BUILD EXACT ATS DOCX ---
async function generateDocx() {
  const primaryColor = "000000";

  const doc = new Document({
    styles: {
      default: {
        document: {
          run: {
            font: "Arial",
            size: 19, // ~9.5pt
            color: primaryColor,
          },
          paragraph: {
            spacing: { line: 220, before: 0, after: 30 },
          },
        },
      },
    },
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 500, // ~0.35 in
              right: 576, // 0.4 in
              bottom: 500,
              left: 576,
            },
          },
        },
        children: [
          // Header: Name
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 0, after: 15 },
            children: [
              new TextRun({
                text: "THIVANKA THARUKA",
                bold: true,
                size: 34, // 17pt
                color: "000000",
              }),
            ],
          }),

          // Role Subtitle
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 0, after: 25 },
            children: [
              new TextRun({
                text: "Software Engineer Intern",
                bold: true,
                size: 21,
                color: "111111",
              }),
            ],
          }),

          // Contact Line 1
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 0, after: 15 },
            children: [
              new TextRun({ text: "Mahagama, Sri Lanka | thivankatharuka36@gmail.com | +94 72 147 0660 | thivankatharuka.tech", size: 17 }),
            ],
          }),

          // Contact Line 2
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 0, after: 60 },
            children: [
              new TextRun({ text: "linkedin.com/in/thivanka-tharuka | github.com/Thiva123-ab", size: 17 }),
            ],
          }),

          // Section 1: SUMMARY
          createSectionHeading("SUMMARY"),
          new Paragraph({
            spacing: { before: 20, after: 50 },
            children: [
              new TextRun({
                text: "Computer Science undergraduate and full-stack developer experienced in building scalable web applications with Java, Spring Boot, Python, React.js, Next.js and Tailwind CSS. Skilled in secure REST APIs, role-based backends, responsive interfaces and AI/ML-driven features, with Git, Docker and CI/CD. Seeking a software engineering internship.",
                size: 18,
              }),
            ],
          }),

          // Section 2: EDUCATION
          createSectionHeading("EDUCATION"),
          new Paragraph({
            spacing: { before: 20, after: 10 },
            children: [
              new TextRun({ text: "BSc (Hons) in Computer Science | GPA: 3.70", bold: true, size: 18 }),
            ],
          }),
          new Paragraph({
            spacing: { before: 0, after: 50 },
            children: [
              new TextRun({ text: "NSBM Green University | 2024 – 2028", size: 18 }),
            ],
          }),

          // Section 3: SOFTWARE DEVELOPMENT SKILLS
          createSectionHeading("SOFTWARE DEVELOPMENT SKILLS"),
          createSkillLine("Programming Languages", "Java, Python, Dart, JavaScript, TypeScript, SQL"),
          createSkillLine("Frontend & Mobile", "React.js, Next.js, Flutter, Vite, Tailwind CSS, Bootstrap, HTML, CSS"),
          createSkillLine("Backend Development", "Spring Boot, Spring Security (JWT, RBAC), FastAPI, RESTful APIs"),
          createSkillLine("Databases", "MySQL, PostgreSQL, SQLite, Supabase, Firebase"),
          createSkillLine("Dev Tools", "Git, GitHub Actions, Postman, Docker, AWS SDK, Vercel, Render, Railway"),
          createSkillLine("AI & ML", "Gemini API, Anthropic API, scikit-learn"),

          // Section 4: PROJECTS
          createSectionHeading("PROJECTS"),

          // Project 1: FinSmart AI
          createProjectTitle("FinSmart AI – Cloud & AI Cost Management (FinOps) Platform (Full Stack | Solo)"),
          createBulletPoint("Built a FinOps dashboard that tracks AWS bills and AI tool usage (Cursor, Gemini)."),
          createBulletPoint("Added spend forecasting, cost spike detection and savings recommendations ($633.50/month found on demo data)."),
          createBulletPoint("Secured the API with Spring Security (JWT, RBAC) for Admin, Analyst and Viewer roles."),
          createMetaLine("Tech Stack", "Java 21, Spring Boot 3.3, Python, FastAPI, scikit-learn, React 19, TypeScript, Vite, Tailwind CSS, Supabase PostgreSQL, Docker, GitHub Actions, AWS SDK"),
          createMetaLine("GitHub Repo", "https://github.com/Thiva123-ab/FinSmart-AI | Live Demo: https://finsmart-ai-omega.vercel.app/"),

          // Project 2: LectureLens
          createProjectTitle("LectureLens – AI-Powered Bilingual Study Assistant (Full Stack)"),
          createBulletPoint("Built an AI study assistant that turns lecture PDFs into summaries, flashcards and quizzes."),
          createBulletPoint("Added a chat-with-PDF tutor and one-tap Sinhala translation."),
          createBulletPoint("Secured user data with Supabase Row-Level Security and Google OAuth."),
          createMetaLine("Tech Stack", "React 19, TypeScript, Tailwind CSS, TanStack Start, Supabase, PostgreSQL"),
          createMetaLine("GitHub Repo", "https://github.com/Thiva123-ab/study_buddy"),

          // Project 3: FocusFlow
          createProjectTitle("FocusFlow – Local-First Time Management App (Mobile | Solo)"),
          createBulletPoint("Built a Flutter Android app that tracks app usage and scores daily productivity (0–100)."),
          createBulletPoint("Added focus sessions, Pomodoro, goals, time budgets, streaks and badges."),
          createBulletPoint("Used SQLite for offline storage, with PDF/CSV/JSON export and an optional Gemini AI coach."),
          createMetaLine("Tech Stack", "Dart, Flutter, Provider, sqflite (SQLite), SharedPreferences, HTTP, Android usage stats and notifications (minSdk 26)"),
          createMetaLine("GitHub Repo", "https://github.com/Thiva123-ab/Smart-Time-Management-MobileApp"),

          // Project 4: NovaExplorer
          createProjectTitle("NovaExplorer – NASA Space Apps Challenge 2026 (Frontend | Team)"),
          createBulletPoint("Built a gamified web app with stories about five NASA spacecraft for students aged 10–17."),
          createBulletPoint("Worked in a team of five using Git branching on a shared React and TypeScript codebase."),
          createBulletPoint("Used a reusable design system and tested the code with Vitest."),
          createMetaLine("Tech Stack", "React 19, TypeScript, Vite, Tailwind CSS v4, React Router, Vitest, React Testing Library, ESLint, Prettier"),
          createMetaLine("GitHub Repo", "https://github.com/mchithna/NASASpaceApps | Live Demo: https://novaexplorer.vercel.app"),

          // Project 5: Pharmacy Stock
          createProjectTitle("Pharmacy Stock and Delivery System (Full Stack | Team)"),
          createBulletPoint("Built a pharmacy web app for medicine inventory, prescription uploads and order processing."),
          createBulletPoint("Added real-time delivery tracking."),
          createBulletPoint("Worked in a team of three using Git and GitHub."),
          createMetaLine("Tech Stack", "HTML, CSS, JavaScript, Bootstrap, Java Spring Boot, MySQL, REST API, Git & GitHub"),
          createMetaLine("GitHub Repo", "https://github.com/Thiva123-ab/Pharmacy-stock-system"),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  const docxPub = join(pubDir, "Thivanka_Tharuka_CV.docx");
  const docxRoot = join(rootDir, "Thivanka_Tharuka_CV.docx");
  writeFileSync(docxPub, buffer);
  writeFileSync(docxRoot, buffer);
  console.log("Generated updated ATS DOCX:", docxPub);
}

function createSectionHeading(title) {
  return new Paragraph({
    spacing: { before: 60, after: 15 },
    children: [
      new TextRun({
        text: title,
        bold: true,
        size: 19, // ~9.5pt
        color: "000000",
      }),
    ],
    border: {
      bottom: {
        color: "000000",
        space: 2,
        value: BorderStyle.SINGLE,
        size: 6,
      },
    },
  });
}

function createSkillLine(category, skills) {
  return new Paragraph({
    spacing: { before: 0, after: 10 },
    children: [
      new TextRun({ text: `${category}: `, bold: true, size: 17.5 }),
      new TextRun({ text: skills, size: 17.5 }),
    ],
  });
}

function createProjectTitle(title) {
  return new Paragraph({
    spacing: { before: 30, after: 10 },
    children: [
      new TextRun({ text: title, bold: true, size: 18 }),
    ],
  });
}

function createBulletPoint(text) {
  return new Paragraph({
    spacing: { before: 0, after: 10 },
    children: [
      new TextRun({ text: `•  ${text}`, size: 17.5 }),
    ],
  });
}

function createMetaLine(label, value) {
  return new Paragraph({
    spacing: { before: 0, after: 10 },
    children: [
      new TextRun({ text: `${label}: `, bold: true, size: 17 }),
      new TextRun({ text: value, size: 17 }),
    ],
  });
}

// --- 2. BUILD EXACT ATS PDF (1 Page Guaranteed) ---
async function generatePdf() {
  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Thivanka Tharuka - Resume</title>
<style>
  @page {
    size: A4 portrait;
    margin: 8mm 12mm 8mm 12mm;
  }
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  body {
    font-family: Arial, Helvetica, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    color: #000000;
    background: #ffffff;
    font-size: 8.2pt;
    line-height: 1.22;
    max-width: 100%;
  }
  header {
    text-align: center;
    margin-bottom: 5px;
  }
  h1 {
    font-size: 18pt;
    font-weight: 800;
    letter-spacing: 0.3px;
    color: #000000;
    text-transform: uppercase;
    margin-bottom: 2px;
  }
  .role-subtitle {
    font-size: 10pt;
    font-weight: 700;
    color: #111111;
    margin-bottom: 2px;
  }
  .contact-bar {
    font-size: 8pt;
    color: #111111;
    line-height: 1.32;
  }
  .contact-bar a {
    color: #000000;
    text-decoration: none;
  }
  .contact-bar a:hover {
    text-decoration: underline;
  }
  .section-title {
    font-size: 9.3pt;
    font-weight: 800;
    color: #000000;
    text-transform: uppercase;
    letter-spacing: 0.4px;
    border-bottom: 1.2px solid #000000;
    padding-bottom: 1px;
    margin-top: 5px;
    margin-bottom: 2.5px;
  }
  p.summary {
    font-size: 8pt;
    color: #000000;
    line-height: 1.24;
    margin-bottom: 1.5px;
    text-align: justify;
  }
  .edu-block {
    margin-bottom: 1.5px;
  }
  .edu-degree {
    font-weight: 700;
    font-size: 8.2pt;
  }
  .edu-school {
    font-size: 8pt;
    color: #111111;
  }
  .skills-grid {
    display: flex;
    justify-content: space-between;
    gap: 14px;
    margin-bottom: 1.5px;
  }
  .skills-col {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2.5px;
    font-size: 7.9pt;
    line-height: 1.2;
  }
  .skills-col div strong {
    color: #000000;
  }
  .project-item {
    margin-bottom: 3.5px;
  }
  .project-title {
    font-weight: 700;
    font-size: 8.35pt;
    color: #000000;
    margin-bottom: 1px;
  }
  ul.bullets {
    list-style-type: disc;
    padding-left: 14px;
    font-size: 7.9pt;
    color: #000000;
    margin-bottom: 1px;
  }
  ul.bullets li {
    margin-bottom: 1px;
    line-height: 1.21;
  }
  .meta-line {
    font-size: 7.75pt;
    line-height: 1.21;
    color: #000000;
    margin-top: 0.5px;
  }
  .meta-line strong {
    color: #000000;
  }
  .meta-line a {
    color: #0000ee;
    text-decoration: underline;
    word-break: break-all;
  }
</style>
</head>
<body>

<header>
  <h1>THIVANKA THARUKA</h1>
  <div class="role-subtitle">Software Engineer Intern</div>
  <div class="contact-bar">
    Mahagama, Sri Lanka | <a href="mailto:thivankatharuka36@gmail.com">thivankatharuka36@gmail.com</a> | +94 72 147 0660 | <a href="https://www.thivankatharuka.tech/" target="_blank">thivankatharuka.tech</a><br>
    <a href="https://linkedin.com/in/thivanka-tharuka" target="_blank">linkedin.com/in/thivanka-tharuka</a> | <a href="https://github.com/Thiva123-ab" target="_blank">github.com/Thiva123-ab</a>
  </div>
</header>

<div class="section-title">SUMMARY</div>
<p class="summary">
  Computer Science undergraduate and full-stack developer experienced in building scalable web applications with Java, Spring Boot, Python, React.js, Next.js and Tailwind CSS. Skilled in secure REST APIs, role-based backends, responsive interfaces and AI/ML-driven features, with Git, Docker and CI/CD. Seeking a software engineering internship.
</p>

<div class="section-title">EDUCATION</div>
<div class="edu-block">
  <div class="edu-degree">BSc (Hons) in Computer Science | GPA: 3.70</div>
  <div class="edu-school">NSBM Green University | 2024 – 2028</div>
</div>

<div class="section-title">SOFTWARE DEVELOPMENT SKILLS</div>
<div class="skills-grid">
  <div class="skills-col">
    <div><strong>Programming Languages:</strong> Java, Python, Dart, JavaScript, TypeScript, SQL</div>
    <div><strong>Backend Development:</strong> Spring Boot, Spring Security (JWT, RBAC), FastAPI, RESTful APIs</div>
    <div><strong>Dev Tools:</strong> Git, GitHub Actions, Postman, Docker, AWS SDK, Vercel, Render, Railway</div>
  </div>
  <div class="skills-col">
    <div><strong>Frontend &amp; Mobile:</strong> React.js, Next.js, Flutter, Vite, Tailwind CSS, Bootstrap, HTML, CSS</div>
    <div><strong>Databases:</strong> MySQL, PostgreSQL, SQLite, Supabase, Firebase</div>
    <div><strong>AI &amp; ML:</strong> Gemini API, Anthropic API, scikit-learn</div>
  </div>
</div>

<div class="section-title">PROJECTS</div>

<!-- Project 1: FinSmart AI -->
<div class="project-item">
  <div class="project-title">FinSmart AI – Cloud &amp; AI Cost Management (FinOps) Platform (Full Stack | Solo)</div>
  <ul class="bullets">
    <li>Built a FinOps dashboard that tracks AWS bills and AI tool usage (Cursor, Gemini).</li>
    <li>Added spend forecasting, cost spike detection and savings recommendations ($633.50/month found on demo data).</li>
    <li>Secured the API with Spring Security (JWT, RBAC) for Admin, Analyst and Viewer roles.</li>
  </ul>
  <div class="meta-line"><strong>Tech Stack:</strong> Java 21, Spring Boot 3.3, Python, FastAPI, scikit-learn, React 19, TypeScript, Vite, Tailwind CSS, Supabase PostgreSQL, Docker, GitHub Actions, AWS SDK</div>
  <div class="meta-line"><strong>GitHub Repo:</strong> <a href="https://github.com/Thiva123-ab/FinSmart-AI" target="_blank">https://github.com/Thiva123-ab/FinSmart-AI</a> | <strong>Live Demo:</strong> <a href="https://finsmart-ai-omega.vercel.app/" target="_blank">https://finsmart-ai-omega.vercel.app/</a></div>
</div>

<!-- Project 2: LectureLens -->
<div class="project-item">
  <div class="project-title">LectureLens – AI-Powered Bilingual Study Assistant (Full Stack)</div>
  <ul class="bullets">
    <li>Built an AI study assistant that turns lecture PDFs into summaries, flashcards and quizzes.</li>
    <li>Added a chat-with-PDF tutor and one-tap Sinhala translation.</li>
    <li>Secured user data with Supabase Row-Level Security and Google OAuth.</li>
  </ul>
  <div class="meta-line"><strong>Tech Stack:</strong> React 19, TypeScript, Tailwind CSS, TanStack Start, Supabase, PostgreSQL</div>
  <div class="meta-line"><strong>GitHub Repo:</strong> <a href="https://github.com/Thiva123-ab/study_buddy" target="_blank">https://github.com/Thiva123-ab/study_buddy</a></div>
</div>

<!-- Project 3: FocusFlow -->
<div class="project-item">
  <div class="project-title">FocusFlow – Local-First Time Management App (Mobile | Solo)</div>
  <ul class="bullets">
    <li>Built a Flutter Android app that tracks app usage and scores daily productivity (0–100).</li>
    <li>Added focus sessions, Pomodoro, goals, time budgets, streaks and badges.</li>
    <li>Used SQLite for offline storage, with PDF/CSV/JSON export and an optional Gemini AI coach.</li>
  </ul>
  <div class="meta-line"><strong>Tech Stack:</strong> Dart, Flutter, Provider, sqflite (SQLite), SharedPreferences, HTTP, Android usage stats and notifications (minSdk 26)</div>
  <div class="meta-line"><strong>GitHub Repo:</strong> <a href="https://github.com/Thiva123-ab/Smart-Time-Management-MobileApp" target="_blank">https://github.com/Thiva123-ab/Smart-Time-Management-MobileApp</a></div>
</div>

<!-- Project 4: NovaExplorer -->
<div class="project-item">
  <div class="project-title">NovaExplorer – NASA Space Apps Challenge 2026 (Frontend | Team)</div>
  <ul class="bullets">
    <li>Built a gamified web app with stories about five NASA spacecraft for students aged 10–17.</li>
    <li>Worked in a team of five using Git branching on a shared React and TypeScript codebase.</li>
    <li>Used a reusable design system and tested the code with Vitest.</li>
  </ul>
  <div class="meta-line"><strong>Tech Stack:</strong> React 19, TypeScript, Vite, Tailwind CSS v4, React Router, Vitest, React Testing Library, ESLint, Prettier</div>
  <div class="meta-line"><strong>GitHub Repo:</strong> <a href="https://github.com/mchithna/NASASpaceApps" target="_blank">https://github.com/mchithna/NASASpaceApps</a> | <strong>Live Demo:</strong> <a href="https://novaexplorer.vercel.app" target="_blank">https://novaexplorer.vercel.app</a></div>
</div>

<!-- Project 5: Pharmacy Stock -->
<div class="project-item">
  <div class="project-title">Pharmacy Stock and Delivery System (Full Stack | Team)</div>
  <ul class="bullets">
    <li>Built a pharmacy web app for medicine inventory, prescription uploads and order processing.</li>
    <li>Added real-time delivery tracking.</li>
    <li>Worked in a team of three using Git and GitHub.</li>
  </ul>
  <div class="meta-line"><strong>Tech Stack:</strong> HTML, CSS, JavaScript, Bootstrap, Java Spring Boot, MySQL, REST API, Git &amp; GitHub</div>
  <div class="meta-line"><strong>GitHub Repo:</strong> <a href="https://github.com/Thiva123-ab/Pharmacy-stock-system" target="_blank">https://github.com/Thiva123-ab/Pharmacy-stock-system</a></div>
</div>

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
    console.warn("Playwright browser not available. Preserving existing PDF assets:", err.message);
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
  const pdfRoot = join(rootDir, "Thivanka_Tharuka_CV.pdf");

  writeFileSync(pdfPub, pdfBuffer);
  writeFileSync(pdfAsset, pdfBuffer);
  writeFileSync(pdfRoot, pdfBuffer);
  console.log("Generated updated ATS PDF:", pdfPub);
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
