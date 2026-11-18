import { Download } from "lucide-react";
import { Linkedin, Github } from "../BrandIcons.jsx";
import { SITE, CV_HREF } from "../../data/site.js";

export default function AboutQuickActions() {
  return (
    <div className="about-quick-actions-row" role="group" aria-label="Quick contact and profile actions">
      {/* 1. Download CV (Primary) */}
      <a
        href={CV_HREF}
        download="Thivanka_Tharuka_CV.pdf"
        className="btn btn-primary about-quick-btn"
        data-cursor="hover"
        title="Download verified Curriculum Vitae (PDF)"
      >
        <Download size={15} />
        <span>CV (PDF)</span>
      </a>

      {/* 2. LinkedIn */}
      <a
        href={SITE.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-ghost about-quick-btn"
        data-cursor="hover"
        title="Connect with Thivanka Tharuka on LinkedIn"
      >
        <Linkedin size={15} />
        <span>LinkedIn</span>
      </a>

      {/* 3. GitHub */}
      <a
        href={SITE.github}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-ghost about-quick-btn"
        data-cursor="hover"
        title="Explore open-source repositories on GitHub"
      >
        <Github size={15} />
        <span>GitHub</span>
      </a>
    </div>
  );
}
