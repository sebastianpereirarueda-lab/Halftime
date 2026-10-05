// Front Page: fills in the news and the results box when the generated
// data files are present. Without them the printed placeholders stay.
(function () {
  'use strict';
  var H = window.Halftime;
  var news = window.HALFTIME_NEWS;
  var res = window.HALFTIME_RESULTS;

  function sourcesHtml(sources) {
    if (!sources || !sources.length) return '';
    return '<div class="sources">Sources: ' + sources.map(function (s) {
      return '<a href="' + H.esc(s.url) + '" rel="noopener">' + H.esc(s.outlet) + '</a>';
    }).join(' &middot; ') + '</div>';
  }

  function when(iso) {
    try { return new Date(iso).toLocaleString('en-GB', { weekday: 'long', hour: '2-digit', minute: '2-digit' }); } catch (e) { return ''; }
  }

  if (news && news.lead) {
    var lead = document.querySelector('.lead');
    lead.querySelector('.label').textContent = news.lead.tag || 'Lead Story';
    lead.querySelector('.lead__headline').textContent = news.lead.headline;
    lead.querySelector('.lead__standfirst').textContent = news.lead.standfirst;
    lead.querySelector('.lead__byline').innerHTML = 'By the Halftime desk &middot; written from ' + news.lead.sources.length +
      (news.lead.sources.length === 1 ? ' report' : ' reports') + ' &middot; updated ' + H.esc(when(news.updated));
    if (news.lead.image && news.lead.image.file) {
      var fig = lead.querySelector('.photo');
      fig.classList.add('photo--image');
      fig.innerHTML = '<img src="' + H.esc(news.lead.image.file) + '" alt="' + H.esc(news.lead.image.alt || '') + '" width="1536" height="1024">' +
        '<figcaption class="photo__caption">ILLUSTRATION &mdash; drawn for this story</figcaption>';
    }
    var body = lead.querySelector('.lead__body');
    body.outerHTML = news.lead.paragraphs.map(function (p, i) {
      return '<p class="lead__body' + (i === 0 ? ' dropcap' : '') + '">' + H.esc(p) + '</p>';
    }).join('') + sourcesHtml(news.lead.sources);

    var cards = document.querySelectorAll('.story');
    news.stories.slice(0, cards.length).forEach(function (st, i) {
      var c = cards[i];
      c.querySelector('.label').textContent = st.tag;
      if (st.image && st.image.file) {
        c.insertAdjacentHTML('afterbegin', '<figure class="story__figure"><img src="' + H.esc(st.image.file) + '" alt="' + H.esc(st.image.alt || '') + '" width="1024" height="1024" loading="lazy"><figcaption>Illustration</figcaption></figure>');
      }
      var h = c.querySelector('.story__headline a');
      h.textContent = st.headline;
      h.href = (st.sources[0] && st.sources[0].url) || '#';
      c.querySelector('.story__summary').textContent = st.summary;
      c.insertAdjacentHTML('beforeend', sourcesHtml(st.sources));
    });
  }

  if (res && res.results && res.results.length && !res.sample) {
    var list = document.querySelector('.results__list');
    var rows = res.results.slice(0, 6).map(function (r) {
      var score = r.score.home + ' - ' + r.score.away;
      var inner = '<span class="home">' + H.esc(r.home) + '</span><span class="score">' + score + '</span><span class="away">' + H.esc(r.away) + '</span>';
      return '<li class="results__row">' + (r.hasCard ? '<a class="results__link" href="matches/match.html?id=' + encodeURIComponent(r.id) + '">' + inner + '</a>' : inner) + '</li>';
    }).join('');
    list.innerHTML = rows;
    var title = document.getElementById('results-title');
    title.insertAdjacentHTML('afterend', '<div class="results__updated">Updated ' + H.esc(when(res.updated)) + '</div>');
  }
})();
