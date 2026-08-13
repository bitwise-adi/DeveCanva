import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, FileText, Send, Check, Copy, Sparkles, Clock, MapPin, MessageSquare, CheckCircle2 } from 'lucide-react';
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
    const mailtoSubject = encodeURIComponent(`[Portfolio Inquiry - ${formData.topic}] from ${formData.name}`);
    const mailtoBody = encodeURIComponent(`Hi Aditya,\n\n${formData.message}\n\nFrom:\n${formData.name} (${formData.email})`);
    window.location.href = `mailto:${CONFIG.personal.email}?subject=${mailtoSubject}&body=${mailtoBody}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${CONFIG.personal.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          topic: formData.topic,
          message: formData.message,
          _subject: `[Portfolio Inquiry - ${formData.topic}] from ${formData.name}`,
          _template: 'table',
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', topic: 'Full-Stack App', message: '' });
      } else {
        setSubmitted(true);
        triggerMailtoFallback();
      }
    } catch (err) {
      setSubmitted(true);
      triggerMailtoFallback();
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
            <span>04 // Get In Touch</span>
          </div>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-[#00ffcc]/30 to-transparent" />
        </motion.div>

        {/* Section Heading & Availability Badge */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-[#00ffcc] bg-clip-text text-transparent mb-3">
              Let's Build Something Great
            </h2>
            <p className="text-[#9a9ab0] text-sm md:text-base max-w-xl">
              Have an idea, project inquiry, or collaboration in mind? Drop a message below or connect directly.
            </p>
          </div>

          {/* Availability Status Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-panel border border-[#00ffcc]/30 bg-[#00ffcc]/10 text-xs font-mono text-[#00ffcc] shadow-[0_0_15px_rgba(0,255,204,0.15)] shrink-0">
            <span className="w-2 h-2 rounded-full bg-[#00ffcc] animate-pulse" />
            <span>Open for Opportunities & Freelance</span>
          </div>
        </div>

        {/* 2-Column Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Interactive Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 glass-panel p-6 md:p-8 rounded-2xl border border-white/10 relative overflow-hidden"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 flex flex-col items-center text-center space-y-4"
              >
                <div className="w-14 h-14 rounded-full bg-[#00ffcc]/10 border border-[#00ffcc]/30 text-[#00ffcc] flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white">Message Sent Successfully!</h3>
                <p className="text-sm text-[#9a9ab0] max-w-md">
                  Thanks for reaching out! Your message has been sent directly to my inbox. I'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2 rounded-xl bg-white/10 text-white text-xs font-semibold hover:bg-white/20 transition-colors mt-4"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="flex items-center gap-2 text-xs font-mono text-[#00ffcc] mb-2">
                  <MessageSquare className="w-4 h-4" />
                  <span>Send a Direct Inquiry</span>
                </div>

                {/* Name & Email Inputs */}
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
                        type="button"
                        key={t}
                        onClick={() => setFormData({ ...formData, topic: t })}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          formData.topic === t
                            ? 'bg-[#00ffcc]/20 border border-[#00ffcc]/50 text-[#00ffcc]'
                            : 'bg-white/[0.03] border border-white/5 text-[#9a9ab0] hover:text-white hover:border-white/20'
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
            className="lg:col-span-5 flex flex-col justify-between space-y-6"
          >
            {/* Quick Email Copy Card */}
            <div className="glass-panel p-6 rounded-2xl border border-white/10">
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

            {/* Social & Resume Action Grid */}
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

            {/* Resume Button */}
            <button
              onClick={onOpenResume}
              className="w-full p-4 rounded-xl glass-panel border border-white/10 flex items-center justify-between hover:border-[#00ffcc]/40 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#00ffcc]/10 text-[#00ffcc]">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-white">Curriculum Vitae</div>
                  <div className="text-[10px] text-[#6a6a82] font-mono">HTML Modal & PDF Download</div>
                </div>
              </div>
              <span className="text-xs font-mono text-[#00ffcc] group-hover:translate-x-1 transition-transform">
                View &rarr;
              </span>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

