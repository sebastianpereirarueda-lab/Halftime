// ============================================================
//  Reads the RSS feeds listed in scripts/config.mjs and saves the
//  recent football headlines to data-cache/news-candidates.json.
//  No keys needed. Any feed that fails is skipped with a log line.
// ============================================================
import path from "node:path";
import { NEWS_FEEDS, NEWS_MAX_AGE_HOURS } from "./config.mjs";
import { CACHE, writeJson, log, hoursAgo } from "./lib/util.mjs";

const OUT = process.env.HALFTIME_NEWS_CANDIDATES || path.join(CACHE, "news-candidates.json");

function decode(s) {
  return String(s || "")
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'")
    .replace(/&nbsp;/g, " ").replace(/&amp;/g, "&")
    .replace(/\s+/g, " ").trim();
}
function tag(block, name) {
  const m = block.match(new RegExp("<" + name + "(?:\\s[^>]*)?>([\\s\\S]*?)</" + name + ">", "i"));
  return m ? m[1] : "";
}

// Handles both RSS 2.0 (<item>) and Atom (<entry>).
export function parseFeed(xml, outlet) {
  const items = [];
  const blocks = xml.match(/<item[\s>][\s\S]*?<\/item>/gi) || xml.match(/<entry[\s>][\s\S]*?<\/entry>/gi) || [];
  for (const b of blocks) {
    const title = decode(tag(b, "title"));
    let link = decode(tag(b, "link"));
    if (!link) { const m = b.match(/<link[^>]*href="([^"]+)"/i); link = m ? m[1] : ""; }
    const summary = decode(tag(b, "description") || tag(b, "summary") || tag(b, "content"));
    const dateRaw = tag(b, "pubDate") || tag(b, "published") || tag(b, "updated") || tag(b, "dc:date");
    const date = dateRaw ? new Date(decode(dateRaw)) : null;
    if (!title || !link) continue;
    items.push({ outlet, title, link, summary: summary.slice(0, 600), published: date && !isNaN(date) ? date.toISOString() : null });
  }
  return items;
}

async function main() {
  const all = [];
  for (const feed of NEWS_FEEDS) {
    try {
      const res = await fetch(feed.url, { headers: { "user-agent": "Halftime/1.0 (+news digest; respects robots)" }, signal: AbortSignal.timeout(20000) });
      if (!res.ok) throw new Error("HTTP " + res.status);
      const xml = await res.text();
      const items = parseFeed(xml, feed.outlet);
      const recent = items.filter(i => i.published && hoursAgo(i.published) <= NEWS_MAX_AGE_HOURS);
      log(`${feed.outlet}: ${items.length} items, ${recent.length} within ${NEWS_MAX_AGE_HOURS}h`);
      all.push(...recent);
    } catch (e) {
      log(`${feed.outlet}: skipped (${e.message})`);
    }
  }
  // Drop duplicates by link and sort newest first.
  const seen = new Set();
  const unique = all.filter(i => !seen.has(i.link) && seen.add(i.link)).sort((a, b) => b.published.localeCompare(a.published));
  writeJson(OUT, { fetched: new Date().toISOString(), items: unique });
  log(`Saved ${unique.length} candidate articles to ${OUT}`);
}

if (process.argv[1] && import.meta.url.endsWith(path.basename(process.argv[1]))) {
  main().catch(err => { console.error("fetch-news failed:", err.message); process.exit(1); });
}
