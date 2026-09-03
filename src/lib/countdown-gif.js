/**
 * Animated-GIF countdown timer generator (no native modules).
 *
 * Renders an anti-aliased countdown into an animated GIF that decrements one
 * second per frame. Intended for email campaigns: email clients can't run JS,
 * so the timer is baked into an image that is regenerated from the *current
 * server time* on every open (the API route sends no-cache headers).
 *
 * Typography uses a real font (IBM Plex Sans Bold, with Open Sans Bold as a
 * fallback) via opentype.js — glyph outlines
 * are rasterized with 4x supersampled anti-aliasing and quantized onto small
 * per-color-pair palette "ramps". Glyph coverage bitmaps are cached across
 * requests. If the font can't be loaded for any reason, we fall back to a
 * built-in 5x7 bitmap font so the endpoint never hard-fails.
 *
 * No node-canvas / sharp — safe for serverless / WP Engine.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// ---------------------------------------------------------------------------
// Font loading (lazy, cached, with graceful fallback).
// ---------------------------------------------------------------------------
let _font; // opentype font instance, or false once we know it failed
function getFont() {
  if (_font !== undefined) return _font || null;
  try {
    const opentype = require('opentype.js');
    // Prefer IBM Plex Sans Bold; fall back to Open Sans Bold if it isn't on disk.
    const files = ['IBMPlexSans-Bold.ttf', 'OpenSans-Bold.ttf'];
    const candidates = [];
    for (const f of files) {
      candidates.push(path.join(process.cwd(), 'src/lib/fonts', f));
      candidates.push(path.join(__dirname, 'fonts', f));
    }
    let buf;
    for (const c of candidates) {
      try {
        buf = fs.readFileSync(c);
        break;
      } catch (_) {
        /* try next */
      }
    }
    if (!buf) throw new Error('No countdown font found on disk (IBMPlexSans-Bold.ttf / OpenSans-Bold.ttf)');
    _font = opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('countdown-gif: font load failed, using bitmap fallback:', err.message);
    _font = false;
  }
  return _font || null;
}

// ---------------------------------------------------------------------------
// Vector glyph rasterization (opentype path -> anti-aliased coverage bitmap).
// ---------------------------------------------------------------------------
const SS = 4; // supersampling factor per axis (16 samples/pixel)
const _glyphCache = new Map(); // `${size}|${char}` -> {cov,w,h,left,top,advance}

function flattenCommands(commands, qseg) {
  const contours = [];
  let cur = null;
  let cx = 0;
  let cy = 0;
  for (const cmd of commands) {
    if (cmd.type === 'M') {
      if (cur && cur.length) contours.push(cur);
      cur = [{ x: cmd.x, y: cmd.y }];
      cx = cmd.x;
      cy = cmd.y;
    } else if (cmd.type === 'L') {
      cur.push({ x: cmd.x, y: cmd.y });
      cx = cmd.x;
      cy = cmd.y;
    } else if (cmd.type === 'Q') {
      for (let s = 1; s <= qseg; s++) {
        const t = s / qseg;
        const mt = 1 - t;
        cur.push({
          x: mt * mt * cx + 2 * mt * t * cmd.x1 + t * t * cmd.x,
          y: mt * mt * cy + 2 * mt * t * cmd.y1 + t * t * cmd.y,
        });
      }
      cx = cmd.x;
      cy = cmd.y;
    } else if (cmd.type === 'C') {
      for (let s = 1; s <= qseg; s++) {
        const t = s / qseg;
        const mt = 1 - t;
        cur.push({
          x: mt * mt * mt * cx + 3 * mt * mt * t * cmd.x1 + 3 * mt * t * t * cmd.x2 + t * t * t * cmd.x,
          y: mt * mt * mt * cy + 3 * mt * mt * t * cmd.y1 + 3 * mt * t * t * cmd.y2 + t * t * t * cmd.y,
        });
      }
      cx = cmd.x;
      cy = cmd.y;
    } else if (cmd.type === 'Z') {
      if (cur && cur.length) contours.push(cur);
      cur = null;
    }
  }
  if (cur && cur.length) contours.push(cur);
  return contours;
}

