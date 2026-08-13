import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Folder, User, Cpu, GraduationCap, Terminal as TerminalIcon, Mail, Command, Menu, X } from 'lucide-react';
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

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
    setMobileMenuOpen(false);
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
        scrolled || currentView !== 'home' || mobileMenuOpen
          ? 'bg-[#07070d]/95 backdrop-blur-xl border-white/10 shadow-xl shadow-black/40'
          : 'bg-[#07070d]/60 backdrop-blur-md border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Left Side: Prominent Brand Tag */}
        <button
          onClick={() => {
            setMobileMenuOpen(false);
            onNavigateHome();
          }}
          className="font-mono text-lg sm:text-2xl font-extrabold text-[#00ffcc] tracking-tight hover:drop-shadow-[0_0_16px_rgba(0,255,204,0.7)] transition-all flex items-center gap-1 cursor-pointer bg-transparent border-none p-0 shrink-0"
        >
          <span>&lt;bitwise-adi /&gt;</span>
        </button>

        {/* Right Side: Navigation Links & Actions */}
        <div className="flex items-center gap-2 sm:gap-6">
          {/* Section Navigation Links (Desktop) */}
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
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-mono font-medium text-[#9a9ab0] hover:text-[#00ffcc] border border-white/10 glass-panel hover:border-[#00ffcc]/40 transition-all shadow-sm cursor-pointer"
            >
              <Command className="w-3.5 h-3.5 text-[#00ffcc]" />
              <span className="hidden sm:inline text-[11px] font-semibold text-white">⌘K</span>
            </motion.button>

            {/* Resume Trigger */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={onOpenResume}
              className="flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium text-slate-200 border border-white/10 glass-panel hover:border-[#00ffcc]/40 hover:text-[#00ffcc] transition-all shadow-sm"
            >
              <FileText className="w-3.5 h-3.5 text-[#00ffcc]" />
              <span className="hidden sm:inline">Resume</span>
            </motion.button>

            {/* Availability indicator */}
            <div className="hidden lg:flex items-center gap-1.5 text-[10px] font-semibold text-[#00ffcc] px-2.5 py-0.5 rounded-full border border-[#00ffcc]/30 bg-[#00ffcc]/10 font-mono tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ffcc] animate-pulse" />
              Available
            </div>

            {/* Mobile / Tablet Hamburger Toggle Button */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl border border-white/10 bg-white/5 text-[#00ffcc] hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile / Tablet Dropdown Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden border-t border-white/10 bg-[#090a14]/98 backdrop-blur-2xl overflow-hidden shadow-2xl"
          >
            <div className="px-4 py-5 space-y-3 font-mono">
              <div className="text-[10px] uppercase tracking-widest text-[#6a6a82] font-semibold px-2 mb-1">
                Navigation Menu
              </div>

              <div className="grid grid-cols-2 gap-2">
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
                      className={`flex items-center gap-2.5 p-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all border ${
                        isActive
                          ? 'bg-[#8b5cf6]/20 border-[#8b5cf6]/50 text-[#00ffcc] shadow-md'
                          : 'bg-white/[0.03] border-white/5 text-[#9a9ab0] hover:text-white hover:border-white/15'
                      }`}
                    >
                      <span className="text-[#00ffcc]">{navIcons[link.icon]}</span>
                      <span>{link.name}</span>
                    </a>
                  );
                })}
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-3 text-xs">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenResume();
                  }}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-[#00ffcc]/30 bg-[#00ffcc]/10 text-[#00ffcc] font-semibold transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  <span>View Resume</span>
                </button>
                <div className="flex items-center gap-1.5 text-[10px] font-semibold text-[#00ffcc] px-3 py-2.5 rounded-xl border border-[#00ffcc]/20 bg-black/40 font-mono">
                  <span className="w-2 h-2 rounded-full bg-[#00ffcc] animate-pulse" />
                  Available for Hire
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

