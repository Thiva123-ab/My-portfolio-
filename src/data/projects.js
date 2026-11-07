import motionStrikePreview from "../assets/projects/motion-strike/01-gameplay.jpg";
import focusFlowMockup from "../assets/projects/focusflow/01-mockup.jpg";
import focusFlowDashboard from "../assets/projects/focusflow/02-dashboard-profile.jpeg";
import focusFlowTimer from "../assets/projects/focusflow/03-deep-focus-timer.jpeg";
import focusFlowAnalytics from "../assets/projects/focusflow/04-productivity-analytics.jpeg";
import focusFlowAI from "../assets/projects/focusflow/05-ai-productivity-coach.jpeg";
import focusFlowNotes from "../assets/projects/focusflow/06-add-day-notes.jpeg";
import focusFlowTimeBlocks from "../assets/projects/focusflow/07-recorded-time-blocks.jpeg";
import focusFlowTransport from "../assets/projects/focusflow/08-live-transport-tracker.jpeg";
import focusFlowSchedule from "../assets/projects/focusflow/09-time-planner-schedule.jpeg";
import floodLanding from "../assets/projects/flood/01-landing.png";
import floodMap from "../assets/projects/flood/02-live-map.png";
import floodReports from "../assets/projects/flood/03-reports.png";
import floodAddReport from "../assets/projects/flood/04-add-report.png";
import floodEmergency from "../assets/projects/flood/05-emergency-help.png";
import floodHelpFeed from "../assets/projects/flood/06-help-feed.png";
import floodAdmin from "../assets/projects/flood/07-admin-dashboard.png";
import floodAnalytics from "../assets/projects/flood/08-analytics.png";
import studySummary from "../assets/projects/sinhala-study/01-summary.png";
import studyNotes from "../assets/projects/sinhala-study/02-summary-notes.png";
import studyFlashQ from "../assets/projects/sinhala-study/03-flashcard-question.png";
import studyFlashA from "../assets/projects/sinhala-study/04-flashcard-answer.png";
import studyQuiz from "../assets/projects/sinhala-study/05-quiz.png";
import studyFocus from "../assets/projects/sinhala-study/06-quiz-focus.png";
import studyChat from "../assets/projects/sinhala-study/07-chat.png";
import garageLanding from "../assets/projects/my-garage/01-landing.png";
import garageServices from "../assets/projects/my-garage/02-services.png";
import garageDashboard from "../assets/projects/my-garage/03-dashboard.png";
import garageInventoryBackend from "../assets/projects/my-garage/04-inventory-backend.png";
import garageBookingsBackend from "../assets/projects/my-garage/05-bookings-backend.png";
import pharmacyInventory from "../assets/projects/pharmacy/01-inventory.svg";
import pharmacyOrders from "../assets/projects/pharmacy/02-orders.svg";
import deaArchitecture from "../assets/projects/dea/01-architecture.svg";
import recruiterScreening from "../assets/projects/recruiter-ai/01-screening.svg";

export const FILTERS = [
  { id: "all", label: "All" },
  { id: "java", label: "Java / Spring" },
  { id: "react", label: "React" },
  { id: "mobile", label: "Mobile" },
  { id: "ai", label: "AI" },
  { id: "realtime", label: "Realtime" },
];

