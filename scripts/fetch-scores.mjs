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
import { LEAGUES, LAST_PER_LEAGUE, NEXT_PER_LEAGUE, DETAIL_WINDOW_HOURS, MAX_REQUESTS_PER_RUN } from "./config.mjs";
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

if (!SAMPLE && !KEY) {
  log("API_FOOTBALL_KEY is not set. Nothing fetched; the existing results file is kept.");
  process.exit(0);
}

let requests = 0;
async function api(pathAndQuery) {
  if (SAMPLE) return sample(pathAndQuery);
  if (requests >= MAX_REQUESTS_PER_RUN) throw new Error("Request ceiling reached (" + MAX_REQUESTS_PER_RUN + ")");
  requests++;
  const res = await fetch(BASE + pathAndQuery, { headers: { "x-apisports-key": KEY } });
  if (!res.ok) throw new Error("API-Football " + res.status + " for " + pathAndQuery);
  const body = await res.json();
  if (body.errors && Object.keys(body.errors).length) {
    const err = new Error("API-Football error: " + JSON.stringify(body.errors));
    err.plan = Boolean(body.errors.plan || body.errors.requests || body.errors.rateLimit);
    throw err;
  }
  return body.response || [];
}

// Offline stand-in for tests: files named after the request.
function sample(pathAndQuery) {
  const name = pathAndQuery.replace(/^\//, "").replace(/season=\d+/, "season=SEASON").replace(/[\/?&=]/g, "_") + ".json";
  const file = path.join(ROOT, "scripts", "sample", name);
  const data = readJson(file);
  if (!data) throw new Error("No sample file for " + pathAndQuery + " (expected " + file + ")");
  return data.response || [];
}

const FINISHED = new Set(["FT", "AET", "PEN"]);
const LIVE = new Set(["1H", "HT", "2H", "ET", "BT", "P", "LIVE", "INT"]);

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
      scorer: (e.player && e.player.name) || "Unknown",
      team: e.team && e.team.id === home.id ? "home" : "away",
      kind: e.detail === "Own Goal" ? "og" : e.detail === "Penalty" ? "pen" : "goal",
    }))
    .sort((a, b) => (a.minute + a.extra / 100) - (b.minute + b.extra / 100));
  const lu = (lineups || []).map(l => ({
    team: l.team && l.team.id === home.id ? "home" : "away",
    formation: l.formation || null,
    coach: (l.coach && l.coach.name) || null,
    startXI: (l.startXI || []).map(p => ({ name: p.player.name, number: p.player.number, pos: p.player.pos })),
    substitutes: (l.substitutes || []).map(p => ({ name: p.player.name, number: p.player.number, pos: p.player.pos })),
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
    home: { name: home.name, short: (home.name || "").slice(0, 3).toUpperCase(), colour: teamColour(home.name), label: hw ? "Winners" : "", kit: null, logo: home.logo || null },
    away: { name: away.name, short: (away.name || "").slice(0, 3).toUpperCase(), colour: teamColour(away.name), label: aw ? "Winners" : "", kit: null, logo: away.logo || null },
    score: { home: fx.goals.home, away: fx.goals.away },
    goals,
    lineups: lu.length ? lu : null,
    kitsNote: "",
    stats: null,
    source: "API-Football",
  };
}

async function main() {
  const season = TEST_SEASON || currentSeason();
  if (TEST_SEASON) log(`TEST MODE: season ${TEST_SEASON}. Output goes to ${OUT_FILE}, not to the site.`);
  // Sample and test runs use a throwaway cache so that data never reaches the repo.
  const cacheFile = (SAMPLE || TEST_SEASON) ? path.join(os.tmpdir(), "halftime-sample-cache.json") : path.join(CACHE, "fixtures.json");
  const cache = readJson(cacheFile, {});
  const results = [], upcoming = [], matches = [];
  let probed = false;

  for (const league of LEAGUES) {
    const last = await api(`/fixtures?league=${league.id}&season=${season}&last=${LAST_PER_LEAGUE}`);
    const next = await api(`/fixtures?league=${league.id}&season=${season}&next=${NEXT_PER_LEAGUE}`);
    const seenName = last[0] && last[0].league && last[0].league.name;
    log(`${league.name} (id ${league.id}, season ${season}): API says "${seenName || "no fixtures"}", ${last.length} recent, ${next.length} upcoming`);
    if (seenName && seenName !== league.name) log(`  WARNING: league id ${league.id} returned "${seenName}", expected "${league.name}". Check scripts/config.mjs.`);

    for (const fx of last) {
      const status = fx.fixture.status && fx.fixture.status.short;
      if (!FINISHED.has(status)) continue;
      const id = String(fx.fixture.id);
      let detail = cache[id];
      const fresh = hoursAgo(fx.fixture.date) <= DETAIL_WINDOW_HOURS;
      if (!detail && fresh && requests + 2 <= MAX_REQUESTS_PER_RUN) {
        const events = await api(`/fixtures/events?fixture=${id}`);
        const lineups = await api(`/fixtures/lineups?fixture=${id}`);
        detail = { events, lineups, fetched: new Date().toISOString() };
        cache[id] = detail;
        if (PROBE && !probed) {
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
    for (const fx of next) {
      upcoming.push({ competition: league.short, dateIso: fx.fixture.date, home: fx.teams.home.name, away: fx.teams.away.name, venue: fx.fixture.venue && fx.fixture.venue.name });
    }
  }

  // Trim the cache to the last 400 fixtures so the file stays small.
  const ids = Object.keys(cache).sort((a, b) => Number(b) - Number(a)).slice(0, 400);
  writeJson(cacheFile, Object.fromEntries(ids.map(i => [i, cache[i]])));

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

main().catch(err => {
  console.error("fetch-scores failed:", err.message);
  if (err.plan) console.error("This is a plan or quota limit at API-Football, not a bug. The existing results file is kept. See README, 'Switching it on'.");
  process.exit(1);
});
