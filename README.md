# Halftime

*Football news, stats and shirts, served at the interval.*

A vintage-look football site: news, scores, match cards and a catalogue of classic kits,
styled like an old newspaper or match programme.

## What is in this folder

| Folder or file | What it is |
| --- | --- |
| `public/` | The website itself. Everything in here is what gets published. |
| `public/index.html` | The Front Page. Open this one to see the site. |
| `public/kits/` | The Kit Room: the shirt catalogue with search and filters, plus one page per shirt. |
| `public/matches/` | Match cards: the list of matches, plus one card per match, minute by minute. |
| `public/data/kits.js` | **The list of shirts.** Edit this to add or change a kit. |
| `public/assets/kits/` | One drawing per shirt, made by the importer from Wikipedia's kit pictures. |
| `public/data/matches.js` | **The list of matches.** Edit this to add or change a match card. |
| `public/assets/css/halftime.css` | All the colours, fonts and layout, in one file. |
| `public/assets/fonts/` | The three typefaces, stored locally so the site works offline. |
| `public/assets/js/dateline.js` | Tiny script that writes today's date at the top of the page. |
| `public/404.html` | The "page not found" page Cloudflare shows for a wrong address. |
| `tools/import-kits.js` | A small script that fills the two lists from free tournament data and Wikipedia. See below. |
| `tools/png.js`, `tools/kit-art.js`, `tools/base/` | Helpers for the script above: read and write the small kit pictures, and draw a shirt from them. |
| `docs/HANDOFF.md` | The project brief: design system, plan and open decisions. |
| `docs/KIT-DATA-SOURCES.md` | Research note: which kit databases exist, which may be used, and what fills the Kit Room today. |
| `docs/design-reference/` | The original design mock-ups. Reference only, not part of the site. |

There is no build step and nothing to install. The site is plain HTML and CSS.

## How to look at the site on Windows 11

1. Open GitHub in your browser and go to this repository.
2. Click the green **Code** button, then **Download ZIP**.
3. In **File Explorer**, open your **Downloads** folder, right-click the ZIP file
   and choose **Extract All…**, then **Extract**.
4. Open the extracted folder, then the **public** folder, and double-click **index.html**.
   It opens in your normal browser (Edge or Chrome). That is the Front Page.
5. To check the phone view, press **F12** in the browser, then press
   **Ctrl + Shift + M**. Pick an iPhone from the dropdown at the top.

The fonts download from Google Fonts, so the page looks right only while you are online.
Offline it falls back to Georgia and Courier New.

## The live site

The site is published with **GitHub Pages** at:

**https://sebastianpereirarueda-lab.github.io/Halftime/**

How it works: the `main` branch holds the source. Every time `main` changes,
a small robot (`.github/workflows/publish.yml`) copies the `public` folder to a
branch called `gh-pages`, and GitHub serves that branch as the website.
It takes about a minute. You never need to touch `gh-pages` yourself.

### Moving to Cloudflare Pages later (optional)

1. Sign in at dash.cloudflare.com and go to **Workers & Pages**, then **Create**, then **Pages**.
2. Choose **Connect to Git** and pick this repository.
3. Set **Production branch** to `main`, leave **Build command** empty, and set
   **Build output directory** to `public`.
4. Click **Save and Deploy**. Cloudflare then publishes every change to `main` on its own.

## Editing text

All the words on the Front Page live in `public/index.html`. Anything in **[square brackets]**
is placeholder text waiting for real content. Open the file in Notepad, change the
words between the tags, save, and refresh the browser.

Colours and fonts live at the top of `public/assets/css/halftime.css` under `:root`.

## Adding a shirt or a match

The shirts and matches are not typed into the pages. They live in two lists:

- `public/data/kits.js` holds one entry per shirt.
- `public/data/matches.js` holds one entry per match.

To add a shirt, open `kits.js` in Notepad, copy one existing entry from its opening `{`
to its closing `},`, paste it at the end of the list, and change the words. The comment at
the top of the file explains every field. Save, refresh the browser, and the new card appears
in the Kit Room with the next catalogue number. Every shirt gets its own page automatically,
at `kits/kit.html?id=` followed by its `id`.

Matches work the same way in `matches.js`. A match card appears in the Match Cards list and
gets its own page at `matches/match.html?id=` followed by its `id`. To link a shirt to a match,
put the match's `id` in the shirt's `matches` list and the shirt's `id` in the match's `kit` field.

## Where the shirts came from

The catalogue holds one shirt for each team in every World Cup final from 1930 to 2026, and
the Euro 2020 and 2024 finals, with a match card for each final. That data (teams, dates,
venues, scores, scorers) comes from the openfootball project, which publishes it as public
domain. `docs/KIT-DATA-SOURCES.md` explains what else was looked at and why it could not be
used.

The colour of each shirt comes from the Wikipedia article about that final, which records
the kit both teams wore that day (free to reuse with credit, CC BY-SA 4.0). Each shirt's
page links to the exact article revision it was taken from.

Each shirt also has a **drawing**, built the same way Wikipedia draws kits: a block of
colour for each sleeve and the body, with the small pattern pictures from Wikimedia Commons
laid over it (collars, stripes, badges, sashes), then the outline on top. Those pictures
are drawn by Wikipedia's volunteers and published under free licences (CC BY-SA, CC BY,
CC0 or public domain) that ask for credit. The credit for every picture used appears
under the drawing on the shirt's page, and the drawings themselves are shared under the
same terms. Manufacturer, debut and design notes show "To be researched" until someone
fills them in.

### Running the importer again (optional)

You do not need to run anything: the generated shirts are already in the two data files.
If a new tournament is added to the openfootball data and you want it in the Kit Room:

1. Install Node.js from https://nodejs.org (the LTS version, with the default options).
2. In File Explorer, open the project folder, click in the address bar, type `cmd` and press Enter.
3. Type `node tools\import-kits.js` and press Enter.

It adds what is new and keeps every existing entry. The one thing it refreshes is a
shirt's colours from Wikipedia; to keep colours you typed yourself, add
`coloursSource: "hand"` to that shirt, and `illustration: "hand"` to keep a drawing of
your own. A team it does not know stops the script with a
message asking for the team's colours to be added to the table at the top of the script.
Wikipedia limits how fast it answers, so a full run can take a few minutes.

Two rules that matter:

- Keep the commas and quotes exactly as in the other entries. One missing comma stops the
  whole list from loading, and the page shows nothing. If that happens, undo the last edit.
- Do not write a fact you have not checked. Leave a research field as `null` and the page
  prints "To be researched" instead.
