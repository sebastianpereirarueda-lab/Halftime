// Minimal PNG reader, enough for the small kit pattern pictures on Wikimedia Commons.
// Returns { width, height, rgba } where rgba is one byte per channel, row by row.
// Supports 8-bit greyscale, RGB, palette, greyscale+alpha and RGBA, non-interlaced.
'use strict';
const zlib = require('zlib');

function decodePng(buf) {
  const sig = [137, 80, 78, 71, 13, 10, 26, 10];
  for (let i = 0; i < 8; i++) if (buf[i] !== sig[i]) throw new Error('Not a PNG file');
  let pos = 8, width = 0, height = 0, depth = 0, type = 0, interlace = 0;
  let palette = null, trns = null;
  const idat = [];
  while (pos < buf.length) {
    const len = buf.readUInt32BE(pos);
    const name = buf.toString('ascii', pos + 4, pos + 8);
    const data = buf.subarray(pos + 8, pos + 8 + len);
    if (name === 'IHDR') {
      width = data.readUInt32BE(0); height = data.readUInt32BE(4);
      depth = data[8]; type = data[9]; interlace = data[12];
    } else if (name === 'PLTE') palette = data;
    else if (name === 'tRNS') trns = data;
    else if (name === 'IDAT') idat.push(data);
    else if (name === 'IEND') break;
    pos += 12 + len;
  }
  if (depth !== 8) throw new Error('Only 8-bit PNGs are supported (this one is ' + depth + '-bit)');
  if (interlace) throw new Error('Interlaced PNGs are not supported');
  const channels = { 0: 1, 2: 3, 3: 1, 4: 2, 6: 4 }[type];
  if (!channels) throw new Error('Unknown PNG colour type ' + type);
  const raw = zlib.inflateSync(Buffer.concat(idat));
  const stride = width * channels;
  const out = Buffer.alloc(stride * height);
  let prev = Buffer.alloc(stride);
  for (let y = 0; y < height; y++) {
    const filter = raw[y * (stride + 1)];
    const line = raw.subarray(y * (stride + 1) + 1, (y + 1) * (stride + 1));
    const cur = Buffer.alloc(stride);
    for (let i = 0; i < stride; i++) {
      const a = i >= channels ? cur[i - channels] : 0;
      const b = prev[i];
      const c = i >= channels ? prev[i - channels] : 0;
      let v = line[i];
      if (filter === 1) v += a;
      else if (filter === 2) v += b;
      else if (filter === 3) v += (a + b) >> 1;
      else if (filter === 4) {
        const p = a + b - c, pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c);
        v += (pa <= pb && pa <= pc) ? a : (pb <= pc ? b : c);
      }
      cur[i] = v & 255;
    }
    cur.copy(out, y * stride);
    prev = cur;
  }
  const rgba = Buffer.alloc(width * height * 4);
  for (let p = 0; p < width * height; p++) {
    const i = p * channels, o = p * 4;
    if (type === 6) { rgba[o] = out[i]; rgba[o + 1] = out[i + 1]; rgba[o + 2] = out[i + 2]; rgba[o + 3] = out[i + 3]; }
    else if (type === 2) { rgba[o] = out[i]; rgba[o + 1] = out[i + 1]; rgba[o + 2] = out[i + 2]; rgba[o + 3] = 255; }
    else if (type === 0) { rgba[o] = rgba[o + 1] = rgba[o + 2] = out[i]; rgba[o + 3] = 255; }
    else if (type === 4) { rgba[o] = rgba[o + 1] = rgba[o + 2] = out[i]; rgba[o + 3] = out[i + 1]; }
    else if (type === 3) {
      const k = out[i];
      rgba[o] = palette[k * 3]; rgba[o + 1] = palette[k * 3 + 1]; rgba[o + 2] = palette[k * 3 + 2];
      rgba[o + 3] = trns && k < trns.length ? trns[k] : 255;
    }
  }
  return { width, height, rgba };
}

// The main colours of the opaque part of a picture: close shades are grouped,
// and each group is reported as its average colour and share of opaque pixels.
function mainColours(img) {
  const bins = new Map();
  let opaque = 0;
  for (let p = 0; p < img.width * img.height; p++) {
    const o = p * 4;
    if (img.rgba[o + 3] < 200) continue;
    opaque++;
    const r = img.rgba[o], g = img.rgba[o + 1], b = img.rgba[o + 2];
    const key = ((r >> 4) << 8) | ((g >> 4) << 4) | (b >> 4);
    const bin = bins.get(key) || { n: 0, r: 0, g: 0, b: 0 };
    bin.n++; bin.r += r; bin.g += g; bin.b += b;
    bins.set(key, bin);
  }
  const hex = n => n.toString(16).padStart(2, '0').toUpperCase();
  return {
    opaqueShare: opaque / (img.width * img.height),
    colours: Array.from(bins.values()).sort((a, b) => b.n - a.n).map(bin => ({
      hex: hex(Math.round(bin.r / bin.n)) + hex(Math.round(bin.g / bin.n)) + hex(Math.round(bin.b / bin.n)),
      share: bin.n / opaque
    }))
  };
}

module.exports = { decodePng, mainColours };
