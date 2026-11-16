import { useEffect, useState } from "react";
import { Star, GitFork, ExternalLink, Activity } from "lucide-react";
import { Github } from "./BrandIcons.jsx";
import { SITE } from "../data/site.js";

const CACHE_KEY = "github_profile_cache";
const CACHE_TIME = 1000 * 60 * 30; // 30 minutes

export default function GithubActivity() {
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      try {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_TIME) {
          setProfile(data.profile);
          setRepos(data.repos);
          setLoading(false);
          return;
        }
      } catch (e) {
        // invalid cache
      }
    }

    async function fetchGithub() {
      try {
        const [pRes, rRes] = await Promise.all([
          fetch("https://api.github.com/users/Thiva123-ab"),
          fetch("https://api.github.com/users/Thiva123-ab/repos?sort=updated&per_page=4"),
        ]);

        if (pRes.ok && rRes.ok) {
          const pData = await pRes.json();
          const rData = await rRes.json();
          setProfile(pData);
          setRepos(rData);
          localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({
              data: { profile: pData, repos: rData },
              timestamp: Date.now(),
            })
          );
        }
      } catch (err) {
        console.warn("GitHub API fallback triggered", err);
      } finally {
        setLoading(false);
      }
    }

    fetchGithub();
  }, []);

  return (
    <div className="github-card">
      <div className="github-header">
        <div className="github-title-wrap">
          <Github className="github-icon" size={24} />
          <div>
            <h4>GitHub Live Activity</h4>
            <p>@Thiva123-ab · Public Repositories &amp; Contributions</p>
          </div>
        </div>
        <a
          href={SITE.github}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ghost btn-sm"
          data-cursor="hover"
        >
          View Profile <ExternalLink size={13} />
        </a>
      </div>

      <div className="github-stats-bar">
        <div className="github-stat-pill">
          <Activity size={14} className="pill-icon" />
          <span>Public Repos: <strong>{profile?.public_repos ?? "12+"}</strong></span>
        </div>
        <div className="github-stat-pill">
          <span>Followers: <strong>{profile?.followers ?? "Active"}</strong></span>
        </div>
        <div className="github-stat-pill">
          <span>Active Streak: <strong>Continuous</strong></span>
        </div>
      </div>

      <div className="github-recent-grid">
        {(repos.length > 0 ? repos : [
          { name: "Sri-Lanka-Flood-Relief-Coordinator-Live-Map", description: "Realtime disaster coordination with Spring Boot, WebSockets & Leaflet", stargazers_count: 0, forks_count: 0, html_url: "https://github.com/Thiva123-ab/Sri-Lanka-Flood-Relief-Coordinator-Live-Map" },
          { name: "study_buddy", description: "LectureLens — Bilingual AI study assistant with React, TanStack Start & Supabase", stargazers_count: 0, forks_count: 0, html_url: "https://github.com/Thiva123-ab/study_buddy" },
          { name: "FocusFlow-Android-App", description: "Local-first Android wellbeing app with Kotlin, Jetpack Compose & Room", stargazers_count: 0, forks_count: 0, html_url: "https://github.com/Thiva123-ab/FocusFlow-Android-App" },
          { name: "Pharmacy-stock-system", description: "Full-stack pharmacy inventory and prescription management system", stargazers_count: 0, forks_count: 0, html_url: "https://github.com/Thiva123-ab/Pharmacy-stock-system" }
        ]).map((repo) => (
          <a
            key={repo.name}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="github-repo-item"
            data-cursor="hover"
          >
            <div className="github-repo-top">
              <span className="github-repo-name">{repo.name}</span>
              <ExternalLink size={13} className="repo-link-arrow" />
            </div>
            <p className="github-repo-desc">
              {repo.description || "Public repository authored by Thivanka Tharuka."}
            </p>
            <div className="github-repo-meta">
              <span><Star size={12} /> {repo.stargazers_count ?? 0}</span>
              <span><GitFork size={12} /> {repo.forks_count ?? 0}</span>
              <span className="github-dot-lang">Open Source</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
