#!/usr/bin/env node
// ============================================================
//  HALFTIME — CATALOGUE IMPORTER
//
//  Fills public/data/kits.js and public/data/matches.js from the free,
//  public-domain (CC0) football data published by the openfootball project:
//    https://github.com/openfootball/worldcup.json   (every World Cup, 1930 on)
//    https://github.com/openfootball/euro.json       (Euro 2020 and 2024)
//
//  For every tournament it takes the final and creates:
//    - one match card (date, venue, score, scorers), and
//    - one shirt per finalist (team, year, competition, result).
//
//  What it does NOT know: the colours of the shirt actually worn.
//  No free database provides that. Each generated shirt is drawn in the
//  team's traditional home colours (table below) and says so in its
//  description. Manufacturer, debut and design notes stay null, which the
//  site prints as "To be researched".
//
//  Entries already in kits.js / matches.js are kept exactly as they are
//  (matched by id). Only new ids are added, so hand edits are safe.
//
//  Run from the project folder:   node tools/import-kits.js
//  Options:  --offline   use files already in tools/.cache, do not download
// ============================================================
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const CACHE = path.join(__dirname, '.cache');
const KITS_FILE = path.join(ROOT, 'public', 'data', 'kits.js');
const MATCHES_FILE = path.join(ROOT, 'public', 'data', 'matches.js');
const OFFLINE = process.argv.includes('--offline');

const RAW = 'https://raw.githubusercontent.com/openfootball/';

// World Cups: year -> host, as written in the competition line of each shirt.
const WORLD_CUPS = {
  1930: 'Uruguay', 1934: 'Italy', 1938: 'France', 1950: 'Brazil', 1954: 'Switzerland',
  1958: 'Sweden', 1962: 'Chile', 1966: 'England', 1970: 'Mexico', 1974: 'West Germany',
  1978: 'Argentina', 1982: 'Spain', 1986: 'Mexico', 1990: 'Italy', 1994: 'United States',
  1998: 'France', 2002: 'South Korea and Japan', 2006: 'Germany', 2010: 'South Africa',
  2014: 'Brazil', 2018: 'Russia', 2022: 'Qatar', 2026: 'Canada, Mexico and United States'
};

// Euros in euro.json: folder -> { year the final was played, host }.
const EUROS = {
  2020: { year: 2021, host: 'held across Europe', name: 'UEFA Euro 2020' },
  2024: { year: 2024, host: 'Germany', name: 'UEFA Euro 2024' }
};

// Traditional home colours, in the site's palette. "desc" is the wording used
// in the shirt description. These are the teams' customary first-choice
// colours, not a record of the shirt worn on the day.
const TEAM = {
  'Argentina':      { short: 'ARG', body: '#7DB8E0', trim: '#1B1A17', stripes: ['#7DB8E0', '#F4F1E6', '#7DB8E0', '#F4F1E6', '#7DB8E0'], desc: 'sky blue and white vertical stripes' },
  'Brazil':         { short: 'BRA', body: '#E8C32A', trim: '#1F6B3A', stripes: [], desc: 'yellow with green trim' },
  'Croatia':        { short: 'CRO', body: '#B3261E', trim: '#F4F1E6', stripes: [], desc: 'red and white; the chequered pattern is not drawn' },
  'Czechoslovakia': { short: 'TCH', body: '#B3261E', trim: '#F4F1E6', stripes: [], desc: 'red with white trim' },
  'England':        { short: 'ENG', body: '#F4F1E6', trim: '#1F2F5C', stripes: [], desc: 'white with navy trim' },
  'France':         { short: 'FRA', body: '#1F4E9C', trim: '#F4F1E6', stripes: [], desc: 'blue with white trim' },
  'Germany':        { short: 'GER', body: '#F4F1E6', trim: '#1B1A17', stripes: [], desc: 'white with black trim' },
  'Hungary':        { short: 'HUN', body: '#B3261E', trim: '#F4F1E6', stripes: [], desc: 'red with white trim' },
  'Italy':          { short: 'ITA', body: '#1F4E9C', trim: '#F4F1E6', stripes: [], desc: 'blue with white trim' },
  'Netherlands':    { short: 'NED', body: '#E86F1C', trim: '#1B1A17', stripes: [], desc: 'orange with black trim' },
  'Spain':          { short: 'ESP', body: '#B3261E', trim: '#E8C32A', stripes: [], desc: 'red with yellow trim' },
  'Sweden':         { short: 'SWE', body: '#E8C32A', trim: '#1F4E9C', stripes: [], desc: 'yellow with blue trim' },
  'Uruguay':        { short: 'URU', body: '#6FA9DC', trim: '#1B1A17', stripes: [], desc: 'light blue with black trim' },
  'West Germany':   { short: 'FRG', body: '#F4F1E6', trim: '#1B1A17', stripes: [], desc: 'white with black trim' }
};

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
  'August', 'September', 'October', 'November', 'December'];

