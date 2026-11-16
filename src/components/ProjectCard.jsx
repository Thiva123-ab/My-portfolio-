import { Link } from "react-router-dom";
import { ExternalLink, Eye, Layers } from "lucide-react";
import { Github } from "./BrandIcons.jsx";

export default function ProjectCard({ project, index = 0, onOpenGallery, compact = false }) {
  const githubLabel = project.githubLabel || "GitHub Repo";

  return (
    <article className={`work-card ${compact ? "work-card-compact" : ""}`}>
      {/* Card Header Bar (No overlapping on screenshot) */}
      <div className="work-card-bar">
        <span className="work-card-num">{project.num}</span>
        <div className="work-card-meta-tags">
          {project.groupProject ? (
            <span className="work-badge-group">👥 Group Project</span>
          ) : (
            <span className="work-badge-solo">👤 Lead / Solo</span>
          )}
        </div>
      </div>

      <div className={`work-thumb thumb-${index % 4}`}>
        {project.img ? (
          <img src={project.img} alt={`${project.title} preview`} loading="lazy" />
        ) : (
          <div className="thumb-fallback">
            <span className="thumb-icon">{project.icon || "💻"}</span>
            <span className="thumb-fallback-title">{project.title}</span>
          </div>
        )}
        {project.gallery?.length > 0 && (
          <button
            type="button"
            className="thumb-view"
            onClick={() => onOpenGallery?.(project.gallery, 0)}
            data-cursor="hover"
            aria-label={`View ${project.gallery.length} screenshots of ${project.title}`}
          >
            <Eye size={14} /> View {project.gallery.length} screenshots
          </button>
        )}
      </div>

      <div className="work-body">
        <h3 className="work-title">{project.title}</h3>
        <p className="work-desc">{compact ? project.blurb : project.desc}</p>

        {!compact && project.features?.length > 0 && (
          <ul className="work-features">
            {project.features.slice(0, 4).map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        )}

        {project.githubNote && <p className="work-note">{project.githubNote}</p>}

        <div className="work-tags">
          {project.tags.map((t) => (
            <span key={t} className="work-tag-pill">{t}</span>
          ))}
        </div>

        <div className="work-actions">
          {project.caseStudy && (
            <Link className="btn btn-primary btn-sm" to={`/projects/${project.slug}`} data-cursor="hover">
              <span>Case study</span>
              <ExternalLink size={14} />
            </Link>
          )}

          {project.gallery?.length > 0 && (
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={() => onOpenGallery?.(project.gallery, 0)}
              data-cursor="hover"
            >
              Gallery
            </button>
          )}

          {project.live && (
            <a className="btn btn-ghost btn-sm" href={project.live} target="_blank" rel="noopener noreferrer" data-cursor="hover">
              Live Demo
            </a>
          )}

          <a
            className="btn btn-ghost btn-sm btn-github"
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="hover"
          >
            <Github size={14} />
            <span>{githubLabel}</span>
          </a>
        </div>
      </div>
    </article>
  );
}
