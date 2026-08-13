import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trash2, CornerDownLeft, Terminal as TerminalIcon } from 'lucide-react';
import { CONFIG } from '../data/config';

interface TerminalProps {
  onOpenResume: () => void;
}

interface OutputLine {
  id: number;
  content: React.ReactNode;
}

const QUICK_COMMANDS = [
  { label: 'help', cmd: 'help' },
  { label: 'bio', cmd: 'whoami' },
  { label: 'skills', cmd: 'skills' },
  { label: 'projects', cmd: 'projects' },
  { label: 'sudo hire', cmd: 'sudo hire-me' },
  { label: 'clear', cmd: 'clear' },
];

const INITIAL_WELCOME: OutputLine[] = [
  {
    id: 1,
    content: (
      <div className="text-[#a78bfa] italic font-mono text-xs sm:text-sm py-1">
        Welcome to bitwise-adi interactive CLI v2.4. Type "help" to list commands.
      </div>
    ),
  },
];

export const Terminal: React.FC<TerminalProps> = ({ onOpenResume }) => {
  const [inputVal, setInputVal] = useState<string>('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number>(-1);
  const [outputs, setOutputs] = useState<OutputLine[]>(INITIAL_WELCOME);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const lineIdCounter = useRef<number>(10);

  const addLine = (content: React.ReactNode) => {
    lineIdCounter.current += 1;
    setOutputs((prev) => [...prev, { id: lineIdCounter.current, content }]);
  };

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [outputs]);

  const handleCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    setHistory((prev) => [trimmed, ...prev]);
    setHistoryIdx(-1);

    // Echo input line
    addLine(
      <div className="flex items-center gap-2 font-mono text-xs sm:text-sm">
        <span className="text-[#a78bfa] font-bold">bitwise-adi@dev:~$</span>
        <span className="text-white font-semibold">{trimmed}</span>
      </div>
    );

    const parts = trimmed.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1).join(' ');

    switch (cmd) {
      case 'help':
        addLine(
          <div className="space-y-1.5 py-1 font-mono text-xs">
            <div className="text-[#00ffcc] font-bold">Available commands:</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-slate-300 pl-2">
              <div><span className="text-[#00ffcc] font-bold">help</span> — Show command menu</div>
              <div><span className="text-[#00ffcc] font-bold">whoami</span> — Developer biography</div>
              <div><span className="text-[#00ffcc] font-bold">projects</span> — List featured projects</div>
              <div><span className="text-[#00ffcc] font-bold">skills</span> — View engineering stack</div>
              <div><span className="text-[#00ffcc] font-bold">socials</span> — GitHub, LinkedIn, Email</div>
              <div><span className="text-[#00ffcc] font-bold">contact</span> — Reach out directly</div>
              <div><span className="text-[#00ffcc] font-bold">resume</span> — Open PDF resume</div>
              <div><span className="text-[#00ffcc] font-bold">github</span> — Jump to GitHub profile</div>
              <div><span className="text-[#00ffcc] font-bold">neofetch</span> — System & build info</div>
              <div><span className="text-[#00ffcc] font-bold">clear</span> — Clear terminal output</div>
              <div><span className="text-[#00ffcc] font-bold">sudo hire-me</span> — Unlock availability 🚀</div>
            </div>
          </div>
        );
        break;

      case 'whoami':
      case 'bio':
        addLine(
          <div className="py-1 space-y-1 font-mono text-xs">
            <div className="text-[#00ffcc] font-bold">{CONFIG.personal.name} <span className="text-[#6a6a82] font-normal">(@{CONFIG.personal.handle})</span></div>
            <div className="text-slate-300">{CONFIG.personal.bio}</div>
            <div className="text-[#9a9ab0]">📍 {CONFIG.personal.location}</div>
            <div className="text-[#9a9ab0]">🎓 {CONFIG.personal.education}</div>
          </div>
        );
        break;

      case 'projects':
        addLine(
          <div className="py-1 space-y-2 font-mono text-xs">
            <div className="text-[#00ffcc] font-bold">Featured Projects:</div>
            {CONFIG.projects.map((p, i) => (
              <div key={p.id} className="pl-2 border-l border-white/10">
                <span className="text-[#00ffcc] font-bold">{i + 1}. {p.name}</span> <span className="text-[#a78bfa]">[{p.category}]</span>
                <div className="text-slate-300">{p.description}</div>
                <div className="text-[#6a6a82]">Stack: {p.tech.join(', ')}</div>
              </div>
            ))}
          </div>
        );
        break;

      case 'skills':
        addLine(
          <div className="py-1 space-y-1.5 font-mono text-xs">
            {Object.entries(CONFIG.skills).map(([cat, skills]) => (
              <div key={cat} className="pl-2">
                <span className="text-[#00ffcc] font-bold">{cat}: </span>
                <span className="text-slate-300">{skills.join(' • ')}</span>
              </div>
            ))}
          </div>
        );
        break;

      case 'socials':
        addLine(
          <div className="py-1 space-y-1 font-mono text-xs pl-2">
            {CONFIG.social.map((s) => (
              <div key={s.name}>
                <span className="text-[#00ffcc]">●</span> {s.name}: <span className="text-[#a78bfa]">{s.url}</span>
              </div>
            ))}
          </div>
        );
        break;

      case 'contact':
        addLine(
          <div className="py-1 space-y-1 font-mono text-xs pl-2">
            <div className="text-[#00ffcc] font-bold">Contact Info:</div>
            <div>✉ Email: {CONFIG.personal.email}</div>
            <div>● LinkedIn: {CONFIG.personal.linkedin}</div>
            <div>● GitHub: {CONFIG.personal.github}</div>
          </div>
        );
        break;

      case 'resume':
        addLine(<span className="text-[#00ffcc]">Opening resume modal...</span>);
        onOpenResume();
        break;

      case 'github':
        addLine(<span className="text-[#00ffcc]">Opening GitHub profile...</span>);
        window.open(CONFIG.personal.github, '_blank', 'noopener');
        break;

      case 'neofetch':
        addLine(
          <div className="py-1 font-mono text-xs text-[#00ffcc] whitespace-pre">
{`       ╱╲      ${CONFIG.personal.handle}@bitwise-adi.dev
      ╱  ╲     ──────────────────────────────
     ╱    ╲    OS: Web Browser (React + Framer Motion)
    ╱──────╲   Host: DevCanvas
    ╲      ╱   Uptime: High Velocity
     ╲    ╱    Packages: ${CONFIG.projects.length} featured projects
      ╲  ╱     Shell: Bash (React CLI v2.4)
       ╲╱      Lang: TS, JS, Python, React`}
          </div>
        );
        break;

      case 'clear':
        setOutputs([]);
        break;

      case 'sudo':
        if (args === 'hire-me' || args === 'hire') {
          addLine(
            <div className="py-1 space-y-1 font-mono text-xs pl-3 border-l-2 border-[#00ffcc]">
              <div className="text-[#00ffcc] font-bold">🚀 sudo: hire-me initiated</div>
              <div>Status: <span className="text-[#00ffcc] font-bold">AVAILABLE FOR OPPORTUNITIES</span></div>
              <div>Core Focus: Building high-impact web apps & security tools</div>
              <div>Contact: <span className="text-[#00ffcc]">{CONFIG.personal.email}</span></div>
            </div>
          );
        } else {
          addLine(<span className="text-[#f43f5e]">sudo: unknown command '{args}'</span>);
        }
        break;

      default:
        addLine(
          <span className="text-[#f43f5e]">
            command not found: {cmd}. Type 'help' for available commands.
          </span>
        );
        break;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
      setInputVal('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIdx < history.length - 1) {
        const nextIdx = historyIdx + 1;
        setHistoryIdx(nextIdx);
        setInputVal(history[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx > 0) {
        const nextIdx = historyIdx - 1;
        setHistoryIdx(nextIdx);
        setInputVal(history[nextIdx]);
      } else {
        setHistoryIdx(-1);
        setInputVal('');
      }
    }
  };

  return (
    <section id="terminal-section" className="py-24 relative z-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Section Label (Restored Original Style) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-12 font-mono text-xs uppercase tracking-widest text-[#00ffcc]"
        >
          <span>Terminal</span>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-[#00ffcc]/30 to-transparent" />
        </motion.div>

        {/* Main Terminal Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-[#090b15]/95 rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-purple-950/20 backdrop-blur-xl"
        >
          {/* Top Window Title Bar */}
          <div className="bg-[#0d0f1d] px-4 sm:px-6 py-3 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#ff5f57] inline-block shadow-sm" />
              <span className="w-3 h-3 rounded-full bg-[#febc2e] inline-block shadow-sm" />
              <span className="w-3 h-3 rounded-full bg-[#28c840] inline-block shadow-sm" />
              <span className="font-mono text-xs text-[#9a9ab0] ml-3 flex items-center gap-1.5">
                <TerminalIcon className="w-3.5 h-3.5 text-[#00ffcc]" />
                bash — bitwise-adi@portfolio:~
              </span>
            </div>

            {/* Clear Output Trash Button */}
            <button
              onClick={() => setOutputs([])}
              title="Clear terminal output"
              className="text-[#8888a0] hover:text-[#f43f5e] transition-colors p-1.5 rounded-lg hover:bg-white/5"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Commands Buttons Row */}
          <div className="bg-[#0e1022]/80 px-4 sm:px-6 py-2.5 border-b border-white/5 flex flex-wrap items-center gap-2 text-xs font-mono">
            <span className="text-[#6a6a82] mr-1">Quick commands:</span>
            {QUICK_COMMANDS.map((item) => (
              <button
                key={item.label}
                onClick={() => handleCommand(item.cmd)}
                className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300 hover:text-[#00ffcc] hover:border-[#00ffcc]/40 hover:bg-[#8b5cf6]/20 transition-all font-mono text-xs cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Terminal Output Area */}
          <div
            ref={bodyRef}
            onClick={() => inputRef.current?.focus()}
            className="p-4 sm:p-6 font-mono text-xs sm:text-sm text-[#c9d1d9] min-h-[220px] max-h-[380px] overflow-y-auto space-y-2.5 cursor-text"
          >
            {outputs.map((out) => (
              <div key={out.id}>{out.content}</div>
            ))}
          </div>

          {/* Terminal Input Bar */}
          <div
            onClick={() => inputRef.current?.focus()}
            className="flex items-center gap-2.5 px-4 sm:px-6 py-3 border-t border-white/10 bg-[#070811] cursor-text"
          >
            <span className="text-[#a78bfa] font-bold font-mono text-xs sm:text-sm flex-shrink-0">
              bitwise-adi@dev:~$
            </span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder='Type a command (e.g. "help", "projects", "sudo hire")...'
              className="flex-1 bg-transparent text-white outline-none border-none font-mono text-xs sm:text-sm placeholder:text-[#52526c]"
              autoComplete="off"
              spellCheck="false"
            />
            <CornerDownLeft className="w-4 h-4 text-[#52526c] flex-shrink-0" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
