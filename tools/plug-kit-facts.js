// Puts the kit research from research/A1-kits-batch-*.md into public/data/kits.js.
//
//   node tools/plug-kit-facts.js           write the facts
//   node tools/plug-kit-facts.js --check   only report what would change
//
// Each batch file holds one JSON list (see docs/PERPLEXITY-TASKS.md, task A1).
// research/A1-corrections.json holds edits made after checking the research;
// its fields replace the batch's fields for that shirt.
'use strict';
const fs = require('fs');
const path = require('path');
const { loadExisting, writeDataFile } = require('./datafile.js');

const ROOT = path.join(__dirname, '..');
const RESEARCH = path.join(ROOT, 'research');
const KITS_FILE = path.join(ROOT, 'public', 'data', 'kits.js');
const CHECK = process.argv.includes('--check');

function readBatches() {
  const files = fs.readdirSync(RESEARCH).filter(f => /^A1-kits-batch-\d+\.(md|json)$/.test(f)).sort();
  const out = [];
  for (const f of files) {
    const text = fs.readFileSync(path.join(RESEARCH, f), 'utf8');
    const m = f.endsWith('.json') ? [null, text] : text.match(/```json\s*([\s\S]*?)```/);
    if (!m) throw new Error(f + ': no ```json block found');
    let list;
    try { list = JSON.parse(m[1]); } catch (e) { throw new Error(f + ': the JSON does not parse (' + e.message + ')'); }
    if (!Array.isArray(list)) throw new Error(f + ': expected a JSON list');
    list.forEach(r => out.push({ file: f, r }));
  }
  return out;
}

// Field order in kits.js, so every shirt reads the same way.
const ORDER = ['manufacturer', 'manufacturerSource', 'manufacturerNote', 'debut', 'debutSource', 'story', 'storySources',
  'wornInFinal', 'wornAs', 'wornSource', 'wornNote'];
const ordered = f => Object.fromEntries(ORDER.filter(k => k in f).map(k => [k, f[k]]));

const isUrl = s => typeof s === 'string' && /^https?:\/\/\S+$/.test(s);

// The batch files mark debuts like "(design debut, not this specific garment)" for us;
// readers only need the sentence before it.
function cleanDebut(s) {
  return s.replace(/\s*\([^()]*\b(debut|not sourced|approximate)\b[^()]*\)\s*$/i, '').trim();
}

// One research record -> the facts object stored on the kit.
function toFacts(r) {
  const f = { manufacturer: null, debut: null, story: null };
  if (r.manufacturer && r.manufacturer.value) {
    f.manufacturer = r.manufacturer.value;
    f.manufacturerSource = r.manufacturer.source;
    // Historical Football Kits is a site of drawings: a maker named only there was read off the logo drawn on the shirt.
    if (/historicalkits\.co\.uk/.test(r.manufacturer.source)) f.manufacturerNote = 'Going by the maker’s logo on Historical Football Kits’ drawing of this kit';
  }
  if (r.debut && r.debut.value) { f.debut = cleanDebut(r.debut.value); f.debutSource = r.debut.source; }
  if (r.story && r.story.value) { f.story = r.story.value; f.storySources = r.story.sources || []; }
  if (r.worn_in_final && r.worn_in_final.colours) {
    f.wornInFinal = r.worn_in_final.colours;
    f.wornAs = r.worn_in_final.home_or_change === 'change' ? 'change' : 'home';
    f.wornSource = r.worn_in_final.source;
  }
  return f;
}

function problems(id, f) {
  const p = [];
  if (f.manufacturer && !isUrl(f.manufacturerSource)) p.push('manufacturer has no source link');
  if (f.debut && !isUrl(f.debutSource)) p.push('debut has no source link');
  if (f.story && (!f.storySources.length || !f.storySources.every(isUrl))) p.push('story sources missing or not links');
  if (f.wornInFinal && !isUrl(f.wornSource)) p.push('worn-in-final has no source link');
  return p.map(x => id + ': ' + x);
}

function main() {
  const corrections = JSON.parse(fs.readFileSync(path.join(RESEARCH, 'A1-corrections.json'), 'utf8'));
  const data = loadExisting(KITS_FILE, 'HALFTIME_KITS');
  const byId = new Map(data.items.map(k => [k.id, k]));
  const errors = [];
  const seen = new Set();
  let changed = 0;

  for (const { file, r } of readBatches()) {
    const kit = byId.get(r.id);
    if (!kit) { errors.push(file + ': no shirt with id "' + r.id + '"'); continue; }
    if (seen.has(r.id)) { errors.push(file + ': "' + r.id + '" appears twice'); continue; }
    seen.add(r.id);
    let facts = toFacts(r);
    const fix = corrections[r.id] || {};
    for (const k of Object.keys(fix)) if (k !== 'why') facts[k] = fix[k];
    if (facts.manufacturer === null) { delete facts.manufacturerSource; delete facts.manufacturerNote; }
    const unknown = Object.keys(facts).filter(k => !ORDER.includes(k));
    if (unknown.length) errors.push('A1-corrections.json: "' + r.id + '" has unknown fields ' + unknown.join(', '));
    facts = ordered(facts);
    errors.push(...problems(r.id, facts));
    if (JSON.stringify(kit.facts) !== JSON.stringify(facts)) { kit.facts = facts; changed++; }
  }
  for (const id of Object.keys(corrections)) if (!id.startsWith('_') && !seen.has(id)) errors.push('A1-corrections.json: "' + id + '" is not in any batch');

  if (errors.length) { console.error('Not written. Problems:\n  ' + errors.join('\n  ')); process.exit(1); }
  console.log(seen.size + ' shirts researched, ' + changed + ' updated, ' + (data.items.length - seen.size) + ' still to research.');
  if (!CHECK && changed) writeDataFile(KITS_FILE, data.header, 'HALFTIME_KITS', data.items);
}

main();
