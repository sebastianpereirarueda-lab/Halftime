// ============================================================
//  Makes ready-to-post Instagram content from the current edition and
//  results, for the site owner only.
//
//  For each story: a 1080x1350 card (illustration, headline, masthead)
//  and a caption. For the latest results: a scoreboard card and caption.
//
//  Everything is ENCRYPTED before it touches the repository, because the
//  repository and the site are public. The owner opens it at /studio/
//  with the passphrase. Encryption: AES-256-GCM, key from the passphrase
//  with PBKDF2-SHA256 (600,000 rounds). Unencrypted cards only ever exist
//  in a temporary folder during the run.
//
//  Needs OWNER_PASSPHRASE (any length; 12+ characters is safer). Without it nothing is made.
//  Uses OPENAI_API_KEY for captions; without it, captions are built from
//  the story summary.
// ============================================================
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath, pathToFileURL } from "node:url";
import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import { z } from "zod";
import { ROOT, readJson, writeJson, readGenerated, log } from "./lib/util.mjs";

const PUBLIC = process.env.HALFTIME_PUBLIC || path.join(ROOT, "public");
const STUDIO = path.join(PUBLIC, "studio", "data");
const NEWS_FILE = path.join(PUBLIC, "data", "news.js");
const RESULTS_FILE = path.join(PUBLIC, "data", "results.js");
const MODEL = process.env.OPENAI_MODEL || "gpt-5.5";
const ITERATIONS = 600000;
const KEEP_POSTS = 40;
const SUGGESTED_PASSPHRASE = 12;

// ---------- encryption (format: 12-byte IV | ciphertext | 16-byte tag) ----------
export function deriveKey(passphrase, salt, iterations = ITERATIONS) {
  return crypto.pbkdf2Sync(passphrase, salt, iterations, 32, "sha256");
}
export function encrypt(key, data) {
  const iv = crypto.randomBytes(12);
  const c = crypto.createCipheriv("aes-256-gcm", key, iv);
  const ct = Buffer.concat([c.update(data), c.final()]);
  return Buffer.concat([iv, ct, c.getAuthTag()]);
}
export function decrypt(key, blob) {
  const d = crypto.createDecipheriv("aes-256-gcm", key, blob.subarray(0, 12));
  d.setAuthTag(blob.subarray(blob.length - 16));
  return Buffer.concat([d.update(blob.subarray(12, blob.length - 16)), d.final()]);
}

const sha = s => crypto.createHash("sha256").update(s).digest("hex").slice(0, 12);
const esc = s => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const longDate = iso => new Date(iso).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
const shortDate = iso => new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", timeZone: "UTC" });

// ---------- card designs ----------
const fontsHref = () => pathToFileURL(path.join(PUBLIC, "assets", "fonts", "fonts.css")).href;
const BASE_CSS = `
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:1080px;height:1350px;overflow:hidden}
body{background:#F7F1E1;color:#1B1A17;font-family:'Libre Caslon Text',Georgia,serif;padding:56px 64px;display:flex;flex-direction:column}
.top{display:flex;justify-content:space-between;gap:24px;font-family:'Courier Prime',monospace;font-size:22px;letter-spacing:3px;text-transform:uppercase;border-bottom:2px solid #1B1A17;padding-bottom:12px}
.mast{text-align:center;font-family:'Abril Fatface',serif;font-size:124px;line-height:1;color:#8C2A1F;padding:20px 0 16px;border-bottom:8px double #1B1A17}
.tag{margin-top:30px;font-family:'Courier Prime',monospace;font-weight:700;font-size:26px;letter-spacing:5px;text-transform:uppercase;color:#8C2A1F}
.foot{margin-top:auto;border-top:8px double #1B1A17;padding-top:16px;display:flex;justify-content:space-between;font-family:'Courier Prime',monospace;font-size:20px;letter-spacing:2px;text-transform:uppercase}
`;