// Non-zero winding scanline fill with supersampled coverage. Returns Uint8Array
// (0..255 coverage) for a w*h region whose top-left is (x0,y0) in path coords.
function rasterizeContours(contours, x0, y0, w, h) {
  const edges = [];
  for (const c of contours) {
    for (let i = 0; i < c.length; i++) {
      const a = c[i];
      const b = c[(i + 1) % c.length];
      if (a.y !== b.y) edges.push(a.y < b.y ? { yl: a.y, yh: b.y, x: a.x, dx: (b.x - a.x) / (b.y - a.y), dir: 1 } : { yl: b.y, yh: a.y, x: b.x, dx: (a.x - b.x) / (a.y - b.y), dir: -1 });
    }
  }
  const cov = new Uint16Array(w * h);
  const maxSub = w * SS - 1;
  const subH = h * SS;
  for (let sy = 0; sy < subH; sy++) {
    const Y = y0 + (sy + 0.5) / SS;
    const xs = [];
    for (const e of edges) {
      if (Y < e.yl || Y >= e.yh) continue;
      xs.push({ X: e.x + (Y - e.yl) * e.dx, dir: e.dir });
    }
    if (xs.length < 2) continue;
    xs.sort((a, b) => a.X - b.X);
    const outRow = (sy / SS) | 0;
    let wind = 0;
    for (let i = 0; i < xs.length - 1; i++) {
      wind += xs[i].dir;
      if (wind === 0) continue;
      let sa = Math.ceil((xs[i].X - x0) * SS - 0.5);
      let sb = Math.floor((xs[i + 1].X - x0) * SS - 0.5);
      if (sa < 0) sa = 0;
      if (sb > maxSub) sb = maxSub;
      for (let scx = sa; scx <= sb; scx++) cov[outRow * w + ((scx / SS) | 0)]++;
    }
  }
  const out = new Uint8Array(w * h);
  const max = SS * SS;
  for (let i = 0; i < cov.length; i++) out[i] = (cov[i] * 255 / max + 0.5) | 0;
  return out;
}

function getGlyph(font, ch, fontSize) {
  const key = fontSize + '|' + ch;
  let g = _glyphCache.get(key);
  if (g) return g;
  const advance = font.getAdvanceWidth(ch, fontSize);
  const gpath = font.getPath(ch, 0, 0, fontSize); // baseline at origin
  const bb = gpath.getBoundingBox();
  if (!isFinite(bb.x1) || bb.x2 <= bb.x1 || bb.y2 <= bb.y1) {
    g = { cov: new Uint8Array(0), w: 0, h: 0, left: 0, top: 0, advance };
  } else {
    const left = Math.floor(bb.x1);
    const top = Math.floor(bb.y1);
    const w = Math.ceil(bb.x2) - left;
    const h = Math.ceil(bb.y2) - top;
    const qseg = Math.max(3, Math.min(14, Math.round(fontSize / 8)));
    const contours = flattenCommands(gpath.commands, qseg);
    g = { cov: rasterizeContours(contours, left, top, w, h), w, h, left, top, advance };
  }
  _glyphCache.set(key, g);
  return g;
}

// ---------------------------------------------------------------------------
// 5x7 bitmap font (fallback when the real font can't be loaded).
// ---------------------------------------------------------------------------
const BMP = {
  '0': ['01110', '10001', '10011', '10101', '11001', '10001', '01110'],
  '1': ['00100', '01100', '00100', '00100', '00100', '00100', '01110'],
  '2': ['01110', '10001', '00001', '00010', '00100', '01000', '11111'],
  '3': ['11111', '00010', '00100', '00010', '00001', '10001', '01110'],
  '4': ['00010', '00110', '01010', '10010', '11111', '00010', '00010'],
  '5': ['11111', '10000', '11110', '00001', '00001', '10001', '01110'],
  '6': ['00110', '01000', '10000', '11110', '10001', '10001', '01110'],
  '7': ['11111', '00001', '00010', '00100', '01000', '01000', '01000'],
  '8': ['01110', '10001', '10001', '01110', '10001', '10001', '01110'],
  '9': ['01110', '10001', '10001', '01111', '00001', '00010', '01100'],
  ':': ['00000', '00100', '00100', '00000', '00100', '00100', '00000'],
  ' ': ['00000', '00000', '00000', '00000', '00000', '00000', '00000'],
  D: ['11110', '10001', '10001', '10001', '10001', '10001', '11110'],
  A: ['01110', '10001', '10001', '11111', '10001', '10001', '10001'],
  Y: ['10001', '10001', '01010', '00100', '00100', '00100', '00100'],
  S: ['01111', '10000', '10000', '01110', '00001', '00001', '11110'],
  H: ['10001', '10001', '10001', '11111', '10001', '10001', '10001'],
  O: ['01110', '10001', '10001', '10001', '10001', '10001', '01110'],
  U: ['10001', '10001', '10001', '10001', '10001', '10001', '01110'],
  R: ['11110', '10001', '10001', '11110', '10100', '10010', '10001'],
  M: ['10001', '11011', '10101', '10101', '10001', '10001', '10001'],
  I: ['01110', '00100', '00100', '00100', '00100', '00100', '01110'],
  N: ['10001', '11001', '10101', '10011', '10001', '10001', '10001'],
  E: ['11111', '10000', '10000', '11110', '10000', '10000', '11111'],
  C: ['01110', '10001', '10000', '10000', '10000', '10001', '01110'],
  X: ['10001', '10001', '01010', '00100', '01010', '10001', '10001'],
  P: ['11110', '10001', '10001', '11110', '10000', '10000', '10000'],
};
const BMP_W = 5;
const BMP_H = 7;

