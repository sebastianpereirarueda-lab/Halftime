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
| `public/studio/` | The owner's private Studio: encrypted Instagram posts. |
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
4. **Illustrations.** Each story gets a picture drawn by OpenAI's image model in the
   style of a 1960s newspaper: halftone, sepia ink, no text. They are illustrations, never
   photographs, and the page says so under each one. They are deliberately generic (a
   terrace, a goalkeeper, a touchline) and never show a real person, badge or flag: a
   made-up picture that looked like a real photo would be a fabrication. Photos from the
   news outlets are not used because they are copyrighted. A picture is drawn once per
   story and reused while the story stays up; old ones are deleted.
5. The generated files are committed to `main` and the site is republished.

### Switching it on: two secrets

The pipeline needs two keys, stored as GitHub secrets. Secrets are never shown on the
site or in the code.

1. **API-Football key.** Sign up at dashboard.api-football.com (free plan), then copy the
   key from the dashboard.
2. **OpenAI API key.** Sign in at platform.openai.com, open **API keys**, and create one.
   The news writer costs a few cents per edition at four editions a day. The default model
   is `gpt-5.5`; to use another, add a repository **variable** (not a secret) named
   `OPENAI_MODEL` on the same settings page, under the **Variables** tab. The pictures use
   `gpt-image-2` by default (variable `OPENAI_IMAGE_MODEL` to change it); set the variable
   `NEWS_IMAGES` to `lead` to draw only the lead story's picture and save on cost.
3. On github.com open this repository, click **Settings**, then **Secrets and variables**,
   then **Actions**, then **New repository secret**. Add one named `API_FOOTBALL_KEY` and one
   named `OPENAI_API_KEY`, pasting the matching key as the value.
4. To run it straight away instead of waiting for the schedule: click **Actions**, choose
   **Update data** in the left list, click **Run workflow**, tick **probe** the first time,
   and click the green **Run workflow** button. The probe prints one raw match from the
   provider so the field names can be checked against the code.

Until the secrets exist, each step says so in its log and skips. The site keeps working
with the hand-written archive and the printed placeholders.

## Instagram posts (the owner's Studio)

Every time a new edition is written, the pipeline also makes ready-to-post Instagram
content and puts it in a private page only you can open:

- one 1080 x 1350 card per story (the illustration, the headline, the summary, the
  masthead), with a caption that credits the outlets and says the picture is AI-made;
- one "Latest Results" scoreboard card with its caption.

**Where:** https://sebastianpereirarueda-lab.github.io/Halftime/studio/ . Nothing on the
site links to it and it asks search engines not to list it. Bookmark it on your phone.

**Why it needs a passphrase, and why that is safe.** The site and its code are public, so a
hidden page alone would not be private: anyone who found the address could read it. Instead
every post is **encrypted** before it is saved. Visitors can see that scrambled files exist,
but without your passphrase they are unreadable. The passphrase itself is never stored on
the site; it lives only as a GitHub secret and in your head (or your phone's password
manager).

**Switching it on (once):**

1. Choose a passphrase. Any length works, but longer is much harder to guess, since the
   scrambled files are public: four or five unrelated words are a good choice. Do not reuse
   a password from elsewhere.
2. On github.com open this repository, then **Settings**, **Secrets and variables**,
   **Actions**, **New repository secret**. Name it `OWNER_PASSPHRASE` and paste the passphrase.
3. The next run makes the first posts. Open the Studio, type the passphrase, tap **Unlock**.
   Your iPhone will offer to save it in your passwords.

**Posting from your iPhone:** tap **Copy caption**, then **Save or share**. Choose
**Instagram** in the share sheet (or **Save Image**, then post from Instagram), and paste the
caption. When Instagram asks, mark the post as containing AI-generated imagery; the story
cards use AI illustrations.

**Good to know:** the Studio keeps the 40 most recent posts. If you change the passphrase,
the next run starts a fresh, empty Studio, because the old posts were locked with the old one.
Captions follow the same rule as the news: only facts from the reports, sources credited.

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

The catalogue holds one shirt for each team in every final of four competitions, with a
match card for each final (and for each leg or replay where there was one):

- the FIFA World Cup, 1930 to 2026;
- the European Championship, 1960 to 2024;
- the European Cup and UEFA Champions League, 1956 to 2026;
- the Copa América, every edition decided by a final match, 1975 to 2024.

For the World Cup and the last two Euros the match facts (teams, dates, venues, scores,
scorers) come from the openfootball project, which publishes them as public domain. For
the other finals they come from each final's Wikipedia article (CC BY-SA 4.0), which every
match card cites. `docs/KIT-DATA-SOURCES.md` explains what else was looked at and why it
could not be used.

The colour of each shirt comes from the Wikipedia article about that final, which records
the kit both teams wore that day (free to reuse with credit, CC BY-SA 4.0). Each shirt's
page links to the exact article revision it was taken from.

Each shirt also has a **drawing** of the full kit, built the same way Wikipedia draws
kits: a block of colour for each sleeve, the body, the shorts and the socks, with the small
pattern pictures from Wikimedia Commons laid over it (collars, stripes, badges, sashes),
then the outline on top. Those pictures
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
