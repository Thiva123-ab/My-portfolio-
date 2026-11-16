import { useEffect, useState } from "react";

export default function Loader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      // Slower, smooth and organic progression (~2.8s total duration)
      const remaining = 100 - current;
      const step = Math.max(0.35, remaining * 0.034 + Math.random() * 0.65 + 0.35);
      current = Math.min(100, current + step);

      if (current >= 100) {
        setProgress(100);
        clearInterval(interval);
        setTimeout(() => setDone(true), 500);
      } else {
        setProgress(Math.floor(current));
      }
    }, 34);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`loader ${done ? "done" : ""}`} aria-hidden="true">
      <div className="loader-backdrop-glow" />

      <div className="loader-content">
        <div className="loader-brand">
          <div className="loader-text">
            {"THIVANKA".split("").map((c, i, arr) => (
              <span
                key={i}
                style={{
                  animationDelay: `${0.04 + i * 0.06}s`,
                  color: i === arr.length - 1 ? "var(--accent)" : undefined,
                }}
              >
                {c}
              </span>
            ))}
          </div>
          <p className="loader-role">FULL STACK DEVELOPER · SOFTWARE ENGINEER</p>
        </div>

        <div className="loader-hud">
          <div className="loader-meta">
            <span className="loader-status">
              {progress < 30 && "INITIALIZING SYSTEM"}
              {progress >= 30 && progress < 70 && "LOADING INTERFACES"}
              {progress >= 70 && progress < 100 && "OPTIMIZING ASSETS"}
              {progress === 100 && "SYSTEM READY"}
            </span>
            <span className="loader-counter">
              <span className="loader-num">{progress}</span>
              <span className="loader-sym">%</span>
            </span>
          </div>

          <div className="loader-bar-wrap">
            <div className="loader-bar">
              <span style={{ width: `${progress}%` }}>
                <span className="loader-bar-glow" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
