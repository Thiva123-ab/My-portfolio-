import { chromium } from "playwright";

const widths = [320, 360, 375, 390, 412, 430, 768];
const url = "http://localhost:4173/";

async function runDetailedAudit() {
  const browser = await chromium.launch({
    executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    headless: true,
  });

  const report = {};

  for (const w of widths) {
    const page = await browser.newPage({
      viewport: { width: w, height: 844 },
    });
    await page.goto(url, { waitUntil: "networkidle" });
    await page.waitForTimeout(800);

    const res = await page.evaluate((width) => {
      const scrollW = document.documentElement.scrollWidth;
      const clientW = document.documentElement.clientWidth;
      const innerW = window.innerWidth;

      // 1. Find all overflowing elements
      const overflowMap = new Map();
      document.querySelectorAll("*").forEach((el) => {
        const style = window.getComputedStyle(el);
        if (style.display === "none" || style.visibility === "hidden" || style.opacity === "0") return;
        const rect = el.getBoundingClientRect();
        if (rect.width === 0 && rect.height === 0) return;

        if (rect.right > innerW + 0.5) {
          // Identify component/file
          let component = "Unknown";
          if (el.closest(".nav-header")) component = "src/components/Nav.jsx";
          else if (el.closest(".hero-section")) {
            if (el.closest(".hero-marquee-wrapper")) component = "src/components/HeroTechMarquee.jsx";
            else if (el.closest(".hero-typing-wrap")) component = "src/components/TypingBox.jsx";
            else component = "src/components/Hero.jsx";
          } else if (el.closest("#about")) component = "src/components/About.jsx";
          else if (el.closest("#skills")) component = "src/components/Skills.jsx";
          else if (el.closest("#experience")) component = "src/components/Experience.jsx";
          else if (el.closest("#work")) component = "src/components/Work.jsx";
          else if (el.closest("#github")) component = "src/components/github/GitHubSection.jsx";
          else if (el.closest("#certstrip")) component = "src/components/CertificationsStrip.jsx";
          else if (el.closest("#contact")) component = "src/components/contact/ContactSection.jsx";
          else if (el.closest("footer")) component = "src/components/Footer.jsx";
          else if (el.closest(".voice-dock")) component = "src/components/VoiceIntro.jsx";

          const key = `${el.tagName}.${typeof el.className === "string" ? el.className.split(" ")[0] : ""}:${component}`;
          if (!overflowMap.has(key)) {
            overflowMap.set(key, {
              tag: el.tagName.toLowerCase(),
              className: typeof el.className === "string" ? el.className : "",
              id: el.id || null,
              component,
              rectRight: Math.round(rect.right),
              width: Math.round(rect.width),
              overflowAmount: Math.round(rect.right - innerW),
              textSnippet: (el.textContent || "").trim().slice(0, 35),
            });
          }
        }
      });

      // 2. Card and Container Symmetry Analysis
      const containerSelectors = [
        { name: "Navbar Container", sel: ".nav-container" },
        { name: "Hero Container", sel: ".hero-container" },
        { name: "About Container", sel: "#about .container, #about" },
        { name: "About Profile Card", sel: ".about-card" },
        { name: "About Now Card", sel: ".now-card, .about-now-wrap, [class*='now']" },
        { name: "Skills Container", sel: "#skills .container, #skills" },
        { name: "Work Container", sel: "#work .container, #work" },
        { name: "GitHub Container", sel: "#github .container, #github" },
        { name: "Contact Container", sel: "#contact .container, #contact" },
      ];

      const containers = [];
      containerSelectors.forEach(({ name, sel }) => {
        const el = document.querySelector(sel);
        if (el) {
          const r = el.getBoundingClientRect();
          const leftGap = Math.round(r.left);
          const rightGap = Math.round(innerW - r.right);
          containers.push({
            name,
            width: Math.round(r.width),
            leftGap,
            rightGap,
            diff: Math.abs(leftGap - rightGap),
            isSymmetrical: Math.abs(leftGap - rightGap) <= 1,
          });
        }
      });

      return {
        width,
        scrollW,
        clientW,
        innerW,
        hasHorizontalScroll: scrollW > clientW,
        overflowCulprits: Array.from(overflowMap.values()),
        containerGaps: containers,
      };
    }, w);

    report[w] = res;
    await page.close();
  }

  await browser.close();
  console.log(JSON.stringify(report, null, 2));
}

runDetailedAudit().catch(console.error);
