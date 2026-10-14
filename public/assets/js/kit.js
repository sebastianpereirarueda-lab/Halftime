// One kit's page. The kit is chosen by ?id=... in the address.
(function () {
  'use strict';
  var H = window.Halftime;
  var root = document.getElementById('kit');
  var kit = H.kitById(H.param('id'));

  if (!kit) {
    H.setTitle('Shirt not found');
    // Researched facts (see tools/plug-kit-facts.js). Every fact carries a link to where it comes from.
  var facts = kit.facts || {};
  var OUTLETS = [
    [/historicalkits\.co\.uk/, 'Historical Football Kits'], [/bbc\.co/, 'BBC'], [/theguardian\.com/, 'The Guardian'],
    [/independent\.co\.uk/, 'The Independent'], [/apnews\.com/, 'AP'], [/dw\.com/, 'DW'], [/rsssf\.org/, 'RSSSF'],
    [/mlsz\.hu/, 'Hungarian Football Federation']
  ];
  function sourceName(url) {
    var wiki = /^https?:\/\/(\w+)\.wikipedia\.org\/wiki\/([^#?]+)/.exec(url);
    if (wiki) {
      var title;
      try { title = decodeURIComponent(wiki[2]); } catch (e) { title = wiki[2]; }
      return 'Wikipedia' + (wiki[1] === 'en' ? '' : ' (' + wiki[1] + ')') + ': ' + title.replace(/_/g, ' ');
    }
    for (var i = 0; i < OUTLETS.length; i++) if (OUTLETS[i][0].test(url)) return OUTLETS[i][1];
    try { return new URL(url).hostname.replace(/^www\./, ''); } catch (e) { return 'Source'; }
  }
  function srcLink(url) {
    return url ? ' <a class="src" href="' + H.esc(url) + '" rel="noopener" title="' + H.esc(sourceName(url)) + '">source</a>' : '';
  }
  function factHtml(value, url, note) {
    if (value == null || value === '') return '<span class="tbr">To be researched</span>';
    return H.esc(value) + srcLink(url) + (note ? '<span class="fact-note">' + H.esc(note) + '</span>' : '');
  }

  var storyHtml = '';
  if (facts.story || facts.wornInFinal) {
    var allSources = [].concat(facts.storySources || [], facts.wornSource || [], facts.manufacturerSource || [], facts.debutSource || [])
      .filter(function (u, i, a) { return u && a.indexOf(u) === i; });
    storyHtml =
      '<h2 class="section-title">The shirt&rsquo;s story</h2>' +
      '<div class="kit-story">' +
        (facts.story ? '<p>' + H.esc(facts.story) + '</p>' : '') +
        (facts.wornInFinal
          ? '<p class="kit-story__worn"><span class="label">' + (facts.wornAs === 'change' ? 'Change kit worn on the day' : 'Worn on the day') + '</span> ' +
              H.esc(facts.wornInFinal.charAt(0).toUpperCase() + facts.wornInFinal.slice(1)) + '.' +
              (facts.wornNote ? ' <span class="fact-note">' + H.esc(facts.wornNote) + '.</span>' : '') + '</p>'
          : '') +
        (allSources.length
          ? '<div class="sources">Sources: ' + allSources.map(function (u) {
              return '<a href="' + H.esc(u) + '" rel="noopener">' + H.esc(sourceName(u)) + '</a>';
            }).join(' &middot; ') + '</div>'
          : '') +
      '</div>';
  }

  root.innerHTML =
      '<div class="notice"><div class="label label--accent">The Kit Room</div>' +
      '<h1 class="notice__title">Shirt not found</h1>' +
      '<p class="notice__text">No shirt has that catalogue number. It may have been renamed.</p>' +
      '<a class="btn btn--oxblood" href="./">Back to the Kit Room</a></div>';
    return;
  }

  H.setTitle(kit.team + ' ' + kit.year + ' shirt');
  var label = kit.team + ' ' + kit.year + ' shirt. ' + (kit.description || '');
  var worn = (kit.matches || []).map(H.matchById).filter(Boolean);

  // Where the colours come from: a cited source, or a note that they are still the team's usual colours.
  var coloursHtml = kit.coloursSource
    ? (kit.coloursUrl
        ? '<a href="' + H.esc(kit.coloursUrl) + '" rel="noopener">' + H.esc(kit.coloursSource) + '</a>'
        : H.esc(kit.coloursSource))
    : '<span class="tbr">Traditional colours, shirt worn on the day to be researched</span>';

  var wornHtml = worn.length
    ? '<ul class="linklist">' + worn.map(function (m) {
        return '<li><a href="../matches/match.html?id=' + encodeURIComponent(m.id) + '">' +
          '<span>' + H.esc(m.home.name) + ' ' + m.score.home + '&ndash;' + m.score.away + ' ' + H.esc(m.away.name) +
          ', ' + H.esc(m.competition) + ' ' + H.esc(m.stage) + '</span>' +
          '<span class="label">' + H.esc(m.date) + '</span></a></li>';
      }).join('') + '</ul>'
    : '<p class="card__text tbr" style="font-family:var(--serif)">No match cards for this shirt yet.</p>';

  // Researched facts (see tools/plug-kit-facts.js). Every fact carries a link to where it comes from.
  var facts = kit.facts || {};
  var OUTLETS = [
    [/historicalkits\.co\.uk/, 'Historical Football Kits'], [/bbc\.co/, 'BBC'], [/theguardian\.com/, 'The Guardian'],
    [/independent\.co\.uk/, 'The Independent'], [/apnews\.com/, 'AP'], [/dw\.com/, 'DW'], [/rsssf\.org/, 'RSSSF'],
    [/mlsz\.hu/, 'Hungarian Football Federation']
  ];
  function sourceName(url) {
    var wiki = /^https?:\/\/(\w+)\.wikipedia\.org\/wiki\/([^#?]+)/.exec(url);
    if (wiki) {
      var title;
      try { title = decodeURIComponent(wiki[2]); } catch (e) { title = wiki[2]; }
      return 'Wikipedia' + (wiki[1] === 'en' ? '' : ' (' + wiki[1] + ')') + ': ' + title.replace(/_/g, ' ');
    }
    for (var i = 0; i < OUTLETS.length; i++) if (OUTLETS[i][0].test(url)) return OUTLETS[i][1];
    try { return new URL(url).hostname.replace(/^www\./, ''); } catch (e) { return 'Source'; }
  }
  function srcLink(url) {
    return url ? ' <a class="src" href="' + H.esc(url) + '" rel="noopener" title="' + H.esc(sourceName(url)) + '">source</a>' : '';
  }
  function factHtml(value, url, note) {
    if (value == null || value === '') return '<span class="tbr">To be researched</span>';
    return H.esc(value) + srcLink(url) + (note ? '<span class="fact-note">' + H.esc(note) + '</span>' : '');
  }

  var storyHtml = '';
  if (facts.story || facts.wornInFinal) {
    var allSources = [].concat(facts.storySources || [], facts.wornSource || [], facts.manufacturerSource || [], facts.debutSource || [])
      .filter(function (u, i, a) { return u && a.indexOf(u) === i; });
    storyHtml =
      '<h2 class="section-title">The shirt&rsquo;s story</h2>' +
      '<div class="kit-story">' +
        (facts.story ? '<p>' + H.esc(facts.story) + '</p>' : '') +
        (facts.wornInFinal
          ? '<p class="kit-story__worn"><span class="label">' + (facts.wornAs === 'change' ? 'Change kit worn on the day' : 'Worn on the day') + '</span> ' +
              H.esc(facts.wornInFinal.charAt(0).toUpperCase() + facts.wornInFinal.slice(1)) + '.' +
              (facts.wornNote ? ' <span class="fact-note">' + H.esc(facts.wornNote) + '.</span>' : '') + '</p>'
          : '') +
        (allSources.length
          ? '<div class="sources">Sources: ' + allSources.map(function (u) {
              return '<a href="' + H.esc(u) + '" rel="noopener">' + H.esc(sourceName(u)) + '</a>';
            }).join(' &middot; ') + '</div>'
          : '') +
      '</div>';
  }

  root.innerHTML =
    '<div class="kit-detail">' +
      '<figure class="kit-detail__figure">' +
        '<div class="shirt-stage">' + H.shirtArt(kit, label, null, '../assets') + '</div>' +
        '<figcaption>Illustration &mdash; ' + H.esc(kit.description || '') +
          (kit.illustration && kit.illustration.credit ? '<br><span class="credit">' + H.esc(kit.illustration.credit) + '</span>' : '') +
        '</figcaption>' +
      '</figure>' +
      '<div class="kit-detail__body">' +
        '<div class="label label--accent">' + H.esc(H.kitNumber(kit)) + ' &middot; ' + H.esc(kit.year) + '</div>' +
        '<h1 class="kit-detail__title">' + H.esc(kit.team) + '</h1>' +
        '<p class="kit-detail__sub">' + H.esc(kit.result || '') + '</p>' +
        '<ul class="facts">' +
          '<li><span class="k">Competition</span><span class="v">' + H.esc(kit.competition || '') + '</span></li>' +
          '<li><span class="k">Type</span><span class="v">' + (kit.kind === 'club' ? 'Club shirt' : 'National team shirt') + '</span></li>' +
          '<li><span class="k">Manufacturer</span><span class="v">' + factHtml(facts.manufacturer, facts.manufacturerSource, facts.manufacturerNote) + '</span></li>' +
          '<li><span class="k">Debut</span><span class="v">' + factHtml(facts.debut, facts.debutSource) + '</span></li>' +
          (storyHtml ? '' : '<li><span class="k">Design notes</span><span class="v">' + H.factOrTbr(facts.story) + '</span></li>') +
          '<li><span class="k">Colours</span><span class="v">' + coloursHtml + '</span></li>' +
        '</ul>' +
        storyHtml +
        '<h2 class="section-title">Worn in</h2>' + wornHtml +
        '<a class="backlink" href="./">&larr; Back to the Kit Room</a>' +
      '</div>' +
    '</div>';
})();
