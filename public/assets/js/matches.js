// List of match cards.
(function () {
  'use strict';
  var H = window.Halftime;
  function row(m) {
    return '<li><a href="match.html?id=' + encodeURIComponent(m.id) + '">' +
      '<span class="teams home">' + H.esc(m.home.name) + '</span>' +
      '<span class="score">' + m.score.home + ' &ndash; ' + m.score.away + '</span>' +
      '<span class="teams">' + H.esc(m.away.name) + '</span>' +
      '<span class="meta">' + H.esc(m.competition) + (m.stage ? ' &middot; ' + H.esc(m.stage) : '') + ' &middot; ' + H.esc(m.date) + '</span>' +
    '</a></li>';
  }
  var recent = H.recentMatches().filter(function (m) { return m.status === 'finished'; });
  var archive = H.archiveMatches();
  var html = '';
  if (recent.length) html += '<li class="match-list__head"><span class="section-title">Latest results</span></li>' + recent.map(row).join('');
  html += '<li class="match-list__head"><span class="section-title">From the archive</span></li>' + (archive.length ? archive.map(row).join('') : '<li class="empty">No archive cards yet.</li>');
  document.getElementById('match-list').innerHTML = html;
})();
