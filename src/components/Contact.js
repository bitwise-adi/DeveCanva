"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";
import siteConfig from "@/data/siteConfig";

export default function Contact() {
  return (
    <section className="section" id="contact">
      <motion.p
        className="section__label"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        Contact
      </motion.p>
      <motion.h2
        className="section__title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{ textAlign: "center" }}
      >
        Let&apos;s connect
      </motion.h2>

      <motion.div
        className="contact__content"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <p className="contact__text">
          I&apos;m always open to interesting conversations, collaborations,
          or just a good chat about tech and ideas. Reach out through any
          of the channels below.
        </p>

        <div className="contact__links">
          <a
            href={`mailto:${siteConfig.email}`}
            className="contact__link"
            aria-label="Send email"
          >
            <Mail size={18} />
            {siteConfig.email}
          </a>
          <a
            href={siteConfig.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="contact__link"
            aria-label="GitHub profile"
          >
            <GithubIcon size={18} />
            GitHub
          </a>
          <a
            href={siteConfig.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="contact__link"
            aria-label="LinkedIn profile"
          >
            <LinkedinIcon size={18} />
            LinkedIn
          </a>
        </div>
      </motion.div>
    </section>
  );
}
