# Halftime: research tasks for Perplexity

Everything here can be done by Perplexity (or any research AI) instead of Claude. Each task is a
ready-to-paste prompt that asks for the answer **in the exact format this project uses**, so
plugging the results in afterwards takes Claude very little work.

## How to use this

1. Start a new Perplexity thread and paste the **Project brief** below first.
2. Paste one task prompt. Use Pro / Research mode for anything marked ★ (deeper research).
3. Read the answer. If a fact has no source link, ask: "Give a source link for each fact, or mark it unknown."
4. Save the answer as a text file with the name shown under the task (for example `A1-kits-batch-01.md`).
5. Put the files in the **research** folder of the GitHub repository: on github.com open the
   repository, open the `research` folder, click **Add file → Upload files**, drop the files in,
   click **Commit changes**.
6. Tell Claude: "plug in research/A1-kits-batch-01.md" (or several at once). Claude checks the
   format and the sources and adds them to the site.

Tip: batch your requests to Claude. "Plug in everything new in research/" in one message costs
far less than one message per file.

---

## Project brief (paste this first in every new thread)

```
I run Halftime (https://sebastianpereirarueda-lab.github.io/Halftime/), a football website with the
look of a vintage newspaper / old match programme. Code: https://github.com/sebastianpereirarueda-lab/Halftime
Sections: AI-summarised football news (from BBC Sport, The Guardian, Sky Sports, The Independent,
always crediting sources), live scores and lineups (API-Football free plan), "match cards" for
historic finals (World Cup, European Cup/Champions League, Euros, Copa América), and the Kit Room,
a catalogue of historic football shirts. It is a static site on GitHub Pages; data lives in
JavaScript/JSON files and is updated 4 times a day by GitHub Actions. There is also a private
owner-only Instagram content studio.

Rules for everything you give me:
- Every fact needs a source link. Prefer primary or official sources (FIFA, UEFA, CONMEBOL, club
  and federation sites, RSSSF, contemporary newspapers, official kit makers). Wikipedia is fine,
  but give the article link.
- If you cannot verify something, write null / "unknown". Never guess or fill gaps.
- Flag it when sources disagree, and give both.
- No invented quotes, numbers or dates.
- Write descriptions in your own words, never copied text.
- Output exactly in the format I ask for, so I can paste it straight into my files.
```

---

## A. Kit Room research (the site's differentiator)

**A1 ★ Kit facts, in batches of 10 shirts** (repeat with the next 10 IDs from the appendix each time)
```
For each shirt ID below, research the shirt worn by that team in that year's final (the ID is
team-year; the competition is the one that team played a final in that year). Return ONLY a JSON
array, one object per ID, in this exact shape:
{
  "id": "brazil-1970",
  "manufacturer": { "value": "Athleta", "source": "https://..." } or null,
  "debut": { "value": "first worn ... (match, date)", "source": "https://..." } or null,
  "story": { "value": "2-3 sentences in your own words about the shirt's design or history",
             "sources": ["https://...", "https://..."] } or null,
  "worn_in_final": { "colours": "yellow shirt, green collar and cuffs", "home_or_change": "home",
                     "source": "https://..." } or null,
  "notes": "anything uncertain or conflicting, otherwise empty"
}
IDs: [paste 10 IDs from the appendix]
```
Save as: `A1-kits-batch-01.md`, `A1-kits-batch-02.md`, ...

**A2 ★ Iconic club shirts to add, by decade**
```
List 15 iconic club football shirts per decade from the 1950s to the 2020s (120 total) that are
NOT in this list: [paste the kit IDs from the appendix]. Favour shirts famous among collectors
(design, a historic season, a famous match). Return a JSON array:
{ "id": "team-year", "team": "...", "year": 1985, "kind": "club", "season": "1985-86",
  "competition": "the season or match it is known for", "why_iconic": "one sentence",
  "manufacturer": "..." or null, "sponsor": "..." or null,
  "colours": "plain-language description", "sources": ["https://..."] }
```
Save as: `A2-club-shirts-to-add.md`

**A3 National team shirts to add.** Same as A2 but national teams: 60 famous shirts not in the list (World Cups, Euros, Copa América, Africa Cup of Nations, Asian Cup, Gold Cup). Save as `A3-national-shirts-to-add.md`.

