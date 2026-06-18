import { chromium } from "playwright";

const URL = process.env.URL || "http://localhost:5173";
const OUT = "/tmp/shots";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
await page.goto(URL, { waitUntil: "networkidle" });
await page.waitForTimeout(1500);

for (const id of ["about", "experience", "skills", "references", "contact"]) {
  await page.evaluate((i) => document.getElementById(i)?.scrollIntoView({ behavior: "instant", block: "start" }), id);
  await page.waitForTimeout(1100);
  await page.screenshot({ path: `${OUT}/sec-${id}.png` });
  console.log("shot", id);
}

// open a reference letter modal
await page.evaluate(() => document.getElementById("references")?.scrollIntoView());
await page.waitForTimeout(600);
const btn = page.getByRole("button", { name: /view full letter/i }).first();
await btn.click();
await page.waitForTimeout(1500);
await page.screenshot({ path: `${OUT}/sec-letter-modal.png` });
console.log("shot letter modal");

await browser.close();
console.log("done");
