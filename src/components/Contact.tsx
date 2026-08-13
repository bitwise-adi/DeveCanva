import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, FileText, Send, Check, Copy, Sparkles, Clock, MapPin, MessageSquare, CheckCircle2, Briefcase, Zap, Globe } from 'lucide-react';
import { CONFIG } from '../data/config';

interface ContactProps {
  onOpenResume: () => void;
}

export const Contact: React.FC<ContactProps> = ({ onOpenResume }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'Full-Stack App',
    message: '',
  });

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const topics = ['Full-Stack App', 'ML & Automation', 'Freelance / Contract', 'Just Saying Hi'];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(CONFIG.personal.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const triggerMailtoFallback = () => {
    const subject = encodeURIComponent(`[Portfolio Inquiry] ${formData.topic}`);
    const body = encodeURIComponent(`Hi Aditya,\n\nName: ${formData.name}\nEmail: ${formData.email}\nTopic: ${formData.topic}\n\nMessage:\n${formData.message}`);
    window.location.href = `mailto:${CONFIG.personal.email}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${CONFIG.personal.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          topic: formData.topic,
          message: formData.message,
          _subject: `New Portfolio Message from ${formData.name}`,
        })
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        triggerMailtoFallback();
        setSubmitted(true);
      }
    } catch (err) {
      triggerMailtoFallback();
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative z-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-8 font-mono text-xs uppercase tracking-widest text-[#00ffcc]"
        >
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            <span>Get In Touch</span>
          </div>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-[#00ffcc]/30 to-transparent" />
        </motion.div>

        {/* Section Title & Subhead */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
            Let's Build Something <span className="bg-gradient-to-r from-[#00ffcc] to-[#8b5cf6] bg-clip-text text-transparent">Extraordinary</span>
          </h2>
          <p className="text-[#9a9ab0] text-sm sm:text-base max-w-2xl">
            Whether you have a full-stack web project, an AI/ML concept, or a full-time role, I'd love to chat.
          </p>
        </motion.div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Interactive Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 relative overflow-hidden"
          >
            {/* Ambient Corner Glow */}
            <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-[#8b5cf6]/10 rounded-full blur-3xl pointer-events-none" />

            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#00ffcc]/10 border border-[#00ffcc]/30 flex items-center justify-center mx-auto text-[#00ffcc]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white">Message Transmitted!</h3>
                <p className="text-sm text-[#9a9ab0] max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out, <span className="text-[#00ffcc] font-semibold">{formData.name}</span>. I'll get back to you as quickly as possible.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', topic: 'Full-Stack App', message: '' });
                  }}
                  className="mt-4 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-mono text-[#00ffcc] transition-colors"
                >
                  Send Another Message &rarr;
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Form Fields Row 1: Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-[#9a9ab0] mb-1.5">
                      Your Name <span className="text-[#00ffcc]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Connor"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:border-[#00ffcc]/50 focus:bg-white/[0.05] focus:outline-none transition-all placeholder:text-[#6a6a82]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#9a9ab0] mb-1.5">
                      Your Email <span className="text-[#00ffcc]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="sarah@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:border-[#00ffcc]/50 focus:bg-white/[0.05] focus:outline-none transition-all placeholder:text-[#6a6a82]"
                    />
                  </div>
                </div>

                {/* Topic Selector Pills */}
                <div>
                  <label className="block text-xs font-mono text-[#9a9ab0] mb-2">
                    Topic of Interest
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {topics.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setFormData({ ...formData, topic: t })}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer border ${
                          formData.topic === t
                            ? 'bg-[#00ffcc]/15 border-[#00ffcc]/40 text-[#00ffcc] shadow-sm'
                            : 'bg-white/[0.02] border-white/10 text-[#9a9ab0] hover:border-white/20 hover:text-white'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message Field */}
                <div>
                  <label className="block text-xs font-mono text-[#9a9ab0] mb-1.5">
                    Your Message <span className="text-[#00ffcc]">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell me about your project, timeline, or idea..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:border-[#00ffcc]/50 focus:bg-white/[0.05] focus:outline-none transition-all placeholder:text-[#6a6a82] resize-none"
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#00ffcc] to-[#8b5cf6] text-[#07070d] font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#00ffcc]/20 hover:shadow-[#00ffcc]/40 transition-shadow disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Preparing Message...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>

          {/* Right Column: Direct Info Sidebar & Quick Copy */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col justify-between gap-4"
          >
            {/* Quick Email Copy Card */}
            <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-white/10 flex-1 flex flex-col justify-between">
              <div>
                <div className="text-xs font-mono text-[#6a6a82] uppercase mb-2">Direct Email</div>
                <div className="flex items-center justify-between gap-2 p-3 rounded-xl bg-white/[0.03] border border-white/10">
                  <div className="flex items-center gap-2 font-mono text-xs text-white truncate">
                    <Mail className="w-4 h-4 text-[#00ffcc] shrink-0" />
                    <span className="truncate">{CONFIG.personal.email}</span>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="p-2 rounded-lg bg-white/10 hover:bg-[#00ffcc]/20 text-[#00ffcc] transition-colors shrink-0 flex items-center gap-1 text-xs font-mono"
                    title="Copy email to clipboard"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#00ffcc]" />
                        <span className="text-[#00ffcc]">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Location & Response Metadata */}
              <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-white/5 text-xs text-[#9a9ab0]">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#00ffcc]" />
                  <span>{CONFIG.personal.location}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#00ffcc]" />
                  <span>Replies in &lt; 24h</span>
                </div>
              </div>
            </div>

            {/* Social Action Grid */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={CONFIG.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl glass-panel border border-white/10 flex items-center gap-3 hover:border-[#00ffcc]/40 transition-colors group"
              >
                <div className="p-2 rounded-lg bg-white/5 group-hover:bg-[#00ffcc]/10 text-white group-hover:text-[#00ffcc] transition-colors">
                  <Linkedin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">LinkedIn</div>
                  <div className="text-[10px] text-[#6a6a82] font-mono">Connect</div>
                </div>
              </a>

              <a
                href={CONFIG.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl glass-panel border border-white/10 flex items-center gap-3 hover:border-[#00ffcc]/40 transition-colors group"
              >
                <div className="p-2 rounded-lg bg-white/5 group-hover:bg-[#00ffcc]/10 text-white group-hover:text-[#00ffcc] transition-colors">
                  <Github className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">GitHub</div>
                  <div className="text-[10px] text-[#6a6a82] font-mono">Code Repos</div>
                </div>
              </a>
            </div>

            {/* Work Availability & Collaboration Status Card */}
            <div className="glass-panel p-5 rounded-2xl border border-white/10 flex flex-col justify-between space-y-3 bg-gradient-to-br from-white/[0.04] to-transparent">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-[#00ffcc]" />
                  <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">Availability</span>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono text-[#00ffcc] bg-[#00ffcc]/10 border border-[#00ffcc]/30 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00ffcc] animate-pulse" />
                  Open for Work
                </span>
              </div>
              <p className="text-xs text-[#9a9ab0] leading-relaxed">
                Open for full-stack engineering roles, AI/ML systems, and freelance contracts.
              </p>
              <div className="flex items-center justify-between text-[11px] font-mono text-[#6a6a82] pt-2 border-t border-white/5">
                <div className="flex items-center gap-1 text-[#00ffcc]">
                  <Zap className="w-3.5 h-3.5" />
                  <span>Rapid Delivery</span>
                </div>
                <div className="flex items-center gap-1 text-slate-300">
                  <Globe className="w-3.5 h-3.5 text-[#8b5cf6]" />
                  <span>UTC+5:30 (IST)</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