export const PROJECTS = [
  {
    slug: "flood-relief",
    num: "01",
    title: "Sri Lanka Flood Relief Live Map",
    blurb: "Realtime disaster coordination: reports, SOS, Leaflet map, and Spring Security roles.",
    desc: "An open-source disaster-response platform that coordinates flood relief across Sri Lanka — connecting people in need with responders through a live map, verified reports, and SOS feeds.",
    problem: "During floods, help requests, hazard reports, and responder status are scattered across chats. Coordinators need a shared, role-aware picture of what is happening on the ground.",
    approach: "A Java Spring Boot API with MySQL and WebSockets feeds a Leaflet/OpenStreetMap live map. Spring Security separates public reporters, victims, and administrators. Dashboards aggregate incidents, help feeds, and PDF situation reports.",
    outcome: "A full-stack coordinator: submit/track reports, emergency SOS, community help feed, admin approval, analytics, and live map markers.",
    features: [
      "Interactive Leaflet live map for incident tracking",
      "Submit and track flood/hazard reports",
      "Emergency SOS requests and live Community Help Feed",
      "Spring Security role-based access for public vs admin",
      "Administrator dashboard to coordinate rescues",
      "Situation analytics with charts and PDF reporting",
    ],
    tags: ["Java", "Spring Boot", "MySQL", "WebSockets", "Spring Security", "Leaflet"],
    filters: ["java", "realtime"],
    github: "https://github.com/Thiva123-ab/Sri-Lanka-Flood-Relief-Coordinator-Live-Map",
    live: null,
    caseStudy: true,
    icon: "🗺️",
    img: floodLanding,
    gallery: [
      { src: floodLanding, caption: "Landing — real-time disaster response platform" },
      { src: floodMap, caption: "Live map of reported incidents across Sri Lanka" },
      { src: floodReports, caption: "My Reports — track status of reported incidents" },
      { src: floodAddReport, caption: "Submit a new flood / hazard report" },
      { src: floodEmergency, caption: "Emergency help requests with hotlines" },
      { src: floodHelpFeed, caption: "Community Help Feed — live SOS requests" },
      { src: floodAdmin, caption: "Administrator Dashboard — approve reports" },
      { src: floodAnalytics, caption: "Situation Analytics — incident charts and PDF reporting" },
    ],
  },
  {
    slug: "lecturelens",
    num: "02",
    title: "LectureLens / Smart Sinhala Study",
    blurb: "Bilingual AI study assistant — summaries, flashcards, quizzes, and PDF chat in EN/සිංහල.",
    desc: "A bilingual AI study platform that turns lecture slides and notes into summaries, flashcards, and quizzes — with instant Sinhala translation for Sri Lankan students.",
    problem: "Lecture PDFs are hard to revise in a second language. Students need summaries, recall practice, and a tutor grounded in their own notes.",
    approach: "React + TypeScript UI on TanStack Start (not Next.js), Supabase (Postgres, Auth, Storage, RLS), and an AI gateway that extracts text, generates study assets, and answers with citations. One-tap EN/සිංහල toggle.",
    outcome: "Upload → summary / flashcards / quiz / papers / chat, Pomodoro focus, streaks, and credit-aware AI usage.",
    features: [
      "AI summaries, flashcards, quizzes, and exam papers from uploads",
      "Full Sinhala localization (සිංහල) with one-tap toggle",
      "Chat with your document — cited answers",
      "Supabase Auth (Google OAuth) and row-level security",
      "Pomodoro timer, streaks, and achievements",
      "TanStack Start + React + TypeScript (not Next.js)",
    ],
    tags: ["React", "TypeScript", "TanStack Start", "Supabase", "AI"],
    filters: ["react", "ai"],
    github: "https://github.com/Thiva123-ab/study_buddy",
    live: null,
    caseStudy: true,
    icon: "📚",
    img: studySummary,
    gallery: [
      { src: studySummary, caption: "AI-generated summary with EN / සිංහල toggle" },
      { src: studyNotes, caption: "Detailed notes — algorithms, iteration vs recursion" },
      { src: studyFlashQ, caption: "Flashcards — question view with flip navigation" },
      { src: studyFlashA, caption: "Flashcards — answer reveal" },
      { src: studyQuiz, caption: "Auto-generated quiz from lecture material" },
      { src: studyFocus, caption: "Quiz mode with built-in Pomodoro focus timer" },
      { src: studyChat, caption: "Chat with your document — cited AI answers" },
    ],
  },
  {
    slug: "recruiter-ai",
    num: "03",
    title: "Recruiter-AI",
    blurb: "Hiring assistant that screens profiles against a job spec using the Gemini API.",
    desc: "A JavaScript recruiting assistant that helps evaluate candidate profiles against a role. React UI, Node API, and Gemini for structured screening notes — built as a practical AI full-stack exercise.",
    problem: "Manual CV screening is slow and inconsistent when many intern/junior applications look similar.",
    approach: "React frontend talks to a Node service that calls Gemini to extract skills, compare them to a job description, and return a recruiter-facing summary.",
    outcome: "A working screening loop: job spec in, profile in, match notes out. Public repo is not published yet; GitHub links to my profile until it is.",
    features: [
      "React UI for job spec and candidate input",
      "Node service wrapping the Gemini API",
      "Skill extraction and recruiter-facing notes",
    ],
    tags: ["React", "Node.js", "Gemini"],
    filters: ["react", "ai"],
    github: "https://github.com/Thiva123-ab",
    githubLabel: "GitHub profile",
    githubNote: "Project repo is not public yet.",
    live: null,
    caseStudy: false,
    icon: "🤖",
    img: recruiterScreening,
    gallery: [
      { src: recruiterScreening, caption: "Recruiter-AI — screening flow (React, Node, Gemini)" },
    ],
  },
  {
    slug: "focusflow",
    num: "04",
    title: "FocusFlow — Time Management Android App",
    blurb: "Local-first Kotlin app: usage tracking, productivity score, Pomodoro, on-device coaching.",
    desc: "A privacy-focused, local-first Android time-management and digital-wellbeing app — Kotlin, Jetpack Compose, Room — with on-device usage tracking, scoring, deep-focus timers, and optional Gemini coaching.",
    problem: "Most wellbeing apps ship data to the cloud. Students need honest usage stats and focus tools that still work offline.",
    approach: "UsageStatsManager writes into an on-device Room database. A five-pillar score (goals, productive ratio, deep focus, distraction control, streaks) drives the dashboard. Compose + Material 3 UI, WorkManager jobs, optional cloud Gemini.",
    outcome: "A complete local-first Android product: budgets, Pomodoro, badges, CSV/JSON export, and a Sinhala/English coach.",
    features: [
      "Automatic app usage tracking into encrypted on-device Room SQLite",
      "Nine-category classification with custom overrides",
      "Productivity score (0–100) from five weighted pillars",
      "Deep Focus Pomodoro with distraction logging",
      "Category budgets and app limits with 75/90/100% alerts",
      "Offline heuristic coach plus optional Gemini",
    ],
    tags: ["Kotlin", "Jetpack Compose", "Room", "Material 3", "WorkManager"],
    filters: ["mobile", "ai"],
    github: "https://github.com/Thiva123-ab/Smart-Time-Management-MobileApp",
    live: null,
    caseStudy: true,
    icon: "📱",
    img: focusFlowMockup,
    gallery: [
      { src: focusFlowMockup, caption: "FocusFlow — Android time management (Material 3)" },
      { src: focusFlowDashboard, caption: "Dashboard & profile — daily productivity score" },
      { src: focusFlowTimer, caption: "Deep focus session & DND mode" },
      { src: focusFlowAnalytics, caption: "7-day score trends and productive ratio" },
      { src: focusFlowAI, caption: "AI productivity coach — Sinhala/English guidance" },
      { src: focusFlowSchedule, caption: "Time planner — live timeline and daily blocks" },
      { src: focusFlowTimeBlocks, caption: "Recorded time blocks — commute & lectures" },
      { src: focusFlowTransport, caption: "Live transport tracker" },
      { src: focusFlowNotes, caption: "Day notes with color tags" },
    ],
  },
  {
    slug: "autosync-garage",
    num: "05",
    title: "AutoSync Garage",
    blurb: "Customer booking portal plus admin inventory dashboard on Firebase.",
    desc: "A garage management system with a customer booking portal and an admin dashboard for inventory, services, and jobs — React frontend with Cloud Firestore.",
    features: [
      "Customer booking portal with quick scheduling",
      "Admin dashboard for garage overview",
      "Realtime inventory with low-stock alerts",
      "Service catalog with pricing and duration",
      "Firestore collections for inventory and bookings",
    ],
    tags: ["React", "Firebase", "Firestore"],
    filters: ["react"],
    github: "https://github.com/Thiva123-ab/My_Garage-",
    relatedGithub: "https://github.com/Thiva123-ab/Autosync-",
    live: null,
    caseStudy: false,
    icon: "🚗",
    img: garageLanding,
    gallery: [
      { src: garageLanding, caption: "AutoSync landing — service booking overview" },
      { src: garageServices, caption: "Service catalog" },
      { src: garageDashboard, caption: "Admin dashboard — inventory and low-stock alerts" },
      { src: garageInventoryBackend, caption: "Firebase — inventory collection in Firestore" },
      { src: garageBookingsBackend, caption: "Firebase — bookings collection in Firestore" },
    ],
  },
  {
    slug: "crisis-copilot",
    num: "03b",
    title: "Crisis Copilot",
    blurb: "24-hour Cursor Buildathon: multimodal emergency triage with Gemini. 3rd in the Google Gemini track (team HalfByte).",
    desc: "Hackathon prototype for chaotic emergency communication — photo/audio capture, Gemini triage, live translation, and first-aid prompts. Not a production dispatcher product. Built with teammates at Cursor Buildathon / TechTalk360.",
    features: [
      "Panic Snap photo + audio capture",
      "Gemini multimodal triage for dispatch priority",
      "Live translation for emergency reports",
      "3rd place, Google Gemini track · 16th overall (120 teams)",
    ],
    tags: ["React", "Gemini", "Hackathon"],
    filters: ["react", "ai"],
    github: "https://github.com/Thiva123-ab",
    githubLabel: "GitHub profile",
    githubNote: "Team hackathon prototype. Public repo not listed — this is not a project named Beacon.",
    live: "https://www.linkedin.com/posts/thivanka-tharuka_cursorbuildathon-googlegemini-techtalk360-activity-7488813224696659968-yJmX",
    caseStudy: false,
    icon: "🚨",
    img: null,
    gallery: null,
  },
  {
    slug: "pharmacy-stock",
    num: "06",
    title: "PharmaCare — Pharmacy Stock & Delivery",
    blurb: "Spring Boot + MySQL pharmacy ops: inventory, Rx upload, JWT roles, live order status.",
    desc: "Full-stack pharmacy inventory, prescription, order, and delivery system. Java 21, Spring Boot, Spring Security (JWT), MySQL, and WebSockets — team coursework with role-based dashboards.",
    features: [
      "Inventory CRUD with low-stock awareness",
      "Prescription image upload and pharmacist verification",
      "JWT auth for customer, pharmacist, delivery, admin",
      "Realtime order status and chat via WebSockets",
      "Team Git workflow (NSBM DEA assignment)",
    ],
    tags: ["Java", "Spring Boot", "MySQL", "Spring Security", "WebSockets"],
    filters: ["java", "realtime"],
    github: "https://github.com/Thiva123-ab/Pharmacy-stock-system",
    live: null,
    caseStudy: false,
    icon: "💊",
    img: pharmacyInventory,
    gallery: [
      { src: pharmacyInventory, caption: "Inventory dashboard — SKUs, low stock, expiry (UI snapshot)" },
      { src: pharmacyOrders, caption: "Orders, prescriptions, and JWT role access (UI snapshot)" },
    ],
  },
  {
    slug: "motion-strike",
    num: "07",
    title: "Motion-Strike — Webcam Combat Demo",
    blurb: "Memorable Three.js + MediaPipe demo: punches and blocks from a webcam pose.",
    desc: "Browser 3D combat demo powered by webcam pose tracking (MediaPipe) and Three.js — a memorable computer-vision playground, not a production game.",
    problem: "Show real-time computer vision in the browser without extra sensors.",
    approach: "MediaPipe Pose tracks 33 landmarks; gestures map to jab, cross, kick, guard, and slips. Three.js renders the ring; Web Audio synthesizes hits.",
    outcome: "A demo you can play with a webcam or keyboard — kept as a distinctive side project, not the lead internship piece.",
    features: [
      "MediaPipe Pose at interactive frame rates, no extra hardware",
      "Jab, cross, body kick, high guard, slips",
      "Procedural Web Audio hits and a ringside camera",
      "Webcam or keyboard controls",
    ],
    tags: ["Three.js", "MediaPipe", "WebGL", "Vite"],
    filters: ["ai", "react"],
    github: "https://github.com/Thiva123-ab/Motion-Strike",
    live: null,
    caseStudy: true,
    icon: "🥊",
    img: motionStrikePreview,
    gallery: [
      { src: motionStrikePreview, caption: "Motion-Strike — real-time 3D webcam combat demo" },
    ],
  },
  {
    slug: "dea-spring-boot",
    num: "08",
    title: "DEA Spring Boot Project",
    blurb: "NSBM DEA coursework: layered Spring Boot API, security, and MySQL persistence.",
    desc: "University DEA module codebase — a layered Java Spring Boot backend (controllers, services, repositories) with Spring Security and MySQL. It implements the pharmacy stock and delivery domain (same assignment family as the Pharmacy Stock repo).",
    features: [
      "Layered architecture: controller → service → repository",
      "Spring Security + JWT configuration",
      "JPA entities for inventory, orders, delivery, users",
      "WebSocket config for live updates",
    ],
    tags: ["Java", "Spring Boot", "REST API", "MySQL"],
    filters: ["java"],
    github: "https://github.com/Thiva123-ab/DEA-Spring-Boot-Project",
    live: null,
    caseStudy: false,
    icon: "🍃",
    img: deaArchitecture,
    gallery: [
      { src: deaArchitecture, caption: "Layered Spring Boot architecture for the DEA assignment" },
    ],
  },
];

export const FEATURED_SLUGS = ["recruiter-ai", "lecturelens", "crisis-copilot", "pharmacy-stock"];

export function getProject(slug) {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getFeatured() {
  return FEATURED_SLUGS.map(getProject).filter(Boolean);
}
