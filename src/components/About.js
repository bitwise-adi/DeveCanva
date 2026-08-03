"use client";

import { motion } from "framer-motion";
import siteConfig from "@/data/siteConfig";
import skills from "@/data/skills";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function About() {
  const languages = skills.filter((s) => s.category === "language");
  const frameworks = skills.filter((s) => s.category === "framework");
  const tools = skills.filter((s) => s.category === "tool");
  const domains = skills.filter((s) => s.category === "domain");

  return (
    <section className="section" id="about">
      <motion.p
        className="section__label"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        About
      </motion.p>
      <motion.h2
        className="section__title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        A bit about me
      </motion.h2>

      <div className="about__grid">
        {/* Bio Card — full width */}
        <motion.div
          className="about__card about__card--bio"
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <p className="about__card-label">Who I am</p>
          <p className="about__bio-text">
            {siteConfig.bio} I&apos;m drawn to projects that sit at the intersection
            of practical utility and technical curiosity — whether that&apos;s
            scraping a university portal to plan semester exam strategies, building
            encrypted real-time systems, or deploying ML threat classifiers.
            I like building things that solve real problems, combining strong
            engineering fundamentals with modern AI-driven velocity to go from idea
            to production with speed and precision.
          </p>
        </motion.div>

        {/* Languages & Frameworks */}
        <motion.div
          className="about__card"
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <p className="about__card-label">Languages & Frameworks</p>
          <motion.div
            className="about__skills-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[...languages, ...frameworks].map((skill) => (
              <motion.span
                key={skill.name}
                className="about__skill-pill"
                variants={itemVariants}
              >
                {skill.name}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        {/* Tools & Platforms */}
        <motion.div
          className="about__card"
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <p className="about__card-label">Tools & Platforms</p>
          <motion.div
            className="about__skills-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {tools.map((skill) => (
              <motion.span
                key={skill.name}
                className="about__skill-pill"
                variants={itemVariants}
              >
                {skill.name}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        {/* Domains & Specializations */}
        <motion.div
          className="about__card"
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <p className="about__card-label">Domains & Architecture</p>
          <motion.div
            className="about__skills-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {domains.map((skill) => (
              <motion.span
                key={skill.name}
                className="about__skill-pill about__skill-pill--domain"
                variants={itemVariants}
              >
                {skill.name}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
