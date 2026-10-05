// ============================================================
//  Turns the collected headlines into the Front Page news, written by
//  Claude, and saves public/data/news.js.
//
//  Needs ANTHROPIC_API_KEY. Without it the step is skipped and the
//  previous news file stays as it is.
//
//  Rules the writer is held to (see the system prompt below):
//    - only facts that appear in the supplied articles
//    - every story cites its sources
//    - no scores, dates or quotes that are not in the sources
//    - original wording: a summary, never a copy
//
//  Usage:
//    node scripts/write-news.mjs             normal run
//    node scripts/write-news.mjs --dry-run   print the prompt, make no API call
// ============================================================
import path from "node:path";
import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import { CACHE, PUBLIC_DATA, readJson, writeDataFile, log } from "./lib/util.mjs";

const DRY = process.argv.includes("--dry-run");
const CANDIDATES = process.env.HALFTIME_NEWS_CANDIDATES || path.join(CACHE, "news-candidates.json");
const OUT_FILE = process.env.HALFTIME_NEWS_OUT || path.join(PUBLIC_DATA, "news.js");
const MODEL = "claude-opus-5-5";

const Source = z.object({
  outlet: z.string(),
  title: z.string(),
  url: z.string(),
});
const Story = z.object({
  tag: z.string().describe("Section word, e.g. Transfers, Tactics, Women's Game, Europe, International"),
  headline: z.string().describe("Up to 12 words, newspaper style, no clickbait"),
  summary: z.string().describe("Two sentences, 35 to 60 words"),
  sources: z.array(Source).min(1),
});
const Edition = z.object({
  lead: z.object({
    tag: z.string(),
    headline: z.string().describe("Up to 12 words"),
    standfirst: z.string().describe("One sentence that sells the story, 15 to 30 words"),
    paragraphs: z.array(z.string()).min(2).max(4).describe("Body copy, 60 to 110 words each, original wording"),
    sources: z.array(Source).min(1),
  }),
  stories: z.array(Story).length(3),
  notes: z.string().describe("Anything the editor should know: thin coverage, conflicting reports, or an empty string"),
});

const SYSTEM = `You are the news desk of Halftime, a football newspaper with the manner of a classic match-day programme: elegant, warm, plain-spoken, British English. You write one edition from the wire copy you are given.

Hard rules:
1. Use only facts that appear in the supplied articles. If the articles do not say it, you do not say it. Never add a score, a date, a fee, a quote, a statistic or a name from memory.
2. Summarise in your own words. Do not reproduce more than eight consecutive words from any article.
3. Every story lists the articles it draws on as sources, copying their titles and URLs exactly.
4. Prefer stories covered by more than one outlet. Where outlets disagree, say so in the summary or leave the point out.
5. Choose a lead story of broad interest, then three secondary stories on different topics. Give each a short section tag.
6. No opinion, no speculation, no hype words. If the day's coverage is thin, say so in the notes field and keep the stories short.`;

async function main() {
  const data = readJson(CANDIDATES);
  const items = (data && data.items) || [];
  if (items.length < 4) { log(`Only ${items.length} candidate articles; not enough to write an edition. Keeping the previous news.`); return; }

  const wire = items.slice(0, 60).map((it, i) =>
    `[${i + 1}] ${it.outlet} — ${it.title}\n    ${it.published || ""}\n    ${it.link}\n    ${it.summary || "(no summary)"}`).join("\n\n");
  const userMessage = `Today's date is ${new Date().toISOString().slice(0, 10)}. Here is the wire copy, newest first:\n\n${wire}\n\nWrite the edition.`;

  if (DRY) {
    console.log("----- SYSTEM -----\n" + SYSTEM + "\n\n----- USER -----\n" + userMessage.slice(0, 3000) + "\n... (" + userMessage.length + " chars total)");
    console.log("\nDry run: no API call made.");
    return;
  }
  if (!process.env.ANTHROPIC_API_KEY) { log("ANTHROPIC_API_KEY is not set. Skipping the news writer; the previous news file is kept."); return; }

  const client = new Anthropic();
  let response;
  try {
    response = await client.messages.parse({
      model: MODEL,
      max_tokens: 16000,
      output_config: { effort: "high", format: zodOutputFormat(Edition) },
      system: SYSTEM,
      messages: [{ role: "user", content: userMessage }],
    });
  } catch (error) {
    if (error instanceof Anthropic.AuthenticationError) throw new Error("Claude rejected the API key. Check the ANTHROPIC_API_KEY secret.");
    if (error instanceof Anthropic.RateLimitError) throw new Error("Claude rate limit hit; try again later.");
    throw error;
  }
  if (response.stop_reason === "refusal") { log("The model declined to write this edition" + (response.stop_details ? " (" + response.stop_details.category + ")" : "") + ". Keeping the previous news."); return; }
  const edition = response.parsed_output;
  if (!edition) throw new Error("The model's answer did not match the expected shape; nothing written.");

  // Belt and braces: every cited URL must be one we supplied.
  const known = new Set(items.map(i => i.link));
  const check = s => s.sources.every(src => known.has(src.url));
  if (!check(edition.lead) || !edition.stories.every(check)) throw new Error("A story cited a URL that was not in the wire copy; nothing written.");

  writeDataFile(OUT_FILE, "HALFTIME_NEWS", {
    updated: new Date().toISOString(),
    model: MODEL,
    articlesConsidered: items.length,
    ...edition,
  }, "Front Page news written by Claude from the sources listed in each story.");
  log(`Wrote the edition: "${edition.lead.headline}" plus ${edition.stories.length} stories. Tokens in/out: ${response.usage.input_tokens}/${response.usage.output_tokens}.`);
}

main().catch(err => { console.error("write-news failed:", err.message); process.exit(1); });