// The first sentence only, so the card stays a card and not an article.
const firstSentence = t => { const m = String(t).match(/^.*?[.!?](?=\s+[A-Z“"‘']|\s*$)/); return (m ? m[0] : String(t)).trim(); };

function storyCard(story, dateIso) {
  const img = story.image && story.image.file ? pathToFileURL(path.join(PUBLIC, story.image.file)).href : null;
  const h = story.headline.length <= 45 ? 76 : story.headline.length <= 70 ? 64 : 56;
  return `<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="${fontsHref()}"><style>${BASE_CSS}
.pic{margin-top:32px;height:560px;border:4px solid #1B1A17;overflow:hidden;background:#EBE2C8}
.pic img{width:100%;height:100%;object-fit:cover;filter:sepia(.25) contrast(1.05)}
h1{font-weight:700;font-size:${h}px;line-height:1.08;margin-top:12px}
.dek{font-style:italic;font-size:${img ? 30 : 34}px;line-height:1.35;margin-top:18px}
</style></head><body>
<div class="top"><span>${esc(longDate(dateIso))}</span><span>News · Scores · Shirts</span></div>
<div class="mast">Halftime</div>
${img ? `<div class="pic"><img src="${img}" alt=""></div>` : ""}
<div class="tag">${esc(story.tag || "")}</div>
<h1>${esc(story.headline)}</h1>
<p class="dek">${esc(firstSentence(story.standfirst || story.summary || ""))}</p>
<div class="foot"><span>Served at the interval</span><span>${img ? "Illustration · AI" : "halftime"}</span></div>
</body></html>`;
}

function resultsCard(results) {
  const dates = results.map(r => r.dateIso).sort();
  const span = shortDate(dates[0]) === shortDate(dates[dates.length - 1]) ? shortDate(dates[0]) : shortDate(dates[0]) + " – " + shortDate(dates[dates.length - 1]);
  const rows = results.map(r => `<div class="row"><span class="c">${esc(r.competition)}</span><span class="h">${esc(r.home)}</span><span class="s">${r.score.home}–${r.score.away}</span><span class="a">${esc(r.away)}</span></div>`).join("");
  return `<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="${fontsHref()}"><style>${BASE_CSS}
.title{text-align:center;font-family:'Abril Fatface',serif;font-size:88px;line-height:1;margin-top:34px}
.sub{text-align:center;font-family:'Courier Prime',monospace;font-size:24px;letter-spacing:4px;text-transform:uppercase;margin:14px 0 18px}
.row{display:grid;grid-template-columns:84px 1fr auto 1fr;align-items:center;gap:18px;padding:16px 0;border-bottom:2px dotted #1B1A17;font-family:'Courier Prime',monospace;font-size:30px;line-height:1.2}
.c{font-size:20px;letter-spacing:2px;color:#8C2A1F;font-weight:700}
.h{text-align:right}.s{font-weight:700;font-size:34px;white-space:nowrap}.a{text-align:left}
</style></head><body>
<div class="top"><span>${esc(span)}</span><span>Scores · API-Football</span></div>
<div class="mast">Halftime</div>
<div class="title">Latest Results</div>
<div class="sub">The scores at the final whistle</div>
${rows}
<div class="foot"><span>Served at the interval</span><span>Match cards on the site</span></div>
</body></html>`;
}

async function renderCards(jobs) {
  const { chromium } = await import("playwright");
  const browser = await chromium.launch();
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "halftime-cards-"));
  try {
    const page = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1 });
    for (const job of jobs) {
      const file = path.join(tmp, job.id + ".html");
      fs.writeFileSync(file, job.html);
      await page.goto(pathToFileURL(file).href, { waitUntil: "load" });
      await page.evaluate(async () => {
        await document.fonts.ready;
        // Make it fit: shrink the summary, then drop it, then shrink the headline.
        const dek = document.querySelector(".dek"), h1 = document.querySelector("h1"), foot = document.querySelector(".foot");
        const last = () => (dek && dek.isConnected ? dek : h1);
        const fits = () => document.body.scrollHeight <= 1350 && (!last() || last().getBoundingClientRect().bottom + 32 <= foot.getBoundingClientRect().top);
        let d = dek ? parseFloat(getComputedStyle(dek).fontSize) : 0;
        while (dek && !fits() && d > 24) { d -= 2; dek.style.fontSize = d + "px"; }
        if (dek && !fits()) dek.remove();
        let size = h1 ? parseFloat(getComputedStyle(h1).fontSize) : 0;
        while (h1 && !fits() && size > 40) { size -= 2; h1.style.fontSize = size + "px"; }
      });
      job.jpeg = await page.screenshot({ type: "jpeg", quality: 90, clip: { x: 0, y: 0, width: 1080, height: 1350 } });
    }
  } finally {
    await browser.close();
    fs.rmSync(tmp, { recursive: true, force: true });   // the unencrypted cards never leave the run
  }
}

