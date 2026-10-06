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
//  Stage 2, colours. The Wikipedia article about each final records the
//  kit both teams wore that day (the "Football kit" template, with hex
//  colours), under the CC BY-SA 4.0 licence. The importer reads those
//  articles through the Wikipedia API and writes the shirt colour, a
//  description, and a citation (article and revision) into each shirt.
//  A shirt whose colour Wikipedia only holds as a picture keeps the team's
//  traditional colours (table below) and says so.
//
//  Manufacturer, debut and design notes stay null, which the site prints
//  as "To be researched".
//
//  Entries already in kits.js / matches.js are kept (matched by id). The
//  only thing the importer refreshes on an existing shirt is its colours,
//  and only when the shirt has no coloursSource or one that starts with
//  "Wikipedia". To lock colours you set by hand, write
//  coloursSource: "hand" on that shirt.
//
//  Run from the project folder:   node tools/import-kits.js
//  Options:  --offline   use files already in tools/.cache, do not download
// ============================================================
'use strict';
const fs = require('fs');
const path = require('path');

const { decodePng, encodePng, mainColours, scaleUp } = require('./png.js');
const { drawShirt, PARTS } = require('./kit-art.js');

const ROOT = path.join(__dirname, '..');
const CACHE = path.join(__dirname, '.cache');
const KITS_FILE = path.join(ROOT, 'public', 'data', 'kits.js');
const ART_DIR = path.join(ROOT, 'public', 'assets', 'kits');     // one drawing per shirt
const BASE_DIR = path.join(__dirname, 'base');                   // outline drawings, rasterised
const ART_SCALE = 4;                                             // drawings are saved at 4x (400 by 236 pixels)
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

// Wikipedia article that documents each final, keyed by match id.
const WIKI_PAGE = {
  '1950-world-cup-final': 'Uruguay v Brazil (1950 FIFA World Cup)',
  '2020-euro-final': 'UEFA Euro 2020 final',
  '2024-euro-final': 'UEFA Euro 2024 final'
};
// Finals documented only on Wikipedia (no openfootball data): key -> article title.
const WIKI_FINALS = JSON.parse(fs.readFileSync(path.join(__dirname, 'finals.json'), 'utf8'));

function wikiPageFor(matchId) {
  if (WIKI_PAGE[matchId]) return WIKI_PAGE[matchId];
  const m = matchId.match(/^(\d{4})-world-cup-final$/);
  return m ? m[1] + ' FIFA World Cup final' : null;
}
// Wikipedia asks automated clients to say who they are.
const USER_AGENT = 'HalftimeKitImporter/1.0 (https://github.com/sebastianpereirarueda-lab/Halftime)';

// Names for describing a sourced hex colour in words.
const COLOUR_NAMES = [
  ['white', 'FFFFFF'], ['black', '000000'], ['red', 'DD0000'], ['dark red', '8B0000'],
  ['orange', 'FF6000'], ['yellow', 'FFDD33'], ['gold', 'E3C16F'], ['green', '008000'],
  ['dark green', '006400'], ['sky blue', '99CCFF'], ['light blue', '75AADB'], ['blue', '2050C0'],
  ['royal blue', '0000C0'], ['dark blue', '112855'], ['navy', '001363'], ['grey', '999999']
];
const COLOUR_WORDS = { white: 'FFFFFF', black: '000000', green: '008000', red: 'DD0000', blue: '2050C0',
  yellow: 'FFDD33', navy: '001363', sky: '99CCFF', orange: 'FF6000', gold: 'E3C16F' };

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

