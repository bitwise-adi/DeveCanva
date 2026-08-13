import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, MapPin, Award, BookOpen } from 'lucide-react';
import { CONFIG, TimelineItem } from '../data/config';

export const Timeline: React.FC = () => {
  return (
    <section id="timeline" className="py-24 relative z-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-12 font-mono text-xs uppercase tracking-widest text-[#00ffcc]"
        >
          <span>Timeline</span>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-[#00ffcc]/30 to-transparent" />
        </motion.div>

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-left mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 font-mono text-[#a78bfa] text-xs font-semibold uppercase tracking-wider mb-3">
            <GraduationCap className="w-3.5 h-3.5 text-[#00ffcc]" />
            <span>Academic Journey</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Education & Milestones
          </h2>
        </motion.div>

        {/* Vertical Timeline Structure */}
        <div className="relative pl-6 sm:pl-10 border-l border-white/10 space-y-12">
          {CONFIG.timeline.map((item: TimelineItem, idx: number) => {
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="relative group"
              >
                {/* Node Circle on Vertical Line */}
                <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 flex items-center justify-center">
                  <div className={`w-4 h-4 rounded-full border-2 transition-all ${
                    item.current
                      ? 'bg-[#00ffcc] border-[#00ffcc] shadow-[0_0_12px_rgba(0,255,204,0.8)]'
                      : 'bg-[#090b15] border-[#8b5cf6] group-hover:border-[#00ffcc] group-hover:scale-125'
                  }`} />
                  {item.current && (
                    <span className="absolute w-7 h-7 rounded-full bg-[#00ffcc]/30 animate-ping" />
                  )}
                </div>

                {/* Timeline Content Card */}
                <div className="spotlight-card glass-panel p-6 rounded-2xl border border-white/10 hover:border-white/20 shadow-xl transition-all duration-300">
                  {/* Top Bar: Year & Badges */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-2 font-mono text-xs text-[#00ffcc] bg-[#00ffcc]/10 px-3 py-1 rounded-full border border-[#00ffcc]/30">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{item.year}</span>
                      {item.current && (
                        <span className="w-2 h-2 rounded-full bg-[#00ffcc] animate-pulse ml-1" />
                      )}
                    </div>

                    <div className="flex items-center gap-2 font-mono text-xs">
                      {/* Score Highlight Pill */}
                      <span className="px-3 py-1 rounded-full bg-[#8b5cf6]/20 border border-[#8b5cf6]/40 text-[#a78bfa] font-bold flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5 text-[#00ffcc]" />
                        {item.score}
                      </span>

                      {/* Board / Degree Badge */}
                      <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
                        {item.boardOrDegree}
                      </span>
                    </div>
                  </div>

                  {/* Title & Institution */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#00ffcc] transition-colors mb-1">
                    {item.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs text-[#a78bfa] mb-4">
                    <span className="flex items-center gap-1.5 font-semibold text-slate-200">
                      <BookOpen className="w-3.5 h-3.5 text-[#8b5cf6]" />
                      {item.institution}
                    </span>

                    <span className="flex items-center gap-1 text-[#9a9ab0]">
                      <MapPin className="w-3.5 h-3.5 text-[#6a6a82]" />
                      {item.location}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#9a9ab0] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
