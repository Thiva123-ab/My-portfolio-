import { Link } from "react-router-dom";
import { ArrowLeft, Home, FolderGit2, FileText, Search } from "lucide-react";
import Seo from "../components/Seo.jsx";

export default function NotFound() {
  return (
    <>
      <Seo title="404 — Page Not Found" path="/404" />
      <section className="section page-section not-found-section">
        <div className="not-found-inner">
          <span className="not-found-code">404</span>
          <h1 className="section-title">Route Not Found</h1>
          <p className="page-lead">
            The page you are looking for does not exist or may have been relocated.
          </p>

          <div className="not-found-actions">
            <Link to="/" className="btn btn-primary" data-cursor="hover">
              <Home size={16} />
              <span>Back to Home</span>
            </Link>
            <Link to="/projects" className="btn btn-ghost" data-cursor="hover">
              <FolderGit2 size={16} />
              <span>Explore Projects</span>
            </Link>
            <Link to="/resume" className="btn btn-ghost" data-cursor="hover">
              <FileText size={16} />
              <span>View Resume</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
