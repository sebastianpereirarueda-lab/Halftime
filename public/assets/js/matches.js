// List of match cards.
(function () {
  'use strict';
  var H = window.Halftime;
  var list = document.getElementById('match-list');
  var all = H.matches();
  list.innerHTML = all.length ? all.map(function (m) {
    return '<li><a href="match.html?id=' + encodeURIComponent(m.id) + '">' +
      '<span class="teams home">' + H.esc(m.home.name) + '</span>' +
      '<span class="score">' + m.score.home + ' &ndash; ' + m.score.away + '</span>' +
      '<span class="teams">' + H.esc(m.away.name) + '</span>' +
      '<span class="meta">' + H.esc(m.competition) + ' &middot; ' + H.esc(m.stage) + ' &middot; ' + H.esc(m.date) + '</span>' +
    '</a></li>';
  }).join('') : '<li class="empty">No match cards yet.</li>';
})();
