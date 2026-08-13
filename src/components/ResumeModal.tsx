import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download } from 'lucide-react';
import { CONFIG } from '../data/config';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-4xl h-[85vh] bg-[#0e0e18] border border-white/10 rounded-2xl overflow-hidden flex flex-col shadow-2xl"
          >
            {/* Modal Header */}
            <div className="px-6 py-4 bg-[#141422] border-b border-white/10 flex items-center justify-between">
              <span className="font-mono text-xs text-[#9a9ab0]">
                Resume — {CONFIG.personal.name}
              </span>
              <div className="flex items-center gap-2">
                <a
                  href={CONFIG.personal.resumePath}
                  download="Aditya_Raj_Resume.pdf"
                  title="Download PDF"
                  className="p-2 rounded-lg border border-white/10 text-[#9a9ab0] hover:text-[#00ffcc] hover:border-[#00ffcc]/40 transition-colors"
                >
                  <Download className="w-4 h-4" />
                </a>
                <button
                  onClick={onClose}
                  aria-label="Close modal"
                  className="p-2 rounded-lg border border-white/10 text-[#9a9ab0] hover:text-white hover:border-white/30 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* iframe PDF Embed */}
            <iframe
              src={CONFIG.personal.resumePath}
              title="Resume PDF"
              className="w-full flex-1 bg-white border-none"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
