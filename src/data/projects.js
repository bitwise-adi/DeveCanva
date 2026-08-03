/**
 * ═══════════════════════════════════════════════════════════════
 * PROJECTS DATA
 * ═══════════════════════════════════════════════════════════════
 * Add, edit, or reorder projects here. The site picks them up automatically.
 *
 * Each project object:
 *   name        — display name
 *   slug        — URL-safe identifier (used for keys & potential future routing)
 *   description — one-liner shown on the card
 *   longDesc    — (optional) expanded description for a detail view
 *   tech        — array of tech stack strings (shown as pills)
 *   liveUrl     — URL to live demo (null if none)
 *   githubUrl   — URL to GitHub repo
 *   featured    — (optional) if true, gets extra visual weight
 */

const projects = [
  {
    name: "DevCanvas",
    slug: "devcanvas",
    description:
      "A high-performance personal developer canvas and portfolio with dynamic MDX blogging, modular data architecture, and smooth motion design.",
    tech: ["Next.js", "React", "MDX", "Vanilla CSS", "Framer Motion"],
    liveUrl: "https://www.bitwise-adi.dev",
    githubUrl: "https://github.com/bitwise-adi/DeveCanva",
    featured: true,
  },
  {
    name: "GradeBuddy",
    slug: "gradebuddy",
    description:
      "Scrapes the NIE parent portal and provides a dashboard with an SGPA planner to strategize your semester-end exams.",
    tech: ["TypeScript", "React", "Puppeteer", "Docker"],
    liveUrl: "https://gradebuddy.bitwise-adi.dev",
    githubUrl: "https://github.com/bitwise-adi/GradeBuddy",
    featured: true,
  },
  {
    name: "LocoMe",
    slug: "locome",
    description:
      "A Progressive Web App for habit tracking and task management, built with real-time sync.",
    tech: ["TypeScript", "Next.js", "Firebase", "CSS"],
    liveUrl: "https://loco-me-app.vercel.app/",
    githubUrl: "https://github.com/bitwise-adi/LocoMe",
    featured: true,
  },
  {
    name: "RansomGuard.ai",
    slug: "ransomguard-ai",
    description:
      "ML-powered network threat classification system built with Clean Architecture, 6 GoF design patterns for runtime model switching, and a FastAPI analytics dashboard.",
    tech: ["Python", "FastAPI", "XGBoost", "Random Forest", "Chart.js"],
    liveUrl: null,
    githubUrl: "https://github.com/bitwise-adi/ranDetect",
    featured: true,
  },
  {
    name: "NOVA",
    slug: "nova",
    description:
      "Multi-client real-time chat application with RSA-based end-to-end encryption, dynamic public key exchange, and multithreaded socket networking.",
    tech: ["Python", "Socket Programming", "RSA", "CustomTkinter"],
    liveUrl: null,
    githubUrl: "https://github.com/bitwise-adi/encrypted-chat-app",
    featured: false,
  },
  {
    name: "BuildFolio",
    slug: "buildfolio",
    description:
      "Zero-backend client-side portfolio generator. Build, preview in real time with dark mode, and export deployable websites directly from the browser.",
    tech: ["JavaScript", "HTML/CSS", "LocalStorage"],
    liveUrl: "https://bitwise-adi.github.io/BuildFolio/",
    githubUrl: "https://github.com/bitwise-adi/BuildFolio",
    featured: false,
  },
];

export default projects;
