// Reading and writing the hand-written data files in public/data (kits.js, matches.js).
// Shared by import-kits.js and plug-kit-facts.js so both write the same layout.
'use strict';
const fs = require('fs');

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

module.exports = { loadExisting, js, writeDataFile };
