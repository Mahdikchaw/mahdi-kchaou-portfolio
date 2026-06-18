import { chromium } from "playwright";

const URL = process.env.URL || "http://localhost:5173";
const OUT = "/tmp/shots/review";
import { mkdirSync } from "node:fs";
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ channel: "chrome", headless: true });

async function setTheme(page, theme) {
  await page.evaluate((t) => {
    localStorage.setItem("theme", t);
    document.documentElement.setAttribute("data-theme", t);
  }, theme);
}

async function capture(theme, device, width, height) {
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 2 });
  await page.goto(URL, { waitUntil: "networkidle" });
  await setTheme(page, theme);
  await page.waitForTimeout(400);
  // hero (let reconciliation resolve)
  await page.waitForTimeout(3400);
  await page.screenshot({ path: `${OUT}/${theme}-${device}-hero.png` });

  for (const id of ["about", "experience", "skills", "references", "contact"]) {
    await page.evaluate((i) => document.getElementById(i)?.scrollIntoView({ block: "start" }), id);
    await page.waitForTimeout(900);
    await page.screenshot({ path: `${OUT}/${theme}-${device}-${id}.png` });
  }
  // footer
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(700);
  await page.screenshot({ path: `${OUT}/${theme}-${device}-footer.png` });
  await page.close();
  console.log("captured", theme, device);
}

await capture("dark", "desktop", 1440, 900);
await capture("light", "desktop", 1440, 900);
await capture("dark", "mobile", 390, 844);
await capture("light", "mobile", 390, 844);

// letter modal (dark desktop)
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  await page.goto(URL, { waitUntil: "networkidle" });
  await page.evaluate(() => document.getElementById("references")?.scrollIntoView());
  await page.waitForTimeout(700);
  await page.getByRole("button", { name: /view full letter/i }).first().click();
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `${OUT}/dark-desktop-modal.png` });
  await page.close();
}

await browser.close();
console.log("done");
