import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, ArrowUpRight, FolderGit2 } from "lucide-react";
import { getFeatured } from "../../data/projects.js";

export default function AboutFeaturedCard() {
  const featured = getFeatured();
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = featured.length;

  const handlePrev = useCallback((e) => {
    e?.preventDefault();
    setIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const handleNext = useCallback((e) => {
    e?.preventDefault();
    setIndex((prev) => (prev + 1) % total);
  }, [total]);

  // Auto-rotation every 6 seconds, paused on hover or reduced motion
  useEffect(() => {
    if (isPaused || total <= 1) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % total);
    }, 6000);

    return () => clearInterval(timer);
  }, [isPaused, total]);

  const current = featured[index];
  if (!current) return null;

  return (
    <div
      className="about-subcard about-featured-spotlight-card"
      role="region"
      aria-label="Featured Projects Spotlight Carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="about-card-eyebrow-row">
        <span className="about-card-eyebrow">FEATURED SPOTLIGHT</span>

        <div className="about-featured-controls" role="group" aria-label="Carousel navigation">
          <span className="about-featured-index" aria-live="polite">
            {index + 1} of {total}
          </span>
          <button
            type="button"
            className="about-carousel-btn"
            onClick={handlePrev}
            aria-label="Previous featured project"
            data-cursor="hover"
          >
            <ChevronLeft size={13} />
          </button>
          <button
            type="button"
            className="about-carousel-btn"
            onClick={handleNext}
            aria-label="Next featured project"
            data-cursor="hover"
          >
            <ChevronRight size={13} />
          </button>
        </div>
      </div>

      <div className="about-spotlight-body">
        {/* 16:10 Thumbnail */}
        <Link
          to={`/projects/${current.slug}`}
          className="about-spotlight-thumb-wrap"
          data-cursor="hover"
          tabIndex={-1}
          aria-hidden="true"
        >
          {current.img ? (
            <img
              src={current.img}
              alt={`Screenshot of ${current.title}`}
              className="about-spotlight-thumb"
              loading="lazy"
            />
          ) : (
            <div className="about-spotlight-thumb-placeholder">
              <FolderGit2 size={24} className="text-teal" />
            </div>
          )}
          <span className="about-spotlight-badge">PROJECT {current.num}</span>
        </Link>

        {/* Project Meta */}
        <div className="about-spotlight-info">
          <h4 className="about-spotlight-title">
            <Link to={`/projects/${current.slug}`} data-cursor="hover">
              {current.title}
            </Link>
          </h4>

          <p className="about-spotlight-blurb">{current.blurb}</p>

          <div className="about-spotlight-footer">
            <div className="about-spotlight-tags">
              {current.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="about-spotlight-tag">
                  {tag}
                </span>
              ))}
            </div>

            <Link
              to={`/projects/${current.slug}`}
              className="about-spotlight-link"
              data-cursor="hover"
              title={`View ${current.title} case study`}
            >
              <span>Explore</span>
              <ArrowUpRight size={13} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
