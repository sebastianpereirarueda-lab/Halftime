// ============================================================
//  Draws one illustration per story in public/data/news.js with OpenAI's
//  image model, saves it under public/images/news/, and writes the file
//  name back into news.js. Pictures are vintage newspaper illustrations,
//  never photographs, and are labelled as illustrations on the page.
//
//  Needs OPENAI_API_KEY. Optional: OPENAI_IMAGE_MODEL (default gpt-image-2),
//  NEWS_IMAGES = "all" (default) or "lead" (only the lead story gets one).
//
//  A picture is drawn once per story (keyed by its headline and scene) and
//  reused while the story stays in the edition. Files no edition uses any
//  more are deleted so the folder stays small.
//
//  Usage:
//    node scripts/make-images.mjs             normal run
//    node scripts/make-images.mjs --dry-run   print the prompts, draw nothing
// ============================================================
import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import OpenAI from "openai";
import { ROOT, PUBLIC_DATA, readJson, writeDataFile, log } from "./lib/util.mjs";

const DRY = process.argv.includes("--dry-run");
const NEWS_FILE = process.env.HALFTIME_NEWS_OUT || path.join(PUBLIC_DATA, "news.js");
const IMAGE_DIR = process.env.HALFTIME_IMAGE_DIR || path.join(ROOT, "public", "images", "news");
const MODEL = process.env.OPENAI_IMAGE_MODEL || "gpt-image-2";
const WHICH = process.env.NEWS_IMAGES || "all";

// The house style, shared by every picture.
const STYLE = "Vintage 1960s football newspaper illustration: halftone print, sepia and warm brown ink on cream paper, slightly grainy, strong simple composition, period atmosphere. " +
  "Strictly no text, letters, numbers, logos, badges, crests, sponsors or flags anywhere. No real or recognisable people; players are generic figures. No photographic realism. Scene: ";

function readNews(file) {
  try {
    const text = fs.readFileSync(file, "utf8");
    const i = text.indexOf("= ");
    return i === -1 ? null : JSON.parse(text.slice(i + 2).replace(/;\s*$/, ""));
  } catch { return null; }
}

function keyFor(story) {
  return createHash("sha256").update((story.headline || "") + "\n" + (story.picture && story.picture.scene || "")).digest("hex").slice(0, 12);
}

async function draw(client, scene, landscape) {
  const res = await client.images.generate({
    model: MODEL,
    prompt: STYLE + scene,
    size: landscape ? "1536x1024" : "1024x1024",
    quality: landscape ? "medium" : "low",
    output_format: "jpeg",
    output_compression: 80,
    n: 1,
  });
  const b64 = res.data && res.data[0] && res.data[0].b64_json;
  if (!b64) throw new Error("the image model returned no image data");
  return Buffer.from(b64, "base64");
}

async function main() {
  const news = readNews(NEWS_FILE);
  if (!news || !news.lead) { log("No edition in " + NEWS_FILE + "; nothing to draw."); return; }

  const jobs = [{ story: news.lead, landscape: true, label: "lead" }];
  if (WHICH !== "lead") (news.stories || []).forEach((st, i) => jobs.push({ story: st, landscape: false, label: "story " + (i + 1) }));

  if (DRY) {
    for (const j of jobs) console.log(`[${j.label}] ${keyFor(j.story)}.jpg ${j.landscape ? "1536x1024" : "1024x1024"}\n  ${STYLE}${j.story.picture ? j.story.picture.scene : "(no scene)"}\n`);
    console.log("Dry run: nothing drawn, nothing written.");
    return;
  }
  if (!process.env.OPENAI_API_KEY) { log("OPENAI_API_KEY is not set. Skipping the illustrations."); return; }

  fs.mkdirSync(IMAGE_DIR, { recursive: true });
  const client = new OpenAI();
  let drawn = 0, reused = 0, failed = 0;
  for (const j of jobs) {
    if (!j.story.picture || !j.story.picture.scene) { log(`${j.label}: no picture description; skipped.`); continue; }
    const key = keyFor(j.story);
    const file = path.join(IMAGE_DIR, key + ".jpg");
    if (!fs.existsSync(file)) {
      try {
        const bytes = await draw(client, j.story.picture.scene, j.landscape);
        fs.writeFileSync(file, bytes);
        drawn++;
        log(`${j.label}: drew ${key}.jpg (${Math.round(bytes.length / 1024)} KB)`);
      } catch (error) {
        failed++;
        if (error instanceof OpenAI.NotFoundError) log(`${j.label}: the image model "${MODEL}" is not available to this account. Set the OPENAI_IMAGE_MODEL variable.`);
        else if (error instanceof OpenAI.RateLimitError) log(`${j.label}: rate limit or quota hit; will try again next run.`);
        else log(`${j.label}: not drawn (${error.message})`);
        continue;
      }
    } else { reused++; }
    j.story.image = { file: "images/news/" + key + ".jpg", alt: j.story.picture.alt || "", kind: "illustration", model: MODEL };
  }

  // Delete pictures no current story uses.
  const keep = new Set(jobs.map(j => j.story.image && path.basename(j.story.image.file)).filter(Boolean));
  for (const f of fs.readdirSync(IMAGE_DIR)) if (f.endsWith(".jpg") && !keep.has(f)) { fs.unlinkSync(path.join(IMAGE_DIR, f)); }

  writeDataFile(NEWS_FILE, "HALFTIME_NEWS", news, "Front Page news written by " + (news.model || "an OpenAI model") + " from the sources listed in each story; illustrations by " + MODEL + ".");
  log(`Illustrations: ${drawn} drawn, ${reused} reused, ${failed} failed.`);
}

main().catch(err => { console.error("make-images failed:", err.message); process.exit(1); });
