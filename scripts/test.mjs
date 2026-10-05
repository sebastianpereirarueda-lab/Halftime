// Offline checks for the data pipeline. Run with: npm test
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { parseFeed, parseDate } from "./fetch-news.mjs";
import { currentSeason, slug } from "./lib/util.mjs";
import { fixText } from "./fetch-scores.mjs";

let failed = 0;
const ok = (c, msg) => { console.log((c ? "PASS " : "FAIL ") + msg); if (!c) failed++; };
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "halftime-"));

// 1. util
ok(currentSeason(new Date("2026-10-05")) === 2026 && currentSeason(new Date("2027-03-01")) === 2026, "season year rolls over in July");
ok(slug("Atlético Madrid-Real Betis-2026-10-04") === "atletico-madrid-real-betis-2026-10-04", "slug strips accents");

ok(fixText("M. Cvetkovi\u00C4\u0087") === "M. Cvetković", "double-encoded names are repaired");
ok(fixText("V. Milinković-Savić") === "V. Milinković-Savić", "correct names are left alone");
ok(fixText(null) === null, "null passes through");

// 2. scores fetcher, offline sample mode
const out = path.join(tmp, "results.js");
execFileSync("node", ["scripts/fetch-scores.mjs", "--sample"], { env: { ...process.env, HALFTIME_OUT: out }, stdio: ["ignore", "pipe", "inherit"] });
const js = fs.readFileSync(out, "utf8");
const data = JSON.parse(js.slice(js.indexOf("= ") + 2).replace(/;\s*$/, ""));
ok(data.sample === true, "sample output is flagged as sample");
ok(data.results.length === 12, `12 sample results (${data.results.length})`);
ok(data.upcoming.length === 6, `6 sample fixtures (${data.upcoming.length})`);
const withGoals = data.matches.filter(m => m.goals.length);
ok(data.matches.every(m => m.lineups && m.lineups.length === 2 && m.lineups[0].startXI.length === 11), "every sample match has two 11-player lineups");
ok(withGoals.every(m => m.goals.every(g => ["goal", "pen", "og"].includes(g.kind))), "goal kinds mapped");
ok(data.matches.every(m => !m.goals.some(g => g.scorer === "Y. Card")), "cards are not counted as goals");
const late = data.matches.flatMap(m => m.goals).find(g => g.extra === 3);
ok(late && late.minute === 90, "stoppage-time goal keeps minute 90 and extra 3");
ok(data.matches.every(m => m.id && m.date && m.competition), "match cards have id, date, competition");
ok(!fs.existsSync(path.join("public", "data", "results.js.tmp")), "no stray files");

// 3. feed parser
const rss = `<?xml version="1.0"?><rss><channel><item><title><![CDATA[Striker &amp; co sign]]></title><link>https://example.org/a</link><description><![CDATA[<p>Summary <b>here</b></p>]]></description><pubDate>Mon, 05 Oct 2026 08:00:00 GMT</pubDate></item><item><title>No link</title></item></channel></rss>`;
const r = parseFeed(rss, "Test");
ok(r.length === 1 && r[0].title === "Striker & co sign" && r[0].summary === "Summary here" && r[0].published.startsWith("2026-10-05"), "RSS item parsed, tags stripped, entity decoded");
const atom = `<feed xmlns="http://www.w3.org/2005/Atom"><entry><title>Atom story</title><link rel="alternate" href="https://example.org/b"/><summary>S</summary><updated>2026-10-05T09:00:00Z</updated></entry></feed>`;
const a = parseFeed(atom, "Test");
ok(a.length === 1 && a[0].link === "https://example.org/b", "Atom entry parsed with href link");

ok(parseDate("Sun, 05 Oct 2026 00:19:00 BST").toISOString() === "2026-10-04T23:19:00.000Z", "BST feed dates parse as UTC+1");
ok(parseDate("Sun, 05 Oct 2026 00:19:00 GMT").toISOString() === "2026-10-05T00:19:00.000Z", "GMT feed dates still parse");
ok(parseDate("not a date") === null, "unparseable dates give null");

// 4. news writer dry run
const cand = path.join(tmp, "cand.json");
fs.writeFileSync(cand, JSON.stringify({ items: [1, 2, 3, 4, 5].map(i => ({ outlet: "Test", title: "Story " + i, link: "https://example.org/" + i, summary: "Sum " + i, published: new Date().toISOString() })) }));
const dry = execFileSync("node", ["scripts/write-news.mjs", "--dry-run"], { env: { ...process.env, HALFTIME_NEWS_CANDIDATES: cand, HALFTIME_NEWS_OUT: path.join(tmp, "news.js") }, encoding: "utf8" });
ok(dry.includes("Dry run: no API call made") && dry.includes("[5] Test — Story 5"), "news writer dry run builds the wire copy and makes no call");
ok(!fs.existsSync(path.join(tmp, "news.js")), "dry run writes nothing");

// 4b. image maker dry run reads an edition and prints one prompt per story
const newsFile = path.join(tmp, "news-with-pictures.js");
fs.writeFileSync(newsFile, "window.HALFTIME_NEWS = " + JSON.stringify({ updated: "x", lead: { headline: "Lead", picture: { scene: "a goalkeeper under floodlights", alt: "goalkeeper" }, sources: [] },
  stories: [1, 2, 3].map(i => ({ headline: "S" + i, picture: { scene: "scene " + i, alt: "alt " + i }, sources: [] })) }) + ";\n");
const imgDry = execFileSync("node", ["scripts/make-images.mjs", "--dry-run"], { env: { ...process.env, HALFTIME_NEWS_OUT: newsFile, HALFTIME_IMAGE_DIR: path.join(tmp, "img") }, encoding: "utf8" });
ok((imgDry.match(/\.jpg /g) || []).length === 4 && imgDry.includes("no text, letters") && imgDry.includes("a goalkeeper under floodlights"), "image maker dry run lists 4 pictures with the house style");
ok(!fs.existsSync(path.join(tmp, "img")), "image maker dry run writes nothing");
const imgSkip = execFileSync("node", ["scripts/make-images.mjs"], { env: { ...process.env, OPENAI_API_KEY: "", HALFTIME_NEWS_OUT: newsFile, HALFTIME_IMAGE_DIR: path.join(tmp, "img") }, encoding: "utf8" });
ok(imgSkip.includes("OPENAI_API_KEY is not set"), "image maker skips without a key");

// 5. without a key, the writer skips cleanly
const skip = execFileSync("node", ["scripts/write-news.mjs"], { env: { ...process.env, OPENAI_API_KEY: "", HALFTIME_NEWS_CANDIDATES: cand, HALFTIME_NEWS_OUT: path.join(tmp, "news.js") }, encoding: "utf8" });
ok(skip.includes("OPENAI_API_KEY is not set"), "news writer skips without a key");
const skip2 = execFileSync("node", ["scripts/fetch-scores.mjs"], { env: { ...process.env, API_FOOTBALL_KEY: "", HALFTIME_OUT: path.join(tmp, "x.js") }, encoding: "utf8" });
ok(skip2.includes("API_FOOTBALL_KEY is not set"), "scores fetcher skips without a key");

fs.rmSync(tmp, { recursive: true, force: true });
console.log(failed ? `\n${failed} FAILURE(S)` : "\nALL PASS");
process.exit(failed ? 1 : 0);
