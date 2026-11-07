import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Reveal from "./Reveal.jsx";

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
    desc: "React and TypeScript UIs — LectureLens, AutoSync Garage, Recruiter-AI. LectureLens uses TanStack Start (not Next.js).",
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
    desc: "Docker, AWS Educate Cloud 101, KodeKloud AWS labs, Kubernetes beginners.",
    proof: "/certifications",
    proofLabel: "Certifications",
  },
  {
    icon: "🤖",
    title: "AI in products",
    desc: "LectureLens study tools, Recruiter-AI (Gemini), Motion-Strike (MediaPipe pose).",
    proof: "/projects/lecturelens",
    proofLabel: "See AI projects",
  },
  {
    icon: "🎨",
    title: "Design & HCI",
    desc: "Figma and UI/UX applied to maps, study tools, and Android wellbeing flows.",
    proof: "/projects",
    proofLabel: "Project grid",
  },
];

const GRAPH = [
  {
    name: "Java / Spring",
    score: 5,
    detail: "3 repos",
    note: "Flood Relief · Pharmacy · DEA",
  },
  {
    name: "React",
    score: 4,
    detail: "4 repos",
    note: "LectureLens · AutoSync · Recruiter-AI · Motion-Strike",
  },
  {
    name: "Kotlin",
    score: 3,
    detail: "1 deep app",
    note: "FocusFlow — Compose, Room, Material 3",
  },
  {
    name: "SQL / MySQL",
    score: 4,
    detail: "3 repos",
    note: "Spring Data JPA on flood + pharmacy systems",
  },
  {
    name: "AI",
    score: 4,
    detail: "3 products",
    note: "Gemini, study tools, MediaPipe pose",
  },
  {
    name: "Cloud",
    score: 2,
    detail: "Beginner",
    note: "Docker + AWS Educate 101 + K8s labs",
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

const MAX = 5;
const CX = 160;
const CY = 158;
const R = 108;

function polar(i, n, ratio) {
  const a = -Math.PI / 2 + (i * 2 * Math.PI) / n;
  return {
    x: CX + R * ratio * Math.cos(a),
    y: CY + R * ratio * Math.sin(a),
  };
}

function SkillRadar({ active, onHover }) {
  const n = GRAPH.length;
  const [drawn, setDrawn] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDrawn(true);
          io.unobserve(el);
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const rings = [0.2, 0.4, 0.6, 0.8, 1];
  const shape = useMemo(
    () =>
      GRAPH.map((g, i) => polar(i, n, drawn ? g.score / MAX : 0.08))
        .map((p) => `${p.x},${p.y}`)
        .join(" "),
    [drawn, n]
  );

  return (
    <div className="radar-wrap" ref={wrapRef}>
      <svg className="radar-svg" viewBox="0 0 320 320" role="img" aria-label="Skill radar by project evidence">
        {rings.map((ring) => {
          const pts = Array.from({ length: n }, (_, i) => polar(i, n, ring));
          return (
            <polygon
              key={ring}
              className="radar-ring"
              points={pts.map((p) => `${p.x},${p.y}`).join(" ")}
            />
          );
        })}
        {GRAPH.map((_, i) => {
          const p = polar(i, n, 1);
          return <line key={i} className="radar-axis" x1={CX} y1={CY} x2={p.x} y2={p.y} />;
        })}
        <polygon className={`radar-fill ${drawn ? "is-on" : ""}`} points={shape} />
        {GRAPH.map((g, i) => {
          const p = polar(i, n, drawn ? g.score / MAX : 0.08);
          const lab = polar(i, n, 1.22);
          return (
            <g
              key={g.name}
              className={`radar-node ${active === i ? "is-active" : ""}`}
              onMouseEnter={() => onHover(i)}
              onMouseLeave={() => onHover(null)}
            >
              <circle cx={p.x} cy={p.y} r={active === i ? 6 : 4.5} />
              <text x={lab.x} y={lab.y} textAnchor="middle" dominantBaseline="middle">
                {g.name}
              </text>
            </g>
          );
        })}
      </svg>
      <p className="radar-caption">Scale 1–5 from repos and certs — not a fake “expert %”.</p>
    </div>
  );
}

function SkillBar({ item, delay, active, onHover }) {
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
    <button
      type="button"
      className={`bar-row graph-row ${active ? "is-active" : ""}`}
      ref={ref}
      onMouseEnter={onHover}
      onFocus={onHover}
    >
      <div className="bar-top">
        <span>{item.name}</span>
        <span className="bar-pct">{item.detail}</span>
      </div>
      <div className="bar-track">
        <span
          className="bar-fill"
          style={{ width: shown ? `${(item.score / MAX) * 100}%` : "0%", transitionDelay: `${delay}s` }}
        />
      </div>
      <small className="graph-note">{item.note}</small>
    </button>
  );
}

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
  const [active, setActive] = useState(null);

  return (
    <section className="section skills" id="skills">
      <div className="section-head">
        <span className="section-index">02</span>
        <Reveal as="h2" className="section-title">Skills with evidence</Reveal>
      </div>

      <div className="skills-dash">
        <Reveal className="skills-panel radar-panel" delay={0.05}>
          <h3 className="panel-title">Evidence graph</h3>
          <SkillRadar active={active} onHover={setActive} />
        </Reveal>
        <Reveal className="skills-panel" delay={0.12}>
          <h3 className="panel-title">Where it shows up</h3>
          {GRAPH.map((item, i) => (
            <SkillBar
              key={item.name}
              item={item}
              delay={i * 0.08}
              active={active === i}
              onHover={() => setActive(i)}
            />
          ))}
        </Reveal>
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
