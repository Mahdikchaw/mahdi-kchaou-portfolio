import { chromium } from "playwright";

const URL = process.env.URL || "http://localhost:5173";
const OUT = process.env.OUT || "/tmp/shots";
const browser = await chromium.launch({ channel: "chrome", headless: true });

async function shoot(name, width, height, { full = false, wait = 3600 } = {}) {
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 2 });
  await page.goto(URL, { waitUntil: "networkidle" });
  await page.waitForTimeout(wait); // let the reconciliation play out + fonts load
  await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: full });
  await page.close();
  console.log("shot", name);
}

await shoot("hero-desktop", 1440, 900);
await shoot("full-desktop", 1440, 900, { full: true });
await shoot("hero-mobile", 390, 844);
await shoot("full-mobile", 390, 844, { full: true });

await browser.close();
console.log("done");
