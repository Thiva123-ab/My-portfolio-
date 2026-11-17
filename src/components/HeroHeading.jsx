import { motion, useReducedMotion } from "framer-motion";
import TypingBox from "./TypingBox.jsx";

/**
 * HeroHeading Component
 *
 * Implements refined typography, deliberate hierarchy, and perceptual 2-stop gradient.
 * Contains the "— HELLO, I'M" eyebrow, "Thivanka Tharuka" heading, and the
 * unified <TypingBox /> specialization badge.
 *
 * Variants:
 * - "gradient" (recommended default): Crisp off-white "Thivanka" + smooth violet-to-teal gradient "Tharuka"
 * - "minimal": Pure off-white (#F4F4F8) with subtle glowing accent underline under "Tharuka"
 * - "bold": Both words carrying the refined gradient with weight 700
 */
export default function HeroHeading({ variant = "gradient" }) {
  const shouldReduceMotion = useReducedMotion();

  // Polished cubic bezier easing curve [0.22, 1, 0.36, 1]
  const transitionEase = [0.22, 1, 0.36, 1];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: shouldReduceMotion ? 0 : 0.04,
      },
    },
  };

  const eyebrowVariants = {
    hidden: shouldReduceMotion
      ? { opacity: 1, y: 0 }
      : { opacity: 0, y: 14, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: shouldReduceMotion ? 0 : 0.55,
        ease: transitionEase,
      },
    },
  };

  const nameVariants = {
    hidden: shouldReduceMotion
      ? { opacity: 1, y: 0 }
      : { opacity: 0, y: 22, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: shouldReduceMotion ? 0 : 0.72,
        ease: transitionEase,
      },
    },
  };

  const underlineVariants = {
    hidden: shouldReduceMotion ? { scaleX: 1 } : { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.75,
        delay: shouldReduceMotion ? 0 : 0.45,
        ease: transitionEase,
      },
    },
  };

  const typingBoxVariants = {
    hidden: shouldReduceMotion
      ? { opacity: 1, y: 0 }
      : { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.6,
        delay: shouldReduceMotion ? 0 : 0.32,
        ease: transitionEase,
      },
    },
  };

  return (
    <motion.div
      className={`hero-intro-header variant-${variant}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Soft background radial glow */}
      <div className="hero-heading-glow" aria-hidden="true" />

      {/* Hierarchy Step 1: Small Mono Eyebrow Greeting */}
      <motion.div className="hero-eyebrow-mono" variants={eyebrowVariants}>
        <span className="eyebrow-dash">—</span>
        <span>HELLO, I’M</span>
      </motion.div>

      {/* Hierarchy Step 2: Semantic <h1> Single Tag for SEO and Accessibility */}
      <h1 className="hero-heading-title" aria-label="Thivanka Tharuka">
        {/* Line 1: Thivanka */}
        <motion.span className="name-line line-first" variants={nameVariants}>
          <span
            className={`name-word ${
              variant === "bold" ? "text-gradient-refined" : "text-offwhite"
            }`}
          >
            Thivanka
          </span>
        </motion.span>

        {/* Line 2: Tharuka */}
        <motion.span className="name-line line-second" variants={nameVariants}>
          <span
            className={`name-word ${
              variant === "minimal" ? "text-offwhite" : "text-gradient-refined"
            }`}
          >
            Tharuka
          </span>

          {/* Underline accent that animates in under Tharuka */}
          <motion.span
            className="hero-accent-underline"
            variants={underlineVariants}
            style={{ originX: 0 }}
            aria-hidden="true"
          />
        </motion.span>
      </h1>

      {/* Hierarchy Step 3: Rounded Specializing In Typing Box */}
      <motion.div className="hero-typing-box-wrapper" variants={typingBoxVariants}>
        <TypingBox
          words={[
            "Full Stack Developer",
            "Java & Spring Boot",
            "React & TypeScript",
            "Kotlin",
          ]}
        />
      </motion.div>
    </motion.div>
  );
}
