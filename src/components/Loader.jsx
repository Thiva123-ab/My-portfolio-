import { useEffect, useRef, useState } from "react";

export default function Loader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const loadedRef = useRef(false);

  useEffect(() => {
    const onLoad = () => {
      loadedRef.current = true;
    };
    window.addEventListener("load", onLoad);
    if (document.readyState === "complete") loadedRef.current = true;

    const tick = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(100, p + Math.random() * 18);
        if (next >= 100) {
          clearInterval(tick);
          setTimeout(() => setDone(true), 350);
        }
        return next;
      });
    }, 140);

    return () => {
      clearInterval(tick);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  return (
    <div className={`loader ${done ? "done" : ""}`} aria-hidden="true">
      <div className="loader-text">
        {"THIVA".split("").map((c, i) => (
          <span key={i}>{c}</span>
        ))}
      </div>
      <div className="loader-bar">
        <span style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
