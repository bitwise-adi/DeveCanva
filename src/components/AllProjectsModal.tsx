import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, ExternalLink, Github, Image as ImageIcon, Sparkles } from 'lucide-react';
import { CONFIG, Project } from '../data/config';

interface AllProjectsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenLightbox: (images: string[], index: number) => void;
}

const CATEGORIES = ['All', 'PWA', 'Web & Tools', 'Security & ML', 'Security & Crypto'];

export const AllProjectsModal: React.FC<AllProjectsModalProps> = ({ isOpen, onClose, onOpenLightbox }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

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

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative z-10 w-full max-w-5xl bg-[#090b15] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[88vh]"
        >
          {/* Modal Header */}
          <div className="px-6 py-5 border-b border-white/10 bg-[#0d0f1d] flex items-center justify-between flex-shrink-0">
            <div>
              <div className="font-mono text-xs font-bold text-[#00ffcc] uppercase tracking-widest flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" /> All Projects Portfolio
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mt-0.5">
                Full Project Archive ({CONFIG.projects.length})
              </h2>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-[#9a9ab0] hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search & Filter Controls */}
          <div className="px-6 py-4 bg-[#0a0c18] border-b border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 flex-shrink-0">
            {/* Category Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto font-mono text-xs">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg border transition-all ${
                    selectedCategory === cat
                      ? 'bg-[#8b5cf6]/20 border-[#8b5cf6]/50 text-[#00ffcc] font-semibold'
                      : 'bg-white/5 border-white/5 text-[#9a9ab0] hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#6a6a82]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects or tech..."
                className="w-full bg-[#121424] border border-white/10 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-[#52526c] focus:outline-none focus:border-[#00ffcc]/50 font-mono"
              />
            </div>
          </div>

          {/* Scrollable Grid of All Projects */}
          <div className="p-6 overflow-y-auto space-y-6">
            {filteredProjects.length === 0 ? (
              <div className="text-center py-16 text-[#6a6a82] font-mono text-sm">
                No projects match your filter or search query.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredProjects.map((proj: Project) => {
                  const cc = CONFIG.categoryColors[proj.category] || {
                    bg: 'rgba(100,100,100,0.12)',
                    text: '#999',
                    glow: 'rgba(100,100,100,0.2)',
                  };

                  return (
                    <motion.div
                      key={proj.id}
                      onMouseMove={handleMouseMove}
                      style={{ '--card-glow': cc.glow } as React.CSSProperties}
                      className="spotlight-card glass-panel rounded-2xl overflow-hidden flex flex-col justify-between group transition-all duration-300 border border-white/10 hover:border-white/20"
                    >
                      {/* Image */}
                      <div className="relative w-full h-44 bg-slate-950 overflow-hidden">
                        {proj.image ? (
                          <img
                            src={proj.image}
                            alt={proj.name}
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center font-mono text-3xl font-bold text-[#6a6a82]/40 bg-gradient-to-br from-[#141422] to-[#0e0e18]">
                            {proj.name.charAt(0)}
                          </div>
                        )}

                        <span
                          style={{ backgroundColor: cc.bg, color: cc.text }}
                          className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-semibold tracking-wide backdrop-blur-md border border-white/10 font-mono"
                        >
                          {proj.category}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="text-lg font-bold text-white group-hover:text-[#00ffcc] transition-colors mb-1.5">
                            {proj.name}
                          </h3>
                          <p className="text-xs text-[#9a9ab0] leading-relaxed mb-4">
                            {proj.description}
                          </p>
                        </div>

                        <div>
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {proj.tech.map((t) => (
                              <span
                                key={t}
                                className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/5 text-[#8888a0] border border-white/5"
                              >
                                {t}
                              </span>
                            ))}
                          </div>

                          <div className="flex items-center gap-2 pt-3 border-t border-white/5 text-xs font-medium">
                            {proj.githubUrl && (
                              <a
                                href={proj.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 text-[#9a9ab0] hover:text-[#00ffcc] hover:border-[#00ffcc]/40 transition-colors"
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
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 text-[#9a9ab0] hover:text-[#00ffcc] hover:border-[#00ffcc]/40 transition-colors"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                                <span>Live</span>
                              </a>
                            )}

                            {proj.screenshots.length > 0 && (
                              <button
                                onClick={() => {
                                  onClose();
                                  onOpenLightbox(proj.screenshots, 0);
                                }}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#8b5cf6]/30 text-[#8b5cf6] hover:bg-[#8b5cf6]/10 transition-colors ml-auto"
                              >
                                <ImageIcon className="w-3.5 h-3.5" />
                                <span>Screenshots</span>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
