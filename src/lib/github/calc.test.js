/**
 * src/lib/github/calc.test.js
 *
 * Unit tests for GitHub metrics calculations.
 * Run with: node src/lib/github/calc.test.js
 */

import test from "node:test";
import assert from "node:assert";
import {
  computeStreaks,
  computeLanguagePercentages,
  computeWeeklyCommits,
  formatRelativeTime,
  getContributionLevel,
} from "./calc.js";

test("computeStreaks calculates current and longest streaks accurately", () => {
  const refDate = new Date("2026-11-18T10:00:00Z");

  const sampleDays = [
    { date: "2026-11-10", count: 0 },
    { date: "2026-11-11", count: 3 },
    { date: "2026-11-12", count: 1 },
    { date: "2026-11-13", count: 5 },
    { date: "2026-11-14", count: 0 },
    { date: "2026-11-15", count: 2 },
    { date: "2026-11-16", count: 4 },
    { date: "2026-11-17", count: 1 },
    { date: "2026-11-18", count: 2 },
  ];

  const result = computeStreaks(sampleDays, refDate);
  assert.strictEqual(result.longestStreak, 4); // Nov 15-18 = 4 days (Nov 11-13 was 3)
  assert.strictEqual(result.currentStreak, 4); // Ends on Nov 18
});

test("computeStreaks handles unbroken streak up to yesterday", () => {
  const refDate = new Date("2026-11-18T10:00:00Z");

  const sampleDays = [
    { date: "2026-11-15", count: 2 },
    { date: "2026-11-16", count: 4 },
    { date: "2026-11-17", count: 1 },
    { date: "2026-11-18", count: 0 }, // No commits yet today
  ];

  const result = computeStreaks(sampleDays, refDate);
  assert.strictEqual(result.currentStreak, 3); // Nov 15, 16, 17
});

test("computeStreaks handles empty or zero days", () => {
  assert.deepStrictEqual(computeStreaks([]), { currentStreak: 0, longestStreak: 0 });
  assert.deepStrictEqual(
    computeStreaks([
      { date: "2026-11-17", count: 0 },
      { date: "2026-11-18", count: 0 },
    ]),
    { currentStreak: 0, longestStreak: 0 }
  );
});

test("computeLanguagePercentages returns sorted top 6 with Other category", () => {
  const rawBytes = {
    Dart: 1000,
    JavaScript: 800,
    TypeScript: 700,
    HTML: 400,
    Kotlin: 300,
    CSS: 200,
    Java: 150,
    "C++": 100,
  };

  const result = computeLanguagePercentages(rawBytes);
  assert.strictEqual(result.length, 7); // top 6 + Other
  assert.strictEqual(result[0].name, "Dart");
  assert.strictEqual(result[6].name, "Other");
  assert.strictEqual(result[6].bytes, 250); // Java(150) + C++(100)

  // Verify total percentages approximate 100%
  const totalPct = result.reduce((acc, l) => acc + l.percentage, 0);
  assert.ok(Math.abs(totalPct - 100) <= 0.5);
});

test("computeWeeklyCommits aggregates into 52 weekly sums", () => {
  const days = Array.from({ length: 364 }, (_, i) => ({
    date: `2026-01-${String(i + 1).padStart(2, "0")}`,
    count: 2,
  }));

  const weekly = computeWeeklyCommits(days);
  assert.strictEqual(weekly.length, 52);
  assert.strictEqual(weekly[0].count, 14); // 7 days * 2
});

test("formatRelativeTime formats past intervals cleanly", () => {
  const now = new Date("2026-11-18T12:00:00Z");

  assert.strictEqual(formatRelativeTime("2026-11-18T11:45:00Z", now), "15m ago");
  assert.strictEqual(formatRelativeTime("2026-11-18T08:00:00Z", now), "4h ago");
  assert.strictEqual(formatRelativeTime("2026-11-17T10:00:00Z", now), "Yesterday");
  assert.strictEqual(formatRelativeTime("2026-11-15T12:00:00Z", now), "3d ago");
});

test("getContributionLevel scales from 0 to 4", () => {
  assert.strictEqual(getContributionLevel(0), 0);
  assert.strictEqual(getContributionLevel(1), 1);
  assert.strictEqual(getContributionLevel(2), 1);
  assert.strictEqual(getContributionLevel(3), 2);
  assert.strictEqual(getContributionLevel(5), 2);
  assert.strictEqual(getContributionLevel(6), 3);
  assert.strictEqual(getContributionLevel(9), 3);
  assert.strictEqual(getContributionLevel(15), 4);
});
