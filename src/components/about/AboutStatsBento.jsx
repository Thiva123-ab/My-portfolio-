import { useEffect, useRef, useState } from "react";

function AnimatedCount({ target = 12, duration = 1000 }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    // Check if user prefers reduced motion
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setCount(target);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          let startTime = null;

          const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out quad
            const easeOut = 1 - (1 - progress) * (1 - progress);
            setCount(Math.floor(easeOut * target));

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setCount(target);
            }
          };

          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={elementRef}>{count}</span>;
}

export default function AboutStatsBento() {
  return (
    <div className="about-stats-bento" role="region" aria-label="Key statistics and academic standing">
      {/* 1. Academic Affiliation */}
      <div className="about-stat-cell">
        <span className="about-stat-label">AFFILIATION</span>
        <strong className="about-stat-value">NSBM</strong>
        <span className="about-stat-sub">BSc (Hons) CS · 2024–Feb 2028</span>
      </div>

      <div className="about-stat-divider" aria-hidden="true" />

      {/* 2. Public Projects (with Count-Up Animation) */}
      <div className="about-stat-cell">
        <span className="about-stat-label">PORTFOLIO WORK</span>
        <strong className="about-stat-value text-gradient-accent">
          <AnimatedCount target={12} duration={900} />
        </strong>
        <span className="about-stat-sub">Featured public projects</span>
      </div>

      <div className="about-stat-divider" aria-hidden="true" />

      {/* 3. Availability Status with Live Pulse */}
      <div className="about-stat-cell">
        <span className="about-stat-label">CURRENT AVAILABILITY</span>
        <div className="about-stat-status-row">
          <span className="about-status-pulse" aria-hidden="true">
            <span className="about-pulse-ring" />
            <span className="about-pulse-dot" />
          </span>
          <strong className="about-stat-value-status">Status</strong>
        </div>
        <span className="about-stat-sub text-teal-light">Open to Opportunities</span>
      </div>
    </div>
  );
}
