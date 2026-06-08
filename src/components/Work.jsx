import Reveal from "./Reveal.jsx";

// To add a real screenshot later: import it and set `img: <imported image>`.
// e.g. import flood from "../assets/projects/flood.png"; then img: flood
const PROJECTS = [
  {
    num: "01",
    title: "Sri Lanka Flood Relief Live Map",
    desc: "An interactive live map that coordinates flood-relief efforts across Sri Lanka, connecting people in need with nearby resources and volunteers.",
    tags: ["JavaScript", "Maps API", "Realtime"],
    href: "https://github.com/Thiva123-ab/Sri-Lanka-Flood-Relief-Coordinator-Live-Map",
    icon: "🗺️",
    img: null,
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

export default function Work() {
  return (
    <section className="section work" id="work">
      <div className="section-head">
        <span className="section-index">03</span>
        <Reveal as="h2" className="section-title">Selected Work</Reveal>
      </div>
      <div className="work-grid">
        {PROJECTS.map((p, i) => (
          <Reveal
            as="a"
            key={p.num}
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            className="work-card"
            data-cursor="hover"
            delay={(i % 2) * 0.08}
          >
            <div className={`work-thumb thumb-${i % 4}`}>
              {p.img ? (
                <img src={p.img} alt={`${p.title} screenshot`} loading="lazy" />
              ) : (
                <>
                  <span className="thumb-icon">{p.icon}</span>
                  <span className="thumb-tag">Preview soon</span>
                </>
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
              <span className="work-link">
                View on GitHub
                <svg viewBox="0 0 24 24" width="16" height="16">
                  <path d="M7 17 17 7M9 7h8v8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
