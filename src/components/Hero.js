"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowDown, FileText } from "lucide-react";
import { GithubIcon } from "@/components/Icons";
import siteConfig from "@/data/siteConfig";

/**
 * Text scramble effect — decodes random characters into the target string.
 * Lightweight: pure JS, no library.
 */
function useTextScramble(text, delay = 0) {
  const [displayed, setDisplayed] = useState("");
  const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?0123456789";
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const timeout = setTimeout(() => {
      let iteration = 0;
      const interval = setInterval(() => {
        setDisplayed(
          text
            .split("")
            .map((char, index) => {
              if (char === " ") return " ";
              if (index < iteration) return text[index];
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("")
        );
        iteration += 1 / 2;
        if (iteration >= text.length) {
          setDisplayed(text);
          clearInterval(interval);
        }
      }, 30);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, delay]);

  return displayed;
}

/**
 * Rotating tagline — cycles through taglines from config
 */
function useRotatingTagline(taglines, interval = 3000) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % taglines.length);
        setVisible(true);
      }, 300);
    }, interval);

    return () => clearInterval(timer);
  }, [taglines, interval]);

  return { text: taglines[index], visible };
}

export default function Hero() {
  const scrambledName = useTextScramble(siteConfig.name, 300);
  const tagline = useRotatingTagline(siteConfig.taglines, 3500);

  return (
    <section className="hero" id="hero">
      <div className="hero__glow" />

      <div className="hero__content">
        <motion.p
          className="hero__greeting"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {siteConfig.greeting}
        </motion.p>

        <motion.h1
          className="hero__name"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {scrambledName}
        </motion.h1>

        <motion.div
          className="hero__tagline"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <span
            className="hero__tagline-text"
            style={{
              opacity: tagline.visible ? 1 : 0,
              transition: "opacity 0.3s ease",
            }}
          >
            {tagline.text}
          </span>
        </motion.div>

        <motion.p
          className="hero__description"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {siteConfig.bio}
        </motion.p>

        <motion.div
          className="hero__ctas"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <a href="#projects" className="hero__cta hero__cta--primary">
            <ArrowDown size={16} />
            View Projects
          </a>
          <a
            href="/resume"
            className="hero__cta hero__cta--secondary"
          >
            <FileText size={16} />
            Resume
          </a>
          <a
            href={siteConfig.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hero__cta hero__cta--secondary"
          >
            <GithubIcon size={16} />
            GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}
