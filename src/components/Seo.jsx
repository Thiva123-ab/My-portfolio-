import { useEffect } from "react";
import { SITE, OG_IMAGE } from "../data/site.js";

export default function Seo({
  title,
  description = SITE.description,
  path = "/",
}) {
  const fullTitle = title
    ? `${title} · ${SITE.name}`
    : `${SITE.name} — ${SITE.role}`;
  const url = `${SITE.url}${path === "/" ? "/" : path}`;

  useEffect(() => {
    document.title = fullTitle;
    const set = (sel, attr, val) => {
      let el = document.head.querySelector(sel);
      if (!el) {
        el = document.createElement("meta");
        if (sel.startsWith('meta[name="')) {
          el.setAttribute("name", sel.slice(11, -2));
        } else if (sel.startsWith('meta[property="')) {
          el.setAttribute("property", sel.slice(15, -2));
        }
        document.head.appendChild(el);
      }
      el.setAttribute(attr, val);
    };
    set('meta[name="description"]', "content", description);
    set('meta[property="og:title"]', "content", fullTitle);
    set('meta[property="og:description"]', "content", description);
    set('meta[property="og:url"]', "content", url);
    set('meta[property="og:image"]', "content", OG_IMAGE);
    set('meta[name="twitter:title"]', "content", fullTitle);
    set('meta[name="twitter:description"]', "content", description);
    set('meta[name="twitter:image"]', "content", OG_IMAGE);
    let link = document.head.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", url);
  }, [fullTitle, description, url]);

  return null;
}
