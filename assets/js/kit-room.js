// The Kit Room: search box, decade buttons and nation/club buttons.
(function () {
  'use strict';
  var H = window.Halftime;
  var grid = document.getElementById('kit-grid');
  var count = document.getElementById('kit-count');
  var search = document.getElementById('q');

  // One button per decade that actually has a shirt, so the filters grow with the catalogue.
  var decadesBox = document.getElementById('decades');
  var decades = [];
  H.kits().forEach(function (k) {
    var d = H.decadeOf(k.year);
    if (decades.indexOf(d) === -1) decades.push(d);
  });
  decades.sort(function (a, b) { return a - b; }).forEach(function (d) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'chip';
    b.setAttribute('data-decade', String(d));
    b.setAttribute('aria-pressed', 'false');
    b.textContent = d + 's';
    decadesBox.appendChild(b);
  });

  var decadeButtons = Array.prototype.slice.call(document.querySelectorAll('[data-decade]'));
  var kindButtons = Array.prototype.slice.call(document.querySelectorAll('[data-kind]'));

  var state = { q: '', decade: 'all', kind: null };

  function norm(s) {
    return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  }

  function matches(kit) {
    if (state.decade !== 'all' && H.decadeOf(kit.year) !== Number(state.decade)) return false;
    if (state.kind && kit.kind !== state.kind) return false;
    if (state.q) {
      // Search the team, the year and the type. Not the competition, so
      // "brazil" does not also find shirts from tournaments held in Brazil.
      var hay = norm([kit.team, kit.year, kit.kind === 'nation' ? 'nation national' : 'club'].join(' '));
      var words = norm(state.q).split(/\s+/).filter(Boolean);
      for (var i = 0; i < words.length; i++) if (hay.indexOf(words[i]) === -1) return false;
    }
    return true;
  }

  function card(kit) {
    var label = kit.team + ' ' + kit.year + ' shirt. ' + (kit.description || '');
    return '<li>' +
      '<a class="kit-card" href="kit.html?id=' + encodeURIComponent(kit.id) + '">' +
        '<div class="kit-card__meta"><span>' + H.esc(H.kitNumber(kit)) + '</span><span class="year">' + H.esc(kit.year) + '</span></div>' +
        '<div class="shirt-stage">' + H.shirtArt(kit, label, 190, '../assets') + '</div>' +
        '<div class="kit-card__team">' + H.esc(kit.team) + '</div>' +
        '<div class="kit-card__note">' + H.esc(kit.result || '') + '</div>' +
        '<div class="kit-card__more">View kit details</div>' +
      '</a></li>';
  }

  function render() {
    var all = H.kits();
    var shown = all.filter(matches);
    grid.innerHTML = shown.length
      ? shown.map(card).join('')
      : '<li class="empty">No shirts match. Try another word, or press All.</li>';
    count.textContent = shown.length === all.length
      ? 'Showing all ' + all.length + ' shirts'
      : 'Showing ' + shown.length + ' of ' + all.length + ' shirts';
  }

  function press(buttons, active) {
    buttons.forEach(function (b) { b.setAttribute('aria-pressed', b === active ? 'true' : 'false'); });
  }

  decadeButtons.forEach(function (b) {
    b.addEventListener('click', function () {
      state.decade = b.getAttribute('data-decade');
      press(decadeButtons, b);
      render();
    });
  });

  kindButtons.forEach(function (b) {
    b.addEventListener('click', function () {
      var kind = b.getAttribute('data-kind');
      state.kind = (state.kind === kind) ? null : kind;   // click again to switch off
      press(kindButtons, state.kind ? b : null);
      render();
    });
  });

  search.addEventListener('input', function () { state.q = search.value.trim(); render(); });

  render();
})();
