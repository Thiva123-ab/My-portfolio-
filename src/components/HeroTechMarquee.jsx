import { Server, Layout, Smartphone, Database, Cloud, GitBranch, Cpu, Code2 } from "lucide-react";

const TECH_ITEMS = [
  { name: "Java", icon: Code2, category: "Core" },
  { name: "Spring Boot", icon: Server, category: "Backend" },
  { name: "React", icon: Layout, category: "Frontend" },
  { name: "TypeScript", icon: Code2, category: "Language" },
  { name: "Kotlin", icon: Smartphone, category: "Mobile" },
  { name: "Jetpack Compose", icon: Smartphone, category: "Mobile" },
  { name: "Docker", icon: Cloud, category: "DevOps" },
  { name: "MySQL", icon: Database, category: "Database" },
  { name: "PostgreSQL", icon: Database, category: "Database" },
  { name: "Tailwind CSS", icon: Layout, category: "Frontend" },
  { name: "WebSockets", icon: Server, category: "Realtime" },
  { name: "Git & GitHub", icon: GitBranch, category: "VCS" },
  { name: "AWS (Foundations)", icon: Cloud, category: "Cloud" },
];

export default function HeroTechMarquee() {
  // Duplicate for seamless infinite loop
  const duplicated = [...TECH_ITEMS, ...TECH_ITEMS];

  return (
    <div
      className="hero-marquee-wrapper"
      aria-label="Verified Core Technical Competencies"
      role="region"
    >
      {/* Left and right edge fade gradient masks */}
      <div className="hero-marquee-mask mask-left" aria-hidden="true" />
      <div className="hero-marquee-mask mask-right" aria-hidden="true" />

      <div className="hero-marquee-track">
        {duplicated.map((item, idx) => {
          const IconComponent = item.icon;
          return (
            <div key={`${item.name}-${idx}`} className="hero-marquee-item">
              <span className="hero-marquee-icon-wrap" aria-hidden="true">
                <IconComponent size={14} />
              </span>
              <span className="hero-marquee-name">{item.name}</span>
              <span className="hero-marquee-sep" aria-hidden="true">/</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
