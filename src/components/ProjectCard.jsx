import { Link } from "react-router-dom";

export default function ProjectCard({ project, index = 0, onOpenGallery, compact = false }) {
  const githubLabel = project.githubLabel || "View on GitHub";

  return (
    <article className={`work-card ${compact ? "work-card-compact" : ""}`}>
      <div className={`work-thumb thumb-${index % 4}`}>
        {project.img ? (
          <img src={project.img} alt={`${project.title} preview`} loading="lazy" />
        ) : (
          <span className="thumb-icon">{project.icon}</span>
        )}
        {project.gallery?.length > 0 && (
          <button
            className="thumb-view"
            onClick={() => onOpenGallery?.(project.gallery, 0)}
            data-cursor="hover"
            aria-label={`View ${project.gallery.length} screenshots of ${project.title}`}
          >
            View {project.gallery.length} screenshots
          </button>
        )}
        <span className="work-num">{project.num}</span>
      </div>
      <div className="work-body">
        <h3>{project.title}</h3>
        <p>{compact ? project.blurb : project.desc}</p>
        {!compact && project.features?.length > 0 && (
          <ul className="work-features">
            {project.features.slice(0, 5).map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        )}
        {project.githubNote && <p className="work-note">{project.githubNote}</p>}
        <div className="work-tags">
          {project.tags.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        <div className="work-actions">
          {project.caseStudy && (
            <Link className="work-link" to={`/projects/${project.slug}`} data-cursor="hover">
              Case study
              <svg viewBox="0 0 24 24" width="16" height="16">
                <path d="M7 17 17 7M9 7h8v8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          )}
          {project.gallery && (
            <button
              type="button"
              className="work-link work-link-btn"
              onClick={() => onOpenGallery?.(project.gallery, 0)}
              data-cursor="hover"
            >
              Gallery
            </button>
          )}
          {project.live && (
            <a className="work-link" href={project.live} target="_blank" rel="noopener noreferrer" data-cursor="hover">
              Live demo
            </a>
          )}
          <a
            className="work-link"
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="hover"
          >
            {githubLabel}
            <svg viewBox="0 0 24 24" width="16" height="16">
              <path d="M7 17 17 7M9 7h8v8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </article>
  );
}
