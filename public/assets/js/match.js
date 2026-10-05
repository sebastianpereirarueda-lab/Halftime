// One match card. The match is chosen by ?id=... in the address.
(function () {
  'use strict';
  var H = window.Halftime;
  var root = document.getElementById('match');
  var m = H.matchById(H.param('id'));

  if (!m) {
    H.setTitle('Match not found');
    root.innerHTML =
      '<div class="notice"><div class="label label--accent">Match Cards</div>' +
      '<h1 class="notice__title">Match not found</h1>' +
      '<p class="notice__text">No match card has that name. It may have been renamed.</p>' +
      '<a class="btn btn--oxblood" href="./">All match cards</a></div>';
    return;
  }

  H.setTitle(m.home.name + ' ' + m.score.home + '–' + m.score.away + ' ' + m.away.name + ', ' + m.competition + ' ' + m.stage);

  var FULL = 90;
  var pct = function (min) { return (Math.min(min, FULL) / FULL * 100).toFixed(1) + '%'; };
  var goals = (m.goals || []).slice().sort(function (a, b) { return a.minute - b.minute; });

  // Goals close together get a taller stem so their labels don't overlap.
  var raised = [];
  goals.forEach(function (g, i) {
    var prev = goals[i - 1];
    raised[i] = prev && (g.minute - prev.minute) < 10 && !raised[i - 1];
  });

  var ticks = [0, 45, 90].map(function (t) {
    return '<div class="timeline__tick" style="left:' + pct(t) + '">' + t + '&prime;</div>';
  }).join('');

  var markers = goals.map(function (g, i) {
    var side = g.team === 'home' ? m.home : m.away;
    return '<div class="timeline__goal" style="left:' + pct(g.minute) + '">' +
      '<div class="timeline__goal-label"><span class="nm">' + H.esc(g.scorer) + ' </span>' + g.minute + (g.extra ? '+' + g.extra : '') + '&prime;</div>' +
      '<div class="timeline__stem" style="height:' + (raised[i] ? 30 : 0) + 'px"></div>' +
      '<div class="timeline__dot" style="background:' + H.esc(side.colour) + '" title="' + H.esc(side.name) + '"></div>' +
    '</div>';
  }).join('');

  var minuteText = function (g) { return g.minute + (g.extra ? '+' + g.extra : '') + '&prime;'; };
  var kindText = function (g) { return g.kind === 'og' ? ' (og)' : g.kind === 'pen' ? ' (pen)' : ''; };
  var scorers = goals.length ? goals.map(function (g) {
    var side = g.team === 'home' ? m.home : m.away;
    return '<li><span>' + minuteText(g) + '</span><span class="name">' + H.esc(g.scorer) + kindText(g) + '</span><span class="team">' + H.esc(side.short) + '</span></li>';
  }).join('') : '<li><span class="tbr">' + ((m.score.home + m.score.away) === 0 ? 'No goals.' : m.status === 'finished' && m.source ? 'Goal details not available yet.' : 'No goals recorded.') + '</span></li>';

  var lineupsHtml = '';
  if (m.lineups && m.lineups.length) {
    lineupsHtml = m.lineups.map(function (l) {
      var side = l.team === 'home' ? m.home : m.away;
      return '<div class="lineup"><div class="lineup__team">' + H.esc(side.name) + (l.formation ? ' <span class="lineup__formation">' + H.esc(l.formation) + '</span>' : '') + '</div>' +
        '<ol class="lineup__xi">' + l.startXI.map(function (p) { return '<li><span class="lineup__no">' + H.esc(p.number == null ? '' : p.number) + '</span>' + H.esc(p.name) + '</li>'; }).join('') + '</ol>' +
        (l.coach ? '<div class="lineup__coach">Coach: ' + H.esc(l.coach) + '</div>' : '') + '</div>';
    }).join('');
  }

  var kitLinks = [m.home, m.away].map(function (side) {
    var k = side.kit ? H.kitById(side.kit) : null;
    return k ? '<a class="backlink" style="margin:0 20px 8px 0" href="../kits/kit.html?id=' + encodeURIComponent(k.id) + '">' + H.esc(side.name) + ' shirt &rarr;</a>' : '';
  }).join('');

  var homeWin = m.score.home > m.score.away, awayWin = m.score.away > m.score.home;

  root.innerHTML =
    '<div class="card">' +
      '<div class="card__head"><span>Match Card &middot; ' + H.esc(m.competition) + ' &middot; ' + H.esc(m.stage) + '</span><span>' + H.esc(m.date) + '</span></div>' +
      '<div class="scoreline">' +
        '<div class="scoreline__team"><div class="scoreline__name">' + H.esc(m.home.name) + '</div>' +
          '<div class="scoreline__label' + (homeWin ? ' scoreline__label--win' : '') + '">' + H.esc(m.home.label || '') + '</div></div>' +
        '<div class="scoreline__score">' + m.score.home + ' &ndash; ' + m.score.away + '</div>' +
        '<div class="scoreline__team"><div class="scoreline__name">' + H.esc(m.away.name) + '</div>' +
          '<div class="scoreline__label' + (awayWin ? ' scoreline__label--win' : '') + '">' + H.esc(m.away.label || '') + '</div></div>' +
      '</div>' +
      '<div class="card__venue">' + H.esc(m.venue || '') + (m.source ? ' <span class="card__source">&middot; data: ' + H.esc(m.source) + '</span>' : '') + '</div>' +
      '<div class="timeline-wrap">' +
        '<div class="section-title">Minute by Minute</div>' +
        '<div class="timeline">' + ticks + markers + '</div>' +
        '<div class="legend">' +
          '<span><span class="legend__dot" style="background:' + H.esc(m.home.colour) + '"></span>' + H.esc(m.home.name) + ' goal</span>' +
          '<span><span class="legend__dot" style="background:' + H.esc(m.away.colour) + '"></span>' + H.esc(m.away.name) + ' goal</span>' +
        '</div>' +
      '</div>' +
      '<div class="card__cols">' +
        '<div class="card__col"><div class="section-title">Scorers</div><ul class="scorers">' + scorers + '</ul></div>' +
        '<div class="card__col"><div class="section-title">Kits Worn</div>' +
          '<div class="card__text">' + (m.kitsNote ? H.esc(m.kitsNote) : '<span class="tbr">The shirts from this match are not catalogued yet.</span>') + '</div>' + kitLinks +
          '<div style="margin-top:12px"><a class="btn btn--oxblood" href="../kits/">See the shirts</a></div></div>' +
        '<div class="card__col"><div class="section-title">' + (lineupsHtml ? 'Lineups' : 'Full Stats') + '</div>' +
          (lineupsHtml ? '<div class="lineups">' + lineupsHtml + '</div>' :
          '<div class="card__text">' + (m.stats ? H.esc(m.stats) : '<span class="tbr">Possession, shots, lineups, subs and cards will sit here once a stats source is chosen.</span>') + '</div>') + '</div>' +
      '</div>' +
    '</div>';
})();
