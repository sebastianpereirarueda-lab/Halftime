// ============================================================
//  Fetches recent results, upcoming fixtures, goals and lineups
//  from API-Football and writes public/data/results.js.
//
//  Needs the API_FOOTBALL_KEY environment variable (free plan works).
//  Usage:
//    node scripts/fetch-scores.mjs            normal run
//    node scripts/fetch-scores.mjs --probe    also print one raw fixture,
//                                             its events and lineups, so the
//                                             field names can be checked
//    node scripts/fetch-scores.mjs --sample   no network: build the output
//                                             from scripts/sample/*.json
//
//  Field names for API-Football v3 are written from its documentation
//  as remembered; the --probe output on the first live run confirms them.
// ============================================================
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { LEAGUES, DAYS_BACK, DAYS_AHEAD, KEEP_DAYS, DETAIL_WINDOW_HOURS, MAX_REQUESTS_PER_RUN, MIN_REQUEST_GAP_MS } from "./config.mjs";
import { ROOT, PUBLIC_DATA, CACHE, readJson, writeJson, writeDataFile, log, hoursAgo, currentSeason, slug, formatDate } from "./lib/util.mjs";

const args = new Set(process.argv.slice(2));
const PROBE = args.has("--probe");
const SAMPLE = args.has("--sample");
// SEASON=2024 (for example) is a test mode: it fetches that season but writes
// to a temporary file, never to the site, so old results cannot be published.
const TEST_SEASON = process.env.SEASON ? Number(process.env.SEASON) : null;
const OUT_FILE = process.env.HALFTIME_OUT || (TEST_SEASON ? path.join(os.tmpdir(), "halftime-test-results.js") : path.join(PUBLIC_DATA, "results.js"));
const KEY = process.env.API_FOOTBALL_KEY;
const BASE = "https://v3.football.api-sports.io";


let requests = 0;
let lastRequestAt = 0;
const sleep = ms => new Promise(r => setTimeout(r, ms));

// The free plan allows 10 requests a minute, so requests are spaced out, and a
// 429 (too many requests) is answered by a pause and one retry.
async function api(pathAndQuery, retried) {
  if (SAMPLE) return sample(pathAndQuery);
  if (requests >= MAX_REQUESTS_PER_RUN) throw new Error("Request ceiling reached (" + MAX_REQUESTS_PER_RUN + ")");
  const wait = lastRequestAt + MIN_REQUEST_GAP_MS - Date.now();
  if (wait > 0) await sleep(wait);
  requests++;
  lastRequestAt = Date.now();
  const res = await fetch(BASE + pathAndQuery, { headers: { "x-apisports-key": KEY } });
  if (res.status === 429 && !retried) {
    log("Rate limit hit; pausing 65 seconds before retrying " + pathAndQuery);
    await sleep(65000);
    return api(pathAndQuery, true);
  }
  if (!res.ok) throw new Error("API-Football " + res.status + " for " + pathAndQuery);
  const body = await res.json();
  if (body.errors && Object.keys(body.errors).length) {
    const err = new Error("API-Football error: " + JSON.stringify(body.errors));
    err.plan = Boolean(body.errors.plan || body.errors.requests || body.errors.rateLimit);
    // "Free plans do not have access to this date, try from 2026-10-04 to 2026-10-06."
    const m = String(body.errors.plan || "").match(/try from (\d{4}-\d{2}-\d{2}) to (\d{4}-\d{2}-\d{2})/);
    if (m) err.allowed = { from: m[1], to: m[2] };
    throw err;
  }
  return body.response || [];
}

