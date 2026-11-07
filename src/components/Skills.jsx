import Reveal from "./Reveal.jsx";
import { Link } from "react-router-dom";

const SKILLS = [
  {
    icon: "⚙️",
    title: "Backend",
    desc: "Java, Spring Boot, MySQL, Spring Security, WebSockets — Flood Relief Live Map and Pharmacy Stock.",
    proof: "/projects/flood-relief",
    proofLabel: "Flood Relief case study",
  },
  {
    icon: "💻",
    title: "Frontend",
    desc: "React and TypeScript UIs — LectureLens, AutoSync Garage, Recruiter-AI. Not listed as a Next.js specialist (LectureLens uses TanStack Start).",
    proof: "/projects/lecturelens",
    proofLabel: "LectureLens case study",
  },
  {
    icon: "📱",
    title: "Mobile",
    desc: "Native Android with Kotlin, Jetpack Compose, Material 3, Room — FocusFlow.",
    proof: "/projects/focusflow",
    proofLabel: "FocusFlow case study",
  },
  {
    icon: "☁️",
    title: "Cloud & containers",
    desc: "Docker, AWS Educate Cloud 101, KodeKloud AWS labs, Kubernetes beginners. No multi-cloud expert claim.",
    proof: "/certifications",
    proofLabel: "Certifications",
  },
  {
    icon: "🤖",
    title: "AI in products",
    desc: "LectureLens study tools (Supabase + AI), Recruiter-AI (Gemini), Motion-Strike (MediaPipe pose).",
    proof: "/projects/lecturelens",
    proofLabel: "See AI projects",
  },
  {
    icon: "🎨",
    title: "Design & HCI",
    desc: "Figma and UI/UX interest applied to maps, study tools, and Android wellbeing flows.",
    proof: "/projects",
    proofLabel: "Project grid",
  },
];

const TECH = [
  "Java", "Spring Boot", "Spring Security", "MySQL", "WebSockets",
  "Kotlin", "Jetpack Compose", "Room",
  "TypeScript", "React", "TanStack Start", "Supabase",
  "Node.js", "Gemini API", "Firebase",
  "HTML", "CSS", "Leaflet", "Three.js", "MediaPipe",
  "Docker", "AWS Educate", "Kubernetes (beginner)",
  "Git", "Figma",
];

function SkillCard({ skill, delay }) {
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <Reveal as="article" className="skill-card" delay={delay} onMouseMove={onMove}>
      <span className="skill-icon">{skill.icon}</span>
      <h3>{skill.title}</h3>
      <p>{skill.desc}</p>
      <Link className="skill-proof" to={skill.proof} data-cursor="hover">
        {skill.proofLabel} →
      </Link>
    </Reveal>
  );
}

export default function Skills() {
  return (
    <section className="section skills" id="skills">
      <div className="section-head">
        <span className="section-index">02</span>
        <Reveal as="h2" className="section-title">Skills with evidence</Reveal>
      </div>

      <div className="skills-cards skills-cards-full">
        {SKILLS.map((s, i) => (
          <SkillCard key={s.title} skill={s} delay={i * 0.08} />
        ))}
      </div>

      <Reveal className="tech-cloud" delay={0.1}>
        <span className="tech-label">Tools I actually use in repos</span>
        <div className="tech-badges">
          {TECH.map((t) => (
            <span className="tech-badge" key={t} data-cursor="hover">{t}</span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
