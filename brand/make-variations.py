# Draws the Halftime logo variations as SVG files with every letter converted to a shape.
# Run from the project folder:  python3 brand/make-variations.py
import math, os
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.boundsPen import BoundsPen

OX, CREAM, INK, GREEN, GOLD = "#8C2A1F", "#F7F1E1", "#1B1A17", "#1F4D3A", "#E3C16F"
FONTS = "public/assets/fonts/"
OUT = "brand/variations/"

class Font:
    def __init__(self, file):
        self.f = TTFont(FONTS + file); self.gs = self.f.getGlyphSet(); self.cmap = self.f.getBestCmap(); self.hm = self.f["hmtx"]
        b = self.bounds("H"); self.cap = b[3] - b[1]
    def g(self, ch): return self.cmap[ord(ch)]
    def adv(self, ch): return self.hm[self.g(ch)][0]
    def bounds(self, ch):
        bp = BoundsPen(self.gs); self.gs[self.g(ch)].draw(bp); return bp.bounds
    def path(self, ch, t):
        pen = SVGPathPen(self.gs); self.gs[self.g(ch)].draw(TransformPen(pen, t)); return pen.getCommands()

CASLON = Font("LibreCaslonText-700.woff2")
ITALIC = Font("LibreCaslonText-400-italic.woff2")
ABRIL = Font("AbrilFatface-400.woff2")
COURIER = Font("CourierPrime-700.woff2")

def style(fill, gap_color=None, gap=0):
    s = f'fill="{fill}"'
    if gap: s += f' stroke="{gap_color}" stroke-width="{gap}" stroke-linejoin="round" paint-order="stroke"'
    return s

def group(items, cx, cy):
    """Lay out glyphs (each: font, ch, cap, x, base, style), centre the whole group on (cx, cy)."""
    xs, ys = [], []
    for it in items:
        f = it["font"]; sc = it["cap"] / f.cap; b = f.bounds(it["ch"])
        xs += [it["x"] + b[0] * sc, it["x"] + b[2] * sc]; ys += [it["base"] - b[3] * sc, it["base"] - b[1] * sc]
    dx = cx - (min(xs) + max(xs)) / 2; dy = cy - (min(ys) + max(ys)) / 2
    out = []
    for it in items:
        f = it["font"]; sc = it["cap"] / f.cap
        out.append(f'<path d="{f.path(it["ch"], (sc, 0, 0, -sc, it["x"] + dx, it["base"] + dy))}" {it["style"]}/>')
    return "\n  ".join(out), (min(xs) + dx, min(ys) + dy, max(xs) + dx, max(ys) + dy)

