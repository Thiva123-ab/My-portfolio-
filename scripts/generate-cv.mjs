import { mkdirSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const lines = [
  "Thivanka Tharuka",
  "Gunamunige Thivanka Tharuka Priyantha",
  "Software Engineering Intern candidate",
  "NSBM Green University  |  BSc (Hons) Computer Science  |  2024-Feb 2028  |  Sri Lanka",
  "thivankatharuka36@gmail.com  |  +94 71 735 9120  |  linkedin.com/in/thivanka-tharuka  |  github.com/Thiva123-ab",
  "",
  "PROFILE",
  "CS undergraduate seeking a Software Engineering internship. I build full-stack apps with Java,",
  "Spring Boot, React, and Kotlin. Cloud: Docker, AWS Educate Cloud 101, KodeKloud AWS labs,",
  "Kubernetes beginners. Not a multi-cloud expert. LectureLens uses TanStack Start, not Next.js.",
  "",
  "PROJECTS",
  "Sri Lanka Flood Relief Live Map - Java Spring Boot, MySQL, WebSockets, Spring Security, Leaflet",
  "  github.com/Thiva123-ab/Sri-Lanka-Flood-Relief-Coordinator-Live-Map",
  "LectureLens / Smart Sinhala Study - React, TypeScript, TanStack Start, Supabase, AI",
  "  github.com/Thiva123-ab/study_buddy",
  "Recruiter-AI - React, Node, Gemini (public repo pending)  github.com/Thiva123-ab",
  "FocusFlow - Kotlin, Jetpack Compose, Room  github.com/Thiva123-ab/Smart-Time-Management-MobileApp",
  "AutoSync Garage - React, Firebase  github.com/Thiva123-ab/My_Garage-",
  "Pharmacy Stock & DEA Spring Boot - Java, Spring Boot, MySQL, JWT",
  "  github.com/Thiva123-ab/Pharmacy-stock-system",
  "Motion-Strike - Three.js, MediaPipe demo  github.com/Thiva123-ab/Motion-Strike",
  "",
  "ACTIVITY",
  "IDEATHON 1.0 (30 Sep 2025) - Certificate of Appreciation for support/organizing, CompuVate NSBM.",
  "  Not a winning-project award.",
  "AWS Student Community Day attendee. IEEE DevForge workshop. Hacktoberfest Hack Day Colombo",
  "  attendance, 24 Oct 2026 (not claimed as completed Hacktoberfest contributor).",
  "",
  "CERTIFICATIONS",
  "UoM CODL Python Programming (open.uom.lk code lRLDVaVaQ9)",
  "UoM CODL Python for Beginners, 24 Nov 2025 (code 6RBEI4FAxS)",
  "KodeKloud Kubernetes for Absolute Beginners, 19 Jul 2026 (c598c4d3-8d45-4266-92e1-b2ef614b52bd)",
  "AWS Educate Introduction to Cloud 101, Jan 2026 (Credly)",
  "",
  "SKILLS",
  "Java, Spring Boot, Spring Security, MySQL, REST, WebSockets, React, TypeScript, Supabase,",
  "Kotlin, Jetpack Compose, Room, Docker, AWS Educate, Kubernetes (beginner), Git, Figma.",
];

function escapePdf(text) {
  return text.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function buildPdf(textLines) {
  const content = [];
  let y = 800;
  content.push("BT");
  textLines.forEach((line, i) => {
    const size = i === 0 ? 18 : i === 2 ? 12 : 10;
    const leading = i === 0 ? 22 : 13;
    content.push(`/F1 ${size} Tf`);
    content.push(`1 0 0 1 48 ${y} Tm`);
    content.push(`(${escapePdf(line)}) Tj`);
    y -= leading;
  });
  content.push("ET");
  const stream = content.join("\n");
  const objects = [];
  objects.push("<< /Type /Catalog /Pages 2 0 R >>");
  objects.push("<< /Type /Pages /Kids [3 0 R] /Count 1 >>");
  objects.push("<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>");
  objects.push(`<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`);
  objects.push("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");

  let out = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((obj, i) => {
    offsets.push(out.length);
    out += `${i + 1} 0 obj\n${obj}\nendobj\n`;
  });
  const xref = out.length;
  out += `xref\n0 ${objects.length + 1}\n`;
  out += "0000000000 65535 f \n";
  offsets.slice(1).forEach((off) => {
    out += `${String(off).padStart(10, "0")} 00000 n \n`;
  });
  out += `trailer << /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
  return Buffer.from(out, "utf8");
}

const dir = join(dirname(fileURLToPath(import.meta.url)), "..", "public");
mkdirSync(dir, { recursive: true });
const dest = join(dir, "Thivanka_Tharuka_CV.pdf");
writeFileSync(dest, buildPdf(lines));
console.log("Wrote", dest);
