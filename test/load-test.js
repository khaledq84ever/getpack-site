// Smoke-test every extension in real Chromium:
// 1. extension loads (service worker registers)
// 2. popup page renders without console errors
const { chromium } = require("playwright");

const EXTS = [
  ["YTGet", "/home/khaled/projects/youtube-extension"],
  ["TweetGet", "/home/khaled/projects/tweetget-extension"],
  ["InstaGet", "/home/khaled/projects/instagram-extension"],
  ["TikGet", "/home/khaled/projects/tiktok-extension"],
];

(async () => {
  let failures = 0;
  for (const [name, dir] of EXTS) {
    const ctx = await chromium.launchPersistentContext("", {
      headless: true,
      channel: "chromium",
      args: [`--disable-extensions-except=${dir}`, `--load-extension=${dir}`],
    });
    try {
      // wait for the MV3 service worker to register
      let sw = ctx.serviceWorkers()[0];
      if (!sw) sw = await ctx.waitForEvent("serviceworker", { timeout: 15000 });
      const extId = sw.url().split("/")[2];

      const errors = [];
      const page = await ctx.newPage();
      page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
      page.on("pageerror", (e) => errors.push(String(e)));
      await page.goto(`chrome-extension://${extId}/src/popup.html`, {
        waitUntil: "load",
        timeout: 15000,
      });
      await page.waitForTimeout(1500);
      const title = await page.title();
      const bodyLen = (await page.innerText("body").catch(() => "")).length;

      const ok = errors.length === 0 && bodyLen > 0;
      if (!ok) failures++;
      console.log(
        ok ? "PASS" : "FAIL",
        name.padEnd(9),
        `sw=registered popup="${title}" bodyChars=${bodyLen}`,
        errors.length ? "errors=" + JSON.stringify(errors.slice(0, 3)) : "",
      );
    } catch (e) {
      failures++;
      console.log("FAIL", name.padEnd(9), String(e).split("\n")[0]);
    } finally {
      await ctx.close();
    }
  }
  process.exit(failures ? 1 : 0);
})();
