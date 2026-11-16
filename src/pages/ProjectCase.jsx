import { useCallback, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ExternalLink, Github, Eye, CheckCircle2, ChevronRight, Layers } from "lucide-react";
import Seo from "../components/Seo.jsx";
import Reveal from "../components/Reveal.jsx";
import Lightbox from "../components/Lightbox.jsx";
import { getProject, PROJECTS } from "../data/projects.js";

export default function ProjectCase() {
  const { slug } = useParams();
  const project = getProject(slug);
  const [lightbox, setLightbox] = useState(null);

  const openGallery = useCallback(
    (index = 0) => {
      if (!project?.gallery?.length) return;
      setLightbox({ gallery: project.gallery, index });
    },
    [project]
  );

  const closeGallery = useCallback(() => setLightbox(null), []);
  const navGallery = useCallback((dir) => {
    setLightbox((lb) => {
      if (!lb) return lb;
      const len = lb.gallery.length;
      return { ...lb, index: (lb.index + dir + len) % len };
    });
  }, []);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  // Find next project in list for exploration
  const currentIndex = PROJECTS.findIndex((p) => p.slug === slug);
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];

  return (
    <>
      <Seo title={`${project.title} — Case Study`} description={project.blurb} path={`/projects/${project.slug}`} />
      <article className="section page-section case-study">
        <Link to="/projects" className="work-link case-back" data-cursor="hover">
          <ArrowLeft size={16} /> All projects
        </Link>

        <div className="case-header">
          <span className="case-num-badge">PROJECT {project.num}</span>
          <Reveal as="h1" className="section-title">
            {project.title}
          </Reveal>
          <p className="page-lead">{project.desc}</p>

          <div className="work-tags case-tags">
            {project.tags.map((t) => (
              <span key={t} className="work-tag-pill">{t}</span>
            ))}
          </div>

          <div className="case-action-bar">
            <a
              className="btn btn-primary"
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
            >
              <Github size={16} />
              <span>{project.githubLabel || "View Repository"}</span>
            </a>
            {project.live && (
              <a
                className="btn btn-ghost"
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
              >
                <span>Live Demo</span>
                <ExternalLink size={15} />
              </a>
            )}
          </div>
        </div>

        {project.img && (
          <div className="case-hero-shot-wrap">
            <button
              type="button"
              className="case-hero-shot"
              onClick={() => openGallery(0)}
              data-cursor="hover"
              aria-label="Enlarge primary screenshot"
            >
              <img src={project.img} alt={`${project.title} primary screenshot`} />
              <span className="hero-shot-overlay">
                <Eye size={18} /> Click to expand full resolution
              </span>
            </button>
          </div>
        )}

        {/* Structured Problem → Approach → Outcome Breakdown */}
        <div className="case-grid">
          {project.problem && (
            <Reveal as="section" className="case-block">
              <div className="case-block-head">
                <span className="case-step">01</span>
                <h2>The Problem</h2>
              </div>
              <p>{project.problem}</p>
            </Reveal>
          )}

          {project.approach && (
            <Reveal as="section" className="case-block" delay={0.08}>
              <div className="case-block-head">
                <span className="case-step">02</span>
                <h2>Technical Approach</h2>
              </div>
              <p>{project.approach}</p>
            </Reveal>
          )}

          {project.outcome && (
            <Reveal as="section" className="case-block" delay={0.16}>
              <div className="case-block-head">
                <span className="case-step">03</span>
                <h2>Outcome &amp; Shipped Solution</h2>
              </div>
              <p>{project.outcome}</p>
            </Reveal>
          )}
        </div>

        {/* Key Features List */}
        {project.features?.length > 0 && (
          <Reveal as="section" className="case-block" style={{ marginTop: "40px" }}>
            <div className="case-block-head">
              <span className="case-step">04</span>
              <h2>Key Features &amp; Capabilities</h2>
            </div>
            <ul className="work-features case-features-list">
              {project.features.map((f) => (
                <li key={f}>
                  <CheckCircle2 size={16} className="feature-check" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        )}

        {/* What I Learned Section */}
        <Reveal as="section" className="case-block case-learnings" style={{ marginTop: "40px" }}>
          <div className="case-block-head">
            <span className="case-step">05</span>
            <h2>Key Engineering Takeaways</h2>
          </div>
          <p>
            {project.learnings ||
              `Architecting this application deepened hands-on proficiency with ${project.tags.slice(0, 3).join(", ")}, enforcing clean layer separation, error handling under edge cases, and asynchronous state synchronization.`}
          </p>
          {!project.learnings && (
            <p className="case-placeholder-note">
              [ADD: Additional architectural retrospective or performance benchmark metrics for {project.title}]
            </p>
          )}
        </Reveal>

        {/* Screenshot Gallery */}
        {project.gallery?.length > 0 && (
          <section className="case-gallery-section">
            <h2 className="gallery-title">Interface &amp; Workflow Gallery ({project.gallery.length} Screens)</h2>
            <div className="case-gallery">
              {project.gallery.map((g, i) => (
                <button
                  key={g.caption}
                  type="button"
                  className="case-thumb"
                  onClick={() => openGallery(i)}
                  data-cursor="hover"
                  aria-label={`View screenshot: ${g.caption}`}
                >
                  <img src={g.src} alt={g.caption} loading="lazy" />
                  <span className="case-thumb-caption">{g.caption}</span>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Next Project Footer */}
        {nextProject && (
          <div className="case-next-footer">
            <span className="next-label">Next Project</span>
            <Link to={`/projects/${nextProject.slug}`} className="next-project-link" data-cursor="hover">
              <span>{nextProject.title}</span>
              <ChevronRight size={18} />
            </Link>
          </div>
        )}
      </article>

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
