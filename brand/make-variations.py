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
    elif kind in ("H-abril", "T-abril"):
        items = [dict(font=ABRIL, ch=kind[0], cap=cap, x=0, base=0, style=st)]
    elif kind == "H-italic":
        items = [dict(font=ITALIC, ch="H", cap=cap, x=0, base=0, style=st)]
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

# ---------------- fitting ----------------
DARK_OX, LIGHT_OX, TILE, BOARD, TAIL = "#6E2017", "#A8473A", "#3A3731", "#2A2824", "#D9CFB8"

def fit(kind, box_w, box_h, cx, cy, fill, gap_color=None, gap=0, second=None):
    """The letters (H or HT) scaled to fit inside box_w x box_h, centred on (cx, cy)."""
    _, bb = mark(kind, 100, 0, 0, fill, second=second)
    cap = 100 * min(box_w / (bb[2] - bb[0]), box_h / (bb[3] - bb[1]))
    return mark(kind, cap, cx, cy, fill, gap_color, gap, second=second)

def patch(bb, colour, pad=12):
    return f'<rect x="{bb[0] - pad:.1f}" y="{bb[1] - pad:.1f}" width="{bb[2] - bb[0] + 2 * pad:.1f}" height="{bb[3] - bb[1] + 2 * pad:.1f}" fill="{colour}"/>'

def ring(cx, cy, r, colour, width):
    return f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="none" stroke="{colour}" stroke-width="{width}"/>'

# ---------------- frames: each takes the letter kind (an H kind or an HT kind) ----------------
def f_plain(k):
    m, _ = fit(k, 300, 240, 256, 256, CREAM); return svg(OX, m, "plain")

def f_abril(k):
    m, _ = fit(k, 330, 250, 256, 256, OX)
    return svg(CREAM, f'<rect x="26" y="26" width="460" height="460" fill="none" stroke="{OX}" stroke-width="5"/><rect x="38" y="38" width="436" height="436" fill="none" stroke="{OX}" stroke-width="2"/>' + m, "masthead type")

def f_roundel(k):
    body = [ring(256, 256, 228, CREAM, 10), ring(256, 256, 213, CREAM, 3), ring(256, 256, 158, CREAM, 6),
            arc_text(COURIER, "HALFTIME", 30, 256, 256, 172, -90, CREAM, True, 10),
            arc_text(COURIER, "EST. MMXXVI", 24, 256, 256, 200, 90, CREAM, False, 7),
            star(70, 256, 9, CREAM), star(442, 256, 9, CREAM)]
    m, _ = fit(k, 210, 150, 256, 256, CREAM); return svg(OX, "\n  ".join(body + [m]), "roundel")

def f_laurel(k):
    s = laurel("H", 10, OX, CREAM); body = s[s.index("/>", s.index("<rect")) + 2: s.rindex("<path d=\"M", 0, s.rindex("</svg>"))]
    m, _ = fit(k, 220, 150, 256, 276, CREAM); return svg(OX, body.strip() + "\n  " + m, "laurel")

def f_pitch(k):
    s = pitch("H", 10, CREAM, GOLD); body = s[s.index("/>", s.index("<rect")) + 2: s.index('<rect x="', s.index("A34,34"))]
    m, bb = fit(k, 170, 104, 256, 256, GOLD); return svg(GREEN, body.strip() + "\n  " + patch(bb, GREEN, 10) + m, "pitch")

def f_pennant(k):
    s = pennant("H", 10, 190, OX, CREAM); body = s[s.index("/>", s.index("<rect")) + 2: s.rindex("<path d=\"M", 0, s.rindex("</svg>"))]
    m, _ = fit(k, 150, 84, 196, 256, CREAM); return svg(OX, body.strip() + "\n  " + m, "pennant")

