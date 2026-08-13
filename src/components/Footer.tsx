import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { CONFIG } from '../data/config';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 border-t border-white/5 relative z-10 bg-[#07070d]">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Brand & Dynamic Copyright */}
        <div className="flex flex-col items-center md:items-start gap-1 text-center md:text-left">
          <span className="font-mono font-bold text-sm text-[#00ffcc] tracking-tight">
            &lt;bitwise-adi /&gt;
          </span>
          <p className="text-xs text-[#6a6a82]">
            Designed &amp; engineered by Aditya Raj &copy; {currentYear}. Built for high velocity.
          </p>
        </div>

        {/* Center: Social Links */}
        <div className="flex items-center gap-4 text-xs font-mono text-[#9a9ab0]">
          <a
            href={CONFIG.personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#00ffcc] transition-colors flex items-center gap-1.5"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>
          <a
            href={CONFIG.personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#00ffcc] transition-colors flex items-center gap-1.5"
          >
            <Linkedin className="w-3.5 h-3.5" />
            <span>LinkedIn</span>
          </a>
          <a
            href={`mailto:${CONFIG.personal.email}`}
            className="hover:text-[#00ffcc] transition-colors flex items-center gap-1.5"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Email</span>
          </a>
        </div>

        {/* Right: Back to Top Button */}
        <motion.button
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          className="flex items-center gap-2 px-4 py-2 rounded-xl glass-panel border border-white/10 text-xs font-mono text-[#00ffcc] hover:border-[#00ffcc]/40 transition-colors"
        >
          <span>Back to Top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </motion.button>
      </div>
    </footer>
  );
};

