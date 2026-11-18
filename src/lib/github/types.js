/**
 * src/lib/github/types.js
 *
 * Schemas and type structures for the GitHub Dashboard.
 *
 * @typedef {Object} GitHubProfile
 * @property {string} login
 * @property {string} name
 * @property {string} avatarUrl
 * @property {string} bio
 * @property {string} company
 * @property {string} location
 * @property {number} joinedYear
 * @property {number} followers
 * @property {number} following
 * @property {string} htmlUrl
 * @property {string} lastActive
 *
 * @typedef {Object} GitHubStats
 * @property {number} publicRepos
 * @property {number} totalStars
 * @property {number} totalContributions
 * @property {number} currentStreak
 * @property {number} longestStreak
 * @property {number} pullRequests
 * @property {number} issues
 * @property {number} commitsThisYear
 *
 * @typedef {Object} ContributionDay
 * @property {string} date - ISO YYYY-MM-DD
 * @property {number} count
 * @property {number} level - 0 to 4
 *
 * @typedef {Object} LanguageStat
 * @property {string} name
 * @property {number} bytes
 * @property {number} percentage
 * @property {string} color
 *
 * @typedef {Object} PinnedRepo
 * @property {string} name
 * @property {string} description
 * @property {string} url
 * @property {string|null} homepage
 * @property {number} stars
 * @property {number} forks
 * @property {string} language
 * @property {string} languageColor
 * @property {string} updatedAt
 * @property {string[]} topics
 * @property {string|null} projectSlug
 *
 * @typedef {Object} ActivityEvent
 * @property {string} id
 * @property {string} type
 * @property {string} repoName
 * @property {string} repoFullName
 * @property {string} repoUrl
 * @property {string} createdAt
 * @property {string} summary
 *
 * @typedef {Object} WeeklyCommit
 * @property {string} weekStart
 * @property {number} count
 *
 * @typedef {Object} GitHubDashboardData
 * @property {GitHubProfile} profile
 * @property {GitHubStats} stats
 * @property {Object} contributions
 * @property {Object} contributions.total
 * @property {ContributionDay[]} contributions.days
 * @property {ContributionDay[]} contributions.last52Weeks
 * @property {LanguageStat[]} languages
 * @property {PinnedRepo[]} repos
 * @property {ActivityEvent[]} events
 * @property {WeeklyCommit[]} weeklyCommits
 * @property {Object} meta
 * @property {string} meta.fetchedAt
 * @property {boolean} meta.isFallback
 * @property {string} meta.source
 */

export const EMPTY_GITHUB_DATA = {
  profile: {
    login: "Thiva123-ab",
    name: "Thivanka Tharuka",
    avatarUrl: "",
    bio: "Full Stack Developer",
    company: "NSBM Green University",
    location: "Sri Lanka",
    joinedYear: 2025,
    followers: 0,
    following: 0,
    htmlUrl: "https://github.com/Thiva123-ab",
    lastActive: new Date().toISOString(),
  },
  stats: {
    publicRepos: 0,
    totalStars: 0,
    totalContributions: 0,
    currentStreak: 0,
    longestStreak: 0,
    pullRequests: 0,
    issues: 0,
    commitsThisYear: 0,
  },
  contributions: {
    total: {},
    days: [],
    last52Weeks: [],
  },
  languages: [],
  repos: [],
  events: [],
  weeklyCommits: [],
  meta: {
    fetchedAt: new Date().toISOString(),
    isFallback: true,
    source: "empty",
  },
};