// Teams outside the TEAM table (most clubs) get an abbreviation made from their name and
// grey placeholder colours, which only show if Wikipedia has no colour for the shirt.
function teamInfo(name) {
  if (TEAM[name]) return TEAM[name];
  const words = name.replace(/[^A-Za-z0-9 ]/g, '').split(/\s+/).filter(w => !/^(fc|cf|sc|ac|afc|de|of|the|club)$/i.test(w));
  const short = (words.length >= 2 ? words.map(w => w[0]).join('').slice(0, 3) : name.slice(0, 3)).toUpperCase();
  return { short: short, body: '#9A9A9A', trim: '#1B1A17', stripes: [], desc: 'colours to be researched' };
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

// ---------- Wikipedia: the kits worn in each final ----------

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// Fetch an article's wikitext (cached). Retries politely on rate limiting.
async function fetchWiki(title) {
  const file = path.join(CACHE, 'wiki__' + title.replace(/[^A-Za-z0-9]+/g, '_') + '.json');
  if (fs.existsSync(file)) return JSON.parse(fs.readFileSync(file, 'utf8'));
  if (OFFLINE) throw new Error('Not in cache and --offline given: ' + title);
  const url = 'https://en.wikipedia.org/w/api.php?action=parse&prop=wikitext|revid|title&redirects=1&format=json&formatversion=2&page=' + encodeURIComponent(title);
  for (let attempt = 1; attempt <= 6; attempt++) {
    const res = await fetch(url, { headers: { 'User-Agent': USER_AGENT } });
    if (res.status === 429 || res.status >= 500) { await sleep(attempt * 4000); continue; }
    if (!res.ok) throw new Error('Wikipedia answered ' + res.status + ' for ' + title);
    const data = await res.json();
    if (!data.parse) throw new Error('Wikipedia has no article called "' + title + '"');
    fs.mkdirSync(CACHE, { recursive: true });
    fs.writeFileSync(file, JSON.stringify(data));
    await sleep(1500);
    return data;
  }
  throw new Error('Wikipedia kept rate-limiting requests for ' + title + '. Try again later.');
}

// Strip refs, footnotes, templates and links from a title value: "England<ref .../>" -> "England".
function cleanTitle(t) {
  return t.replace(/<ref[^>]*\/>/g, '').replace(/<ref[\s\S]*?<\/ref>/g, '').replace(/<ref[\s\S]*$/, '')
    .replace(/\{\{nowrap\|/g, '').replace(/\{\{[^{}]*\}\}/g, '').replace(/\{\{[\s\S]*$/, '')
    .replace(/\[\[([^\]|]*\|)?([^\]]*)\]\]/g, '$2').replace(/[{}]/g, '').trim();
}

// All "Football kit" templates in an article, as { title, body, leftarm, pattern_b, ... }.
// Walks the braces so that templates and refs nested inside a value do not cut it short.
function kitTemplates(wikitext) {
  const out = [];
  const re = /\{\{[Ff]ootball kit(?: box)?\b/g;
  let m;
  while ((m = re.exec(wikitext))) {
    let i = m.index + 2, depth = 1;
    while (i < wikitext.length && depth > 0) {
      if (wikitext.startsWith('{{', i)) { depth++; i += 2; }
      else if (wikitext.startsWith('}}', i)) { depth--; i += 2; }
      else i++;
    }
    const inner = wikitext.slice(m.index + m[0].length, i - 2);
    const fields = templateFields(inner);
    if (fields.title) fields.title = cleanTitle(fields.title);
    out.push(fields);
  }
  return out;
}

// The block of a template that starts at "{{Name" (first occurrence), without the braces.
function templateBlock(wikitext, name, from) {
  const re = new RegExp('\\{\\{\\s*' + name + '\\b', 'i');
  const m = re.exec(wikitext.slice(from || 0));
  if (!m) return null;
  const start = (from || 0) + m.index;
  let i = start + 2, depth = 1;
  while (i < wikitext.length && depth > 0) {
    if (wikitext.startsWith('{{', i)) { depth++; i += 2; }
    else if (wikitext.startsWith('}}', i)) { depth--; i += 2; }
    else i++;
  }
  return { inner: wikitext.slice(start + m[0].length, i - 2), end: i };
}

// Split a template's parameters on "|" at the top level (outside nested templates, links and refs).
function templateFields(inner) {
  {
    const parts = []; let cur = '', d = 0, link = 0, inRef = false;
    for (let j = 0; j < inner.length; j++) {
      const two = inner.substr(j, 2);
      if (!inRef && /^<ref\b/.test(inner.slice(j, j + 5)) && !/\/>/.test(inner.slice(j, inner.indexOf('>', j) + 1))) inRef = true;
      if (inRef && inner.startsWith('</ref>', j)) { inRef = false; cur += '</ref>'; j += 5; continue; }
      if (two === '{{') { d++; cur += two; j++; continue; }
      if (two === '}}') { d--; cur += two; j++; continue; }
      if (two === '[[') { link++; cur += two; j++; continue; }
      if (two === ']]') { link--; cur += two; j++; continue; }
      if (inner[j] === '|' && d === 0 && link === 0 && !inRef) { parts.push(cur); cur = ''; continue; }
      cur += inner[j];
    }
    parts.push(cur);
    const fields = {};
    parts.forEach(part => {
      const kv = part.match(/^\s*([a-z_0-9]+)\s*=\s*([\s\S]*)$/);
      if (kv) fields[kv[1]] = kv[2].trim();
    });
    return fields;
  }
}

// Plain text of a wikitext value: links become their label, templates and refs go.
function plainText(v) {
  return String(v || '')
    .replace(/<ref[^>]*\/>/g, '').replace(/<ref[\s\S]*?<\/ref>/g, '').replace(/<[^>]+>/g, '')
    .replace(/\{\{(?:fb-rt|fb|fbaicon|flagicon|flagdeco)\|([^|}]+)[^}]*\}\}/gi, '$1')
    .replace(/\{\{[^{}]*\}\}/g, '').replace(/\[\[([^\]|]*\|)?([^\]]*)\]\]/g, '$2')
    .replace(/'''?/g, '').replace(/\s+/g, ' ').trim();
}

// "18 May 1960", "{{Start date|2019|7|7|df=y}}" or "7 July 2019 (2019-07-07)" -> "2019-07-07".
function isoDate(v) {
  const sd = String(v).match(/\{\{\s*[Ss]tart date\|(\d{4})\|(\d{1,2})\|(\d{1,2})/);
  if (sd) return sd[1] + '-' + sd[2].padStart(2, '0') + '-' + sd[3].padStart(2, '0');
  const t = plainText(v);
  const dmy = t.match(/(\d{1,2}) ([A-Z][a-z]+) (\d{4})/);
  if (dmy && MONTHS.indexOf(dmy[2]) !== -1) return dmy[3] + '-' + String(MONTHS.indexOf(dmy[2]) + 1).padStart(2, '0') + '-' + dmy[1].padStart(2, '0');
  const mdy = t.match(/([A-Z][a-z]+) (\d{1,2}), (\d{4})/);
  if (mdy && MONTHS.indexOf(mdy[1]) !== -1) return mdy[3] + '-' + String(MONTHS.indexOf(mdy[1]) + 1).padStart(2, '0') + '-' + mdy[2].padStart(2, '0');
  return null;
}

// Scorers of one side from a Football box "goals" value: "*[[Paolo Guerrero|Guerrero]] {{goal|44|pen.}}".
function parseGoals(v, side) {
  const out = [];
  const re = /([^*\n]*?)\{\{\s*goal\s*\|([^}]*)\}\}/g;
  let m;
  while ((m = re.exec(String(v || '')))) {
    const who = plainText(m[1]);
    const args = m[2].split('|').map(a => a.trim());
    for (let i = 0; i < args.length; i += 2) {
      const minute = args[i].match(/^(\d+)(?:\+(\d+))?/);
      if (!minute) continue;
      const note = (args[i + 1] || '').toLowerCase();
      let name = who || '?';
      if (/o\.?g/.test(note)) name += ' (own goal)';
      if (/pen/.test(note)) name += ' (pen.)';
      out.push({ minute: Number(minute[1]) + (minute[2] ? Number(minute[2]) : 0), scorer: name, team: side });
    }
  }
  return out;
}

// Read a final documented on Wikipedia: teams, legs, scores, scorers, venue.
// Returns { teams: [a, b], legs: [{ date, venue, score: {home, away}, home: 0|1, away: 0|1, goals, aet, pens }] }.
function parseWikiFinal(wikitext) {
  const ib = templateBlock(wikitext, 'Infobox football match');
  if (!ib) throw new Error('No match infobox');
  const info = templateFields(ib.inner);
  const teams = [plainText(info.team1), plainText(info.team2)];
  const legs = [];
  let from = 0, box;
  while ((box = templateBlock(wikitext, '[Ff]ootball ?box', from))) {
    from = box.end;
    const f = templateFields(box.inner);
    const t1 = plainText(f.team1), t2 = plainText(f.team2);
    // Which infobox team is this box's team1? Match by name, else by code or order.
    let home = 0;
    if (t1 && teams[1] && (t1 === teams[1] || teams[1].toUpperCase().startsWith(t1.toUpperCase().slice(0, 3)) && !teams[0].toUpperCase().startsWith(t1.toUpperCase().slice(0, 3)))) home = 1;
    if (t1 === teams[0]) home = 0;
    const scoreText = plainText(f.score);
    const sc = scoreText.match(/(\d+)\s*[–-]\s*(\d+)/);
    if (!sc) continue;
    const pens = plainText(f.penaltyscore || '').match(/(\d+)\s*[–-]\s*(\d+)/);
    legs.push({
      date: isoDate(f.date || info.date),
      venue: plainText(f.stadium || ((info.stadium || '') + ', ' + (info.city || ''))),
      home: home, away: 1 - home,
      score: { home: Number(sc[1]), away: Number(sc[2]) },
      aet: /a\.?e\.?t/i.test(scoreText) || /\{\{\s*aet/i.test(f.score || '') || /yes/i.test(info.aet || ''),
      pens: pens ? { home: Number(pens[1]), away: Number(pens[2]) } : null,
      goals: parseGoals(f.goals1, 'home').concat(parseGoals(f.goals2, 'away')).sort((a, b) => a.minute - b.minute)
    });
  }
  if (!legs.length) throw new Error('No Football box with a score');
  return { teams: teams, legs: legs };
}

function hexOk(h) { return /^[0-9a-fA-F]{6}$/.test(h || ''); }

// Nudge a sourced colour a little toward the paper tone so it sits with the site's palette.
function toPalette(hex) {
  const paper = [0xF7, 0xF1, 0xE1];
  const rgb = [0, 2, 4].map(i => parseInt(hex.slice(i, i + 2), 16));
  const mixed = rgb.map((c, i) => Math.round(c * 0.9 + paper[i] * 0.1));
  return '#' + mixed.map(c => c.toString(16).padStart(2, '0').toUpperCase()).join('');
}

function colourName(hex) {
  const rgb = [0, 2, 4].map(i => parseInt(hex.slice(i, i + 2), 16));
  let best = null, bestD = Infinity;
  COLOUR_NAMES.forEach(([name, ref]) => {
    const r = [0, 2, 4].map(i => parseInt(ref.slice(i, i + 2), 16));
    const d = rgb.reduce((acc, c, i) => acc + (c - r[i]) * (c - r[i]), 0);
    if (d < bestD) { bestD = d; best = name; }
  });
  return best;
}

function luminance(hex) {
  const rgb = [0, 2, 4].map(i => parseInt(hex.slice(i, i + 2), 16));
  return (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
}
function isLight(hex) { return luminance(hex) > 150; }
function isNearWhite(hex) {
  const rgb = [0, 2, 4].map(i => parseInt(hex.slice(i, i + 2), 16));
  return Math.min.apply(null, rgb) > 220;
}

// Colour for a team's dot on the match timeline: the shirt, unless it is white.
function dotColour(colours) {
  if (!isNearWhite(colours.body.slice(1))) return colours.body;
  return isNearWhite(colours.trim.slice(1)) ? '#1B1A17' : colours.trim;
}

// Trim colour: a colour word in the collar/sleeve pattern name if there is one,
// otherwise a dark or light line that contrasts with the body.
function trimFor(tpl, bodyHex) {
  const names = [tpl.pattern_b, tpl.pattern_la, tpl.pattern_ra].join(' ').toLowerCase();
  for (const word of Object.keys(COLOUR_WORDS)) {
    if (names.indexOf(word) !== -1 && COLOUR_WORDS[word] !== bodyHex.toUpperCase()) return toPalette(COLOUR_WORDS[word]);
  }
  return isLight(bodyHex) ? '#1B1A17' : '#F4F1E6';
}

// Body colour of a Wikipedia kit pattern, read from its picture on Wikimedia Commons
// ("Kit body ita82.png"). Only the middle of the shirt is sampled, because the corners
// of those pictures are white background. Returns null when there is no such picture
// or the middle of it is transparent (the pattern only draws a collar or sleeves).
async function patternBodyColour(patternName) {
  const file = 'Kit body ' + patternName.replace(/^_/, '') + '.png';
  const safe = file.replace(/[^A-Za-z0-9.]+/g, '_');
  const metaFile = path.join(CACHE, 'commons__' + safe + '.json');
  const pngFile = path.join(CACHE, 'commons__' + safe);
  let meta;
  if (fs.existsSync(metaFile)) meta = JSON.parse(fs.readFileSync(metaFile, 'utf8'));
  else {
    if (OFFLINE) return null;
    const url = 'https://commons.wikimedia.org/w/api.php?action=query&prop=imageinfo&iiprop=url|mime|extmetadata&format=json&formatversion=2&titles=' + encodeURIComponent('File:' + file);
    const data = await fetchJsonRetry(url);
    const page = data.query && data.query.pages && data.query.pages[0];
    if (!page || page.missing || !page.imageinfo) meta = { missing: true };
    else {
      const ii = page.imageinfo[0];
      const em = ii.extmetadata || {};
      meta = { url: ii.url, mime: ii.mime, licence: (em.LicenseShortName || {}).value || 'licence not stated', file: file };
    }
    fs.mkdirSync(CACHE, { recursive: true });
    fs.writeFileSync(metaFile, JSON.stringify(meta));
  }
  if (meta.missing || meta.mime !== 'image/png') return null;
  if (!fs.existsSync(pngFile)) {
    if (OFFLINE) return null;
    const buf = await fetchBytesRetry(meta.url);
    fs.writeFileSync(pngFile, buf);
  }
  let img;
  try { img = decodePng(fs.readFileSync(pngFile)); }
  catch (e) { console.warn('  Could not read ' + file + ': ' + e.message); return null; }
  // Crop to the middle of the body: the central half across, lower two thirds down.
  const x0 = Math.floor(img.width * 0.25), x1 = Math.ceil(img.width * 0.75);
  const y0 = Math.floor(img.height * 0.33), y1 = Math.ceil(img.height * 0.95);
  const w = x1 - x0, h = y1 - y0, rgba = Buffer.alloc(w * h * 4);
  for (let y = 0; y < h; y++) img.rgba.copy(rgba, y * w * 4, ((y0 + y) * img.width + x0) * 4, ((y0 + y) * img.width + x1) * 4);
  const mc = mainColours({ width: w, height: h, rgba: rgba });
  if (mc.opaqueShare < 0.5 || !mc.colours.length) return null;
  return { hex: mc.colours[0].hex, file: file, licence: meta.licence };
}

async function fetchJsonRetry(url) {
  for (let attempt = 1; attempt <= 6; attempt++) {
    const res = await fetch(url, { headers: { 'User-Agent': USER_AGENT } });
    if (res.status === 429 || res.status >= 500) { await sleep(attempt * 4000); continue; }
    if (!res.ok) throw new Error('Request failed (' + res.status + '): ' + url);
    await sleep(1500);
    return res.json();
  }
  throw new Error('Kept being rate-limited: ' + url);
}

async function fetchBytesRetry(url) {
  for (let attempt = 1; attempt <= 6; attempt++) {
    const res = await fetch(url, { headers: { 'User-Agent': USER_AGENT } });
    if (res.status === 429 || res.status >= 500) { await sleep(attempt * 4000); continue; }
    if (!res.ok) throw new Error('Download failed (' + res.status + '): ' + url);
    await sleep(1500);
    return Buffer.from(await res.arrayBuffer());
  }
  throw new Error('Kept being rate-limited: ' + url);
}

// Apply the sourced kit to a shirt. Returns a short phrase like "yellow" for the match note.
async function applyWikiKit(kit, tpl, page, match) {
  const wornIn = /final$/i.test(page.title) ? page.title.replace(/^UEFA /, '') : match.competition + ', ' + match.stage.toLowerCase();
  const team = TEAM[kit.team];
  const link = 'https://en.wikipedia.org/w/index.php?title=' + encodeURIComponent(page.title.replace(/ /g, '_')) + '&oldid=' + page.revid;
  let source = 'Wikipedia, "' + page.title + '" (revision ' + page.revid + '), CC BY-SA 4.0';
  let body = hexOk(tpl.body) ? tpl.body.toUpperCase() : null;
  if (!body && tpl.pattern_b) {
    // Wikipedia holds this shirt's colour only inside a pattern picture: read the picture.
    const pic = await patternBodyColour(tpl.pattern_b);
    if (pic) { body = pic.hex; source += '; colour read from the Commons picture "' + pic.file + '" (' + pic.licence + ')'; }
  }
  if (!body) {
    kit.colours = { body: team.body, trim: team.trim, stripes: team.stripes };
    kit.description = 'Drawn in ' + kit.team + '\u2019s traditional home colours, ' + team.desc + '. Wikipedia records the shirt worn in the final only as a picture (pattern "' + (tpl.pattern_b || '?') + '"), so the exact colour is to be confirmed.';
    kit.coloursSource = source + ' (pattern only)';
    kit.coloursUrl = link;
    return team.desc.split(' with ')[0];
  }
  const name = colourName(body);
  const trim = trimFor(tpl, body);
  // Argentina's home shirt is sky blue and white stripes; the template's single body
  // colour is one of the two when that shirt was worn. Any other colour is a change kit.
  let stripes = [];
  let look = name + ' shirt';
  if (team.stripes.length && (name === 'sky blue' || name === 'light blue' || name === 'white')) {
    const sky = name === 'white' ? team.stripes[0] : toPalette(body);
    stripes = [sky, '#F4F1E6', sky, '#F4F1E6', sky];
    look = 'sky blue and white striped shirt';
  }
  kit.colours = { body: toPalette(body), trim: trim, stripes: stripes };
  kit.description = look.charAt(0).toUpperCase() + look.slice(1) + ', as worn in the ' + wornIn + '.';
  kit.coloursSource = source;
  kit.coloursUrl = link;
  return look.replace(/ shirt$/, '');
}

function canRefreshColours(kit) {
  return !kit.coloursSource || /^Wikipedia/.test(kit.coloursSource);
}

const wikiKits = new Map();   // kit id -> { tpl, page }, for the drawing stage

// Read the final's article and colour both shirts from it.
async function colourFromWikipedia(match, kitById) {
  const title = wikiPageFor(match.id);
  if (!title) return;
  const data = await fetchWiki(title);
  const page = { title: data.parse.title, revid: data.parse.revid };
  const templates = kitTemplates(data.parse.wikitext);
  const notes = [];
  for (const side of ['home', 'away']) {
    const kit = kitById.get(match[side].kit);
    if (!kit) continue;
    let tpl = templates.find(t => t.title === kit.team);
    if (!tpl) {
      // Clubs are often titled differently in the kit box ("Real Madrid CF"): take the
      // template in the same position as the team in the article's infobox.
      const parsed = parsedFinals.get(page.title);
      const idx = parsed ? parsed.teams.indexOf(kit.team) : -1;
      const named = templates.filter(t => t.title && !/Shortly/.test(t.title));
      if (idx !== -1 && named[idx]) tpl = named[idx];
    }
    if (!tpl) { console.warn('  No kit for ' + kit.team + ' in "' + page.title + '"'); continue; }
    if (!canRefreshColours(kit)) { notes.push(kit.team + ' in ' + (kit.description || '').toLowerCase().replace(/[.].*$/, '')); continue; }
    const look = await applyWikiKit(kit, tpl, page, match);
    wikiKits.set(kit.id, { tpl: tpl, page: page });
    notes.push(kit.team + ' in ' + look);
    if (match[side].colour !== undefined) {
      // Timeline dot: the body colour, or the trim when the body is pale.
      match[side].colour = dotColour(kit.colours);
    }
  }
  // Two teams in the same colour (1930: both in sky blue) need different timeline dots.
  if (match.home.colour === match.away.colour) {
    const awayKit = kitById.get(match.away.kit);
    match.away.colour = awayKit && !isNearWhite(awayKit.colours.trim.slice(1)) ? awayKit.colours.trim : '#1B1A17';
    if (match.away.colour === match.home.colour) match.away.colour = '#1B1A17';
  }
  if (notes.length === 2 && (!match.kitsNote || /to be researched/i.test(match.kitsNote) || /^Source: Wikipedia/m.test(match.kitsNote) || /\(Wikipedia/.test(match.kitsNote))) {
    match.kitsNote = notes.join('. ') + '. (Wikipedia, "' + page.title + '".)';
  }
}

// ---------- Stage 3: a drawing of each shirt ----------

// A pattern picture from Commons ("Kit body arg22H.png"), decoded, with its credit line.
// Returns null when Commons has no such picture.
async function patternPicture(part, patternName) {
  const file = part.file + patternName.replace(/_/g, ' ') + '.png';
  const safe = file.replace(/[^A-Za-z0-9.]+/g, '_');
  const metaFile = path.join(CACHE, 'commons__' + safe + '.json');
  const pngFile = path.join(CACHE, 'commons__' + safe);
  let meta;
  if (fs.existsSync(metaFile)) meta = JSON.parse(fs.readFileSync(metaFile, 'utf8'));
  else {
    if (OFFLINE) return null;
    const url = 'https://commons.wikimedia.org/w/api.php?action=query&prop=imageinfo&iiprop=url|mime|extmetadata&format=json&formatversion=2&titles=' + encodeURIComponent('File:' + file);
    const data = await fetchJsonRetry(url);
    const page = data.query && data.query.pages && data.query.pages[0];
    if (!page || page.missing || !page.imageinfo) meta = { missing: true };
    else {
      const ii = page.imageinfo[0], em = ii.extmetadata || {};
      meta = { url: ii.url.split('?')[0], mime: ii.mime, licence: (em.LicenseShortName || {}).value || 'licence not stated',
               artist: artistName((em.Artist || {}).value || ''), file: file };
    }
    fs.mkdirSync(CACHE, { recursive: true });
    fs.writeFileSync(metaFile, JSON.stringify(meta));
  }
  if (meta.missing || meta.mime !== 'image/png') return null;
  if (!fs.existsSync(pngFile)) {
    if (OFFLINE) return null;
    fs.writeFileSync(pngFile, await fetchBytesRetry(meta.url));
  }
  try {
    const img = decodePng(fs.readFileSync(pngFile));
    if (img.width !== part.width || img.height > part.height) { console.warn('  Unexpected size for ' + file + ' (' + img.width + ' by ' + img.height + ')'); return null; }
    return { img: img, credit: file + ' (' + meta.licence + (meta.artist ? ', ' + meta.artist : '') + ')' };
  } catch (e) { console.warn('  Could not read ' + file + ': ' + e.message); return null; }
}

// The artist field on Commons is HTML, usually a link to a user page: keep just the name.
function artistName(raw) {
  const s = String(raw).replace(/&amp;/g, '&').replace(/&quot;/g, '"');
  const user = s.match(/User:([^&"<>|]+)/);
  if (user) return user[1].trim();
  return s.replace(/<[^>]*>?/g, '').trim();
}

let baseImages = null;
function loadBases() {
  if (baseImages) return baseImages;
  baseImages = {};
  for (const part of PARTS) {
    const file = path.join(BASE_DIR, part.base.replace(/ /g, '_') + '@' + ART_SCALE + 'x.png');
    if (!fs.existsSync(file)) throw new Error('Missing outline drawing ' + file);
    baseImages[part.key] = decodePng(fs.readFileSync(file));
  }
  return baseImages;
}

// Draw one shirt from its Wikipedia kit template and save it under public/assets/kits/.
async function drawKit(kit, tpl, page) {
  const bases = loadBases();
  const parts = {}, credits = [];
  const bodyHex = hexOk(tpl.body) ? tpl.body : null;
  for (const part of PARTS) {
    const key = { la: 'leftarm', b: 'body', ra: 'rightarm', sh: 'shorts', so: 'socks' }[part.key];
    // Sleeves without a colour of their own take the body colour; shorts and socks are left
    // out of the drawing when the template says nothing about them.
    const hex = hexOk(tpl[key]) ? tpl[key] : ((part.key === 'sh' || part.key === 'so') ? null : bodyHex);
    const name = (tpl['pattern_' + part.key] || '').trim();
    if ((part.key === 'sh' || part.key === 'so') && !hex && !name) continue;
    let pattern = null;
    if (name) {
      pattern = await patternPicture(part, name);
      if (!pattern) {
        // Wikipedia sometimes has only one spelling of a pattern's sleeves.
        const alt = name.replace(/[A-Z]$/, c => c.toLowerCase());
        if (alt !== name) pattern = await patternPicture(part, alt);
      }
      if (!pattern) console.warn('  No picture for ' + part.file + name + ' (' + kit.id + ')');
      else credits.push(pattern.credit);
    }
    parts[part.key] = { colour: hex ? '#' + hex : (pattern ? null : '#' + kit.colours.body.slice(1)), pattern: pattern && pattern.img };
  }
  const img = drawShirt(parts, bases, ART_SCALE);
  fs.mkdirSync(ART_DIR, { recursive: true });
  fs.writeFileSync(path.join(ART_DIR, kit.id + '.png'), encodePng(img));
  kit.illustration = {
    file: kit.id + '.png',
    credit: 'Drawn after the kit shown in Wikipedia\u2019s "' + page.title + '" article. ' +
      (credits.length ? 'Pattern pictures from Wikimedia Commons: ' + credits.join('; ') + '.' : 'Plain colours, no pattern picture needed.') +
      ' Outline: Wikimedia Commons kit template drawings.'
  };
}

// ---------- finals known only from Wikipedia ----------

const parsedFinals = new Map();   // page title -> parseWikiFinal() result

function competitionMeta(kind, year) {
  const season = (year - 1) + '\u2013' + String(year).slice(2);
  if (kind === 'ucl' && year < 1993) return { competition: 'European Cup ' + year, kitCompetition: 'European Cup ' + season + ', final', kind: 'club', win: 'European Cup winners', lose: 'European Cup runners-up', id: year + '-european-cup-final' };
  if (kind === 'ucl') return { competition: 'UEFA Champions League ' + year, kitCompetition: 'UEFA Champions League ' + season + ', final', kind: 'club', win: 'Champions League winners', lose: 'Champions League runners-up', id: year + '-champions-league-final' };
  if (kind === 'euro') return { competition: 'UEFA Euro ' + year, kitCompetition: 'UEFA Euro ' + year + ', final', kind: 'nation', win: 'European Championship winners', lose: 'European Championship runners-up', id: year + '-euro-final' };
  if (kind === 'copa') return { competition: 'Copa Am\u00e9rica ' + year, kitCompetition: 'Copa Am\u00e9rica ' + year + ', final', kind: 'nation', win: 'Copa Am\u00e9rica winners', lose: 'Copa Am\u00e9rica runners-up', id: year + '-copa-america-final' };
  throw new Error('Unknown competition ' + kind);
}

// Build the match card(s) and the two shirts of a final from its Wikipedia article.
async function buildWikiFinal(key, title) {
  const [kind, yearText] = key.split('-');
  const year = Number(yearText);
  const meta = competitionMeta(kind, year);
  const data = await fetchWiki(title);
  const page = { title: data.parse.title, revid: data.parse.revid };
  const parsed = parseWikiFinal(data.parse.wikitext);
  parsedFinals.set(page.title, parsed);
  const teams = parsed.teams;
  // Winner over all legs: goals in total, then the shoot-out of the last leg.
  const total = [0, 0];
  parsed.legs.forEach(l => { total[l.home] += l.score.home; total[l.away] += l.score.away; });
  const last = parsed.legs[parsed.legs.length - 1];
  let winner = total[0] > total[1] ? 0 : total[1] > total[0] ? 1 : null;
  if (winner === null && last.pens) winner = last.pens.home > last.pens.away ? last.home : last.away;
  const legNames = parsed.legs.length === 1 ? [''] : parsed.legs.length === 2 ? ['first-leg', 'second-leg'] : ['first-leg', 'second-leg', 'play-off'];
  const stages = parsed.legs.length === 1 ? ['Final'] : parsed.legs.length === 2 ? ['Final, first leg', 'Final, second leg'] : ['Final, first leg', 'Final, second leg', 'Final, play-off'];
  const kitId = name => slug(name) + '-' + year;
  const out = [];
  parsed.legs.forEach((leg, i) => {
    const id = meta.id + (legNames[i] ? '-' + legNames[i] : '');
    WIKI_PAGE[id] = page.title;
    const homeName = teams[leg.home], awayName = teams[leg.away];
    const home = teamInfo(homeName), away = teamInfo(awayName);
    let note = null;
    if (leg.pens) note = (leg.aet ? 'After extra time. ' : '') + (leg.pens.home > leg.pens.away ? homeName : awayName) + ' won ' + leg.pens.home + '\u2013' + leg.pens.away + ' on penalties.';
    else if (leg.aet) note = 'After extra time.';
    const match = {
      id: id, competition: meta.competition, stage: stages[i],
      date: leg.date ? prettyDate(leg.date) : 'Date to be researched',
      venue: leg.venue || 'Venue to be researched',
      home: { name: homeName, short: home.short, colour: dotColour(home), label: winner === null ? 'Finalists' : winner === leg.home ? 'Winners' : 'Runners-up', kit: kitId(homeName) },
      away: { name: awayName, short: away.short, colour: dotColour(away), label: winner === null ? 'Finalists' : winner === leg.away ? 'Winners' : 'Runners-up', kit: kitId(awayName) },
      score: { home: leg.score.home, away: leg.score.away },
      scoreNote: note, extraTime: !!leg.aet,
      goals: leg.goals,
      kitsNote: 'Shirts worn in this match: to be researched.',
      stats: null,
      source: 'Wikipedia, "' + page.title + '" (revision ' + page.revid + '), CC BY-SA 4.0'
    };
    const kits = teams.map((name, ti) => {
      const t = teamInfo(name);
      return {
        id: kitId(name), team: name, year: year, kind: meta.kind, competition: meta.kitCompetition,
        result: winner === null ? 'Finalists' : winner === ti ? meta.win : meta.lose,
        colours: { body: t.body, trim: t.trim, stripes: t.stripes },
        description: 'Drawn in ' + name + '\u2019s traditional home colours, ' + t.desc + '. The shirt worn in the final is to be researched.',
        facts: { manufacturer: null, debut: null, story: null },
        matches: [id]
      };
    });
    out.push({ match: match, kits: kits });
  });
  return out;
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
    home: { name: final.team1, short: home.short, colour: dotColour(home), label: score.winner === 'home' ? winLabel : loseLabel, kit: kitId(final.team1) },
    away: { name: final.team2, short: away.short, colour: dotColour(away), label: score.winner === 'away' ? winLabel : loseLabel, kit: kitId(final.team2) },
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

  for (const [key, title] of Object.entries(WIKI_FINALS)) {
    try { for (const b of await buildWikiFinal(key, title)) built.push(b); }
    catch (e) { console.warn('  Skipped ' + key + ' (' + title + '): ' + e.message); }
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

  // Stage 2: colours, from the Wikipedia article about each final.
  let coloured = 0;
  for (const m of matchData.items) {
    try {
      await colourFromWikipedia(m, kitById);
      coloured++;
    } catch (e) {
      console.warn('  Colours skipped for ' + m.id + ': ' + e.message);
    }
  }

  // Stage 3: a drawing of every shirt that has a Wikipedia kit on record.
  let drawn = 0;
  for (const kit of kitsData.items) {
    const w = wikiKits.get(kit.id);
    if (!w || kit.illustration === 'hand') continue;
    try { await drawKit(kit, w.tpl, w.page); drawn++; }
    catch (e) { console.warn('  Drawing skipped for ' + kit.id + ': ' + e.message); }
  }

  // Shirts in year order, then by team; matches in date order.
  kitsData.items.sort((a, b) => a.year - b.year || a.team.localeCompare(b.team));
  matchData.items.sort((a, b) => new Date(a.date) - new Date(b.date));

  writeDataFile(KITS_FILE, kitsData.header, 'HALFTIME_KITS', kitsData.items);
  writeDataFile(MATCHES_FILE, matchData.header, 'HALFTIME_MATCHES', matchData.items);

  console.log('Shirts:  ' + kitsData.items.length + ' in catalogue (' + addedKits + ' added, ' + linked + ' existing linked to a match).');
  console.log('Matches: ' + matchData.items.length + ' cards (' + addedMatches + ' added).');
  console.log('Colours: ' + coloured + ' finals read from Wikipedia.');
  console.log('Drawings: ' + drawn + ' shirts drawn into public/assets/kits/.');
}

main().catch(err => { console.error(err.message || err); process.exit(1); });
