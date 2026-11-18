import { test, expect } from "@playwright/test";

const viewports = [
  { width: 320, height: 740, name: "320px Micro Mobile" },
  { width: 360, height: 740, name: "360px Small Mobile" },
  { width: 375, height: 812, name: "375px iPhone SE / Mini" },
  { width: 390, height: 844, name: "390px iPhone 12/13/14" },
  { width: 414, height: 896, name: "414px iPhone Plus / XR" },
  { width: 430, height: 932, name: "430px iPhone Pro Max" },
  { width: 768, height: 1024, name: "768px iPad / Tablet" },
  { width: 1024, height: 768, name: "1024px Laptop" },
  { width: 1440, height: 900, name: "1440px Desktop" },
];

for (const vp of viewports) {
  test(`Zero horizontal overflow on ${vp.name} (${vp.width}x${vp.height})`, async ({ page }) => {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto("/", { waitUntil: "networkidle" });
    await page.waitForTimeout(500);

    const metrics = await page.evaluate(() => {
      return {
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
        innerWidth: window.innerWidth,
      };
    });

    // 1. Page must not have horizontal scroll
    expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.clientWidth + 1);

    // 2. Mobile cards must have symmetric margins and fit within container
    if (vp.width < 1024) {
      const cardMetrics = await page.evaluate(() => {
        const targets = [
          document.querySelector(".about-stats-bento"),
          document.querySelector(".about-card"),
          document.querySelector(".now-card"),
        ];

        return targets.filter(Boolean).map(el => {
          const r = el.getBoundingClientRect();
          return {
            width: Math.round(r.width),
            left: Math.round(r.left),
            rightGap: Math.round(window.innerWidth - r.right),
          };
        });
      });

      for (const card of cardMetrics) {
        expect(Math.abs(card.left - card.rightGap)).toBeLessThanOrEqual(2);
      }
    }
  });
}