// ---------------------------------------------------------------------------
// Indexed-color raster canvas.
// ---------------------------------------------------------------------------
class Raster {
  constructor(width, height, bgIndex) {
    this.width = width;
    this.height = height;
    this.data = new Uint8Array(width * height).fill(bgIndex);
  }

  fillRect(x, y, w, h, colorIndex) {
    const x0 = Math.max(0, x | 0);
    const y0 = Math.max(0, y | 0);
    const x1 = Math.min(this.width, (x + w) | 0);
    const y1 = Math.min(this.height, (y + h) | 0);
    for (let py = y0; py < y1; py++) {
      const row = py * this.width;
      for (let px = x0; px < x1; px++) this.data[row + px] = colorIndex;
    }
  }

  fillRoundRect(x, y, w, h, r, colorIndex) {
    r = Math.min(r, Math.floor(w / 2), Math.floor(h / 2));
    this.fillRect(x + r, y, w - 2 * r, h, colorIndex);
    this.fillRect(x, y + r, w, h - 2 * r, colorIndex);
    for (let dy = 0; dy < r; dy++) {
      for (let dx = 0; dx < r; dx++) {
        const inside = (dx - r + 0.5) ** 2 + (dy - r + 0.5) ** 2 <= r * r;
        if (!inside) continue;
        this.data[(y + dy) * this.width + (x + dx)] = colorIndex;
        this.data[(y + dy) * this.width + (x + w - 1 - dx)] = colorIndex;
        this.data[(y + h - 1 - dy) * this.width + (x + dx)] = colorIndex;
        this.data[(y + h - 1 - dy) * this.width + (x + w - 1 - dx)] = colorIndex;
      }
    }
  }

  // Blit an anti-aliased coverage bitmap using a palette ramp (0=bg..last=fg).
  blitCoverage(glyph, dx, dy, ramp) {
    const last = ramp.length - 1;
    for (let row = 0; row < glyph.h; row++) {
      const py = dy + row;
      if (py < 0 || py >= this.height) continue;
      const base = py * this.width;
      const gbase = row * glyph.w;
      for (let col = 0; col < glyph.w; col++) {
        const c = glyph.cov[gbase + col];
        if (!c) continue;
        const px = dx + col;
        if (px < 0 || px >= this.width) continue;
        const ri = (c * last / 255 + 0.5) | 0;
        if (ri > 0) this.data[base + px] = ramp[ri];
      }
    }
  }

  // Draw a scaled bitmap-font glyph (solid color) — fallback path.
  bmpGlyph(ch, x, topY, scale, colorIndex) {
    const rows = BMP[ch] || BMP[' '];
    for (let ry = 0; ry < BMP_H; ry++) {
      const bits = rows[ry];
      for (let rx = 0; rx < BMP_W; rx++) {
        if (bits[rx] === '1') this.fillRect(x + rx * scale, topY + ry * scale, scale, scale, colorIndex);
      }
    }
  }
}

// ---------------------------------------------------------------------------
// Typographer abstraction: same layout code works for real font or bitmap.
// Baselines are used throughout; metrics().top is negative (above baseline).
// ---------------------------------------------------------------------------
function vectorTypographer(font) {
  return {
    width(str, size) {
      let w = 0;
      for (const ch of str) w += font.getAdvanceWidth(ch, size);
      return w;
    },
    metrics(str, size) {
      let top = Infinity;
      let bottom = -Infinity;
      for (const ch of str) {
        const g = getGlyph(font, ch, size);
        if (g.h === 0) continue;
        if (g.top < top) top = g.top;
        if (g.top + g.h > bottom) bottom = g.top + g.h;
      }
      if (!isFinite(top)) {
        top = -size;
        bottom = 0;
      }
      return { top, bottom, height: bottom - top };
    },
    draw(raster, str, penX, baseY, size, ramp) {
      let x = penX;
      for (const ch of str) {
        const g = getGlyph(font, ch, size);
        if (g.w) raster.blitCoverage(g, Math.round(x + g.left), Math.round(baseY + g.top), ramp);
        x += g.advance;
      }
    },
  };
}

// Greedy word-wrap: pack words into lines no wider than maxWidth at the given
// size. A word wider than maxWidth on its own is left un-split on its own
// line (still over maxWidth) — the caller shrinks the font in that case
// rather than hyphenating.
function wrapText(T, text, size, maxWidth) {
  const words = text.split(/\s+/).filter(Boolean);
  if (!words.length) return [''];
  const lines = [];
  let line = words[0];
  for (let i = 1; i < words.length; i++) {
    const candidate = `${line} ${words[i]}`;
    if (T.width(candidate, size) <= maxWidth) {
      line = candidate;
    } else {
      lines.push(line);
      line = words[i];
    }
  }
  lines.push(line);
  return lines;
}

