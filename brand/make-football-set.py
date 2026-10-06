# Draws the football-first Halftime logo set: 20 designs, each as "H" and "HT".
# Run from the project folder:  python3 brand/make-football-set.py   (needs: pip install fonttools brotli)
import math, os
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.boundsPen import BoundsPen

OUT = "brand/football/"
# Football palette: no crimson.
PITCH, CHALK, INK, NAVY = "#1F4D3A", "#F4F1E6", "#1B1A17", "#1C2D4A"
MUSTARD, TANGERINE, ORANGE, BROWN = "#D9A928", "#E5793A", "#F08A3C", "#5C3A21"
LEATHER, CONCRETE, ENAMEL, PITH = "#A86B3C", "#CFC8B8", "#1F4E8C", "#F6E7C8"
NIGHT_BEAM, NET, BOARD = "#2C4268", "#3F7358", "#2E3B33"

class Font:
    def __init__(self, path):
        self.name = os.path.basename(path); self.f = TTFont(path); self.gs = self.f.getGlyphSet(); self.cmap = self.f.getBestCmap(); self.hm = self.f["hmtx"]
        b = self.bounds("H"); self.cap = b[3] - b[1]
    def g(self, ch):
        if ord(ch) not in self.cmap: raise KeyError(f"{self.name} has no glyph for {ch!r}")
        return self.cmap[ord(ch)]
    def adv(self, ch): return self.hm[self.g(ch)][0]
    def bounds(self, ch):
        bp = BoundsPen(self.gs); self.gs[self.g(ch)].draw(bp); return bp.bounds
    def path(self, ch, t):
        pen = SVGPathPen(self.gs); self.gs[self.g(ch)].draw(TransformPen(pen, t)); return pen.getCommands()

F = "brand/fonts/"
SLAB = Font(F + "AlfaSlabOne-Regular.ttf"); WOOD = Font(F + "Rye-Regular.ttf"); RETRO = Font(F + "Shrikhand-Regular.ttf")
STENCIL = Font(F + "SairaStencilOne-Regular.ttf"); BEBAS = Font(F + "BebasNeue-Regular.ttf"); ANTON = Font(F + "Anton-Regular.ttf")
SCRIPT = Font(F + "Yellowtail-Regular.ttf"); GOTHIC = Font(F + "UnifrakturCook-Bold.ttf"); FAT = Font(F + "BowlbyOneSC-Regular.ttf")

def letters(text, font, box_w, box_h, cx, cy, fill, tracking=0.0, attrs="", shadow=None):
    """Text scaled to fit box_w x box_h, centred on (cx, cy). tracking is a fraction of the cap height."""
    def layout(cap):
        sc = cap / font.cap; x = 0; items = []; xs, ys = [], []
        for ch in text:
            if ch != " ":
                b = font.bounds(ch); xs += [x + b[0] * sc, x + b[2] * sc]; ys += [-b[3] * sc, -b[1] * sc]
                items.append((ch, x))
            x += font.adv(ch) * sc + tracking * cap
        return items, (min(xs), min(ys), max(xs), max(ys)), sc
    _, bb, _ = layout(100)
    cap = 100 * min(box_w / (bb[2] - bb[0]), box_h / (bb[3] - bb[1]))
    items, bb, sc = layout(cap)
    dx, dy = cx - (bb[0] + bb[2]) / 2, cy - (bb[1] + bb[3]) / 2
    d = " ".join(font.path(ch, (sc, 0, 0, -sc, x + dx, dy)) for ch, x in items)
    out = f'<path d="{d}" fill="{shadow[2]}" transform="translate({shadow[0]},{shadow[1]})"/>' if shadow else ""
    out += f'<path d="{d}" fill="{fill}" {attrs}/>'
    return out, (bb[0] + dx, bb[1] + dy, bb[2] + dx, bb[3] + dy)

def label(text, font, cap, cx, base, fill, tracking=0.0):
    """Small text at a fixed cap height, centred on cx, sitting on the baseline."""
    sc = cap / font.cap; widths = [font.adv(ch) * sc + tracking * cap for ch in text]
    x = cx - (sum(widths) - tracking * cap) / 2; parts = []
    for ch, w in zip(text, widths):
        if ch != " ": parts.append(font.path(ch, (sc, 0, 0, -sc, x, base)))
        x += w
    return f'<path d="{" ".join(parts)}" fill="{fill}"/>'