def mark(kind, cap, cx, cy, fill, gap_color=None, gap=0, second=None):
    st = style(fill, gap_color, gap)
    if kind == "H":
        items = [dict(font=CASLON, ch="H", cap=cap, x=0, base=0, style=st)]
    elif kind == "HT-abril":            # side by side, in the masthead typeface
        f = ABRIL; sc = cap / f.cap
        items = [dict(font=f, ch="H", cap=cap, x=0, base=0, style=st),
                 dict(font=f, ch="T", cap=cap, x=f.adv("H") * sc - 0.05 * cap, base=0, style=st)]
    elif kind == "HT-lig":              # the T's bar grows out of the H's right stem
        f = CASLON; sc = cap / f.cap; hb = f.bounds("H"); tb = f.bounds("T")
        stem = 0.2 * f.cap
        items = [dict(font=f, ch="H", cap=cap, x=0, base=0, style=st),
                 dict(font=f, ch="T", cap=cap, x=(hb[2] - stem) * sc - tb[0] * sc, base=0, style=st)]
    elif kind == "HT-weave":            # T woven through the H: bar behind the stems, stem in front of the crossbar
        f = CASLON; sc = cap / f.cap; hb = f.bounds("H"); tb = f.bounds("T")
        tcap = cap * 1.26; tsc = tcap / f.cap
        tx = (hb[0] + hb[2]) / 2 * sc - (tb[0] + tb[2]) / 2 * tsc
        g = gap or cap * 0.09
        t_back = dict(font=f, ch="T", cap=tcap, x=tx, base=cap * 0.10, style=style(second or fill))
        h_mid = dict(font=f, ch="H", cap=cap, x=0, base=0, style=style(fill, gap_color, g))
        drawn, bb = group([t_back, h_mid], cx, cy)
        # the H crossbar sits roughly between 43% and 58% of the cap height, measured up from the baseline
        hcap_top, hcap_bottom = bb[1] + (bb[3] - bb[1]) * 0, bb[3]
        h_items = [h_mid]
        _, hbox = group(h_items, cx, cy)
        base_y = (hbox[3])  # baseline of H after centring (H sits on its baseline)
        band_top, band_bot = base_y - cap * 0.62, base_y - cap * 0.36
        stem_w = cap * 0.34
        clip = f'<clipPath id="weave"><rect x="{cx - stem_w / 2:.1f}" y="{band_top:.1f}" width="{stem_w:.1f}" height="{band_bot - band_top:.1f}"/></clipPath>'
        t_front = dict(t_back, style=style(second or fill, gap_color, g))
        front, _ = group([t_front, dict(h_mid, style='fill="none"')], cx, cy)
        front = front.split("\n  ")[0]
        return clip + "\n  " + drawn + f'\n  <g clip-path="url(#weave)">{front}</g>', bb
    elif kind == "HT-overlay":          # a slim, taller italic T laid across the bold H, monogram style
        f = CASLON; sc = cap / f.cap; hb = f.bounds("H")
        t = ITALIC; tb = t.bounds("T"); tcap = cap * 1.32; tsc = tcap / t.cap
        items = [dict(font=f, ch="H", cap=cap, x=0, base=0, style=st),
                 dict(font=t, ch="T", cap=tcap, x=(hb[0] + hb[2]) / 2 * sc - (tb[0] + tb[2]) / 2 * tsc + cap * 0.2, base=cap * 0.16,
                      style=style(second or fill, gap_color, gap or cap * 0.07))]
    elif kind == "HT-interlock":        # a taller T laid over the H, varsity style
        f = CASLON; sc = cap / f.cap; hb = f.bounds("H"); tb = f.bounds("T")
        tcap = cap * 1.24; tsc = tcap / f.cap
        items = [dict(font=f, ch="H", cap=cap, x=0, base=0, style=st),
                 dict(font=f, ch="T", cap=tcap, x=(hb[0] + hb[2]) / 2 * sc - (tb[0] + tb[2]) / 2 * tsc, base=cap * 0.06,
                      style=style(second or fill, gap_color, gap or cap * 0.11))]
    elif kind == "HT-italic":           # flowing italic pair, overlapping
        f = ITALIC; sc = cap / f.cap
        items = [dict(font=f, ch="H", cap=cap, x=0, base=0, style=st),
                 dict(font=f, ch="T", cap=cap, x=f.adv("H") * sc * 0.78, base=0, style=st)]
    return group(items, cx, cy)

def line_text(font, text, cap, px, py, fill, tracking=0, angle=0):
    """Text centred on the point (px, py) on its baseline, optionally rotated (degrees, clockwise)."""
    sc = cap / font.cap; a = math.radians(angle)
    t = (math.cos(a), math.sin(a)); up = (math.sin(a), -math.cos(a))
    advs = [font.adv(ch) * sc for ch in text]; total = sum(advs) + tracking * (len(text) - 1)
    x, y = px - total / 2 * t[0], py - total / 2 * t[1]; parts = []
    for ch, w in zip(text, advs):
        if ch != " ": parts.append(font.path(ch, (sc * t[0], sc * t[1], sc * up[0], sc * up[1], x, y)))
        x += (w + tracking) * t[0]; y += (w + tracking) * t[1]
    return f'<path d="{" ".join(parts)}" fill="{fill}"/>'

def arc_text(font, text, cap, cx, cy, r, centre_deg, fill, top=True, tracking=0):
    """Text on a circle: across the top reading clockwise, or across the bottom reading left to right."""
    sc = cap / font.cap; advs = [font.adv(ch) * sc for ch in text]; total = sum(advs) + tracking * (len(text) - 1)
    parts, cum = [], 0
    for ch, w in zip(text, advs):
        off = (cum + w / 2 - total / 2) / r
        th = math.radians(centre_deg) + (off if top else -off)
        if top: t, up = (-math.sin(th), math.cos(th)), (math.cos(th), math.sin(th))
        else:   t, up = (math.sin(th), -math.cos(th)), (-math.cos(th), -math.sin(th))
        p = (cx + r * math.cos(th), cy + r * math.sin(th))
        if ch != " ":
            parts.append(font.path(ch, (sc * t[0], sc * t[1], sc * up[0], sc * up[1], p[0] - w / 2 * t[0], p[1] - w / 2 * t[1])))
        cum += w + tracking
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

