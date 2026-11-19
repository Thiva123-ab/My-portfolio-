import { chromium } from "playwright";

const browser = await chromium.launch({
  executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  headless: true
});
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page.goto("http://localhost:4173", { waitUntil: "networkidle" });
await page.waitForTimeout(1000);

const issues = await page.evaluate(() => {
  // Check all elements with role, class, or tag that represents a card or box
  const all = Array.from(document.querySelectorAll("*"));
  const report = [];

  all.forEach(el => {
    const cls = typeof el.className === "string" ? el.className : "";
    if (
      cls.includes("card") ||
      cls.includes("bento") ||
      cls.includes("tile") ||
      cls.includes("pill") ||
      cls.includes("item") ||
      cls.includes("box") ||
      cls.includes("wrap") ||
      cls.includes("grid") ||
      cls.includes("container") ||
      cls.includes("section")
    ) {
      const r = el.getBoundingClientRect();
      // Only consider major layout cards (width >= 200px)
      if (r.width >= 240 && r.height >= 40) {
        const left = Math.round(r.left);
        const rightGap = Math.round(window.innerWidth - r.right);
        const diff = Math.abs(left - rightGap);
        if (diff > 4) {
          report.push({
            tag: el.tagName.toLowerCase(),
            class: cls.split(" ").slice(0, 3).join(" "),
            left,
            rightGap,
            diff,
            width: Math.round(r.width),
            parentSec: el.closest("section")?.id || "none"
          });
        }
      }
    }
  });

  return report;
});

console.log(JSON.stringify(issues, null, 2));
await browser.close();
