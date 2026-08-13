# ⚡ DevCanvas — Interactive Developer Portfolio & Canvas

[![Live Website](https://img.shields.io/badge/Live_Site-www.bitwise--adi.dev-00ffcc?style=for-the-badge&logo=vercel&logoColor=00ffcc)](https://www.bitwise-adi.dev)
[![GitHub Repository](https://img.shields.io/badge/GitHub-bitwise--adi%2FDeveCanva-8b5cf6?style=for-the-badge&logo=github&logoColor=white)](https://github.com/bitwise-adi/DeveCanva)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)

> High-velocity, cyberpunk-inspired developer portfolio and interactive canvas built with **React 18**, **TypeScript**, **Vite 6**, **Tailwind CSS**, and **Framer Motion**. Featuring interactive particle physics, an embedded CLI terminal state machine, a global command palette (`⌘K`), dynamic project case studies, and smooth micro-animations.

---

## 🌐 Live Demo & Repository

- 🔗 **Live Production Site**: [https://www.bitwise-adi.dev](https://www.bitwise-adi.dev)
- 📦 **GitHub Repository**: [https://github.com/bitwise-adi/DeveCanva](https://github.com/bitwise-adi/DeveCanva)

---

## ✨ Key Features

- 🌌 **Interactive Particle Physics Canvas**: Real-time interactive background canvas with dynamic particle connections, responsive viewport scaling, and mobile performance throttling (`< 768px`).
- 💻 **Interactive CLI Terminal State Machine**: Full terminal experience with custom CLI commands: `help`, `whoami`, `projects` / `ls`, `experience`, `skills`, `socials`, `contact`, `resume` / `cat resume.pdf`, `neofetch`, `clear`, and `sudo hire-me`.
- ⌘ **Global Command Palette (`⌘K`)**: Instant modal navigation accessible anywhere on the site with keyboard shortcut listeners (`⌘K` and `/`).
- 📦 **Bento Grid & Case Study SPA Router**: Filterable project showcase featuring live demo links, modal case studies, and image lightbox galleries with `AnimatePresence` view crossfades.
- 🛠️ **Skills & Proof Matrix**: Categorized tech stack matrix linking every listed technology directly to shipped project proofs (`LocoMe`, `GradeBuddy`, `RansomGuard.ai`, `NOVA`, `BuildFolio`, `DevCanvas`).
- 📄 **In-Browser PDF Resume Viewer**: Interactive PDF viewer modal with instant download capabilities (`Aditya_Raj_Resume.pdf`).
- 🎨 **Glassmorphism & Design Token System**: Dark background (`#07070d`), vibrant cyan accents (`#00ffcc`), purple glow gradients (`#8b5cf6`), and high-performance Tailwind utility classes.
- ⚡ **Performance & SEO Optimized**: Pre-rendered inline HTML splash spinner, custom SVG Open Graph social preview card (`og-card.svg`), and `React.lazy()` route code-splitting for fast page loads.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend Framework** | [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| **Build Tool & Bundler** | [Vite 6](https://vitejs.dev/) |
| **Styling** | [Tailwind CSS 3](https://tailwindcss.com/) + Custom Glassmorphism & Animations |
| **Motion & Transitions** | [Framer Motion 11](https://www.framer.com/motion/) |
| **Iconography** | [Lucide React](https://lucide.dev/) |
| **Utilities** | `clsx` + `tailwind-merge` |

---

## 🚀 Quick Start & Local Setup

### Prerequisites

- **Node.js**: `v18.0.0` or higher recommended
- **Package Manager**: `npm` (v9+) or `yarn`

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/bitwise-adi/DeveCanva.git
   cd DeveCanva
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` or `http://localhost:5174` in your browser.

4. **Build for production:**
   ```bash
   npm run build
   ```
   Compiled production assets will be output to the `dist/` directory.

5. **Preview production build locally:**
   ```bash
   npm run preview
   ```

---

## 🚢 Deployment Guide

This repository is optimized for zero-config static site deployment on Vercel, Netlify, Cloudflare Pages, or GitHub Pages.

### Deploying to Vercel (Recommended)

1. Import the repository [`bitwise-adi/DeveCanva`](https://github.com/bitwise-adi/DeveCanva) on [Vercel](https://vercel.com/).
2. Framework Preset: **Vite**
3. Build Command: `npm run build`
4. Output Directory: `dist`
5. Click **Deploy**.

### Deploying to Netlify

1. Connect your GitHub repository on [Netlify](https://www.netlify.com/).
2. Set Build Settings:
   - **Build Command**: `npm run build`
   - **Publish directory**: `dist`
3. Click **Deploy site**.

---

## 📁 Project Structure

```text
├── public/                     # Static assets served at root
│   ├── Aditya_Raj_Resume.pdf   # Formal PDF Resume
│   ├── favicon.svg             # SVG Monogram Favicon
│   ├── 404.html                # Custom Glassmorphism 404 Page
│   └── photos/                 # Project screenshots & OG social cards
├── src/
│   ├── components/             # Modular React components
│   │   ├── Navbar.tsx          # Responsive Header & Mobile Navigation Drawer
│   │   ├── Hero.tsx            # Main hero section & typewriter subheadline
│   │   ├── ParticleCanvas.tsx  # Canvas particle physics engine with mobile throttling
│   │   ├── AsciiHeroTerminal.tsx # Interactive ASCII terminal header overlay
│   │   ├── Terminal.tsx        # Interactive CLI terminal state machine
│   │   ├── CommandPalette.tsx  # Global modal palette (⌘K & / shortcuts)
│   │   ├── ProjectsBento.tsx   # Featured projects grid
│   │   ├── ProjectCaseStudy.tsx# Detailed project case study router
│   │   ├── ProjectsArchive.tsx # Searchable & filterable all-projects showcase
│   │   ├── LightboxModal.tsx   # Fullscreen screenshot lightbox viewer
│   │   ├── SkillsMatrix.tsx    # Categorized tech stack & project proofs
│   │   ├── Timeline.tsx        # Interactive career & education timeline
│   │   ├── ResumeModal.tsx     # In-app PDF resume viewer
│   │   ├── Contact.tsx       # Contact form & availability status card
│   │   ├── ScrollProgressBar.tsx # Dynamic scroll indicator
│   │   └── Footer.tsx          # Site footer, shortcut hints & sitemap
│   ├── data/
│   │   └── config.ts           # Centralized configuration & portfolio data
│   ├── App.tsx                 # App root, code-splitting & AnimatePresence
│   ├── main.tsx                # Application entry point
│   └── index.css               # Design tokens & glassmorphism utilities
├── index.html                  # HTML5 document, loading splash & SEO meta tags
├── package.json                # Dependencies & scripts
├── tailwind.config.js          # Tailwind design system configuration
├── tsconfig.json               # TypeScript compiler config
└── vite.config.ts              # Vite build system configuration
```

---

## ⚙️ Customization & Data Setup

All portfolio content (personal info, projects, skills, timeline, and terminal commands) is driven by [`src/data/config.ts`](file:///home/adityar/OP/Final%20Canvas/src/data/config.ts).

To update profile details:
1. Modify [`src/data/config.ts`](file:///home/adityar/OP/Final%20Canvas/src/data/config.ts) with your name, contact info, skills, and project list.
2. Replace PDF resume at `public/Aditya_Raj_Resume.pdf` and static images in `public/photos/`.
3. Update metadata, title, and Open Graph tags in `index.html`.

---

## 📄 License

Distributed under the [MIT License](LICENSE).
