// One kit's page. The kit is chosen by ?id=... in the address.
(function () {
  'use strict';
  var H = window.Halftime;
  var root = document.getElementById('kit');
  var kit = H.kitById(H.param('id'));

  if (!kit) {
    H.setTitle('Shirt not found');
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

  root.innerHTML =
    '<div class="kit-detail">' +
      '<figure class="kit-detail__figure">' +
        '<div class="shirt-stage">' + H.shirtSvg(kit.colours, label) + '</div>' +
        '<figcaption>Illustration &mdash; ' + H.esc(kit.description || '') + '</figcaption>' +
      '</figure>' +
      '<div class="kit-detail__body">' +
        '<div class="label label--accent">' + H.esc(H.kitNumber(kit)) + ' &middot; ' + H.esc(kit.year) + '</div>' +
        '<h1 class="kit-detail__title">' + H.esc(kit.team) + '</h1>' +
        '<p class="kit-detail__sub">' + H.esc(kit.result || '') + '</p>' +
        '<ul class="facts">' +
          '<li><span class="k">Competition</span><span class="v">' + H.esc(kit.competition || '') + '</span></li>' +
          '<li><span class="k">Type</span><span class="v">' + (kit.kind === 'club' ? 'Club shirt' : 'National team shirt') + '</span></li>' +
          '<li><span class="k">Manufacturer</span><span class="v">' + H.factOrTbr(kit.facts && kit.facts.manufacturer) + '</span></li>' +
          '<li><span class="k">Debut</span><span class="v">' + H.factOrTbr(kit.facts && kit.facts.debut) + '</span></li>' +
          '<li><span class="k">Design notes</span><span class="v">' + H.factOrTbr(kit.facts && kit.facts.story) + '</span></li>' +
          '<li><span class="k">Colours</span><span class="v">' + coloursHtml + '</span></li>' +
        '</ul>' +
        '<h2 class="section-title">Worn in</h2>' + wornHtml +
        '<a class="backlink" href="./">&larr; Back to the Kit Room</a>' +
      '</div>' +
    '</div>';
})();
