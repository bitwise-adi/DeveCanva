import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, FileText, ChevronDown, ArrowRight } from 'lucide-react';
import { CONFIG } from '../data/config';
import { AsciiHeroTerminal } from './AsciiHeroTerminal';

interface HeroProps {
  onOpenResume: () => void;
}

const TAGLINES = [
  "I leverage AI to ship at high velocity.",
  "Building high-performance web applications & ML systems.",
  "Architecting clean, scalable, real-time software.",
  "Full-Stack Engineer & ISE @ NIE Mysore."
];

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  const [displayName, setDisplayName] = useState<string>('');
  
  // Typewriter / rotating tagline state
  const [taglineIndex, setTaglineIndex] = useState<number>(0);
  const [currentTagline, setCurrentTagline] = useState<string>('');
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  // Scramble decode effect for Name
  useEffect(() => {
    const targetName = CONFIG.personal.name;
    const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let frame = 0;
    const totalFrames = 35;

    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const revealedCount = Math.floor(progress * targetName.length);

      let text = '';
      for (let i = 0; i < targetName.length; i++) {
        if (i < revealedCount) {
          text += targetName[i];
        } else if (targetName[i] === ' ') {
          text += ' ';
        } else {
          text += chars[Math.floor(Math.random() * chars.length)];
        }
      }
      setDisplayName(text);

      if (frame >= totalFrames) {
        setDisplayName(targetName);
        clearInterval(timer);
      }
    }, 40);

    return () => clearInterval(timer);
  }, []);

  // Typewriter rotating effect for subheadline
  useEffect(() => {
    const fullText = TAGLINES[taglineIndex];
    const typingSpeed = isDeleting ? 25 : 55;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setCurrentTagline(fullText.substring(0, currentTagline.length + 1));
        if (currentTagline.length + 1 === fullText.length) {
          setTimeout(() => setIsDeleting(true), 2200);
        }
      } else {
        setCurrentTagline(fullText.substring(0, currentTagline.length - 1));
        if (currentTagline.length === 0) {
          setIsDeleting(false);
          setTaglineIndex((prev) => (prev + 1) % TAGLINES.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentTagline, isDeleting, taglineIndex]);

  return (
    <section id="hero" className="min-h-[calc(100vh-80px)] relative z-10 flex flex-col justify-center px-4 sm:px-6 lg:px-8 pt-28 pb-16">
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Left-Aligned Hero Text & Actions */}
        <div className="lg:col-span-7 text-left flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Greeting Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 font-mono text-[#a78bfa] text-sm font-medium mb-5">
              <span className="w-2 h-2 rounded-full bg-[#00ffcc] animate-pulse" />
              <span>Hey, I'm</span>
            </div>

            {/* Main Name */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-4 text-white">
              <span className="bg-gradient-to-r from-white via-[#f1f5f9] to-[#00ffcc] bg-clip-text text-transparent">
                {displayName || CONFIG.personal.name}
              </span>
            </h1>

            {/* Animated Typewriter Subheadline */}
            <h2 className="text-2xl sm:text-3xl font-bold text-[#a78bfa] mb-5 tracking-tight leading-snug min-h-[3.5rem] flex items-center">
              <span>{currentTagline}</span>
              <span className="inline-block w-2.5 h-6 bg-[#00ffcc] ml-1.5 animate-pulse rounded-sm flex-shrink-0" />
            </h2>

            {/* Bio Paragraph */}
            <p className="text-[#9a9ab0] text-base sm:text-lg leading-relaxed max-w-2xl mb-8">
              {CONFIG.personal.bio}
            </p>
          </motion.div>

          {/* Social Badges & Actions Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap items-center gap-3"
          >
            {/* Primary Action Button: View Projects */}
            <motion.a
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              href="#projects"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#8b5cf6] to-[#6366f1] text-white font-semibold text-sm shadow-lg shadow-[#8b5cf6]/25 hover:shadow-[#8b5cf6]/40 transition-all"
            >
              <span>View Projects</span>
              <ArrowRight className="w-4 h-4" />
            </motion.a>

            {/* Secondary: Resume Modal Button */}
            <motion.button
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={onOpenResume}
              className="flex items-center gap-2 px-4 py-3 rounded-xl border border-white/10 glass-panel text-sm font-medium text-[#9a9ab0] hover:text-[#00ffcc] hover:border-[#00ffcc]/40 transition-all shadow-sm"
            >
              <FileText className="w-4 h-4" />
              <span>Resume</span>
            </motion.button>

            {/* GitHub */}
            <motion.a
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              href={CONFIG.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-3 rounded-xl border border-white/10 glass-panel text-sm font-medium text-[#9a9ab0] hover:text-[#00ffcc] hover:border-[#00ffcc]/40 transition-all shadow-sm"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </motion.a>

            {/* LinkedIn */}
            <motion.a
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              href={CONFIG.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-3 rounded-xl border border-white/10 glass-panel text-sm font-medium text-[#9a9ab0] hover:text-[#00ffcc] hover:border-[#00ffcc]/40 transition-all shadow-sm"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </motion.a>
          </motion.div>
        </div>

        {/* Right Column: Terminal ASCII Art & Telemetry Widget */}
        <div className="lg:col-span-5 w-full flex justify-center lg:justify-end">
          <AsciiHeroTerminal />
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0], opacity: [0.4, 0.8, 0.4] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 font-mono text-[11px] text-[#6a6a82] uppercase tracking-widest pointer-events-none"
      >
        <span>scroll</span>
        <ChevronDown className="w-4 h-4" />
      </motion.div>
    </section>
  );
};
