import fs from 'fs';

let css = fs.readFileSync('src/index.css', 'utf8');

// 1. Remove max-width: 340px from lines 2702-2705
css = css.replace(
  /\.about-card\s*\{\s*max-width:\s*340px;\s*width:\s*100%;\s*\}/g,
  '.about-card { width: 100%; max-width: 100%; }'
);
css = css.replace(
  /\.about-card\s*\{\s*max-width:\s*440px;\s*margin-inline:\s*auto;\s*\}/g,
  '.about-card { width: 100%; }'
);

// 2. Remove the duplicated block starting at line 9919 to 10583
const duplicateStartMarker = '/* ==========================================================================\r\n   ABOUT SECTION LAYOUT FIX & POLISH (Part A: Sticky Column & Part B: Cards)\r\n   ========================================================================== */';
let dupIdx = css.lastIndexOf(duplicateStartMarker);
if (dupIdx === -1) {
  dupIdx = css.lastIndexOf('/* ==========================================================================\n   ABOUT SECTION LAYOUT FIX & POLISH (Part A: Sticky Column & Part B: Cards)\n   ========================================================================== */');
}

const masterHeroMarker = '/* ==========================================================================\r\n   POLISHED HERO SECTION REDESIGN (Linear / Vercel / Stripe Craft)\r\n   ========================================================================== */';
let heroIdx = css.indexOf(masterHeroMarker, dupIdx);
if (heroIdx === -1) {
  heroIdx = css.indexOf('/* ==========================================================================\n   POLISHED HERO SECTION REDESIGN (Linear / Vercel / Stripe Craft)\n   ========================================================================== */', dupIdx);
}

if (dupIdx !== -1 && heroIdx !== -1 && dupIdx < heroIdx) {
  console.log('Found duplicate block between indices', dupIdx, 'and', heroIdx);
  css = css.slice(0, dupIdx) + css.slice(heroIdx);
}

// 3. Ensure unified site-container and safety overflow rules at the top
const containerRule = `
/* ==========================================================================
   UNIFIED RESPONSIVE CONTAINER & HORIZONTAL OVERFLOW SYSTEM
   ========================================================================== */
html, body {
  overflow-x: clip !important;
  max-width: 100vw;
}

.site-container,
.nav-container,
.hero-container,
.container {
  width: 100% !important;
  max-width: 1200px !important;
  margin-inline: auto !important;
  padding-left: max(20px, env(safe-area-inset-left)) !important;
  padding-right: max(20px, env(safe-area-inset-right)) !important;
  box-sizing: border-box !important;
}

/* Clipping wrappers for ambient glows */
.hero-glow-contain,
.about-glow-contain,
.contact-glow-contain {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
}
`;

