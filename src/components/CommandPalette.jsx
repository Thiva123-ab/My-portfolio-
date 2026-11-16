import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search, FolderGit2, FileText, ArrowRight, X, Mail, ExternalLink } from "lucide-react";
import { PROJECTS } from "../data/projects.js";
import { SITE, CV_HREF } from "../data/site.js";

export default function CommandPalette({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onClose ? onClose(!isOpen) : null;
      }
      if (e.key === "Escape" && isOpen) {
        onClose(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const items = useMemo(() => {
    const list = [
      { id: "nav-home", label: "Go to Home", category: "Navigation", action: () => navigate("/") },
      { id: "nav-projects", label: "View All Projects", category: "Navigation", action: () => navigate("/projects") },
      { id: "nav-exp", label: "View Experience & Timeline", category: "Navigation", action: () => navigate("/experience") },
      { id: "nav-certs", label: "View Certifications", category: "Navigation", action: () => navigate("/certifications") },
      { id: "nav-resume", label: "View Full Resume / CV", category: "Navigation", action: () => navigate("/resume") },
      { id: "nav-contact", label: "Contact & Inquiries", category: "Navigation", action: () => navigate("/contact") },
      {
        id: "act-cv",
        label: "Download Official CV (PDF)",
        category: "Quick Actions",
        action: () => {
          const a = document.createElement("a");
          a.href = CV_HREF;
          a.download = "Thivanka_Tharuka_CV.pdf";
          a.click();
        },
      },
      {
        id: "act-email",
        label: `Copy Email (${SITE.email})`,
        category: "Quick Actions",
        action: () => {
          navigator.clipboard?.writeText(SITE.email);
          alert("Email copied to clipboard!");
        },
      },
      {
        id: "act-github",
        label: "Open GitHub Profile",
        category: "Social Links",
        action: () => window.open(SITE.github, "_blank"),
      },
      {
        id: "act-linkedin",
        label: "Open LinkedIn Profile",
        category: "Social Links",
        action: () => window.open(SITE.linkedin, "_blank"),
      },
      ...PROJECTS.map((p) => ({
        id: `proj-${p.slug}`,
        label: `${p.title} (${p.tags.slice(0, 3).join(", ")})`,
        category: "Projects",
        action: () => {
          if (p.caseStudy) {
            navigate(`/projects/${p.slug}`);
          } else {
            window.open(p.github, "_blank");
          }
        },
      })),
    ];

    if (!query.trim()) return list;
    const q = query.toLowerCase();
    return list.filter(
      (item) => item.label.toLowerCase().includes(q) || item.category.toLowerCase().includes(q)
    );
  }, [query, navigate]);

  if (!isOpen) return null;

  return (
    <div className="cmd-backdrop" onClick={() => onClose(false)}>
      <div className="cmd-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <div className="cmd-header">
          <Search size={18} className="cmd-search-icon" />
          <input
            type="text"
            className="cmd-input"
            placeholder="Type a command or search projects..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          <button className="cmd-close" onClick={() => onClose(false)} aria-label="Close command palette">
            <X size={16} />
          </button>
        </div>
        <div className="cmd-list">
          {items.length === 0 ? (
            <div className="cmd-empty">No results matching &ldquo;{query}&rdquo;</div>
          ) : (
            items.map((item, index) => (
              <button
                key={item.id}
                className="cmd-item"
                onClick={() => {
                  item.action();
                  onClose(false);
                }}
              >
                <div className="cmd-item-left">
                  <span className="cmd-item-category">{item.category}</span>
                  <span className="cmd-item-label">{item.label}</span>
                </div>
                <ArrowRight size={14} className="cmd-item-arrow" />
              </button>
            ))
          )}
        </div>
        <div className="cmd-footer">
          <span>
            <kbd>ESC</kbd> to close
          </span>
          <span>
            <kbd>↑</kbd> <kbd>↓</kbd> to navigate
          </span>
          <span>
            <kbd>↵</kbd> to select
          </span>
        </div>
      </div>
    </div>
  );
}