def f_ticket(k):
    s = ticket("H", 10); body = s[s.index("/>", s.index("<rect")) + 2: s.rindex("<path d=\"M", 0, s.rindex("</svg>"))]
    m, _ = fit(k, 230, 118, 208, 260, OX); return svg(OX, body.strip() + "\n  " + m, "ticket")

def f_diamond(k):
    s = diamond("H", 10, INK, GOLD, CREAM); body = s[s.index("/>", s.index("<rect")) + 2: s.rindex("<path d=\"M", 0, s.rindex("</svg>"))]
    m, _ = fit(k, 220, 160, 256, 256, CREAM, INK, 0, second=GOLD); return svg(INK, body.strip() + "\n  " + m, "diamond")

def f_masthead(k):
    s = masthead("H-italic", 10); body = s[s.index("/>", s.index("<rect")) + 2: s.rindex("<path d=\"M", 0, s.rindex("</svg>"))]
    m, _ = fit(k, 340, 210, 256, 256, OX); return svg(CREAM, body.strip() + "\n  " + m, "italic masthead")

def f_ball(k):
    s = open("brand/halftime-logo-ball.svg").read()
    body = s[s.index("/>", s.index("<rect")) + 2: s.index('<rect x=', s.index("/>", s.index("<rect")) + 2)]
    m, bb = fit(k, 236, 186, 256, 264, CREAM); return svg(OX, body.strip() + "\n  " + patch(bb, OX) + m, "ball")

def f_crest(k):
    s = open("brand/halftime-logo-crest.svg").read()
    body = s[s.index("/>", s.index("<rect")) + 2: s.rindex('<path d="', 0, s.rindex("</svg>"))]
    m, _ = fit(k, 214, 168, 256, 270, CREAM); return svg(OX, body.strip() + "\n  " + m, "crest")

def f_ribbon(k):
    body = [ring(256, 232, 190, CREAM, 10), ring(256, 232, 176, CREAM, 3), star(256, 100, 12, CREAM),
            f'<polygon points="40,352 122,352 122,414 40,414 62,383" fill="{TAIL}"/>',
            f'<polygon points="472,352 390,352 390,414 472,414 450,383" fill="{TAIL}"/>',
            f'<path d="M96,340 Q256,364 416,340 L416,400 Q256,424 96,400 Z" fill="{CREAM}"/>',
            arc_text(COURIER, "HALFTIME", 26, 256, -686, 1079, 90, OX, False, 12)]
    m, _ = fit(k, 200, 136, 256, 214, CREAM); return svg(OX, "\n  ".join(body + [m]), "ribbon badge")

def f_hexagon(k):
    def hexa(r):
        return " ".join(f"{256 + r * math.cos(math.radians(-90 + 60 * i)):.1f},{256 + r * math.sin(math.radians(-90 + 60 * i)):.1f}" for i in range(6))
    body = [f'<polygon points="{hexa(232)}" fill="none" stroke="{GOLD}" stroke-width="10" stroke-linejoin="round"/>',
            f'<polygon points="{hexa(212)}" fill="none" stroke="{GOLD}" stroke-width="3" stroke-linejoin="round"/>',
            star(256, 104, 10, GOLD), star(256, 408, 10, GOLD)]
    m, _ = fit(k, 250, 160, 256, 256, CREAM); return svg(GREEN, "\n  ".join(body + [m]), "hexagon")