# ---------------- frames ----------------
def roundel(kind, cap, bg, ring, letter, top="HALFTIME", bottom="EST. MMXXVI"):
    o = f'fill="none" stroke="{ring}"'
    body = [f'<circle cx="256" cy="256" r="228" {o} stroke-width="10"/>', f'<circle cx="256" cy="256" r="213" {o} stroke-width="3"/>',
            f'<circle cx="256" cy="256" r="158" {o} stroke-width="6"/>',
            arc_text(COURIER, top, 30, 256, 256, 172, -90, ring, top=True, tracking=10),
            arc_text(COURIER, bottom, 24, 256, 256, 200, 90, ring, top=False, tracking=7),
            star(256 - 186, 256, 9, ring), star(256 + 186, 256, 9, ring)]
    m, _ = mark(kind, cap, 256, 256, letter, second=ring)
    return svg(bg, "\n  ".join(body + [m]), "roundel")

def laurel(kind, cap, bg, col):
    c, r = (256, 286), 178
    leaf = "M0,0 Q15,-8 32,0 Q15,8 0,0 Z"; parts = []
    for i in range(11):
        th = math.radians(100 + i * 12.2)
        x, y = c[0] + r * math.cos(th), c[1] + r * math.sin(th)
        tang = math.degrees(math.atan2(math.cos(th), -math.sin(th)))
        size = 1.25 - i * 0.03
        for k in (-1, 1):
            parts.append(f'<path d="{leaf}" transform="translate({x:.1f},{y:.1f}) rotate({tang + k * 40:.1f}) scale({size:.2f})"/>')
    a0, a1 = math.radians(96), math.radians(232)
    stem = f'<path d="M{c[0] + r * math.cos(a0):.1f},{c[1] + r * math.sin(a0):.1f} A{r},{r} 0 0 1 {c[0] + r * math.cos(a1):.1f},{c[1] + r * math.sin(a1):.1f}" fill="none" stroke="{col}" stroke-width="4"/>'
    branch = f'<g fill="{col}">{"".join(parts)}</g>{stem}'
    body = [branch, f'<g transform="translate(512,0) scale(-1,1)">{branch}</g>', star(256, 96, 22, col),
            f'<path d="M226,452 Q256,440 286,452" fill="none" stroke="{col}" stroke-width="5" stroke-linecap="round"/>']
    m, _ = mark(kind, cap, 256, 276, col)
    return svg(bg, "\n  ".join(body + [m]), "laurel")

def pitch(kind, cap, lines, letter):
    o = f'fill="none" stroke="{lines}" stroke-width="6"'
    body = [f'<rect x="36" y="100" width="440" height="312" {o}/>', f'<path d="M256,100 V412" {o}/>', f'<circle cx="256" cy="256" r="98" {o}/>',
            f'<rect x="36" y="178" width="66" height="156" {o}/>', f'<rect x="410" y="178" width="66" height="156" {o}/>',
            f'<rect x="36" y="220" width="24" height="72" {o}/>', f'<rect x="452" y="220" width="24" height="72" {o}/>',
            f'<path d="M102,226 A34,34 0 0 1 102,286 M410,226 A34,34 0 0 0 410,286" {o}/>']
    m, bb = mark(kind, cap, 256, 256, letter)
    pad = 10
    patch = f'<rect x="{bb[0] - pad:.1f}" y="{bb[1] - pad:.1f}" width="{bb[2] - bb[0] + 2 * pad:.1f}" height="{bb[3] - bb[1] + 2 * pad:.1f}" fill="{GREEN}"/>'
    return svg(GREEN, "\n  ".join(body + [patch, m]), "pitch")

def pennant(kind, cap, cx, bg, col):
    body = [f'<rect x="40" y="126" width="38" height="260" rx="4" fill="{col}"/>',
            f'<path d="M78,140 L462,256 L78,372 Z" fill="none" stroke="{col}" stroke-width="10" stroke-linejoin="round"/>',
            f'<path d="M100,170 L398,256 L100,342 Z" fill="none" stroke="{col}" stroke-width="3" stroke-dasharray="9 7" stroke-linejoin="round"/>',
            star(312, 256, 14, col), star(352, 256, 10, col), star(382, 256, 7, col)]
    m, _ = mark(kind, cap, cx, 256, col)
    return svg(bg, "\n  ".join(body + [m]), "pennant")

