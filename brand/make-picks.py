# Hoops and Tactics Board, with elegant vintage lettering, in H and HT.
# Run from the project folder:  python3 brand/make-picks.py
import importlib.util, os
spec = importlib.util.spec_from_file_location("fb", "brand/make-football-set.py"); fb = importlib.util.module_from_spec(spec); spec.loader.exec_module(fb)
from fontTools.ttLib import TTFont

OUT = "brand/picks/"
TYPEFACES = [
    ("abril", "Abril Fatface", fb.Font("public/assets/fonts/AbrilFatface-400.woff2"), -0.02),
    ("playfair", "Playfair Display Black", fb.Font("brand/fonts/PlayfairDisplay-Black.ttf"), -0.01),
    ("dmserif", "DM Serif Display", fb.Font("brand/fonts/DMSerifDisplay-Regular.ttf"), -0.01),
    ("caslon", "Libre Caslon Bold", fb.Font("public/assets/fonts/LibreCaslonText-700.woff2"), -0.03),
]

def hoops(t, font, tracking):
    body = [f'<rect x="0" y="{y}" width="512" height="44" fill="{fb.PITCH}"/>' for y in range(0, 512, 88)]
    body += [f'<circle cx="256" cy="256" r="160" fill="{fb.PITCH}" stroke="{fb.CHALK}" stroke-width="12"/>',
             f'<circle cx="256" cy="256" r="142" fill="none" stroke="{fb.CHALK}" stroke-width="3"/>']
    m, _ = fb.letters(t, font, 200 if t == "HT" else 170, 150, 256, 258, fb.CHALK, tracking); body.append(m)
    return fb.svg(fb.CHALK, "\n  ".join(body), "hoops")

def tactics(t, font, tracking):
    src = fb.d_tactics(t)
    board = src[src.index("<rect x=\"18\""): src.rindex("<path d=\"M", 0, src.rindex("</svg>"))]
    # the letters get a gap in the board colour so the chalk marks never touch them
    m, _ = fb.letters(t, font, 250 if t == "HT" else 190, 170, 256, 258, fb.CHALK, tracking,
                      attrs=f'stroke="{fb.BOARD}" stroke-width="18" stroke-linejoin="round" paint-order="stroke"')
    return fb.svg(fb.BOARD, board.strip() + "\n  " + m, "tactics board")

if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    for f in os.listdir(OUT):
        if f.endswith((".svg", ".png")): os.remove(OUT + f)
    n = 0
    for key, _, font, tr in TYPEFACES:
        for design, make in (("hoops", hoops), ("tactics", tactics)):
            for t in ("H", "HT"):
                open(f"{OUT}{design}-{key}-{t}.svg", "w").write(make(t, font, tr)); n += 1
    print(n, "logos written to", OUT)
