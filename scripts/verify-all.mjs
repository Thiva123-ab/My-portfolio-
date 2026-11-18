import { chromium } from "playwright";

const widths = [320, 360, 375, 390, 414, 430, 768, 1024, 1440];
const url = "http://localhost:4173/";

async function verifyAll() {
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
    await page.waitForTimeout(600);

    const data = await page.evaluate((width) => {
      const scrollW = document.documentElement.scrollWidth;
      const clientW = document.documentElement.clientWidth;
      const innerW = window.innerWidth;

      // Find any elements exceeding right edge
      const overflowEls = [];
      document.querySelectorAll("*").forEach(el => {
        const style = window.getComputedStyle(el);
        if (style.display === "none" || style.visibility === "hidden" || style.opacity === "0") return;
        const r = el.getBoundingClientRect();
        if (r.width === 0 && r.height === 0) return;
        // Check if element extends past innerW by > 1.5px
        if (r.right > innerW + 1.5) {
          overflowEls.push({
            tag: el.tagName.toLowerCase(),
            className: typeof el.className === "string" ? el.className.slice(0, 50) : "",
            rectRight: Math.round(r.right),
            width: Math.round(r.width),
            overflow: Math.round(r.right - innerW),
            text: (el.textContent || "").trim().slice(0, 30),
          });
        }
      });

      // Check cards in About
      const aboutCards = [];
      const targets = [
        { name: "About Stats Bento", sel: ".about-stats-bento" },
        { name: "About Profile Card", sel: ".about-card" },
        { name: "Current Focus (NowBlock)", sel: ".now-card" },
        { name: "About Glance Card", sel: ".about-glance-card" },
      ];

      targets.forEach(({ name, sel }) => {
        const el = document.querySelector(sel);
        if (el) {
          const r = el.getBoundingClientRect();
          aboutCards.push({
            name,
            width: Math.round(r.width),
            left: Math.round(r.left),
            right: Math.round(r.right),
            rightGap: Math.round(innerW - r.right),
            leftGap: Math.round(r.left),
            isSymmetrical: Math.abs(Math.round(r.left) - Math.round(innerW - r.right)) <= 2,
          });
        }
      });

      return {
        width,
        scrollW,
        clientW,
        innerW,
        hasHorizontalOverflow: scrollW > clientW,
        overflowingElementCount: overflowEls.length,
        overflowEls: overflowEls.slice(0, 10),
        aboutCards,
      };
    }, w);

    report[w] = data;
    await page.close();
  }

  await browser.close();
  console.log(JSON.stringify(report, null, 2));
}

verifyAll().catch(console.error);
