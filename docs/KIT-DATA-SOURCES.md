# Where the Kit Room data can come from

Research note, October 2026. The question was: is there a database of football shirts
that can fill the Kit Room in one go?

**Short answer: no single free database exists, but two free sources together do the job.**
There is no openly licensed database of historical kits with colours, manufacturers and
dates. The sites that have that information own it and do not allow copying. What does
exist, free to reuse, is:

1. **Tournament data** (public domain, from openfootball): who played which final, when,
   where, the score and the scorers.
2. **The kits worn in each final** (Wikipedia, CC BY-SA 4.0): the article about every
   World Cup and Euro final carries a drawing of both teams' kits, written as hex colours
   and pattern names, with a revision number that can be cited.

Both now fill the Kit Room. Manufacturer, debut and design notes remain to be researched.

## What was checked

| Source | What it has | Can we use it? |
| --- | --- | --- |
| **openfootball** (`worldcup.json`, `euro.json`) | Every World Cup from 1930 and the last two Euros: fixtures, results, venues, scorers, lineups. Licence: CC0 (public domain). | **Yes. This is what the importer uses.** No colours or kit facts, though. |
| **Wikipedia** articles about each final | Every article on a World Cup or Euro final carries both kits worn that day, drawn with the `Football kit` template: hex colours and pattern names. Licence: CC BY-SA 4.0 (free, must credit Wikipedia). | **Yes. This is where the colours come from.** The main national-team articles, by contrast, describe kits in prose and are of little use. |
| **Wikimedia Commons** kit pattern pictures | The pictures behind the pattern names (`_ita82`, `_esp26h`). Two shirts in the catalogue have their colour only in such a picture. | Not reachable from the coding environment yet (`commons.wikimedia.org`, `upload.wikimedia.org`). Those two shirts stay in traditional colours and say so. |
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

Stage 2 of the importer reads the Wikipedia article about each final, takes the body
colour of each team's kit from it, and writes into the shirt:

- the colour, nudged one tenth of the way toward the site's paper tone so it prints like
  the rest of the page;
- a description in words ("Green shirt, as worn in the 1986 FIFA World Cup final");
- `coloursSource` and `coloursUrl`: the article, its revision number and the licence,
  shown as a link on the shirt's page.

This is how the catalogue knows that West Germany wore green in 1986, Brazil blue in
1958, Spain dark blue in 2010 and France white in 2006.

Two things the template cannot say are handled with care:

- **Stripes.** The template holds one body colour. Argentina's home shirt is sky blue and
  white stripes, so when Argentina's sourced colour is sky blue or white the shirt is
  drawn striped; any other colour (blue in 1990, navy in 2014) is a change kit and is
  drawn plain. No other team is given stripes.
- **Trim.** Taken from a colour word in the pattern name when there is one
  ("_greenborder", "_vneckblack"); otherwise a dark or light line that contrasts with
  the body.

Two shirts, Italy 1982 and Spain 2026, have no colour in the template at all: Wikipedia
holds their look only as a picture. They keep the team's traditional colours and their
description says so. Allowing `commons.wikimedia.org` and `upload.wikimedia.org` in the
environment's network settings would let the importer read those pictures too.

Scorer names follow the source's spelling. The openfootball files write some names
without accents (Puskas, Mueller, Voeller); correct them by hand in `matches.js` if wanted.

Entries already in the two data files are never removed by the importer, and only their
colours are refreshed, and only while `coloursSource` is absent or starts with
"Wikipedia". Write `coloursSource: "hand"` on a shirt to lock colours set by hand.

## Clubs

Nothing free and public domain was found for club kits either. The openfootball project
has Champions League fixtures from the 2010s in a text format, which could give club
finalists for recent years the same way, and Wikipedia's articles on Champions League
finals carry kit templates just like the World Cup ones. Club shirts are the natural next
batch, which is also why the Kit Room's "Clubs" filter is empty for now.
