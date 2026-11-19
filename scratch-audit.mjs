import { chromium } from "playwright";

const browser = await chromium.launch({
  executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  headless: true
});
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });

page.on("console", msg => {
  console.log("CONSOLE " + msg.type() + ": " + msg.text() + " location: " + JSON.stringify(msg.location()));
});

page.on("response", res => {
  if (res.status() >= 400) {
    console.log("HTTP " + res.status() + " on " + res.url());
  }
});

await page.goto("http://localhost:4173", { waitUntil: "networkidle" });
await page.waitForTimeout(1000);
await browser.close();
