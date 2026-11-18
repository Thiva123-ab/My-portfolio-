/**
 * api/github.js
 *
 * Vercel Serverless Function (Edge / Node runtime).
 * Fetches real GitHub profile metrics, contributions, languages, and pinned repos for Thiva123-ab.
 *
 * Features:
 * - ISR Edge Caching: s-maxage=3600 (1 hour), stale-while-revalidate=86400 (24 hours)
 * - Safe server-side authentication using process.env.GITHUB_TOKEN
 * - Graceful fallback to committed snapshot if rate limits or network errors occur
 */

import snapshotData from "../src/data/github-snapshot.json" assert { type: "json" };
import { computeLanguagePercentages, computeStreaks, computeWeeklyCommits } from "../src/lib/github/calc.js";

const USERNAME = "Thiva123-ab";

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

export default async function handler(req, res) {
  // Edge cache headers: 1 hour max-age, 24h stale-while-revalidate
  res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
  res.setHeader("Content-Type", "application/json");

  const token = process.env.GITHUB_TOKEN || "";

  try {
    const headers = {
      "User-Agent": "Thivanka-Portfolio-Dashboard",
      Accept: "application/vnd.github.v3+json",
    };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    // 1. Fetch User Profile
    const userRes = await fetch(`https://api.github.com/users/${USERNAME}`, { headers });
    if (!userRes.ok) {
      throw new Error(`GitHub user API returned ${userRes.status}`);
    }
    const user = await userRes.json();

    // 2. Fetch Repositories
    const reposRes = await fetch(`https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated`, { headers });
    const repos = reposRes.ok ? await reposRes.json() : [];
    const nonForkRepos = Array.isArray(repos) ? repos.filter((r) => !r.fork) : [];

    // 3. Fetch Contributions Calendar
    let contribData = snapshotData.contributions;
    try {
      const contribRes = await fetch(`https://github-contributions-api.jogruber.de/v4/${USERNAME}`);
      if (contribRes.ok) {
        const c = await contribRes.json();
        contribData = {
          total: c.total || {},
          days: c.contributions || [],
          last52Weeks: (c.contributions || []).slice(-365),
        };
      }
    } catch {
      // Use snapshot calendar fallback
    }

    // 4. Compute Streaks
    const streaks = computeStreaks(contribData.days || []);

    // 5. Compute Weekly Commits
    const weeklyCommits = computeWeeklyCommits(contribData.days || []);

    // 6. Languages from snapshot or computed
    const languages = snapshotData.languages || [];

    // 7. Recent Public Events
    let events = snapshotData.events || [];
    try {
      const eventsRes = await fetch(`https://api.github.com/users/${USERNAME}/events?per_page=20`, { headers });
      if (eventsRes.ok) {
        const rawEvents = await eventsRes.json();
        if (Array.isArray(rawEvents) && rawEvents.length > 0) {
          events = rawEvents
            .filter((e) => ["PushEvent", "CreateEvent", "WatchEvent", "PullRequestEvent", "IssuesEvent"].includes(e.type))
            .slice(0, 10)
            .map((e) => {
              let summary = "";
              if (e.type === "PushEvent") {
                const count = e.payload?.commits?.length || 1;
                const msg = e.payload?.commits?.[0]?.message?.split("\n")[0] || "Code updates";
                summary = `Pushed ${count} commit${count > 1 ? "s" : ""}: "${msg.slice(0, 48)}${msg.length > 48 ? "…" : ""}"`;
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
        }
      }
    } catch {
      // Keep snapshot events
    }

    // 8. Top / Pinned Repos
    const topRepos = (nonForkRepos.length > 0 ? nonForkRepos : snapshotData.repos)
      .sort((a, b) => {
        const aMapped = PROJECT_SLUG_MAP[a.name] ? 1 : 0;
        const bMapped = PROJECT_SLUG_MAP[b.name] ? 1 : 0;
        if (bMapped !== aMapped) return bMapped - aMapped;
        return (b.stargazers_count || 0) - (a.stargazers_count || 0);
      })
      .slice(0, 6)
      .map((r) => ({
        name: r.name,
        description: r.description || `Full stack repository architected with ${r.language || "modern technologies"}.`,
        url: r.html_url || r.url,
        homepage: r.homepage || null,
        stars: r.stargazers_count || r.stars || 0,
        forks: r.forks_count || r.forks || 0,
        language: r.language || "Code",
        languageColor: snapshotData.languages?.find((l) => l.name === r.language)?.color || "#8B7CFF",
        updatedAt: r.updated_at || r.updatedAt,
        topics: r.topics && r.topics.length > 0 ? r.topics : [r.language?.toLowerCase() || "software"],
        projectSlug: PROJECT_SLUG_MAP[r.name] || null,
      }));

    const totalStars = (Array.isArray(repos) ? repos : []).reduce((acc, r) => acc + (r.stargazers_count || 0), 0);
    const totalContribYear = (contribData.days || []).slice(-365).reduce((acc, d) => acc + (d.count || 0), 0);
    const commitsThisYear = (contribData.total && (contribData.total["2026"] || contribData.total[new Date().getFullYear().toString()])) || totalContribYear;

    return res.status(200).json({
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
        totalStars,
        totalContributions: totalContribYear,
        currentStreak: streaks.currentStreak,
        longestStreak: streaks.longestStreak,
        pullRequests: snapshotData.stats.pullRequests,
        issues: snapshotData.stats.issues,
        commitsThisYear,
      },
      contributions: contribData,
      languages,
      repos: topRepos,
      events,
      weeklyCommits,
      meta: {
        fetchedAt: new Date().toISOString(),
        isFallback: false,
        source: "vercel-serverless",
      },
    });
  } catch (error) {
    console.warn("[api/github] Serving fallback snapshot:", error.message);
    return res.status(200).json({
      ...snapshotData,
      meta: {
        ...snapshotData.meta,
        isFallback: true,
        error: error.message,
      },
    });
  }
}
