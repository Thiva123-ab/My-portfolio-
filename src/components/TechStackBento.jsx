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
} from "lucide-react";
import { SKILL_CATEGORIES } from "../data/skills.js";
import Card from "./Card.jsx";

const ICON_MAP = {
  Server,
  Layout,
  Smartphone,
  Database,
  Cloud,
  Wrench,
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
    <section className="section skills-section" id="skills">
      {/* Consistent Section Heading Pattern */}
      <div className="section-head">
        <span className="section-index">02</span>
        <h2 className="section-title">Tech Stack &amp; Skills</h2>
      </div>
      <p className="section-lead max-w-2xl">
        Honest, verified technical competencies derived directly from shipped repositories and coursework labs.
        Zero inflated titles or artificial percentage bars.
      </p>

      {/* Filter Tabs: Horizontally scrollable row on mobile */}
      <div className="skills-filter-wrapper">
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
                setExpandedCards((prev) => ({ ...prev, [cat.id]: true }));
              }}
              data-cursor="hover"
            >
              {cat.title}
            </button>
          ))}
        </div>
      </div>

      {/* Skills Grid: 1 col on mobile, 2 col on sm/md, 3 col on lg */}
      <div className="skills-card-grid">
        {categories.map((cat, idx) => {
          const IconComp = ICON_MAP[cat.icon] || Layers;
          const isExpanded = !!expandedCards[cat.id];
          const previewSkills = cat.skills.slice(0, 4);
          const hasMore = cat.skills.length > 4;

          return (
            <Card
              key={cat.id}
              className={`skills-stack-card ${isExpanded ? "is-expanded" : ""}`}
              delay={idx * 0.05}
            >
              {/* Card Header: 44px Icon Tile + Single-Line Title + Count Badge with Chevron */}
              <div
                className="skills-card-header"
                onClick={() => toggleCard(cat.id)}
                role="button"
                tabIndex={0}
                aria-expanded={isExpanded}
                aria-label={`Toggle ${cat.title} skills details`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleCard(cat.id);
                  }
                }}
                data-cursor="hover"
              >
                <div className="skills-header-left">
                  <div className="skills-icon-tile" aria-hidden="true">
                    <IconComp size={22} />
                  </div>
                  <h3 className="skills-card-title truncate" title={cat.title}>
                    {cat.title}
                  </h3>
                </div>

                <div className="skills-header-right">
                  <span className="skills-count-badge">
                    {cat.skills.length} Skills
                  </span>
                  <span className="skills-chevron" aria-hidden="true">
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </span>
                </div>
              </div>

              {/* Description below header at FULL card width (max 2 lines) */}
              <p className="skills-card-desc">
                {cat.description}
              </p>

              {/* Skill Chips Container */}
              <div className="skills-chips-area">
                {/* Compact Mode: First 4 chips + (+X more) chip */}
                {!isExpanded && (
                  <div className="skills-chips-wrap">
                    {previewSkills.map((s) => (
                      <span key={s.name} className="skill-chip">
                        {s.name}
                      </span>
                    ))}
                    {hasMore && (
                      <button
                        type="button"
                        className="skill-chip skill-chip-more"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleCard(cat.id);
                        }}
                        aria-label={`Show ${cat.skills.length - 4} more skills`}
                      >
                        +{cat.skills.length - 4} more
                      </button>
                    )}
                  </div>
                )}

                {/* Expanded Mode: Full breakdown with proficiency context */}
                {isExpanded && (
                  <div className="skills-expanded-list">
                    <div className="skills-chips-wrap expanded-chips">
                      {cat.skills.map((s) => (
                        <span key={s.name} className="skill-chip active-chip">
                          {s.name}
                        </span>
                      ))}
                    </div>

                    <div className="skills-detail-pills">
                      {cat.skills.map((s, sIdx) => (
                        <div key={sIdx} className="skill-context-item">
                          <div className="skill-context-top">
                            <span className="skill-context-name">{s.name}</span>
                            <span
                              className={`skill-context-badge badge-${s.level
                                .toLowerCase()
                                .replace(/[^a-z0-9]/g, "-")}`}
                            >
                              {s.level}
                            </span>
                          </div>
                          <span className="skill-context-text">{s.context}</span>
                        </div>
                      ))}
                    </div>

                    <button
                      type="button"
                      className="skills-collapse-trigger"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleCard(cat.id);
                      }}
                    >
                      <span>Show less</span>
                      <ChevronUp size={14} />
                    </button>
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
