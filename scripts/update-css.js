import fs from 'fs';

let css = fs.readFileSync('src/index.css', 'utf8');

const navCss = `  /* ==========================================================================
     NAVIGATION BAR & FULL-SCREEN MOBILE DRAWER (< 1024px vs >= 1024px)
     ========================================================================== */
}

/* Nav Header Master Bar */
.nav-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 64px;
  z-index: 9999;
  background: rgba(7, 7, 12, 0.75);
  -webkit-backdrop-filter: blur(18px);
  backdrop-filter: blur(18px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  transition: background 0.25s ease, border-color 0.25s ease, height 0.25s ease;
  display: flex;
  align-items: center;
}

@media (min-width: 1024px) {
  .nav-header {
    height: 72px;
  }
  .nav-header.is-scrolled {
    background: rgba(7, 7, 12, 0.88);
    border-bottom-color: rgba(255, 255, 255, 0.12);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35);
  }
}

.nav-container {
  max-width: var(--maxw, 1240px);
  width: 100%;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

@media (min-width: 640px) {
  .nav-container {
    padding: 0 32px;
  }
}

/* 1. Single Brand Lockup (Never duplicated on mobile) */
.nav-brand {
  display: inline-flex;
  align-items: baseline;
  gap: 6px;
  text-decoration: none;
  font-family: var(--font-display, "Space Grotesk", sans-serif);
  font-weight: 700;
  font-size: 1.15rem;
  letter-spacing: -0.02em;
  color: #f4f4f8;
  cursor: pointer;
  user-select: none;
  flex-shrink: 0;
  transition: opacity 0.2s ease;
}

.nav-brand:hover {
  opacity: 0.9;
}

.nav-brand .logo-mark {
  color: #2de2c8;
  font-size: 0.85rem;
  line-height: 1;
  text-shadow: 0 0 10px rgba(45, 226, 200, 0.6);
  transform: translateY(-1px);
}

.nav-brand .brand-word {
  color: #ffffff;
}

.nav-brand .brand-dot {
  color: #8b7cff;
  font-weight: 800;
}

/* 2. Desktop Nav Links & Controls (>= 1024px) */
.nav-desktop-links {
  display: none;
  align-items: center;
  gap: 4px;
}

@media (min-width: 1024px) {
  .nav-desktop-links {
    display: flex;
  }
}

.nav-desktop-actions {
  display: none;
  align-items: center;
  gap: 10px;
}

@media (min-width: 1024px) {
  .nav-desktop-actions {
    display: flex;
  }
}

/* 3. Mobile Header Controls (< 1024px) */
.nav-mobile-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

@media (min-width: 1024px) {
  .nav-mobile-controls {
    display: none !important;
  }
}

.mobile-action-btn {
  width: 44px;
  height: 44px;
  min-width: 44px;
  min-height: 44px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.09);
  color: #e5e5eb;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.mobile-action-btn:active {
  transform: scale(0.92);
  background: rgba(255, 255, 255, 0.1);
}

.mobile-action-btn.is-sound-active {
  color: #2de2c8;
  border-color: rgba(45, 226, 200, 0.4);
  box-shadow: 0 0 12px rgba(45, 226, 200, 0.2);
}

/* 4. Animated 2-Line Morphing Hamburger */
.mobile-hamburger-btn {
  width: 44px;
  height: 44px;
  min-width: 44px;
  min-height: 44px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.09);
  color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 0;
  cursor: pointer;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
}

.mobile-hamburger-btn:active {
  transform: scale(0.92);
  background: rgba(255, 255, 255, 0.1);
}

.hamburger-line {
  display: block;
  width: 20px;
  height: 2px;
  background: #ffffff;
  border-radius: 2px;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease, background-color 0.2s ease;
  transform-origin: center;
}

.mobile-hamburger-btn.is-open {
  background: rgba(139, 124, 255, 0.12);
  border-color: rgba(139, 124, 255, 0.4);
}

.mobile-hamburger-btn.is-open .hamburger-line {
  background: #2de2c8;
}

.mobile-hamburger-btn.is-open .line-1 {
  transform: translateY(4px) rotate(45deg);
}

.mobile-hamburger-btn.is-open .line-2 {
  transform: translateY(-4px) rotate(-45deg);
}

/* 5. Mobile Drawer Backdrop & Full-Screen Sheet */
.mobile-drawer-backdrop {
  position: fixed;
  inset: 0;
  top: 64px;
  height: calc(100dvh - 64px);
  width: 100vw;
  background: rgba(7, 7, 12, 0.96);
  -webkit-backdrop-filter: blur(24px);
  backdrop-filter: blur(24px);
  z-index: 9998;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.mobile-drawer-ambient {
  position: absolute;
  top: -100px;
  right: -50px;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(139, 124, 255, 0.2) 0%, rgba(45, 226, 200, 0.08) 50%, transparent 70%);
  filter: blur(60px);
  pointer-events: none;
}

.mobile-drawer-sheet {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 16px 20px calc(env(safe-area-inset-bottom, 0px) + 20px);
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.mobile-drawer-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  margin-bottom: 8px;
}

.drawer-brand {
  font-family: var(--font-display, "Space Grotesk", sans-serif);
  font-size: 0.95rem;
  font-weight: 700;
  color: #f4f4f8;
  display: flex;
  align-items: center;
  gap: 4px;
}

.drawer-brand .logo-mark {
  color: #2de2c8;
}

.drawer-brand .brand-dot {
  color: #8b7cff;
}

.drawer-eyebrow {
  font-family: var(--font-mono, monospace);
  font-size: 0.68rem;
  letter-spacing: 0.12em;
  color: rgba(255, 255, 255, 0.4);
}

/* Numbered Drawer Links */
.mobile-drawer-links {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
  padding: 6px 0;
}

.mobile-drawer-link-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 11px 12px;
  border-radius: 12px;
  background: transparent;
  border: 1px solid transparent;
  color: rgba(255, 255, 255, 0.78);
  font-family: var(--font-display, "Space Grotesk", sans-serif);
  font-size: 1.15rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  text-align: left;
  cursor: pointer;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  width: 100%;
}

.mobile-drawer-link-btn:active {
  background: rgba(255, 255, 255, 0.06);
  transform: translateX(4px);
  color: #ffffff;
}

.mobile-drawer-link-btn.is-active {
  background: rgba(139, 124, 255, 0.12);
  border-color: rgba(139, 124, 255, 0.3);
  color: #ffffff;
}

.mobile-link-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.mobile-link-num {
  font-family: var(--font-mono, monospace);
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  color: #8b7cff;
  opacity: 0.8;
  min-width: 20px;
}

.mobile-drawer-link-btn.is-active .mobile-link-num {
  color: #2de2c8;
  opacity: 1;
}

.mobile-link-label {
  line-height: 1.2;
}

.mobile-link-dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #2de2c8;
  box-shadow: 0 0 8px #2de2c8;
  margin-left: 4px;
}

.mobile-link-arrow {
  color: rgba(255, 255, 255, 0.35);
  transition: transform 0.2s ease, color 0.2s ease;
}

.mobile-drawer-link-btn:active .mobile-link-arrow,
.mobile-drawer-link-btn.is-active .mobile-link-arrow {
  color: #2de2c8;
  transform: translate(2px, -2px);
}

/* Drawer Footer */
.mobile-drawer-footer {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 14px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  margin-top: auto;
}

.mobile-drawer-cv-btn {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  border-radius: 14px;
  text-decoration: none;
  background: linear-gradient(135deg, #7c5cff, #2de2c8);
  color: #07070c;
  box-shadow: 0 4px 20px rgba(124, 92, 255, 0.35);
}

.mobile-drawer-cv-btn:active {
  transform: scale(0.98);
}

.mobile-drawer-socials {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  width: 100%;
}

.mobile-social-btn {
  height: 44px;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
}

.mobile-social-btn:active {
  transform: scale(0.92);
  background: rgba(255, 255, 255, 0.1);
  color: #2de2c8;
}

.mobile-drawer-status-chip {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(14, 14, 22, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.06);
  font-size: 0.72rem;
  color: rgba(255, 255, 255, 0.6);
}

.drawer-status-pulse {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #2de2c8;
  box-shadow: 0 0 8px #2de2c8;
  flex-shrink: 0;
  animation: pulse 2s infinite ease-in-out;
}

.drawer-status-text strong {
  color: #ffffff;
  font-family: var(--font-mono, monospace);
  margin-left: 2px;
}

/* ==========================================================================
   MOBILE HERO SECTION (< 1024px)
   Above-the-fold compact identity row, 2-line title, 52px full CTAs
   ========================================================================== */

/* Universal Display Toggles */
.hero-mobile-only {
  display: flex !important;
}

.hero-desktop-only {
  display: none !important;
}

@media (min-width: 1024px) {
  .hero-mobile-only {
    display: none !important;
  }
  .hero-desktop-only {
    display: flex !important;
  }
}

/* Compact Mobile Identity Row */
.hero-mobile-identity-row {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 2px;
}

.hero-mobile-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  flex: 1;
  min-width: 0;
}

.hero-mobile-portrait-wrap {
  flex-shrink: 0;
}

.hero-mobile-portrait-frame {
  width: 104px;
  height: 104px;
  border-radius: 18px;
  background: #0d0d16;
  border: 1.5px solid transparent;
  background-image: linear-gradient(#0d0d16, #0d0d16), linear-gradient(135deg, #8b7cff, #2de2c8);
  background-origin: border-box;
  -webkit-background-clip: padding-box, border-box;
  background-clip: padding-box, border-box;
  padding: 3px;
  box-shadow: 0 0 20px rgba(139, 124, 255, 0.25), 0 0 30px rgba(45, 226, 200, 0.15);
  overflow: hidden;
}

@media (min-width: 400px) {
  .hero-mobile-portrait-frame {
    width: 112px;
    height: 112px;
    border-radius: 20px;
  }
}

.hero-mobile-portrait-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 15px;
  display: block;
}

/* Mobile Hero Buttons Stack */
.hero-mobile-cta-stack {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 4px;
}

.hero-mobile-btn-primary {
  width: 100%;
  height: 52px;
  min-height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 14px;
  background: #ffffff;
  color: #07070c;
  box-shadow: 0 4px 24px rgba(255, 255, 255, 0.18), 0 0 32px rgba(139, 124, 255, 0.2);
  text-decoration: none;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease;
}

.hero-mobile-btn-primary:active {
  transform: scale(0.97);
}

.hero-mobile-cta-row {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.hero-mobile-btn-secondary {
  width: 100%;
  height: 48px;
  min-height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 0.92rem;
  font-weight: 600;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #f4f4f8;
  text-decoration: none;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.hero-mobile-btn-secondary:active {
  transform: scale(0.97);
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(139, 124, 255, 0.4);
}

/* Mobile Dock Navigation Styles */
.mobile-dock-wrapper {
  position: fixed;
  bottom: calc(env(safe-area-inset-bottom, 0px) + 16px);
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  z-index: 9990;
  pointer-events: none;
}

.mobile-dock-pill {
  pointer-events: auto;
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 8px 18px;
  background: rgba(13, 13, 22, 0.88);
  -webkit-backdrop-filter: blur(20px);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 999px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5), 0 0 20px rgba(139, 124, 255, 0.15);
}

.mobile-dock-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  font-size: 0.65rem;
  font-weight: 500;
  padding: 4px 6px;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.mobile-dock-item.is-active,
.mobile-dock-item:active {
  color: #2de2c8;
}
`;

