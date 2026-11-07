export const HR_PROFILE = {
  handle: "thivanka-tharuka",
  url: "https://www.hackerrank.com/",
  note: "Public HackerRank username not confirmed on this site yet — add it and we will wire badges and scores. Tracks below are the practice areas I use for internship interviews, not claimed gold badges.",
};

export const HR_TRACKS = [
  { name: "Problem Solving", level: "Practice", topics: "Arrays, hashing, two pointers" },
  { name: "Java", level: "Core", topics: "OOP, collections, Spring-ready syntax" },
  { name: "SQL", level: "Practice", topics: "Joins, aggregates, MySQL for apps" },
  { name: "REST & APIs", level: "Applied", topics: "Spring Boot controllers from coursework" },
];

export const HR_CHALLENGES = [
  {
    id: "ps-warmup",
    title: "Interview warmup — arrays & maps",
    difficulty: "Easy",
    domain: "Problem Solving",
    desc: "Typical intern screening patterns: frequency maps, sliding windows, two-sum variants.",
    status: "Practice",
  },
  {
    id: "java-oop",
    title: "Java OOP & collections",
    difficulty: "Medium",
    domain: "Java",
    desc: "Class design, HashMap/List usage, and clean method contracts — the same habits used in Spring services.",
    status: "Practice",
  },
  {
    id: "sql-joins",
    title: "SQL joins for inventory",
    difficulty: "Medium",
    domain: "SQL",
    desc: "Query patterns used in PharmaCare: orders × medicines × users with filters and aggregates.",
    status: "Applied in repo",
    href: "https://github.com/Thiva123-ab/Pharmacy-stock-system",
  },
  {
    id: "spring-auth",
    title: "Auth & role checks",
    difficulty: "Hard",
    domain: "Java",
    desc: "JWT + Spring Security role gates (customer, pharmacist, admin) from the pharmacy DEA assignment.",
    status: "Applied in repo",
    href: "https://github.com/Thiva123-ab/Pharmacy-stock-system",
  },
  {
    id: "realtime",
    title: "Realtime event handling",
    difficulty: "Hard",
    domain: "Problem Solving",
    desc: "WebSocket help feeds and order status — Flood Relief Live Map and pharmacy chat.",
    status: "Applied in repo",
    href: "https://github.com/Thiva123-ab/Sri-Lanka-Flood-Relief-Coordinator-Live-Map",
  },
  {
    id: "sql-reports",
    title: "Reporting queries",
    difficulty: "Easy",
    domain: "SQL",
    desc: "Group-by and date filters for dashboards — not a fake HackerRank score, a repo skill.",
    status: "Applied in repo",
    href: "https://github.com/Thiva123-ab/DEA-Spring-Boot-Project",
  },
];
