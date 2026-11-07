import { useEffect } from "react";

export default function Lightbox({ gallery, index, onClose, onNav }) {
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
        {gallery.length > 1 && (
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
        )}
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
