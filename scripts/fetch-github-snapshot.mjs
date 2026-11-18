/**
 * scripts/fetch-github-snapshot.mjs
 *
 * Fetches real GitHub data for Thiva123-ab and saves a snapshot to src/data/github-snapshot.json.
 * Uses GITHUB_TOKEN if available; otherwise falls back to public REST endpoints.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SNAPSHOT_PATH = path.resolve(__dirname, "../src/data/github-snapshot.json");

const USERNAME = "Thiva123-ab";
const TOKEN = process.env.GITHUB_TOKEN || "";

const PROJECT_SLUG_MAP = {
  "Sri-Lanka-Flood-Relief-Coordinator-Live-Map": "flood-relief",
  "study_buddy": "lecturelens",
  "Smart-Time-Management-MobileApp": "focusflow",
  "My_Garage-": "autosync-garage",
  "Pharmacy-stock-system": "pharmacy-stock",
  "Motion-Strike": "motion-strike",
  "DEA-Spring-Boot-Project": "dea-spring-boot",
  "Nova_bank-": "nova-bank",
};

const LANGUAGE_COLORS = {
  Dart: "#00B4AB",
  JavaScript: "#F7DF1E",
  TypeScript: "#3178C6",
  Kotlin: "#A97BFF",
  Java: "#B07219",
  PHP: "#4F5D95",
  "C++": "#F34B7D",
  C: "#555555",
  HTML: "#E34C26",
  CSS: "#563D7C",
  Python: "#3572A5",
  Swift: "#F05138",
  CMake: "#064F8C",
  Shell: "#89E051",
  PLpgSQL: "#336791",
  Dockerfile: "#384D54",
  Other: "#8B7CFF",
};

async function fetchJSON(url, options = {}) {
  const headers = {
    "User-Agent": "Thivanka-Portfolio-Builder",
    Accept: "application/vnd.github.v3+json",
    ...options.headers,
  };
  if (TOKEN) {
    headers.Authorization = `Bearer ${TOKEN}`;
  }
  const res = await fetch(url, { ...options, headers });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} from ${url}: ${await res.text()}`);
  }
  return res.json();
}

export async function fetchGitHubData() {
  console.log(`[GitHub Snapshot] Fetching data for ${USERNAME}...`);

  // 1. User Profile
  const user = await fetchJSON(`https://api.github.com/users/${USERNAME}`);

  // 2. Repositories
  const repos = await fetchJSON(`https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated`);
  const nonForkRepos = repos.filter((r) => !r.fork);

  // 3. Language breakdown (aggregate bytes)
  const languageBytes = {};
  for (const repo of nonForkRepos) {
    if (repo.languages_url) {
      try {
        const langData = await fetchJSON(repo.languages_url);
        for (const [lang, bytes] of Object.entries(langData)) {
          languageBytes[lang] = (languageBytes[lang] || 0) + bytes;
        }
      } catch (err) {
        console.warn(`Could not fetch languages for ${repo.name}:`, err.message);
      }
    }
  }

  const totalBytes = Object.values(languageBytes).reduce((a, b) => a + b, 0) || 1;
  const sortedLanguages = Object.entries(languageBytes)
    .sort((a, b) => b[1] - a[1])
    .map(([name, bytes]) => ({
      name,
      bytes,
      percentage: Number(((bytes / totalBytes) * 100).toFixed(1)),
      color: LANGUAGE_COLORS[name] || "#8B7CFF",
    }));

  const topLanguages = sortedLanguages.slice(0, 6);
  const otherBytes = sortedLanguages.slice(6).reduce((acc, l) => acc + l.bytes, 0);
  if (otherBytes > 0) {
    topLanguages.push({
      name: "Other",
      bytes: otherBytes,
      percentage: Number(((otherBytes / totalBytes) * 100).toFixed(1)),
      color: LANGUAGE_COLORS.Other,
    });
  }

  // 4. Recent Public Events
  let events = [];
  try {
    const rawEvents = await fetchJSON(`https://api.github.com/users/${USERNAME}/events?per_page=30`);
    events = rawEvents
      .filter((e) => ["PushEvent", "CreateEvent", "WatchEvent", "PullRequestEvent", "IssuesEvent", "ForkEvent"].includes(e.type))
      .slice(0, 10)
      .map((e) => {
        let summary = "";
        if (e.type === "PushEvent") {
          const count = e.payload?.commits?.length || 1;
          const msg = e.payload?.commits?.[0]?.message?.split("\n")[0] || "Code updates";
          summary = `Pushed ${count} commit${count > 1 ? "s" : ""}: "${msg.slice(0, 50)}${msg.length > 50 ? "…" : ""}"`;
        } else if (e.type === "CreateEvent") {
          summary = `Created ${e.payload?.ref_type || "repository"} ${e.payload?.ref || ""}`;
        } else if (e.type === "WatchEvent") {
          summary = "Starred repository";
        } else if (e.type === "PullRequestEvent") {
          summary = `${e.payload?.action || "Opened"} pull request #${e.payload?.number || ""}`;
        } else if (e.type === "IssuesEvent") {
          summary = `${e.payload?.action || "Opened"} issue #${e.payload?.number || ""}`;
        } else {
          summary = e.type.replace("Event", "");
        }

        return {
          id: e.id,
          type: e.type,
          repoName: e.repo.name.replace(`${USERNAME}/`, ""),
          repoFullName: e.repo.name,
          repoUrl: `https://github.com/${e.repo.name}`,
          createdAt: e.created_at,
          summary,
        };
      });
  } catch (err) {
    console.warn("Could not fetch events:", err.message);
  }

  // 5. Contributions Calendar (via verified API)
  let contributions = { total: {}, contributions: [] };
  try {
    const contribRes = await fetch(`https://github-contributions-api.jogruber.de/v4/${USERNAME}`);
    if (contribRes.ok) {
      contributions = await contribRes.json();
    }
  } catch (err) {
    console.warn("Could not fetch contributions calendar:", err.message);
  }

  const allDays = contributions.contributions || [];
  allDays.sort((a, b) => a.date.localeCompare(b.date));

  // Compute streaks
  let longestStreak = 0;
  let tempStreak = 0;
  for (const day of allDays) {
    if (day.count > 0) {
      tempStreak++;
      if (tempStreak > longestStreak) longestStreak = tempStreak;
    } else {
      tempStreak = 0;
    }
  }

  let currentStreak = 0;
  const todayStr = new Date().toISOString().slice(0, 10);
  const yesterdayStr = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  const revDays = [...allDays].reverse();
  let streakActive = false;

  for (const day of revDays) {
    if (day.date === todayStr || day.date === yesterdayStr) {
      if (day.count > 0) {
        streakActive = true;
        currentStreak++;
      }
    } else if (streakActive) {
      if (day.count > 0) {
        currentStreak++;
      } else {
        break;
      }
    }
  }

  // Search PRs and Issues total
  let pullRequestsCount = 0;
  let issuesCount = 0;
  try {
    const prs = await fetchJSON(`https://api.github.com/search/issues?q=type:pr+author:${USERNAME}`);
    pullRequestsCount = prs.total_count || 0;
    const issues = await fetchJSON(`https://api.github.com/search/issues?q=type:issue+author:${USERNAME}`);
    issuesCount = issues.total_count || 0;
  } catch (err) {
    console.warn("Could not search PRs/issues:", err.message);
  }

  // Compute weekly commit aggregates (last 52 weeks)
  const last365Days = allDays.slice(-365);
  const weeklyCommits = [];
  for (let i = 0; i < last365Days.length; i += 7) {
    const weekSlice = last365Days.slice(i, i + 7);
    const count = weekSlice.reduce((acc, d) => acc + (d.count || 0), 0);
    const startDate = weekSlice[0]?.date || "";
    weeklyCommits.push({ weekStart: startDate, count });
  }

  // Pinned / Featured Repositories selection
  // Prioritize repos with descriptions, stars, or mapped portfolio projects
  const topRepos = nonForkRepos
    .sort((a, b) => {
      const aMapped = PROJECT_SLUG_MAP[a.name] ? 1 : 0;
      const bMapped = PROJECT_SLUG_MAP[b.name] ? 1 : 0;
      if (bMapped !== aMapped) return bMapped - aMapped;
      if (b.stargazers_count !== a.stargazers_count) return b.stargazers_count - a.stargazers_count;
      return new Date(b.updated_at) - new Date(a.updated_at);
    })
    .slice(0, 6)
    .map((r) => ({
      name: r.name,
      description: r.description || `Full stack repository architected with ${r.language || "modern technologies"}.`,
      url: r.html_url,
      homepage: r.homepage || null,
      stars: r.stargazers_count,
      forks: r.forks_count,
      language: r.language || "Code",
      languageColor: LANGUAGE_COLORS[r.language] || "#8B7CFF",
      updatedAt: r.updated_at,
      topics: (r.topics && r.topics.length > 0) ? r.topics : [r.language?.toLowerCase() || "software"],
      projectSlug: PROJECT_SLUG_MAP[r.name] || null,
    }));

  const totalContributionsPastYear = last365Days.reduce((acc, d) => acc + (d.count || 0), 0);
  const commitsThisYear = (contributions.total && (contributions.total["2026"] || contributions.total[new Date().getFullYear().toString()])) || totalContributionsPastYear;

  const snapshot = {
    profile: {
      login: user.login,
      name: user.name?.trim() || user.login,
      avatarUrl: user.avatar_url,
      bio: user.bio || "Full Stack Developer",
      company: user.company?.trim() || "NSBM Green University",
      location: user.location || "Sri Lanka",
      joinedYear: new Date(user.created_at).getFullYear(),
      followers: user.followers,
      following: user.following,
      htmlUrl: user.html_url,
      lastActive: events[0]?.createdAt || user.updated_at,
    },
    stats: {
      publicRepos: user.public_repos,
      totalStars: repos.reduce((acc, r) => acc + (r.stargazers_count || 0), 0),
      totalContributions: totalContributionsPastYear,
      currentStreak,
      longestStreak,
      pullRequests: pullRequestsCount,
      issues: issuesCount,
      commitsThisYear,
    },
    contributions: {
      total: contributions.total || {},
      days: allDays,
      last52Weeks: last365Days,
    },
    languages: topLanguages,
    repos: topRepos,
    events,
    weeklyCommits,
    meta: {
      fetchedAt: new Date().toISOString(),
      isFallback: false,
      source: "github-api",
    },
  };

  fs.mkdirSync(path.dirname(SNAPSHOT_PATH), { recursive: true });
  fs.writeFileSync(SNAPSHOT_PATH, JSON.stringify(snapshot, null, 2), "utf8");
  console.log(`[GitHub Snapshot] Successfully saved snapshot to ${SNAPSHOT_PATH}`);
  return snapshot;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  fetchGitHubData().catch((err) => {
    console.error("[GitHub Snapshot] Fatal error:", err);
    process.exit(1);
  });
}
