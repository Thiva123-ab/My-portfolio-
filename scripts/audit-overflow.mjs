import { chromium } from "playwright";

const widths = [320, 360, 375, 390, 412, 430, 768];
const url = "http://localhost:4173/";

async function runAudit() {
  const browser = await chromium.launch({
    executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    headless: true,
  });

  const results = {};

  for (const w of widths) {
    const page = await browser.newPage({
      viewport: { width: w, height: 844 },
    });

    await page.goto(url, { waitUntil: "networkidle" });
    await page.waitForTimeout(1000); // Wait for animations to settle

    const data = await page.evaluate((width) => {
      const scrollW = document.documentElement.scrollWidth;
      const clientW = document.documentElement.clientWidth;
      const innerW = window.innerWidth;
      const overflows = [];

      const allElements = document.querySelectorAll("*");
      for (const el of allElements) {
        const rect = el.getBoundingClientRect();
        // Ignore hidden elements
        if (rect.width === 0 && rect.height === 0) continue;
        const style = window.getComputedStyle(el);
        if (style.display === "none" || style.visibility === "hidden" || style.opacity === "0") continue;

        // Check if right exceeds window.innerWidth by > 1px
        if (rect.right > innerW + 1) {
          overflows.push({
            tag: el.tagName.toLowerCase(),
            id: el.id || null,
            className: typeof el.className === "string" ? el.className : "",
            rectRight: Math.round(rect.right),
            width: Math.round(rect.width),
            rectLeft: Math.round(rect.left),
            parentClass: el.parentElement && typeof el.parentElement.className === "string" ? el.parentElement.className : "",
            textSnippet: (el.textContent || "").trim().slice(0, 40),
          });
        }
      }

      // Check card / section container gaps
      const containers = [];
      const queryTargets = [
        ".nav-container",
        ".hero-container",
        ".about-section",
        ".about-container",
        ".about-content-grid",
        ".about-card",
        ".about-focus-card",
        ".skills-container",
        ".work-container",
        ".github-container",
        ".cert-container",
        ".contact-container"
      ];

      for (const q of queryTargets) {
        const els = document.querySelectorAll(q);
        els.forEach((el, idx) => {
          const rect = el.getBoundingClientRect();
          const leftGap = Math.round(rect.left);
          const rightGap = Math.round(innerW - rect.right);
          containers.push({
            selector: `${q}[${idx}]`,
            className: typeof el.className === "string" ? el.className : "",
            width: Math.round(rect.width),
            leftGap,
            rightGap,
            diff: Math.abs(leftGap - rightGap)
          });
        });
      }

      return {
        scrollW,
        clientW,
        innerW,
        hasOverflow: scrollW > clientW,
        overflowCount: overflows.length,
        overflows: overflows.slice(0, 30), // Top 30
        containers
      };
    }, w);

    results[w] = data;
    await page.close();
  }

  await browser.close();
  console.log(JSON.stringify(results, null, 2));
}

runAudit().catch(console.error);
