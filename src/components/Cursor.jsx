import { useEffect, useRef } from "react";

// Custom dot + smoothly trailing ring that grows over interactive elements.
export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(max-width: 900px)").matches) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (dot) {
        dot.style.left = mx + "px";
        dot.style.top = my + "px";
      }
    };
    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (ring) {
        ring.style.left = rx + "px";
        ring.style.top = ry + "px";
      }
      raf = requestAnimationFrame(loop);
    };

    const onOver = (e) => {
      if (e.target.closest('a, button, [data-cursor="hover"]')) {
        ring && ring.classList.add("is-hover");
      }
    };
    const onOut = (e) => {
      if (e.target.closest('a, button, [data-cursor="hover"]')) {
        ring && ring.classList.remove("is-hover");
      }
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  return (
    <>
      <div className="cursor-dot" ref={dotRef} aria-hidden="true" />
      <div className="cursor-ring" ref={ringRef} aria-hidden="true" />
    </>
  );
}