// ---------- captions ----------
const CaptionSet = z.object({
  posts: z.array(z.object({
    caption: z.string().describe("2 to 4 short sentences, 40 to 90 words"),
    hashtags: z.array(z.string()).describe("5 to 8 hashtags"),
  })),
});
const CAPTION_RULES = `You write Instagram captions for Halftime, a football paper with the manner of a classic match-day programme: warm, plain-spoken, British English.
For each story, in the same order, write one caption of 2 to 4 short sentences (40 to 90 words) that tells the news and makes people want the full story.
Use only facts stated in the story text you are given. Never add a score, date, fee, quote, statistic or name that is not in it.
No clickbait, no engagement bait ("comment below", "tag a friend"), at most one emoji.
Hashtags: 5 to 8 that fit the story, including #football and #halftime. Only name people or clubs that appear in the story text.`;

async function writeCaptions(stories) {
  const fallback = () => stories.map(s => ({ caption: s.summary || s.standfirst || s.headline, hashtags: ["#football", "#halftime", "#" + String(s.tag || "news").replace(/[^A-Za-z0-9]/g, "")] }));
  if (!process.env.OPENAI_API_KEY || !stories.length) return fallback();
  const text = stories.map((s, i) => `[${i + 1}] ${s.tag} — ${s.headline}\n${s.standfirst || ""}\n${(s.paragraphs || [s.summary]).join("\n")}`).join("\n\n");
  try {
    const client = new OpenAI();
    const r = await client.responses.parse({
      model: MODEL, instructions: CAPTION_RULES, reasoning: { effort: "low" }, max_output_tokens: 4000,
      input: [{ role: "user", content: `Write ${stories.length} captions, one per story:\n\n${text}` }],
      text: { format: zodTextFormat(CaptionSet, "captions") },
    });
    const out = r.output_parsed;
    if (!out || out.posts.length !== stories.length) { log("Caption writer returned the wrong number of captions; using story summaries."); return fallback(); }
    return out.posts;
  } catch (e) {
    log("Caption writer failed (" + e.message + "); using story summaries.");
    return fallback();
  }
}

