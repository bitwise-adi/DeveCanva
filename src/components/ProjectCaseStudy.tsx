import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github, Image as ImageIcon, ArrowRight, CheckCircle2, Cpu, ShieldAlert, Zap, Layers } from 'lucide-react';
import { CONFIG, Project } from '../data/config';

interface ProjectCaseStudyProps {
  projectId: string;
  onNavigateToProjects: () => void;
  onNavigateToCaseStudy: (id: string) => void;
  onOpenLightbox: (images: string[], index: number) => void;
}

export const ProjectCaseStudy: React.FC<ProjectCaseStudyProps> = ({
  projectId,
  onNavigateToProjects,
  onNavigateToCaseStudy,
  onOpenLightbox,
}) => {
  const projectIndex = CONFIG.projects.findIndex((p) => p.id === projectId);
  const project: Project | undefined = CONFIG.projects[projectIndex];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [projectId]);

  if (!project) {
    return (
      <div className="min-h-screen pt-32 pb-24 flex flex-col items-center justify-center text-center px-4 font-mono">
        <h2 className="text-2xl font-bold text-white mb-4">Project Not Found</h2>
        <p className="text-[#9a9ab0] mb-6">The requested case study could not be located.</p>
        <button
          onClick={onNavigateToProjects}
          className="px-6 py-2.5 rounded-xl bg-[#8b5cf6] text-white font-semibold text-sm hover:bg-[#7c3aed] transition-colors"
        >
          ← Back to Projects
        </button>
      </div>
    );
  }

  const nextProject = CONFIG.projects[(projectIndex + 1) % CONFIG.projects.length];
  const cc = CONFIG.categoryColors[project.category] || {
    bg: 'rgba(100,100,100,0.12)',
    text: '#999',
    glow: 'rgba(100,100,100,0.2)',
  };

  return (
    <div className="min-h-screen relative z-10 pt-24 sm:pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Top Navigation Row */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between gap-4 mb-8 font-mono text-xs"
      >
        <button
          onClick={onNavigateToProjects}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-[#9a9ab0] hover:text-[#00ffcc] hover:border-[#00ffcc]/40 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Projects</span>
        </button>

        <span
          style={{ backgroundColor: cc.bg, color: cc.text }}
          className="px-3.5 py-1 rounded-full text-xs font-semibold border border-white/10"
        >
          {project.category}
        </span>
      </motion.div>

      {/* Case Study Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-4">
          {project.name}
        </h1>

        <p className="text-xl sm:text-2xl font-medium text-[#a78bfa] leading-snug mb-6 max-w-3xl">
          {project.subtitle || project.description}
        </p>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs font-medium">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#8b5cf6] to-[#6366f1] text-white font-semibold shadow-lg shadow-[#8b5cf6]/25 hover:shadow-[#8b5cf6]/40 transition-all"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Live Application</span>
            </a>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-200 hover:text-[#00ffcc] hover:border-[#00ffcc]/40 transition-all"
            >
              <Github className="w-4 h-4" />
              <span>Source Repository</span>
            </a>
          )}

          {project.screenshots.length > 0 && (
            <button
              onClick={() => onOpenLightbox(project.screenshots, 0)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-[#8b5cf6]/30 text-[#8b5cf6] hover:bg-[#8b5cf6]/10 transition-all"
            >
              <ImageIcon className="w-4 h-4" />
              <span>View Screenshots ({project.screenshots.length})</span>
            </button>
          )}
        </div>
      </motion.div>

      {/* High-Impact Metrics Row */}
      {project.metrics && project.metrics.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12"
        >
          {project.metrics.map((m, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl glass-panel border border-white/10 flex flex-col justify-between"
            >
              <span className="font-mono text-xs text-[#6a6a82] uppercase">{m.label}</span>
              <span className="text-xl sm:text-2xl font-bold text-[#00ffcc] mt-1">{m.value}</span>
            </div>
          ))}
        </motion.div>
      )}

      {/* Main Image Mockup Frame */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="mb-16 rounded-2xl overflow-hidden glass-panel border border-white/10 shadow-2xl bg-[#090b15]"
      >
        {/* macOS Window Title Bar */}
        <div className="bg-[#0d0f1d] px-4 py-3 border-b border-white/10 flex items-center gap-2 font-mono text-xs text-[#9a9ab0]">
          <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <span className="w-3 h-3 rounded-full bg-[#28c840]" />
          <span className="ml-2 text-slate-400">case-study // {project.name.toLowerCase()}.app</span>
        </div>

        <div className="relative w-full min-h-[300px] max-h-[500px] bg-slate-950 flex items-center justify-center overflow-hidden">
          {project.image ? (
            <img
              src={project.image}
              alt={project.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="p-12 text-center font-mono">
              <div className="w-20 h-20 mx-auto rounded-2xl bg-[#8b5cf6]/20 border border-[#8b5cf6]/40 flex items-center justify-center text-4xl font-bold text-[#00ffcc] mb-4">
                {project.name.charAt(0)}
              </div>
              <p className="text-slate-400 text-sm">System & Security Tool Architecture</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Case Study Details Grid */}
      <div className="space-y-12 mb-16">
        {/* Problem & Solution Breakdown */}
        {project.problem && project.solution && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 rounded-2xl glass-panel border border-white/10">
              <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-bold uppercase tracking-wider mb-3">
                <ShieldAlert className="w-4 h-4" /> The Challenge & Problem
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                {project.problem}
              </p>
            </div>

            <div className="p-6 rounded-2xl glass-panel border border-white/10">
              <div className="flex items-center gap-2 text-[#00ffcc] font-mono text-xs font-bold uppercase tracking-wider mb-3">
                <Zap className="w-4 h-4" /> Technical Architecture & Solution
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>
        )}

        {/* Engineering Highlights */}
        {project.highlights && project.highlights.length > 0 && (
          <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-white/10">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2 font-mono">
              <CheckCircle2 className="w-5 h-5 text-[#00ffcc]" />
              Key Engineering Highlights
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.highlights.map((h, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-white/5 border border-white/5 text-slate-300 text-xs sm:text-sm"
                >
                  <span className="w-2 h-2 rounded-full bg-[#00ffcc] mt-1.5 flex-shrink-0" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Technologies Used Grid */}
        <div className="p-6 rounded-2xl glass-panel border border-white/10">
          <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#a78bfa]">
            <Cpu className="w-4 h-4" /> Tech Stack & Tools
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="font-mono text-xs px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-slate-200"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Screenshots Showcase (if available) */}
        {project.screenshots.length > 0 && (
          <div>
            <h3 className="text-lg font-bold text-white mb-6 font-mono flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-[#8b5cf6]" />
              Project Screenshots ({project.screenshots.length})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.screenshots.map((imgUrl, idx) => (
                <div
                  key={idx}
                  onClick={() => onOpenLightbox(project.screenshots, idx)}
                  className="relative h-44 rounded-xl overflow-hidden border border-white/10 cursor-pointer group bg-slate-950"
                >
                  <img
                    src={imgUrl}
                    alt={`${project.name} screenshot ${idx + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center font-mono text-xs text-white">
                    View Image
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sequential Case Study Footer Navigation */}
      <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
        <button
          onClick={onNavigateToProjects}
          className="text-[#9a9ab0] hover:text-[#00ffcc] transition-colors"
        >
          ← Back to All Projects Archive
        </button>

        <button
          onClick={() => onNavigateToCaseStudy(nextProject.id)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#00ffcc]/40 text-white font-semibold hover:text-[#00ffcc] transition-all"
        >
          <span>Next Case Study: {nextProject.name}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
