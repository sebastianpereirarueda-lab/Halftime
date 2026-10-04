# Halftime — project handoff for Claude Code

## About the owner
Sebas has no software development experience. He works on Windows 11. Explain every setup step from scratch in plain language, give Windows instructions (File Explorer, Command Prompt), and avoid jargon. He is direct, results-oriented, wants high visual quality, and expects errors to be caught proactively, not after he points them out. Do not state any score, stat, date or fact you have not verified.

## What we are building
**Halftime** — a vintage-look soccer platform for news, scores, stats and jersey (kit) discovery. Tagline: "Football news, stats and shirts, served at the interval". Tone: classic newspaper / old match programme. Elegant, simple, warm.

## Three screens (design done, in `design-reference/`)
1. **Front Page** (`FrontPage.html`): masthead, nav (News, Scores, Stats, Jerseys, Archive), lead story, "Latest Results" box, "From the Archive" teaser, three secondary stories, "The Kit Room" call to action.
2. **Kit Room** (`KitRoom.html`): jersey discovery. Search box, decade filters (All, 1950s to 1980s), Nations/Clubs filters, grid of catalogue cards numbered No. 001, 002… each with a shirt illustration, team, year and a "View kit details" link.
3. **Match Card** (`MatchCard.html`): stats view using the 1970 World Cup final as the example (Brazil 4–1 Italy, 21 June 1970, Estadio Azteca, Mexico City). Goals: Pelé 18′, Boninsegna 37′, Gérson 66′, Jairzinho 71′, Carlos Alberto 86′. Minute-by-minute timeline, scorers table, "Kits Worn" link to the Kit Room, and a Full Stats placeholder.

Four optional front-page variations are also in the folder (green masthead band, dark "Evening Edition", pink paper, blackletter broadsheet). The original FrontPage is the chosen direction; treat the variations as options for later.

**Important:** these HTML files were made in a design canvas tool and are *reference*, not deployable. Read them for layout, spacing and styles, then rebuild cleanly. Anything in [brackets] is placeholder content.

## Design system
- Paper `#F7F1E1` (lightened at Sebas's request), panels `#FCF9EF`, placeholder stripes `#EBE2C8`
- Ink `#1B1A17`, oxblood accent `#8C2A1F`, pitch green `#1F4D3A`, gold `#E3C16F`
- Fonts (Google Fonts): **Abril Fatface** (masthead, big headings, scores), **Libre Caslon Text** (headlines, body), **Courier Prime** (nav, labels, stats, typewriter feel)
- Details that make it feel vintage: double rules (`4px double`), dotted dividers, double-border boxes, all-caps tracked Courier labels, striped photo placeholders captioned "PHOTOGRAPH — …"
- Masthead scales with the screen (`clamp()`), and everything must work well on a phone. Sebas reviews on iPhone: no overlapping text, tap targets at least 44px.
- Shirt illustrations are simple flat SVGs (see KitRoom.html).

## Suggested first phase
- Static site, no database yet. Deploy on **Cloudflare Pages** (Sebas already deployed another project that way).
- Keep tooling minimal. Plain HTML/CSS/JS, or a simple static generator only if it makes per-kit and per-match pages easier.
- Kits and archive matches live in simple data files (JSON) that Sebas can edit. One page per kit and per match.
- Make the Kit Room search and filters actually work.
- Later: live scores and news from a data source, then optional accounts or a "my collection" feature.

## Open decisions (ask Sebas, do not guess)
- **Data source** for scores and stats: needs to be chosen after checking prices and usage rules.
- **Jersey images:** most shirt photos are copyrighted. Use illustrations, Sebas's own photos or properly licensed images. Verify before using any image.
- **Domain and social handles:** "Halftime" is a common word; availability is not checked.
- **News content:** who writes it, and where it comes from.

## First task for Claude Code
1. Read this file and everything in `design-reference/`.
2. Explain the plan back in plain language in a few sentences.
3. Set up the project folder and build the Front Page to match FrontPage.html as closely as possible.
4. Run it locally and show Sebas how to view it, step by step.


## Data providers — researched options (Oct 2026)

Three separate data needs for this project, each with a different answer. Do not pick one without confirming current pricing and terms with Sebas first; prices and tiers change.

### 1. Scores, fixtures and match stats (powers the Front Page results box and the Match Card)
- **football-data.org** — genuinely free tier for top competitions (e.g. Premier League, Champions League): fixtures, scores, tables, lineups. No deep history or lower leagues on the free plan. Best starting point to get real data flowing with zero cost.
- **API-Football** (via RapidAPI) — free tier around 100 requests/day, 1,200+ leagues and cups, live scores, lineups, odds, free embeddable widgets. Paid tiers raise the request limit and historical depth. Good middle option once the free tier is outgrown.
- **Sportmonks** — the most complete: match events, lineups, player and team stats, standings, xG. Paid from the start; a "Growth" tier around €99/month is the one the vendor positions for fantasy-style use cases. This is the one to reach for only once the fantasy league is actually being built.
- **Recommendation**: start on a free tier (football-data.org or API-Football) for the Front Page and Match Card. Move to a paid Sportmonks plan later, specifically when building the fantasy league, not before.

### 2. Jersey historical facts (manufacturer, debut match, era, notable goals, design story)
- No API provides this. It is not sports-data, it is editorial research.
- Build it manually, shirt by shirt, sourced from club archives, kit-history sites and books. Store it as a data file (e.g. one JSON record per kit) that Sebas can add to over time.
- This is the slowest piece to fill in and the one most worth doing carefully, since it's Halftime's differentiator — do not rush or fabricate facts here; leave fields blank/TBD rather than guessing.

### 3. Fantasy league
- A separate, much larger system: real-time or weekly player-level stats, user accounts, drafting, scoring rules, standings.
- Needs a provider with real player stats (Sportmonks is the clearest fit here).
- Treat this as phase two or three — after news, kits and match cards are working — not part of the initial build.

### Suggested sequencing
1. Phase 1 (now): static site, Front Page / Kit Room / Match Card, free-tier score data, manually curated kit facts.
2. Phase 2: paid data tier if coverage/history needs grow, more kits and match cards filled in.
3. Phase 3: fantasy league, built on a provider with player-level stats, once the core site is solid.