function storyCaption(c, story) {
  const outlets = [...new Set((story.sources || []).map(s => s.outlet))];
  const tags = [...new Set(c.hashtags.map(t => "#" + String(t).replace(/^#+/, "").replace(/\s+/g, "")))].slice(0, 10);
  return [c.caption.trim(), "",
    outlets.length ? "Reporting: " + outlets.join(", ") + "." : null,
    story.image ? "Illustration created with AI." : null,
    "Full story on Halftime, link in bio.", "", tags.join(" ")].filter(l => l !== null).join("\n");
}

const COMP_TAGS = { PL: "#PremierLeague", LAL: "#LaLiga", SA: "#SerieA", BL: "#Bundesliga", L1: "#Ligue1", UCL: "#ChampionsLeague", UNL: "#NationsLeague" };
function resultsCaption(results) {
  const lines = results.map(r => `${r.home} ${r.score.home}–${r.score.away} ${r.away}`);
  const tags = ["#football", "#results", "#halftime", ...new Set(results.map(r => COMP_TAGS[r.competition]).filter(Boolean))];
  return ["The latest results, served at the interval.", "", ...lines, "", "Scores: API-Football. Match cards and lineups on Halftime, link in bio.", "", tags.join(" ")].join("\n");
}

// ---------- main ----------
async function main() {
  const pass = process.env.OWNER_PASSPHRASE || "";
  if (!pass) { log("OWNER_PASSPHRASE is not set. No Instagram posts made: they are only made when they can be locked."); return; }
  // The owner chose to allow short passphrases; keep a reminder in the log.
  if (pass.length < SUGGESTED_PASSPHRASE) log(`Note: OWNER_PASSPHRASE is shorter than ${SUGGESTED_PASSPHRASE} characters, which is easier to guess. Continuing as the owner chose.`);

  fs.mkdirSync(STUDIO, { recursive: true });
  const infoFile = path.join(STUDIO, "keyinfo.json");
  const manifestFile = path.join(STUDIO, "manifest.bin");
  let info = readJson(infoFile), key, manifest = { posts: [] };
  if (info) {
    key = deriveKey(pass, Buffer.from(info.salt, "base64"), info.iterations);
    try { manifest = JSON.parse(decrypt(key, fs.readFileSync(manifestFile)).toString("utf8")); }
    catch { log("The existing Studio does not open with this passphrase (it was changed). Starting a fresh Studio."); info = null; }
  }
  if (!info) {
    for (const f of fs.readdirSync(STUDIO)) if (f.endsWith(".bin")) fs.unlinkSync(path.join(STUDIO, f));
    info = { version: 1, kdf: "PBKDF2-SHA256", iterations: ITERATIONS, salt: crypto.randomBytes(16).toString("base64"), cipher: "AES-256-GCM" };
    key = deriveKey(pass, Buffer.from(info.salt, "base64"), info.iterations);
    manifest = { posts: [] };
    writeJson(infoFile, info);
  }

  const have = new Set(manifest.posts.map(p => p.id));
  const jobs = [];
  const news = readGenerated(NEWS_FILE);
  if (news && news.lead) {
    const stories = [{ ...news.lead, summary: news.lead.standfirst }, ...(news.stories || [])];
    for (const st of stories) {
      const id = "story-" + sha(st.headline);
      if (!have.has(id)) jobs.push({ id, kind: "story", title: st.headline, story: st, html: storyCard(st, news.updated) });
    }
  }
  const res = readGenerated(RESULTS_FILE);
  if (res && !res.sample && res.results && res.results.length) {
    const shown = res.results.slice(0, 8);
    const id = "results-" + sha(shown.map(r => `${r.id}:${r.score.home}-${r.score.away}`).join("|"));
    if (!have.has(id)) jobs.push({ id, kind: "results", title: "Latest results", results: shown, html: resultsCard(shown), caption: resultsCaption(shown) });
  }
  if (!jobs.length) { log("No new Instagram posts to make."); return; }

  const storyJobs = jobs.filter(j => j.kind === "story");
  const caps = await writeCaptions(storyJobs.map(j => j.story));
  storyJobs.forEach((j, i) => { j.caption = storyCaption(caps[i], j.story); });

  await renderCards(jobs);

  const created = new Date().toISOString();
  const fresh = jobs.map(j => {
    fs.writeFileSync(path.join(STUDIO, j.id + ".bin"), encrypt(key, j.jpeg));
    return { id: j.id, kind: j.kind, title: j.title, caption: j.caption, created, file: j.id + ".bin", filename: "halftime-" + j.id + ".jpg", width: 1080, height: 1350 };
  });
  manifest.posts = [...fresh, ...manifest.posts].slice(0, KEEP_POSTS);
  manifest.updated = created;
  const keep = new Set(manifest.posts.map(p => p.file).concat("manifest.bin"));
  for (const f of fs.readdirSync(STUDIO)) if (f.endsWith(".bin") && !keep.has(f)) fs.unlinkSync(path.join(STUDIO, f));
  fs.writeFileSync(manifestFile, encrypt(key, Buffer.from(JSON.stringify(manifest))));
  log(`Made ${fresh.length} Instagram post(s); the Studio holds ${manifest.posts.length}.`);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  main().catch(err => { console.error("make-social failed:", err.message); process.exit(1); });
}
