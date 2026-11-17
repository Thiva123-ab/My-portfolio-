import { useState } from "react";
import {
  Server,
  Layout,
  Smartphone,
  Database,
  Cloud,
  Wrench,
  Layers,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from "lucide-react";
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
  const [expandedCards, setExpandedCards] = useState({});

  const toggleCard = (id) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const categories =
    activeTab === "all"
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

      {/* Filter Tabs */}
      <div className="skills-filter-tabs" role="tablist" aria-label="Filter skill categories">
        <button
          type="button"
          className={`filter-tab ${activeTab === "all" ? "active" : ""}`}
          onClick={() => setActiveTab("all")}
          data-cursor="hover"
        >
          All Domains
        </button>
        {SKILL_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            className={`filter-tab ${activeTab === cat.id ? "active" : ""}`}
            onClick={() => {
              setActiveTab(cat.id);
              // Auto-expand when specifically selected via tab for convenience
              setExpandedCards((prev) => ({ ...prev, [cat.id]: true }));
            }}
            data-cursor="hover"
          >
            {cat.title}
          </button>
        ))}
      </div>

      {/* Bento Grid with Simple Compact Cards & Click-to-Expand Details */}
      <div className="bento-grid">
        {categories.map((cat) => {
          const IconComp = ICON_MAP[cat.icon] || Layers;
          const isExpanded = !!expandedCards[cat.id];

          return (
            <article
              key={cat.id}
              className={`bento-card bento-${cat.id} ${isExpanded ? "is-expanded" : "is-compact"}`}
            >
              {/* Card Header (Clickable to toggle) */}
              <div
                className="bento-card-header"
                onClick={() => toggleCard(cat.id)}
                role="button"
                tabIndex={0}
                aria-expanded={isExpanded}
                aria-label={`${cat.title} details`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleCard(cat.id);
                  }
                }}
                data-cursor="hover"
              >
                <div className="bento-header-left">
                  <div className="bento-icon-box">
                    <IconComp size={22} />
                  </div>
                  <div>
                    <h3 className="bento-card-title">{cat.title}</h3>
                    <p className="bento-card-desc">{cat.description}</p>
                  </div>
                </div>

                <div className="bento-toggle-indicator">
                  <span className="bento-skills-count">{cat.skills.length} Skills</span>
                  {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
              </div>

              {/* Compact Mode: Clean inline skill tags preview */}
              {!isExpanded && (
                <div className="bento-compact-body">
                  <div className="bento-mini-tags">
                    {cat.skills.map((s) => (
                      <span key={s.name} className="bento-mini-tag">
                        {s.name}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    className="bento-expand-btn"
                    onClick={() => toggleCard(cat.id)}
                    data-cursor="hover"
                  >
                    <span>View proficiency &amp; details</span>
                    <ChevronDown size={14} />
                  </button>
                </div>
              )}

              {/* Expanded Mode: Full breakdown with badges and context */}
              {isExpanded && (
                <div className="bento-expanded-body">
                  <div className="bento-skills-list">
                    {cat.skills.map((s, idx) => (
                      <div key={idx} className="bento-skill-pill">
                        <div className="skill-pill-top">
                          <span className="skill-name">{s.name}</span>
                          <span
                            className={`skill-level-badge badge-${s.level
                              .toLowerCase()
                              .replace(/[^a-z0-9]/g, "-")}`}
                          >
                            {s.level}
                          </span>
                        </div>
                        <span className="skill-context">{s.context}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    className="bento-collapse-btn"
                    onClick={() => toggleCard(cat.id)}
                    data-cursor="hover"
                  >
                    <span>Show less</span>
                    <ChevronUp size={14} />
                  </button>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