function bitmapTypographer() {
  const scaleFor = (size) => Math.max(1, Math.round(size / BMP_H));
  const adv = (scale) => (BMP_W + 1) * scale;
  return {
    width(str, size) {
      const scale = scaleFor(size);
      return str.length ? str.length * adv(scale) - scale : 0;
    },
    metrics(str, size) {
      const scale = scaleFor(size);
      return { top: -BMP_H * scale, bottom: 0, height: BMP_H * scale };
    },
    draw(raster, str, penX, baseY, size, ramp) {
      const scale = scaleFor(size);
      const color = ramp[ramp.length - 1];
      let x = penX;
      for (const ch of str.toUpperCase()) {
        raster.bmpGlyph(ch, Math.round(x), Math.round(baseY - BMP_H * scale), scale, color);
        x += adv(scale);
      }
    },
  };
}

// ---------------------------------------------------------------------------
// GIF89a encoder with LZW compression and per-frame animation.
// ---------------------------------------------------------------------------
class GifWriter {
  constructor(width, height, palette, loopCount = 0, transparentIndex = -1) {
    this.width = width;
    this.height = height;
    this.palette = palette;
    this.loopCount = loopCount;
    this.transparentIndex = transparentIndex; // -1 = fully opaque GIF
    this.bytes = [];
    this._writeHeader();
  }

  _push(...b) {
    for (const x of b) this.bytes.push(x & 0xff);
  }
  _pushStr(s) {
    for (let i = 0; i < s.length; i++) this.bytes.push(s.charCodeAt(i) & 0xff);
  }
  _pushU16(v) {
    this.bytes.push(v & 0xff, (v >> 8) & 0xff);
  }

  _paletteBits() {
    let size = 2;
    let n = 0;
    while (size < this.palette.length) {
      size <<= 1;
      n++;
    }
    return { n, size };
  }

  _writeHeader() {
    const { n, size } = this._paletteBits();
    this._pushStr('GIF89a');
    this._pushU16(this.width);
    this._pushU16(this.height);
    this._push(0x80 | 0x70 | n);
    // Logical-screen background color index. Always the opaque page background
    // (palette index 0), never the transparent index: some email clients paint
    // the canvas/border with this color, and pointing it at the transparent index
    // made them show white/see-through behind an opaque colored countdown.
    this._push(0);
    this._push(0);
    for (let i = 0; i < size; i++) {
      const c = this.palette[i] || [0, 0, 0];
      this._push(c[0], c[1], c[2]);
    }
    // NETSCAPE looping extension. Omitted entirely when loopCount < 0 — a GIF
    // with no loop extension plays through exactly once and stops, which avoids
    // the cross-decoder ambiguity where a count of 1 is read as "one *extra*
    // loop" (i.e. two plays). loopCount 0 means loop forever.
    if (this.loopCount >= 0) {
      this._push(0x21, 0xff, 0x0b);
      this._pushStr('NETSCAPE2.0');
      this._push(0x03, 0x01);
      this._pushU16(this.loopCount);
      this._push(0x00);
    }
  }

  addFrame(indices, delayCs, disposal, transparent) {
    const { n } = this._paletteBits();
    // Graphic Control Extension. Transparency is per-frame: a frame is only
    // flagged transparent (and only advertises the transparent color index) when
    // it actually contains transparent pixels — i.e. a banner over a transparent
    // background. Opaque frames (the countdown itself) carry no transparent flag,
    // so lenient decoders never "see through" them to the page. Disposal method 2
    // (restore to background) is used only where the next/own frame's transparent
    // pixels must reveal the page rather than stale pixels; opaque frames use
    // disposal 1 (leave in place) so they hold cleanly.
    const useT = !!transparent && this.transparentIndex >= 0;
    const disp = disposal !== undefined ? disposal : useT ? 2 : 1;
    const packed = (disp << 2) | (useT ? 0x01 : 0x00);
    this._push(0x21, 0xf9, 0x04, packed);
    this._pushU16(delayCs);
    this._push(useT ? this.transparentIndex : 0x00, 0x00);
    this._push(0x2c);
    this._pushU16(0);
    this._pushU16(0);
    this._pushU16(this.width);
    this._pushU16(this.height);
    this._push(0x00);
    const minCodeSize = Math.max(2, n + 1);
    this._push(minCodeSize);
    const lzw = lzwCompress(minCodeSize, indices);
    for (let i = 0; i < lzw.length; i += 255) {
      const chunk = lzw.slice(i, i + 255);
      this._push(chunk.length);
      for (const b of chunk) this._push(b);
    }
    this._push(0x00);
  }

  finish() {
    this._push(0x3b);
    return Buffer.from(this.bytes);
  }
}

