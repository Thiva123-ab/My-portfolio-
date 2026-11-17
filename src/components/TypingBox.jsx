import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Reusable TypingBox Component
 *
 * Displays a unified rounded box with a pulsing teal dot,
 * mono "SPECIALIZING IN:" label, and typewriter role animation.
 */
export default function TypingBox({
  words = [
    "Full Stack Developer",
    "Java & Spring Boot",
    "React & TypeScript",
    "Kotlin",
  ],
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
      const interval = setInterval(() => {
        setWordIndex((prev) => (prev + 1) % words.length);
      }, 3000);
      return () => clearInterval(interval);
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
      className={`typing-box-container ${className}`}
      role="region"
      aria-label="Technical Specialization"
    >
      {/* Screen-reader accessible full text */}
      <span className="sr-only">
        Specializing in: {words.join(", ")}
      </span>

      {/* Visual Content (aria-live off to prevent screen-reader spam) */}
      <div className="typing-box-content" aria-live="off" aria-hidden="true">
        {/* Pulsing Teal Indicator Dot */}
        <span className="typing-box-pulse">
          <span className="typing-box-pulse-ring" />
          <span className="typing-box-pulse-dot" />
        </span>

        {/* Monospace Eyebrow Label */}
        <span className="typing-box-label">SPECIALIZING IN:</span>

        {/* Dynamic Typed Role on the Same Line */}
        <span className="typing-box-text-wrap">
          <span className="typing-box-typed-text">{displayedText}</span>
          {!shouldReduceMotion && <span className="typing-box-caret">|</span>}
        </span>
      </div>
    </div>
  );
}
