import { ArrowRight, Server, Layout, Smartphone } from "lucide-react";

const STACK_GROUPS = [
  {
    category: "Backend Architecture",
    icon: Server,
    chips: [
      { name: "Java", highlight: true },
      { name: "Spring Boot", highlight: true },
      { name: "REST APIs", highlight: false },
      { name: "WebSockets", highlight: false },
    ],
  },
  {
    category: "Frontend Engineering",
    icon: Layout,
    chips: [
      { name: "React", highlight: true },
      { name: "TypeScript", highlight: true },
      { name: "Tailwind CSS", highlight: false },
      { name: "JavaScript", highlight: false },
    ],
  },
  {
    category: "Mobile & Cloud Practice",
    icon: Smartphone,
    chips: [
      { name: "Kotlin", highlight: true },
      { name: "Jetpack Compose", highlight: false },
      { name: "Docker", highlight: false },
      { name: "AWS (Foundations)", highlight: false },
    ],
  },
];

export default function AboutCoreStackCard() {
  const handleScrollToSkills = (e) => {
    e.preventDefault();
    const skillsEl = document.getElementById("skills");
    if (skillsEl) {
      skillsEl.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/#skills";
    }
  };

  return (
    <div className="about-subcard about-stack-card" role="region" aria-label="Core Technical Stack">
      <div className="about-card-eyebrow-row">
        <span className="about-card-eyebrow">CORE TECH STACK</span>
        <a
          href="#skills"
          onClick={handleScrollToSkills}
          className="about-card-action-link"
          data-cursor="hover"
          title="Jump to comprehensive skills breakdown"
        >
          <span>See all skills</span>
          <ArrowRight size={12} />
        </a>
      </div>

      <div className="about-stack-groups">
        {STACK_GROUPS.map((grp) => {
          const IconComp = grp.icon;
          return (
            <div key={grp.category} className="about-stack-group">
              <div className="about-stack-group-head">
                <IconComp size={12} className="about-stack-group-icon" aria-hidden="true" />
                <span className="about-stack-group-title">{grp.category}</span>
              </div>

              <div className="about-stack-chips">
                {grp.chips.map((chip) => (
                  <span
                    key={chip.name}
                    className={`about-stack-chip ${chip.highlight ? "is-highlight" : ""}`}
                  >
                    {chip.name}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
