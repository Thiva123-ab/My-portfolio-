/**
 * @typedef {Object} Milestone
 * @property {string} id - Unique identifier
 * @property {string} period - Date range (e.g., "2023 – Present")
 * @property {string} title - Milestone or role title
 * @property {string} organization - University, company, or event org
 * @property {string} description - Honest, uninflated description
 * @property {boolean} isPlaceholder - Flag marking future/unverified entries
 * @property {string[]} [tags] - Optional technical skill or category tags
 */

export const MILESTONES = [
  {
    id: "nsbm-cs",
    period: "2023 – Present",
    title: "BSc (Hons) in Computer Science",
    organization: "NSBM Green University",
    description:
      "Core curriculum in Object-Oriented Programming (Java), Data Structures & Algorithms, Database Management Systems, and Enterprise Application Design. Expected graduation: Feb 2028.",
    isPlaceholder: false,
    tags: ["Java", "OOP", "DSA", "Undergraduate"],
  },
  {
    id: "fullstack-projects",
    period: "2024 – Present",
    title: "[PLACEHOLDER] Full Stack Developer",
    organization: "Personal & Academic Projects",
    description:
      "Architecting clean, modular applications including disaster relief live feeds, AI study tools, and native Android utilities using Java, Spring Boot, React, TypeScript, and Kotlin.",
    isPlaceholder: true,
    tags: ["Java", "Spring Boot", "React", "TypeScript", "Kotlin"],
  },
  {
    id: "ideathon-volunteer",
    period: "Sep 2025",
    title: "Volunteer & Event Support",
    organization: "IDEATHON 1.0 · CompuVate, NSBM Green University",
    description:
      "Certificate of Appreciation for student participant logistics and organizing support during the campus ideation event. Not a winning-project award.",
    isPlaceholder: false,
    tags: ["Volunteer", "Logistics", "Campus"],
  },
  {
    id: "aws-community-day",
    period: "2025 – 2026",
    title: "Community & Hackathon Attendance",
    organization: "AWS Student Community Day & Hacktoberfest Hack Day (UCSC)",
    description:
      "In-person participation in cloud architecture workshops, containerization fundamentals, and collaborative open-source sessions. Attendance credentials, not speaker or ambassador titles.",
    isPlaceholder: false,
    tags: ["AWS Labs", "Docker", "Git"],
  },
  {
    id: "future-internship",
    period: "Upcoming · 2026",
    title: "[PLACEHOLDER] Software Engineering Internship",
    organization: "Industry Partner / Technology Company",
    description:
      "[PLACEHOLDER] Actively preparing for software engineering and full-stack internship opportunities. Seeking to contribute enterprise backend (Java/Spring Boot) and modern frontend (React/TypeScript) craft.",
    isPlaceholder: true,
    tags: ["Internship", "Enterprise Java", "Spring Boot"],
  },
];
