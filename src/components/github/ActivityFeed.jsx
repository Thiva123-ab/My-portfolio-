import { GitCommit, GitPullRequest, Star, PlusCircle, AlertCircle, ArrowUpRight } from "lucide-react";
import Card from "../Card.jsx";
import { formatRelativeTime } from "../../lib/github/calc.js";

const EVENT_ICONS = {
  PushEvent: GitCommit,
  PullRequestEvent: GitPullRequest,
  WatchEvent: Star,
  CreateEvent: PlusCircle,
  IssuesEvent: AlertCircle,
};

export default function ActivityFeed({ events = [] }) {
  if (!events || events.length === 0) return null;

  return (
    <Card className="gh-card gh-activity-card">
      <div className="gh-activity-header">
        <h3 className="gh-card-title">Recent Activity</h3>
        <span className="gh-activity-subtitle">Public events &amp; code shipments</span>
      </div>

      <div className="gh-activity-list" role="feed" aria-label="Recent public GitHub activity">
        {events.map((event) => {
          const Icon = EVENT_ICONS[event.type] || GitCommit;
          const timeAgo = formatRelativeTime(event.createdAt);

          return (
            <article key={event.id} className="gh-activity-item">
              <div className="gh-activity-icon-wrap" aria-hidden="true">
                <Icon size={14} />
              </div>

              <div className="gh-activity-content">
                <div className="gh-activity-top-line">
                  <a
                    href={event.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gh-activity-repo"
                    data-cursor="hover"
                  >
                    <span>{event.repoName}</span>
                    <ArrowUpRight size={11} className="inline opacity-60" />
                  </a>
                  <span className="gh-activity-time">{timeAgo}</span>
                </div>

                <p className="gh-activity-summary">{event.summary}</p>
              </div>
            </article>
          );
        })}
      </div>
    </Card>
  );
}