// Locate start of legacy header block
const legacyHeaderIdx = css.indexOf('/* Mobile Header (< 640px) */');
if (legacyHeaderIdx === -1) {
  console.error("Could not find legacy header block");
  process.exit(1);
}

// Find the end: after `@media (min-width: 640px) { ... }`
const legacyEndMarker = '.nav-logo.desktop-tablet-only {\n    display: flex !important;\n  }\n}';
const legacyEndIdx = css.indexOf(legacyEndMarker, legacyHeaderIdx);
if (legacyEndIdx === -1) {
  console.error("Could not find legacy end marker");
  process.exit(1);
}

const endCut = legacyEndIdx + legacyEndMarker.length;

// Replace legacy header block with navCss
css = css.slice(0, legacyHeaderIdx) + navCss + '\n' + css.slice(endCut);

// Now update lines 10655-10786 in hero mobile responsive pass:
const heroMobileStart = '@media (max-width: 1023px) {\n  .hero-section {';
const heroMobileIdx = css.indexOf(heroMobileStart);
if (heroMobileIdx !== -1) {
  // Find where this @media block ends
  const reducedMotionIdx = css.indexOf('/* Reduced Motion preferences */', heroMobileIdx);
  if (reducedMotionIdx !== -1) {
    const updatedHeroMobile = `@media (max-width: 1023px) {
  .hero-section {
    min-height: calc(100dvh - 64px);
    padding-top: calc(env(safe-area-inset-top, 0px) + 72px);
    justify-content: flex-start;
  }

  .hero-container {
    padding-inline: 20px;
    justify-content: flex-start;
  }

  .hero-grid {
    grid-template-columns: 1fr;
    gap: 16px;
    padding-block: 8px 16px;
  }

  .hero-content-col {
    order: 1;
    width: 100%;
    gap: 10px;
  }

  .hero-portrait-col {
    display: none !important;
  }

  .hero-heading-title {
    font-size: clamp(2.35rem, 11.5vw, 3.6rem);
    line-height: 1.04;
  }

  .hero-typing-pill {
    width: 100%;
    padding: 6px 12px;
  }

  .hero-bio-lead {
    font-size: 0.95rem;
    line-height: 1.55;
    margin: 2px 0 6px 0;
  }

  .hero-trust-row {
    font-size: 0.78rem;
    gap: 8px;
  }

  .hero-marquee-wrapper {
    margin-top: 10px;
    padding: 10px 0;
  }
}

`;
    css = css.slice(0, heroMobileIdx) + updatedHeroMobile + css.slice(reducedMotionIdx);
  }
}

fs.writeFileSync('src/index.css', css, 'utf8');
console.log('Successfully updated src/index.css!');
