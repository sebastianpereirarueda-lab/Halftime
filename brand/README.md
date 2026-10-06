# Halftime logo

Three versions of the square "H" mark (see `logo-options.png` for all three side by side):

- **Plain** (`halftime-logo*`): the website's browser-tab icon. Best at tiny sizes.
- **Ball** (`halftime-logo-ball*`): the H in front of an old 18-panel laced leather ball.
- **Crest** (`halftime-logo-crest*`): the H inside a double-lined shield with three stars.

Each comes as an SVG master, a 1024 PNG, a 512 PNG and a 1080 profile-picture PNG.

| File | Use it for |
| --- | --- |
| `halftime-logo.svg` | Master file. Scales to any size without blurring; give this to designers or printers. |
| `halftime-logo-1024.png` | General use: documents, presentations, sharing. |
| `halftime-logo-instagram-1080.png` | Instagram (or other) profile picture. The H stays clear when the app crops it to a circle. |
| `halftime-logo-512.png` | Smaller general use. |
| `halftime-logo-180.png` | iPhone home-screen icon size. |
| `halftime-logo-32.png` | Browser-tab size. |
| `halftime-logo.zip` | All of the above in one download. |

Colours: oxblood `#8C2A1F` background, cream `#F7F1E1` letter.
Letter: Libre Caslon Text Bold (SIL Open Font License), converted to a shape so the file
looks the same on every device without needing the font installed.

## All the options (`variations/`)

24 designs, each in two versions: `NN-name-H` (the H) and `NN-name-HT` (the HT monogram).
Every logo has an SVG master and a 1024 x 1024 PNG. `variations/sheet-1.png` to `sheet-3.png`
show them side by side, including circle-cropped and tiny sizes.

| No. | Design | Colours |
| --- | --- | --- |
| 01 | Plain | cream on oxblood |
| 02 | Masthead type, double border | oxblood on cream |
| 03 | Roundel stamp: HALFTIME · EST. MMXXVI | cream on oxblood |
| 04 | Laurel wreath with a star | cream on oxblood |
| 05 | Pitch from above, letters on the centre circle | gold and cream on pitch green |
| 06 | Felt pennant, stitched border, stars | cream on oxblood |
| 07 | Match ticket: ADMIT ONE, No. 001 | oxblood on a cream ticket |
| 08 | Diamond, double line (HT as a gold-and-cream monogram) | gold and cream on ink |
| 09 | Italic between newspaper double rules | oxblood on cream |
| 10 | Vintage laced ball | cream on oxblood |
| 11 | Crest with three stars | cream on oxblood |
| 12 | Circle badge with a HALFTIME ribbon | cream on oxblood |
| 13 | Hexagon, double line | gold and cream on pitch green |
| 14 | Scoreboard flip tiles: HALF TIME | cream and gold on ink |
| 15 | Postmark with cancellation waves | oxblood on cream |
| 16 | Arched HALFTIME over the letters, EST. MMXXVI below | cream on oxblood |
| 17 | Varsity chenille patch, two-tone letters | cream, gold, green |
| 18 | Trophy with HALFTIME plaque | cream on oxblood |
| 19 | Sunburst poster with medallion | cream on oxblood |
| 20 | Oval cameo | cream on pitch green |
| 21 | Art-deco frame (HT as a gold-and-cream monogram) | gold and cream on ink |
| 22 | Stopwatch, half the dial filled | cream on oxblood |
| 23 | Split half: HALF / TIME | oxblood and cream |
| 24 | Postage stamp, ½ POSTAGE | oxblood on cream |

To change or add designs, edit `make-variations.py` and run `python3 brand/make-variations.py`
(needs `pip install fonttools brotli`).

## Football-first set (`football/`)

A second direction, made after the first set read as too collegiate (crimson, serif H, shields,
laurels, Roman numerals). This one takes its look from the game itself: objects from the ground,
sporty period lettering, and football colours (pitch green, navy, mustard, tangerine, leather
brown) with no crimson. 20 designs, each as `NN-name-H` and `NN-name-HT` (HT is also how a
scoreboard marks half-time). SVG and 1024 PNG for all 40; `football/sheet-1.png` and
`sheet-2.png` show them side by side.

| No. | Design | Lettering |
| --- | --- | --- |
| 01 | Half-time orange slices | Alfa Slab One |
| 02 | TV score graphic: HT 45:00 | Bebas Neue |
| 03 | Vintage shirt with the letters as the number | Alfa Slab One |
| 04 | Knitted bar scarf | Bebas Neue |
| 05 | Supporter's rosette | Bowlby One SC |
| 06 | Referee's whistle | Alfa Slab One |
| 07 | Enamel "Football Ground" sign | Anton |
| 08 | Wood-type match poster | Rye |
| 09 | 70s stripes | Shrikhand |
| 10 | Terrace block stencil | Saira Stencil One |
| 11 | Match programme cover, 6d | Anton |
| 12 | Leather laced ball | Alfa Slab One |
| 13 | Goal and net | Alfa Slab One |
| 14 | Corner flag | Alfa Slab One |
| 15 | Blackletter roundel | UnifrakturCook |
| 16 | Script signature | Yellowtail |
| 17 | Floodlights | Anton |
| 18 | Chequered roundel | Bowlby One SC |
| 19 | Hoops | Alfa Slab One |
| 20 | Tactics board | Bebas Neue |

The typefaces are free and open-licensed (SIL Open Font License, Yellowtail under Apache 2.0);
copies and their licences are in `fonts/`. In the logo files the letters are shapes, so the
fonts are not needed to use them. Regenerate with `python3 brand/make-football-set.py`.

## Shortlist: Hoops and Tactics Board (`picks/`)

The two favourites from the football set, with elegant vintage lettering in place of the sports
type. Four typefaces, each in H and HT for both designs: 16 logos, SVG and 1024 PNG.
`picks/sheet.png` shows them all.

| Letter | Typeface | Files |
| --- | --- | --- |
| A | Abril Fatface (the site's masthead) | `*-abril-H`, `*-abril-HT` |
| B | Playfair Display Black | `*-playfair-H`, `*-playfair-HT` |
| C | DM Serif Display | `*-dmserif-H`, `*-dmserif-HT` |
| D | Libre Caslon Bold | `*-caslon-H`, `*-caslon-HT` |

Regenerate with `python3 brand/make-picks.py`.
