export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  name: string;
  category: 'PWA' | 'Web & Tools' | 'Security & ML' | 'Security & Crypto';
  spotlight: boolean;
  description: string;
  subtitle?: string;
  problem?: string;
  solution?: string;
  highlights?: string[];
  metrics?: ProjectMetric[];
  tech: string[];
  liveUrl: string | null;
  githubUrl: string | null;
  image: string | null;
  screenshots: string[];
}

export interface TimelineItem {
  id: string;
  year: string;
  title: string;
  institution: string;
  location: string;
  score: string;
  boardOrDegree: string;
  description: string;
  current?: boolean;
}

export interface ProvenSkill {
  name: string;
  category: 'Frontend & Core' | 'Backend & Storage' | 'Security & ML' | 'DevOps & Tooling';
  proof: string;
  desc: string;
  highlight?: boolean;
}

export interface Config {
  personal: {
    name: string;
    handle: string;
    email: string;
    github: string;
    linkedin: string;
    resumePath: string;
    avatarPath: string;
    bio: string;
    aboutBio: string;
    location: string;
    education: string;
    institution: string;
    tagline: string;
    highlights: string[];
  };
  stats: Array<{ value: string; label: string }>;
  engineeringFocus: Array<{ label: string; value: string; desc: string }>;
  provenSkills: ProvenSkill[];
  skills: Record<string, string[]>;
  projects: Project[];
  timeline: TimelineItem[];
  social: Array<{ name: string; url: string; icon: 'github' | 'linkedin' | 'email' }>;
  categoryColors: Record<string, { bg: string; text: string; glow: string }>;
  navLinks: Array<{ name: string; href: string; icon: string }>;
  terminal: {
    prompt: string;
    welcomeMessage: string[];
  };
}