def f_scoreboard(k):
    letters = ["H"] if not k.startswith("HT") else ["H", "T"]
    tw, th, gap = 150, 184, 22
    total = len(letters) * tw + (len(letters) - 1) * gap; x0 = 256 - total / 2
    body = [f'<rect x="52" y="96" width="408" height="320" rx="18" fill="{BOARD}" stroke="{GOLD}" stroke-width="6"/>',
            line_text(COURIER, "HALF TIME", 22, 256, 150, GOLD, tracking=12)]
    for i, ch in enumerate(letters):
        x = x0 + i * (tw + gap)
        body.append(f'<rect x="{x:.1f}" y="184" width="{tw}" height="{th}" rx="10" fill="{TILE}"/>')
        # the flip-tile split sits behind the letter so the H keeps its crossbar
        body.append(f'<rect x="{x:.1f}" y="{184 + th / 2 - 2.5:.1f}" width="{tw}" height="5" fill="{BOARD}"/>')
        m, _ = fit(ch + "-abril", tw - 40, th - 46, x + tw / 2, 184 + th / 2, CREAM); body.append(m)
        body += [f'<circle cx="{x + 7:.1f}" cy="{184 + th / 2:.1f}" r="4" fill="{GOLD}"/>', f'<circle cx="{x + tw - 7:.1f}" cy="{184 + th / 2:.1f}" r="4" fill="{GOLD}"/>']
    return svg(INK, "\n  ".join(body), "scoreboard")

def f_postmark(k):
    cx = 206
    body = [ring(cx, 256, 166, OX, 7), ring(cx, 256, 118, OX, 3),
            arc_text(COURIER, "HALFTIME", 26, cx, 256, 128, -90, OX, True, 9),
            arc_text(COURIER, "FOOTBALL", 22, cx, 256, 156, 90, OX, False, 9),
            star(cx - 142, 256, 8, OX), star(cx + 142, 256, 8, OX)]
    for i in range(5):
        y = 186 + i * 35
        body.append(f'<path d="M384,{y} q15,-13 30,0 t30,0 t30,0 t30,0" fill="none" stroke="{OX}" stroke-width="6" stroke-linecap="round"/>')
    m, _ = fit(k, 150, 104, cx, 256, OX); return svg(CREAM, "\n  ".join(body + [m]), "postmark")

def f_arch(k):
    body = [arc_text(COURIER, "HALFTIME", 38, 256, 330, 210, -90, CREAM, True, 14),
            star(92, 236, 10, CREAM), star(420, 236, 10, CREAM),
            f'<path d="M108,370 H404 M108,382 H404" stroke="{CREAM}" stroke-width="4"/>',
            line_text(COURIER, "EST. MMXXVI", 22, 256, 424, CREAM, tracking=10)]
    m, _ = fit(k, 270, 150, 256, 272, CREAM); return svg(OX, "\n  ".join(body + [m]), "arched type")

def f_varsity(k):
    body = [f'<rect x="64" y="64" width="384" height="384" rx="70" fill="{GREEN}" stroke="{GOLD}" stroke-width="14"/>',
            f'<rect x="90" y="90" width="332" height="332" rx="50" fill="none" stroke="{CREAM}" stroke-width="3" stroke-dasharray="10 8"/>']
    m, _ = fit(k, 260, 200, 256, 256, CREAM, GOLD, 16); return svg(CREAM, "\n  ".join(body + [m]), "varsity patch")

def f_trophy(k):
    o = f'fill="none" stroke="{CREAM}" stroke-width="8" stroke-linejoin="round" stroke-linecap="round"'
    body = [f'<path d="M150,104 H362 V160 Q362,282 256,296 Q150,282 150,160 Z" {o}/>', f'<path d="M136,104 H376" stroke="{CREAM}" stroke-width="12" stroke-linecap="round"/>',
            f'<path d="M150,132 C96,132 92,206 158,232 M362,132 C416,132 420,206 354,232" {o}/>',
            f'<rect x="238" y="296" width="36" height="40" {o}/>', f'<rect x="196" y="336" width="120" height="22" {o}/>',
            f'<rect x="172" y="358" width="168" height="34" fill="{CREAM}"/>', line_text(COURIER, "HALFTIME", 13, 256, 380, OX, tracking=4),
            star(256, 440, 10, CREAM), star(216, 440, 7, CREAM), star(296, 440, 7, CREAM)]
    m, _ = fit(k, 160, 100, 256, 196, CREAM); return svg(OX, "\n  ".join(body + [m]), "trophy")

