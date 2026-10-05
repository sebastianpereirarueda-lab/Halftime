// Draws a shirt the way Wikipedia's "Football kit" template does: a block of
// colour for each sleeve and the body, the pattern picture laid over it, and
// the outline drawing on top. The white area the pictures leave outside the
// shirt is cut away so the drawing sits on any background.
'use strict';
const { scaleUp } = require('./png.js');

// Geometry of the template, in pixels at 1x.
const PARTS = [
  { key: 'la', x: 0, width: 31, file: 'Kit left arm' },
  { key: 'b', x: 31, width: 38, file: 'Kit body' },
  { key: 'ra', x: 69, width: 31, file: 'Kit right arm' }
];
const WIDTH = 100, HEIGHT = 59;

function hexToRgb(hex) {
  const h = hex.replace('#', '');
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}

// "Outside the shirt" mask for one part, from its outline picture: white pixels
// reachable from the picture's corners are background.
function outsideMask(base) {
  const { width, height, rgba } = base;
  const outside = new Uint8Array(width * height);
  const isWhite = i => rgba[i * 4 + 3] > 0 && rgba[i * 4] > 235 && rgba[i * 4 + 1] > 235 && rgba[i * 4 + 2] > 235;
  const stack = [];
  const push = (x, y) => { if (x < 0 || y < 0 || x >= width || y >= height) return; const i = y * width + x; if (!outside[i] && isWhite(i)) { outside[i] = 1; stack.push(i); } };
  push(0, 0); push(width - 1, 0); push(0, height - 1); push(width - 1, height - 1);
  while (stack.length) {
    const i = stack.pop(), x = i % width, y = Math.floor(i / width);
    push(x + 1, y); push(x - 1, y); push(x, y + 1); push(x, y - 1);
  }
  return outside;
}

// Blend src over dst at the same size (straight alpha).
function over(dst, src) {
  for (let i = 0; i < dst.width * dst.height; i++) {
    const o = i * 4, a = src.rgba[o + 3] / 255;
    if (!a) continue;
    const da = dst.rgba[o + 3] / 255, outA = a + da * (1 - a);
    for (let c = 0; c < 3; c++) dst.rgba[o + c] = Math.round((src.rgba[o + c] * a + dst.rgba[o + c] * da * (1 - a)) / (outA || 1));
    dst.rgba[o + 3] = Math.round(outA * 255);
  }
}

// parts: { la: { colour: '#RRGGBB' | null, pattern: img | null }, b: ..., ra: ... }
// bases: { la: img, b: img, ra: img } outline pictures, all at the same scale k.
// Returns an RGBA picture of the shirt at scale k.
function drawShirt(parts, bases, k) {
  const out = { width: WIDTH * k, height: HEIGHT * k, rgba: Buffer.alloc(WIDTH * k * HEIGHT * k * 4) };
  for (const part of PARTS) {
    const p = parts[part.key] || {};
    const base = bases[part.key];
    const w = part.width * k, h = HEIGHT * k;
    const layer = { width: w, height: h, rgba: Buffer.alloc(w * h * 4) };
    if (p.colour) {
      const [r, g, b] = hexToRgb(p.colour);
      for (let i = 0; i < w * h; i++) { layer.rgba[i * 4] = r; layer.rgba[i * 4 + 1] = g; layer.rgba[i * 4 + 2] = b; layer.rgba[i * 4 + 3] = 255; }
    }
    if (p.pattern) over(layer, p.pattern.width === w ? p.pattern : scaleUp(p.pattern, k));
    over(layer, base);
    const outside = outsideMask(base);
    for (let i = 0; i < w * h; i++) if (outside[i]) layer.rgba[i * 4 + 3] = 0;
    // Copy the part into place.
    for (let y = 0; y < h; y++) layer.rgba.copy(out.rgba, (y * out.width + part.x * k) * 4, y * w * 4, (y + 1) * w * 4);
  }
  return out;
}

module.exports = { drawShirt, PARTS, WIDTH, HEIGHT };
