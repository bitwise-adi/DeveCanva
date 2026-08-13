# ⚡ `<bitwise-adi />` — Interactive Developer Portfolio

> High-velocity, cyberpunk-inspired developer portfolio built with React 18, TypeScript, Vite, Tailwind CSS, and Framer Motion. Featuring interactive canvas particles, an embedded CLI terminal, a global command palette (`⌘K`), dynamic project case studies, and smooth micro-animations.

---

## ✨ Features

- 🌌 **Interactive Particle Canvas & ASCII Hero Terminal**: Dynamic visual background with user interaction and a toggleable ASCII terminal header.
- 💻 **Interactive Embedded CLI Terminal**: Full terminal experience supporting commands like `help`, `about`, `skills`, `projects`, `resume`, `clear`, `matrix`, `sudo`, and `contact`.
- ⌘ **Global Command Palette (`⌘K`)**: Quick navigation and instant actions accessible anywhere on the site with fuzzy search and keyboard shortcuts.
- 📦 **Bento Grid & Project Case Studies**: Interactive project showcase featuring filter tags, live demo links, modal case studies, and image lightbox galleries.
- 🛠️ **Skills Matrix & Interactive Timeline**: Categorized tech stack breakdown with visual mastery indicators and interactive educational milestones.
- 📄 **Interactive Resume Modal**: In-browser PDF resume viewer with instant download capabilities.
- 🎨 **Sleek Cyberpunk & Glassmorphism Aesthetics**: Built with tailored dark modes (`#07070d`), vibrant cyan accents (`#00ffcc`), purple glow effects (`#8b5cf6`), and smooth Framer Motion animations.
- 📱 **Fully Responsive**: Optimized for desktop, tablet, and mobile devices with custom touch navigation.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| **Build Tool** | [Vite 6](https://vitejs.dev/) |
| **Styling** | [Tailwind CSS 3](https://tailwindcss.com/) + Custom Glassmorphism & Animations |
| **Motion & FX** | [Framer Motion 11](https://www.framer.com/motion/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Utilities** | `clsx` + `tailwind-merge` |

---

## 📁 Project Structure

```text
├── public/                  # Static assets served at root
│   ├── MeRes.pdf            # PDF Resume
│   ├── favicon.svg          # Site Favicon
│   └── phtos/               # Project screenshots & media assets
├── src/
│   ├── components/          # Modular React components
│   │   ├── Navbar.tsx             # Header with navigation & quick actions
│   │   ├── Hero.tsx               # Main hero section & call-to-action
│   │   ├── ParticleCanvas.tsx     # Canvas particle physics engine
│   │   ├── AsciiHeroTerminal.tsx  # ASCII terminal header overlay
│   │   ├── Terminal.tsx           # Interactive CLI terminal component
│   │   ├── CommandPalette.tsx     # Global modal palette (⌘K)
│   │   ├── ProjectsBento.tsx      # Project bento grid
│   │   ├── ProjectCaseStudy.tsx   # Detailed project case study modal
│   │   ├── AllProjectsModal.tsx   # Filterable all-projects showcase
│   │   ├── LightboxModal.tsx      # Fullscreen screenshot lightbox viewer
│   │   ├── SkillsMatrix.tsx       # Tech stack grid
│   │   ├── Timeline.tsx           # Interactive career/education timeline
│   │   ├── ResumeModal.tsx        # In-app PDF resume modal
│   │   ├── Contact.tsx            # Contact form & social links
│   │   ├── ScrollProgressBar.tsx  # Dynamic scroll indicator
│   │   └── Footer.tsx             # Site footer & copyright
│   ├── data/
│   │   └── config.ts        # Centralized configuration & portfolio data
│   ├── App.tsx              # Main application root
│   ├── main.tsx             # Entry point
│   └── index.css            # Global CSS styles & design tokens
├── index.html               # Main HTML document & SEO meta tags
├── package.json             # Dependencies & scripts
├── tailwind.config.js       # Tailwind CSS design system config
├── tsconfig.json            # TypeScript configuration
└── vite.config.ts           # Vite build system config
```

---

## 🚀 Quick Start & Local Setup

### Prerequisites

- Node.js (v18.0.0 or higher recommended)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/bitwise-adi/bitwise-adi.dev.git
   cd bitwise-adi.dev
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. **Build for production:**
   ```bash
   npm run build
   ```
   The compiled static assets will be output to the `dist/` folder.

5. **Preview production build locally:**
   ```bash
   npm run preview
   ```

---

## ⚙️ Customization

All portfolio content (personal details, projects, skills, timeline events, and terminal commands) is driven by [`src/data/config.ts`](file:///home/adityar/OP/Final%20Canvas/src/data/config.ts).

To update your own info:
1. Edit `src/data/config.ts` with your profile details, links, and projects.
2. Replace static images in `public/phtos/` and your PDF resume at `public/MeRes.pdf`.
3. Update title, description, and meta tags in `index.html`.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