def ticket(kind, cap):
    shape = "M70,132 H442 Q456,132 456,146 V234 A22,22 0 0 0 456,278 V366 Q456,380 442,380 H70 Q56,380 56,366 V278 A22,22 0 0 0 56,234 V146 Q56,132 70,132 Z"
    body = [f'<path d="{shape}" fill="{CREAM}"/>',
            f'<rect x="74" y="150" width="268" height="212" fill="none" stroke="{OX}" stroke-width="2.5"/>',
            f'<path d="M362,144 V368" stroke="{OX}" stroke-width="3.5" stroke-dasharray="1 9" stroke-linecap="round"/>',
            line_text(COURIER, "HALFTIME", 14, 208, 178, OX, tracking=7),
            line_text(COURIER, "No. 001", 16, 208, 346, OX, tracking=3),
            line_text(COURIER, "ADMIT ONE", 18, 418, 256, OX, tracking=6, angle=-90)]
    m, _ = mark(kind, cap, 208, 258, OX)
    return svg(OX, "\n  ".join(body + [m]), "ticket")

def diamond(kind, cap, bg, lines, letter):
    o = f'fill="none" stroke="{lines}" stroke-linejoin="round"'
    body = [f'<polygon points="256,34 478,256 256,478 34,256" {o} stroke-width="10"/>', f'<polygon points="256,66 446,256 256,446 66,256" {o} stroke-width="3.5"/>',
            star(256, 112, 11, lines), star(256, 400, 11, lines)]
    m, _ = mark(kind, cap, 256, 256, letter)
    return svg(bg, "\n  ".join(body + [m]), "diamond")

def plain(kind, cap, bg, col, second=None, gap_color=None):
    m, _ = mark(kind, cap, 256, 256, col, gap_color, 0, second=second)
    return svg(bg, m, "monogram")

def masthead(kind, cap):
    body = [f'<path d="M64,104 H448 M64,116 H448 M64,396 H448 M64,408 H448" stroke="{OX}" stroke-width="4"/>',
            line_text(COURIER, "EST. MMXXVI", 17, 256, 82, OX, tracking=8), line_text(COURIER, "HALFTIME", 17, 256, 446, OX, tracking=12)]
    m, _ = mark(kind, cap, 256, 256, OX)
    return svg(CREAM, "\n  ".join(body + [m]), "masthead")

def from_existing(src, kind, cap, cy, patch=False):
    s = open(src).read()
    body = s[s.index("/>", s.index("<rect")) + 2: s.rindex("</svg>")]
    if patch: body = body[:body.index('<rect x=')]                 # ball: drop the old patch and H
    else:     body = body[:body.rindex('<path d="')]               # crest: drop the old H
    m, bb = mark(kind, cap, 256, cy, CREAM, OX if patch else None, 0)
    extra = ""
    if patch:
        p = 12; extra = f'<rect x="{bb[0] - p:.1f}" y="{bb[1] - p:.1f}" width="{bb[2] - bb[0] + 2 * p:.1f}" height="{bb[3] - bb[1] + 2 * p:.1f}" fill="{OX}"/>\n  '
    return svg(OX, body.strip() + "\n  " + extra + m, "ball" if patch else "crest")

DESIGNS = [
    ("H1-roundel",        lambda: roundel("H", 150, OX, CREAM, CREAM)),
    ("H2-laurel",         lambda: laurel("H", 150, OX, CREAM)),
    ("H3-pitch",          lambda: pitch("H", 104, CREAM, GOLD)),
    ("H4-pennant",        lambda: pennant("H", 88, 190, OX, CREAM)),
    ("H5-ticket",         lambda: ticket("H", 128)),
    ("H6-diamond",        lambda: diamond("H", 150, INK, GOLD, CREAM)),
    ("HT1-masthead-pair", lambda: plain("HT-abril", 190, OX, CREAM)),
    ("HT2-ligature",      lambda: plain("HT-lig", 200, OX, CREAM)),
    ("HT3-interlocked",   lambda: plain("HT-overlay", 176, INK, CREAM, second=GOLD, gap_color=INK)),
    ("HT4-italic",        lambda: masthead("HT-italic", 196)),
    ("HT5-roundel",       lambda: roundel("HT-abril", 118, GREEN, GOLD, CREAM)),
    ("HT6-ball",          lambda: from_existing("brand/halftime-logo-ball.svg", "HT-abril", 124, 262, patch=True)),
    ("HT7-crest",         lambda: from_existing("brand/halftime-logo-crest.svg", "HT-lig", 126, 270)),
]
if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    for name, make in DESIGNS:
        open(OUT + name + ".svg", "w").write(make())
    print(len(DESIGNS), "designs written to", OUT)
