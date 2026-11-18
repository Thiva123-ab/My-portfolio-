import { Link } from "react-router-dom";
import { Star, GitFork, ExternalLink, ArrowRight, Sparkles } from "lucide-react";
import Card from "../Card.jsx";
import { formatRelativeTime } from "../../lib/github/calc.js";

export function RepoCard({ repo, index = 0 }) {
  if (!repo) return null;

  const timeAgo = formatRelativeTime(repo.updatedAt);

  return (
    <Card className="gh-repo-card" delay={index * 0.05}>
      {/* Top Header: Title + Mapped Project Badge */}
      <div className="gh-repo-top">
        <div className="gh-repo-title-row">
          <a
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="gh-repo-name"
            data-cursor="hover"
          >
            {repo.name}
          </a>

          {repo.projectSlug && (
            <span className="gh-featured-badge" title="Featured in portfolio project case study">
              <Sparkles size={11} />
              <span>Featured Project</span>
            </span>
          )}
        </div>

        <p className="gh-repo-desc">{repo.description}</p>
      </div>

      {/* Topics */}
      {repo.topics && repo.topics.length > 0 && (
        <div className="gh-repo-topics">
          {repo.topics.slice(0, 4).map((t) => (
            <span key={t} className="gh-topic-tag">
              #{t}
            </span>
          ))}
        </div>
      )}

      {/* Footer Metrics + Action Links */}
      <div className="gh-repo-footer">
        <div className="gh-repo-metrics">
          {repo.language && (
            <span className="gh-repo-metric-item">
              <span
                className="gh-lang-dot"
                style={{ backgroundColor: repo.languageColor }}
                aria-hidden="true"
              />
              <span>{repo.language}</span>
            </span>
          )}

          <span className="gh-repo-metric-item" title="Stargazers">
            <Star size={13} className="gh-metric-icon" />
            <span>{repo.stars}</span>
          </span>

          <span className="gh-repo-metric-item" title="Forks">
            <GitFork size={13} className="gh-metric-icon" />
            <span>{repo.forks}</span>
          </span>

          <span className="gh-repo-metric-item gh-repo-updated">
            {timeAgo}
          </span>
        </div>

        <div className="gh-repo-actions">
          {repo.projectSlug ? (
            <Link
              to={`/projects/${repo.projectSlug}`}
              className="btn btn-ghost btn-xs text-gradient"
              data-cursor="hover"
            >
              <span>Case Study</span>
              <ArrowRight size={12} />
            </Link>
          ) : null}

          <a
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost btn-xs"
            data-cursor="hover"
          >
            <span>GitHub</span>
            <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </Card>
  );
}

export default function PinnedRepos({ repos = [] }) {
  if (!repos || repos.length === 0) return null;

  return (
    <div className="gh-repos-section">
      <div className="gh-repos-header">
        <h3 className="gh-card-title">Top Repositories</h3>
        <span className="gh-repos-subtitle">Highlighted codebases &amp; open source projects</span>
      </div>

      <div className="gh-repos-grid">
        {repos.map((repo, idx) => (
          <RepoCard key={repo.name} repo={repo} index={idx} />
        ))}
      </div>
    </div>
  );
}