/** GIF-variant LZW compressor. Returns an array of bytes. */
function lzwCompress(minCodeSize, indices) {
  const CLEAR = 1 << minCodeSize;
  const EOI = CLEAR + 1;
  const out = [];
  let cur = 0;
  let curBits = 0;
  let codeSize = minCodeSize + 1;
  let dict;
  let next;

  const emit = (code) => {
    cur |= code << curBits;
    curBits += codeSize;
    while (curBits >= 8) {
      out.push(cur & 0xff);
      cur >>= 8;
      curBits -= 8;
    }
  };
  const resetDict = () => {
    dict = new Map();
    for (let i = 0; i < CLEAR; i++) dict.set(String.fromCharCode(i), i);
    codeSize = minCodeSize + 1;
    next = EOI + 1;
  };

  resetDict();
  emit(CLEAR);

  if (indices.length === 0) {
    emit(EOI);
    if (curBits > 0) out.push(cur & 0xff);
    return out;
  }

  let prefix = String.fromCharCode(indices[0]);
  for (let i = 1; i < indices.length; i++) {
    const c = String.fromCharCode(indices[i]);
    const combined = prefix + c;
    if (dict.has(combined)) {
      prefix = combined;
    } else {
      emit(dict.get(prefix));
      if (next < 4096) {
        dict.set(combined, next++);
        // Increase code width one code AFTER the table outgrows the current
        // width (next === 2^codeSize + 1). The decoder lags the encoder by one
        // entry, so bumping any earlier desyncs every standard GIF decoder.
        if (next === (1 << codeSize) + 1 && codeSize < 12) codeSize++;
      } else {
        emit(CLEAR);
        resetDict();
      }
      prefix = c;
    }
  }
  emit(dict.get(prefix));
  emit(EOI);
  if (curBits > 0) out.push(cur & 0xff);
  return out;
}

