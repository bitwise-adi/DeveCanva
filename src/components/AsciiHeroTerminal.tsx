import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal as TerminalIcon, Cpu, Activity, Sparkles, RefreshCw } from 'lucide-react';

const ASCII_AR = `
  █████╗ ██████╗ 
 ██╔══██╗██╔══██╗
 ███████║██████╔╝
 ██╔══██║██╔══██╗
 ██║  ██║██║  ██║
 ╚═╝  ╚═╝╚═╝  ╚═╝
`.trim();

const ASCII_ADI = `
  █████╗ ██████╗ ██╗
 ██╔══██╗██╔══██╗██║
 ███████║██║  ██║██║
 ██╔══██║██║  ██║██║
 ██║  ██║██████╔╝██║
 ╚═╝  ╚═╝╚═════╝ ╚═╝
`.trim();

const SYSTEM_LOGS = [
  "INITIALIZING: bitwise-adi.sys v2.4",
  "IDENTITY: Aditya Raj [AR]",
  "CORE_LOAD: 0.04ms | MEM: 64MB",
  "SECURITY: RSA-4096 / TLS_v1.3",
  "STACK: TypeScript + React + Vite",
  "DEEP_LEARNING: ML Threat Engine Ready",
  "VELOCITY: Maximum AI-Assisted Output",
  "STATUS: All systems nominal (200 OK)"
];

