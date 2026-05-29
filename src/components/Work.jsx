import Reveal from "./Reveal.jsx";

const PROJECTS = [
  {
    num: "01",
    title: "Nebula Dashboard",
    desc: "A realtime analytics dashboard with fluid data viz and dark UI.",
    tags: ["React", "D3", "Design System"],
  },
  {
    num: "02",
    title: "Aurora Commerce",
    desc: "Headless storefront with buttery transitions and instant checkout.",
    tags: ["Next.js", "Stripe", "Motion"],
  },
  {
    num: "03",
    title: "Pulse Music",
    desc: "An interactive audio-reactive landing page with WebGL visuals.",
    tags: ["WebGL", "Canvas", "Audio API"],
  },
  {
    num: "04",
    title: "Orbit Portfolio",
    desc: "This very site — a study in dark aesthetics and motion design.",
    tags: ["React", "Vite", "CSS"],
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
            href="#"
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
