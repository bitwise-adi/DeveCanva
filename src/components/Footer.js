import siteConfig from "@/data/siteConfig";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__inner">
        <p className="footer__copy">
          &copy; {year} {siteConfig.name}
        </p>
        <p className="footer__credit">
          {siteConfig.footerText} &middot;{" "}
          <a
            href={siteConfig.socials.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            @{siteConfig.handle}
          </a>
        </p>
      </div>
    </footer>
  );
}
