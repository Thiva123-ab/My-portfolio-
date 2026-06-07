import Reveal from "./Reveal.jsx";

const PROJECTS = [
  {
    num: "01",
    title: "Sri Lanka Flood Relief Live Map",
    desc: "An interactive live map that coordinates flood-relief efforts across Sri Lanka, connecting people in need with nearby resources and volunteers.",
    tags: ["JavaScript", "Maps API", "Realtime"],
    href: "https://github.com/Thiva123-ab/Sri-Lanka-Flood-Relief-Coordinator-Live-Map",
  },
  {
    num: "02",
    title: "Pharmacy Stock System",
    desc: "A web app to manage pharmacy inventory — tracking stock levels, expiry, and sales in one clean dashboard.",
    tags: ["JavaScript", "Node.js", "Inventory"],
    href: "https://github.com/Thiva123-ab/Pharmacy-stock-system",
  },
  {
    num: "03",
    title: "DEA Spring Boot Project",
    desc: "A robust backend application built with Java and Spring Boot, following clean, layered architecture.",
    tags: ["Java", "Spring Boot", "REST API"],
    href: "https://github.com/Thiva123-ab/DEA-Spring-Boot-Project",
  },
  {
    num: "04",
    title: "Gym Management System",
    desc: "A management system for a gym — handling memberships, plans, and member records.",
    tags: ["PHP", "MySQL", "Dashboard"],
    href: "https://github.com/Thiva123-ab/gym",
  },
];

export default function Work() {
  return (
    <section className="section work" id="work">
      <div className="section-head">
        <span className="section-index">03</span>
        <Reveal as="h2" className="section-title">Selected Work</Reveal>
      </div>
      <div className="work-list">
        {PROJECTS.map((p, i) => (
          <Reveal
            as="a"
            key={p.num}
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            className="work-item"
            data-cursor="hover"
            delay={i * 0.05}
          >
            <div className="work-meta">
              <span className="work-num">{p.num}</span>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              <div className="work-tags">
                {p.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </div>
            <span className="work-arrow">↗</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
