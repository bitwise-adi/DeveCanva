import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, CheckCircle2, Maximize2, GraduationCap, Sparkles } from 'lucide-react';
import { CONFIG } from '../data/config';

interface AboutProps {
  onOpenLightbox?: (images: string[], index: number) => void;
}

export const About: React.FC<AboutProps> = ({ onOpenLightbox }) => {
  return (
    <section id="about" className="py-24 relative z-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-12 font-mono text-xs uppercase tracking-widest text-[#00ffcc]"
        >
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            <span>01 // About Me</span>
          </div>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-[#00ffcc]/30 to-transparent" />
        </motion.div>

        {/* Row 1: Avatar Card + Main Bio Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          {/* Avatar Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4 glass-panel p-4 md:p-5 rounded-2xl flex flex-col justify-between group hover:border-[#00ffcc]/30 transition-all duration-300 relative overflow-hidden"
          >
            {/* Ambient Background Glow */}
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-[#00ffcc]/10 rounded-full blur-3xl pointer-events-none" />

            <div
              onClick={() => onOpenLightbox && onOpenLightbox([CONFIG.personal.avatarPath], 0)}
              className="relative aspect-square md:aspect-[4/5] w-full rounded-xl overflow-hidden bg-slate-900/80 cursor-pointer group/img border border-white/10"
              title="Click to view photo"
            >
              <img
                src={CONFIG.personal.avatarPath}
                alt={CONFIG.personal.name}
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover/img:scale-105"
              />

              {/* Gradient Overlay for text contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#07070d] via-transparent to-black/20 opacity-85 group-hover/img:opacity-60 transition-opacity" />

              {/* Top Location Pill */}
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-mono text-[#00ffcc] flex items-center gap-1.5 shadow-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00ffcc] animate-pulse" />
                <span>{CONFIG.personal.location}</span>
              </div>

              {/* Top Right Expand Icon */}
              <div className="absolute top-3 right-3 p-1.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/15 text-white/80 opacity-0 group-hover/img:opacity-100 transition-opacity shadow-lg">
                <Maximize2 className="w-3.5 h-3.5 text-[#00ffcc]" />
              </div>

              {/* Bottom Info Overlay inside Image */}
              <div className="absolute bottom-3 left-3 right-3 p-3 rounded-lg bg-black/50 backdrop-blur-md border border-white/10 shadow-lg">
                <div className="font-bold text-white text-sm flex items-center justify-between">
                  <span>{CONFIG.personal.name}</span>
                  <span className="font-mono text-xs text-[#00ffcc]">@{CONFIG.personal.handle}</span>
                </div>
                <div className="text-[11px] text-slate-300 mt-1 flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5 text-[#00ffcc] shrink-0" />
                  <span className="truncate">{CONFIG.personal.institution}</span>
                </div>
              </div>
            </div>

            {/* Quick Status Tag line below image */}
            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-[#6a6a82]">
              <span>Role: Builder & Dev</span>
              <span className="text-[#00ffcc]">Full-Stack / ML</span>
            </div>
          </motion.div>

          {/* Main Bio Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-8 glass-panel p-6 md:p-8 rounded-2xl flex flex-col justify-between"
          >
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                Architecting High-Velocity Systems
              </h2>
              <div className="text-[#9a9ab0] text-base leading-relaxed space-y-4 whitespace-pre-line">
                {CONFIG.personal.aboutBio}
              </div>
            </div>

            {/* Highlight Badges */}
            <div className="flex flex-wrap gap-2.5 mt-8 pt-6 border-t border-white/5">
              {CONFIG.personal.highlights.map((item) => (
                <motion.span
                  key={item}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-[#00ffcc] border border-[#00ffcc]/30 bg-[#00ffcc]/10"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{item}</span>
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Row 2: Engineering Focus Card + Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Engineering Focus Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4 glass-panel p-6 rounded-2xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2.5 mb-5">
                <div className="p-2 rounded-xl bg-[#00ffcc]/10 border border-[#00ffcc]/30 text-[#00ffcc]">
                  <Cpu className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">Engineering Focus</h3>
              </div>

              <div className="space-y-3">
                {CONFIG.engineeringFocus.map((m) => (
                  <motion.div
                    key={m.label}
                    whileHover={{ x: 4 }}
                    className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between transition-all"
                  >
                    <div>
                      <div className="font-mono text-xs font-semibold text-[#00ffcc]">{m.label}</div>
                      <div className="text-[11px] text-[#6a6a82] mt-0.5">{m.desc}</div>
                    </div>
                    <div className="font-mono text-sm font-bold text-white pl-2">{m.value}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {CONFIG.stats.map((s, idx) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
                className="glass-panel p-6 rounded-2xl flex flex-col justify-center items-center text-center relative overflow-hidden group border border-white/5 hover:border-[#00ffcc]/30 transition-all"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#00ffcc]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="font-mono text-3xl md:text-4xl font-bold text-[#00ffcc] relative z-10">
                  {s.value}
                </div>
                <div className="text-xs text-[#6a6a82] mt-2 relative z-10 font-medium">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

