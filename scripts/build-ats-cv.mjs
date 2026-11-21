import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, Table, TableRow, TableCell, WidthType, BorderStyle } from "docx";
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
  const mutedColor = "222222";

  const doc = new Document({
    styles: {
      default: {
        document: {
          run: {
            font: "Arial",
            size: 20, // 10pt
            color: primaryColor,
          },
          paragraph: {
            spacing: { line: 240, before: 0, after: 40 },
          },
        },
      },
    },
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 576, // 0.4 in
              right: 648, // 0.45 in
              bottom: 576,
              left: 648,
            },
          },
        },
        children: [
          // Header: Name
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 0, after: 20 },
            children: [
              new TextRun({
                text: "THIVANKA THARUKA",
                bold: true,
                size: 34, // 17pt
                color: "000000",
              }),
            ],
          }),

          // Role
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 0, after: 40 },
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
            spacing: { before: 0, after: 20 },
            children: [
              new TextRun({ text: "Mahagama, Sri Lanka | thivankatharuka36@gmail.com | +94 71 735 9120 | thivankatharuka.tech", size: 18 }),
            ],
          }),

          // Contact Line 2
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 0, after: 100 },
            children: [
              new TextRun({ text: "linkedin.com/in/thivanka-tharuka | github.com/Thiva123-ab", size: 18 }),
            ],
          }),

          // Section 1: SUMMARY
          createSectionHeading("SUMMARY"),
          new Paragraph({
            spacing: { before: 30, after: 80 },
            children: [
              new TextRun({
                text: "Computer Science undergraduate and full-stack developer experienced in building scalable web applications with Java, Spring Boot, Python, React.js, Next.js and Tailwind CSS. Skilled in designing secure REST APIs, role-based backends, responsive interfaces and AI/ML-driven features, with Git-based collaboration, Docker and CI/CD. Seeking a software engineering internship to build impactful solutions.",
                size: 19,
              }),
            ],
          }),

          // Section 2: EDUCATION
          createSectionHeading("EDUCATION"),
          new Paragraph({
            spacing: { before: 30, after: 10 },
            children: [
              new TextRun({ text: "BSc (Hons) in Computer Science", bold: true, size: 19 }),
            ],
          }),
          new Paragraph({
            spacing: { before: 0, after: 80 },
            children: [
              new TextRun({ text: "NSBM Green University | 2024 – 2028", size: 19 }),
            ],
          }),

          // Section 3: SOFTWARE DEVELOPMENT SKILLS
          createSectionHeading("SOFTWARE DEVELOPMENT SKILLS"),
          createSkillLine("Programming Languages", "Java, Python, Dart, JavaScript, TypeScript, SQL"),
          createSkillLine("Frontend Development", "React.js, Next.js, Flutter, Vite, Tailwind CSS, Bootstrap, HTML, CSS"),
          createSkillLine("Backend Development", "Spring Boot, Spring Security (JWT, RBAC), FastAPI, RESTful APIs"),
          createSkillLine("Databases", "MySQL, PostgreSQL, SQLite, Supabase"),
          createSkillLine("Dev Tools", "Git, GitHub Actions, Postman, Docker, AWS SDK, Vercel"),
          createSkillLine("Core Concepts", "Data Structures, Algorithms, scikit-learn"),

          // Section 4: PROJECTS
          createSectionHeading("PROJECTS"),

          // Project 1: FinSmart AI
          createProjectTitle("FinSmart AI – Cloud & AI Cost Management (FinOps) Platform (Full Stack | Solo)"),
          createBulletPoint("Developed a FinOps platform that tracks AWS cloud bills and AI tool usage (Cursor, Gemini) in one dashboard, forecasts spend, detects cost spikes and recommends savings.."),
          createBulletPoint("Identified $633.50/month in savings on demo data across rightsizing, idle resources and storage lifecycle; secured the API with Spring Security (JWT, RBAC) for Admin, Analyst and Viewer roles over 5,430+ cost records."),
          createMetaLine("Tech Stack", "Java 21, Spring Boot 3.3, Python, FastAPI, scikit-learn, React 19, TypeScript, Vite, Tailwind CSS, Supabase PostgreSQL, Docker, GitHub Actions, AWS SDK"),
          createMetaLine("GitHub Repo", "https://github.com/Thiva123-ab/FinSmart-AI"),
          createMetaLine("Live Demo", "https://finsmart-ai-omega.vercel.app/"),

          // Project 2: LectureLens
          createProjectTitle("LectureLens – AI-Powered Bilingual Study Assistant (Full Stack)"),
          createBulletPoint("Developed an AI study assistant that turns uploaded lecture PDFs into structured summaries, flashcards and adaptive quizzes, with a chat-with-your-PDF tutor and one-tap Sinhala translation."),
          createBulletPoint("Secured the backend with Supabase PostgreSQL Row-Level Security and Google OAuth protected routes; added weak-topic detection, a skills analytics dashboard and a Pomodoro focus timer."),
          createMetaLine("Tech Stack", "React 19, TypeScript, Tailwind CSS, TanStack Start, Supabase, PostgreSQL"),
          createMetaLine("GitHub Repo", "https://github.com/Thiva123-ab/study_buddy"),

          // Project 3: FocusFlow
          createProjectTitle("FocusFlow – Local-First Time Management App (Mobile | Solo)"),
          createBulletPoint("Developed a local-first Flutter Android app that tracks on-device app usage, scores daily productivity (0–100) and supports focus sessions, Pomodoro, goals, time budgets, streaks and badges."),
          createBulletPoint("Built offline-first storage with SQLite, PDF/CSV/JSON export and a home-screen widget; added an optional AI coach using on-device heuristics, with Gemini used only if the user opts in."),
          createMetaLine("Tech Stack", "Dart, Flutter, Provider, sqflite (SQLite), SharedPreferences, HTTP, Android usage stats and notifications (minSdk 26)"),
          createMetaLine("GitHub Repo", "https://github.com/Thiva123-ab/Smart-Time-Management-MobileApp"),

          // Project 4: Pharmacy Stock
          createProjectTitle("Pharmacy Stock and Delivery System (Full Stack | Team)"),
          createBulletPoint("Developed a pharmacy management web application covering medicine inventory, online prescription uploads, real-time delivery tracking and automated order processing."),
          createBulletPoint("Collaborated in a team of three using Git and GitHub for branching and version control."),
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
    spacing: { before: 80, after: 20 },
    children: [
      new TextRun({
        text: title,
        bold: true,
        size: 20, // 10pt
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
    spacing: { before: 0, after: 15 },
    children: [
      new TextRun({ text: `${category}: `, bold: true, size: 18 }),
      new TextRun({ text: skills, size: 18 }),
    ],
  });
}

  function createProjectTitle(title) {
    return new Paragraph({
      spacing: { before: 40, after: 15 },
      children: [
        new TextRun({ text: title, bold: true, size: 19 }),
      ],
    });
  }

  function createBulletPoint(text) {
    return new Paragraph({
      spacing: { before: 0, after: 15 },
      children: [
        new TextRun({ text: `•  ${text}`, size: 18 }),
      ],
    });
  }

  function createMetaLine(label, value) {
    return new Paragraph({
      spacing: { before: 0, after: 15 },
      children: [
        new TextRun({ text: `${label}: `, bold: true, size: 17.5 }),
        new TextRun({ text: value, size: 17.5 }),
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
    margin: 10mm 13mm 10mm 13mm;
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
    font-size: 8.8pt;
    line-height: 1.25;
    max-width: 100%;
  }
  header {
    text-align: center;
    margin-bottom: 7px;
  }
  h1 {
    font-size: 19pt;
    font-weight: 800;
    letter-spacing: 0.4px;
    color: #000000;
    text-transform: uppercase;
    margin-bottom: 2px;
  }
  .role-subtitle {
    font-size: 10.5pt;
    font-weight: 700;
    color: #111111;
    margin-bottom: 3px;
  }
  .contact-bar {
    font-size: 8.4pt;
    color: #111111;
    line-height: 1.34;
  }
  .contact-bar a {
    color: #000000;
    text-decoration: none;
  }
  .contact-bar a:hover {
    text-decoration: underline;
  }
  .section-title {
    font-size: 9.8pt;
    font-weight: 800;
    color: #000000;
    text-transform: uppercase;
    letter-spacing: 0.4px;
    border-bottom: 1.2px solid #000000;
    padding-bottom: 1px;
    margin-top: 7px;
    margin-bottom: 3.5px;
  }
  p.summary {
    font-size: 8.5pt;
    color: #000000;
    line-height: 1.28;
    margin-bottom: 2px;
  }
  .edu-block {
    margin-bottom: 2px;
  }
  .edu-degree {
    font-weight: 700;
    font-size: 8.8pt;
  }
  .edu-school {
    font-size: 8.6pt;
    color: #111111;
  }
  .skills-grid {
    display: flex;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 2px;
  }
  .skills-col {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 3px;
    font-size: 8.35pt;
    line-height: 1.23;
  }
  .skills-col div strong {
    color: #000000;
  }
  .project-item {
    margin-bottom: 4.5px;
  }
  .project-title {
    font-weight: 700;
    font-size: 8.85pt;
    color: #000000;
    margin-bottom: 1.5px;
  }
  ul.bullets {
    list-style-type: disc;
    padding-left: 15px;
    font-size: 8.35pt;
    color: #000000;
    margin-bottom: 1.5px;
  }
  ul.bullets li {
    margin-bottom: 1.5px;
    line-height: 1.24;
  }
  .meta-line {
    font-size: 8.2pt;
    line-height: 1.25;
    color: #000000;
    margin-top: 1px;
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
    Mahagama, Sri Lanka | <a href="mailto:thivankatharuka36@gmail.com">thivankatharuka36@gmail.com</a> | +94 71 735 9120 | <a href="https://www.thivankatharuka.tech/" target="_blank">thivankatharuka.tech</a><br>
    <a href="https://linkedin.com/in/thivanka-tharuka" target="_blank">linkedin.com/in/thivanka-tharuka</a> | <a href="https://github.com/Thiva123-ab" target="_blank">github.com/Thiva123-ab</a>
  </div>
</header>

<div class="section-title">SUMMARY</div>
<p class="summary">
  Computer Science undergraduate and full-stack developer experienced in building scalable web applications with Java, Spring Boot, Python, React.js, Next.js and Tailwind CSS. Skilled in designing secure REST APIs, role-based backends, responsive interfaces and AI/ML-driven features, with Git-based collaboration, Docker and CI/CD. Seeking a software engineering internship to build impactful solutions.
</p>

<div class="section-title">EDUCATION</div>
<div class="edu-block">
  <div class="edu-degree">BSc (Hons) in Computer Science</div>
  <div class="edu-school">NSBM Green University | 2024 – 2028</div>
</div>

<div class="section-title">SOFTWARE DEVELOPMENT SKILLS</div>
<div class="skills-grid">
  <div class="skills-col">
    <div><strong>Programming Languages:</strong> Java, Python, Dart, JavaScript, TypeScript, SQL</div>
    <div><strong>Backend Development:</strong> Spring Boot, Spring Security (JWT, RBAC), FastAPI, RESTful APIs</div>
    <div><strong>Dev Tools:</strong> Git, GitHub Actions, Postman, Docker, AWS SDK, Vercel</div>
  </div>
  <div class="skills-col">
    <div><strong>Frontend Development:</strong> React.js, Next.js, Flutter, Vite, Tailwind CSS, Bootstrap, HTML, CSS</div>
    <div><strong>Databases:</strong> MySQL, PostgreSQL, SQLite, Supabase</div>
    <div><strong>Core Concepts:</strong> Data Structures, Algorithms, scikit-learn</div>
  </div>
</div>

<div class="section-title">PROJECTS</div>

<!-- Project 1: FinSmart AI -->
<div class="project-item">
  <div class="project-title">FinSmart AI – Cloud & AI Cost Management (FinOps) Platform (Full Stack | Solo)</div>
  <ul class="bullets">
    <li>Developed a FinOps platform that tracks AWS cloud bills and AI tool usage (Cursor, Gemini) in one dashboard, forecasts spend, detects cost spikes and recommends savings..</li>
    <li>Identified $633.50/month in savings on demo data across rightsizing, idle resources and storage lifecycle; secured the API with Spring Security (JWT, RBAC) for Admin, Analyst and Viewer roles over 5,430+ cost records.</li>
  </ul>
  <div class="meta-line"><strong>Tech Stack:</strong> Java 21, Spring Boot 3.3, Python, FastAPI, scikit-learn, React 19, TypeScript, Vite, Tailwind CSS, Supabase PostgreSQL, Docker, GitHub Actions, AWS SDK</div>
  <div class="meta-line"><strong>GitHub Repo:</strong> <a href="https://github.com/Thiva123-ab/FinSmart-AI" target="_blank">https://github.com/Thiva123-ab/FinSmart-AI</a></div>
  <div class="meta-line"><strong>Live Demo:</strong> <a href="https://finsmart-ai-omega.vercel.app/" target="_blank">https://finsmart-ai-omega.vercel.app/</a></div>
</div>

<!-- Project 2: LectureLens -->
<div class="project-item">
  <div class="project-title">LectureLens – AI-Powered Bilingual Study Assistant (Full Stack)</div>
  <ul class="bullets">
    <li>Developed an AI study assistant that turns uploaded lecture PDFs into structured summaries, flashcards and adaptive quizzes, with a chat-with-your-PDF tutor and one-tap Sinhala translation.</li>
    <li>Secured the backend with Supabase PostgreSQL Row-Level Security and Google OAuth protected routes; added weak-topic detection, a skills analytics dashboard and a Pomodoro focus timer.</li>
  </ul>
  <div class="meta-line"><strong>Tech Stack:</strong> React 19, TypeScript, Tailwind CSS, TanStack Start, Supabase, PostgreSQL</div>
  <div class="meta-line"><strong>GitHub Repo:</strong> <a href="https://github.com/Thiva123-ab/study_buddy" target="_blank">https://github.com/Thiva123-ab/study_buddy</a></div>
</div>

<!-- Project 3: FocusFlow -->
<div class="project-item">
  <div class="project-title">FocusFlow – Local-First Time Management App (Mobile | Solo)</div>
  <ul class="bullets">
    <li>Developed a local-first Flutter Android app that tracks on-device app usage, scores daily productivity (0–100) and supports focus sessions, Pomodoro, goals, time budgets, streaks and badges.</li>
    <li>Built offline-first storage with SQLite, PDF/CSV/JSON export and a home-screen widget; added an optional AI coach using on-device heuristics, with Gemini used only if the user opts in.</li>
  </ul>
  <div class="meta-line"><strong>Tech Stack:</strong> Dart, Flutter, Provider, sqflite (SQLite), SharedPreferences, HTTP, Android usage stats and notifications (minSdk 26)</div>
  <div class="meta-line"><strong>GitHub Repo:</strong> <a href="https://github.com/Thiva123-ab/Smart-Time-Management-MobileApp" target="_blank">https://github.com/Thiva123-ab/Smart-Time-Management-MobileApp</a></div>
</div>

<!-- Project 4: Pharmacy Stock -->
<div class="project-item">
  <div class="project-title">Pharmacy Stock and Delivery System (Full Stack | Team)</div>
  <ul class="bullets">
    <li>Developed a pharmacy management web application covering medicine inventory, online prescription uploads, real-time delivery tracking and automated order processing.</li>
    <li>Collaborated in a team of three using Git and GitHub for branching and version control.</li>
  </ul>
  <div class="meta-line"><strong>Tech Stack:</strong> HTML, CSS, JavaScript, Bootstrap, Java Spring Boot, MySQL, REST API, Git & GitHub</div>
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
        top: "10mm",
        bottom: "10mm",
        left: "13mm",
        right: "13mm",
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
