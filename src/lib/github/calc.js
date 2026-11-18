/**
 * src/lib/github/calc.js
 *
 * Core computation utilities for GitHub Dashboard metrics.
 */

export const DEFAULT_LANGUAGE_COLORS = {
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

/**
 * Calculates longest and current contribution streaks given an array of day objects: { date: 'YYYY-MM-DD', count: number }
 *
 * @param {Array<{date: string, count: number}>} days
 * @param {Date} [referenceDate=new Date()]
 * @returns {{ currentStreak: number, longestStreak: number }}
 */
export function computeStreaks(days = [], referenceDate = new Date()) {
  if (!Array.isArray(days) || days.length === 0) {
    return { currentStreak: 0, longestStreak: 0 };
  }

  // Sort ascending by date
  const sorted = [...days].sort((a, b) => a.date.localeCompare(b.date));

  let longestStreak = 0;
  let tempStreak = 0;

  for (const day of sorted) {
    if ((day.count || 0) > 0) {
      tempStreak++;
      if (tempStreak > longestStreak) {
        longestStreak = tempStreak;
      }
    } else {
      tempStreak = 0;
    }
  }

  // Current streak (looking backwards from referenceDate or yesterday)
  const refDateStr = referenceDate.toISOString().slice(0, 10);
  const yesterdayDate = new Date(referenceDate.getTime() - 86400000);
  const yesterdayStr = yesterdayDate.toISOString().slice(0, 10);

  const reversed = [...sorted].reverse();
  let currentStreak = 0;
  let streakActive = false;

  for (const day of reversed) {
    if (day.date === refDateStr || day.date === yesterdayStr) {
      if ((day.count || 0) > 0) {
        streakActive = true;
        currentStreak++;
      }
    } else if (streakActive) {
      if ((day.count || 0) > 0) {
        currentStreak++;
      } else {
        break;
      }
    }
  }

  return { currentStreak, longestStreak };
}

/**
 * Computes language breakdown weighted by bytes.
 * Returns top 6 languages + "Other", with percentages.
 *
 * @param {Record<string, number>} languageBytes - e.g. { TypeScript: 733973, JavaScript: 891374 }
 * @param {Record<string, string>} [colorMap=DEFAULT_LANGUAGE_COLORS]
 * @returns {Array<{ name: string, bytes: number, percentage: number, color: string }>}
 */
export function computeLanguagePercentages(languageBytes = {}, colorMap = DEFAULT_LANGUAGE_COLORS) {
  const entries = Object.entries(languageBytes).filter(([, bytes]) => bytes > 0);
  const totalBytes = entries.reduce((acc, [, bytes]) => acc + bytes, 0);

  if (totalBytes === 0) {
    return [];
  }

  const sorted = entries
    .sort((a, b) => b[1] - a[1])
    .map(([name, bytes]) => ({
      name,
      bytes,
      percentage: Number(((bytes / totalBytes) * 100).toFixed(1)),
      color: colorMap[name] || colorMap.Other || "#8B7CFF",
    }));

  if (sorted.length <= 6) {
    return sorted;
  }

  const top6 = sorted.slice(0, 6);
  const otherBytes = sorted.slice(6).reduce((acc, l) => acc + l.bytes, 0);

  if (otherBytes > 0) {
    top6.push({
      name: "Other",
      bytes: otherBytes,
      percentage: Number(((otherBytes / totalBytes) * 100).toFixed(1)),
      color: colorMap.Other || "#8B7CFF",
    });
  }

  return top6;
}

/**
 * Groups daily contributions into 52 weekly totals for area/bar charts.
 *
 * @param {Array<{date: string, count: number}>} days
 * @returns {Array<{ weekStart: string, count: number }>}
 */
export function computeWeeklyCommits(days = []) {
  if (!Array.isArray(days) || days.length === 0) {
    return [];
  }

  const last365 = days.slice(-364); // 52 weeks * 7 days
  const weekly = [];

  for (let i = 0; i < last365.length; i += 7) {
    const chunk = last365.slice(i, i + 7);
    const count = chunk.reduce((acc, d) => acc + (d.count || 0), 0);
    const weekStart = chunk[0]?.date || "";
    weekly.push({ weekStart, count });
  }

  return weekly;
}

/**
 * Returns a human-friendly relative time string (e.g. "2 hours ago", "3 days ago").
 *
 * @param {string|Date} dateInput
 * @param {Date} [now=new Date()]
 * @returns {string}
 */
export function formatRelativeTime(dateInput, now = new Date()) {
  if (!dateInput) return "Recently";
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return "Recently";

  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHours = Math.floor(diffMin / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSec < 60) return "Just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 30) return `${diffDays}d ago`;

  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths < 12) return `${diffMonths}mo ago`;

  const diffYears = Math.floor(diffDays / 365);
  return `${diffYears}y ago`;
}

/**
 * Maps contribution count to level 0..4 for the violet->teal intensity scale.
 *
 * @param {number} count
 * @returns {number} 0 | 1 | 2 | 3 | 4
 */
export function getContributionLevel(count = 0) {
  if (count <= 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 9) return 3;
  return 4;
}
