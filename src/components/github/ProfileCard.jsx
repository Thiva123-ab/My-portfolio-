import { ExternalLink, MapPin, Building, Calendar, Users, Activity } from "lucide-react";
import Card from "../Card.jsx";
import { formatRelativeTime } from "../../lib/github/calc.js";

export default function ProfileCard({ profile, lastActive }) {
  if (!profile) return null;

  const activeLabel = formatRelativeTime(lastActive || profile.lastActive);

  return (
    <Card className="gh-card gh-profile-card">
      {/* Top Header: Avatar + Identity */}
      <div className="gh-profile-header">
        <div className="gh-avatar-wrap">
          <img
            src={profile.avatarUrl}
            alt={profile.name}
            className="gh-avatar"
            width={68}
            height={68}
            loading="lazy"
          />
          <span className="gh-avatar-ring" aria-hidden="true" />
        </div>

        <div className="gh-profile-identity">
          <div className="gh-profile-name-row">
            <h3 className="gh-profile-name">{profile.name}</h3>
            <span className="gh-handle">@{profile.login}</span>
          </div>

          <div className="gh-active-badge" title={`Last active: ${activeLabel}`}>
            <span className="gh-active-pulse">
              <span className="gh-active-pulse-ring" />
              <span className="gh-active-pulse-dot" />
            </span>
            <span>Active {activeLabel}</span>
          </div>
        </div>
      </div>

      {/* Bio */}
      {profile.bio && <p className="gh-profile-bio">“{profile.bio}”</p>}

      {/* Metadata pills */}
      <div className="gh-profile-meta-list">
        {profile.company && (
          <div className="gh-meta-pill" title="Organization / University">
            <Building size={14} className="gh-meta-icon" />
            <span>{profile.company}</span>
          </div>
        )}
        {profile.location && (
          <div className="gh-meta-pill" title="Location">
            <MapPin size={14} className="gh-meta-icon" />
            <span>{profile.location}</span>
          </div>
        )}
        <div className="gh-meta-pill" title="Joined GitHub">
          <Calendar size={14} className="gh-meta-icon" />
          <span>Joined {profile.joinedYear}</span>
        </div>
        <div className="gh-meta-pill" title="Network">
          <Users size={14} className="gh-meta-icon" />
          <span>{profile.followers} followers · {profile.following} following</span>
        </div>
      </div>

      {/* Action Footer */}
      <div className="gh-profile-footer">
        <a
          href={profile.htmlUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary btn-sm w-full justify-center"
          data-cursor="hover"
        >
          <span>View on GitHub</span>
          <ExternalLink size={14} />
        </a>
      </div>
    </Card>
  );
}
