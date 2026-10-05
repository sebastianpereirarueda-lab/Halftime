// The owner's Studio: unlocks the encrypted Instagram posts with the passphrase.
// Format of every .bin file: 12-byte IV | AES-256-GCM ciphertext and tag.
(function () {
  'use strict';
  var form = document.getElementById('lock');
  var pass = document.getElementById('pass');
  var msg = document.getElementById('msg');
  var studio = document.getElementById('studio');
  var list = document.getElementById('posts');
  var count = document.getElementById('count');
  var urls = [];

  function say(text, isError) { msg.textContent = text; msg.className = 'studio-msg' + (isError ? ' err' : ''); }
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function b64(s) { var bin = atob(s), a = new Uint8Array(bin.length); for (var i = 0; i < bin.length; i++) a[i] = bin.charCodeAt(i); return a; }

  async function deriveKey(passphrase, info) {
    var base = await crypto.subtle.importKey('raw', new TextEncoder().encode(passphrase), 'PBKDF2', false, ['deriveKey']);
    return crypto.subtle.deriveKey({ name: 'PBKDF2', salt: b64(info.salt), iterations: info.iterations, hash: 'SHA-256' },
      base, { name: 'AES-GCM', length: 256 }, false, ['decrypt']);
  }
  async function openFile(key, name) {
    var r = await fetch('data/' + name, { cache: 'no-store' });
    if (!r.ok) throw new Error('missing');
    var buf = new Uint8Array(await r.arrayBuffer());
    return crypto.subtle.decrypt({ name: 'AES-GCM', iv: buf.slice(0, 12) }, key, buf.slice(12));
  }

  function when(iso) {
    try { return new Date(iso).toLocaleString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }); } catch (e) { return ''; }
  }

  async function copy(text, button) {
    try { await navigator.clipboard.writeText(text); }
    catch (e) {
      var t = button.closest('.post').querySelector('textarea');
      t.select(); document.execCommand('copy');
    }
    var old = button.textContent; button.textContent = 'Copied'; setTimeout(function () { button.textContent = old; }, 1600);
  }

  async function saveOrShare(post, blob) {
    var file = new File([blob], post.filename, { type: 'image/jpeg' });
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try { await navigator.share({ files: [file] }); return; } catch (e) { if (e && e.name === 'AbortError') return; }
    }
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = post.filename; document.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 2000);
  }

  function render(key, manifest) {
    var posts = manifest.posts || [];
    count.textContent = posts.length ? posts.length + (posts.length === 1 ? ' post ready' : ' posts ready') + ' · updated ' + when(manifest.updated) : 'No posts yet';
    list.innerHTML = posts.length ? '' : '<li class="empty">Posts appear here after the next edition is written.</li>';
    posts.forEach(function (post) {
      var li = document.createElement('li');
      li.className = 'post';
      li.innerHTML =
        '<div class="post__img"></div>' +
        '<div class="post__meta"><span>' + (post.kind === 'results' ? 'Results card' : 'Story card') + '</span><span>' + esc(when(post.created)) + '</span></div>' +
        '<p class="post__title">' + esc(post.title) + '</p>' +
        '<textarea readonly aria-label="Caption">' + esc(post.caption) + '</textarea>' +
        '<div class="post__actions"><button type="button" class="btn" data-act="copy">Copy caption</button>' +
        '<button type="button" class="btn btn--primary" data-act="share" disabled>Save or share</button></div>';
      list.appendChild(li);
      openFile(key, post.file).then(function (plain) {
        var blob = new Blob([plain], { type: 'image/jpeg' });
        var url = URL.createObjectURL(blob); urls.push(url);
        li.querySelector('.post__img').innerHTML = '<img src="' + url + '" alt="' + esc(post.title) + '" width="1080" height="1350">';
        var share = li.querySelector('[data-act=share]');
        share.disabled = false;
        share.addEventListener('click', function () { saveOrShare(post, blob); });
      }).catch(function () { li.querySelector('.post__img').innerHTML = '<div class="empty" style="height:100%">Picture unavailable</div>'; });
      li.querySelector('[data-act=copy]').addEventListener('click', function (e) { copy(post.caption, e.currentTarget); });
    });
  }

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    if (!window.crypto || !crypto.subtle) { say('This browser cannot unlock the Studio. Open it in Safari or Chrome over https.', true); return; }
    say('Unlocking…');
    var info;
    try {
      var r = await fetch('data/keyinfo.json', { cache: 'no-store' });
      if (!r.ok) throw new Error('none');
      info = await r.json();
    } catch (err) { say('The Studio is empty: no posts have been made yet.', true); return; }
    try {
      var key = await deriveKey(pass.value, info);
      var manifest = JSON.parse(new TextDecoder().decode(await openFile(key, 'manifest.bin')));
      pass.value = '';
      say('');
      form.hidden = true;
      studio.hidden = false;
      render(key, manifest);
    } catch (err) {
      say('That passphrase does not open the Studio.', true);
    }
  });

  document.getElementById('relock').addEventListener('click', function () {
    urls.forEach(function (u) { URL.revokeObjectURL(u); }); urls = [];
    list.innerHTML = ''; studio.hidden = true; form.hidden = false; pass.focus();
  });
})();
