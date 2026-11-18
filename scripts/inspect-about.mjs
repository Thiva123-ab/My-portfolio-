import { chromium } from "playwright";

async function inspectAbout() {
  const browser = await chromium.launch({
    executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    headless: true,
  });

  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto("http://localhost:4173/#about", { waitUntil: "networkidle" });
  await page.waitForTimeout(600);

  const data = await page.evaluate(() => {
    const about = document.querySelector("#about");
    const elements = about.querySelectorAll("*");
    const results = [];

    elements.forEach(el => {
      const r = el.getBoundingClientRect();
      const style = window.getComputedStyle(el);
      if (r.width > 100 && (el.className.includes("card") || el.className.includes("bento") || el.className.includes("grid") || el.className.includes("now") || el.className.includes("col") || el.className.includes("wrap"))) {
        results.push({
          tag: el.tagName,
          className: el.className,
          left: Math.round(r.left),
          right: Math.round(r.right),
          width: Math.round(r.width),
          styleWidth: style.width,
          maxWidth: style.maxWidth,
          margin: style.margin,
          padding: style.padding,
        });
      }
    });

    return {
      windowWidth: window.innerWidth,
      aboutRect: about.getBoundingClientRect(),
      results
    };
  });

  console.log(JSON.stringify(data, null, 2));
  await browser.close();
}

inspectAbout().catch(console.error);
