import { useCallback, useMemo, useState } from "react";
import Seo from "../components/Seo.jsx";
import Reveal from "../components/Reveal.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
import Lightbox from "../components/Lightbox.jsx";
import { FILTERS, PROJECTS } from "../data/projects.js";

export default function Projects() {
  const [filter, setFilter] = useState("all");
  const [lightbox, setLightbox] = useState(null);

  const list = useMemo(
    () => (filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.filters.includes(filter))),
    [filter]
  );

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
        description="Filterable project grid: Spring Boot flood relief, LectureLens, Recruiter-AI, FocusFlow, AutoSync, Pharmacy, Motion-Strike, DEA."
        path="/projects"
      />
      <section className="section page-section">
        <div className="section-head">
          <span className="section-index">Work</span>
          <Reveal as="h1" className="section-title">Projects</Reveal>
        </div>
        <p className="page-lead">
          Every card links to GitHub. Live/demo appears only when a public URL exists.
          Gym and in-class lab apps are omitted from this grid.
        </p>
        <div className="filter-row" role="tablist" aria-label="Filter projects">
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
        <div className="work-grid">
          {list.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 2) * 0.06}>
              <ProjectCard project={p} index={i} onOpenGallery={openGallery} />
            </Reveal>
          ))}
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
