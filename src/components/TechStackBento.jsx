import { useState } from "react";
import { Server, Layout, Smartphone, Database, Cloud, Wrench, ShieldCheck, Terminal, Layers } from "lucide-react";
import { SKILL_CATEGORIES } from "../data/skills.js";

const ICON_MAP = {
  Server: Server,
  Layout: Layout,
  Smartphone: Smartphone,
  Database: Database,
  Cloud: Cloud,
  Wrench: Wrench,
};

export default function TechStackBento() {
  const [activeTab, setActiveTab] = useState("all");

  const categories = activeTab === "all" 
    ? SKILL_CATEGORIES 
    : SKILL_CATEGORIES.filter((c) => c.id === activeTab);

  return (
    <section className="section skills-bento-section" id="skills">
      <div className="section-head">
        <span className="section-index">02</span>
        <h2 className="section-title">Tech Stack &amp; Skills</h2>
      </div>
      <p className="section-lead">
        Honest, verified technical competencies derived directly from shipped repositories and coursework labs.
        Zero inflated titles or artificial percentage bars.
      </p>

      <div className="skills-filter-tabs" role="tablist">
        <button
          className={`filter-tab ${activeTab === "all" ? "active" : ""}`}
          onClick={() => setActiveTab("all")}
        >
          All Domains
        </button>
        {SKILL_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            className={`filter-tab ${activeTab === cat.id ? "active" : ""}`}
            onClick={() => setActiveTab(cat.id)}
          >
            {cat.title}
          </button>
        ))}
      </div>

      <div className="bento-grid">
        {categories.map((cat) => {
          const IconComp = ICON_MAP[cat.icon] || Layers;
          return (
            <div key={cat.id} className={`bento-card bento-${cat.id}`}>
              <div className="bento-card-header">
                <div className="bento-icon-box">
                  <IconComp size={22} />
                </div>
                <div>
                  <h3 className="bento-card-title">{cat.title}</h3>
                  <p className="bento-card-desc">{cat.description}</p>
                </div>
              </div>

              <div className="bento-skills-list">
                {cat.skills.map((s, idx) => (
                  <div key={idx} className="bento-skill-pill">
                    <div className="skill-pill-top">
                      <span className="skill-name">{s.name}</span>
                      <span className={`skill-level-badge badge-${s.level.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}>
                        {s.level}
                      </span>
                    </div>
                    <span className="skill-context">{s.context}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
