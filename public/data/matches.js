// ============================================================
//  HALFTIME — MATCH CARDS
//  One entry per match. Edit this file to add or change matches.
//
//  Fields:
//    id          short web-safe name, used in the page address (matches/match.html?id=...)
//    competition e.g. "FIFA World Cup 1970"
//    stage       e.g. "Final"
//    date        written out, e.g. "21 June 1970"
//    venue       stadium and city
//    home / away { name, short (3 letters), colour (for the timeline dots), label, kit }
//                label is the word under the team name, e.g. "Winners"
//                kit is the id of the shirt in kits.js, or null
//    score       { home, away } final score (numbers)
//    scoreNote   optional line under the score, e.g. "After extra time." or null
//    extraTime   true if the match went to extra time (the timeline then runs to 120')
//    scoreNote   optional line under the score, e.g. "After extra time." or null
//    extraTime   true if the match went to extra time (the timeline then runs to 120')
//    scoreNote   optional line under the score, e.g. "After extra time." or null
//    extraTime   true if the match went to extra time (the timeline then runs to 120')
//    goals       list of { minute, scorer, team: "home" or "away" }
//    stats       null until a stats source is chosen
//    source      where the entry came from, e.g. "openfootball worldcup.json 1970 (CC0)",
//                or leave it out for entries written by hand
//    source      where the entry came from, e.g. "openfootball worldcup.json 1970 (CC0)",
//                or leave it out for entries written by hand
//    source      where the entry came from, e.g. "openfootball worldcup.json 1970 (CC0)",
//                or leave it out for entries written by hand
//
//  Do not write a score, minute or name you have not checked.
// ============================================================
window.HALFTIME_MATCHES = [
  {
    id: "1930-world-cup-final",
    competition: "FIFA World Cup 1930",
    stage: "Final",
    date: "30 July 1930",
    venue: "Estadio Centenario, Montevideo",
    home: { name: "Uruguay", short: "URU", colour: "#A2D0FC", label: "Winners", kit: "uruguay-1930" },
    away: { name: "Argentina", short: "ARG", colour: "#1B1A17", label: "Runners-up", kit: "argentina-1930" },
    score: { home: 4, away: 2 },
    scoreNote: null,
    extraTime: false,
    goals: [
      { minute: 12, scorer: "Dorado", team: "home" },
      { minute: 20, scorer: "Peucelle", team: "away" },
      { minute: 37, scorer: "Stábile", team: "away" },
      { minute: 57, scorer: "Cea", team: "home" },
      { minute: 68, scorer: "Iriarte", team: "home" },
      { minute: 89, scorer: "Castro", team: "home" }
    ],
    kitsNote: "Uruguay in sky blue. Argentina in sky blue and white striped. (Wikipedia, \"1930 FIFA World Cup final\".)",
    stats: null,
    source: "openfootball worldcup.json 1930 (CC0)"
  },
  {
    id: "1934-world-cup-final",
    competition: "FIFA World Cup 1934",
    stage: "Final",
    date: "10 June 1934",
    venue: "Nazionale PNF, Rome",
    home: { name: "Italy", short: "ITA", colour: "#547AAB", label: "Winners", kit: "italy-1934" },
    away: { name: "Czechoslovakia", short: "TCH", colour: "#DE1822", label: "Runners-up", kit: "czechoslovakia-1934" },
    score: { home: 2, away: 1 },
    scoreNote: "After extra time.",
    extraTime: true,
    goals: [
      { minute: 71, scorer: "Puč", team: "away" },
      { minute: 81, scorer: "Orsi", team: "home" },
      { minute: 95, scorer: "Schiavio", team: "home" }
    ],
    kitsNote: "Italy in blue. Czechoslovakia in red. (Wikipedia, \"1934 FIFA World Cup final\".)",
    stats: null,
    source: "openfootball worldcup.json 1934 (CC0)"
  },
  {
    id: "1938-world-cup-final",
    competition: "FIFA World Cup 1938",
    stage: "Final",
    date: "19 June 1938",
    venue: "Stade Olympique, Paris (Colombes)",
    home: { name: "Italy", short: "ITA", colour: "#547AAB", label: "Winners", kit: "italy-1938" },
    away: { name: "Hungary", short: "HUN", colour: "#DE1822", label: "Runners-up", kit: "hungary-1938" },
    score: { home: 4, away: 2 },
    scoreNote: null,
    extraTime: false,
    goals: [
      { minute: 6, scorer: "Colaussi", team: "away" },
      { minute: 8, scorer: "Titkos", team: "home" },
      { minute: 16, scorer: "Piola", team: "away" },
      { minute: 35, scorer: "Colaussi", team: "away" },
      { minute: 70, scorer: "Sárosi", team: "home" },
      { minute: 82, scorer: "Piola", team: "away" }
    ],
    kitsNote: "Italy in blue. Hungary in red. (Wikipedia, \"1938 FIFA World Cup final\".)",
    stats: null,
    source: "openfootball worldcup.json 1938 (CC0)"
  },
  {
    id: "1950-world-cup-final",
    competition: "FIFA World Cup 1950",
    stage: "Final round, deciding match",
    date: "16 July 1950",
    venue: "Maracanã, Rio de Janeiro",
    home: { name: "Uruguay", short: "URU", colour: "#A2D0FC", label: "Winners", kit: "uruguay-1950" },
    away: { name: "Brazil", short: "BRA", colour: "#1B1A17", label: "Runners-up", kit: "brazil-1950" },
    score: { home: 2, away: 1 },
    scoreNote: null,
    extraTime: false,
    goals: [
      { minute: 47, scorer: "Friaça", team: "away" },
      { minute: 66, scorer: "Schiaffino", team: "home" },
      { minute: 79, scorer: "Ghiggia", team: "home" }
    ],
    kitsNote: "Uruguay in sky blue. Brazil in white. (Wikipedia, \"Uruguay v Brazil (1950 FIFA World Cup)\".)",
    stats: null,
    source: "openfootball worldcup.json 1950 (CC0)"
  },
  {
    id: "1954-world-cup-final",
    competition: "FIFA World Cup 1954",
    stage: "Final",
    date: "4 July 1954",
    venue: "Stade de Suisse, Bern",
    home: { name: "West Germany", short: "FRG", colour: "#191817", label: "Winners", kit: "west-germany-1954" },
    away: { name: "Hungary", short: "HUN", colour: "#D01817", label: "Runners-up", kit: "hungary-1954" },
    score: { home: 3, away: 2 },
    scoreNote: null,
    extraTime: false,
    goals: [
      { minute: 6, scorer: "Puskas", team: "away" },
      { minute: 8, scorer: "Czibor", team: "away" },
      { minute: 10, scorer: "Morlock", team: "home" },
      { minute: 18, scorer: "Rahn", team: "home" },
      { minute: 84, scorer: "Rahn", team: "home" }
    ],
    kitsNote: "West Germany in white. Hungary in red. (Wikipedia, \"1954 FIFA World Cup final\".)",
    stats: null,
    source: "openfootball worldcup.json 1954 (CC0)"
  },
  {
    id: "1958-world-cup-final",
    competition: "FIFA World Cup 1958",
    stage: "Final",
    date: "29 June 1958",
    venue: "Rasunda Stadium, Solna",
    home: { name: "Brazil", short: "BRA", colour: "#3939A2", label: "Winners", kit: "brazil-1958" },
    away: { name: "Sweden", short: "SWE", colour: "#FEDF44", label: "Runners-up", kit: "sweden-1958" },
    score: { home: 5, away: 2 },
    scoreNote: null,
    extraTime: false,
    goals: [
      { minute: 4, scorer: "Liedholm", team: "away" },
      { minute: 9, scorer: "Vava", team: "home" },
      { minute: 32, scorer: "Vava", team: "home" },
      { minute: 55, scorer: "Pele", team: "home" },
      { minute: 68, scorer: "Zagallo", team: "home" },
      { minute: 80, scorer: "Simonsson", team: "away" },
      { minute: 90, scorer: "Pele", team: "home" }
    ],
    kitsNote: "Brazil in blue. Sweden in yellow. (Wikipedia, \"1958 FIFA World Cup final\".)",
    stats: null,
    source: "openfootball worldcup.json 1958 (CC0)"
  },
  {
    id: "1962-world-cup-final",
    competition: "FIFA World Cup 1962",
    stage: "Final",
    date: "17 June 1962",
    venue: "Estadio Nacional Julio Martínez Prádanos, Santiago",
    home: { name: "Brazil", short: "BRA", colour: "#FEF030", label: "Winners", kit: "brazil-1962" },
    away: { name: "Czechoslovakia", short: "TCH", colour: "#1B1A17", label: "Runners-up", kit: "czechoslovakia-1962" },
    score: { home: 3, away: 1 },
    scoreNote: null,
    extraTime: false,
    goals: [
      { minute: 15, scorer: "Masopust", team: "away" },
      { minute: 17, scorer: "Amarildo", team: "home" },
      { minute: 69, scorer: "Zito", team: "home" },
      { minute: 78, scorer: "Vava", team: "home" }
    ],
    kitsNote: "Brazil in yellow. Czechoslovakia in white. (Wikipedia, \"1962 FIFA World Cup final\".)",
    stats: null,
    source: "openfootball worldcup.json 1962 (CC0)"
  },
  {
    id: "1966-world-cup-final",
    competition: "FIFA World Cup 1966",
    stage: "Final",
    date: "30 July 1966",
    venue: "Wembley Stadium, London",
    home: { name: "England", short: "ENG", colour: "#E01817", label: "Winners", kit: "england-1966" },
    away: { name: "West Germany", short: "FRG", colour: "#191817", label: "Runners-up", kit: "west-germany-1966" },
    score: { home: 4, away: 2 },
    scoreNote: "After extra time.",
    extraTime: true,
    goals: [
      { minute: 12, scorer: "Haller", team: "away" },
      { minute: 18, scorer: "Hurst", team: "home" },
      { minute: 78, scorer: "Peters", team: "home" },
      { minute: 89, scorer: "Weber", team: "away" },
      { minute: 101, scorer: "Hurst", team: "home" },
      { minute: 120, scorer: "Hurst", team: "home" }
    ],
    kitsNote: "England in red. West Germany in white. (Wikipedia, \"1966 FIFA World Cup final\".)",
    stats: null,
    source: "openfootball worldcup.json 1966 (CC0)"
  },
  {
    id: "1970-world-cup-final",
    competition: "FIFA World Cup 1970",
    stage: "Final",
    date: "21 June 1970",
    venue: "Estadio Azteca, Mexico City",
    home: { name: "Brazil", short: "BRA", colour: "#FCEA25", label: "Winners", kit: "brazil-1970" },
    away: { name: "Italy", short: "ITA", colour: "#4535CE", label: "Runners-up", kit: "italy-1970" },
    score: { home: 4, away: 1 },
    goals: [
      { minute: 18, scorer: "Pelé", team: "home" },
      { minute: 37, scorer: "Boninsegna", team: "away" },
      { minute: 66, scorer: "Gérson", team: "home" },
      { minute: 71, scorer: "Jairzinho", team: "home" },
      { minute: 86, scorer: "Carlos Alberto", team: "home" }
    ],
    kitsNote: "Brazil in yellow with green trim. Italy in blue.",
    stats: null
  },
  {
    id: "1974-world-cup-final",
    competition: "FIFA World Cup 1974",
    stage: "Final",
    date: "7 July 1974",
    venue: "Olympiastadion, Munich",
    home: { name: "Netherlands", short: "NED", colour: "#FE6F17", label: "Runners-up", kit: "netherlands-1974" },
    away: { name: "West Germany", short: "FRG", colour: "#191817", label: "Winners", kit: "west-germany-1974" },
    score: { home: 1, away: 2 },
    scoreNote: null,
    extraTime: false,
    goals: [
      { minute: 2, scorer: "Neeskens (pen.)", team: "home" },
      { minute: 25, scorer: "Breitner (pen.)", team: "away" },
      { minute: 43, scorer: "Mueller", team: "away" }
    ],
    kitsNote: "Netherlands in orange. West Germany in white. (Wikipedia, \"1974 FIFA World Cup final\".)",
    stats: null,
    source: "openfootball worldcup.json 1974 (CC0)"
  },
  {
    id: "1978-world-cup-final",
    competition: "FIFA World Cup 1978",
    stage: "Final",
    date: "25 June 1978",
    venue: "El Monumental, Buenos Aires",
    home: { name: "Argentina", short: "ARG", colour: "#82B1DC", label: "Winners", kit: "argentina-1978" },
    away: { name: "Netherlands", short: "NED", colour: "#FE6F17", label: "Runners-up", kit: "netherlands-1978" },
    score: { home: 3, away: 1 },
    scoreNote: "After extra time.",
    extraTime: true,
    goals: [
      { minute: 38, scorer: "Kempes", team: "home" },
      { minute: 82, scorer: "Nanninga", team: "away" },
      { minute: 105, scorer: "Kempes", team: "home" },
      { minute: 115, scorer: "Bertoni", team: "home" }
    ],
    kitsNote: "Argentina in sky blue and white striped. Netherlands in orange. (Wikipedia, \"1978 FIFA World Cup final\".)",
    stats: null,
    source: "openfootball worldcup.json 1978 (CC0)"
  },
  {
    id: "1982-world-cup-final",
    competition: "FIFA World Cup 1982",
    stage: "Final",
    date: "11 July 1982",
    venue: "Santiago Bernabeu, Madrid",
    home: { name: "Italy", short: "ITA", colour: "#4535CE", label: "Winners", kit: "italy-1982" },
    away: { name: "West Germany", short: "FRG", colour: "#1B1A17", label: "Runners-up", kit: "west-germany-1982" },
    score: { home: 3, away: 1 },
    scoreNote: null,
    extraTime: false,
    goals: [
      { minute: 57, scorer: "Rossi", team: "home" },
      { minute: 69, scorer: "Tardelli", team: "home" },
      { minute: 81, scorer: "Altobelli", team: "home" },
      { minute: 83, scorer: "Breitner", team: "away" }
    ],
    kitsNote: "Italy in blue. West Germany in white. (Wikipedia, \"1982 FIFA World Cup final\".)",
    stats: null,
    source: "openfootball worldcup.json 1982 (CC0)"
  },
  {
    id: "1986-world-cup-final",
    competition: "FIFA World Cup 1986",
    stage: "Final",
    date: "29 June 1986",
    venue: "Estadio Azteca, Mexico City",
    home: { name: "Argentina", short: "ARG", colour: "#A8D2FC", label: "Winners", kit: "argentina-1986" },
    away: { name: "West Germany", short: "FRG", colour: "#198B17", label: "Runners-up", kit: "west-germany-1986" },
    score: { home: 3, away: 2 },
    scoreNote: null,
    extraTime: false,
    goals: [
      { minute: 23, scorer: "Brown", team: "home" },
      { minute: 56, scorer: "Valdano", team: "home" },
      { minute: 74, scorer: "Rummenigge", team: "away" },
      { minute: 81, scorer: "Voeller", team: "away" },
      { minute: 84, scorer: "Burruchaga", team: "home" }
    ],
    kitsNote: "Argentina in sky blue and white striped. West Germany in green. (Wikipedia, \"1986 FIFA World Cup final\".)",
    stats: null,
    source: "openfootball worldcup.json 1986 (CC0)"
  },
  {
    id: "1990-world-cup-final",
    competition: "FIFA World Cup 1990",
    stage: "Final",
    date: "8 July 1990",
    venue: "Stadio Olimpico, Rome",
    home: { name: "West Germany", short: "FRG", colour: "#1B1A17", label: "Winners", kit: "west-germany-1990" },
    away: { name: "Argentina", short: "ARG", colour: "#1918C3", label: "Runners-up", kit: "argentina-1990" },
    score: { home: 1, away: 0 },
    scoreNote: null,
    extraTime: false,
    goals: [
      { minute: 85, scorer: "Brehme (pen.)", team: "home" }
    ],
    kitsNote: "West Germany in white. Argentina in royal blue. (Wikipedia, \"1990 FIFA World Cup final\".)",
    stats: null,
    source: "openfootball worldcup.json 1990 (CC0)"
  },
  {
    id: "1994-world-cup-final",
    competition: "FIFA World Cup 1994",
    stage: "Final",
    date: "17 July 1994",
    venue: "Rose Bowl, Los Angeles (Pasadena)",
    home: { name: "Brazil", short: "BRA", colour: "#FEFE17", label: "Winners", kit: "brazil-1994" },
    away: { name: "Italy", short: "ITA", colour: "#1918C2", label: "Runners-up", kit: "italy-1994" },
    score: { home: 0, away: 0 },
    scoreNote: "After extra time. Brazil won 3–2 on penalties.",
    extraTime: true,
    goals: [],
    kitsNote: "Brazil in yellow. Italy in royal blue. (Wikipedia, \"1994 FIFA World Cup final\".)",
    stats: null,
    source: "openfootball worldcup.json 1994 (CC0)"
  },
  {
    id: "1998-world-cup-final",
    competition: "FIFA World Cup 1998",
    stage: "Final",
    date: "12 July 1998",
    venue: "Stade de France, Paris (Saint-Denis)",
    home: { name: "Brazil", short: "BRA", colour: "#FED017", label: "Runners-up", kit: "brazil-1998" },
    away: { name: "France", short: "FRA", colour: "#1918C3", label: "Winners", kit: "france-1998" },
    score: { home: 0, away: 3 },
    scoreNote: null,
    extraTime: false,
    goals: [
      { minute: 27, scorer: "Zidane", team: "away" },
      { minute: 46, scorer: "Zidane", team: "away" },
      { minute: 93, scorer: "Petit", team: "away" }
    ],
    kitsNote: "Brazil in yellow. France in royal blue. (Wikipedia, \"1998 FIFA World Cup final\".)",
    stats: null,
    source: "openfootball worldcup.json 1998 (CC0)"
  },
  {
    id: "2002-world-cup-final",
    competition: "FIFA World Cup 2002",
    stage: "Final",
    date: "30 June 2002",
    venue: "International Stadium Yokohama, Yokohama",
    home: { name: "Germany", short: "GER", colour: "#1B1A17", label: "Runners-up", kit: "germany-2002" },
    away: { name: "Brazil", short: "BRA", colour: "#FEFE17", label: "Winners", kit: "brazil-2002" },
    score: { home: 0, away: 2 },
    scoreNote: null,
    extraTime: false,
    goals: [
      { minute: 67, scorer: "Ronaldo", team: "away" },
      { minute: 79, scorer: "Ronaldo", team: "away" }
    ],
    kitsNote: "Germany in white. Brazil in yellow. (Wikipedia, \"2002 FIFA World Cup final\".)",
    stats: null,
    source: "openfootball worldcup.json 2002 (CC0)"
  },
  {
    id: "2006-world-cup-final",
    competition: "FIFA World Cup 2006",
    stage: "Final",
    date: "9 July 2006",
    venue: "Olympiastadion, Berlin",
    home: { name: "Italy", short: "ITA", colour: "#3660C3", label: "Winners", kit: "italy-2006" },
    away: { name: "France", short: "FRA", colour: "#1B1A17", label: "Runners-up", kit: "france-2006" },
    score: { home: 1, away: 1 },
    scoreNote: "After extra time. Italy won 5–3 on penalties.",
    extraTime: true,
    goals: [
      { minute: 7, scorer: "Zidane (pen.)", team: "away" },
      { minute: 19, scorer: "Materazzi", team: "home" }
    ],
    kitsNote: "Italy in blue. France in white. (Wikipedia, \"2006 FIFA World Cup final\".)",
    stats: null,
    source: "openfootball worldcup.json 2006 (CC0)"
  },
  {
    id: "2010-world-cup-final",
    competition: "FIFA World Cup 2010",
    stage: "Final",
    date: "11 July 2010",
    venue: "Soccer City Stadium, Johannesburg",
    home: { name: "Netherlands", short: "NED", colour: "#FE6E17", label: "Runners-up", kit: "netherlands-2010" },
    away: { name: "Spain", short: "ESP", colour: "#194672", label: "Winners", kit: "spain-2010" },
    score: { home: 0, away: 1 },
    scoreNote: "After extra time.",
    extraTime: true,
    goals: [
      { minute: 115, scorer: "Iniesta", team: "away" }
    ],
    kitsNote: "Netherlands in orange. Spain in dark blue. (Wikipedia, \"2010 FIFA World Cup final\".)",
    stats: null,
    source: "openfootball worldcup.json 2010 (CC0)"
  },
  {
    id: "2014-world-cup-final",
    competition: "FIFA World Cup 2014",
    stage: "Final",
    date: "13 July 2014",
    venue: "Maracanã, Rio de Janeiro",
    home: { name: "Germany", short: "GER", colour: "#1B1A17", label: "Winners", kit: "germany-2014" },
    away: { name: "Argentina", short: "ARG", colour: "#192970", label: "Runners-up", kit: "argentina-2014" },
    score: { home: 1, away: 0 },
    scoreNote: "After extra time.",
    extraTime: true,
    goals: [
      { minute: 113, scorer: "Götze", team: "home" }
    ],
    kitsNote: "Germany in white. Argentina in navy. (Wikipedia, \"2014 FIFA World Cup final\".)",
    stats: null,
    source: "openfootball worldcup.json 2014 (CC0)"
  },
  {
    id: "2018-world-cup-final",
    competition: "FIFA World Cup 2018",
    stage: "Final",
    date: "15 July 2018",
    venue: "Lenin, Moscow",
    home: { name: "France", short: "FRA", colour: "#283C63", label: "Winners", kit: "france-2018" },
    away: { name: "Croatia", short: "CRO", colour: "#F41817", label: "Runners-up", kit: "croatia-2018" },
    score: { home: 4, away: 2 },
    scoreNote: null,
    extraTime: false,
    goals: [
      { minute: 18, scorer: "Mandžukić (own goal)", team: "home" },
      { minute: 28, scorer: "Perišić", team: "away" },
      { minute: 38, scorer: "Griezmann (pen.)", team: "home" },
      { minute: 59, scorer: "Pogba", team: "home" },
      { minute: 65, scorer: "Mbappé", team: "home" },
      { minute: 69, scorer: "Mandžukić", team: "away" }
    ],
    kitsNote: "France in dark blue. Croatia in red. (Wikipedia, \"2018 FIFA World Cup final\".)",
    stats: null,
    source: "openfootball worldcup.json 2018 (CC0)"
  },
  {
    id: "2020-euro-final",
    competition: "UEFA Euro 2020",
    stage: "Final",
    date: "11 July 2021",
    venue: "London",
    home: { name: "Italy", short: "ITA", colour: "#2850D8", label: "Winners", kit: "italy-2021" },
    away: { name: "England", short: "ENG", colour: "#1B1A17", label: "Runners-up", kit: "england-2021" },
    score: { home: 1, away: 1 },
    scoreNote: "After extra time. Italy won 3–2 on penalties.",
    extraTime: true,
    goals: [
      { minute: 2, scorer: "Shaw", team: "away" },
      { minute: 67, scorer: "Bonucci", team: "home" }
    ],
    kitsNote: "Italy in blue. England in white. (Wikipedia, \"UEFA Euro 2020 final\".)",
    stats: null,
    source: "openfootball euro.json 2020 (CC0)"
  },
  {
    id: "2022-world-cup-final",
    competition: "FIFA World Cup 2022",
    stage: "Final",
    date: "18 December 2022",
    venue: "Lusail Stadium, Al Daayen",
    home: { name: "Argentina", short: "ARG", colour: "#1B1A17", label: "Winners", kit: "argentina-2022" },
    away: { name: "France", short: "FRA", colour: "#37345D", label: "Runners-up", kit: "france-2022" },
    score: { home: 3, away: 3 },
    scoreNote: "After extra time. Argentina won 4–2 on penalties.",
    extraTime: true,
    goals: [
      { minute: 23, scorer: "Messi (pen.)", team: "home" },
      { minute: 36, scorer: "Di María", team: "home" },
      { minute: 80, scorer: "Mbappé (pen.)", team: "away" },
      { minute: 81, scorer: "Mbappé", team: "away" },
      { minute: 108, scorer: "Messi", team: "home" },
      { minute: 118, scorer: "Mbappé (pen.)", team: "away" }
    ],
    kitsNote: "Argentina in sky blue and white striped. France in dark blue. (Wikipedia, \"2022 FIFA World Cup final\".)",
    stats: null,
    source: "openfootball worldcup.json 2022 (CC0)"
  },
  {
    id: "2024-euro-final",
    competition: "UEFA Euro 2024",
    stage: "Final",
    date: "14 July 2024",
    venue: "Berlin",
    home: { name: "Spain", short: "ESP", colour: "#FE1817", label: "Winners", kit: "spain-2024" },
    away: { name: "England", short: "ENG", colour: "#1B1A17", label: "Runners-up", kit: "england-2024" },
    score: { home: 2, away: 1 },
    scoreNote: null,
    extraTime: false,
    goals: [
      { minute: 47, scorer: "Williams", team: "home" },
      { minute: 73, scorer: "Palmer", team: "away" },
      { minute: 86, scorer: "Oyarzabal", team: "home" }
    ],
    kitsNote: "Spain in red. England in white. (Wikipedia, \"UEFA Euro 2024 final\".)",
    stats: null,
    source: "openfootball euro.json 2024 (CC0)"
  },
  {
    id: "2026-world-cup-final",
    competition: "FIFA World Cup 2026",
    stage: "Final",
    date: "19 July 2026",
    venue: "New York/New Jersey Stadium, New Jersey",
    home: { name: "Spain", short: "ESP", colour: "#E81B17", label: "Winners", kit: "spain-2026" },
    away: { name: "Argentina", short: "ARG", colour: "#1B1A17", label: "Runners-up", kit: "argentina-2026" },
    score: { home: 1, away: 0 },
    scoreNote: "After extra time.",
    extraTime: true,
    goals: [
      { minute: 106, scorer: "Torres", team: "home" }
    ],
    kitsNote: "Spain in red. Argentina in sky blue and white striped. (Wikipedia, \"2026 FIFA World Cup final\".)",
    stats: null,
    source: "openfootball worldcup.json 2026 (CC0)"
  }
];
