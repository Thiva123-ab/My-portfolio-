import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal.jsx";

const SKILLS = [
  { icon: "⚙️", title: "Backend", desc: "Java, Spring Boot, and MySQL — robust REST APIs and clean, layered architecture." },
  { icon: "☁️", title: "Cloud & DevOps", desc: "Containerized apps deployed across AWS, GCP, and Azure with Docker." },
  { icon: "💻", title: "Frontend", desc: "React, TypeScript, and modern responsive UIs with Tailwind CSS and accessible design patterns." },
  { icon: "🤖", title: "AI & Modern Web", desc: "AI-powered apps with Supabase backends, TanStack Router, and real-time study tools." },
  { icon: "🎨", title: "Design & HCI", desc: "UI/UX design, Human-Computer Interaction, and prototyping with Figma." },
];

const LEVELS = [
  { name: "Java", level: 90 },
  { name: "Spring Boot", level: 85 },
  { name: "TypeScript / React", level: 82 },
  { name: "MySQL", level: 85 },
  { name: "JavaScript", level: 78 },
  { name: "Supabase / Cloud", level: 75 },
  { name: "UI/UX · Figma", level: 80 },
];

const TECH = [
  "Java", "Spring Boot", "TypeScript", "React", "MySQL", "JavaScript", "HTML", "CSS",
  "Supabase", "Tailwind CSS", "Docker", "AWS", "GCP", "Azure", "REST API", "Git", "Figma", "PHP", "AI",
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
    </Reveal>
  );
}

function SkillBar({ name, level, delay }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.unobserve(el);
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="bar-row" ref={ref}>
      <div className="bar-top">
        <span>{name}</span>
        <span className="bar-pct">{level}%</span>
      </div>
      <div className="bar-track">
        <span
          className="bar-fill"
          style={{ width: shown ? `${level}%` : "0%", transitionDelay: `${delay}s` }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section className="section skills" id="skills">
      <div className="section-head">
        <span className="section-index">02</span>
        <Reveal as="h2" className="section-title">Skills Dashboard</Reveal>
      </div>

      <div className="skills-dash">
        <div className="skills-cards">
          {SKILLS.map((s, i) => (
            <SkillCard key={s.title} skill={s} delay={i * 0.08} />
          ))}
        </div>

        <Reveal className="skills-panel" delay={0.15}>
          <h3 className="panel-title">Proficiency</h3>
          {LEVELS.map((l, i) => (
            <SkillBar key={l.name} name={l.name} level={l.level} delay={i * 0.08} />
          ))}
        </Reveal>
      </div>

      <Reveal className="tech-cloud" delay={0.1}>
        <span className="tech-label">Tech I work with</span>
        <div className="tech-badges">
          {TECH.map((t) => (
            <span className="tech-badge" key={t} data-cursor="hover">{t}</span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
