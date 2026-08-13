import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, ShieldCheck, Sparkles, Terminal } from 'lucide-react';
import { CONFIG, ProvenSkill } from '../data/config';

export const SkillsMatrix: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', 'Frontend & Core', 'Backend & Storage', 'Security & ML', 'DevOps & Tooling'];

  const filteredSkills =
    selectedCategory === 'all'
      ? CONFIG.provenSkills
      : CONFIG.provenSkills.filter((item) => item.category === selectedCategory);

  return (
    <section id="skills" className="py-24 relative z-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-8 font-mono text-xs uppercase tracking-widest text-[#00ffcc]"
        >
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            <span>Skills & Proof Matrix</span>
          </div>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-[#00ffcc]/30 to-transparent" />
        </motion.div>

        {/* Section Title & Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#00ffcc]/10 border border-[#00ffcc]/30 text-[#00ffcc]">
              <Code2 className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">Battle-Tested Tech & Proofs</h2>
              <p className="text-xs text-[#9a9ab0] mt-1">
                Filtered of generic fluff — every technology listed below is backed by shipped project code.
              </p>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-[#0e0e18] border border-white/5 overflow-x-auto max-w-full">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${
                    isSelected ? 'text-[#00ffcc]' : 'text-[#9a9ab0] hover:text-white'
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="activeSkillCategory"
                      className="absolute inset-0 rounded-full bg-white/10 border border-white/10"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{cat === 'all' ? 'All Skills' : cat}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Skill Display Render (Compact Button Tags for 'all', Rich Cards for Specific Tabs) */}
        {selectedCategory === 'all' ? (
          <motion.div
            layout
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3"
          >
            <AnimatePresence mode="popLayout">
              {filteredSkills.map((skill: ProvenSkill) => (
                <motion.div
                  layout
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25, type: 'spring', stiffness: 350, damping: 25 }}
                  whileHover={{ y: -2, scale: 1.02 }}
                  className={`glass-panel p-3.5 rounded-xl flex items-center justify-between gap-3 group cursor-default transition-all duration-300 border ${
                    skill.highlight
                      ? 'border-[#00ffcc]/20 bg-[#00ffcc]/[0.02] hover:border-[#00ffcc]/40 hover:bg-[#00ffcc]/10 shadow-[0_0_15px_rgba(0,255,204,0.08)]'
                      : 'border-white/5 hover:border-[#00ffcc]/30 hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-xs md:text-sm text-white group-hover:text-[#00ffcc] transition-colors truncate">
                      {skill.name}
                    </div>
                    <div className="text-[10px] text-[#6a6a82] font-mono mt-0.5 truncate">
                      {skill.category}
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-1.5 text-[10px] font-mono text-[#00ffcc]/70 group-hover:text-[#00ffcc] transition-colors">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#00ffcc]" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            <AnimatePresence mode="popLayout">
              {filteredSkills.map((skill: ProvenSkill) => (
                <motion.div
                  layout
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, type: 'spring', stiffness: 350, damping: 25 }}
                  whileHover={{ y: -3 }}
                  className={`glass-panel p-5 rounded-2xl flex flex-col justify-between group transition-all duration-300 relative overflow-hidden border ${
                    skill.highlight
                      ? 'border-[#00ffcc]/30 bg-gradient-to-b from-[#00ffcc]/5 to-transparent hover:border-[#00ffcc]/60 shadow-[0_0_20px_rgba(0,255,204,0.1)]'
                      : 'border-white/5 hover:border-[#00ffcc]/30'
                  }`}
                >
                  <div>
                    {/* Category Pill & Highlight Star */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#6a6a82] bg-white/[0.03] px-2 py-0.5 rounded-md border border-white/5">
                        {skill.category}
                      </span>
                      {skill.highlight && (
                        <span className="text-[10px] font-mono text-[#00ffcc] bg-[#00ffcc]/10 px-2 py-0.5 rounded-full border border-[#00ffcc]/30 flex items-center gap-1">
                          <Terminal className="w-3 h-3" /> Core
                        </span>
                      )}
                    </div>

                    {/* Skill Name */}
                    <h3 className="font-bold text-base text-white group-hover:text-[#00ffcc] transition-colors mb-1.5">
                      {skill.name}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-[#9a9ab0] leading-relaxed mb-4">
                      {skill.desc}
                    </p>
                  </div>

                  {/* Project Proof Footer */}
                  <div className="pt-3 border-t border-white/5 flex items-start gap-1.5 font-mono text-[11px]">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#00ffcc] shrink-0 mt-0.5" />
                    <div className="text-slate-300">
                      <span className="text-[#6a6a82]">Proof: </span>
                      <span className="text-[#00ffcc] font-semibold">{skill.proof}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
};
