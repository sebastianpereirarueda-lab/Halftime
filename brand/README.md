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

## More variations (`variations/`)

`variations/all-variations.png` shows them all side by side, including tiny and circle-cropped sizes.
Each design has an SVG master and a 1024 x 1024 PNG.

| No. | Design | Colours |
| --- | --- | --- |
| H1 | Roundel: double ring, "HALFTIME" and "EST. MMXXVI" around the H | cream on oxblood |
| H2 | Laurel wreath with a star | cream on oxblood |
| H3 | Pitch from above, H on the centre circle | gold and cream on pitch green |
| H4 | Felt pennant with stitched border and stars | cream on oxblood |
| H5 | Match ticket: "ADMIT ONE", "No. 001" | oxblood on a cream ticket |
| H6 | Diamond with double line and stars | gold and cream on ink |
| HT1 | HT side by side in the masthead typeface (Abril Fatface) | cream on oxblood |
| HT2 | HT ligature: the T grows out of the H | cream on oxblood |
| HT3 | Monogram: slim gold italic T across the bold H | cream and gold on ink |
| HT4 | Italic HT between newspaper double rules | oxblood on cream |
| HT5 | Roundel with HT | cream and gold on pitch green |
| HT6 | HT on the vintage ball | cream on oxblood |
| HT7 | HT in the crest | cream on oxblood |

To change or add designs, edit `make-variations.py` and run `python3 brand/make-variations.py`
(needs `pip install fonttools brotli`).
