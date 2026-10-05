// Shared helpers for Halftime pages. Loaded before the page scripts.
window.Halftime = (function () {
  'use strict';

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function param(name) {
    try { return new URLSearchParams(window.location.search).get(name) || ''; }
    catch (e) { return ''; }
  }

  function pad3(n) { return String(n).padStart(3, '0'); }

  // Flat shirt drawing, same shape as the design reference.
  function shirtSvg(colours, label, size) {
    var body = colours.body || '#CCCCCC';
    var trim = colours.trim || '#1B1A17';
    var stripes = (colours.stripes && colours.stripes.length === 5) ? colours.stripes : [body, body, body, body, body];
    var outline = 'M40 8 L20 18 L4 44 L22 54 L30 44 L30 112 L90 112 L90 44 L98 54 L116 44 L100 18 L80 8 Q60 24 40 8 Z';
    var rects = stripes.map(function (c, i) {
      return '<rect x="' + (30 + i * 12) + '" y="44" width="12" height="68" fill="' + esc(c) + '"/>';
    }).join('');
    var s = size ? ' width="' + size + '" height="' + size + '"' : '';
    return '<svg viewBox="0 0 120 120"' + s + ' role="img" aria-label="' + esc(label) + '">' +
      '<path d="' + outline + '" fill="' + esc(body) + '"/>' + rects +
      '<path d="' + outline + '" fill="none" stroke="#1B1A17" stroke-width="2.5" stroke-linejoin="round"/>' +
      '<path d="M40 8 Q60 24 80 8" fill="none" stroke="' + esc(trim) + '" stroke-width="5"/>' +
      '<path d="M4 44 L22 54" fill="none" stroke="' + esc(trim) + '" stroke-width="5"/>' +
      '<path d="M98 54 L116 44" fill="none" stroke="' + esc(trim) + '" stroke-width="5"/>' +
      '</svg>';
  }

  // The shirt picture for a card or page: the drawing if there is one, else the flat SVG.
  // pathToAssets is the relative path from the page to the assets folder, e.g. '../assets'.
  function shirtArt(kit, label, size, pathToAssets) {
    if (kit.illustration && kit.illustration.file) {
      var s = size ? ' width="' + size + '"' : '';
      return '<img class="kit-art" src="' + esc(pathToAssets) + '/kits/' + esc(kit.illustration.file) + '" alt="' + esc(label) + '"' + s + ' loading="lazy">';
    }
    return shirtSvg(kit.colours, label, size);
  }

  function kits() { return window.HALFTIME_KITS || []; }
  function matches() { return window.HALFTIME_MATCHES || []; }
  function kitById(id) { return kits().find(function (k) { return k.id === id; }) || null; }
  function matchById(id) { return matches().find(function (m) { return m.id === id; }) || null; }
  function kitNumber(kit) { return 'No. ' + pad3(kits().indexOf(kit) + 1); }
  function decadeOf(year) { return Math.floor(year / 10) * 10; }

  // Value or an italic "to be researched" note.
  function factOrTbr(v) {
    return (v == null || v === '') ? '<span class="tbr">To be researched</span>' : esc(v);
  }

  function setTitle(t) { document.title = t + ' — Halftime'; }

  return { esc: esc, param: param, shirtSvg: shirtSvg, shirtArt: shirtArt, kits: kits, matches: matches,
           kitById: kitById, matchById: matchById, kitNumber: kitNumber,
           decadeOf: decadeOf, factOrTbr: factOrTbr, setTitle: setTitle };
})();
