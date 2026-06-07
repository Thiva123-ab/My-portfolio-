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
        {"THIVANKA".split("").map((c, i, arr) => (
          <span
            key={i}
            style={{
              animationDelay: `${0.05 + i * 0.07}s`,
              color: i === arr.length - 1 ? "var(--accent)" : undefined,
            }}
          >
            {c}
          </span>
        ))}
      </div>
      <div className="loader-bar">
        <span style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
