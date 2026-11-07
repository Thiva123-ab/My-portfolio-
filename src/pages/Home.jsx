import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import Hero from "../components/Hero.jsx";
import Marquee from "../components/Marquee.jsx";
import About from "../components/About.jsx";
import Skills from "../components/Skills.jsx";
import Reveal from "../components/Reveal.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
import Lightbox from "../components/Lightbox.jsx";
import CertStrip from "../components/CertStrip.jsx";
import Contact from "../components/Contact.jsx";
import { getFeatured } from "../data/projects.js";

export default function Home() {
  const featured = getFeatured();
  const [lightbox, setLightbox] = useState(null);
  const openGallery = useCallback((gallery, index = 0) => setLightbox({ gallery, index }), []);
  const closeGallery = useCallback(() => setLightbox(null), []);
  const navGallery = useCallback((dir) => {
    setLightbox((lb) => {
      if (!lb) return lb;
      const len = lb.gallery.length;
      return { ...lb, index: (lb.index + dir + len) % len };
    });
  }, []);

  return (
    <>
      <Seo path="/" />
      <Hero />
      <Marquee />
      <About />
      <Skills />
      <section className="section work" id="work">
        <div className="section-head">
          <span className="section-index">03</span>
          <Reveal as="h2" className="section-title">Featured projects</Reveal>
        </div>
        <div className="work-grid">
          {featured.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 2) * 0.08}>
              <ProjectCard project={p} index={i} onOpenGallery={openGallery} compact />
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.15} className="section-more">
          <Link to="/projects" className="btn btn-primary" data-cursor="hover">
            All projects
          </Link>
        </Reveal>
      </section>
      <CertStrip />
      <Contact />
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
