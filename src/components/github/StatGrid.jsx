import { useEffect, useState } from "react";
import {
  FolderGit2,
  Star,
  GitCommit,
  Flame,
  Zap,
  GitPullRequest,
  AlertCircle,
  CalendarCheck,
} from "lucide-react";
import Card from "../Card.jsx";

function AnimatedCounter({ value = 0, duration = 1200 }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTime;
    let animationFrame;

    const target = Number(value) || 0;
    if (target === 0) {
      setDisplayValue(0);
      return;
    }

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out cubic: 1 - pow(1 - progress, 3)
      const ease = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.floor(ease * target));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      } else {
        setDisplayValue(target);
      }
    };

    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, [value, duration]);

  return <span>{displayValue.toLocaleString()}</span>;
}

export function StatTile({ icon: Icon, label, value, subtext, delay = 0, isHighlight = false }) {
  return (
    <Card
      className={`gh-stat-tile ${isHighlight ? "stat-highlight" : ""}`}
      delay={delay}
    >
      <div className="gh-stat-top">
        <span className="gh-stat-label">{label}</span>
        <div className="gh-stat-icon-wrap" aria-hidden="true">
          <Icon size={16} />
        </div>
      </div>

      <div className="gh-stat-value">
        <AnimatedCounter value={value} />
      </div>

      {subtext && <span className="gh-stat-subtext">{subtext}</span>}
    </Card>
  );
}

export default function StatGrid({ stats }) {
  if (!stats) return null;

  const items = [
    {
      label: "Public Repos",
      value: stats.publicRepos,
      subtext: "Architected & shipped",
      icon: FolderGit2,
    },
    {
      label: "Total Stars",
      value: stats.totalStars,
      subtext: "Community stargazers",
      icon: Star,
    },
    {
      label: "Contributions",
      value: stats.totalContributions,
      subtext: "Past 12 months",
      icon: GitCommit,
      isHighlight: true,
    },
    {
      label: "Current Streak",
      value: stats.currentStreak,
      subtext: stats.currentStreak > 0 ? `${stats.currentStreak} consecutive days` : "Active cycle",
      icon: Flame,
      isHighlight: true,
    },
    {
      label: "Longest Streak",
      value: stats.longestStreak,
      subtext: "Consecutive active days",
      icon: Zap,
    },
    {
      label: "Pull Requests",
      value: stats.pullRequests,
      subtext: "Features & contributions",
      icon: GitPullRequest,
    },
    {
      label: "Issues Solved",
      value: stats.issues,
      subtext: "Triaged & tracked",
      icon: AlertCircle,
    },
    {
      label: "Year Commits",
      value: stats.commitsThisYear,
      subtext: "Calendar year volume",
      icon: CalendarCheck,
    },
  ];

  return (
    <div className="gh-stat-grid" role="region" aria-label="GitHub Statistics Overview">
      {items.map((item, idx) => (
        <StatTile
          key={item.label}
          label={item.label}
          value={item.value}
          subtext={item.subtext}
          icon={item.icon}
          delay={idx * 0.04}
          isHighlight={item.isHighlight}
        />
      ))}
    </div>
  );
}
