import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, FolderGit2, Github as GithubIcon, FileText, Mail } from "lucide-react";
import { Github } from "./BrandIcons.jsx";

const DOCK_ITEMS = [
  { path: "/", label: "Home", icon: Home },
  { path: "/projects", label: "Projects", icon: FolderGit2 },
  { path: "/github", label: "GitHub", icon: Github },
  { path: "/resume", label: "Resume", icon: FileText },
  { path: "/contact", label: "Contact", icon: Mail },
];

export default function MobileDock() {
  const location = useLocation();
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
    // Hide dock when virtual keyboard appears on mobile
    const handleViewportResize = () => {
      if (window.visualViewport) {
        const isShrunk = window.visualViewport.height < window.innerHeight * 0.75;
        setIsKeyboardOpen(isShrunk);
      }
    };

    window.visualViewport?.addEventListener("resize", handleViewportResize);
    return () => window.visualViewport?.removeEventListener("resize", handleViewportResize);
  }, []);

  if (isKeyboardOpen) return null;

  return (
    <nav className="mobile-dock-wrapper" aria-label="Quick Mobile Dock">
      <div className="mobile-dock-pill">
        {DOCK_ITEMS.map((item) => {
          const isActive = location.pathname === item.path;
          const IconComp = item.icon;

          return (
            <Link
              key={item.label}
              to={item.path}
              className={`mobile-dock-item ${isActive ? "is-active" : ""}`}
              aria-label={item.label}
              title={item.label}
            >
              <IconComp size={20} className="dock-icon" />
              <span className="dock-label">{item.label}</span>
              {isActive && <span className="dock-active-dot" aria-hidden="true" />}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

