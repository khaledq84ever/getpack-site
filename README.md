# GetPack — Extensions Download Hub

Static site serving the 4 browser extensions with bilingual AR/EN install guide.

**Live:** https://getpack-production.up.railway.app

## The extensions

| Extension | Use online (no install) | Source / GitHub |
|---|---|---|
| 🔴 **YTGet** — YouTube → MP3/MP4 | https://youtube-mp3-downloader-production-c1e2.up.railway.app | [youtube-extension](https://github.com/khaledq84ever/youtube-extension) |
| 🔵 **TweetGet** — Twitter/X videos & images | https://tweetget-production.up.railway.app | [tweetget-extension](https://github.com/khaledq84ever/tweetget-extension) |
| 🩷 **InstaGet** — Instagram videos, Reels & images | https://sunny-creation-production-05bc.up.railway.app | [instagram-extension](https://github.com/khaledq84ever/instagram-extension) |
| ⚫ **TikGet** — TikTok videos, no watermark | https://ravishing-acceptance-production-f209.up.railway.app | [tiktok-extension](https://github.com/khaledq84ever/tiktok-extension) |

Every card on the site has **Add to Browser** (downloads the zip + shows the install guide)
and **Use it online** (jumps to that extension's website — nothing to install).

Deploy: `railway up --ci --service getpack` (files are copied from
`~/www/extensions/`; rebuild zips there first after extension changes).

## Maintenance
- `./build.sh` — rebuild all 4 zips from `~/projects/*-extension`, sync this folder + `~/www/extensions/`, deploy.
- `node test/load-test.js` — load every extension in headless Chromium (needs `npm i playwright` + `npx playwright install chromium`); fails on console errors.
