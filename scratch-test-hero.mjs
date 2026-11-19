import { chromium } from "playwright";

const browser = await chromium.launch({
  executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  headless: true
});

const mobileSizes = [
  { width: 360, height: 740, name: "360px Small Mobile" },
  { width: 390, height: 844, name: "390px iPhone 13" },
  { width: 430, height: 932, name: "430px iPhone 14 Pro Max" }
];

for (const vp of mobileSizes) {
  const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
  await page.goto("http://localhost:4173", { waitUntil: "networkidle" });
  await page.waitForTimeout(600);

  const heroMetrics = await page.evaluate(() => {
    const photoWrap = document.querySelector(".hero-mobile-photo-wrap");
    const photoRect = photoWrap ? photoWrap.getBoundingClientRect() : null;
    const name = document.querySelector(".hero-mobile-name");
    const nameRect = name ? name.getBoundingClientRect() : null;
    const typingBox = document.querySelector(".hero-typing-stacked-card");
    const typingRect = typingBox ? typingBox.getBoundingClientRect() : null;
    const btnWhite = document.querySelector(".hero-mobile-btn-white");
    const btnWhiteRect = btnWhite ? btnWhite.getBoundingClientRect() : null;
    const btnCv = document.querySelector(".hero-mobile-btn-glass");
    const btnCvRect = btnCv ? btnCv.getBoundingClientRect() : null;
    const infoCard = document.querySelector(".hero-mobile-info-card");
    const infoRect = infoCard ? infoCard.getBoundingClientRect() : null;

    return {
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      photo: photoRect ? {
        left: Math.round(photoRect.left),
        rightGap: Math.round(window.innerWidth - photoRect.right),
        width: Math.round(photoRect.width),
        height: Math.round(photoRect.height)
      } : null,
      name: nameRect ? {
        left: Math.round(nameRect.left),
        rightGap: Math.round(window.innerWidth - nameRect.right),
        width: Math.round(nameRect.width)
      } : null,
      typing: typingRect ? {
        left: Math.round(typingRect.left),
        rightGap: Math.round(window.innerWidth - typingRect.right),
        width: Math.round(typingRect.width),
        height: Math.round(typingRect.height)
      } : null,
      btnWhite: btnWhiteRect ? {
        height: Math.round(btnWhiteRect.height),
        width: Math.round(btnWhiteRect.width)
      } : null,
      btnCv: btnCvRect ? {
        height: Math.round(btnCvRect.height),
        width: Math.round(btnCvRect.width)
      } : null,
      info: infoRect ? {
        left: Math.round(infoRect.left),
        rightGap: Math.round(window.innerWidth - infoRect.right)
      } : null
    };
  });

  console.log(`=== ${vp.name} (${vp.width}x${vp.height}) ===`);
  console.log("Overflow check:", heroMetrics.scrollWidth <= heroMetrics.clientWidth ? "PASS (Zero overflow)" : "FAIL");
  console.log("Photo metrics:", JSON.stringify(heroMetrics.photo));
  console.log("Photo centered:", Math.abs(heroMetrics.photo.left - heroMetrics.photo.rightGap) <= 2 ? "YES" : "NO");
  console.log("Typing Box metrics:", JSON.stringify(heroMetrics.typing));
  console.log("Typing centered:", Math.abs(heroMetrics.typing.left - heroMetrics.typing.rightGap) <= 2 ? "YES" : "NO");
  console.log("Btn White height (52px expected):", heroMetrics.btnWhite?.height);
  console.log("Btn CV height (52px expected):", heroMetrics.btnCv?.height);
  console.log("Info card centered:", Math.abs(heroMetrics.info.left - heroMetrics.info.rightGap) <= 2 ? "YES" : "NO");

  await page.screenshot({ path: `screenshot-mobile-${vp.width}.png` });
  await page.close();
}

// Tablet and Desktop verification
for (const vp of [{ width: 768, height: 1024, name: "Tablet 768px" }, { width: 1280, height: 800, name: "Desktop 1280px" }]) {
  const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
  await page.goto("http://localhost:4173", { waitUntil: "networkidle" });
  await page.waitForTimeout(600);

  const desktopMetrics = await page.evaluate(() => {
    const mobileView = document.querySelector(".hero-mobile-view");
    const desktopView = document.querySelector(".hidden.sm\\:block");
    const desktopGrid = document.querySelector(".hero-grid");
    return {
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      mobileVisible: mobileView ? window.getComputedStyle(mobileView).display !== "none" : false,
      desktopVisible: desktopView ? window.getComputedStyle(desktopView).display !== "none" : false,
      gridVisible: desktopGrid ? window.getComputedStyle(desktopGrid).display !== "none" : false
    };
  });

  console.log(`=== ${vp.name} ===`);
  console.log("Desktop check:", desktopMetrics);
  await page.close();
}

await browser.close();
