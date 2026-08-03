"use client";

import { motion } from "framer-motion";
import siteConfig from "@/data/siteConfig";

export default function BlogSection() {
  return (
    <section className="section" id="blog">
      <motion.p
        className="section__label"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        Writing
      </motion.p>
      <motion.h2
        className="section__title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Writing & Thoughts
      </motion.h2>

      <motion.div
        className="blog__coming-soon"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <span className="blog__badge">Coming Soon</span>
        <p className="blog__teaser">{siteConfig.blogTagline}</p>
      </motion.div>
    </section>
  );
}
