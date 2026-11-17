import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Reusable TypingBox Component
 *
 * Displays a continuous typewriter animation inside a premium rounded card:
 * - Mobile (< 640px): Stacked layout (pulsing dot + prefix on top, large gradient typed word below)
 * - Desktop (>= 640px): Single-line layout (pulsing dot + prefix + gradient typed word + caret)
 * - Fixed min-height to prevent layout jumps
 * - Accessible sr-only text + aria-live="off"
 * - Respects prefers-reduced-motion
 */
export default function TypingBox({
  words = [
    "Full Stack Developer",
    "Java & Spring Boot",
    "React & TypeScript",
    "Kotlin",
  ],
  prefix = "Specializing in:",
  typeSpeed = 70,
  deleteSpeed = 40,
  pauseTime = 1400,
  className = "",
}) {
  const shouldReduceMotion = useReducedMotion();
  const [wordIndex, setWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayedText(words[wordIndex]);
      const timer = setInterval(() => {
        setWordIndex((prev) => (prev + 1) % words.length);
      }, 2000);
      return () => clearInterval(timer);
    }

    const currentWord = words[wordIndex] || "";
    let timeout;

    if (!isDeleting) {
      if (displayedText.length < currentWord.length) {
        timeout = setTimeout(() => {
          setDisplayedText(currentWord.slice(0, displayedText.length + 1));
        }, typeSpeed);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, pauseTime);
      }
    } else {
      if (displayedText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(currentWord.slice(0, displayedText.length - 1));
        }, deleteSpeed);
      } else {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, wordIndex, words, shouldReduceMotion, typeSpeed, deleteSpeed, pauseTime]);

  return (
    <div
      className={`hero-typing-box ${className}`}
      role="region"
      aria-label="Technical Specialization"
    >
      {/* Screen reader accessible full text (strictly visually hidden via .sr-only) */}
      <span className="sr-only">
        {prefix} {words.join(", ")}
      </span>

      {/* Visual Presentation (aria-live off to prevent screen-reader spam) */}
      <div className="hero-typing-inner" aria-hidden="true" aria-live="off">
        {/* Pulsing Teal Dot + Prefix Label */}
        <div className="hero-typing-meta">
          <span className="hero-typing-dot-wrap">
            <span className="hero-typing-dot-ring" />
            <span className="hero-typing-dot" />
          </span>
          <span className="hero-typing-prefix">{prefix}</span>
        </div>

        {/* Dynamic Typed Word in Gradient + 2px Teal Caret */}
        <div className="hero-typing-dynamic">
          <span className="hero-typing-word">
            {displayedText}
          </span>
          {!shouldReduceMotion && <span className="hero-typing-caret" />}
        </div>
      </div>
    </div>
  );
}
