import { MapPin, Clock, GraduationCap, Sparkles, CheckCircle2 } from "lucide-react";
import useSriLankaTime from "../contact/useSriLankaTime.js";
import { NOW } from "../../data/now.js";
import { SITE } from "../../data/site.js";

export default function AboutGlanceCard() {
  const sriLankaTime = useSriLankaTime();

  return (
    <div className="about-subcard about-glance-card" role="region" aria-label="At a glance details">
      <div className="about-card-eyebrow-row">
        <span className="about-card-eyebrow">AT A GLANCE</span>
        <span className="about-card-badge">VERIFIED</span>
      </div>

      <ul className="about-glance-list">
        {/* 1. Location */}
        <li className="about-glance-item">
          <span className="about-glance-icon-wrap" aria-hidden="true">
            <MapPin size={14} className="text-teal" />
          </span>
          <div className="about-glance-content">
            <span className="about-glance-k">Location</span>
            <span className="about-glance-v">Sri Lanka (Colombo / Western Province)</span>
          </div>
        </li>

        {/* 2. Timezone & Live Colombo Time */}
        <li className="about-glance-item">
          <span className="about-glance-icon-wrap" aria-hidden="true">
            <Clock size={14} className="text-accent-purple" />
          </span>
          <div className="about-glance-content">
            <span className="about-glance-k">Timezone &amp; Local Time</span>
            <div className="about-glance-time-row">
              <span className="about-glance-v">{SITE.timezone || "Asia/Colombo UTC+5:30"}</span>
              <span className="about-glance-time-pill" title="Current local time in Sri Lanka">
                {sriLankaTime}
              </span>
            </div>
          </div>
        </li>

        {/* 3. Degree & Academic Track */}
        <li className="about-glance-item">
          <span className="about-glance-icon-wrap" aria-hidden="true">
            <GraduationCap size={14} className="text-teal" />
          </span>
          <div className="about-glance-content">
            <span className="about-glance-k">Education</span>
            <span className="about-glance-v">BSc (Hons) CS · NSBM Green University (2024–Feb 2028)</span>
          </div>
        </li>

        {/* 4. Availability Status */}
        <li className="about-glance-item">
          <span className="about-glance-icon-wrap" aria-hidden="true">
            <CheckCircle2 size={14} className="text-emerald-400" />
          </span>
          <div className="about-glance-content">
            <span className="about-glance-k">Current Status</span>
            <div className="about-glance-status-row">
              <span className="about-mini-pulse" aria-hidden="true" />
              <span className="about-glance-v font-medium text-teal-light">
                {SITE.availability || "Open to Opportunities"}
              </span>
            </div>
          </div>
        </li>

        {/* 5. Immediate Focus */}
        <li className="about-glance-item">
          <span className="about-glance-icon-wrap" aria-hidden="true">
            <Sparkles size={14} className="text-accent-purple" />
          </span>
          <div className="about-glance-content">
            <span className="about-glance-k">Target Opportunity</span>
            <span className="about-glance-v">{NOW.availableFor}</span>
          </div>
        </li>
      </ul>
    </div>
  );
}
