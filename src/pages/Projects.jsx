import { useCallback, useMemo, useState } from "react";
import { Search, X, SlidersHorizontal, Layers } from "lucide-react";
import Seo from "../components/Seo.jsx";
import Reveal from "../components/Reveal.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
import Lightbox from "../components/Lightbox.jsx";
import GithubActivity from "../components/GithubActivity.jsx";
import { FILTERS, PROJECTS } from "../data/projects.js";

export default function Projects() {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [lightbox, setLightbox] = useState(null);

  const filteredList = useMemo(() => {
    let result = filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.filters.includes(filter));
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.desc.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return result;
  }, [filter, searchQuery]);

  const openGallery = useCallback((gallery, index = 0) => setLightbox({ gallery, index }), []);
  const closeGallery = useCallback(() => setLightbox(null), []);
  const navGallery = useCallback((dir) => {
    setLightbox((lb) => {
      if (!lb) return lb;
      const len = lb.gallery.length;
      return { ...lb, index: (lb.index + dir + len) % len };
    });
  }, []);

  return (
    <>
      <Seo
        title="Projects"
        description="Filterable project grid: Spring Boot flood relief, LectureLens, Recruiter-AI, FocusFlow, AutoSync, Pharmacy, Motion-Strike, DEA, Crisis Copilot, NASA Space Apps, SuwaDaru."
        path="/projects"
      />
      <section className="section page-section">
        <div className="section-head">
          <span className="section-index">03</span>
          <Reveal as="h1" className="section-title">
            Projects Portfolio
          </Reveal>
        </div>
        <p className="page-lead">
          Every card links to an active GitHub repository. Live demos are provided where deployed.
          Lab experiments and introductory classroom tasks are excluded from this showcase.
        </p>

        {/* Real-time search and filter controls */}
        <div className="projects-controls">
          <div className="project-search-bar">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search by title, tech stack (e.g. Spring, React, Gemini, Kotlin)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search projects by title or technology"
            />
            {searchQuery && (
              <button
                type="button"
                className="search-clear"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search input"
              >
                <X size={15} />
              </button>
            )}
          </div>

          <div className="filter-row" role="tablist" aria-label="Filter projects by technology category">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                className={`filter-chip ${filter === f.id ? "active" : ""}`}
                onClick={() => setFilter(f.id)}
                data-cursor="hover"
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        <div className="work-grid">
          {filteredList.length === 0 ? (
            <div className="empty-search-state">
              <Layers size={36} className="empty-icon" />
              <h3>No matching projects found</h3>
              <p>Try searching for a different keyword or select the &ldquo;All&rdquo; filter tab.</p>
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() => {
                  setFilter("all");
                  setSearchQuery("");
                }}
              >
                Reset filters
              </button>
            </div>
          ) : (
            filteredList.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 2) * 0.05}>
                <ProjectCard project={p} index={i} onOpenGallery={openGallery} />
              </Reveal>
            ))
          )}
        </div>

        {/* Live GitHub Activity Section */}
        <div style={{ marginTop: "64px" }}>
          <GithubActivity />
        </div>
      </section>

      {lightbox && (
        <Lightbox
          gallery={lightbox.gallery}
          index={lightbox.index}
          onClose={closeGallery}
          onNav={navGallery}
        />
      )}
    </>
  );
}
