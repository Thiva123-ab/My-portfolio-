import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

const DEFAULT_WORDS = [
  "Full Stack Developer",
  "Java & Spring Boot",
  "React & TypeScript",
  "Kotlin",
];

export default function TypingBox({
  words = DEFAULT_WORDS,
  prefix = "SPECIALIZING IN:",
  typeSpeed = 70,
  deleteSpeed = 40,
  pauseTime = 1400,
  className = "",
  layout = "inline",
}) {
  const shouldReduceMotion = useReducedMotion();
  const [wordIndex, setWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayedText(words[0]);
      return;
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

  if (layout === "stacked") {
    return (
      <div
        className={`hero-typing-stacked-card ${className}`}
        role="region"
        aria-label="Technical Specialization"
      >
        <span className="sr-only">
          {prefix} {words.join(", ")}
        </span>
        <div className="hero-typing-stacked-inner" aria-hidden="true" aria-live="off">
          <div className="hero-typing-stacked-top">
            <span className="hero-typing-dot" />
            <span className="hero-typing-prefix-mono">{prefix}</span>
          </div>
          <div className="hero-typing-stacked-bottom">
            <span className="hero-typing-word-gradient">{displayedText}</span>
            {!shouldReduceMotion && <span className="hero-typing-caret" />}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`hero-typing-pill ${className}`}
      role="region"
      aria-label="Technical Specialization"
    >
      {/* Screen reader accessible fallback */}
      <span className="sr-only">
        {prefix} {words.join(", ")}
      </span>

      {/* Visual content (aria-live off to prevent screen reader interruptions) */}
      <div className="hero-typing-pill-inner" aria-hidden="true" aria-live="off">
        <span className="hero-typing-prefix">{prefix}</span>

        {/* Dynamic word container with reserved min-width to prevent layout shift */}
        <span className="hero-typing-word-container">
          <span className="hero-typing-word">{displayedText}</span>
          {!shouldReduceMotion && <span className="hero-typing-caret" />}
        </span>
      </div>
    </div>
  );
}
