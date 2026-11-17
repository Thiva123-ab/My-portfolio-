import { motion, useReducedMotion } from "framer-motion";
import { Briefcase, Calendar, ExternalLink, Sparkles } from "lucide-react";
import { MILESTONES } from "../data/milestones.js";
import Reveal from "./Reveal.jsx";

/**
 * Experience & Milestones Component
 *
 * Mobile-first vertical glowing timeline featuring a 2px purple-to-teal rail,
 * hollow 20px illuminated nodes, and card items with verified education & honest credits.
 */
export default function ExperienceMilestones() {
  const shouldReduceMotion = useReducedMotion();

  const easeCurve = [0.22, 1, 0.36, 1];

  return (
    <section className="milestones-section section" id="experience" aria-label="Experience & Milestones">
      {/* Section Header */}
      <div className="milestones-head">
        <div className="milestones-title-badge">
          <Briefcase size={22} className="milestones-badge-icon" aria-hidden="true" />
          <h2 className="milestones-heading">Experience &amp; Milestones</h2>
        </div>
        <p className="milestones-lead">
          Academic progression, software-building milestones, and verified community events.
          Titles match issued certificates with zero inflated claims.
        </p>
      </div>

      {/* Vertical Timeline Container */}
      <div className="milestones-timeline-wrap">
        {/* Left Glowing Rail */}
        <div className="milestones-rail" aria-hidden="true" />

        {/* Timeline Entries List */}
        <ol className="milestones-list">
          {MILESTONES.map((item, index) => {
            const cardVariants = {
              hidden: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: shouldReduceMotion ? 0 : 0.55,
                  delay: shouldReduceMotion ? 0 : index * 0.08,
                  ease: easeCurve,
                },
              },
            };

            return (
              <motion.li
                key={item.id}
                className="milestone-item"
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
              >
                {/* Hollow Glowing Circular Node (20px, 2px border) */}
                <div className="milestone-node" aria-hidden="true">
                  <div className="milestone-node-ring" />
                  <div className="milestone-node-dot" />
                </div>

                {/* Card Container (rounded-3xl, bg-card, 1px border, p-5) */}
                <div className={`milestone-card ${item.isPlaceholder ? "is-placeholder" : ""}`}>
                  {/* Row 1: Date Row with Calendar Icon & Mono Teal Text */}
                  <div className="milestone-date-row">
                    <span className="milestone-date-badge">
                      <Calendar size={13} className="milestone-cal-icon" aria-hidden="true" />
                      <span className="milestone-date-text">{item.period}</span>
                    </span>
                    {item.isPlaceholder && (
                      <span className="milestone-placeholder-tag">Placeholder</span>
                    )}
                  </div>

                  {/* Row 2: Title (text-xl, bold, white) */}
                  <h3 className="milestone-title">{item.title}</h3>

                  {/* Row 3: Organization (muted text) */}
                  <p className="milestone-org">{item.organization}</p>

                  {/* Row 4: Description (muted, leading-relaxed, text-[15px]) */}
                  <p className="milestone-desc">{item.description}</p>

                  {/* Optional Tags */}
                  {item.tags && item.tags.length > 0 && (
                    <div className="milestone-tags">
                      {item.tags.map((tag) => (
                        <span key={tag} className="milestone-tag-pill">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
