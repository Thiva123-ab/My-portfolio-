import { useState, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Shared Premium Card Component
 *
 * Implements the site-wide Card Design System:
 * - Surface: rounded-2xl, bg-card, subtle top-to-bottom overlay, 1px low-opacity border
 * - Equal height flex-col container
 * - Hover/Tap: translate-y -4px, purple-to-teal glow, 200ms ease
 * - Desktop: Subtle radial spotlight following mouse cursor
 * - Viewport entrance animation with reduced motion support
 */
export default function Card({
  children,
  className = "",
  delay = 0,
  onClick,
  as = "article",
  interactive = true,
  ...props
}) {
  const shouldReduceMotion = useReducedMotion();
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: -9999, y: -9999 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current || !interactive || shouldReduceMotion) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const Component = motion[as] || motion.div;

  const animationVariants = {
    hidden: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.5,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <Component
      ref={cardRef}
      className={`premium-card ${interactive ? "is-interactive" : ""} ${className}`}
      variants={animationVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-30px" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePos({ x: -9999, y: -9999 });
      }}
      onClick={onClick}
      {...props}
    >
      {/* Desktop Dynamic Spotlight Layer */}
      {interactive && !shouldReduceMotion && isHovered && (
        <div
          className="premium-card-spotlight"
          style={{
            background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, rgba(139, 124, 255, 0.12), rgba(45, 226, 200, 0.05), transparent 75%)`,
          }}
          aria-hidden="true"
        />
      )}

      {/* Card Content Container (h-full flex flex-col) */}
      <div className="premium-card-inner">
        {children}
      </div>
    </Component>
  );
}
