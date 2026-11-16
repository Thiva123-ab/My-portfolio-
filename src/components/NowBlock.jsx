import { Clock, Sparkles, BookOpen, Hammer } from "lucide-react";
import { NOW } from "../data/now.js";

export default function NowBlock() {
  return (
    <div className="now-card">
      <div className="now-card-top">
        <div className="now-badge">
          <span className="ping-teal" />
          <span>CURRENT FOCUS · NOW</span>
        </div>
        <span className="now-date">Updated: {NOW.lastUpdated}</span>
      </div>

      <h3 className="now-headline">{NOW.headline}</h3>
      <p className="now-status">{NOW.status}</p>

      <div className="now-items-grid">
        {NOW.currentFocus.map((item, idx) => (
          <div key={idx} className="now-item">
            <div className="now-item-tag">
              {item.label === "Building" && <Hammer size={14} className="tag-icon" />}
              {item.label === "Learning" && <Sparkles size={14} className="tag-icon" />}
              {item.label.includes("Reading") && <BookOpen size={14} className="tag-icon" />}
              <span>{item.label}</span>
            </div>
            <p className="now-item-text">{item.text}</p>
          </div>
        ))}
      </div>

      <div className="now-footer-callout">
        <span className="now-label">Open For:</span>
        <span className="now-value">{NOW.availableFor}</span>
      </div>
    </div>
  );
}
