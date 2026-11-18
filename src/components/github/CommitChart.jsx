import { useState, useMemo } from "react";
import Card from "../Card.jsx";

export default function CommitChart({ weeklyCommits = [] }) {
  const [hoveredPoint, setHoveredPoint] = useState(null);

  // Normalize data (52 weeks)
  const data = useMemo(() => {
    if (!weeklyCommits || weeklyCommits.length === 0) return [];
    return weeklyCommits.slice(-52);
  }, [weeklyCommits]);

  const maxCount = useMemo(() => {
    return Math.max(...data.map((d) => d.count || 0), 10);
  }, [data]);

  const totalCommits = useMemo(() => {
    return data.reduce((acc, d) => acc + (d.count || 0), 0);
  }, [data]);

  // Chart dimensions
  const width = 640;
  const height = 180;
  const padding = { top: 20, right: 15, bottom: 25, left: 15 };

  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;

  // Generate SVG path points
  const points = useMemo(() => {
    if (data.length === 0) return [];

    const step = innerWidth / (data.length - 1 || 1);

    return data.map((d, index) => {
      const x = padding.left + index * step;
      const y = padding.top + innerHeight - ((d.count || 0) / maxCount) * innerHeight;
      return { x, y, ...d };
    });
  }, [data, innerWidth, innerHeight, maxCount, padding.left, padding.top]);

  // Create smooth SVG cubic bezier path
  const { linePath, areaPath } = useMemo(() => {
    if (points.length < 2) return { linePath: "", areaPath: "" };

    let line = `M ${points[0].x} ${points[0].y}`;

    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i === 0 ? 0 : i - 1];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[i + 2] || p2;

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      line += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }

    const baselineY = padding.top + innerHeight;
    const area = `${line} L ${points[points.length - 1].x} ${baselineY} L ${points[0].x} ${baselineY} Z`;

    return { linePath: line, areaPath: area };
  }, [points, padding.top, innerHeight]);

  return (
    <Card className="gh-card gh-chart-card">
      <div className="gh-chart-header">
        <div>
          <h3 className="gh-card-title">Weekly Commit Volume</h3>
          <span className="gh-chart-subtitle">
            <strong>{totalCommits.toLocaleString()}</strong> commits across the last 52 weeks
          </span>
        </div>
      </div>

      <div className="gh-chart-svg-wrap">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="gh-svg-chart"
          aria-label="52-week weekly commit velocity chart"
          role="img"
        >
          <defs>
            <linearGradient id="ghAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8B7CFF" stopOpacity="0.45" />
              <stop offset="60%" stopColor="#2DE2C8" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#2DE2C8" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="ghLineGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#8B7CFF" />
              <stop offset="50%" stopColor="#4EA8F3" />
              <stop offset="100%" stopColor="#2DE2C8" />
            </linearGradient>
          </defs>

          {/* Background Grid Lines */}
          <line
            x1={padding.left}
            y1={padding.top}
            x2={width - padding.right}
            y2={padding.top}
            stroke="rgba(255, 255, 255, 0.05)"
            strokeDasharray="4 4"
          />
          <line
            x1={padding.left}
            y1={padding.top + innerHeight / 2}
            x2={width - padding.right}
            y2={padding.top + innerHeight / 2}
            stroke="rgba(255, 255, 255, 0.05)"
            strokeDasharray="4 4"
          />
          <line
            x1={padding.left}
            y1={padding.top + innerHeight}
            x2={width - padding.right}
            y2={padding.top + innerHeight}
            stroke="rgba(255, 255, 255, 0.1)"
          />

          {/* Area fill */}
          {areaPath && (
            <path d={areaPath} fill="url(#ghAreaGrad)" />
          )}

          {/* Line stroke */}
          {linePath && (
            <path
              d={linePath}
              fill="none"
              stroke="url(#ghLineGrad)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

          {/* Interactive Data Points */}
          {points.map((pt, index) => (
            <circle
              key={index}
              cx={pt.x}
              cy={pt.y}
              r={hoveredPoint?.index === index ? 5 : 2.5}
              fill={hoveredPoint?.index === index ? "#2DE2C8" : "#8B7CFF"}
              stroke="#07070c"
              strokeWidth="1.5"
              className="gh-chart-point"
              onMouseEnter={() => setHoveredPoint({ ...pt, index })}
              onMouseLeave={() => setHoveredPoint(null)}
            />
          ))}
        </svg>

        {/* Hover Tooltip Box */}
        {hoveredPoint && (
          <div
            className="gh-chart-hover-pill"
            style={{
              left: `${(hoveredPoint.x / width) * 100}%`,
              top: `${(hoveredPoint.y / height) * 100}%`,
            }}
          >
            <strong>{hoveredPoint.count} commits</strong>
            <span>Week of {hoveredPoint.weekStart}</span>
          </div>
        )}
      </div>
    </Card>
  );
}
