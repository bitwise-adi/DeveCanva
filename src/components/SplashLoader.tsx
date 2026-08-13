import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SplashLoaderProps {
  onFinish: () => void;
  durationMs?: number;
}

export const SplashLoader: React.FC<SplashLoaderProps> = ({ onFinish, durationMs = 1800 }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / durationMs) * 100));
      setProgress(pct);

      if (elapsed >= durationMs) {
        clearInterval(interval);
        setTimeout(onFinish, 150);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [durationMs, onFinish]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[100] bg-[#07070d] flex flex-col items-center justify-center p-4 font-mono select-none"
    >
      {/* Background ambient glow */}
      <div className="absolute w-96 h-96 bg-[#00ffcc]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute w-80 h-80 bg-[#8b5cf6]/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Center Box */}
      <div className="relative z-10 flex flex-col items-center gap-6 max-w-sm w-full text-center">
        {/* Monogram Favicon Icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative w-20 h-20 rounded-2xl bg-[#0e0e18] border border-[#00ffcc]/30 flex items-center justify-center shadow-[0_0_30px_rgba(0,255,204,0.2)] group"
        >
          <span className="text-3xl font-extrabold font-mono text-[#00ffcc] drop-shadow-[0_0_12px_rgba(0,255,204,0.6)]">
            &lt;/&gt;
          </span>
          <span className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#00ffcc]/30 to-[#8b5cf6]/30 blur-md opacity-50 animate-pulse" />
        </motion.div>

        {/* Brand Name */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="space-y-1"
        >
          <h1 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-[#00ffcc] bg-clip-text text-transparent">
            &lt;bitwise-adi /&gt;
          </h1>
          <p className="text-xs text-[#9a9ab0] font-medium tracking-wider uppercase">
            Aditya Raj • DevCanvas
          </p>
        </motion.div>

        {/* Progress Bar & Telemetry Status */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="w-full space-y-2 pt-2"
        >
          <div className="w-full h-1.5 bg-[#141422] rounded-full overflow-hidden border border-white/10 p-0.5">
            <div
              className="h-full bg-gradient-to-r from-[#8b5cf6] via-[#00ffcc] to-[#00ffcc] rounded-full transition-all duration-75 shadow-[0_0_10px_#00ffcc]"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-[#6a6a82]">
            <span className="flex items-center gap-1.5 text-[#00ffcc]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ffcc] animate-ping" />
              <span>SYSTEM_INIT // {progress < 100 ? 'Loading canvas...' : 'Ready'}</span>
            </span>
            <span className="font-bold text-[#a78bfa]">{progress}%</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
