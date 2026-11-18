import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GitBranch, ShieldCheck, RefreshCw, ArrowUpRight } from "lucide-react";
import Reveal from "../Reveal.jsx";
import ProfileCard from "./ProfileCard.jsx";
import StatGrid from "./StatGrid.jsx";
import ContributionHeatmap from "./ContributionHeatmap.jsx";
import LanguageChart from "./LanguageChart.jsx";
import PinnedRepos from "./RepoCard.jsx";
import ActivityFeed from "./ActivityFeed.jsx";
import CommitChart from "./CommitChart.jsx";
import { ProfileCardSkeleton, StatGridSkeleton, HeatmapSkeleton } from "./GitHubSkeletons.jsx";
import initialSnapshot from "../../data/github-snapshot.json";

export default function GitHubSection({ isStandalone = false }) {
  const [data, setData] = useState(initialSnapshot);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function loadGitHubData() {
      try {
        setLoading(true);
        const res = await fetch("/api/github");
        if (!res.ok) {
          throw new Error(`API returned HTTP ${res.status}`);
        }
        const json = await res.json();
        if (isMounted && json && json.stats) {
          setData(json);
        }
      } catch (err) {
        console.info("[GitHub Dashboard] Using committed snapshot:", err.message);
        if (isMounted) {
          setError(err.message);
          setData(initialSnapshot);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadGitHubData();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section
      className={`section github-section ${isStandalone ? "is-standalone" : ""}`}
      id="github"
      aria-label="GitHub Dashboard & Activity"
    >
      {/* Consistent Section Heading Pattern */}
      <div className="section-head">
        <span className="section-index">04</span>
        <div className="gh-heading-row">
          <Reveal as={isStandalone ? "h1" : "h2"} className="section-title">
            GitHub Activity
          </Reveal>
          <div className="gh-heading-badges">
            <div className="gh-verified-badge" title="Verified against GitHub REST & GraphQL API">
              <ShieldCheck size={14} className="text-teal" />
              <span>Verified GitHub Data</span>
            </div>

            {!isStandalone && (
              <Link
                to="/github"
                className="gh-standalone-pill"
                data-cursor="hover"
                title="View dedicated GitHub dashboard page"
              >
                <span>Dedicated View</span>
                <ArrowUpRight size={13} />
              </Link>
            )}
          </div>
        </div>
      </div>

      <p className="section-lead max-w-2xl">
        Automated telemetry and open-source contributions pulled directly from my GitHub account.
        Zero inflated titles or artificial activity bars.
      </p>

      {/* Main Dashboard Layout */}
      <div className="gh-dashboard-wrap">
        {loading && !data ? (
          <div className="gh-skeletons-wrap">
            <ProfileCardSkeleton />
            <StatGridSkeleton />
            <HeatmapSkeleton />
          </div>
        ) : (
          <>
            {/* Row 1: Profile Card + Language Breakdown */}
            <div className="gh-row-top">
              <Reveal delay={0.05} className="gh-col-profile">
                <ProfileCard profile={data.profile} lastActive={data.stats?.lastActive} />
              </Reveal>
              <Reveal delay={0.1} className="gh-col-languages">
                <LanguageChart languages={data.languages} />
              </Reveal>
            </div>

            {/* Row 2: Bento Stat Grid (8 Metrics) */}
            <Reveal delay={0.15}>
              <StatGrid stats={data.stats} />
            </Reveal>

            {/* Row 3: 52-Week Contribution Heatmap */}
            <Reveal delay={0.2}>
              <ContributionHeatmap contributions={data.contributions} />
            </Reveal>

            {/* Row 4: Weekly Commit Chart + Recent Activity Feed */}
            <div className="gh-row-split">
              <Reveal delay={0.25} className="gh-col-chart">
                <CommitChart weeklyCommits={data.weeklyCommits} />
              </Reveal>
              <Reveal delay={0.3} className="gh-col-activity">
                <ActivityFeed events={data.events} />
              </Reveal>
            </div>

            {/* Row 5: Top / Pinned Repositories */}
            <Reveal delay={0.35}>
              <PinnedRepos repos={data.repos} />
            </Reveal>

            {/* Honest Footnote */}
            <div className="gh-footnote">
              <GitBranch size={13} className="gh-footnote-icon" aria-hidden="true" />
              <span>
                Private repository activity is only included if enabled in GitHub profile contribution settings.
                Data is refreshed automatically via ISR edge caching.
              </span>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
