import Seo from "../components/Seo.jsx";
import { SITE } from "../data/site.js";
import { HR_CHALLENGES, HR_PROFILE, HR_TRACKS } from "../data/hackerrank.js";

const diffClass = {
  Easy: "hr-diff hr-diff-easy",
  Medium: "hr-diff hr-diff-mid",
  Hard: "hr-diff hr-diff-hard",
};

export default function HackerRank() {
  return (
    <>
      <Seo
        title="HackerRank practice"
        description="HackerRank-style practice desk for intern interviews — Java, SQL, and problem solving tied to real repos."
        path="/hackerrank"
      />
      <div className="hr-shell">
        <header className="hr-topbar">
          <div className="hr-brand">
            <span className="hr-logo" aria-hidden="true">
              <svg viewBox="0 0 32 32" width="22" height="22">
                <path d="M8 6h6l10 10-10 10H8l10-10L8 6z" fill="#2ebd59" />
              </svg>
            </span>
            <div>
              <strong>HackerRank desk</strong>
              <span>Prepare · {SITE.name}</span>
            </div>
          </div>
          <nav className="hr-tabs" aria-label="HackerRank sections">
            <span className="is-on">Prepare</span>
            <span>Compete</span>
            <span>Skills</span>
          </nav>
          <a className="hr-open" href={HR_PROFILE.url} target="_blank" rel="noopener noreferrer">
            Open HackerRank
          </a>
        </header>

        <div className="hr-layout">
          <aside className="hr-side">
            <p className="hr-kicker">Tracks</p>
            {HR_TRACKS.map((t) => (
              <article key={t.name} className="hr-track">
                <h3>{t.name}</h3>
                <p>{t.topics}</p>
                <span>{t.level}</span>
              </article>
            ))}
          </aside>

          <section className="hr-main">
            <div className="hr-hero">
              <p className="hr-kicker">Interview practice</p>
              <h1>Problem solving, Java, and SQL — the HackerRank way</h1>
              <p>{HR_PROFILE.note}</p>
            </div>

            <div className="hr-table-head">
              <span>Challenge</span>
              <span>Domain</span>
              <span>Difficulty</span>
              <span>Status</span>
            </div>
            <ul className="hr-list">
              {HR_CHALLENGES.map((c) => (
                <li key={c.id}>
                  <div>
                    <h2>{c.title}</h2>
                    <p>{c.desc}</p>
                  </div>
                  <span className="hr-domain">{c.domain}</span>
                  <span className={diffClass[c.difficulty]}>{c.difficulty}</span>
                  {c.href ? (
                    <a href={c.href} target="_blank" rel="noopener noreferrer">{c.status}</a>
                  ) : (
                    <span className="hr-status">{c.status}</span>
                  )}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}