def f_sunburst(k):
    rays = []
    for i in range(0, 32, 2):
        a0, a1 = math.radians(i * 11.25), math.radians((i + 1) * 11.25)
        rays.append(f"M256,256 L{256 + 420 * math.cos(a0):.1f},{256 + 420 * math.sin(a0):.1f} L{256 + 420 * math.cos(a1):.1f},{256 + 420 * math.sin(a1):.1f} Z")
    body = [f'<path d="{" ".join(rays)}" fill="{DARK_OX}"/>', f'<circle cx="256" cy="256" r="156" fill="{OX}" stroke="{CREAM}" stroke-width="10"/>',
            ring(256, 256, 141, CREAM, 3)]
    m, _ = fit(k, 200, 150, 256, 256, CREAM); return svg(OX, "\n  ".join(body + [m]), "sunburst")

def f_oval(k):
    body = [f'<ellipse cx="256" cy="256" rx="226" ry="150" fill="none" stroke="{CREAM}" stroke-width="9"/>',
            f'<ellipse cx="256" cy="256" rx="208" ry="134" fill="none" stroke="{CREAM}" stroke-width="3"/>',
            star(80, 256, 10, CREAM), star(432, 256, 10, CREAM)]
    m, _ = fit(k, 250, 160, 256, 256, CREAM); return svg(GREEN, "\n  ".join(body + [m]), "oval cameo")

def f_deco(k):
    def notched(i, r):
        a, b = 40 + i, 472 - i
        return (f"M{a + r},{a} H{b - r} A{r},{r} 0 0 0 {b},{a + r} V{b - r} A{r},{r} 0 0 0 {b - r},{b} H{a + r} A{r},{r} 0 0 0 {a},{b - r} V{a + r} A{r},{r} 0 0 0 {a + r},{a} Z")
    body = [f'<path d="{notched(0, 34)}" fill="none" stroke="{GOLD}" stroke-width="8"/>', f'<path d="{notched(18, 24)}" fill="none" stroke="{GOLD}" stroke-width="3"/>',
            line_text(COURIER, "EST. MMXXVI", 16, 256, 104, GOLD, tracking=10), line_text(COURIER, "HALFTIME", 16, 256, 424, GOLD, tracking=14)]
    kk = "HT-overlay" if k.startswith("HT") else k
    m, _ = fit(kk, 270, 220, 256, 262, CREAM, INK, 0, second=GOLD); return svg(INK, "\n  ".join(body + [m]), "art deco")

def f_stopwatch(k):
    c = (256, 290); ticks = []
    for i in range(60):
        a = math.radians(-90 + i * 6); r0 = 140 if i % 5 == 0 else 150; r1 = 162
        ticks.append(f"M{c[0] + r0 * math.cos(a):.1f},{c[1] + r0 * math.sin(a):.1f} L{c[0] + r1 * math.cos(a):.1f},{c[1] + r1 * math.sin(a):.1f}")
    body = [f'<path d="M256,140 A150,150 0 0 1 256,440 Z" fill="{LIGHT_OX}"/>',
            ring(c[0], c[1], 178, CREAM, 11), f'<path d="{" ".join(ticks)}" stroke="{CREAM}" stroke-width="3"/>',
            f'<rect x="230" y="70" width="52" height="24" rx="5" fill="{CREAM}"/>', f'<rect x="246" y="94" width="20" height="16" fill="{CREAM}"/>',
            f'<rect x="248" y="96" width="18" height="22" rx="3" fill="{CREAM}" transform="rotate(44 256 290)"/>']
    m, _ = fit(k, 190, 124, 256, 290, CREAM); return svg(OX, "\n  ".join(body + [m]), "stopwatch")

