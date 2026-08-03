import Link from "next/link";
import { ArrowLeft, Download, FileText } from "lucide-react";
import siteConfig from "@/data/siteConfig";

export const metadata = {
  title: `Resume — ${siteConfig.name}`,
  description: `View and download ${siteConfig.name}'s resume.`,
};

export default function ResumePage() {
  return (
    <div className="resume-page">
      <div className="resume-page__container">
        <div className="resume-page__header">
          <Link href="/" className="resume-page__back">
            <ArrowLeft size={16} />
            Back to portfolio
          </Link>

          <div className="resume-page__actions">
            <a
              href={siteConfig.resumeFile}
              download
              className="resume-page__download-btn"
            >
              <Download size={16} />
              Download PDF
            </a>
          </div>
        </div>

        <div className="resume-page__viewer">
          <iframe
            src={siteConfig.resumeFile}
            title={`${siteConfig.name} Resume`}
            className="resume-page__iframe"
          />
          {/* Fallback for browsers that can't render PDFs inline */}
          <noscript>
            <p className="resume-page__fallback">
              <FileText size={24} />
              Your browser cannot display this PDF.{" "}
              <a href={siteConfig.resumeFile} download>
                Download it here
              </a>
              .
            </p>
          </noscript>
        </div>
      </div>
    </div>
  );
}
