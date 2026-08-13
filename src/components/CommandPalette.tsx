import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command, X, FolderGit2, Sparkles, FileText, ArrowRight, CornerDownLeft, Terminal as TerminalIcon } from 'lucide-react';
import { CONFIG } from '../data/config';

interface CommandItem {
  id: string;
  title: string;
  category: 'Navigation' | 'Case Studies' | 'Actions' | 'Socials';
  subtitle?: string;
  action: () => void;
  icon?: React.ReactNode;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume: () => void;
  onSelectCaseStudy: (id: string) => void;
  onNavigateHome?: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onOpenResume,
  onSelectCaseStudy,
  onNavigateHome,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const scrollToSection = (id: string) => {
    onClose();
    if (onNavigateHome) {
      onNavigateHome();
    } else if (window.location.hash !== '') {
      window.location.hash = '';
    }
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 120);
  };

  const commandItems: CommandItem[] = [
    // Navigation
    {
      id: 'nav-about',
      title: 'About Me',
      category: 'Navigation',
      subtitle: 'Bio, location & engineering focus',
      action: () => scrollToSection('about'),
      icon: <Sparkles className="w-4 h-4 text-[#00ffcc]" />,
    },
    {
      id: 'nav-projects',
      title: 'Featured Projects Bento',
      category: 'Navigation',
      subtitle: 'Spotlight project grid',
      action: () => scrollToSection('projects'),
      icon: <FolderGit2 className="w-4 h-4 text-[#00ffcc]" />,
    },
    {
      id: 'nav-skills',
      title: 'Skills & Proof Matrix',
      category: 'Navigation',
      subtitle: 'Battle-tested tech & project proofs',
      action: () => scrollToSection('skills'),
      icon: <Command className="w-4 h-4 text-[#00ffcc]" />,
    },
    {
      id: 'nav-timeline',
      title: 'Timeline & Journey',
      category: 'Navigation',
      subtitle: 'NIE Mysuru ISE degree & milestones',
      action: () => scrollToSection('timeline'),
      icon: <Sparkles className="w-4 h-4 text-[#00ffcc]" />,
    },
    {
      id: 'nav-terminal',
      title: 'CLI Interactive Terminal',
      category: 'Navigation',
      subtitle: 'Interactive developer shell',
      action: () => scrollToSection('terminal-section'),
      icon: <TerminalIcon className="w-4 h-4 text-[#00ffcc]" />,
    },
    {
      id: 'nav-contact',
      title: 'Contact & Inquiry Form',
      category: 'Navigation',
      subtitle: 'Send a direct message or copy email',
      action: () => scrollToSection('contact'),
      icon: <Sparkles className="w-4 h-4 text-[#00ffcc]" />,
    },

    // Case Studies
    ...CONFIG.projects.map((p) => ({
      id: `case-${p.id}`,
      title: `${p.name} Case Study`,
      category: 'Case Studies' as const,
      subtitle: p.subtitle || p.description.slice(0, 50) + '...',
      action: () => {
        onClose();
        onSelectCaseStudy(p.id);
      },
      icon: <FolderGit2 className="w-4 h-4 text-[#a78bfa]" />,
    })),

    // Actions
    {
      id: 'act-resume',
      title: 'View Resume (CV)',
      category: 'Actions',
      subtitle: 'Interactive HTML modal & PDF download',
      action: () => {
        onClose();
        onOpenResume();
      },
      icon: <FileText className="w-4 h-4 text-[#00ffcc]" />,
    },

    // Socials
    {
      id: 'soc-github',
      title: 'GitHub Profile',
      category: 'Socials',
      subtitle: 'github.com/bitwise-adi',
      action: () => {
        onClose();
        window.open(CONFIG.personal.github, '_blank', 'noopener');
      },
    },
    {
      id: 'soc-linkedin',
      title: 'LinkedIn Profile',
      category: 'Socials',
      subtitle: 'linkedin.com/in/bitwise-adi',
      action: () => {
        onClose();
        window.open(CONFIG.personal.linkedin, '_blank', 'noopener');
      },
    },
  ];

  const filteredItems = commandItems.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase()) ||
      (item.subtitle && item.subtitle.toLowerCase().includes(query.toLowerCase()))
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Auto-scroll selected item into view when navigating with Arrow keys
  useEffect(() => {
    if (itemRefs.current[selectedIndex]) {
      itemRefs.current[selectedIndex]?.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth',
      });
    }
  }, [selectedIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSelect = (index: number) => {
    if (filteredItems[index]) {
      filteredItems[index].action();
    }
  };

  const handleKeyDownInInput = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      handleSelect(selectedIndex);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-start justify-center pt-20 px-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        />

        {/* Command Modal Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className="relative w-full max-w-xl glass-panel rounded-2xl border border-white/15 bg-[#0e0e18]/95 shadow-2xl overflow-hidden z-10"
        >
          {/* Input Header */}
          <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10">
            <Search className="w-5 h-5 text-[#00ffcc] shrink-0" />
            <input
              type="text"
              autoFocus
              placeholder="Type a command or search sections... (e.g. LocoMe, Skills, Resume)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDownInInput}
              className="w-full bg-transparent text-white text-sm focus:outline-none placeholder:text-[#6a6a82]"
            />
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-[#6a6a82] hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Results List */}
          <div className="max-h-80 overflow-y-auto p-2 space-y-1">
            {filteredItems.length === 0 ? (
              <div className="py-8 text-center text-xs text-[#6a6a82]">
                No matching commands found.
              </div>
            ) : (
              filteredItems.map((item, idx) => {
                const isSelected = idx === selectedIndex;
                return (
                  <div
                    key={item.id}
                    ref={(el) => (itemRefs.current[idx] = el)}
                    onClick={() => handleSelect(idx)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`px-3.5 py-2.5 rounded-xl flex items-center justify-between cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-[#00ffcc]/15 border border-[#00ffcc]/30 text-white'
                        : 'hover:bg-white/[0.04] text-[#9a9ab0]'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {item.icon || <Command className="w-4 h-4 text-[#6a6a82]" />}
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-white flex items-center gap-2">
                          <span>{item.title}</span>
                          <span className="text-[9px] font-mono text-[#6a6a82] bg-white/[0.04] px-1.5 py-0.5 rounded border border-white/5 uppercase">
                            {item.category}
                          </span>
                        </div>
                        {item.subtitle && (
                          <div className="text-[11px] text-[#6a6a82] truncate mt-0.5">
                            {item.subtitle}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center gap-1 text-xs font-mono text-[#00ffcc]">
                      {isSelected && <CornerDownLeft className="w-3.5 h-3.5" />}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Modal Footer Controls */}
          <div className="px-4 py-2.5 bg-black/40 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-[#6a6a82]">
            <div className="flex items-center gap-3">
              <span><kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[#00ffcc] text-[10px]">↑↓</kbd> navigate</span>
              <span><kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[#00ffcc] text-[10px]">↵</kbd> select</span>
              <span><kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[#00ffcc] text-[10px]">ESC</kbd> close</span>
            </div>
            <div className="text-[#00ffcc]">
              ⌘K / Ctrl+K
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
