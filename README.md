<div align="center">
  <h1>✨ DevCanvas</h1>
  <p><strong>Modern, high-performance developer portfolio &amp; MDX writing portal.</strong></p>
  <p>Built with Next.js (App Router), Vanilla CSS, Framer Motion, and MDX.</p>

  <p>
    <a href="https://bitwise-adi.dev"><strong>View Live Site »</strong></a>
    &nbsp;•&nbsp;
    <a href="#-features">Features</a>
    &nbsp;•&nbsp;
    <a href="#-project-structure">Structure</a>
    &nbsp;•&nbsp;
    <a href="#-customization-guide">Customization</a>
    &nbsp;•&nbsp;
    <a href="#-getting-started">Getting Started</a>
  </p>
</div>

---

## 🚀 Overview

**DevCanvas** is a personal developer canvas and portfolio designed to showcase engineering projects, skills, domain expertise, long-form analytical writing, and interactive resumes.

Engineered with a **config-driven architecture** and a **zero-framework CSS design system**, all personal information, project data, and skills live strictly in centralized data files—making updates instant without touching component code.

---

## ✨ Features

- **⚡ Blazing Fast Performance**: Next.js 16 App Router with Turbopack and static site generation (SSG).
- **🎨 Custom Design System**: 100% Vanilla CSS with CSS variables, sleek dark theme, glassmorphism, responsive grids, and purple/cyan accent glows.
- **🌀 Interactive Hero**: Scrambled text name decoder effect, rotating dynamic taglines, and subtle entry animations.
- **🍱 Bento Grid About**: Modular grid highlighting core background, technical skills breakdown, and focus domains.
- **💼 Interactive Project Showcase**: Dynamic project cards featuring 3D hover effects, gradient borders, live demo links, and GitHub repository shortcuts.
- **📝 Standalone MDX Blog Engine**:
  - Full dynamic MDX pipeline with frontmatter parsing (`gray-matter` & `remark`).
  - Pre-rendered static article routes (`/blog/[slug]`).
  - Custom embedded interactive components (`<KeyMetric />`, `<StatGrid />`, `<Callout />`, `<ComparisonTable />`, `<MetricBar />`).
  - Polished `.prose` typography styling.
- **📄 Dedicated Resume Viewer**: In-browser PDF viewing page (`/resume`) with direct one-click PDF download capabilities.
- **📱 Fully Responsive**: Fluid layouts crafted for mobile, tablet, and widescreen displays.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 16 (App Router)](https://nextjs.org/) |
| **UI Library** | [React 19](https://react.dev/) |
| **Styling** | Vanilla CSS (Tokens, CSS Variables, Glassmorphism) |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) |
| **Content / Blog** | `@next/mdx`, `@mdx-js/react`, `gray-matter`, `remark-frontmatter` |
| **Typography** | Space Grotesk (Headings), Inter (Body), JetBrains Mono (Code) |
| **Icons** | [Lucide React](https://lucide.dev/) + Custom SVG Brand Icons |
| **Deployment** | [Vercel](https://vercel.com/) |

---

## 📁 Project Structure

```text
DevCanva/
├── content/
│   └── blog/                   # MDX blog posts (*.mdx)
│       └── spacex-valuation-dilemma.mdx
├── public/
│   └── resume/                 # Resume PDF files
│       └── MeRes.pdf
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── blog/               # Standalone blog portal (/blog & /blog/[slug])
│   │   ├── resume/             # Embedded resume viewer (/resume)
│   │   ├── globals.css         # Complete design system & token definitions
│   │   ├── layout.js           # Root layout & font configurations
│   │   └── page.js             # Portfolio landing page
│   ├── components/             # Reusable UI components
│   │   ├── blog/               # Custom interactive MDX components
│   │   ├── About.js            # Bento grid about section
│   │   ├── Contact.js          # Contact & social links
│   │   ├── Footer.js           # Site footer
│   │   ├── Hero.js             # Hero section with text scramble & taglines
│   │   ├── Icons.js            # Custom inline brand SVG icons
│   │   ├── Navbar.js           # Floating glass navbar
│   │   ├── ProjectCard.js      # Individual project card with 3D glow
│   │   └── ProjectsSection.js  # Project grid container
│   ├── data/                   # ⚙️ Config files (Edit your content here!)
│   │   ├── projects.js         # Projects list & metadata
│   │   ├── siteConfig.js       # Profile, bio, socials, SEO settings
│   │   └── skills.js           # Technical skill categories & tags
│   └── lib/
│       └── blog.js             # MDX & frontmatter parser utilities
├── mdx-components.js           # MDX component bindings for App Router
├── next.config.mjs             # Next.js & MDX configuration
└── jsconfig.json               # Path aliases (@/* and @content/*)
```

---

## ⚙️ Customization Guide

All personal and portfolio content is isolated in `src/data/`:

### 1. Personal Info & Socials (`src/data/siteConfig.js`)
Update your name, bio, rotating taglines, avatar URL, and social links:
```javascript
const siteConfig = {
  name: "Aditya Raj",
  handle: "bitwise-adi",
  bio: "Developer & builder. I ship products, break things to learn...",
  email: "reachadiofficial@gmail.com",
  socials: {
    github: "https://github.com/bitwise-adi",
    linkedin: "https://linkedin.com/in/bitwise-adi",
  },
  resumeFile: "/resume/MeRes.pdf",
};
```

### 2. Projects (`src/data/projects.js`)
Add or modify project cards:
```javascript
{
  name: "GradeBuddy",
  slug: "gradebuddy",
  description: "Scrapes the NIE parent portal and provides an SGPA planner.",
  tech: ["TypeScript", "React", "Puppeteer", "Docker"],
  liveUrl: "https://gradebuddy.onrender.com",
  githubUrl: "https://github.com/bitwise-adi/GradeBuddy",
  featured: true,
}
```

### 3. Skills (`src/data/skills.js`)
Customize technical skill categories:
```javascript
export const skillCategories = [
  {
    title: "Languages",
    skills: ["TypeScript", "JavaScript", "Python", "C++", "SQL"],
  },
  // ...
];
```

### 4. Adding Blog Posts (`content/blog/`)
Create a new `.mdx` file in `content/blog/your-post-slug.mdx` with standard frontmatter:
```mdx
---
title: "Your Article Title"
description: "A short summary of the article."
date: "2026-08-04"
readTime: "6 min read"
tags: ["Engineering", "Fintech"]
published: true
---

# Your Markdown Content

Write standard Markdown or embed interactive components:

<Callout type="insight" title="Key Takeaway">
  Interactive custom MDX component directly embedded in your post.
</Callout>
```

---

## 🚦 Getting Started

### Prerequisites
- Node.js 18.18+ or later
- npm, yarn, or pnpm

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/bitwise-adi/DevCanva.git
   cd DevCanva
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Run production server locally:**
   ```bash
   npm run start
   ```

---

## 🚢 Deployment

The project is optimized for deployment on **Vercel**:

1. Push your changes to GitHub.
2. Import your repository into [Vercel](https://vercel.com/).
3. Framework preset will automatically detect **Next.js**.
4. Click **Deploy**.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
