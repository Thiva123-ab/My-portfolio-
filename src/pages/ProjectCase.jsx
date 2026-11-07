import { useCallback, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import Reveal from "../components/Reveal.jsx";
import Lightbox from "../components/Lightbox.jsx";
import { getProject } from "../data/projects.js";

export default function ProjectCase() {
  const { slug } = useParams();
  const project = getProject(slug);
  const [lightbox, setLightbox] = useState(null);

  const openGallery = useCallback((index = 0) => {
    if (!project?.gallery) return;
    setLightbox({ gallery: project.gallery, index });
  }, [project]);
  const closeGallery = useCallback(() => setLightbox(null), []);
  const navGallery = useCallback((dir) => {
    setLightbox((lb) => {
      if (!lb) return lb;
      const len = lb.gallery.length;
      return { ...lb, index: (lb.index + dir + len) % len };
    });
  }, []);

  if (!project || !project.caseStudy) {
    return <Navigate to="/projects" replace />;
  }

  return (
    <>
      <Seo title={project.title} description={project.blurb} path={`/projects/${project.slug}`} />
      <article className="section page-section case-study">
        <Link to="/projects" className="work-link case-back" data-cursor="hover">← All projects</Link>
        <Reveal as="h1" className="section-title">{project.title}</Reveal>
        <p className="page-lead">{project.desc}</p>
        <div className="work-tags case-tags">
          {project.tags.map((t) => <span key={t}>{t}</span>)}
        </div>
        <div className="work-actions" style={{ marginBottom: 32 }}>
          <a className="btn btn-primary" href={project.github} target="_blank" rel="noopener noreferrer" data-cursor="hover">
            {project.githubLabel || "GitHub"}
          </a>
          {project.live && (
            <a className="btn btn-ghost" href={project.live} target="_blank" rel="noopener noreferrer" data-cursor="hover">
              Live demo
            </a>
          )}
        </div>

        {project.img && (
          <button type="button" className="case-hero-shot" onClick={() => openGallery(0)} data-cursor="hover">
            <img src={project.img} alt={`${project.title} screenshot`} />
          </button>
        )}

        <div className="case-grid">
          {project.problem && (
            <Reveal as="section" className="case-block">
              <h2>Problem</h2>
              <p>{project.problem}</p>
            </Reveal>
          )}
          {project.approach && (
            <Reveal as="section" className="case-block" delay={0.08}>
              <h2>Approach</h2>
              <p>{project.approach}</p>
            </Reveal>
          )}
          {project.outcome && (
            <Reveal as="section" className="case-block" delay={0.16}>
              <h2>What shipped</h2>
              <p>{project.outcome}</p>
            </Reveal>
          )}
        </div>

        {project.features?.length > 0 && (
          <Reveal as="section" className="case-block">
            <h2>Highlights</h2>
            <ul className="work-features">
              {project.features.map((f) => <li key={f}>{f}</li>)}
            </ul>
          </Reveal>
        )}

        {project.gallery?.length > 0 && (
          <div className="case-gallery">
            {project.gallery.map((g, i) => (
              <button key={g.caption} type="button" className="case-thumb" onClick={() => openGallery(i)} data-cursor="hover">
                <img src={g.src} alt={g.caption} loading="lazy" />
              </button>
            ))}
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