// ---------- small helpers ----------

async function fetchJson(relPath) {
  const file = path.join(CACHE, relPath.replace(/\//g, '__'));
  if (fs.existsSync(file)) return JSON.parse(fs.readFileSync(file, 'utf8'));
  if (OFFLINE) throw new Error('Not in cache and --offline given: ' + relPath);
  const url = RAW + relPath;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Download failed (' + res.status + '): ' + url);
  const text = await res.text();
  fs.mkdirSync(CACHE, { recursive: true });
  fs.writeFileSync(file, text);
  return JSON.parse(text);
}

// Load an existing data file by running it with a fake window.
function loadExisting(file, globalName) {
  const src = fs.readFileSync(file, 'utf8');
  const marker = 'window.' + globalName + ' = [';
  const at = src.indexOf(marker);
  if (at === -1) throw new Error('Could not find "' + marker + '" in ' + file);
  const header = src.slice(0, at);
  const win = {};
  new Function('window', src)(win);
  return { header, items: win[globalName] || [] };
}

function slug(s) {
  return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function prettyDate(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  return d + ' ' + MONTHS[m - 1] + ' ' + y;
}

// openfootball writes surnames in capitals in the detailed files:
// "Roberto BONINSEGNA" -> "Boninsegna", "CARLOS ALBERTO" -> "Carlos Alberto".
// Names that are already mixed case ("Mario Götze") are left alone.
// Mixed-case full names ("Lionel Messi", "Ángel Di María") are cut to the
// surname, which is how the hand-written cards name scorers.
const PARTICLES = ['da', 'de', 'del', 'della', 'di', 'do', 'dos', 'du', 'la', 'le', 'van', 'von', 'der', 'den', 'mac', 'mc', 'st.'];
function scorerName(raw) {
  const words = String(raw).trim().split(/\s+/);
  const caps = words.filter(w => w === w.toUpperCase() && /[A-Z]/.test(w));
  if (caps.length) return caps.map(w => w.split('-').map(p => p.charAt(0) + p.slice(1).toLowerCase()).join('-')).join(' ');
  if (words.length < 2) return words[0];
  let i = words.length - 1;
  while (i > 0 && PARTICLES.includes(words[i - 1].toLowerCase())) i--;
  return words.slice(i).join(' ');
}

function goalsOf(m, side) {
  const list = m['goals' + (side === 'home' ? 1 : 2)] || [];
  return list.map(g => {
    let name = scorerName(g.name);
    if (g.owngoal) name += ' (own goal)';
    if (g.penalty) name += ' (pen.)';
    // Minutes come as 45, "45" or "45+1" (stoppage time), sometimes with a separate offset.
    const parts = String(g.minute).match(/^(\d+)(?:\+(\d+))?$/);
    if (!parts) throw new Error('Unreadable minute "' + g.minute + '" for ' + g.name);
    const minute = Number(parts[1]) + (parts[2] ? Number(parts[2]) : 0) + (g.offset ? Number(g.offset) : 0);
    return { minute, scorer: name, team: side };
  });
}

// Final score and a note for extra time / penalties.
function finalScore(score, homeName, awayName) {
  if (Array.isArray(score)) return { home: score[0], away: score[1], note: null, winner: score[0] > score[1] ? 'home' : score[1] > score[0] ? 'away' : null, extraTime: false };
  const full = score.et || score.ft;
  const out = { home: full[0], away: full[1], note: null, winner: null, extraTime: !!score.et };
  if (score.p) {
    out.winner = score.p[0] > score.p[1] ? 'home' : 'away';
    out.note = 'After extra time. ' + (out.winner === 'home' ? homeName : awayName) + ' won ' + score.p[0] + '–' + score.p[1] + ' on penalties.';
  } else {
    out.winner = full[0] > full[1] ? 'home' : full[1] > full[0] ? 'away' : null;
    if (score.et) out.note = 'After extra time.';
  }
  return out;
}

function findFinal(data, year) {
  const finals = data.matches.filter(m => /^final/i.test(m.round));
  if (!finals.length) throw new Error('No final found for ' + data.name);
  if (finals.length === 1) return finals[0];
  // 1950 had no final: a final group of four. The last match, Uruguay v Brazil,
  // decided the title. The two source files list that round in different orders,
  // so find the match by its teams rather than by position.
  const decider = finals.find(m => [m.team1, m.team2].sort().join('|') === 'Brazil|Uruguay');
  if (!decider) throw new Error('Could not find the deciding match for ' + data.name);
  return decider;
}

function teamInfo(name) {
  const t = TEAM[name];
  if (!t) throw new Error('No colour entry for "' + name + '". Add it to the TEAM table in tools/import-kits.js.');
  return t;
}

// Writes a value as JavaScript in the same style as the hand-written files.
function js(v, indent) {
  const pad = '  '.repeat(indent);
  if (v === null || v === undefined) return 'null';
  if (typeof v === 'number' || typeof v === 'boolean') return String(v);
  if (typeof v === 'string') return JSON.stringify(v);
  if (Array.isArray(v)) {
    if (!v.length) return '[]';
    if (v.every(x => typeof x !== 'object' || x === null)) return '[' + v.map(x => js(x, indent)).join(', ') + ']';
    return '[\n' + v.map(x => pad + '  ' + js(x, indent + 1)).join(',\n') + '\n' + pad + ']';
  }
  const keys = Object.keys(v);
  const inline = keys.every(k => typeof v[k] !== 'object' || v[k] === null || (Array.isArray(v[k]) && v[k].every(x => typeof x !== 'object')));
  if (inline && keys.length <= 6) return '{ ' + keys.map(k => k + ': ' + js(v[k], indent)).join(', ') + ' }';
  return '{\n' + keys.map(k => pad + '  ' + k + ': ' + js(v[k], indent + 1)).join(',\n') + '\n' + pad + '}';
}

function writeDataFile(file, header, globalName, items) {
  const body = items.map(it => '  ' + js(it, 1)).join(',\n');
  fs.writeFileSync(file, header + 'window.' + globalName + ' = [\n' + body + '\n];\n');
}

// ---------- build one tournament ----------

function buildFinal(opts) {
  const { final, year, competition, shortName, matchId, stage, winLabel, loseLabel, resultWin, resultLose, kitCompetition } = opts;
  const home = teamInfo(final.team1), away = teamInfo(final.team2);
  const score = finalScore(final.score, final.team1, final.team2);
  const goals = goalsOf(final, 'home').concat(goalsOf(final, 'away')).sort((a, b) => a.minute - b.minute);

  const kitId = name => slug(name) + '-' + year;
  const match = {
    id: matchId,
    competition: competition,
    stage: stage,
    date: prettyDate(final.date),
    venue: final.ground,
    home: { name: final.team1, short: home.short, colour: home.body === '#F4F1E6' ? home.trim : home.body, label: score.winner === 'home' ? winLabel : loseLabel, kit: kitId(final.team1) },
    away: { name: final.team2, short: away.short, colour: away.body === '#F4F1E6' ? away.trim : away.body, label: score.winner === 'away' ? winLabel : loseLabel, kit: kitId(final.team2) },
    score: { home: score.home, away: score.away },
    scoreNote: score.note,
    extraTime: score.extraTime,
    goals: goals,
    kitsNote: 'Shirts worn in this match: to be researched.',
    stats: null,
    source: 'openfootball ' + shortName + ' (CC0)'
  };

  const kits = [final.team1, final.team2].map(name => {
    const t = teamInfo(name);
    const won = (name === final.team1 && score.winner === 'home') || (name === final.team2 && score.winner === 'away');
    return {
      id: kitId(name),
      team: name,
      year: year,
      kind: 'nation',
      competition: kitCompetition,
      result: won ? resultWin : resultLose,
      colours: { body: t.body, trim: t.trim, stripes: t.stripes },
      description: 'Drawn in ' + name + '’s traditional home colours, ' + t.desc + '. The shirt worn in the final is to be researched.',
      facts: { manufacturer: null, debut: null, story: null },
      matches: [matchId]
    };
  });

  return { match, kits };
}

// ---------- main ----------

async function main() {
  const kitsData = loadExisting(KITS_FILE, 'HALFTIME_KITS');
  const matchData = loadExisting(MATCHES_FILE, 'HALFTIME_MATCHES');
  const kitById = new Map(kitsData.items.map(k => [k.id, k]));
  const matchById = new Map(matchData.items.map(m => [m.id, m]));

  const built = [];

  for (const year of Object.keys(WORLD_CUPS).map(Number)) {
    // The "-full" file carries scorers for every final; the plain file does not.
    let data;
    try { data = await fetchJson('worldcup.json/master/' + year + '/worldcup-full.json'); }
    catch (e) { data = await fetchJson('worldcup.json/master/' + year + '/worldcup.json'); }
    const final = findFinal(data, year);
    const plain = await fetchJson('worldcup.json/master/' + year + '/worldcup.json');
    const plainFinal = findFinal(plain, year);
    // Prefer the plain file's goal list when it has one: its names keep accents.
    if (plainFinal.goals1 || plainFinal.goals2) { final.goals1 = plainFinal.goals1; final.goals2 = plainFinal.goals2; }
    built.push(buildFinal({
      final, year,
      competition: 'FIFA World Cup ' + year,
      shortName: 'worldcup.json ' + year,
      matchId: year + '-world-cup-final',
      stage: year === 1950 ? 'Final round, deciding match' : 'Final',
      winLabel: 'Winners', loseLabel: 'Runners-up',
      resultWin: 'World Cup winners', resultLose: 'World Cup runners-up',
      kitCompetition: 'FIFA World Cup ' + year + ', ' + WORLD_CUPS[year]
    }));
  }

  for (const folder of Object.keys(EUROS).map(Number)) {
    const e = EUROS[folder];
    const data = await fetchJson('euro.json/master/' + folder + '/euro.json');
    const final = findFinal(data, folder);
    built.push(buildFinal({
      final, year: e.year,
      competition: e.name,
      shortName: 'euro.json ' + folder,
      matchId: folder + '-euro-final',
      stage: 'Final',
      winLabel: 'Winners', loseLabel: 'Runners-up',
      resultWin: 'European Championship winners', resultLose: 'European Championship runners-up',
      kitCompetition: e.name + ', ' + e.host
    }));
  }

  let addedKits = 0, addedMatches = 0, linked = 0;
  for (const b of built) {
    if (!matchById.has(b.match.id)) { matchData.items.push(b.match); matchById.set(b.match.id, b.match); addedMatches++; }
    for (const k of b.kits) {
      const existing = kitById.get(k.id);
      if (!existing) { kitsData.items.push(k); kitById.set(k.id, k); addedKits++; continue; }
      // Keep the hand-written shirt, but make sure it links to its final.
      existing.matches = existing.matches || [];
      if (!existing.matches.includes(b.match.id)) { existing.matches.push(b.match.id); linked++; }
    }
  }

  // Shirts in year order, then by team; matches in date order.
  kitsData.items.sort((a, b) => a.year - b.year || a.team.localeCompare(b.team));
  matchData.items.sort((a, b) => new Date(a.date) - new Date(b.date));

  writeDataFile(KITS_FILE, kitsData.header, 'HALFTIME_KITS', kitsData.items);
  writeDataFile(MATCHES_FILE, matchData.header, 'HALFTIME_MATCHES', matchData.items);

  console.log('Shirts:  ' + kitsData.items.length + ' in catalogue (' + addedKits + ' added, ' + linked + ' existing linked to a match).');
  console.log('Matches: ' + matchData.items.length + ' cards (' + addedMatches + ' added).');
}

main().catch(err => { console.error(err.message || err); process.exit(1); });
