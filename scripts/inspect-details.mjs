import { chromium } from "playwright";

async function inspect() {
  const browser = await chromium.launch({
    executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    headless: true,
  });

  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto("http://localhost:4173/", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);

  const report = await page.evaluate(() => {
    // 1. Inspect navbar elements
    const navHeader = document.querySelector(".nav-header");
    const navContainer = document.querySelector(".nav-container");
    const navChildren = Array.from(navContainer ? navContainer.children : []).map(el => ({
      tag: el.tagName,
      className: el.className,
      rect: el.getBoundingClientRect(),
      display: window.getComputedStyle(el).display,
    }));

    // 2. Check why 4th element peeks out
    const mobileControls = document.querySelector(".nav-mobile-controls");
    const mobileBtns = Array.from(mobileControls ? mobileControls.children : []).map(el => ({
      tag: el.tagName,
      className: el.className,
      rect: el.getBoundingClientRect(),
      text: el.outerHTML.slice(0, 100),
      display: window.getComputedStyle(el).display,
    }));

    // 3. Inspect Hero row & elements
    const heroIdentity = document.querySelector(".hero-mobile-identity-row");
    const heroMeta = document.querySelector(".hero-mobile-meta");
    const statusPill = document.querySelector(".hero-status-pill");
    const heroPortrait = document.querySelector(".hero-mobile-portrait-wrap");

    // 4. Inspect typing pill
    const typingPill = document.querySelector(".hero-typing-pill");
    const typingInner = document.querySelector(".hero-typing-pill-inner");
    const typingWord = document.querySelector(".hero-typing-word-container");

    // 5. Inspect Marquee
    const marqueeWrap = document.querySelector(".hero-marquee-wrapper");
    const marqueeTrack = document.querySelector(".hero-marquee-track");

    // 6. Inspect About section cards
    const aboutGrid = document.querySelector(".about-grid, .about-content-grid, .about-bento-grid, #about .grid");
    const aboutCard = document.querySelector(".about-card");
    const focusCard = document.querySelector(".about-focus-card, .about-card-focus, [class*='focus']");
    const focusHeader = document.querySelector(".about-focus-header, [class*='focus-header']");

    // 7. Find ANY element whose right > 390
    const overflowing = [];
    document.querySelectorAll("*").forEach(el => {
      const r = el.getBoundingClientRect();
      const style = window.getComputedStyle(el);
      if (style.display === "none" || style.visibility === "hidden") return;
      if (r.right > 390.5) {
        overflowing.push({
          tag: el.tagName,
          className: el.className,
          rect: { left: Math.round(r.left), right: Math.round(r.right), width: Math.round(r.width) },
          computedWidth: style.width,
          overflow: style.overflow,
          snippet: (el.textContent || "").trim().slice(0, 30),
        });
      }
    });

    return {
      navChildren,
      mobileBtns,
      heroIdentity: heroIdentity ? {
        rect: heroIdentity.getBoundingClientRect(),
        metaRect: heroMeta?.getBoundingClientRect(),
        pillRect: statusPill?.getBoundingClientRect(),
        portraitRect: heroPortrait?.getBoundingClientRect(),
      } : null,
      typingPill: typingPill ? {
        pillRect: typingPill.getBoundingClientRect(),
        innerRect: typingInner?.getBoundingClientRect(),
        wordRect: typingWord?.getBoundingClientRect(),
        pillStyle: window.getComputedStyle(typingPill).width,
      } : null,
      marquee: marqueeWrap ? {
        wrapRect: marqueeWrap.getBoundingClientRect(),
        wrapOverflow: window.getComputedStyle(marqueeWrap).overflow,
        trackRect: marqueeTrack?.getBoundingClientRect(),
      } : null,
      about: {
        aboutCard: aboutCard ? {
          rect: aboutCard.getBoundingClientRect(),
          styleWidth: window.getComputedStyle(aboutCard).width,
          maxWidth: window.getComputedStyle(aboutCard).maxWidth,
        } : null,
        focusCard: focusCard ? {
          rect: focusCard.getBoundingClientRect(),
          styleWidth: window.getComputedStyle(focusCard).width,
          maxWidth: window.getComputedStyle(focusCard).maxWidth,
        } : null,
      },
      overflowingCount: overflowing.length,
      overflowing: overflowing.slice(0, 25),
    };
  });

  console.log(JSON.stringify(report, null, 2));
  await browser.close();
}

inspect().catch(console.error);