// Append comprehensive mobile layout fixes at the bottom
const mobileFixes = `
/* ==========================================================================
   COMPREHENSIVE MOBILE LAYOUT ENGINE (< 1024px)
   Linear / Vercel / Stripe Standard
   ========================================================================== */

@media (max-width: 1023px) {
  /* 1. Global Card Consistency & Symmetry */
  .about-card,
  .about-card .tilt,
  .about-stats-bento,
  .now-card,
  .about-subcard,
  .about-mobile-highlights > *,
  .about-mobile-profile-wrap {
    width: 100% !important;
    max-width: 100% !important;
    margin-inline: 0 !important;
    box-sizing: border-box !important;
  }

  /* 2. About Section Responsive Flow */
  .about-grid {
    display: flex !important;
    flex-direction: column !important;
    width: 100% !important;
    gap: 20px !important;
  }

  .about-text-col {
    width: 100% !important;
    max-width: 100% !important;
    min-width: 0 !important;
    display: flex !important;
    flex-direction: column !important;
    gap: 20px !important;
  }

  .about-desktop-only {
    display: none !important;
  }

  .about-mobile-only {
    display: flex !important;
    flex-direction: column !important;
    gap: 20px !important;
    width: 100% !important;
    max-width: 100% !important;
  }

  .about-card .tilt-inner {
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    text-align: center !important;
    padding: 24px 20px !important;
    width: 100% !important;
  }

  .about-card .tilt-list {
    width: 100% !important;
    max-width: 300px !important;
    margin: 14px auto 0 !important;
  }

  .about-stats-bento {
    grid-template-columns: 1fr !important;
    gap: 14px !important;
    padding: 16px !important;
    margin: 0 !important;
  }

  .about-stat-divider {
    display: none !important;
  }

  /* Current Focus Header Wrapping Fix */
  .now-card-top {
    display: flex !important;
    flex-wrap: wrap !important;
    align-items: center !important;
    justify-content: space-between !important;
    gap: 8px !important;
  }

  .now-badge {
    max-width: 100% !important;
    white-space: nowrap !important;
  }

  .now-date {
    font-size: 0.75rem !important;
    color: rgba(255, 255, 255, 0.45) !important;
  }

  /* 3. Hero Section Layout Fixes */
  .hero-section {
    min-height: calc(100svh - 64px) !important;
    padding-top: calc(env(safe-area-inset-top, 0px) + 72px) !important;
    justify-content: flex-start !important;
    overflow: hidden !important;
  }

  .hero-container {
    padding-left: max(20px, env(safe-area-inset-left)) !important;
    padding-right: max(20px, env(safe-area-inset-right)) !important;
    box-sizing: border-box !important;
  }

  .hero-grid {
    grid-template-columns: 1fr !important;
    gap: 12px !important;
    padding-block: 4px 14px !important;
    width: 100% !important;
    max-width: 100% !important;
  }

  .hero-content-col {
    order: 1 !important;
    width: 100% !important;
    max-width: 100% !important;
    min-width: 0 !important;
    gap: 10px !important;
  }

  .hero-portrait-col {
    display: none !important;
  }

  .hero-desktop-only {
    display: none !important;
  }

  .hero-mobile-only {
    display: flex !important;
  }

  /* Compact Identity Row Sizing Fix */
  .hero-mobile-identity-row {
    width: 100% !important;
    max-width: 100% !important;
    min-width: 0 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
    gap: 12px !important;
    margin-bottom: 4px !important;
    box-sizing: border-box !important;
  }

  .hero-mobile-meta {
    display: flex !important;
    flex-direction: column !important;
    align-items: flex-start !important;
    gap: 6px !important;
    min-width: 0 !important;
    flex: 1 1 auto !important;
  }

  .hero-mobile-portrait-wrap {
    flex-shrink: 0 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
  }

  .hero-mobile-portrait-frame {
    width: clamp(76px, 20vw, 96px) !important;
    height: clamp(76px, 20vw, 96px) !important;
    aspect-ratio: 1 / 1 !important;
    border-radius: 18px !important;
    background: #0d0d16 !important;
    border: 1.5px solid transparent !important;
    background-image: linear-gradient(#0d0d16, #0d0d16), linear-gradient(135deg, #8b7cff, #2de2c8) !important;
    background-origin: border-box !important;
    -webkit-background-clip: padding-box, border-box !important;
    background-clip: padding-box, border-box !important;
    padding: 2.5px !important;
    box-shadow: 0 0 16px rgba(139, 124, 255, 0.25), 0 0 24px rgba(45, 226, 200, 0.15) !important;
    overflow: hidden !important;
    box-sizing: border-box !important;
  }

  .hero-mobile-portrait-img {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
    border-radius: 15px !important;
    display: block !important;
  }

  .hero-status-pill {
    max-width: 100% !important;
    padding: 4px 10px !important;
    font-size: clamp(0.68rem, 2.5vw, 0.78rem) !important;
    white-space: nowrap !important;
  }

  .hero-heading-title {
    font-size: clamp(2.35rem, 11vw, 3.6rem) !important;
    line-height: 1.05 !important;
    word-break: break-word !important;
  }

  /* Typing Pill Overflow Fix */
  .hero-typing-wrap {
    width: 100% !important;
    max-width: 100% !important;
    min-width: 0 !important;
  }

  .hero-typing-pill {
    display: inline-flex !important;
    max-width: 100% !important;
    min-width: 0 !important;
    width: auto !important;
    padding: 6px 14px !important;
    border-radius: 9999px !important;
    background: rgba(255, 255, 255, 0.03) !important;
    border: 1px solid rgba(255, 255, 255, 0.08) !important;
    box-sizing: border-box !important;
  }

  .hero-typing-pill-inner {
    display: inline-flex !important;
    align-items: center !important;
    gap: 8px !important;
    max-width: 100% !important;
    min-width: 0 !important;
  }

  .hero-typing-prefix {
    font-family: var(--font-mono, monospace) !important;
    font-size: 0.7rem !important;
    letter-spacing: 0.08em !important;
    color: rgba(255, 255, 255, 0.6) !important;
    flex-shrink: 0 !important;
  }

  .hero-typing-word-container {
    display: inline-flex !important;
    align-items: center !important;
    min-width: 0 !important;
    overflow: hidden !important;
    flex: 1 !important;
  }

  .hero-typing-word {
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    font-weight: 600 !important;
  }

  .hero-bio-lead {
    width: 100% !important;
    max-width: 100% !important;
    font-size: 0.95rem !important;
    line-height: 1.6 !important;
    text-wrap: pretty !important;
    overflow-wrap: anywhere !important;
    margin: 2px 0 6px 0 !important;
  }

  .hero-mobile-cta-stack {
    width: 100% !important;
    display: flex !important;
    flex-direction: column !important;
    gap: 10px !important;
    margin-top: 4px !important;
  }

  .hero-mobile-btn-primary {
    width: 100% !important;
    height: 52px !important;
    min-height: 52px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    font-size: 1rem !important;
    font-weight: 600 !important;
    border-radius: 14px !important;
  }

  .hero-mobile-cta-row {
    width: 100% !important;
    display: grid !important;
    grid-template-columns: 1fr 1fr !important;
    gap: 10px !important;
  }

  .hero-mobile-btn-secondary {
    width: 100% !important;
    height: 48px !important;
    min-height: 48px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    font-size: 0.92rem !important;
    font-weight: 600 !important;
    border-radius: 12px !important;
  }

  .hero-trust-row {
    display: flex !important;
    flex-wrap: wrap !important;
    align-items: center !important;
    gap: 6px 10px !important;
    width: 100% !important;
    max-width: 100% !important;
    overflow: hidden !important;
    font-size: 0.78rem !important;
  }

  .hero-marquee-wrapper {
    width: 100% !important;
    max-width: 100% !important;
    overflow: hidden !important;
    position: relative !important;
    margin-top: 10px !important;
    padding: 10px 0 !important;
  }
}

/* Sub-360px micro screens (e.g. 320px) */
@media (max-width: 359px) {
  .hero-typing-pill {
    border-radius: 12px !important;
    padding: 6px 10px !important;
  }
  .hero-typing-pill-inner {
    flex-direction: column !important;
    align-items: flex-start !important;
    gap: 2px !important;
  }
  .hero-mobile-identity-row {
    gap: 8px !important;
  }
  .hero-status-pill {
    padding: 3px 8px !important;
    font-size: 0.65rem !important;
  }
  .hero-mobile-portrait-frame {
    width: 76px !important;
    height: 76px !important;
  }
}

/* Optional center alignment on mobile */
.mobile-align-center.hero-content-col {
  align-items: center !important;
  text-align: center !important;
}
.mobile-align-center .hero-mobile-identity-row {
  flex-direction: column !important;
  align-items: center !important;
  text-align: center !important;
  gap: 12px !important;
}
.mobile-align-center .hero-mobile-meta {
  align-items: center !important;
}
.mobile-align-center .hero-eyebrow-mono {
  justify-content: center !important;
}
.mobile-align-center .hero-heading-title {
  text-align: center !important;
}
.mobile-align-center .hero-name-line {
  justify-content: center !important;
}
.mobile-align-center .hero-typing-wrap {
  display: flex !important;
  justify-content: center !important;
}
.mobile-align-center .hero-bio-lead {
  text-align: center !important;
}
.mobile-align-center .hero-trust-row {
  justify-content: center !important;
}

@media (min-width: 1024px) {
  .about-mobile-only {
    display: none !important;
  }
  .about-desktop-only {
    display: block !important;
  }
}
`;

css = containerRule + '\n' + css + '\n' + mobileFixes;

fs.writeFileSync('src/index.css', css, 'utf8');
console.log('Successfully updated src/index.css with unified responsive engine!');
