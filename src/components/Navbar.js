"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import siteConfig from "@/data/siteConfig";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = () => setMobileOpen(false);

  const sectionLinks = [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <div className="nav__inner">
        <Link href="/" className="nav__logo">
          {"<"}<span>{siteConfig.handle}</span>{" />"}
        </Link>

        <div className="nav__links">
          {sectionLinks.map((link) => (
            <a key={link.href} href={link.href} className="nav__link">
              {link.label}
            </a>
          ))}
          <a href="/blog" target="_blank" rel="noopener noreferrer" className="nav__link">
            Blog
          </a>
        </div>

        <Link href="/resume" className="nav__resume-btn">
          Resume
        </Link>

        {/* Mobile toggle */}
        <button
          className={`nav__mobile-toggle ${mobileOpen ? "nav__mobile-toggle--open" : ""}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`nav__mobile-menu ${mobileOpen ? "nav__mobile-menu--open" : ""}`}>
        {sectionLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="nav__link"
            onClick={handleNavClick}
          >
            {link.label}
          </a>
        ))}
        <a
          href="/blog"
          target="_blank"
          rel="noopener noreferrer"
          className="nav__link"
          onClick={handleNavClick}
        >
          Blog
        </a>
        <Link
          href="/resume"
          className="nav__resume-btn"
          onClick={handleNavClick}
        >
          Resume
        </Link>
      </div>
    </nav>
  );
}