export const CONFIG: Config = {
  personal: {
    name: "Aditya Raj",
    handle: "bitwise-adi",
    email: "reachadiofficial@gmail.com",
    github: "https://github.com/bitwise-adi",
    linkedin: "https://linkedin.com/in/bitwise-adi",
    resumePath: "/MeRes.pdf",
    avatarPath: "/phtos/mypic.jpg",
    bio: "Developer & builder. I leverage modern AI workflows and engineering discipline to architect, build, and ship high-impact products at high velocity.",
    aboutBio: "I leverage modern AI workflows and engineering discipline to architect, build, and ship products at high velocity.\n\nI'm drawn to projects that sit at the intersection of practical utility and technical curiosity — whether that's scraping a university portal to plan semester exam strategies, building encrypted real-time systems, or deploying ML threat classifiers. I like building things that solve real problems, combining strong engineering fundamentals with modern velocity to go from idea to production with speed and precision.",
    location: "Mysore, India",
    education: "4th Year B.E. in Information Science & Engineering (ISE)",
    institution: "The National Institute of Engineering (NIE), Mysore",
    tagline: "Building high-velocity web applications.",
    highlights: ["Clean Architecture", "High Velocity", "Full-Stack Mastery"],
  },

  stats: [
    { value: "5+",   label: "Projects Shipped" },
    { value: "12",   label: "Public Repos" },
    { value: "ISE",  label: "4th Year @ NIE" },
  ],

  engineeringFocus: [
    { label: "Featured Repos",    value: "6+",         desc: "Web apps, ML classifiers & security tools" },
    { label: "Tech Stack Tools",  value: "25+",        desc: "Languages, frameworks & cloud infrastructure" },
    { label: "Delivery Velocity", value: "High Speed", desc: "AI workflows & rapid iteration loops" },
  ],

  provenSkills: [
    {
      name: "TypeScript",
      category: "Frontend & Core",
      proof: "LocoMe • GradeBuddy • DevCanvas",
      desc: "Primary language for type-safe web applications & UI components",
      highlight: true
    },
    {
      name: "Next.js 15/16",
      category: "Frontend & Core",
      proof: "LocoMe • GradeBuddy",
      desc: "App Router, SSR, static generation & route handlers",
      highlight: true
    },
    {
      name: "React 19",
      category: "Frontend & Core",
      proof: "GradeBuddy • DevCanvas",
      desc: "Modern reactive component trees & hook architectures"
    },
    {
      name: "Vanilla CSS & Design Tokens",
      category: "Frontend & Core",
      proof: "Final Canvas • DevCanvas",
      desc: "Custom glassmorphism design systems, tokens & animations"
    },
    {
      name: "Framer Motion",
      category: "Frontend & Core",
      proof: "Portfolio • GradeBuddy",
      desc: "Layout animations, text decoders & micro-interactions"
    },

    {
      name: "Puppeteer Bot Scraper",
      category: "Backend & Storage",
      proof: "GradeBuddy (NIE Portal Bot)",
      desc: "Automated headless browser bot for CIE grade extraction",
      highlight: true
    },
    {
      name: "Dexie.js (IndexedDB)",
      category: "Backend & Storage",
      proof: "LocoMe (Local-First UX)",
      desc: "Client-side offline database with zero latency persistence",
      highlight: true
    },
    {
      name: "Firebase & Firestore",
      category: "Backend & Storage",
      proof: "LocoMe (Cloud Sync)",
      desc: "Real-time database multi-device cloud synchronization"
    },
    {
      name: "Node.js & FastAPI",
      category: "Backend & Storage",
      proof: "LocoMe • ranDetect",
      desc: "Serverless functions, scraping scripts & REST APIs"
    },

    {
      name: "Python 3.11+",
      category: "Security & ML",
      proof: "ranDetect • TankChain",
      desc: "ML training pipelines, socket networking & crypto tools",
      highlight: true
    },
    {
      name: "Scikit-learn & XGBoost",
      category: "Security & ML",
      proof: "ranDetect (Ransomware Classifier)",
      desc: "RandomForest & XGBoost models on UNSW-NB15 dataset",
      highlight: true
    },
    {
      name: "RSA Cryptography & E2EE",
      category: "Security & ML",
      proof: "TankChain (Crypto Chat)",
      desc: "End-to-end encryption, key pairs & digital signatures"
    },
    {
      name: "Blockchain & Socket Net",
      category: "Security & ML",
      proof: "TankChain (Ledger Node)",
      desc: "SHA-256 block ledger with tamper detection & socket sync"
    },

    {
      name: "Docker Containerization",
      category: "DevOps & Tooling",
      proof: "GradeBuddy (Scraper Container)",
      desc: "Headless bot isolation in production container runtime"
    },
    {
      name: "Linux & Bash",
      category: "DevOps & Tooling",
      proof: "ranDetect • Server Deploys",
      desc: "Shell scripting, automation & environment control"
    },
    {
      name: "Git & GitHub",
      category: "DevOps & Tooling",
      proof: "12+ Shipped Public Repos",
      desc: "Version control, CI actions & release management"
    },
    {
      name: "Vercel & Render",
      category: "DevOps & Tooling",
      proof: "LocoMe • GradeBuddy Deploys",
      desc: "Production cloud hosting & edge network deployments"
    }
  ],

  skills: {
    "Frontend & Core": ["TypeScript", "Next.js 15/16", "React 19", "Vanilla CSS", "Framer Motion"],
    "Backend & Storage": ["Puppeteer Bot", "Dexie.js (IndexedDB)", "Firebase / Firestore", "Node.js & FastAPI"],
    "Security & ML": ["Python 3.11+", "Scikit-learn & XGBoost", "RSA Cryptography", "Blockchain & Sockets"],
    "DevOps & Tooling": ["Docker", "Linux / Bash", "Git & GitHub", "Vercel & Render"]
  },

  projects: [
    {
      id: "locome",
      name: "LocoMe",
      category: "PWA",
      spotlight: true,
      subtitle: "Progressive Web App for Habit Tracking & Real-Time Sync",
      description: "A Progressive Web App for habit tracking and task management with real-time Firebase sync, offline capabilities, streak retention engine, and theme customization.",
      problem: "Most habit tracking apps lock essential sync features behind expensive subscriptions or fail to retain user progress when offline, leading to broken habit streaks and fragmented tracking across devices.",
      solution: "Engineered a cross-platform Progressive Web App (PWA) built with Next.js and TypeScript. Integrated Firebase Firestore for real-time multi-device database synchronization and implemented Service Worker caching for seamless offline habit entries with automated background sync.",
      highlights: [
        "Offline-first PWA architecture with Background Sync",
        "Real-time Firestore multi-device synchronization engine",
        "Algorithmic streak calculation & retention analytics",
        "Customizable dark/light UI themes with glassmorphism design"
      ],
      metrics: [
        { label: "Platform", value: "PWA / Web" },
        { label: "Sync Latency", value: "< 50ms" },
        { label: "Offline Mode", value: "100% Functional" }
      ],
      tech: ["TypeScript", "Next.js", "Firebase", "PWA", "Tailwind CSS"],
      liveUrl: "https://locome.bitwise-adi.dev",
      githubUrl: "https://github.com/bitwise-adi/LocoMe",
      image: "/phtos/locome/01_landing.png",
      screenshots: [
        "/phtos/locome/01_landing.png",
        "/phtos/locome/02_habits_created.png",
        "/phtos/locome/03_august_entries.png",
        "/phtos/locome/04_tasks_tab.png",
        "/phtos/locome/05_settings_page.png",
        "/phtos/locome/06_shared_page.png",
      ],
    },
    {
      id: "gradebuddy",
      name: "GradeBuddy",
      category: "Web & Tools",
      spotlight: false,
      subtitle: "NIE Parent Portal Scraper & Exam Strategy Dashboard",
      description: "Scrapes the NIE parent portal and provides a dashboard with an SGPA planner to strategize your semester-end exams.",
      problem: "Students at NIE Mysore faced fragmented parent portal interfaces that made calculating current GPA trends and target marks required for specific semester-end SGPA goals tedious and prone to manual error.",
      solution: "Built a containerized web application that uses Puppeteer headless browser automation to securely scrape student academic data from the NIE portal. Processed records are rendered into an interactive dashboard featuring a real-time SGPA goal simulator.",
      highlights: [
        "Headless Puppeteer portal scraping & authentication pipeline",
        "Interactive SGPA goal planner & grade scenario simulator",
        "Docker containerization for portable deployment",
        "Responsive analytics dashboard for semester grade trends"
      ],
      metrics: [
        { label: "Scrape Time", value: "< 3.2s" },
        { label: "Accuracy", value: "100% Calculated" },
        { label: "Deployment", value: "Dockerized" }
      ],
      tech: ["TypeScript", "React", "Puppeteer", "Docker", "Node.js"],
      liveUrl: "https://gradebuddy.bitwise-adi.dev",
      githubUrl: "https://github.com/bitwise-adi/GradeBuddy",
      image: "/phtos/projects/gradebuddy_desktop.png",
      screenshots: [
        "/phtos/projects/gradebuddy_desktop.png"
      ],
    },
    {
      id: "ransomguard",
      name: "RansomGuard.ai",
      category: "Security & ML",
      spotlight: false,
      subtitle: "ML Threat Classification System with GoF Clean Architecture",
      description: "ML-powered network threat classification system built with Clean Architecture, 6 GoF design patterns for runtime model switching, and a FastAPI analytics dashboard.",
      problem: "Traditional intrusion detection systems rely on static signatures that struggle to adapt dynamically to new ransomware malware variants without causing latency bottlenecks in production pipelines.",
      solution: "Architected a scalable ML classification system in Python utilizing Clean Architecture. Implemented 6 Gang of Four (GoF) design patterns (Strategy, Factory, Observer, Decorator, Adapter, Singleton) enabling zero-downtime runtime model switching between XGBoost and Random Forest algorithms via a FastAPI dashboard.",
      highlights: [
        "Architected with 6 GoF design patterns for runtime model hot-swapping",
        "Sub-millisecond machine learning classification pipeline",
        "XGBoost and Random Forest models trained on network threat telemetry",
        "Real-time analytics dashboard powered by FastAPI & Chart.js"
      ],
      metrics: [
        { label: "Inference Time", value: "< 1ms" },
        { label: "GoF Patterns", value: "6 Implemented" },
        { label: "Model Hot-Swap", value: "Zero Downtime" }
      ],
      tech: ["Python", "FastAPI", "XGBoost", "Random Forest", "Scikit-learn", "Chart.js"],
      liveUrl: null,
      githubUrl: "https://github.com/bitwise-adi/ranDetect",
      image: null,
      screenshots: [],
    },
    {
      id: "nova",
      name: "NOVA",
      category: "Security & Crypto",
      spotlight: false,
      subtitle: "RSA Encrypted Multi-Client Socket Chat Application",
      description: "Multi-client real-time chat application with RSA-based end-to-end encryption, dynamic public key exchange, and multithreaded socket networking.",
      problem: "Standard socket messaging applications transmit plain-text payloads or rely on server-side decryption, exposing user communications to network sniffing and man-in-the-middle attacks.",
      solution: "Developed a secure multi-client chat system using Python socket programming. Implemented client-side 2048-bit RSA key generation and dynamic public key exchange over TCP, encrypting payloads before transmission so message content remains unreadable to third parties.",
      highlights: [
        "End-to-end payload encryption using client-side RSA key pairs",
        "Dynamic TCP public key exchange protocol",
        "Multithreaded socket server handling multiple simultaneous clients",
        "Modern desktop UI built with CustomTkinter"
      ],
      metrics: [
        { label: "Encryption", value: "RSA-2048" },
        { label: "Network", value: "TCP Sockets" },
        { label: "Threading", value: "Concurrent Clients" }
      ],
      tech: ["Python", "Socket Programming", "RSA", "CustomTkinter", "Cryptography"],
      liveUrl: null,
      githubUrl: "https://github.com/bitwise-adi/encrypted-chat-app",
      image: null,
      screenshots: [],
    },
    {
      id: "buildfolio",
      name: "BuildFolio",
      category: "Web & Tools",
      spotlight: false,
      subtitle: "Zero-Backend Client-Side Portfolio Generator",
      description: "Zero-backend client-side portfolio generator. Build, preview in real time with dark mode, and export deployable websites directly from the browser.",
      problem: "Setting up personal portfolio websites usually requires configuring backend servers, database hosting, or complex build setups, creating friction for developers wanting a quick, free solution.",
      solution: "Created a pure client-side portfolio generator that operates completely inside the browser using HTML5, JavaScript, and LocalStorage. Users customize layout, dark/light themes, and content with real-time live preview, then export ready-to-deploy HTML/CSS zip archives.",
      highlights: [
        "100% Client-side execution with zero backend dependencies",
        "Real-time live WYSIWYG portfolio preview with dark mode toggle",
        "LocalStorage state persistence across browser sessions",
        "One-click export of production-ready deployable HTML/CSS code"
      ],
      metrics: [
        { label: "Backend Dependency", value: "0%" },
        { label: "Export Format", value: "HTML / CSS Zip" },
        { label: "Live Preview", value: "Instant" }
      ],
      tech: ["JavaScript", "HTML5", "CSS3", "LocalStorage"],
      liveUrl: "https://bitwise-adi.github.io/BuildFolio/",
      githubUrl: "https://github.com/bitwise-adi/BuildFolio",
      image: "/phtos/projects/buildfolio_populated.png",
      screenshots: [
        "/phtos/projects/buildfolio_populated.png"
      ],
    },
  ],

  timeline: [
    {
      id: "btech",
      year: "2023 – Present (Expected 2027)",
      title: "BE / B.Tech in Information Science & Engineering (ISE)",
      institution: "The National Institute of Engineering (NIE)",
      location: "Mysore, Karnataka",
      score: "8.5 CGPA",
      boardOrDegree: "B.E. Degree",
      description: "Currently in 4th Year. Focus on software engineering discipline, full-stack web applications, machine learning systems, data structures, algorithm design, and security engineering.",
      current: true
    },
    {
      id: "mech",
      year: "2023 – 2024",
      title: "BE in Mechanical Engineering (1st Year)",
      institution: "The National Institute of Engineering (NIE)",
      location: "Mysore, Karnataka",
      score: "9.5 CGPA",
      boardOrDegree: "Merit Branch Change",
      description: "Achieved an outstanding 9.5 CGPA in 1st Year Mechanical Engineering, earning a competitive merit-based branch change to Information Science & Engineering (ISE).",
      current: false
    },
    {
      id: "12th",
      year: "2020 – 2022",
      title: "12th (Intermediate / Senior Secondary)",
      institution: "Holy Mission High School",
      location: "Samastipur, Bihar",
      score: "80%",
      boardOrDegree: "CBSE Board",
      description: "Completed Senior Secondary education in the Science stream with focus on Physics, Chemistry, and Mathematics (PCM).",
      current: false
    },
    {
      id: "10th",
      year: "2020",
      title: "10th (Matriculation / Secondary School)",
      institution: "St. Xavier's High School",
      location: "Mahua, Bihar",
      score: "93%",
      boardOrDegree: "CBSE Board",
      description: "Completed secondary school matriculation with distinction (93%). Developed core analytical skills and interest in modern computing technologies.",
      current: false
    }
  ],

  social: [
    { name: "GitHub",   url: "https://github.com/bitwise-adi",       icon: "github"   },
    { name: "LinkedIn", url: "https://linkedin.com/in/bitwise-adi",   icon: "linkedin"  },
    { name: "Email",    url: "mailto:reachadiofficial@gmail.com",     icon: "email"     },
  ],

  categoryColors: {
    "PWA":              { bg: "rgba(0,255,204,0.12)", text: "#00ffcc", glow: "rgba(0,255,204,0.3)"  },
    "Web & Tools":      { bg: "rgba(139,92,246,0.12)", text: "#8b5cf6", glow: "rgba(139,92,246,0.3)" },
    "Security & ML":    { bg: "rgba(251,146,60,0.12)",  text: "#fb923c", glow: "rgba(251,146,60,0.3)" },
    "Security & Crypto":{ bg: "rgba(244,63,94,0.12)",   text: "#f43f5e", glow: "rgba(244,63,94,0.3)"  },
  },

  navLinks: [
    { name: "About",    href: "#about",            icon: "user" },
    { name: "Timeline", href: "#timeline",         icon: "timeline" },
    { name: "Skills",   href: "#skills",           icon: "cpu" },
    { name: "Projects", href: "#projects",         icon: "folder" },
    { name: "Terminal", href: "#terminal-section", icon: "terminal" },
    { name: "Contact",  href: "#contact",          icon: "mail" },
  ],

  terminal: {
    prompt: "visitor@bitwise-adi:~$",
    welcomeMessage: [
      "Welcome to bitwise-adi's interactive terminal. Type 'help' to see commands.",
      "",
    ],
  },
};
