import { chromium } from "playwright";

async function inspectTopRight() {
  const browser = await chromium.launch({
    executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    headless: true,
  });

  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto("http://localhost:4173/", { waitUntil: "networkidle" });
  await page.waitForTimeout(500);

  const elements = await page.evaluate(() => {
    const list = [];
    document.querySelectorAll("*").forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top >= 0 && r.top <= 70 && r.right >= 350) {
        list.push({
          tag: el.tagName,
          className: typeof el.className === "string" ? el.className : "",
          rect: { top: Math.round(r.top), right: Math.round(r.right), width: Math.round(r.width), height: Math.round(r.height) },
          outer: el.outerHTML.slice(0, 100),
        });
      }
    });
    return list;
  });

  console.log(JSON.stringify(elements, null, 2));
  await browser.close();
}

inspectTopRight().catch(console.error);