**A4 ★ Kit manufacturer timeline**
```
Build a timeline of football kit manufacturers (Umbro, Adidas, Puma, Le Coq Sportif, Admiral,
Hummel, Kappa, Diadora, Lotto, Nike, Errea, Erima, Patrick, Bukta, Score Draw, Athleta and any
other important ones): founding year, first football kit deal, famous teams and eras, signature
design features. Return a markdown table plus a JSON array
{ "maker": "...", "founded": 1924, "country": "...", "first_football_deal": "...",
  "famous_for": "...", "signature_details": "...", "sources": [...] }
```
Save as: `A4-manufacturers.md`

**A5 Shirt sponsorship history.** First shirt sponsors in England, Germany, Italy, Spain, France; famous and odd sponsors by decade; rules that changed (e.g. TV bans). Markdown with sources. Save as `A5-sponsors.md`.

**A6 ★ 20 kit stories for feature articles.** Twenty well-documented stories behind famous shirts (why a colour changed, a kit clash, a banned design, a lucky shirt, a one-match-only shirt). For each: title, 150-word summary in your own words, 2+ sources. Save as `A6-kit-stories.md`.

**A7 Kit design glossary.** 60 terms (grandad collar, pinstripes, sash, halves, quarters, bar, chevron, wrap-over V-neck, bias stripes, cuff trim, numbering styles, sponsor placement, technical fabrics by era...) with one-sentence definitions and the era each was popular. JSON `{ "term": "...", "definition": "...", "era": "...", "example": "team-year" }`. Save as `A7-kit-glossary.md`.

**A8 ★ Where to get shirt images legally.** Which sources offer football kit photos or illustrations that may be used on a website: Wikimedia Commons (which licences, how to credit), museum and club archives, the National Football Museum, Getty/Alamy/PA licensing costs for small publishers, collectors who license photos, public-domain photos (pre-1955 etc. by country). Give prices where published, licence terms and links. Save as `A8-image-licensing.md`.

**A9 Fake shirt guide (content).** Outline a "how to spot a fake vintage shirt" article: tags, labels, stitching, crests, era-specific details, with sources. Save as `A9-fake-guide-outline.md`.

**A10 Vintage shirt market.** Main places people buy and sell vintage shirts (Classic Football Shirts, Vintage Football Shirts, eBay, Vinted, Depop...), typical price ranges by era and condition, and which have affiliate programmes (commission, cookie length, sign-up link). Save as `A10-shirt-market.md`.

**A11 National team colours by era.** For the 40 most successful national teams: home and change colours by decade, with notable changes and sources. JSON per team. Save as `A11-national-colours.md`.

**A12 Club colour origins.** Why 50 famous clubs wear their colours (origin stories). Two sentences each, with sources. Save as `A12-colour-origins.md`.

---

## B. Match archive

**B1 ★ Match card details, in batches of 5 finals** (repeat with the next 5 match IDs from the appendix)
```
For each final below, return a JSON object in this exact shape:
{
  "id": "1970-world-cup-final",
  "venue": "Estadio Azteca, Mexico City", "attendance": 107412 or null, "referee": "Name (Country)" or null,
  "score_note": "after extra time / on penalties 5-4 / replay" or null,
  "goals": [ { "minute": 18, "extra": 0, "scorer": "Pelé", "team": "home", "kind": "goal|pen|og" } ],
  "lineups": [
    { "team": "home", "formation": "4-2-4" or null, "coach": "...",
      "startXI": [ { "name": "...", "number": 1, "pos": "G|D|M|F" } ],
      "substitutes": [ ... ] }, { "team": "away", ... } ],
  "cards": [ { "minute": 0, "player": "...", "team": "home", "type": "yellow|red" } ],
  "kits_worn": "plain-language description of both teams' shirts in this match",
  "sources": [ "https://..." ]
}
"home" means the team listed first in the official report. IDs: [paste 5 IDs]
```
Save as: `B1-matches-batch-01.md`, ...

**B2 ★ 100 greatest matches that were not finals.** Famous semi-finals, league deciders, derbies and comebacks across all eras and continents. For each: date, competition, stage, venue, teams, score, one-sentence reason, sources; plus an ID in the form `yyyy-team-v-team`. Save as `B2-great-matches.md`.

**B3 ★ "On this day" calendar, one month per prompt** (12 prompts)
```
For every day of [MONTH], list 2-4 notable football history events (famous matches, finals,
records, debuts, kit launches, club foundings) from any era or country. Return a JSON array:
{ "date": "10-13", "year": 1999, "event": "one sentence, own words",
  "type": "match|record|founding|debut|kit|other", "source": "https://..." }
Only include events whose exact date you can source.
```
Save as: `B3-on-this-day-01-january.md` ... `B3-on-this-day-12-december.md`

