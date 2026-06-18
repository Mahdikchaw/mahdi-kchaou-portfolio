import { chromium } from "playwright";

const html = `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400..600;1,9..144,400..600&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
  *{margin:0;box-sizing:border-box}
  body{width:1200px;height:630px;background:#070b16;color:#e9f0fb;font-family:'Fraunces',serif;
    position:relative;overflow:hidden}
  .glow{position:absolute;border-radius:50%;filter:blur(120px)}
  .g1{width:700px;height:500px;background:rgba(30,157,242,.18);top:-160px;left:-120px}
  .g2{width:560px;height:460px;background:rgba(99,102,241,.20);bottom:-180px;right:-120px}
  .grid{position:absolute;inset:0;opacity:.5;
    background-image:linear-gradient(#1b2942 1px,transparent 1px),linear-gradient(90deg,#1b2942 1px,transparent 1px);
    background-size:64px 64px;
    -webkit-mask-image:radial-gradient(ellipse 80% 70% at 30% 40%,#000 30%,transparent 75%)}
  .wrap{position:relative;padding:80px;height:100%;display:flex;flex-direction:column;justify-content:center}
  .eyebrow{font-family:'IBM Plex Mono',monospace;font-size:20px;letter-spacing:.28em;text-transform:uppercase;color:#45c8ff;margin-bottom:28px}
  h1{font-size:82px;font-weight:600;line-height:1.04;letter-spacing:-.5px;max-width:980px}
  .grad{font-style:italic;background:linear-gradient(105deg,#45c8ff,#1e9df2 45%,#8e93f8);-webkit-background-clip:text;background-clip:text;color:transparent}
  .foot{font-family:'IBM Plex Mono',monospace;font-size:22px;color:#93a4c4;margin-top:44px;display:flex;gap:18px;align-items:center}
  .dot{width:8px;height:8px;border-radius:50%;background:#34e3b0}
</style></head>
<body>
  <div class="glow g1"></div><div class="glow g2"></div><div class="grid"></div>
  <div class="wrap">
    <div class="eyebrow">Mahdi Kchaou — Revenue Operations &amp; Data</div>
    <h1>I turn messy pipeline data into <span class="grad">a single source of truth.</span></h1>
    <div class="foot"><span class="dot"></span> Nuremberg, Germany · Salesforce · HubSpot · SQL · Power BI</div>
  </div>
</body></html>`;

const b = await chromium.launch({ channel: "chrome", headless: true });
const p = await b.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await p.setContent(html, { waitUntil: "networkidle" });
await p.waitForTimeout(1200);
await p.screenshot({ path: "public/og.png" });
await b.close();
console.log("og.png written");
