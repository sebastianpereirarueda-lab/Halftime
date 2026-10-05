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
| `scripts/` | The data pipeline: fetches scores and lineups, collects headlines, writes the news. |
| `scripts/config.mjs` | Which competitions and news feeds the pipeline follows. Edit to change them. |
| `.github/workflows/update-data.yml` | The schedule that runs the pipeline four times a day. |
| `tools/import-kits.js` | A small script that fills the two lists from free tournament data and Wikipedia. See below. |
| `tools/png.js`, `tools/kit-art.js`, `tools/base/` | Helpers for the script above: read and write the small kit pictures, and draw a shirt from them. |
| `docs/HANDOFF.md` | The project brief: design system, plan and open decisions. |
| `docs/KIT-DATA-SOURCES.md` | Research note: which kit databases exist, which may be used, and what fills the Kit Room today. |
| `docs/design-reference/` | The original design mock-ups. Reference only, not part of the site. |

The site itself is plain HTML, CSS and JavaScript with no build step. The data pipeline
is a few small Node scripts that GitHub runs on a schedule; you do not run them yourself.

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

## Live scores, lineups and AI-written news

Four times a day GitHub runs the pipeline in `scripts/`:

1. **Scores and lineups** come from API-Football. The script asks for one day of fixtures at
   a time, keeps the competitions listed in `scripts/config.mjs`, then fetches the goals and
   lineups of each finished match, and writes `public/data/results.js`. Finished matches
   stay on the site for a week.

   What the **free plan** really gives (checked by running it, October 2026): fixtures for
   yesterday, today and tomorrow only, 100 requests a day, 10 a minute. Goals and lineups
   cost two requests per match and are fetched once, then cached. A run uses 3 requests for
   the fixtures plus 2 per new finished match, capped at 24. A paid plan widens the day
   window and the request allowance; nothing in the code needs to change for that.
2. **Headlines** are collected from the public RSS feeds of established football desks
   (BBC Sport, The Guardian, Sky Sports, The Independent). No key needed. ESPN was tried and
   left out because its feed answers with a bot-check page.
3. **The news edition** is written by an OpenAI model from those headlines and saved to
   `public/data/news.js`. If the headlines have not changed since the last edition, nothing
   is rewritten and nothing is spent. The writer may only use facts from the collected articles, must
   cite its sources on every story, and summarises in its own words. Every story on the
   Front Page links to the reports it came from. If an edition cannot be written, the
   previous one stays.
4. The generated files are committed to `main` and the site is republished.

### Switching it on: two secrets

The pipeline needs two keys, stored as GitHub secrets. Secrets are never shown on the
site or in the code.

1. **API-Football key.** Sign up at dashboard.api-football.com (free plan), then copy the
   key from the dashboard.
2. **OpenAI API key.** Sign in at platform.openai.com, open **API keys**, and create one.
   The news writer costs a few cents per edition at four editions a day. The default model
   is `gpt-5.5`; to use another, add a repository **variable** (not a secret) named
   `OPENAI_MODEL` on the same settings page, under the **Variables** tab.
3. On github.com open this repository, click **Settings**, then **Secrets and variables**,
   then **Actions**, then **New repository secret**. Add one named `API_FOOTBALL_KEY` and one
   named `OPENAI_API_KEY`, pasting the matching key as the value.
4. To run it straight away instead of waiting for the schedule: click **Actions**, choose
   **Update data** in the left list, click **Run workflow**, tick **probe** the first time,
   and click the green **Run workflow** button. The probe prints one raw match from the
   provider so the field names can be checked against the code.

Until the secrets exist, each step says so in its log and skips. The site keeps working
with the hand-written archive and the printed placeholders.

### Checking it locally

```
npm install
npm test
```

`npm test` runs the pipeline against sample data with made-up team names, so nothing it
produces can be mistaken for real results. The sample output never reaches the site.

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