export const AsciiHeroTerminal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ascii' | 'telemetry' | 'matrix'>('ascii');
  const [artType, setArtType] = useState<'AR' | 'ADI'>('AR');
  const [matrixText, setMatrixText] = useState<string[]>([]);
  const [glitchText, setGlitchText] = useState<string>(ASCII_AR);
  const [activeLogIndex, setActiveLogIndex] = useState<number>(0);

  // Matrix stream simulation effect
  useEffect(() => {
    const chars = '01ABCDEFXYZ$%#@!&*[]{}<>';
    const interval = setInterval(() => {
      const line = Array.from({ length: 28 })
        .map(() => chars[Math.floor(Math.random() * chars.length)])
        .join('');
      setMatrixText((prev) => [line, ...prev.slice(0, 7)]);
    }, 120);

    return () => clearInterval(interval);
  }, []);

  // System logs rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLogIndex((prev) => (prev + 1) % SYSTEM_LOGS.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  // Glitch effect on hover or mode change
  const triggerGlitch = () => {
    const baseArt = artType === 'AR' ? ASCII_AR : ASCII_ADI;
    const glitchChars = '#@$%&*!?/\\';
    let count = 0;
    const timer = setInterval(() => {
      count++;
      if (count > 5) {
        setGlitchText(baseArt);
        clearInterval(timer);
      } else {
        const glitched = baseArt
          .split('')
          .map((ch) => (ch !== ' ' && ch !== '\n' && Math.random() > 0.7 ? glitchChars[Math.floor(Math.random() * glitchChars.length)] : ch))
          .join('');
        setGlitchText(glitched);
      }
    }, 60);
  };

  useEffect(() => {
    setGlitchText(artType === 'AR' ? ASCII_AR : ASCII_ADI);
  }, [artType]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2 }}
      className="w-full max-w-lg mx-auto relative rounded-2xl overflow-hidden glass-panel border border-white/10 shadow-2xl shadow-[#8b5cf6]/10 group"
      onMouseEnter={triggerGlitch}
    >
      {/* Glow border overlay */}
      <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-[#00ffcc]/20 via-[#8b5cf6]/30 to-[#3b82f6]/20 opacity-40 group-hover:opacity-80 transition-opacity blur-sm pointer-events-none" />

      {/* Terminal Top Window Bar */}
      <div className="relative z-10 flex items-center justify-between px-4 py-3 bg-[#0d0d16]/90 border-b border-white/10 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block shadow-sm" />
          <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block shadow-sm" />
          <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block shadow-sm" />
          <span className="font-mono text-xs text-[#9a9ab0] ml-2 flex items-center gap-1.5">
            <TerminalIcon className="w-3.5 h-3.5 text-[#00ffcc]" />
            aditya-raj@dev: ~/initials/AR
          </span>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1 bg-[#141422] p-1 rounded-lg border border-white/5 text-[11px] font-mono">
          <button
            onClick={() => setActiveTab('ascii')}
            className={`px-2 py-0.5 rounded transition-colors ${
              activeTab === 'ascii' ? 'bg-[#8b5cf6]/30 text-[#00ffcc] font-semibold' : 'text-[#8888a0] hover:text-white'
            }`}
          >
            ASCII
          </button>
          <button
            onClick={() => setActiveTab('matrix')}
            className={`px-2 py-0.5 rounded transition-colors ${
              activeTab === 'matrix' ? 'bg-[#8b5cf6]/30 text-[#00ffcc] font-semibold' : 'text-[#8888a0] hover:text-white'
            }`}
          >
            MATRIX
          </button>
          <button
            onClick={() => setActiveTab('telemetry')}
            className={`px-2 py-0.5 rounded transition-colors ${
              activeTab === 'telemetry' ? 'bg-[#8b5cf6]/30 text-[#00ffcc] font-semibold' : 'text-[#8888a0] hover:text-white'
            }`}
          >
            SYS
          </button>
        </div>
      </div>

      {/* Terminal Main Canvas Body */}
      <div className="relative z-10 p-5 bg-[#090911]/95 font-mono text-xs text-slate-300 min-h-[260px] flex flex-col justify-between overflow-hidden">
        {/* CRT Scanline overlay effect */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none opacity-40 z-20" />

        {activeTab === 'ascii' && (
          <div className="flex-1 flex flex-col justify-between">
            {/* Header sub-info */}
            <div className="flex justify-between items-center text-[11px] text-[#6a6a82] border-b border-white/5 pb-2 mb-3">
              <span className="flex items-center gap-1 text-[#00ffcc]">
                <Activity className="w-3 h-3 animate-pulse" /> ASCII_INITIALS_AR
              </span>
              <button
                onClick={() => setArtType((prev) => (prev === 'AR' ? 'ADI' : 'AR'))}
                className="flex items-center gap-1 hover:text-white transition-colors"
                title="Toggle Initials View"
              >
                <RefreshCw className="w-3 h-3" /> [{artType}]
              </button>
            </div>

            {/* Glowing ASCII Art Banner */}
            <div className="my-auto py-2 text-center overflow-x-auto select-none">
              <pre className="inline-block text-[#00ffcc] drop-shadow-[0_0_12px_rgba(0,255,204,0.4)] font-bold leading-none text-[12px] sm:text-sm tracking-widest transition-all duration-150">
                {glitchText}
              </pre>
            </div>

            {/* Footer Terminal Command Output */}
            <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-2 text-[#9a9ab0] truncate">
                <span className="text-[#8b5cf6] font-bold">&gt;</span>
                <span className="text-emerald-400 font-semibold">{SYSTEM_LOGS[activeLogIndex]}</span>
              </div>
              <span className="w-2 h-4 bg-[#00ffcc] animate-pulse inline-block flex-shrink-0" />
            </div>
          </div>
        )}

        {activeTab === 'matrix' && (
          <div className="flex-1 flex flex-col justify-between">
            <div className="flex justify-between items-center text-[11px] text-[#6a6a82] border-b border-white/5 pb-2 mb-2">
              <span className="flex items-center gap-1 text-[#8b5cf6]">
                <Sparkles className="w-3 h-3 animate-spin-slow" /> MATRIX_CODE_STREAM
              </span>
              <span className="text-emerald-400">RATE: 120ms</span>
            </div>

            <div className="font-mono text-[11px] space-y-1 my-2 overflow-hidden">
              {matrixText.map((line, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <span className={idx === 0 ? 'text-[#00ffcc] font-bold' : idx < 3 ? 'text-purple-300' : 'text-slate-600'}>
                    0x00{idx * 16}: {line}
                  </span>
                  <span className="text-[10px] text-slate-600 font-mono">[{line.slice(0, 4)}]</span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-white/5 text-[10px] text-slate-500 flex justify-between">
              <span>STREAMING HIGH VELOCITY DATA...</span>
              <span className="text-[#00ffcc]">ONLINE</span>
            </div>
          </div>
        )}

        {activeTab === 'telemetry' && (
          <div className="flex-1 flex flex-col justify-between">
            <div className="flex justify-between items-center text-[11px] text-[#6a6a82] border-b border-white/5 pb-2 mb-3">
              <span className="flex items-center gap-1 text-[#3b82f6]">
                <Cpu className="w-3 h-3" /> SYSTEM_TELEMETRY
              </span>
              <span className="text-[#00ffcc]">STATUS: OPTIMAL</span>
            </div>

            <div className="space-y-2.5 my-1">
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-slate-400">AI-Workflow Acceleration</span>
                  <span className="text-[#00ffcc]">99.8%</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#8b5cf6] to-[#00ffcc] w-[99.8%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-slate-400">Deployment Velocity</span>
                  <span className="text-purple-400">High Speed</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] w-[92%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-slate-400">Architecture Discipline</span>
                  <span className="text-emerald-400">Clean / Modular</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-400 w-[96%]" />
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-white/5 text-[11px] text-[#9a9ab0] flex justify-between items-center">
              <span>HOST: bitwise-adi.dev</span>
              <span className="text-[#8b5cf6] font-semibold">4th Year ISE @ NIE</span>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};
