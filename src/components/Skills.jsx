import Reveal from "./Reveal.jsx";

const SKILLS = [
  { icon: "⚡", title: "Frontend", desc: "HTML, CSS, JavaScript, TypeScript, React, Next.js — pixel-perfect and accessible." },
  { icon: "🎨", title: "Design & Motion", desc: "UI/UX, design systems, Figma, micro-interactions, GSAP-style animation." },
  { icon: "🧩", title: "Backend", desc: "Node.js, REST & GraphQL APIs, databases, and clean architecture." },
  { icon: "🚀", title: "Tooling", desc: "Git, CI/CD, Vite, performance budgets, and shipping fast with confidence." },
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

export default function Skills() {
  return (
    <section className="section skills" id="skills">
      <div className="section-head">
        <span className="section-index">02</span>
        <Reveal as="h2" className="section-title">Skills &amp; Tools</Reveal>
      </div>
      <div className="skills-grid">
        {SKILLS.map((s, i) => (
          <SkillCard key={s.title} skill={s} delay={i * 0.08} />
        ))}
      </div>
    </section>
  );
}