def f_split(k):
    left, _ = fit(k, 340, 230, 256, 236, CREAM); right, _ = fit(k, 340, 230, 256, 236, OX)
    body = [f'<rect width="256" height="512" fill="{OX}"/>', f'<rect x="256" width="256" height="512" fill="{CREAM}"/>',
            '<clipPath id="L"><rect width="256" height="512"/></clipPath><clipPath id="R"><rect x="256" width="256" height="512"/></clipPath>',
            f'<g clip-path="url(#L)">{left}</g>', f'<g clip-path="url(#R)">{right}</g>',
            line_text(COURIER, "HALF", 24, 128, 440, CREAM, tracking=12), line_text(COURIER, "TIME", 24, 384, 440, OX, tracking=12)]
    return svg(OX, "\n  ".join(body), "split half")

def f_stamp(k):
    body = [f'<rect x="86" y="58" width="340" height="396" fill="{CREAM}"/>']
    for x in range(86, 427, 22):
        body += [f'<circle cx="{x}" cy="58" r="8" fill="{OX}"/>', f'<circle cx="{x}" cy="454" r="8" fill="{OX}"/>']
    for y in range(58, 455, 22):
        body += [f'<circle cx="86" cy="{y}" r="8" fill="{OX}"/>', f'<circle cx="426" cy="{y}" r="8" fill="{OX}"/>']
    body += [f'<rect x="112" y="84" width="288" height="344" fill="none" stroke="{OX}" stroke-width="4"/>',
             f'<rect x="122" y="94" width="268" height="324" fill="none" stroke="{OX}" stroke-width="1.5"/>',
             line_text(COURIER, "HALFTIME", 18, 256, 128, OX, tracking=10), line_text(COURIER, "POSTAGE", 14, 256, 404, OX, tracking=8),
             line_text(ABRIL, "½", 30, 152, 402, OX), line_text(ABRIL, "½", 30, 360, 402, OX)]
    m, _ = fit(k, 220, 190, 256, 258, OX); return svg(OX, "\n  ".join(body + [m]), "postage stamp")

# The frames, with the H and HT letter style each one uses.
FRAMES = [
    ("01-plain", f_plain, "H", "HT-lig"), ("02-masthead-type", f_abril, "H-abril", "HT-abril"),
    ("03-roundel", f_roundel, "H", "HT-abril"), ("04-laurel", f_laurel, "H", "HT-lig"),
    ("05-pitch", f_pitch, "H", "HT-abril"), ("06-pennant", f_pennant, "H", "HT-abril"),
    ("07-ticket", f_ticket, "H", "HT-lig"), ("08-diamond", f_diamond, "H", "HT-overlay"),
    ("09-italic-masthead", f_masthead, "H-italic", "HT-italic"), ("10-ball", f_ball, "H", "HT-abril"),
    ("11-crest", f_crest, "H", "HT-lig"), ("12-ribbon-badge", f_ribbon, "H", "HT-abril"),
    ("13-hexagon", f_hexagon, "H", "HT-lig"), ("14-scoreboard", f_scoreboard, "H", "HT"),
    ("15-postmark", f_postmark, "H", "HT-lig"), ("16-arched-type", f_arch, "H-abril", "HT-abril"),
    ("17-varsity-patch", f_varsity, "H-abril", "HT-abril"), ("18-trophy", f_trophy, "H", "HT-lig"),
    ("19-sunburst", f_sunburst, "H", "HT-abril"), ("20-oval-cameo", f_oval, "H", "HT-lig"),
    ("21-art-deco", f_deco, "H", "HT"), ("22-stopwatch", f_stopwatch, "H", "HT-abril"),
    ("23-split-half", f_split, "H-abril", "HT-abril"), ("24-postage-stamp", f_stamp, "H", "HT-lig"),
]

if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    for f in os.listdir(OUT):
        if f.endswith(".svg") or f.endswith(".png"): os.remove(OUT + f)
    for name, frame, hk, htk in FRAMES:
        open(f"{OUT}{name}-H.svg", "w").write(frame(hk))
        open(f"{OUT}{name}-HT.svg", "w").write(frame(htk))
    print(len(FRAMES) * 2, "logos written to", OUT)
