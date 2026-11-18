import { ArrowLeft, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import { Github as GithubIcon } from "../components/BrandIcons.jsx";
import GitHubSection from "../components/github/GitHubSection.jsx";
import { SITE } from "../data/site.js";

export default function GitHubPage() {
  return (
    <>
      <Seo
        title="GitHub Dashboard & Open Source Telemetry"
        description="Live telemetry, 52-week contribution heatmap, language distributions, and repository statistics for Thivanka Tharuka (@Thiva123-ab)."
        path="/github"
      />
      <div className="page-section-pad github-standalone-page">
        {/* Navigation Breadcrumb Bar */}
        <div className="github-page-nav-bar">
          <Link to="/" className="work-link case-back" data-cursor="hover">
            <ArrowLeft size={16} />
            <span>Back to Overview</span>
          </Link>

          <a
            href={SITE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost btn-xs gh-profile-link-btn"
            data-cursor="hover"
            title="Open GitHub Profile in new tab"
          >
            <GithubIcon size={14} />
            <span>@Thiva123-ab</span>
            <ExternalLink size={12} className="opacity-70" />
          </a>
        </div>

        {/* Standalone GitHub Section */}
        <GitHubSection isStandalone={true} />
      </div>
    </>
  );
}
