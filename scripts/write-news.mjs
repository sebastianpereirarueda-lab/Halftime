// ============================================================
//  Turns the collected headlines into the Front Page news, written by
//  an OpenAI model, and saves public/data/news.js.
//
//  Needs OPENAI_API_KEY. Without it the step is skipped and the previous
//  news file stays as it is. OPENAI_MODEL overrides the default model.
//
//  Rules the writer is held to (see the instructions below):
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
import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import { z } from "zod";
import { CACHE, PUBLIC_DATA, readJson, writeDataFile, log } from "./lib/util.mjs";

const DRY = process.argv.includes("--dry-run");
const CANDIDATES = process.env.HALFTIME_NEWS_CANDIDATES || path.join(CACHE, "news-candidates.json");
const OUT_FILE = process.env.HALFTIME_NEWS_OUT || path.join(PUBLIC_DATA, "news.js");
const MODEL = process.env.OPENAI_MODEL || "gpt-5.5";

// Shape of one edition. Kept to plain fields so strict JSON output accepts it;
// counts are checked in code below.
const Source = z.object({
  outlet: z.string(),
  title: z.string(),
  url: z.string(),
});
const Story = z.object({
  tag: z.string().describe("Section word, e.g. Transfers, Tactics, Women's Game, Europe, International"),
  headline: z.string().describe("Up to 12 words, newspaper style, no clickbait"),
  summary: z.string().describe("Two sentences, 35 to 60 words"),
  sources: z.array(Source).describe("At least one"),
});
const Edition = z.object({
  lead: z.object({
    tag: z.string(),
    headline: z.string().describe("Up to 12 words"),
    standfirst: z.string().describe("One sentence that sells the story, 15 to 30 words"),
    paragraphs: z.array(z.string()).describe("Two to four paragraphs of 60 to 110 words each, original wording"),
    sources: z.array(Source).describe("At least one"),
  }),
  stories: z.array(Story).describe("Exactly three"),
  notes: z.string().describe("Anything the editor should know: thin coverage, conflicting reports, or an empty string"),
});

const INSTRUCTIONS = `You are the news desk of Halftime, a football newspaper with the manner of a classic match-day programme: elegant, warm, plain-spoken, British English. You write one edition from the wire copy you are given.

Hard rules:
1. Use only facts that appear in the supplied articles. If the articles do not say it, you do not say it. Never add a score, a date, a fee, a quote, a statistic or a name from memory.
2. Summarise in your own words. Do not reproduce more than eight consecutive words from any article.
3. Every story lists the articles it draws on as sources, copying their titles and URLs exactly.
4. Prefer stories covered by more than one outlet. Where outlets disagree, say so in the summary or leave the point out.
5. Choose a lead story of broad interest, then exactly three secondary stories on different topics. Give each a short section tag.
6. The lead has two to four paragraphs. Each secondary story has one summary of two sentences.
7. No opinion, no speculation, no hype words. If the day's coverage is thin, say so in the notes field and keep the stories short.
8. Write for the reader, not for the editor. Never mention the wire copy, "the supplied reports", "the articles", what the sources did or did not include, or your own process in a headline, standfirst, paragraph or summary. If something is unknown, simply leave it out; any caveat for the editor goes in the notes field only. Attributing a fact to an outlet in passing ("BBC Sport reported") is fine.`;

function validate(edition, known) {
  const problems = [];
  if (!edition.lead || edition.lead.paragraphs.length < 2 || edition.lead.paragraphs.length > 4) problems.push("lead must have 2 to 4 paragraphs");
  if (!edition.stories || edition.stories.length !== 3) problems.push("there must be exactly 3 secondary stories");
  const all = [edition.lead, ...(edition.stories || [])];
  for (const s of all) {
    if (!s || !s.sources || !s.sources.length) problems.push(`"${s && s.headline}" has no sources`);
    else for (const src of s.sources) if (!known.has(src.url)) problems.push(`"${s.headline}" cites a URL not in the wire copy: ${src.url}`);
  }
  return problems;
}

async function main() {
  if (process.argv.includes("--schema")) { console.log(JSON.stringify(zodTextFormat(Edition, "edition"), null, 2)); return; }
  const data = readJson(CANDIDATES);
  const items = (data && data.items) || [];
  if (items.length < 4) { log(`Only ${items.length} candidate articles; not enough to write an edition. Keeping the previous news.`); return; }

  const wire = items.slice(0, 60).map((it, i) =>
    `[${i + 1}] ${it.outlet} — ${it.title}\n    ${it.published || ""}\n    ${it.link}\n    ${it.summary || "(no summary)"}`).join("\n\n");
  const userMessage = `Today's date is ${new Date().toISOString().slice(0, 10)}. Here is the wire copy, newest first:\n\n${wire}\n\nWrite the edition.`;

  if (DRY) {
    console.log("----- INSTRUCTIONS -----\n" + INSTRUCTIONS + "\n\n----- USER -----\n" + userMessage.slice(0, 3000) + "\n... (" + userMessage.length + " chars total)");
    console.log("\nDry run: no API call made. Model would be " + MODEL + ".");
    return;
  }
  if (!process.env.OPENAI_API_KEY) { log("OPENAI_API_KEY is not set. Skipping the news writer; the previous news file is kept."); return; }

  const client = new OpenAI();
  let response;
  try {
    response = await client.responses.parse({
      model: MODEL,
      instructions: INSTRUCTIONS,
      input: [{ role: "user", content: userMessage }],
      reasoning: { effort: "medium" },
      text: { format: zodTextFormat(Edition, "edition") },
      max_output_tokens: 8000,
    });
  } catch (error) {
    if (error instanceof OpenAI.AuthenticationError) throw new Error("OpenAI rejected the API key. Check the OPENAI_API_KEY secret.");
    if (error instanceof OpenAI.RateLimitError) throw new Error("OpenAI rate limit or quota hit; try again later.");
    if (error instanceof OpenAI.NotFoundError) throw new Error(`OpenAI does not know the model "${MODEL}". Set the OPENAI_MODEL variable to one your account can use.`);
    throw error;
  }

  const refusal = (response.output || []).flatMap(o => o.content || []).find(c => c.type === "refusal");
  if (refusal) { log("The model declined to write this edition: " + refusal.refusal + ". Keeping the previous news."); return; }
  if (response.status === "incomplete") { log("The model's answer was cut short (" + (response.incomplete_details && response.incomplete_details.reason) + "). Keeping the previous news."); return; }
  const edition = response.output_parsed;
  if (!edition) throw new Error("The model's answer did not match the expected shape; nothing written.");

  const problems = validate(edition, new Set(items.map(i => i.link)));
  if (problems.length) throw new Error("Edition rejected: " + problems.join("; ") + ". Nothing written.");

  writeDataFile(OUT_FILE, "HALFTIME_NEWS", {
    updated: new Date().toISOString(),
    model: MODEL,
    articlesConsidered: items.length,
    ...edition,
  }, "Front Page news written by " + MODEL + " from the sources listed in each story.");
  const u = response.usage || {};
  log(`Wrote the edition: "${edition.lead.headline}" plus ${edition.stories.length} stories. Tokens in/out: ${u.input_tokens}/${u.output_tokens}.`);
}

main().catch(err => { console.error("write-news failed:", err.message); process.exit(1); });
