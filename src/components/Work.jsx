import { useCallback, useEffect, useState } from "react";
import Reveal from "./Reveal.jsx";
import floodLanding from "../assets/projects/flood/01-landing.png";
import floodMap from "../assets/projects/flood/02-live-map.png";
import floodReports from "../assets/projects/flood/03-reports.png";
import floodAddReport from "../assets/projects/flood/04-add-report.png";
import floodEmergency from "../assets/projects/flood/05-emergency-help.png";
import floodHelpFeed from "../assets/projects/flood/06-help-feed.png";
import floodAdmin from "../assets/projects/flood/07-admin-dashboard.png";
import floodAnalytics from "../assets/projects/flood/08-analytics.png";

const FLOOD_GALLERY = [
  { src: floodLanding, caption: "Landing — Real-time disaster response platform" },
  { src: floodMap, caption: "Live map of reported incidents across Sri Lanka" },
  { src: floodReports, caption: "My Reports — track status of reported incidents" },
  { src: floodAddReport, caption: "Submit a new flood / hazard report" },
  { src: floodEmergency, caption: "Emergency help requests with hotlines" },
  { src: floodHelpFeed, caption: "Community Help Feed — live SOS requests with real-time updates" },
  { src: floodAdmin, caption: "Administrator Dashboard — approve reports and coordinate rescues" },
  { src: floodAnalytics, caption: "Situation Analytics — incident charts and PDF reporting" },
];

const PROJECTS = [
  {
    num: "01",
    title: "Sri Lanka Flood Relief Live Map",
    desc: "An interactive live map that coordinates flood-relief efforts across Sri Lanka, connecting people in need with nearby resources and volunteers.",
    tags: ["JavaScript", "Maps API", "Realtime"],
    href: "https://github.com/Thiva123-ab/Sri-Lanka-Flood-Relief-Coordinator-Live-Map",
    icon: "🗺️",
    img: floodLanding,
    gallery: FLOOD_GALLERY,
  },
  {
    num: "02",
    title: "Pharmacy Stock System",
    desc: "A web app to manage pharmacy inventory — tracking stock levels, expiry, and sales in one clean dashboard.",
    tags: ["JavaScript", "Node.js", "Inventory"],
    href: "https://github.com/Thiva123-ab/Pharmacy-stock-system",
    icon: "💊",
    img: null,
  },
  {
    num: "03",
    title: "DEA Spring Boot Project",
    desc: "A robust backend application built with Java and Spring Boot, following clean, layered architecture.",
    tags: ["Java", "Spring Boot", "REST API"],
    href: "https://github.com/Thiva123-ab/DEA-Spring-Boot-Project",
    icon: "🍃",
    img: null,
  },
  {
    num: "04",
    title: "Gym Management System",
    desc: "A management system for a gym — handling memberships, plans, and member records.",
    tags: ["PHP", "MySQL", "Dashboard"],
    href: "https://github.com/Thiva123-ab/gym",
    icon: "🏋️",
    img: null,
  },
];

function Lightbox({ gallery, index, onClose, onNav }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") onNav(1);
      else if (e.key === "ArrowLeft") onNav(-1);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, onNav]);

  const item = gallery[index];

  return (
    <div className="lightbox" onClick={onClose} role="dialog" aria-modal="true" aria-label="Project screenshots">
      <button className="lightbox-close" onClick={onClose} aria-label="Close gallery" data-cursor="hover">
        ✕
      </button>
      <button
        className="lightbox-nav prev"
        onClick={(e) => { e.stopPropagation(); onNav(-1); }}
        aria-label="Previous image"
        data-cursor="hover"
      >
        ‹
      </button>
      <figure className="lightbox-figure" onClick={(e) => e.stopPropagation()}>
        <img src={item.src} alt={item.caption} />
        <figcaption>
          <span>{item.caption}</span>
          <span className="lightbox-count">{index + 1} / {gallery.length}</span>
        </figcaption>
        <div className="lightbox-thumbs">
          {gallery.map((g, gi) => (
            <button
              key={gi}
              className={`lightbox-thumb ${gi === index ? "active" : ""}`}
              onClick={() => onNav(gi - index)}
              aria-label={`Go to image ${gi + 1}`}
              data-cursor="hover"
            >
              <img src={g.src} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      </figure>
      <button
        className="lightbox-nav next"
        onClick={(e) => { e.stopPropagation(); onNav(1); }}
        aria-label="Next image"
        data-cursor="hover"
      >
        ›
      </button>
    </div>
  );
}

export default function Work() {
  const [lightbox, setLightbox] = useState(null); // { gallery, index }

  const openGallery = useCallback((gallery, index = 0) => {
    setLightbox({ gallery, index });
  }, []);
  const closeGallery = useCallback(() => setLightbox(null), []);
  const navGallery = useCallback((dir) => {
    setLightbox((lb) => {
      if (!lb) return lb;
      const len = lb.gallery.length;
      return { ...lb, index: (lb.index + dir + len) % len };
    });
  }, []);

  return (
    <section className="section work" id="work">
      <div className="section-head">
        <span className="section-index">03</span>
        <Reveal as="h2" className="section-title">Selected Work</Reveal>
      </div>
      <div className="work-grid">
        {PROJECTS.map((p, i) => (
          <Reveal as="article" key={p.num} className="work-card" delay={(i % 2) * 0.08}>
            <div className={`work-thumb thumb-${i % 4}`}>
              {p.img ? (
                <img src={p.img} alt={`${p.title} screenshot`} loading="lazy" />
              ) : (
                <>
                  <span className="thumb-icon">{p.icon}</span>
                  <span className="thumb-tag">Preview soon</span>
                </>
              )}
              {p.gallery && (
                <button
                  className="thumb-view"
                  onClick={() => openGallery(p.gallery, 0)}
                  data-cursor="hover"
                  aria-label={`View ${p.gallery.length} screenshots of ${p.title}`}
                >
                  <svg viewBox="0 0 24 24" width="16" height="16">
                    <path d="M3 5h18v14H3zM3 16l5-5 4 4 3-3 6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  View {p.gallery.length} screenshots
                </button>
              )}
              <span className="work-num">{p.num}</span>
            </div>
            <div className="work-body">
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              <div className="work-tags">
                {p.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
              <div className="work-actions">
                {p.gallery && (
                  <button
                    type="button"
                    className="work-link work-link-btn"
                    onClick={() => openGallery(p.gallery, 0)}
                    data-cursor="hover"
                  >
                    View gallery
                    <svg viewBox="0 0 24 24" width="16" height="16">
                      <path d="M4 6h16v12H4zM4 14l4-4 4 4 3-3 5 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                )}
                <a
                  className="work-link"
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                >
                  View on GitHub
                  <svg viewBox="0 0 24 24" width="16" height="16">
                    <path d="M7 17 17 7M9 7h8v8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {lightbox && (
        <Lightbox
          gallery={lightbox.gallery}
          index={lightbox.index}
          onClose={closeGallery}
          onNav={navGallery}
        />
      )}
    </section>
  );
}
