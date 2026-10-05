# Where the Kit Room data can come from

Research note, October 2026. The question was: is there a database of football shirts
that can fill the Kit Room in one go?

**Short answer: no free one exists.** There is no openly licensed database of historical
kits with colours, manufacturers and dates. The sites that have that information own it
and do not allow copying. What does exist, free and public domain, is tournament data:
who played which final, when, where, the score and the scorers. That is what now fills
the Kit Room, and the colours of each shirt are still to be researched one by one.

## What was checked

| Source | What it has | Can we use it? |
| --- | --- | --- |
| **openfootball** (`worldcup.json`, `euro.json`) | Every World Cup from 1930 and the last two Euros: fixtures, results, venues, scorers, lineups. Licence: CC0 (public domain). | **Yes. This is what the importer uses.** No colours or kit facts, though. |
| **Wikipedia** kit templates | Nearly every national team and big club article has a "Kit" or "Kit evolution" section drawn with the `Football kit` template: hex colours and pattern names per era, year by year. Licence: CC BY-SA 4.0 (free, must credit Wikipedia). | **Yes in principle, and the best next step for colours.** Blocked from the coding environment's network at the moment (see below). |
| **Wikimedia Commons** kit drawings | The shirt, sleeve and sock pattern images behind the Wikipedia template. Mixed licences: GFDL, CC BY-SA, some public domain. | Case by case. Each file's licence must be checked before use. |
| **Football Kit Archive** (footballkitarchive.com) | The biggest archive: hundreds of thousands of kits with photos, brands and seasons. | **No.** Terms of use forbid scraping, and the photos are copyrighted. There is no official API or download. |
| **FKApi** (GitHub, `sunr4y/fkapi`) | A hobby project that scrapes Football Kit Archive into a database. | **No.** It just copies the site above, no licence stated, "educational use only". |
| **Historical Football Kits** (historicalkits.co.uk) | Hand-drawn British club and national kits from the 1800s on, with manufacturer and sponsor notes. | **No for copying.** Illustrations and text are the authors' copyright. Fine as a place for Sebas to *read* when researching a shirt. |
| **RSSSF** team colours pages | Plain-text notes on national team colours. | Reading only; small and not per-season. |
| **Kitbliss** | Lists of kit manufacturers and sponsors by season for some leagues. | Not reachable from the coding environment; terms unknown. Worth a look for the Manufacturer field. |
| **Kaggle, datahub, jokecamp/FootballData** | Match results, players, stadiums. | Nothing about kits. |

## What was done with it

`tools/import-kits.js` downloads the openfootball data and adds to `kits.js` and
`matches.js`:

- one match card for every World Cup final from 1930 to 2026 (and the 1950 deciding match,
  since that tournament had a final group instead of a final), plus the Euro 2020 and
  Euro 2024 finals;
- two shirts per final, one for each team, with year, competition and result filled in
  from the data.

Facts the data does not contain are left as `null` and show as "To be researched":
manufacturer, debut and design notes.

### About the colours

The shirts are drawn in each team's **traditional home colours** (Brazil yellow and green,
Italy blue, Germany white and black, and so on). Each description says so, because the
shirt actually worn in a final is sometimes a change kit. Known examples: England wore red
in 1966, Brazil wore blue in 1958, Spain wore dark blue in 2010. The 1966 England entry
was already correct by hand and has been kept. The other shirts need the same check.

Entries already in the two data files are never overwritten by the importer. If Sebas
corrects a colour or adds a manufacturer in Notepad, running the importer again keeps it.

## Next step for real colours: Wikipedia

Each Wikipedia national-team article carries, per era, lines like
`body = FFDF00`, `leftarm = FFDF00`, `pattern_b = _bra70h`. Reading those pages through
the Wikipedia API would give a sourced colour for most of the shirts in the catalogue,
with a link to cite.

This could not be done in this session because the coding environment's network policy
blocks `en.wikipedia.org`. To allow it: open the environment's settings (the cloud
environment menu in the session's title bar, then Edit), and under Network access either
choose a broader level or add `en.wikipedia.org` to the allowed domains. Steps are at
https://code.claude.com/docs/en/cloud-environments#network-access. Once that is open, the
importer can be extended to read the colours and fill the `facts.story` field with a
citation.

## Clubs

Nothing free and public domain was found for club kits either. The openfootball project
has Champions League fixtures from the 2010s in a text format, which could give club
finalists for recent years the same way, but no colours. Club shirts stay a manual job for
now, which is also why the Kit Room's "Clubs" filter is empty.
