import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, ExternalLink, Github, ArrowRight, Layers } from 'lucide-react';
import { CONFIG, Project } from '../data/config';

interface ProjectsArchiveProps {
  onSelectCaseStudy: (id: string) => void;
}

const CATEGORIES = ['All', 'PWA', 'Web & Tools', 'Security & ML', 'Security & Crypto'];

export const ProjectsArchive: React.FC<ProjectsArchiveProps> = ({ onSelectCaseStudy }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const filteredProjects = useMemo(() => {
    return CONFIG.projects.filter((p) => {
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tech.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div className="min-h-screen relative z-10 pt-24 sm:pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Header Title Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 font-mono text-[#a78bfa] text-xs font-semibold uppercase tracking-wider mb-3">
          <Layers className="w-3.5 h-3.5 text-[#00ffcc]" />
          <span>Full Archive</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-3">
          Projects & Case Studies
        </h1>
        <p className="text-[#9a9ab0] text-base sm:text-lg max-w-2xl">
          Explore complete technical case studies, clean architecture pattern implementations, real-time web apps, and machine learning threat models.
        </p>
      </motion.div>

      {/* Filter Tabs & Search Row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10"
      >
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto font-mono text-xs">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl border transition-all ${
                selectedCategory === cat
                  ? 'bg-[#8b5cf6]/25 border-[#8b5cf6]/60 text-[#00ffcc] font-semibold shadow-md'
                  : 'bg-white/5 border-white/5 text-[#9a9ab0] hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6a6a82]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects or stack..."
            className="w-full bg-[#0d0f1d] border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-[#52526c] focus:outline-none focus:border-[#00ffcc]/50 font-mono"
          />
        </div>
      </motion.div>

      {/* Project Archive Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map((proj: Project, idx: number) => {
          const cc = CONFIG.categoryColors[proj.category] || {
            bg: 'rgba(100,100,100,0.12)',
            text: '#999',
            glow: 'rgba(100,100,100,0.2)',
          };

          return (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onMouseMove={handleMouseMove}
              style={{ '--card-glow': cc.glow } as React.CSSProperties}
              className="spotlight-card glass-panel rounded-2xl overflow-hidden flex flex-col justify-between group border border-white/10 hover:border-white/20 shadow-xl transition-all duration-300"
            >
              {/* Card Header Preview Frame */}
              <div className="relative w-full h-52 bg-slate-950 overflow-hidden">
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

                <span
                  style={{ backgroundColor: cc.bg, color: cc.text }}
                  className="absolute top-4 left-4 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide backdrop-blur-md border border-white/10 font-mono"
                >
                  {proj.category}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white group-hover:text-[#00ffcc] transition-colors mb-2">
                    {proj.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#9a9ab0] leading-relaxed mb-4">
                    {proj.subtitle || proj.description}
                  </p>
                </div>

                <div>
                  {/* Tech stack */}
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

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/5 font-mono text-xs">
                    <button
                      onClick={() => onSelectCaseStudy(proj.id)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#8b5cf6] to-[#6366f1] text-white font-semibold shadow-md hover:shadow-[#8b5cf6]/30 transition-all"
                    >
                      <span>View Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center gap-2">
                      {proj.githubUrl && (
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg border border-white/10 text-[#9a9ab0] hover:text-[#00ffcc] hover:border-[#00ffcc]/40 transition-colors"
                          title="Source Code"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}

                      {proj.liveUrl && (
                        <a
                          href={proj.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg border border-white/10 text-[#9a9ab0] hover:text-[#00ffcc] hover:border-[#00ffcc]/40 transition-colors"
                          title="Live Application"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
