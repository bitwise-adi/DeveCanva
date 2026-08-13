import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Folder, User, Cpu, GraduationCap, Terminal as TerminalIcon, Mail, Command } from 'lucide-react';
import { CONFIG } from '../data/config';

interface NavbarProps {
  currentView: 'home' | 'projects' | 'case-study';
  onOpenResume: () => void;
  onOpenCommandPalette: () => void;
  onNavigateHome: () => void;
  onNavigateProjects: () => void;
}

const navIcons: Record<string, React.ReactNode> = {
  user: <User className="w-3.5 h-3.5" />,
  timeline: <GraduationCap className="w-3.5 h-3.5" />,
  cpu: <Cpu className="w-3.5 h-3.5" />,
  folder: <Folder className="w-3.5 h-3.5" />,
  terminal: <TerminalIcon className="w-3.5 h-3.5" />,
  mail: <Mail className="w-3.5 h-3.5" />,
};

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onOpenResume,
  onOpenCommandPalette,
  onNavigateHome,
  onNavigateProjects,
}) => {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      if (currentView !== 'home') return;

      const sections = ['hero', 'about', 'timeline', 'skills', 'projects', 'terminal-section', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentView]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href === '#projects') {
      onNavigateProjects();
    } else {
      if (currentView !== 'home') {
        onNavigateHome();
        setTimeout(() => {
          const targetId = href.replace('#', '');
          const el = document.getElementById(targetId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const targetId = href.replace('#', '');
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 border-b ${
        scrolled || currentView !== 'home'
          ? 'bg-[#07070d]/90 backdrop-blur-xl border-white/10 shadow-xl shadow-black/40'
          : 'bg-[#07070d]/60 backdrop-blur-md border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Left Side: Prominent Brand Tag */}
        <button
          onClick={onNavigateHome}
          className="font-mono text-xl sm:text-2xl font-extrabold text-[#00ffcc] tracking-tight hover:drop-shadow-[0_0_16px_rgba(0,255,204,0.7)] transition-all flex items-center gap-1 cursor-pointer bg-transparent border-none p-0"
        >
          <span>&lt;bitwise-adi /&gt;</span>
        </button>

        {/* Right Side: Grouped Navigation Links & Actions */}
        <div className="flex items-center gap-3 sm:gap-6">
          {/* Section Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 font-mono">
            {CONFIG.navLinks.map((link) => {
              const sectionId = link.href.replace('#', '');
              const isActive =
                (currentView === 'projects' || currentView === 'case-study')
                  ? link.name === 'Projects'
                  : activeSection === sectionId;

              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors ${
                    isActive ? 'text-[#00ffcc]' : 'text-[#9a9ab0] hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 rounded-lg bg-[#8b5cf6]/20 border border-[#8b5cf6]/40"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{navIcons[link.icon]}</span>
                  <span className="relative z-10">{link.name}</span>
                </a>
              );
            })}
          </nav>

          {/* Action Badges & Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Command Palette Launcher */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={onOpenCommandPalette}
              title="Open Command Palette (⌘K)"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-medium text-[#9a9ab0] hover:text-[#00ffcc] border border-white/10 glass-panel hover:border-[#00ffcc]/40 transition-all shadow-sm cursor-pointer"
            >
              <Command className="w-3.5 h-3.5 text-[#00ffcc]" />
              <span className="hidden sm:inline text-[11px] font-semibold text-white">⌘K</span>
            </motion.button>

            {/* Resume Trigger */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={onOpenResume}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium text-slate-200 border border-white/10 glass-panel hover:border-[#00ffcc]/40 hover:text-[#00ffcc] transition-all shadow-sm"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
            </motion.button>

            {/* Availability indicator */}
            <div className="hidden lg:flex items-center gap-1.5 text-[10px] font-semibold text-[#00ffcc] px-2.5 py-0.5 rounded-full border border-[#00ffcc]/30 bg-[#00ffcc]/10 font-mono tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ffcc] animate-pulse" />
              Available
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};