**B4 Great half-time comebacks.** 40 matches won after trailing at half-time (Istanbul 2005 and others), with the half-time score, final score, what changed, and sources. This is perfect "Halftime" brand content. Save as `B4-halftime-comebacks.md`.

**B5 ★ The history of half-time itself.** When half-time became standard, how its length changed (rules, IFAB), the half-time oranges and tea tradition, famous team talks, half-time shows. A 1,000-word article in your own words with sources. Save as `B5-history-of-halftime.md`.

**B6 Stadiums of the finals.** For each venue in the appendix match list: city, opened, capacity then and now, still standing or not, one fact, source. JSON. Save as `B6-stadiums.md`.

**B7 Missing finals.** Which major finals are not in the appendix list (Club World Cup, Intercontinental Cup, Cup Winners' Cup, UEFA Cup, Africa Cup of Nations, Asian Cup, Women's World Cup, Women's Euro, Women's Champions League)? List them with date, teams, score and sources, in the same order the site uses (one ID per final, `yyyy-competition-final`). Save as `B7-more-finals.md`.

**B8 Women's football archive.** Every Women's World Cup and Women's Euro final: date, venue, teams, score, scorers with minutes, sources. Same JSON as B1. Save as `B8-womens-finals.md`.

---

## C. Data and APIs

**C1 ★ Confirm API-Football's current plans.** Prices, daily and per-minute request limits, which dates and seasons each plan can query, whether lineups, events and statistics are included, commercial-use and public-display terms, attribution rules. Link to the official pricing and terms pages. Save as `C1-api-football.md`.

**C2 ★ Compare football data providers** for a small public site wanting scores, lineups, events and some history: API-Football, football-data.org, Sportmonks, TheSportsDB, SportDataAPI, Opta/Stats Perform (indicative), StatsBomb open data, openfootball. Table: price, coverage, history depth, lineups, terms for public display, attribution. Save as `C2-data-providers.md`.

**C3 Free historical lineup sources.** Where reliable historical lineups exist that may legally be reused: openfootball, StatsBomb open data, Wikipedia (CC BY-SA), RSSSF (terms?), worldfootball.net, 11v11, Transfermarkt (terms on reuse). Give licence or terms for each. Save as `C3-lineup-sources.md`.

**C4 Which competitions to cover.** Given an English-speaking global audience, rank 15 competitions by interest (search volume and social following where available) and say which are in API-Football's free and cheapest paid plans. Save as `C4-competitions.md`.

**C5 Free stats ideas.** Free, legal sources of richer stats (xG, possession, shots) and what each permits. Save as `C5-stats-sources.md`.

**C6 TheSportsDB.** What it offers (team badges, kit images, fanart), the API price, and the licence for images (can they be shown on a public site?). Save as `C6-thesportsdb.md`.

---

## D. News, AI and the law

**D1 ★ More credible football news feeds.** 30 RSS/Atom feeds from reputable outlets in English (and optionally Spanish): name, feed URL, country, football focus, and any terms about reuse or summarising. Check each URL works. Save as `D1-news-feeds.md`.

**D2 ★ Is AI news summarising legal?** For the UK, EU and US: copyright and database rights around summarising news articles with AI, linking, headlines, the EU text-and-data-mining opt-out, recent court cases and publisher deals (2023-2026). What practices keep a small site safe (length limits, attribution, linking, no copying)? Save as `D2-ai-news-legal.md`.

**D3 AI disclosure rules.** What the EU AI Act, UK guidance, the US FTC and Google require or recommend for AI-written text and AI-generated images on a website (labels, wording, timing of obligations). Suggest wording for a site footer and an "About our AI" page. Save as `D3-ai-disclosure.md`.

**D4 Instagram and AI images.** Meta's current rules for AI-generated images: "AI info" labels, when they are required, how to add them, any reach penalties. Save as `D4-instagram-ai-rules.md`.

**D5 Football newsroom style guide.** A 2-page style guide for Halftime's voice: British English, how to write scores, minutes, player names with accents, club names, competition names, numbers, dates, transfer-rumour language, and words to avoid. Save as `D5-style-guide.md`.

**D6 Fact-check checklist.** A checklist the AI news writer can follow before publishing (claims, numbers, quotes, injuries, transfers), drawn from published newsroom standards (BBC, Reuters, AP). Save as `D6-fact-check.md`.

