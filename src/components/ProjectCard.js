"use client";

import { motion } from "framer-motion";
import { Folder, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/Icons";

export default function ProjectCard({ project, index }) {
  return (
    <motion.div
      className="project-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="project-card__header">
        <Folder size={28} className="project-card__icon" />
        <div className="project-card__links">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card__link"
              aria-label={`View ${project.name} on GitHub`}
            >
              <GithubIcon size={18} />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card__link"
              aria-label={`View ${project.name} live demo`}
            >
              <ExternalLink size={18} />
            </a>
          )}
        </div>
      </div>

      <h3 className="project-card__name">{project.name}</h3>
      <p className="project-card__description">{project.description}</p>

      <div className="project-card__tech">
        {project.tech.map((t) => (
          <span key={t} className="project-card__tech-pill">
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
