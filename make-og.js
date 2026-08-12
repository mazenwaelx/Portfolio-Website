/*
 * make-og.js — generates assets/og-image.png (1200x630) for social link previews.
 * Zero dependencies: uses only Node's built-in zlib + a compact 5x7 bitmap font.
 * Run:  node make-og.js
 */
const zlib = require('zlib');
const fs = require('fs');
const path = require('path');

const W = 1200, H = 630;
const buf = Buffer.alloc(W * H * 4);

// ---- gradient background: purple (#7C3AED) -> cyan (#0891B2) ----
const c1 = [124, 58, 237], c2 = [8, 145, 178];
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const t = (x / W + y / H) / 2;
    const i = (y * W + x) * 4;
    buf[i]     = Math.round(c1[0] + (c2[0] - c1[0]) * t);
    buf[i + 1] = Math.round(c1[1] + (c2[1] - c1[1]) * t);
    buf[i + 2] = Math.round(c1[2] + (c2[2] - c1[2]) * t);
    buf[i + 3] = 255;
  }
}

function px(x, y, r, g, b) {
  if (x < 0 || x >= W || y < 0 || y >= H) return;
  const i = (y * W + x) * 4;
  buf[i] = r; buf[i + 1] = g; buf[i + 2] = b; buf[i + 3] = 255;
}

function circle(cx, cy, r, col) {
  for (let dy = -r; dy <= r; dy++)
    for (let dx = -r; dx <= r; dx++)
      if (dx * dx + dy * dy <= r * r) px(cx + dx, cy + dy, col[0], col[1], col[2]);
}

// ---- 5x7 font (only the glyphs we need) ----
const F = {
  A: [14,17,19,21,31,17,17], E: [31,16,16,30,16,16,31], F: [31,16,16,30,16,16,16],
  G: [14,17,16,23,19,19,15], I: [31,4,4,4,4,4,31],     L: [16,16,16,16,16,16,31],
  M: [17,27,21,17,17,17,17], N: [17,25,21,19,17,17,17], O: [14,17,17,17,17,17,14],
  R: [30,17,17,30,20,18,17], S: [15,16,16,14,1,1,30],   T: [31,4,4,4,4,4,4],
  W: [17,17,17,17,21,27,17], Z: [31,1,2,4,8,16,31],     ' ': [0,0,0,0,0,0,0],
};

function glyph(ch, gx, gy, s, col) {
  const rows = F[ch] || F[' '];
  for (let row = 0; row < 7; row++) {
    const bits = rows[row];
    for (let col = 4; col >= 0; col--) {
      if (bits & (1 << col)) {
        for (let yy = 0; yy < s; yy++)
          for (let xx = 0; xx < s; xx++)
            px(gx + (4 - col) * s + xx, gy + row * s + yy, col[0], col[1], col[2]);
      }
    }
  }
}

function text(str, x, y, s, col) {
  let cx = x;
  for (const ch of str.toUpperCase()) { glyph(ch, cx, y, s, col); cx += 6 * s; }
  return cx;
}

const WHITE = [255, 255, 255];
const BRAND = [124, 58, 237];
const CYAN  = [34, 211, 238];

// monogram circle + "MW"
circle(170, 175, 78, WHITE);
text('MW', 170 - 5 * 9, 175 - 7 * 9 / 2, 9, BRAND);

// name + tagline
text('MAZEN WAEL', 80, 320, 13, WHITE);
text('SOFTWARE ENGINEER', 80, 410, 8, CYAN);

// ---- PNG encode ----
function crc32(b) {
  let c, table = crc32.t || (crc32.t = (() => {
    const t = []; for (let n = 0; n < 256; n++) { c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; } return t;
  })());
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < b.length; i++) crc = (crc >>> 8) ^ table[(crc ^ b[i]) & 0xFF];
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length, 0);
  const t = Buffer.from(type, 'ascii');
  const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(Buffer.concat([t, data])), 0);
  return Buffer.concat([len, t, data, crc]);
}

const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(W, 0); ihdr.writeUInt32BE(H, 4);
ihdr[8] = 8; ihdr[9] = 6; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;

const raw = Buffer.alloc(H * (W * 4 + 1));
for (let y = 0; y < H; y++) {
  raw[y * (W * 4 + 1)] = 0;
  buf.copy(raw, y * (W * 4 + 1) + 1, y * W * 4, (y + 1) * W * 4);
}
const idat = zlib.deflateSync(raw);

const png = Buffer.concat([
  Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
  chunk('IHDR', ihdr), chunk('IDAT', idat), chunk('IEND', Buffer.alloc(0)),
]);

const out = path.join(__dirname, 'assets', 'og-image.png');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, png);
console.log('Wrote', out, png.length, 'bytes', `(${W}x${H})`);
