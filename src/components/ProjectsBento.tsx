import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Image as ImageIcon, ArrowRight, Layers } from 'lucide-react';
import { CONFIG, Project } from '../data/config';

interface ProjectsBentoProps {
  onNavigateToProjectsArchive: () => void;
  onSelectCaseStudy: (id: string) => void;
  onOpenLightbox: (images: string[], index: number) => void;
}

export const ProjectsBento: React.FC<ProjectsBentoProps> = ({
  onNavigateToProjectsArchive,
  onSelectCaseStudy,
  onOpenLightbox,
}) => {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  // Featured projects displayed on home section
  const featuredProjects = CONFIG.projects.filter(
    (p) => p.id === 'locome' || p.id === 'gradebuddy'
  );

  return (
    <section id="projects" className="py-24 relative z-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-12 font-mono text-xs uppercase tracking-widest text-[#00ffcc]"
        >
          <span>Featured Projects</span>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-[#00ffcc]/30 to-transparent" />
        </motion.div>

        {/* Featured Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredProjects.map((proj: Project, idx: number) => {
            const cc = CONFIG.categoryColors[proj.category] || {
              bg: 'rgba(100,100,100,0.12)',
              text: '#999',
              glow: 'rgba(100,100,100,0.2)',
            };

            return (
              <motion.div
                key={proj.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                whileHover={{ y: -5 }}
                onMouseMove={handleMouseMove}
                style={{
                  '--card-glow': cc.glow,
                } as React.CSSProperties}
                className="spotlight-card glass-panel rounded-2xl overflow-hidden flex flex-col justify-between group transition-all duration-300 border border-white/10 hover:border-white/20 shadow-xl"
              >
                {/* Project Image */}
                <div className="relative w-full h-52 sm:h-60 bg-slate-950 overflow-hidden">
                  {proj.image ? (
                    <img
                      src={proj.image}
                      alt={proj.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-mono text-4xl font-bold text-[#6a6a82]/40 bg-gradient-to-br from-[#141422] to-[#0e0e18]">
                      {proj.name.charAt(0)}
                    </div>
                  )}

                  {/* Category Pill */}
                  <span
                    style={{ backgroundColor: cc.bg, color: cc.text }}
                    className="absolute top-4 left-4 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide backdrop-blur-md border border-white/10 font-mono"
                  >
                    {proj.category}
                  </span>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-white group-hover:text-[#00ffcc] transition-colors mb-2">
                      {proj.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#9a9ab0] leading-relaxed mb-5">
                      {proj.subtitle || proj.description}
                    </p>
                  </div>

                  <div>
                    {/* Tech Pills */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {proj.tech.map((t) => (
                        <span
                          key={t}
                          className="font-mono text-[10px] px-2.5 py-1 rounded-md bg-white/5 text-[#9a9ab0] border border-white/5"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Action Links */}
                    <div className="flex items-center gap-2 pt-4 border-t border-white/5 text-xs font-medium">
                      <button
                        onClick={() => onSelectCaseStudy(proj.id)}
                        className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#8b5cf6]/20 border border-[#8b5cf6]/40 text-[#00ffcc] font-semibold hover:bg-[#8b5cf6]/30 transition-colors font-mono"
                      >
                        <span>Case Study</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      {proj.githubUrl && (
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-white/10 text-[#9a9ab0] hover:text-[#00ffcc] hover:border-[#00ffcc]/40 transition-colors"
                        >
                          <Github className="w-3.5 h-3.5" />
                          <span>Source</span>
                        </a>
                      )}

                      {proj.liveUrl && (
                        <a
                          href={proj.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-white/10 text-[#9a9ab0] hover:text-[#00ffcc] hover:border-[#00ffcc]/40 transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Live</span>
                        </a>
                      )}

                      {proj.screenshots.length > 0 && (
                        <button
                          onClick={() => onOpenLightbox(proj.screenshots, 0)}
                          className="p-2 rounded-xl border border-[#8b5cf6]/30 text-[#8b5cf6] hover:bg-[#8b5cf6]/10 transition-colors ml-auto"
                          title="View screenshots"
                        >
                          <ImageIcon className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View All Projects Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={onNavigateToProjectsArchive}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#00ffcc]/50 text-white font-mono text-sm font-semibold hover:text-[#00ffcc] hover:bg-white/10 transition-all shadow-lg shadow-purple-950/20 group"
          >
            <Layers className="w-4 h-4 text-[#00ffcc]" />
            <span>Explore All Projects Archive ({CONFIG.projects.length})</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};