**D7 Google News and Discover.** How a small site gets into Google News and Discover, and whether AI-assisted content is allowed. Requirements and steps. Save as `D7-google-news.md`.

---

## E. Brand, name and legal pages

**E1 ★ Trademark check for "Halftime".** Search the USPTO, EUIPO and UK IPO (and my own country's office: [your country]) for "Halftime" / "Half Time" marks in classes 9, 16, 25, 35, 38 and 41 (media, publishing, clothing, online services). List the live marks, owners, classes and links, and describe the risk in plain words. Save as `E1-trademark.md`.

**E2 Other football brands called Halftime.** Websites, podcasts, apps, shops, and social accounts using "Halftime" or "Half Time" in football or sport. Links and size. Save as `E2-similar-brands.md`.

**E3 Domain name ideas.** 40 domain ideas for Halftime (.com, .co, .co.uk, .football, .club, .news, .fc...), noting likely price per year at Cloudflare Registrar and Namecheap. I will check which are available myself. Save as `E3-domains.md`.

**E4 Social handles.** 20 handle ideas usable across Instagram, X, TikTok, Threads and YouTube (consistent, short). Save as `E4-handles.md`.

**E5 Taglines.** 30 tagline options in the vintage-newspaper voice (current: "Football news, stats and shirts, served at the interval"). Save as `E5-taglines.md`.

**E6 ★ Logo critique.** Upload `brand/picks/sheet.png` and `brand/football/sheet-1.png` / `sheet-2.png` from the repository (or download them from GitHub) and ask: "Critique these football logo options for a vintage football news site: originality, legibility at small sizes, how they read as a profile picture, similarity to existing club, university or brand marks. Rank the top 5 and explain." Save as `E6-logo-critique.md`.

**E7 ★ Legal pages (drafts).** Draft a Privacy Policy, Cookie notice, Terms of Use and an "Image and data credits" page for a free football website with no accounts yet, using privacy-friendly analytics, AI-written summaries, API-Football data and Wikimedia images. Plain English, GDPR- and UK-GDPR-aware. Mark anything a lawyer should check. Save as `E7-legal-pages.md`.

**E8 Business basics.** Do I need to register a business to run ads or affiliate links in [your country]? Tax basics for small online income. Save as `E8-business.md`.

---

## F. Instagram and social

**F1 ★ Competitor accounts.** 25 Instagram accounts about football history, vintage shirts or football design (for example accounts like @classicfootballshirts, @museumofjerseys, @oldschoolpanini, @footballkitarchive, @vintagefootballshirts; check these exist). For each: followers, posting frequency, formats that perform best, what makes them distinctive. Save as `F1-competitors.md`.

**F2 Hashtags.** 60 hashtags in three tiers (big, medium, niche) for vintage football, kits, football history and match results, with approximate post counts. Save as `F2-hashtags.md`.

**F3 Posting plan.** Best days and times for football content (global and UK-centred), posting frequency for a new account, carousel vs single image vs Reels for this niche. Cite studies. Save as `F3-posting-plan.md`.

**F4 30-day content calendar.** Using these content types — story cards (news), results cards, kit-of-the-day, on-this-day, match-card throwbacks, half-time comebacks, kit stories — build a 30-day calendar starting [date], tied to real fixtures and anniversaries in that period (with sources). Save as `F4-calendar.md`.

**F5 Caption templates.** 15 reusable caption templates per content type, in the Halftime voice, with source-credit lines. Save as `F5-captions.md`.

**F6 Reels ideas.** 20 short-video ideas that only use our own assets (illustrations, kit drawings, match cards, text): no match footage. Save as `F6-reels.md`.

**F7 Football footage rules.** What football rights holders (Premier League, UEFA, FIFA) allow and forbid on social media (clips, screenshots, crests, player images), and the risk of strikes. Save as `F7-footage-rules.md`.

**F8 ★ Automatic Instagram posting.** Requirements to post automatically through the Instagram Graph API (Business/Creator account, Facebook Page, app review, permissions, limits, costs) and simpler alternatives (Buffer, Later, Meta Business Suite scheduling). Step-by-step for a beginner. Save as `F8-auto-posting.md`.

**F9 Other platforms.** Short strategy for X, Threads, TikTok, Bluesky and a WhatsApp Channel for a football history brand: what works on each. Save as `F9-platforms.md`.

**F10 Growth without ads.** 25 tactics to grow a niche football account from zero (collaborations, communities, Reddit rules, newsletter swaps), with examples. Save as `F10-growth.md`.

---

## G. Product, features and roadmap

**G1 ★ Competitor teardown.** Compare FotMob, Sofascore, OneFootball, The Athletic, BBC Sport, Football Kit Archive and Classic Football Shirts: features, what users praise and complain about (app reviews, Reddit), and gaps a small vintage-style site could fill. Save as `G1-competitors.md`.

**G2 Feature ideas.** 50 feature ideas for Halftime, each with a one-line description, value to users, effort (S/M/L) and whether it needs accounts or paid data. Save as `G2-feature-ideas.md`.

**G3 "My collection" feature spec.** Users mark shirts they own or want. Outline the screens, data fields, privacy, and the cheapest way to add accounts to a static site (Supabase, Firebase, Cloudflare D1 + Access, Netlify Identity: free tiers and limits). Save as `G3-collection-spec.md`.

**G4 ★ Fantasy league design.** Compare scoring rules of Fantasy Premier League, UEFA Fantasy and Sorare; propose a simple Halftime fantasy format; list the data feeds needed and their cost (Sportmonks and others); and the legal line between free fantasy games and gambling in the UK, EU and US (prizes, entry fees). Save as `G4-fantasy.md`.

**G5 Newsletter.** Compare Buttondown, Beehiiv, Substack, MailerLite and Kit for a weekly football newsletter: free tiers, costs at 1k/10k subscribers, API to send automatically from GitHub Actions, monetisation. Save as `G5-newsletter.md`.

**G6 ★ Accessibility audit.** Visit https://sebastianpereirarueda-lab.github.io/Halftime/ and its Kit Room and match cards. Check against WCAG 2.2 AA (contrast, headings, alt text, keyboard use, tap sizes, screen-reader labels). List issues with page, element, severity and fix. Save as `G6-accessibility.md`.

**G7 ★ SEO audit and keywords.** Audit the live site's SEO (titles, descriptions, headings, sitemap, structured data, Open Graph images, speed) and research 100 keywords a vintage football site could rank for (kit names, "[team] [year] shirt", famous finals), with rough monthly volume and difficulty. Save as `G7-seo.md`.

**G8 Analytics.** Compare privacy-friendly analytics (Cloudflare Web Analytics, Plausible, Umami, GoatCounter, Fathom): cost, GDPR (no cookie banner needed?), ease of adding to a static site. Save as `G8-analytics.md`.

**G9 Comments and community.** Options for comments or a community on a static site (Giscus, Utterances, Discord, Reddit community, Disqus): cost, moderation, privacy. Save as `G9-community.md`.

**G10 Spanish edition.** What it would take to publish a Spanish version (audience size, translation by AI with review, URL structure, hreflang, feeds in Spanish such as Marca, AS, El País, Olé). Save as `G10-spanish.md`.

**G11 Search.** Free ways to add search to a static site (Pagefind, Lunr, Fuse.js, Algolia free tier) compared. Save as `G11-search.md`.

**G12 Roadmap.** Using G1, G2 and the project brief, propose a 6-month roadmap in 2-week steps, with what needs money and what does not. Save as `G12-roadmap.md`.

---

## H. Money

**H1 ★ Affiliate programmes.** Football shirt and merchandise affiliate programmes (Classic Football Shirts, Kitbag, Fanatics, Subside Sports, adidas, Nike, Puma, eBay Partner Network, Amazon Associates, Vinted?): commission, cookie length, approval rules, sign-up links, and whether they accept small new sites. Save as `H1-affiliates.md`.

**H2 Ads.** Ad options for a small site (Google AdSense requirements, EthicalAds, Carbon, Ezoic, Mediavine thresholds): traffic needed, typical earnings per 1,000 views for sports content, privacy impact. Save as `H2-ads.md`.

**H3 Supporter memberships.** Ko-fi, Buy Me a Coffee, Patreon, Substack paid, GitHub Sponsors: fees and what members typically get on small sports sites. Save as `H3-memberships.md`.

**H4 Merch.** Print-on-demand options (Printful, Printify, Teemill, Spreadshirt) for Halftime-branded tees and prints: costs, quality reviews, and the legal limits around club crests, kit designs and player names. Save as `H4-merch.md`.

**H5 Sponsorship pricing.** What small football newsletters and Instagram accounts charge for sponsored posts at 1k, 10k and 50k followers. Save as `H5-sponsorship.md`.

**H6 Running costs.** Estimate monthly costs at three sizes (hobby, 10k visits/month, 100k visits/month): API-Football plans, OpenAI API for 4 news editions and ~16 images a day, domain, email, hosting, newsletter. Show the maths and link the price pages. Save as `H6-costs.md`.

---

## I. Hosting and set-up guides (beginner, Windows)

**I1 Custom domain on GitHub Pages.** Step-by-step for a beginner on Windows: buying a domain at Cloudflare Registrar, DNS records for GitHub Pages, HTTPS, the www redirect, how long it takes, common mistakes. Save as `I1-custom-domain.md`.

**I2 GitHub Pages vs Cloudflare Pages** for this exact site (static files plus a scheduled GitHub Action): speed, limits, analytics, redirects, access protection, cost. Save as `I2-hosting-compare.md`.

**I3 Email on my domain.** Free ways to get hello@mydomain (Cloudflare Email Routing to Gmail, Zoho free) with steps. Save as `I3-email.md`.

**I4 Uptime and alerts.** Free uptime monitors (UptimeRobot, Better Stack, Cronitor) and how to get an alert if the GitHub Action stops updating the site. Save as `I4-monitoring.md`.

**I5 Keys and security basics.** Plain-language guide to keeping API keys safe on GitHub, rotating them, spending limits on OpenAI and API-Football, and what to do if a key leaks. Save as `I5-security.md`.

---

## J. Writing (drafts Claude can drop straight in)

**J1 About page.** 400 words in the Halftime voice: what the site is, how news is made (AI from credited sources), where data comes from, how kits are researched. Save as `J1-about.md`.

**J2 "How we research shirts" page.** Methodology, sources we trust, how we label uncertain facts, how readers can send corrections. Save as `J2-methodology.md`.

**J3 Football glossary.** 120 terms (tactics, rules, eras, slang) with one-sentence definitions. JSON `{ "term": "...", "definition": "..." }`. Save as `J3-glossary.md`.

**J4 FAQ.** 20 questions readers would ask and short answers. Save as `J4-faq.md`.

**J5 ★ 12 evergreen feature articles.** Outlines with sources for: the history of shirt numbers, names on shirts, the first kit sponsors, why goalkeepers wear different colours, the change-kit rules, the story of the football itself, half-time oranges, floodlights, match programmes, scarves and rosettes, terrace culture, the first televised match. Save as `J5-features.md`.

**J6 Newsletter.** Welcome email, a weekly newsletter template and 10 subject-line formulas. Save as `J6-newsletter.md`.

**J7 Section intros.** 2-sentence intros for: Front Page, Scores, Stats, Kit Room, Match Cards, Archive, On This Day, Half-time Comebacks. Save as `J7-intros.md`.

---

## K. Design research

**K1 Vintage football print references.** Eras of match programme and newspaper design (1930s-1980s), typefaces typically used, colour printing limits, layout habits, with links to archive images. Save as `K1-print-references.md`.

**K2 Typeface pairings.** 10 free (Google Fonts, open licence) pairings for a vintage football newspaper: display, headline, body, label. Why each works. Save as `K2-type-pairings.md`.

**K3 Colour palettes.** 10 palettes from real vintage football sources (programmes, enamel signs, scarves, kits), with hex codes and where each comes from. Save as `K3-palettes.md`.

**K4 UI inspiration.** 25 websites with excellent editorial or vintage design (sports and non-sports), what to borrow from each. Save as `K4-inspiration.md`.

---

## Appendix 1: shirt IDs in the Kit Room (for A1, A2, A3)

Copy 10 at a time into task A1.

```
Batch 01: argentina-1930, uruguay-1930, czechoslovakia-1934, italy-1934, hungary-1938, italy-1938, brazil-1950, uruguay-1950, hungary-1954, west-germany-1954
Batch 02: real-madrid-1956, reims-1956, fiorentina-1957, real-madrid-1957, brazil-1958, milan-1958, real-madrid-1958, sweden-1958, real-madrid-1959, reims-1959
Batch 03: eintracht-frankfurt-1960, real-madrid-1960, soviet-union-1960, yugoslavia-1960, barcelona-1961, benfica-1961, benfica-1962, brazil-1962, czechoslovakia-1962, real-madrid-1962
Batch 04: benfica-1963, milan-1963, inter-milan-1964, real-madrid-1964, soviet-union-1964, spain-1964, benfica-1965, inter-milan-1965, england-1966, partizan-1966
Batch 05: real-madrid-1966, west-germany-1966, celtic-1967, inter-milan-1967, benfica-1968, italy-1968, manchester-united-1968, yugoslavia-1968, ajax-1969, milan-1969
Batch 06: brazil-1970, celtic-1970, feyenoord-1970, italy-1970, ajax-1971, panathinaikos-1971, ajax-1972, inter-milan-1972, soviet-union-1972, west-germany-1972
Batch 07: ajax-1973, juventus-1973, atletico-madrid-1974, bayern-munich-1974, netherlands-1974, west-germany-1974, bayern-munich-1975, colombia-1975, leeds-united-1975, peru-1975
Batch 08: bayern-munich-1976, czechoslovakia-1976, saint-etienne-1976, west-germany-1976, borussiamonchengladbach-1977, liverpool-1977, argentina-1978, club-brugge-1978, liverpool-1978, netherlands-1978
Batch 09: chile-1979, malmo-ff-1979, nottingham-forest-1979, paraguay-1979, belgium-1980, hamburger-sv-1980, nottingham-forest-1980, west-germany-1980, liverpool-1981, real-madrid-1981
Batch 10: aston-villa-1982, bayern-munich-1982, italy-1982, west-germany-1982, brazil-1983, hamburger-sv-1983, juventus-1983, uruguay-1983, france-1984, liverpool-1984
Batch 11: roma-1984, spain-1984, juventus-1985, liverpool-1985, argentina-1986, barcelona-1986, steaua-bucuresti-1986, west-germany-1986, bayern-munich-1987, chile-1987
Batch 12: porto-1987, uruguay-1987, benfica-1988, netherlands-1988, psv-eindhoven-1988, soviet-union-1988, milan-1989, steaua-bucuresti-1989, argentina-1990, benfica-1990
Batch 13: milan-1990, west-germany-1990, marseille-1991, red-star-belgrade-1991, barcelona-1992, denmark-1992, germany-1992, sampdoria-1992, argentina-1993, marseille-1993
Batch 14: mexico-1993, milan-1993, barcelona-1994, brazil-1994, italy-1994, milan-1994, ajax-1995, brazil-1995, milan-1995, uruguay-1995
Batch 15: ajax-1996, czech-republic-1996, germany-1996, juventus-1996, bolivia-1997, borussia-dortmund-1997, brazil-1997, juventus-1997, brazil-1998, france-1998
Batch 16: juventus-1998, real-madrid-1998, bayern-munich-1999, brazil-1999, manchester-united-1999, uruguay-1999, france-2000, italy-2000, real-madrid-2000, valencia-2000
Batch 17: bayern-munich-2001, colombia-2001, mexico-2001, valencia-2001, bayer-leverkusen-2002, brazil-2002, germany-2002, real-madrid-2002, juventus-2003, milan-2003
Batch 18: argentina-2004, brazil-2004, greece-2004, monaco-2004, porto-2004, portugal-2004, liverpool-2005, milan-2005, arsenal-2006, barcelona-2006
Batch 19: france-2006, italy-2006, argentina-2007, brazil-2007, liverpool-2007, milan-2007, chelsea-2008, germany-2008, manchester-united-2008, spain-2008
Batch 20: barcelona-2009, manchester-united-2009, bayern-munich-2010, inter-milan-2010, netherlands-2010, spain-2010, barcelona-2011, manchester-united-2011, paraguay-2011, uruguay-2011
Batch 21: bayern-munich-2012, chelsea-2012, italy-2012, spain-2012, bayern-munich-2013, borussia-dortmund-2013, argentina-2014, atletico-madrid-2014, germany-2014, real-madrid-2014
Batch 22: argentina-2015, barcelona-2015, chile-2015, juventus-2015, argentina-2016, atletico-madrid-2016, chile-2016, france-2016, portugal-2016, real-madrid-2016
Batch 23: juventus-2017, real-madrid-2017, croatia-2018, france-2018, liverpool-2018, real-madrid-2018, brazil-2019, liverpool-2019, peru-2019, tottenham-hotspur-2019
Batch 24: bayern-munich-2020, paris-saint-germain-2020, argentina-2021, brazil-2021, chelsea-2021, england-2021, italy-2021, manchester-city-2021, argentina-2022, france-2022
Batch 25: liverpool-2022, real-madrid-2022, inter-milan-2023, manchester-city-2023, argentina-2024, borussia-dortmund-2024, colombia-2024, england-2024, real-madrid-2024, spain-2024
Batch 26: inter-milan-2025, paris-saint-germain-2025, argentina-2026, arsenal-2026, paris-saint-germain-2026, spain-2026
```

(256 shirts.)

## Appendix 2: match card IDs (for B1, B6, B7)

Copy 5 at a time into task B1.

```
Batch 01: 1930-world-cup-final, 1934-world-cup-final, 1938-world-cup-final, 1950-world-cup-final, 1954-world-cup-final
Batch 02: 1956-european-cup-final, 1957-european-cup-final, 1958-european-cup-final, 1958-world-cup-final, 1959-european-cup-final
Batch 03: 1960-european-cup-final, 1960-euro-final, 1961-european-cup-final, 1962-european-cup-final, 1962-world-cup-final
Batch 04: 1963-european-cup-final, 1964-european-cup-final, 1964-euro-final, 1965-european-cup-final, 1966-european-cup-final
Batch 05: 1966-world-cup-final, 1967-european-cup-final, 1968-european-cup-final, 1968-euro-final, 1968-euro-final-replay
Batch 06: 1969-european-cup-final, 1970-european-cup-final, 1970-world-cup-final, 1971-european-cup-final, 1972-european-cup-final
Batch 07: 1972-euro-final, 1973-european-cup-final, 1974-european-cup-final, 1974-european-cup-final-replay, 1974-world-cup-final
Batch 08: 1975-european-cup-final, 1975-copa-america-final-first-leg, 1975-copa-america-final-second-leg, 1975-copa-america-final-play-off, 1976-european-cup-final
Batch 09: 1976-euro-final, 1977-european-cup-final, 1978-european-cup-final, 1978-world-cup-final, 1979-european-cup-final
Batch 10: 1979-copa-america-final-first-leg, 1979-copa-america-final-second-leg, 1979-copa-america-final-play-off, 1980-european-cup-final, 1980-euro-final
Batch 11: 1981-european-cup-final, 1982-european-cup-final, 1982-world-cup-final, 1983-european-cup-final, 1983-copa-america-final-first-leg
Batch 12: 1983-copa-america-final-second-leg, 1984-european-cup-final, 1984-euro-final, 1985-european-cup-final, 1986-european-cup-final
Batch 13: 1986-world-cup-final, 1987-european-cup-final, 1987-copa-america-final, 1988-european-cup-final, 1988-euro-final
Batch 14: 1989-european-cup-final, 1990-european-cup-final, 1990-world-cup-final, 1991-european-cup-final, 1992-european-cup-final
Batch 15: 1992-euro-final, 1993-champions-league-final, 1993-copa-america-final, 1994-champions-league-final, 1994-world-cup-final
Batch 16: 1995-champions-league-final, 1995-copa-america-final, 1996-champions-league-final, 1996-euro-final, 1997-champions-league-final
Batch 17: 1997-copa-america-final, 1998-champions-league-final, 1998-world-cup-final, 1999-champions-league-final, 1999-copa-america-final
Batch 18: 2000-champions-league-final, 2000-euro-final, 2001-champions-league-final, 2001-copa-america-final, 2002-champions-league-final
Batch 19: 2002-world-cup-final, 2003-champions-league-final, 2004-champions-league-final, 2004-euro-final, 2004-copa-america-final
Batch 20: 2005-champions-league-final, 2006-champions-league-final, 2006-world-cup-final, 2007-champions-league-final, 2007-copa-america-final
Batch 21: 2008-champions-league-final, 2008-euro-final, 2009-champions-league-final, 2010-champions-league-final, 2010-world-cup-final
Batch 22: 2011-champions-league-final, 2011-copa-america-final, 2012-champions-league-final, 2012-euro-final, 2013-champions-league-final
Batch 23: 2014-champions-league-final, 2014-world-cup-final, 2015-champions-league-final, 2015-copa-america-final, 2016-champions-league-final
Batch 24: 2016-copa-america-final, 2016-euro-final, 2017-champions-league-final, 2018-champions-league-final, 2018-world-cup-final
Batch 25: 2019-champions-league-final, 2019-copa-america-final, 2020-champions-league-final, 2021-champions-league-final, 2021-copa-america-final
Batch 26: 2020-euro-final, 2022-champions-league-final, 2022-world-cup-final, 2023-champions-league-final, 2024-champions-league-final
Batch 27: 2024-euro-final, 2024-copa-america-final, 2025-champions-league-final, 2026-champions-league-final, 2026-world-cup-final
```

(135 match cards.)
