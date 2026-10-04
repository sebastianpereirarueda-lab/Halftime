// Fills the dateline with today's date, e.g. "Sunday, October 4, 2026".
// If JavaScript is off, the date written in the HTML stays.
(function () {
  var el = document.querySelector('[data-today]');
  if (!el) return;
  try {
    el.textContent = new Date().toLocaleDateString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
  } catch (e) { /* keep the fallback text */ }
})();