// Offline stand-in for tests: files named after the request.
function sample(pathAndQuery) {
  const name = pathAndQuery.replace(/^\//, "").replace(/date=\d{4}-\d{2}-\d{2}/, "date=DATE").replace(/[\/?&=]/g, "_") + ".json";
  const file = path.join(ROOT, "scripts", "sample", name);
  const data = readJson(file);
  if (!data) throw new Error("No sample file for " + pathAndQuery + " (expected " + file + ")");
  return data.response || [];
}

// Reads a previously generated results.js back into an object (null if absent).
function readResultsFile(file) {
  try {
    const text = fs.readFileSync(file, "utf8");
    const i = text.indexOf("= ");
    return i === -1 ? null : JSON.parse(text.slice(i + 2).replace(/;\s*$/, ""));
  } catch { return null; }
}

const FINISHED = new Set(["FT", "AET", "PEN"]);
const LIVE = new Set(["1H", "HT", "2H", "ET", "BT", "P", "LIVE", "INT"]);

// Some provider strings arrive double-encoded ("CvetkoviÄ\u0087" for "Cvetković").
// If a string shows the tell-tale pattern, re-read its bytes as UTF-8.
export function fixText(value) {
  if (typeof value !== "string" || !/[\u00C3\u00C4\u00C5][\u0080-\u00BF]/.test(value)) return value;
  try {
    const fixed = Buffer.from(value, "latin1").toString("utf8");
    return fixed.includes("\uFFFD") ? value : fixed;
  } catch { return value; }
}

function teamColour(name) {
  // Deterministic but pleasant colour for timeline dots when no kit is known.
  let h = 0; for (const c of String(name)) h = (h * 31 + c.charCodeAt(0)) % 360;
  return "hsl(" + h + ", 45%, 38%)";
}

function toMatch(fx, events, lineups, league) {
  const home = fx.teams.home, away = fx.teams.away;
  const status = fx.fixture.status && fx.fixture.status.short;
  const goals = (events || [])
    .filter(e => e.type === "Goal" && e.detail !== "Missed Penalty")
    .map(e => ({
      minute: (e.time && e.time.elapsed) || 0,
      extra: (e.time && e.time.extra) || 0,
      scorer: fixText((e.player && e.player.name) || "Unknown"),
      team: e.team && e.team.id === home.id ? "home" : "away",
      kind: e.detail === "Own Goal" ? "og" : e.detail === "Penalty" ? "pen" : "goal",
    }))
    .sort((a, b) => (a.minute + a.extra / 100) - (b.minute + b.extra / 100));
  const lu = (lineups || []).map(l => ({
    team: l.team && l.team.id === home.id ? "home" : "away",
    formation: l.formation || null,
    coach: fixText((l.coach && l.coach.name) || null),
    startXI: (l.startXI || []).map(p => ({ name: fixText(p.player.name), number: p.player.number, pos: p.player.pos })),
    substitutes: (l.substitutes || []).map(p => ({ name: fixText(p.player.name), number: p.player.number, pos: p.player.pos })),
  }));
  const dateIso = fx.fixture.date;
  const hw = (fx.goals.home ?? 0) > (fx.goals.away ?? 0), aw = (fx.goals.away ?? 0) > (fx.goals.home ?? 0);
  return {
    id: slug(home.name + "-" + away.name + "-" + dateIso.slice(0, 10)),
    fixtureId: fx.fixture.id,
    competition: league.name,
    stage: fx.league && fx.league.round ? String(fx.league.round) : "",
    date: formatDate(dateIso),
    dateIso,
    status: FINISHED.has(status) ? "finished" : LIVE.has(status) ? "live" : status === "NS" ? "upcoming" : "other",
    venue: [fx.fixture.venue && fx.fixture.venue.name, fx.fixture.venue && fx.fixture.venue.city].filter(Boolean).join(", "),
    // The provider gives no official abbreviations, so the scorers column shows the full name.
    home: { name: fixText(home.name), short: fixText(home.name), colour: teamColour(home.name), label: hw ? "Winners" : "", kit: null, logo: home.logo || null },
    away: { name: fixText(away.name), short: fixText(away.name), colour: teamColour(away.name), label: aw ? "Winners" : "", kit: null, logo: away.logo || null },
    score: { home: fx.goals.home, away: fx.goals.away },
    goals,
    lineups: lu.length ? lu : null,
    kitsNote: "",
    stats: null,
    source: "API-Football",
  };
}

async function main() {
  if (!SAMPLE && !KEY) {
    log("API_FOOTBALL_KEY is not set. Nothing fetched; the existing results file is kept.");
    return;
  }
  const season = TEST_SEASON || currentSeason();
  if (TEST_SEASON) log(`TEST MODE: season ${TEST_SEASON}. Output goes to ${OUT_FILE}, not to the site.`);
  // Sample and test runs use a throwaway cache so that data never reaches the repo.
  const cacheFile = (SAMPLE || TEST_SEASON) ? path.join(os.tmpdir(), "halftime-sample-cache.json") : path.join(CACHE, "fixtures.json");
  const cache = readJson(cacheFile, {});
  const results = [], upcoming = [], matches = [];
  let probed = false;
  let detailsStopped = false;

  // One request per calendar day covers every competition at once, which the
  // free plan allows (it refuses the per-league "last" and "next" parameters).
  // In test mode the window is the same calendar days in the test season.
  const leagueById = new Map(LEAGUES.map(l => [l.id, l]));
  const anchor = new Date();
  if (TEST_SEASON) anchor.setUTCFullYear(TEST_SEASON + (anchor.getUTCMonth() >= 6 ? 0 : 1));
  const days = [];
  for (let d = -DAYS_BACK; d <= DAYS_AHEAD; d++) {
    const day = new Date(anchor.getTime() + d * 864e5);
    days.push(day.toISOString().slice(0, 10));
  }
  const seen = new Map();
  const seenLeagues = new Map();   // id -> { name, country, count }, for the probe
  let allowed = null;   // date window the plan permits, learned from its first refusal
  for (const day of days) {
    if (allowed && (day < allowed.from || day > allowed.to)) continue;
    let all;
    try {
      all = await api(`/fixtures?date=${day}`);
    } catch (e) {
      if (e.allowed && !allowed) {
        allowed = e.allowed;
        log(`The plan only serves ${allowed.from} to ${allowed.to}; narrowing the window to that.`);
        continue;
      }
      throw e;
    }
    let kept = 0;
    for (const fx of all) {
      if (PROBE && fx.league) {
        const e = seenLeagues.get(fx.league.id) || { name: fx.league.name, country: fx.league.country, count: 0 };
        e.count++; seenLeagues.set(fx.league.id, e);
      }
      const league = fx.league && leagueById.get(fx.league.id);
      if (!league || seen.has(fx.fixture.id)) continue;
      seen.set(fx.fixture.id, { fx, league });
      kept++;
    }
    log(`${day}: ${all.length} fixtures worldwide, ${kept} in followed competitions`);
  }
  if (PROBE) {
    const top = [...seenLeagues.entries()].sort((a, b) => b[1].count - a[1].count).slice(0, 40);
    console.log("\n===== PROBE: competitions returned in this window (id | name | country | fixtures) =====");
    for (const [id, e] of top) console.log(`  ${id} | ${e.name} | ${e.country} | ${e.count}`);
    console.log("");
  }
  for (const l of LEAGUES) {
    const got = [...seen.values()].filter(v => v.league.id === l.id);
    const apiName = got[0] && got[0].fx.league.name;
    if (apiName && apiName !== l.name) log(`  WARNING: league id ${l.id} is "${apiName}" at the provider, config says "${l.name}". Check scripts/config.mjs.`);
  }

  for (const { fx, league } of seen.values()) {
    const status = fx.fixture.status && fx.fixture.status.short;
    if (status === "NS" || status === "TBD") {
      upcoming.push({ competition: league.short, dateIso: fx.fixture.date, home: fx.teams.home.name, away: fx.teams.away.name, venue: fx.fixture.venue && fx.fixture.venue.name });
      continue;
    }
    if (!FINISHED.has(status)) continue;
    const id = String(fx.fixture.id);
    let detail = cache[id];
    const fresh = hoursAgo(fx.fixture.date) <= DETAIL_WINDOW_HOURS || TEST_SEASON;
    if (!detail && fresh && !detailsStopped && requests + 2 <= MAX_REQUESTS_PER_RUN) {
      let events, lineups;
      try {
        events = await api(`/fixtures/events?fixture=${id}`);
        lineups = await api(`/fixtures/lineups?fixture=${id}`);
      } catch (e) {
        // Keep the scoreline; the goals and lineups will be picked up on a later run.
        log(`Details for fixture ${id} skipped (${e.message}); continuing without them.`);
        if (/429|ceiling/.test(e.message)) { detailsStopped = true; log("No more detail requests this run."); }
        events = null;
      }
      if (events) {
        detail = { events, lineups, fetched: new Date().toISOString() };
        cache[id] = detail;
      }
      if (PROBE && !probed && events) {
        probed = true;
        console.log("\n===== PROBE: raw fixture =====\n" + JSON.stringify(fx, null, 2));
        console.log("\n===== PROBE: raw events (first 3) =====\n" + JSON.stringify(events.slice(0, 3), null, 2));
        console.log("\n===== PROBE: raw lineups (first team, first 2 players) =====\n" + JSON.stringify((lineups[0] && { ...lineups[0], startXI: (lineups[0].startXI || []).slice(0, 2), substitutes: [] }) || null, null, 2) + "\n");
      }
    }
    const m = toMatch(fx, detail && detail.events, detail && detail.lineups, league);
    matches.push(m);
    results.push({ id: m.id, competition: league.short, dateIso: m.dateIso, home: m.home.name, away: m.away.name, score: m.score, hasCard: true });
  }

  // Trim the cache to the last 400 fixtures so the file stays small.
  const ids = Object.keys(cache).sort((a, b) => Number(b) - Number(a)).slice(0, 400);
  writeJson(cacheFile, Object.fromEntries(ids.map(i => [i, cache[i]])));

  // Keep a rolling week: matches published on earlier runs stay until they are
  // KEEP_DAYS old, so a narrow fetch window still leaves a full results box.
  if (!TEST_SEASON) {
    const previous = readResultsFile(OUT_FILE);
    const have = new Set(matches.map(m => m.fixtureId));
    for (const m of (previous && previous.matches) || []) {
      if (!have.has(m.fixtureId) && hoursAgo(m.dateIso) <= KEEP_DAYS * 24) {
        matches.push(m);
        results.push({ id: m.id, competition: (LEAGUES.find(l => l.name === m.competition) || {}).short || m.competition, dateIso: m.dateIso, home: m.home.name, away: m.away.name, score: m.score, hasCard: true });
      }
    }
  }

  results.sort((a, b) => b.dateIso.localeCompare(a.dateIso));
  upcoming.sort((a, b) => a.dateIso.localeCompare(b.dateIso));
  matches.sort((a, b) => b.dateIso.localeCompare(a.dateIso));

  writeDataFile(OUT_FILE, "HALFTIME_RESULTS", {
    updated: new Date().toISOString(),
    season,
    provider: "API-Football (api-sports.io)",
    sample: SAMPLE,
    results, upcoming, matches,
  }, "Results, fixtures and match details from API-Football.");
  log(`Wrote ${results.length} results, ${upcoming.length} fixtures, ${matches.filter(m => m.lineups).length} with lineups, using ${requests} API requests.`);
}

if (process.argv[1] && import.meta.url.endsWith(path.basename(process.argv[1]))) main().catch(err => {
  console.error("fetch-scores failed:", err.message);
  if (err.plan) console.error("This is a plan or quota limit at API-Football, not a bug. The existing results file is kept. See README, 'Switching it on'.");
  process.exit(1);
});