// ---------------------------------------------------------------------------
// Color helpers.
// ---------------------------------------------------------------------------
function hexToRgb(hex, fallback) {
  if (!hex) return fallback;
  let h = String(hex).replace(/^#/, '').trim();
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  if (!/^[0-9a-fA-F]{6}$/.test(h)) return fallback;
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}

// Whether a banner background is transparent. An explicit "transparent"/
// "none"/"" always means transparent; anything else is treated as a color.
// When unset, falls back to `defaultTransparent` (banners differ on this —
// see the expiredBgT/endBgT callers below).
function bgIsTransparent(v, defaultTransparent = true) {
  if (v === undefined || v === null) return defaultTransparent;
  const s = String(v).trim().toLowerCase();
  return s === '' || s === 'transparent' || s === 'none';
}

// ---------------------------------------------------------------------------
// Countdown math.
// ---------------------------------------------------------------------------
function breakdown(msRemaining) {
  let s = Math.max(0, Math.floor(msRemaining / 1000));
  const days = Math.floor(s / 86400);
  s -= days * 86400;
  const hours = Math.floor(s / 3600);
  s -= hours * 3600;
  const mins = Math.floor(s / 60);
  s -= mins * 60;
  return { days, hours, mins, secs: s };
}

const pad2 = (n) => String(Math.min(99, n)).padStart(2, '0');

function clampInt(v, def, min, max) {
  const n = parseInt(v, 10);
  if (!Number.isFinite(n)) return def;
  return Math.min(max, Math.max(min, n));
}

/**
 * Build the animated countdown GIF. See the API route for the query contract.
 * @returns {Buffer} GIF bytes
 */
function generateCountdownGif(opts) {
  const width = clampInt(opts.width, 640, 120, 1600);
  const height = clampInt(opts.height, 200, 80, 800);
  const frames = clampInt(opts.frames, 60, 1, 600);

  // `loop` = extra repeats after the first play, then freeze on the last frame
  // (default 1 → plays through, loops once more, then holds the final frame).
  // "infinite"/"forever"/-1 loops forever. When an end card is shown the repeats
  // are inlined into the frame list (see assembly below) so the end card appears
  // only once, at the very end, rather than on every loop.
  const loopInfinite = opts.loop === 'infinite' || opts.loop === 'forever' || String(opts.loop) === '-1';
  const loopRepeats = loopInfinite ? 0 : clampInt(opts.loop, 1, 0, 65534);

  // Font rendering: "smooth" (default) uses the anti-aliased vector font;
  // "pixel"/"bitmap" forces the blocky 5x7 bitmap font. Vector is also the
  // graceful fallback target — if the font file can't load we drop to bitmap
  // regardless of this setting.
  const pixelFont = /^(pixel|bitmap|blocky)$/i.test(String(opts.font || ''));
  const font = pixelFont ? null : getFont();
  const T = font ? vectorTypographer(font) : bitmapTypographer();

  // Base palette (indices 0..4). More entries get appended for AA ramps.
  const palette = [
    hexToRgb(opts.bg, [255, 255, 255]), // 0 background
    hexToRgb(opts.panel, [39, 44, 48]), // 1 panel
    hexToRgb(opts.digit, [255, 255, 255]), // 2 digit
    hexToRgb(opts.label, [98, 112, 124]), // 3 label
    hexToRgb(opts.accent, [0, 105, 57]), // 4 accent
  ];
  const BG = 0;
  const PANEL = 1;
  const DIGIT = 2;
  const LABEL = 3;
  const ACCENT = 4;

  // Build an anti-aliasing ramp between two existing palette colors. Returns an
  // array of palette indices (index 0 = fromIdx background .. last = toIdx fg).
  const RAMP_STEPS = 16;
  function buildRamp(fromIdx, toIdx) {
    const from = palette[fromIdx];
    const to = palette[toIdx];
    const ramp = new Array(RAMP_STEPS);
    ramp[0] = fromIdx;
    ramp[RAMP_STEPS - 1] = toIdx;
    for (let i = 1; i < RAMP_STEPS - 1; i++) {
      const t = i / (RAMP_STEPS - 1);
      palette.push([
        Math.round(from[0] + (to[0] - from[0]) * t),
        Math.round(from[1] + (to[1] - from[1]) * t),
        Math.round(from[2] + (to[2] - from[2]) * t),
      ]);
      ramp[i] = palette.length - 1;
    }
    return ramp;
  }
  const pushColor = (rgb) => {
    palette.push(rgb);
    return palette.length - 1;
  };

  // Whether the page background — the area around/between panels, including
  // where the colon separators and unit labels sit — is transparent, plus the
  // expired/end-card banner backgrounds. Any of these needs a reserved
  // transparent palette index (added once, shared) and disposal method 2 in
  // the encoder. The page background defaults to opaque, unlike the expired
  // banner, so existing callers that never asked for transparency keep
  // rendering exactly as before.
  const bgTransparent = bgIsTransparent(opts.bg, false);
  const expiredBgT = bgIsTransparent(opts.expiredBg);
  const endBgT = bgIsTransparent(opts.endBg, false);
  let TRANSPARENT = -1;
  if (bgTransparent || expiredBgT || endBgT) {
    TRANSPARENT = pushColor(palette[BG].slice()); // RGB = page bg for non-transparent-aware viewers
  }
  const pageFillIndex = bgTransparent ? TRANSPARENT : BG;

  const digitRamp = buildRamp(PANEL, DIGIT); // digits on panels
  // Labels and colon separators are drawn directly on the page background,
  // not on a panel. Over a transparent background there's no color to blend
  // AA edges into, so — like the banner text below — threshold coverage
  // instead of a smooth ramp.
  const labelRamp = bgTransparent ? [TRANSPARENT, LABEL, LABEL] : buildRamp(BG, LABEL);
  const colonRamp = bgTransparent ? [TRANSPARENT, ACCENT, ACCENT] : buildRamp(BG, ACCENT);

  // Build a banner: fill index + coverage ramp. Over a transparent background,
  // GIF has no partial alpha, so we threshold coverage (a short ramp) instead of
  // blending into the unknown email background.
  function makeBanner(transparent, bgHex, textHex) {
    const textIdx = pushColor(hexToRgb(textHex, [255, 255, 255]));
    if (transparent) return { bgIdx: TRANSPARENT, ramp: [TRANSPARENT, textIdx, textIdx] };
    const bgIdx = pushColor(hexToRgb(bgHex, [0, 105, 57]));
    return { bgIdx, ramp: buildRamp(bgIdx, textIdx) };
  }
  const expiredBanner = makeBanner(expiredBgT, opts.expiredBg, opts.expiredColor);
  const endBanner = makeBanner(endBgT, opts.endBg, opts.endColor);

  const labels = opts.labels && opts.labels.length === 4 ? opts.labels : ['DAYS', 'HOURS', 'MINS', 'SECS'];
  const expiredText = (opts.expired || 'EXPIRED').toUpperCase();

  // --- layout ---------------------------------------------------------------
  const units = 4;
  const gap = Math.round(width * 0.02);
  const colonW = Math.round(width * 0.03);
  const totalGaps = (units - 1) * (gap * 2 + colonW);
  const panelW = Math.floor((width - totalGaps - gap * 2) / units);
  const panelH = Math.round(height * 0.62);
  const radius = Math.max(2, Math.round(panelW * 0.1));

  const digitSize = Math.min(Math.floor(panelW * 0.6), Math.floor(panelH * 0.82));
  const labelSize = Math.max(BMP_H, Math.round(height * 0.08));

  // Labels above ("top", default) or below the panels. Vertically center the
  // whole stack (label band + gap + panel) so both placements stay balanced.
  const labelPos = opts.labelPos === 'bottom' ? 'bottom' : 'top';
  const labelGap = Math.round(height * 0.045);
  const labelHeight = T.metrics('DAYS', labelSize).height;
  const stackTotal = labelHeight + labelGap + panelH;
  const topMargin = Math.max(0, Math.round((height - stackTotal) / 2));
  let panelY;
  let labelTopY;
  if (labelPos === 'top') {
    labelTopY = topMargin;
    panelY = topMargin + labelHeight + labelGap;
  } else {
    panelY = topMargin;
    labelTopY = panelY + panelH + labelGap;
  }

  // Vertical placement (shared across frames).
  const dm = T.metrics('0123456789', digitSize);
  const digitBaseY = panelY + Math.round((panelH - dm.height) / 2) - dm.top;

  const panelX = [];
  let x = gap;
  for (let u = 0; u < units; u++) {
    panelX.push(x);
    x += panelW;
    if (u < units - 1) x += gap + colonW + gap;
  }

  function renderFrame(msRemaining) {
    if (msRemaining <= 0) return renderBanner(expiredText, expiredBanner);
    const r = new Raster(width, height, pageFillIndex);
    const { days, hours, mins, secs } = breakdown(msRemaining);
    const values = [pad2(days), pad2(hours), pad2(mins), pad2(secs)];

    for (let u = 0; u < units; u++) {
      const px = panelX[u];
      r.fillRoundRect(px, panelY, panelW, panelH, radius, PANEL);

      const numW = T.width(values[u], digitSize);
      T.draw(r, values[u], px + (panelW - numW) / 2, digitBaseY, digitSize, digitRamp);

      const lw = T.width(labels[u], labelSize);
      const lm = T.metrics(labels[u], labelSize);
      const labelBaseY = labelTopY - lm.top;
      T.draw(r, labels[u], px + (panelW - lw) / 2, labelBaseY, labelSize, labelRamp);

      if (u < units - 1) {
        const cw = T.width(':', digitSize);
        T.draw(r, ':', px + panelW + gap + (colonW - cw) / 2, digitBaseY, digitSize, colonRamp);
      }
    }

    return r.data;
  }

  // Full-frame banner used for both the expired state and the closing end card:
  // fill the frame with the banner background (a color, or transparent) and
  // center the text. With loop=1 the end card becomes a clean resting frame.
  //
  // Text wraps onto multiple lines before it shrinks: the starting size uses
  // the full height budget (ignoring width — wrapping handles width instead
  // of a smaller single line), then only shrinks further if the wrapped
  // block still doesn't fit (a single unbreakable word wider than the frame,
  // or too many lines for the height budget). When the text already fits on
  // one line at that size, wrapText returns a single line and this reduces to
  // the old shrink-to-fit-one-line behavior.
  function renderBanner(text, banner) {
    const r = new Raster(width, height, banner.bgIdx);
    const maxWidth = width * 0.88;
    const maxHeight = height * 0.5;
    const lineGap = 0.3; // extra leading between baselines, as a fraction of size

    const s0 = Math.round(height * 0.3);
    const h0 = T.metrics(text, s0).height || 1;
    let size = Math.max(BMP_H, Math.round((s0 * maxHeight) / h0));

    let lines = wrapText(T, text, size, maxWidth);
    const fitsBudget = (ln, sz) => {
      const widest = Math.max(...ln.map((l) => T.width(l, sz)));
      const lineHeight = sz * (1 + lineGap);
      const blockHeight = ln.length > 1 ? (ln.length - 1) * lineHeight + T.metrics(ln[ln.length - 1], sz).height : T.metrics(ln[0], sz).height;
      return widest <= maxWidth && blockHeight <= maxHeight;
    };
    while (size > BMP_H && !fitsBudget(lines, size)) {
      size = Math.max(BMP_H, Math.floor(size * 0.92));
      lines = wrapText(T, text, size, maxWidth);
    }

    const lineHeight = size * (1 + lineGap);
    const firstM = T.metrics(lines[0], size);
    const lastM = T.metrics(lines[lines.length - 1], size);
    const blockHeight = (lines.length - 1) * lineHeight - firstM.top + lastM.bottom;
    let baseY = Math.round((height - blockHeight) / 2) - firstM.top;

    for (const line of lines) {
      const lw = T.width(line, size);
      T.draw(r, line, (width - lw) / 2, baseY, size, banner.ramp);
      baseY += lineHeight;
    }

    return r.data;
  }

  const startRemaining = opts.targetMs - opts.nowMs;
  const endText = typeof opts.endText === 'string' && opts.endText.trim() ? opts.endText.trim() : null;
  const showEndCard = !!endText && !loopInfinite; // an infinite loop never "ends", so no end card
  const FREEZE = 1; // disposal "do not dispose" for the final freeze frame

  // Finite loops inline the countdown repeats and OMIT the loop extension
  // (netscapeLoop < 0) so the whole thing plays exactly once and freezes on the
  // last frame — deterministic across decoders. Only "infinite" uses the loop
  // extension (count 0).
  const netscapeLoop = loopInfinite ? 0 : -1;
  const gif = new GifWriter(width, height, palette, netscapeLoop, TRANSPARENT);

  // Build the ordered frame list first. A countdown frame is transparent when
  // either the page background is transparent, or the target has passed and
  // the expired banner uses a transparent background (those are independent
  // settings — expiredBgT only applies once renderFrame has switched to the
  // banner). The optional end card is transparent when its own background is.
  // Assembling the list up front lets us look ahead when choosing disposal (a
  // frame that precedes a transparent frame must clear to the page, not leave
  // stale pixels behind).
  const list = []; // { data, delay, transparent }
  const pushCountdown = (remaining, delay) => {
    const expired = remaining <= 0;
    list.push({ data: renderFrame(remaining), delay, transparent: expired ? expiredBgT : bgTransparent });
  };

  if (loopInfinite) {
    for (let i = 0; i < frames; i++) pushCountdown(startRemaining - i * 1000, 100);
  } else {
    // Inline one countdown per play (repeats + 1), capped so the frame count can't
    // explode, then optionally a single end card. The very last frame freezes.
    const maxPlays = Math.max(1, Math.floor(1200 / frames));
    const plays = Math.min(loopRepeats + 1, maxPlays);
    for (let p = 0; p < plays; p++) {
      for (let i = 0; i < frames; i++) pushCountdown(startRemaining - i * 1000, 100); // 100cs = 1s
    }
    if (showEndCard) list.push({ data: renderBanner(endText, endBanner), delay: 500, transparent: endBgT });
  }

  for (let i = 0; i < list.length; i++) {
    const isLast = i === list.length - 1;
    const nextTransparent = !isLast && list[i + 1].transparent;
    // The final frame always holds (disposal 1). Otherwise a frame uses disposal
    // 2 (restore to background = the transparent index) only when its own or the
    // next frame's transparent pixels must reveal the page; opaque runs hold in
    // place with disposal 1 so lenient decoders never clear them to the page.
    const disposal = isLast || list[i].transparent || nextTransparent ? (isLast ? FREEZE : 2) : FREEZE;
    gif.addFrame(list[i].data, list[i].delay, disposal, list[i].transparent);
  }
  return gif.finish();
}

// ---------------------------------------------------------------------------
// Obfuscated options token.
//
// Packs all render options into one compact, URL-safe token so the countdown
// URL reveals nothing (recipients can't read or edit the target date, colors,
// etc.). This is obfuscation, not authentication — the key lives server-side so
// email recipients can't reverse it, but anyone with the server key/code can.
// For tamper-proofing, gate the encode endpoint with a secret or add an HMAC.
//
// Format: base64url( [version:1][salt:3][ XOR(json, keystream(key||salt)) ] )
// The keystream is a SHA-256 hash chain, so it isn't a trivially-recoverable
// repeating key, and the per-token salt avoids keystream reuse across tokens.
// ---------------------------------------------------------------------------
const OPTS_KEY = process.env.COUNTDOWN_OPTS_KEY || 'cxCountdown::v1::obfuscation-key';

function _b64urlEncode(buf) {
  return buf.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
function _b64urlDecode(str) {
  let s = String(str).replace(/-/g, '+').replace(/_/g, '/');
  while (s.length % 4) s += '=';
  return Buffer.from(s, 'base64');
}
function _keystream(len, key, salt) {
  const out = Buffer.alloc(len);
  let pos = 0;
  let counter = 0;
  while (pos < len) {
    const block = crypto
      .createHash('sha256')
      .update(key)
      .update(salt)
      .update(Buffer.from([counter & 0xff, (counter >> 8) & 0xff]))
      .digest();
    counter++;
    for (let i = 0; i < block.length && pos < len; i++, pos++) out[pos] = block[i];
  }
  return out;
}
function _xor(buf, ks) {
  const out = Buffer.alloc(buf.length);
  for (let i = 0; i < buf.length; i++) out[i] = buf[i] ^ ks[i];
  return out;
}

/** Encode an options object into a compact, URL-safe, obfuscated token. */
function encodeOptions(obj, key = OPTS_KEY) {
  const json = Buffer.from(JSON.stringify(obj), 'utf8');
  const salt = crypto.randomBytes(3);
  const payload = _xor(json, _keystream(json.length, key, salt));
  return _b64urlEncode(Buffer.concat([Buffer.from([0x01]), salt, payload]));
}

/** Decode an obfuscated options token back into an object. Throws if malformed. */
function decodeOptions(token, key = OPTS_KEY) {
  const raw = _b64urlDecode(token);
  if (raw.length < 4 || raw[0] !== 0x01) throw new Error('Malformed options token');
  const salt = raw.subarray(1, 4);
  const payload = raw.subarray(4);
  const json = _xor(payload, _keystream(payload.length, key, salt)).toString('utf8');
  return JSON.parse(json);
}

module.exports = { generateCountdownGif, hexToRgb, encodeOptions, decodeOptions };