def star(cx, cy, r, fill):
    pts = []
    for i in range(10):
        rr = r if i % 2 == 0 else r * 0.42; a = math.radians(-90 + i * 36)
        pts.append(f"{cx + rr * math.cos(a):.1f},{cy + rr * math.sin(a):.1f}")
    return f'<polygon points="{" ".join(pts)}" fill="{fill}"/>'

def svg(bg, body, title):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="1024" height="1024">
  <title>Halftime: {title}</title>
  <rect width="512" height="512" fill="{bg}"/>
  {body}
</svg>
'''

def laced_ball(cx, cy, R, fill, seam, rim_w):
    """An old 18-panel laced leather ball."""
    def top_bottom(x):
        dy = math.sqrt(max(R * R - (x - cx) ** 2, 0)); return cy - dy, cy + dy
    def seam_v(x, bow):
        y0, y1 = top_bottom(x); return f"M{x:.1f},{y0:.1f} Q{x + bow:.1f},{cy} {x:.1f},{y1:.1f}"
    k = R / 200
    xs = [(-70 * k, -34 * k), (70 * k, 34 * k), (-23 * k, -8 * k), (23 * k, 8 * k)]
    parts = [seam_v(cx + dx, b) for dx, b in xs]
    for dy in (-66 * k, 66 * k):
        y = cy + dy; half = math.sqrt(R * R - dy * dy); sag = 10 * k * (1 if dy < 0 else -1)
        inner_l, inner_r = cx - 70 * k - 17 * k, cx + 70 * k + 17 * k
        parts.append(f"M{inner_l:.1f},{y:.1f} Q{(inner_l + cx - half) / 2:.1f},{y + sag:.1f} {cx - half + 3:.1f},{y + sag * 0.4:.1f}")
        parts.append(f"M{inner_r:.1f},{y:.1f} Q{(inner_r + cx + half) / 2:.1f},{y + sag:.1f} {cx + half - 3:.1f},{y + sag * 0.4:.1f}")
    lace_y = cy - 160 * k
    lace = f"M{cx - 30 * k:.1f},{lace_y:.1f} Q{cx:.1f},{lace_y - 6 * k:.1f} {cx + 30 * k:.1f},{lace_y:.1f} " + " ".join(
        f"M{cx + o * k:.1f},{lace_y - 9 * k:.1f} L{cx + o * k:.1f},{lace_y + 9 * k:.1f}" for o in (-23, -11, 0, 11, 23))
    return (f'<circle cx="{cx}" cy="{cy}" r="{R}" fill="{fill}" stroke="{seam}" stroke-width="{rim_w}"/>'
            f'<path d="{" ".join(parts)} {lace}" fill="none" stroke="{seam}" stroke-width="{max(2, rim_w * 0.55):.1f}" stroke-linecap="round"/>')

# ---------------- the designs: each takes t = "H" or "HT" ----------------
def d_oranges(t):
    c, r = (256, 248), 172; body = [f'<path d="M{c[0] - r},{c[1]} A{r},{r} 0 0 1 {c[0] + r},{c[1]} Z" fill="{TANGERINE}"/>',
                                    f'<path d="M{c[0] - r + 14},{c[1]} A{r - 14},{r - 14} 0 0 1 {c[0] + r - 14},{c[1]} Z" fill="{PITH}"/>',
                                    f'<path d="M{c[0] - r + 22},{c[1]} A{r - 22},{r - 22} 0 0 1 {c[0] + r - 22},{c[1]} Z" fill="{ORANGE}"/>']
    for i in range(1, 6):
        a = math.radians(180 + i * 30)
        body.append(f'<path d="M{c[0]},{c[1]} L{c[0] + (r - 22) * math.cos(a):.1f},{c[1] + (r - 22) * math.sin(a):.1f}" stroke="{PITH}" stroke-width="6"/>')
    body.append(f'<path d="M{c[0] - 26},{c[1]} A26,26 0 0 1 {c[0] + 26},{c[1]} Z" fill="{PITH}"/>')
    m, _ = letters(t, SLAB, 300, 118, 256, 352, PITCH, -0.02)
    body.append(m); body.append(label("HALF-TIME ORANGES", BEBAS, 22, 256, 456, PITCH, 0.25))
    return svg(CHALK, "\n  ".join(body), "half-time oranges")

def d_tv(t):
    left_w = 150 if t == "HT" else 118; x0, y0, h = 66, 206, 100; total = 380
    body = [f'<rect x="{x0}" y="{y0}" width="{total}" height="{h}" rx="12" fill="{CHALK}"/>',
            f'<path d="M{x0 + 12},{y0} H{x0 + left_w} V{y0 + h} H{x0 + 12} A12,12 0 0 1 {x0},{y0 + h - 12} V{y0 + 12} A12,12 0 0 1 {x0 + 12},{y0} Z" fill="{INK}"/>']
    m, _ = letters(t, BEBAS, left_w - 40, 66, x0 + left_w / 2, y0 + h / 2, MUSTARD, 0.04); body.append(m)
    n, _ = letters("45:00", BEBAS, total - left_w - 60, 66, x0 + left_w + (total - left_w) / 2, y0 + h / 2, INK, 0.06); body.append(n)
    body.append(label("HALF TIME", BEBAS, 26, 256, 368, CHALK, 0.4))
    return svg(PITCH, "\n  ".join(body), "TV score graphic")

def d_shirt(t):
    s, ox, oy = 3.5, 46, 50
    P = lambda x, y: f"{ox + x * s:.1f},{oy + y * s:.1f}"
    shape = f"M{P(40,8)} L{P(20,18)} L{P(4,44)} L{P(22,54)} L{P(30,44)} L{P(30,112)} L{P(90,112)} L{P(90,44)} L{P(98,54)} L{P(116,44)} L{P(100,18)} L{P(80,8)} Q{P(60,24)} {P(40,8)} Z"
    body = [f'<path d="{shape}" fill="{CHALK}"/>',
            f'<path d="M{P(40,8)} Q{P(60,24)} {P(80,8)}" fill="none" stroke="{NAVY}" stroke-width="16"/>',
            f'<path d="M{P(4,44)} L{P(22,54)} M{P(98,54)} L{P(116,44)}" stroke="{NAVY}" stroke-width="16"/>',
            f'<path d="{shape}" fill="none" stroke="{INK}" stroke-width="7" stroke-linejoin="round"/>']
    m, _ = letters(t, SLAB, 170, 140, ox + 60 * s, oy + 74 * s, NAVY, -0.02); body.append(m)
    return svg(PITCH, "\n  ".join(body), "shirt")

def d_scarf(t):
    body = []; bars = [NAVY, MUSTARD]; x = -20; i = 0
    while x < 532:
        body.append(f'<rect x="{x}" y="128" width="64" height="256" fill="{bars[i % 2]}"/>'); x += 64; i += 1
    body.append(f'<rect x="136" y="128" width="240" height="256" fill="{NAVY}"/>')
    ribs = " ".join(f"M{x},128 V384" for x in range(-16, 528, 8))
    body.append(f'<path d="{ribs}" stroke="{INK}" stroke-width="1.2" opacity="0.18"/>')
    m, _ = letters(t, BEBAS, 180, 170, 256, 256, MUSTARD, 0.04); body.append(m)
    body += [f'<rect x="0" y="120" width="512" height="8" fill="{CHALK}"/>', f'<rect x="0" y="384" width="512" height="8" fill="{CHALK}"/>']
    return svg(CHALK, "\n  ".join(body), "bar scarf")

def d_rosette(t):
    def zigzag(r1, r2, n, cy=230):
        pts = [];
        for i in range(n * 2):
            r = r1 if i % 2 == 0 else r2; a = math.radians(i * 180 / n)
            pts.append(f"{256 + r * math.cos(a):.1f},{cy + r * math.sin(a):.1f}")
        return " ".join(pts)
    body = [f'<polygon points="186,300 236,300 236,492 211,470 186,492" fill="{MUSTARD}"/>',
            f'<polygon points="276,300 326,300 326,492 301,470 276,492" fill="{CHALK}"/>',
            f'<polygon points="{zigzag(186, 166, 40)}" fill="{CHALK}"/>', f'<polygon points="{zigzag(156, 140, 34)}" fill="{MUSTARD}"/>',
            f'<circle cx="256" cy="230" r="118" fill="{PITCH}" stroke="{CHALK}" stroke-width="5"/>']
    m, _ = letters(t, FAT, 170, 110, 256, 230, CHALK, 0.0); body.append(m)
    return svg(NAVY, "\n  ".join(body), "rosette")

def d_whistle(t):
    body = [f'<circle cx="94" cy="214" r="30" fill="none" stroke="{INK}" stroke-width="12"/>',
            f'<path d="M206,170 H430 Q458,170 458,198 V236 Q458,262 430,262 H330 A124,124 0 1 1 206,170 Z" fill="{INK}"/>',
            f'<rect x="250" y="164" width="44" height="16" fill="{MUSTARD}"/>',
            f'<path d="M118,206 L170,190" stroke="{INK}" stroke-width="12" stroke-linecap="round"/>']
    m, _ = letters(t, SLAB, 160, 110, 214, 300, MUSTARD, -0.02); body.append(m)
    return svg(MUSTARD, "\n  ".join(body), "whistle")

def d_enamel(t):
    body = [f'<rect x="36" y="112" width="440" height="288" rx="28" fill="{CHALK}"/>', f'<rect x="50" y="126" width="412" height="260" rx="20" fill="{ENAMEL}"/>',
            f'<rect x="64" y="140" width="384" height="232" rx="12" fill="none" stroke="{CHALK}" stroke-width="3"/>']
    for x, y in ((80, 156), (432, 156), (80, 356), (432, 356)):
        body += [f'<circle cx="{x}" cy="{y}" r="8" fill="{CHALK}"/>', f'<path d="M{x - 5},{y} H{x + 5}" stroke="{INK}" stroke-width="2"/>']
    m, _ = letters(t, ANTON, 280, 128, 256, 238, CHALK, 0.03); body.append(m)
    body.append(label("FOOTBALL GROUND", BEBAS, 22, 236, 346, CHALK, 0.18))
    body.append(f'<path d="M378,338 H404 M396,330 L405,338 L396,346" fill="none" stroke="{CHALK}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>')
    return svg(CONCRETE, "\n  ".join(body), "enamel sign")

def d_tuscan(t):
    body = [f'<path d="M58,118 H454 M58,128 H454 M58,384 H454 M58,394 H454" stroke="{INK}" stroke-width="4"/>',
            label("FOOTBALL", BEBAS, 26, 256, 96, INK, 0.45), label("NEWS · SCORES · SHIRTS", BEBAS, 22, 256, 438, INK, 0.25),
            star(80, 86, 9, TANGERINE), star(432, 86, 9, TANGERINE)]
    m, _ = letters(t, WOOD, 360, 210, 256, 256, INK, 0.02, shadow=(7, 7, TANGERINE)); body.append(m)
    return svg(CHALK, "\n  ".join(body), "wood-type poster")

def d_seventies(t):
    body = [f'<rect x="0" y="190" width="512" height="40" fill="{MUSTARD}"/>', f'<rect x="0" y="236" width="512" height="40" fill="{TANGERINE}"/>',
            f'<rect x="0" y="282" width="512" height="40" fill="{BROWN}"/>']
    m, _ = letters(t, RETRO, 350, 200, 256, 252, CHALK, -0.02, attrs=f'stroke="{BROWN}" stroke-width="8" stroke-linejoin="round" paint-order="stroke"', shadow=(9, 9, BROWN))
    body.append(m)
    return svg(CHALK, "\n  ".join(body), "70s stripes")

def d_stencil(t):
    body = [f'<rect x="62" y="84" width="388" height="344" fill="{MUSTARD}"/>', label("BLOCK" if t == "H" else "HALF TIME", STENCIL, 30, 256, 146, INK, 0.3),
            f'<path d="M100,168 H412" stroke="{INK}" stroke-width="5"/>']
    m, _ = letters(t, STENCIL, 300, 200, 256, 296, INK, 0.04); body.append(m)
    return svg(CONCRETE, "\n  ".join(body), "terrace stencil")

def d_programme(t):
    body = [f'<rect x="74" y="40" width="364" height="432" fill="{CHALK}"/>', f'<rect x="74" y="40" width="364" height="96" fill="{PITCH}"/>',
            label("OFFICIAL", BEBAS, 26, 230, 82, CHALK, 0.3), label("PROGRAMME", BEBAS, 26, 230, 118, CHALK, 0.3),
            f'<circle cx="388" cy="88" r="34" fill="{MUSTARD}"/>', label("6d", SLAB, 26, 388, 101, INK, 0),
            f'<rect x="74" y="410" width="364" height="62" fill="{PITCH}"/>', label("No. 1", BEBAS, 26, 256, 452, CHALK, 0.3)]
    m, _ = letters(t, ANTON, 260, 210, 256, 272, PITCH, 0.03); body.append(m)
    return svg(MUSTARD, "\n  ".join(body), "match programme")

def d_ball_type(t):
    body = [laced_ball(256, 176, 118, LEATHER, BROWN, 7)]
    m, _ = letters(t, SLAB, 300, 112, 256, 390, CHALK, -0.02); body.append(m)
    return svg(PITCH, "\n  ".join(body), "leather ball")

def d_goal(t):
    net = " ".join([f"M{x},150 V400" for x in range(110, 426, 24)] + [f"M86,{y} H426" for y in range(174, 400, 24)])
    body = [f'<path d="{net}" stroke="{NET}" stroke-width="2.5"/>', f'<path d="M86,404 V146 H426 V404" fill="none" stroke="{CHALK}" stroke-width="14" stroke-linejoin="round"/>',
            f'<path d="M30,404 H482" stroke="{CHALK}" stroke-width="5"/>']
    m, bb = letters(t, SLAB, 240, 140, 256, 290, CHALK, -0.02, attrs=f'stroke="{PITCH}" stroke-width="18" stroke-linejoin="round" paint-order="stroke"')
    body.append(m)
    return svg(PITCH, "\n  ".join(body), "goal")

def d_corner(t):
    body = [f'<path d="M0,452 H512 M60,512 V0" stroke="{CHALK}" stroke-width="6" opacity="0"/>',
            f'<path d="M60,512 V452 H512" fill="none" stroke="{CHALK}" stroke-width="6"/>', f'<path d="M60,380 A72,72 0 0 1 132,452" fill="none" stroke="{CHALK}" stroke-width="6"/>',
            f'<path d="M60,452 V70" stroke="{CHALK}" stroke-width="10" stroke-linecap="round"/>',
            f'<path d="M66,76 C170,52 300,108 440,80 L440,262 C300,290 170,234 66,258 Z" fill="{MUSTARD}"/>']
    m, _ = letters(t, SLAB, 250, 120, 252, 170, INK, -0.02); body.append(m)
    return svg(PITCH, "\n  ".join(body), "corner flag")

def d_gothic(t):
    body = [f'<circle cx="256" cy="256" r="214" fill="none" stroke="{MUSTARD}" stroke-width="9"/>', f'<circle cx="256" cy="256" r="198" fill="none" stroke="{MUSTARD}" stroke-width="3"/>']
    m, _ = letters(t, GOTHIC, 270, 210, 256, 260, MUSTARD, 0.0); body.append(m)
    return svg(INK, "\n  ".join(body), "blackletter")

def d_script(t):
    body = [f'<path d="M96,356 C190,330 330,336 420,350 C440,353 446,362 430,366" fill="none" stroke="{MUSTARD}" stroke-width="7" stroke-linecap="round"/>',
            label("HALFTIME", BEBAS, 24, 256, 420, CHALK, 0.55)]
    m, _ = letters(t, SCRIPT, 320, 210, 256, 230, CHALK, 0.0); body.append(m)
    return svg(NAVY, "\n  ".join(body), "script")

def d_floodlights(t):
    body = []
    for x, flip in ((76, 1), (436, -1)):
        body.append(f'<polygon points="{x},96 {x + flip * 210},430 {x + flip * 120},430" fill="{NIGHT_BEAM}"/>')
    for x in (76, 436):
        body += [f'<path d="M{x - 18},470 L{x - 4},140 M{x + 18},470 L{x + 4},140 M{x - 16},420 L{x + 14},360 M{x + 16},420 L{x - 14},360 M{x - 13},330 L{x + 11},260 M{x + 13},330 L{x - 11},260 M{x - 10},240 L{x + 8},170 M{x + 10},240 L{x - 8},170" stroke="{CHALK}" stroke-width="4"/>',
                 f'<rect x="{x - 40}" y="84" width="80" height="58" rx="4" fill="{CHALK}"/>']
        body += [f'<circle cx="{x - 24 + 16 * i}" cy="{100 + 22 * j}" r="6" fill="{MUSTARD}"/>' for i in range(4) for j in range(2)]
    m, _ = letters(t, ANTON, 250, 170, 256, 330, CHALK, 0.04); body.append(m)
    return svg(NAVY, "\n  ".join(body), "floodlights")

def d_checks(t):
    body = []
    for i in range(32):
        if i % 2: continue
        a0, a1 = math.radians(i * 11.25), math.radians((i + 1) * 11.25)
        for r_in, r_out, off in ((176, 200, 0), (200, 224, 1)):
            b0, b1 = (a0, a1) if off == 0 else (a0 + math.radians(11.25), a1 + math.radians(11.25))
            body.append(f'<path d="M{256 + r_in * math.cos(b0):.1f},{256 + r_in * math.sin(b0):.1f} L{256 + r_out * math.cos(b0):.1f},{256 + r_out * math.sin(b0):.1f} A{r_out},{r_out} 0 0 1 {256 + r_out * math.cos(b1):.1f},{256 + r_out * math.sin(b1):.1f} L{256 + r_in * math.cos(b1):.1f},{256 + r_in * math.sin(b1):.1f} A{r_in},{r_in} 0 0 0 {256 + r_in * math.cos(b0):.1f},{256 + r_in * math.sin(b0):.1f} Z" fill="{INK}"/>')
    body = [f'<circle cx="256" cy="256" r="224" fill="{CHALK}"/>'] + body + [f'<circle cx="256" cy="256" r="176" fill="{TANGERINE}"/>',
            f'<circle cx="256" cy="256" r="224" fill="none" stroke="{INK}" stroke-width="4"/>']
    m, _ = letters(t, FAT, 230, 150, 256, 256, INK, 0.0); body.append(m)
    return svg(CHALK, "\n  ".join(body), "chequered roundel")

def d_hoops(t):
    body = [f'<rect x="0" y="{y}" width="512" height="44" fill="{PITCH}"/>' for y in range(0, 512, 88)]
    body += [f'<circle cx="256" cy="256" r="160" fill="{PITCH}" stroke="{CHALK}" stroke-width="12"/>', f'<circle cx="256" cy="256" r="142" fill="none" stroke="{CHALK}" stroke-width="3"/>']
    m, _ = letters(t, SLAB, 210, 150, 256, 256, CHALK, -0.02); body.append(m)
    return svg(CHALK, "\n  ".join(body), "hoops")

def d_tactics(t):
    chalk = f'fill="none" stroke="{CHALK}" stroke-width="5" stroke-linecap="round"'
    marks = []
    for x, y in ((92, 120), (150, 420), (420, 112)):
        marks.append(f'<circle cx="{x}" cy="{y}" r="15" {chalk}/>')
    for x, y in ((420, 420), (96, 300)):
        marks.append(f'<path d="M{x - 13},{y - 13} L{x + 13},{y + 13} M{x + 13},{y - 13} L{x - 13},{y + 13}" {chalk}/>')
    marks += [f'<path d="M112,132 C170,190 150,250 118,284" {chalk} stroke-dasharray="10 9"/>', f'<path d="M150,400 C230,440 330,450 396,428" {chalk} stroke-dasharray="10 9"/>',
              f'<path d="M386,420 L398,428 L384,436" {chalk}/>', f'<path d="M30,256 H482" stroke="{CHALK}" stroke-width="3" opacity="0.5"/>']
    body = [f'<rect x="18" y="18" width="476" height="476" rx="10" fill="{BOARD}" stroke="{BROWN}" stroke-width="16"/>'] + marks
    m, _ = letters(t, BEBAS, 260, 170, 256, 256, CHALK, 0.04, attrs=f'stroke="{BOARD}" stroke-width="16" stroke-linejoin="round" paint-order="stroke"'); body.append(m)
    return svg(BOARD, "\n  ".join(body), "tactics board")

DESIGNS = [
    ("01-half-time-oranges", d_oranges), ("02-tv-score-graphic", d_tv), ("03-shirt", d_shirt), ("04-bar-scarf", d_scarf),
    ("05-rosette", d_rosette), ("06-whistle", d_whistle), ("07-enamel-sign", d_enamel), ("08-wood-type-poster", d_tuscan),
    ("09-seventies-stripes", d_seventies), ("10-terrace-stencil", d_stencil), ("11-match-programme", d_programme), ("12-leather-ball", d_ball_type),
    ("13-goal", d_goal), ("14-corner-flag", d_corner), ("15-blackletter", d_gothic), ("16-script", d_script),
    ("17-floodlights", d_floodlights), ("18-chequered-roundel", d_checks), ("19-hoops", d_hoops), ("20-tactics-board", d_tactics),
]
if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    for f in os.listdir(OUT):
        if f.endswith((".svg", ".png")): os.remove(OUT + f)
    for name, make in DESIGNS:
        for t in ("H", "HT"):
            open(f"{OUT}{name}-{t}.svg", "w").write(make(t))
    print(len(DESIGNS) * 2, "logos written to", OUT)
