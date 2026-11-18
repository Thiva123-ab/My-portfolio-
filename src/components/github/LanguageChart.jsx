import Card from "../Card.jsx";

export default function LanguageChart({ languages = [] }) {
  if (!languages || languages.length === 0) return null;

  return (
    <Card className="gh-card gh-language-card">
      <div className="gh-language-header">
        <h3 className="gh-card-title">Language Distribution</h3>
        <span className="gh-language-subtitle">Weighted by repository code bytes</span>
      </div>

      {/* Proportional Segmented Progress Bar */}
      <div
        className="gh-lang-bar-track"
        role="progressbar"
        aria-label="Code distribution across top languages"
      >
        {languages.map((lang) => (
          <span
            key={lang.name}
            className="gh-lang-bar-segment"
            style={{
              width: `${lang.percentage}%`,
              backgroundColor: lang.color,
            }}
            title={`${lang.name}: ${lang.percentage}% (${(lang.bytes / 1024).toFixed(0)} KB)`}
          />
        ))}
      </div>

      {/* Language Pills & Legend */}
      <div className="gh-lang-legend-grid">
        {languages.map((lang) => (
          <div key={lang.name} className="gh-lang-legend-item">
            <span
              className="gh-lang-dot"
              style={{ backgroundColor: lang.color }}
              aria-hidden="true"
            />
            <span className="gh-lang-name">{lang.name}</span>
            <span className="gh-lang-percent">{lang.percentage}%</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
