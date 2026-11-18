import { useState, useMemo, useRef, useEffect } from "react";
import Card from "../Card.jsx";
import { getContributionLevel } from "../../lib/github/calc.js";

const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function ContributionHeatmap({ contributions }) {
  const [selectedYear, setSelectedYear] = useState("all-12m");
  const [hoveredDay, setHoveredDay] = useState(null);
  const scrollContainerRef = useRef(null);

  const availableYears = useMemo(() => {
    if (!contributions?.total) return ["2026", "2025"];
    return Object.keys(contributions.total).sort((a, b) => b.localeCompare(a));
  }, [contributions]);

  // Filter days based on selectedYear
  const filteredDays = useMemo(() => {
    const allDays = contributions?.days || [];
    if (allDays.length === 0) return [];

    if (selectedYear === "all-12m") {
      // Last 52 weeks (364 days)
      return allDays.slice(-364);
    }

    return allDays.filter((d) => d.date.startsWith(selectedYear));
  }, [contributions, selectedYear]);

  // Group filtered days into 7-day columns (weeks)
  const weeks = useMemo(() => {
    if (filteredDays.length === 0) return [];

    const result = [];
    let currentWeek = [];

    // Align start of calendar with the first day's day-of-week
    const firstDay = new Date(filteredDays[0].date);
    const leadingEmptyDays = firstDay.getDay(); // 0 (Sun) to 6 (Sat)

    for (let i = 0; i < leadingEmptyDays; i++) {
      currentWeek.push(null);
    }

    for (const day of filteredDays) {
      currentWeek.push(day);
      if (currentWeek.length === 7) {
        result.push(currentWeek);
        currentWeek = [];
      }
    }

    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push(null);
      }
      result.push(currentWeek);
    }

    return result;
  }, [filteredDays]);

  // Calculate month labels positions across columns
  const monthLabels = useMemo(() => {
    const labels = [];
    let lastMonth = -1;

    weeks.forEach((week, colIndex) => {
      // Find the first valid day in this week
      const validDay = week.find((d) => d !== null);
      if (validDay) {
        const monthIndex = new Date(validDay.date).getMonth();
        if (monthIndex !== lastMonth) {
          labels.push({ colIndex, label: MONTH_NAMES[monthIndex] });
          lastMonth = monthIndex;
        }
      }
    });

    return labels;
  }, [weeks]);

  // On mobile, automatically scroll to the latest contributions (far right)
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) {
      el.scrollLeft = el.scrollWidth;
    }
  }, [weeks]);

  const totalFilteredCount = useMemo(() => {
    return filteredDays.reduce((acc, d) => acc + (d.count || 0), 0);
  }, [filteredDays]);

  return (
    <Card className="gh-card gh-heatmap-card">
      {/* Top Header: Title, Total Count, and Year Switcher */}
      <div className="gh-heatmap-header">
        <div className="gh-heatmap-title-wrap">
          <h3 className="gh-card-title">Contribution Calendar</h3>
          <span className="gh-heatmap-summary-badge">
            <strong>{totalFilteredCount.toLocaleString()}</strong> contributions in{" "}
            {selectedYear === "all-12m" ? "the last 12 months" : selectedYear}
          </span>
        </div>

        {/* Year Switcher */}
        <div className="gh-year-switcher" role="tablist" aria-label="Select contribution year">
          <button
            type="button"
            className={`gh-year-btn ${selectedYear === "all-12m" ? "active" : ""}`}
            onClick={() => setSelectedYear("all-12m")}
          >
            Last 12 Months
          </button>
          {availableYears.map((year) => (
            <button
              key={year}
              type="button"
              className={`gh-year-btn ${selectedYear === year ? "active" : ""}`}
              onClick={() => setSelectedYear(year)}
            >
              {year}
            </button>
          ))}
        </div>
      </div>

      {/* Screen-reader accessible alternative table */}
      <div className="sr-only">
        <h4>Accessible Contribution Summary</h4>
        <p>Total contributions: {totalFilteredCount} in {selectedYear}.</p>
      </div>

      {/* Heatmap Grid Container with Horizontal Scroll */}
      <div className="gh-heatmap-scroll-area" ref={scrollContainerRef}>
        <div className="gh-heatmap-inner">
          {/* Month Header Row */}
          <div className="gh-months-row">
            <span className="gh-col-spacer" />
            <div className="gh-months-grid">
              {monthLabels.map((m, idx) => (
                <span
                  key={idx}
                  className="gh-month-label"
                  style={{ gridColumnStart: m.colIndex + 1 }}
                >
                  {m.label}
                </span>
              ))}
            </div>
          </div>

          {/* Days Grid + Weekday Labels */}
          <div className="gh-grid-body">
            {/* Weekday indicators (Mon, Wed, Fri) */}
            <div className="gh-weekdays-col" aria-hidden="true">
              <span className="gh-weekday-label" />
              <span className="gh-weekday-label">Mon</span>
              <span className="gh-weekday-label" />
              <span className="gh-weekday-label">Wed</span>
              <span className="gh-weekday-label" />
              <span className="gh-weekday-label">Fri</span>
              <span className="gh-weekday-label" />
            </div>

            {/* Heatmap Matrix: 7 rows high, N columns wide */}
            <div className="gh-matrix-cols" role="grid" aria-label="Contribution Activity Matrix">
              {weeks.map((week, colIdx) => (
                <div key={colIdx} className="gh-matrix-col" role="row">
                  {week.map((day, rowIdx) => {
                    if (!day) {
                      return <span key={rowIdx} className="gh-cell gh-cell-empty" />;
                    }

                    const level = getContributionLevel(day.count);
                    const formattedDate = new Date(day.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                    const tooltipText = `${day.count} contribution${day.count === 1 ? "" : "s"} on ${formattedDate}`;

                    return (
                      <button
                        key={day.date}
                        type="button"
                        className={`gh-cell gh-level-${level}`}
                        onMouseEnter={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          setHoveredDay({
                            text: tooltipText,
                            x: rect.left + rect.width / 2,
                            y: rect.top - 8,
                          });
                        }}
                        onMouseLeave={() => setHoveredDay(null)}
                        onFocus={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          setHoveredDay({
                            text: tooltipText,
                            x: rect.left + rect.width / 2,
                            y: rect.top - 8,
                          });
                        }}
                        onBlur={() => setHoveredDay(null)}
                        aria-label={tooltipText}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Tooltip */}
      {hoveredDay && (
        <div
          className="gh-heatmap-tooltip"
          style={{
            position: "fixed",
            left: `${hoveredDay.x}px`,
            top: `${hoveredDay.y}px`,
            transform: "translate(-50%, -100%)",
            pointerEvents: "none",
            zIndex: 9999,
          }}
        >
          {hoveredDay.text}
        </div>
      )}

      {/* Legend Footer */}
      <div className="gh-heatmap-footer">
        <span className="gh-heatmap-note">
          Synced directly from GitHub contribution events
        </span>
        <div className="gh-legend" aria-hidden="true">
          <span className="gh-legend-label">Less</span>
          <span className="gh-cell gh-level-0" />
          <span className="gh-cell gh-level-1" />
          <span className="gh-cell gh-level-2" />
          <span className="gh-cell gh-level-3" />
          <span className="gh-cell gh-level-4" />
          <span className="gh-legend-label">More</span>
        </div>
      </div>
    </Card>
  );
}
