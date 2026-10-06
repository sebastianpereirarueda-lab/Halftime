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
//    goals       list of { minute, scorer, team: "home" or "away" }
//    stats       null until a stats source is chosen
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
    id: "1956-european-cup-final",
    competition: "European Cup 1956",
    stage: "Final",
    date: "13 June 1956",
    venue: "Parc des Princes, Paris",
    home: { name: "Real Madrid", short: "RM", colour: "#1B1A17", label: "Winners", kit: "real-madrid-1956" },
    away: { name: "Reims", short: "REI", colour: "#9A9A9A", label: "Runners-up", kit: "reims-1956" },
    score: { home: 4, away: 3 },
    scoreNote: null,
    extraTime: false,
    goals: [
      { minute: 6, scorer: "Leblond", team: "away" },
      { minute: 10, scorer: "Templin", team: "away" },
      { minute: 14, scorer: "Di Stéfano", team: "home" },
      { minute: 30, scorer: "Rial", team: "home" },
      { minute: 62, scorer: "Hidalgo", team: "away" },
      { minute: 67, scorer: "Marquitos", team: "home" },
      { minute: 79, scorer: "Rial", team: "home" }
    ],
    kitsNote: "Real Madrid in white. Reims in colours to be researched. (Wikipedia, \"1956 European Cup final\".)",
    stats: null,
    source: "Wikipedia, \"1956 European Cup final\" (revision 1338670202), CC BY-SA 4.0"
  },
  {
    id: "1957-european-cup-final",
    competition: "European Cup 1957",
    stage: "Final",
    date: "30 May 1957",
    venue: "Santiago Bernabéu, Madrid",
    home: { name: "Real Madrid", short: "RM", colour: "#1B1A17", label: "Winners", kit: "real-madrid-1957" },
    away: { name: "Fiorentina", short: "FIO", colour: "#453CD0", label: "Runners-up", kit: "fiorentina-1957" },
    score: { home: 2, away: 0 },
    scoreNote: null,
    extraTime: false,
    goals: [
      { minute: 69, scorer: "Di Stéfano (pen.)", team: "home" },
      { minute: 75, scorer: "Gento", team: "home" }
    ],
    kitsNote: "Real Madrid in white. Fiorentina in blue. (Wikipedia, \"1957 European Cup final\".)",
    stats: null,
    source: "Wikipedia, \"1957 European Cup final\" (revision 1341289941), CC BY-SA 4.0"
  },
  {
    id: "1958-european-cup-final",
    competition: "European Cup 1958",
    stage: "Final",
    date: "28 May 1958",
    venue: "Heysel Stadium, Brussels",
    home: { name: "Real Madrid", short: "RM", colour: "#1B1A17", label: "Winners", kit: "real-madrid-1958" },
    away: { name: "Milan", short: "MIL", colour: "#FE1817", label: "Runners-up", kit: "milan-1958" },
    score: { home: 3, away: 2 },
    scoreNote: "After extra time.",
    extraTime: true,
    goals: [
      { minute: 59, scorer: "Schiaffino", team: "away" },
      { minute: 74, scorer: "Di Stéfano", team: "home" },
      { minute: 77, scorer: "Grillo", team: "away" },
      { minute: 79, scorer: "Rial", team: "home" },
      { minute: 107, scorer: "Gento", team: "home" }
    ],
    kitsNote: "Real Madrid in white. Milan in red. (Wikipedia, \"1958 European Cup final\".)",
    stats: null,
    source: "Wikipedia, \"1958 European Cup final\" (revision 1374479945), CC BY-SA 4.0"
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
    id: "1959-european-cup-final",
    competition: "European Cup 1959",
    stage: "Final",
    date: "3 June 1959",
    venue: "Neckarstadion, Stuttgart",
    home: { name: "Real Madrid", short: "RM", colour: "#1B1A17", label: "Winners", kit: "real-madrid-1959" },
    away: { name: "Reims", short: "REI", colour: "#9A9A9A", label: "Runners-up", kit: "reims-1959" },
    score: { home: 2, away: 0 },
    scoreNote: null,
    extraTime: false,
    goals: [
      { minute: 1, scorer: "Mateos", team: "home" },
      { minute: 47, scorer: "Di Stéfano", team: "home" }
    ],
    kitsNote: "Real Madrid in white. Reims in colours to be researched. (Wikipedia, \"1959 European Cup final\".)",
    stats: null,
    source: "Wikipedia, \"1959 European Cup final\" (revision 1341424316), CC BY-SA 4.0"
  },
  {
    id: "1960-european-cup-final",
    competition: "European Cup 1960",
    stage: "Final",
    date: "18 May 1960",
    venue: "Hampden Park, Glasgow",
    home: { name: "Eintracht Frankfurt", short: "EF", colour: "#FE1817", label: "Runners-up", kit: "eintracht-frankfurt-1960" },
    away: { name: "Real Madrid", short: "RM", colour: "#1B1A17", label: "Winners", kit: "real-madrid-1960" },
    score: { home: 3, away: 7 },
    scoreNote: null,
    extraTime: false,
    goals: [
      { minute: 18, scorer: "Kress", team: "home" },
      { minute: 27, scorer: "Di Stéfano", team: "away" },
      { minute: 30, scorer: "Di Stéfano", team: "away" },
      { minute: 46, scorer: "Puskás", team: "away" },
      { minute: 56, scorer: "Puskás (pen.)", team: "away" },
      { minute: 60, scorer: "Puskás", team: "away" },
      { minute: 71, scorer: "Puskás", team: "away" },
      { minute: 72, scorer: "Stein", team: "home" },
      { minute: 73, scorer: "Di Stéfano", team: "away" },
      { minute: 75, scorer: "Stein", team: "home" }
    ],
    kitsNote: "Eintracht Frankfurt in red. Real Madrid in white. (Wikipedia, \"1960 European Cup final\".)",
    stats: null,
    source: "Wikipedia, \"1960 European Cup final\" (revision 1365529209), CC BY-SA 4.0"
  },
  {
    id: "1960-euro-final",
    competition: "UEFA Euro 1960",
    stage: "Final",
    date: "10 July 1960",
    venue: "Parc des Princes, Paris",
    home: { name: "Soviet Union", short: "SU", colour: "#9A9A9A", label: "Winners", kit: "soviet-union-1960" },
    away: { name: "Yugoslavia", short: "YUG", colour: "#1918FC", label: "Runners-up", kit: "yugoslavia-1960" },
    score: { home: 2, away: 1 },
    scoreNote: "After extra time.",
    extraTime: true,
    goals: [
      { minute: 43, scorer: "Galić", team: "away" },
      { minute: 49, scorer: "Metreveli", team: "home" },
      { minute: 113, scorer: "Ponedelnik", team: "home" }
    ],
    kitsNote: "Soviet Union in colours to be researched. Yugoslavia in royal blue. (Wikipedia, \"1960 European Nations' Cup final\".)",
    stats: null,
    source: "Wikipedia, \"1960 European Nations' Cup final\" (revision 1362214755), CC BY-SA 4.0"
  },
  {
    id: "1961-european-cup-final",
    competition: "European Cup 1961",
    stage: "Final",
    date: "31 May 1961",
    venue: "Wankdorf Stadium, Bern",
    home: { name: "Barcelona", short: "BAR", colour: "#AE1852", label: "Runners-up", kit: "barcelona-1961" },
    away: { name: "Benfica", short: "BEN", colour: "#E01817", label: "Winners", kit: "benfica-1961" },
    score: { home: 2, away: 3 },
    scoreNote: null,
    extraTime: false,
    goals: [
      { minute: 21, scorer: "Kocsis", team: "home" },
      { minute: 31, scorer: "Águas", team: "away" },
      { minute: 32, scorer: "Ramallets (own goal)", team: "away" },
      { minute: 55, scorer: "Coluna", team: "away" },
      { minute: 75, scorer: "Czibor", team: "home" }
    ],
    kitsNote: "Barcelona in dark red. Benfica in red. (Wikipedia, \"1961 European Cup final\".)",
    stats: null,
    source: "Wikipedia, \"1961 European Cup final\" (revision 1373560273), CC BY-SA 4.0"
  },
  {
    id: "1962-european-cup-final",
    competition: "European Cup 1962",
    stage: "Final",
    date: "2 May 1962",
    venue: "Olympisch Stadion, Amsterdam",
    home: { name: "Benfica", short: "BEN", colour: "#E01817", label: "Winners", kit: "benfica-1962" },
    away: { name: "Real Madrid", short: "RM", colour: "#6B23B8", label: "Runners-up", kit: "real-madrid-1962" },
    score: { home: 5, away: 3 },
    scoreNote: null,
    extraTime: false,
    goals: [
      { minute: 18, scorer: "Puskás", team: "away" },
      { minute: 23, scorer: "Puskás", team: "away" },
      { minute: 25, scorer: "Águas", team: "home" },
      { minute: 33, scorer: "Cavém", team: "home" },
      { minute: 39, scorer: "Puskás", team: "away" },
      { minute: 50, scorer: "Coluna", team: "home" },
      { minute: 64, scorer: "Eusébio (pen.)", team: "home" },
      { minute: 67, scorer: "Eusébio", team: "home" }
    ],
    kitsNote: "Benfica in red. Real Madrid in blue. (Wikipedia, \"1962 European Cup final\".)",
    stats: null,
    source: "Wikipedia, \"1962 European Cup final\" (revision 1373687178), CC BY-SA 4.0"
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
    id: "1963-european-cup-final",
    competition: "European Cup 1963",
    stage: "Final",
    date: "22 May 1963",
    venue: "Wembley Stadium, London",
    home: { name: "Benfica", short: "BEN", colour: "#E01817", label: "Runners-up", kit: "benfica-1963" },
    away: { name: "Milan", short: "MIL", colour: "#1B1A17", label: "Winners", kit: "milan-1963" },
    score: { home: 1, away: 2 },
    scoreNote: null,
    extraTime: false,
    goals: [
      { minute: 19, scorer: "Eusébio", team: "home" },
      { minute: 58, scorer: "Altafini", team: "away" },
      { minute: 66, scorer: "Altafini", team: "away" }
    ],
    kitsNote: "Benfica in red. Milan in white. (Wikipedia, \"1963 European Cup final\".)",
    stats: null,
    source: "Wikipedia, \"1963 European Cup final\" (revision 1373561433), CC BY-SA 4.0"
  },
  {
    id: "1964-european-cup-final",
    competition: "European Cup 1964",
    stage: "Final",
    date: "27 May 1964",
    venue: "Praterstadion, Vienna",
    home: { name: "Inter Milan", short: "IM", colour: "#4755CE", label: "Winners", kit: "inter-milan-1964" },
    away: { name: "Real Madrid", short: "RM", colour: "#1B1A17", label: "Runners-up", kit: "real-madrid-1964" },
    score: { home: 3, away: 1 },
    scoreNote: null,
    extraTime: false,
    goals: [
      { minute: 43, scorer: "Mazzola", team: "home" },
      { minute: 61, scorer: "Milani", team: "home" },
      { minute: 70, scorer: "Felo", team: "away" },
      { minute: 76, scorer: "Mazzola", team: "home" }
    ],
    kitsNote: "Inter Milan in blue. Real Madrid in white. (Wikipedia, \"1964 European Cup final\".)",
    stats: null,
    source: "Wikipedia, \"1964 European Cup final\" (revision 1373073389), CC BY-SA 4.0"
  },
  {
    id: "1964-euro-final",
    competition: "UEFA Euro 1964",
    stage: "Final",
    date: "21 June 1964",
    venue: "Santiago Bernabéu, Madrid",
    home: { name: "Spain", short: "ESP", colour: "#2867A9", label: "Winners", kit: "spain-1964" },
    away: { name: "Soviet Union", short: "SU", colour: "#FE1817", label: "Runners-up", kit: "soviet-union-1964" },
    score: { home: 2, away: 1 },
    scoreNote: null,
    extraTime: false,
    goals: [
      { minute: 6, scorer: "Pereda", team: "home" },
      { minute: 8, scorer: "Khusainov", team: "away" },
      { minute: 84, scorer: "Marcelino", team: "home" }
    ],
    kitsNote: "Spain in blue. Soviet Union in red. (Wikipedia, \"1964 European Nations' Cup final\".)",
    stats: null,
    source: "Wikipedia, \"1964 European Nations' Cup final\" (revision 1376409936), CC BY-SA 4.0"
  },
  {
    id: "1965-european-cup-final",
    competition: "European Cup 1965",
    stage: "Final",
    date: "27 May 1965",
    venue: "San Siro, Milan",
    home: { name: "Inter Milan", short: "IM", colour: "#1B1A17", label: "Winners", kit: "inter-milan-1965" },
    away: { name: "Benfica", short: "BEN", colour: "#E01817", label: "Runners-up", kit: "benfica-1965" },
    score: { home: 1, away: 0 },
    scoreNote: null,
    extraTime: false,
    goals: [
      { minute: 43, scorer: "Jair", team: "home" }
    ],
    kitsNote: "Inter Milan in white. Benfica in red. (Wikipedia, \"1965 European Cup final\".)",
    stats: null,
    source: "Wikipedia, \"1965 European Cup final\" (revision 1341287741), CC BY-SA 4.0"
  },
  {
    id: "1966-european-cup-final",
    competition: "European Cup 1966",
    stage: "Final",
    date: "11 May 1966",
    venue: "Heysel Stadium, Brussels",
    home: { name: "Real Madrid", short: "RM", colour: "#1B1A17", label: "Winners", kit: "real-madrid-1966" },
    away: { name: "Partizan", short: "PAR", colour: "#191817", label: "Runners-up", kit: "partizan-1966" },
    score: { home: 2, away: 1 },
    scoreNote: null,
    extraTime: false,
    goals: [
      { minute: 55, scorer: "Vasović", team: "away" },
      { minute: 70, scorer: "Amancio", team: "home" },
      { minute: 76, scorer: "Serena", team: "home" }
    ],
    kitsNote: "Real Madrid in white. Partizan in white. (Wikipedia, \"1966 European Cup final\".)",
    stats: null,
    source: "Wikipedia, \"1966 European Cup final\" (revision 1361274760), CC BY-SA 4.0"
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
    id: "1967-european-cup-final",
    competition: "European Cup 1967",
    stage: "Final",
    date: "25 May 1967",
    venue: "Estádio Nacional, Lisbon",
    home: { name: "Inter Milan", short: "IM", colour: "#4755CE", label: "Runners-up", kit: "inter-milan-1967" },
    away: { name: "Celtic", short: "CEL", colour: "#19AA17", label: "Winners", kit: "celtic-1967" },
    score: { home: 1, away: 2 },
    scoreNote: null,
    extraTime: false,
    goals: [
      { minute: 7, scorer: "Mazzola (pen.)", team: "home" },
      { minute: 63, scorer: "Gemmell", team: "away" },
      { minute: 84, scorer: "Chalmers", team: "away" }
    ],
    kitsNote: "Inter Milan in blue. Celtic in green. (Wikipedia, \"1967 European Cup final\".)",
    stats: null,
    source: "Wikipedia, \"1967 European Cup final\" (revision 1376033357), CC BY-SA 4.0"
  },
  {
    id: "1968-european-cup-final",
    competition: "European Cup 1968",
    stage: "Final",
    date: "29 May 1968",
    venue: "Wembley Stadium, London",
    home: { name: "Benfica", short: "BEN", colour: "#FE1817", label: "Runners-up", kit: "benfica-1968" },
    away: { name: "Manchester United", short: "MU", colour: "#1918C3", label: "Winners", kit: "manchester-united-1968" },
    score: { home: 1, away: 4 },
    scoreNote: "After extra time.",
    extraTime: true,
    goals: [
      { minute: 53, scorer: "Charlton", team: "away" },
      { minute: 79, scorer: "Graça", team: "home" },
      { minute: 92, scorer: "Best", team: "away" },
      { minute: 94, scorer: "Kidd", team: "away" },
      { minute: 99, scorer: "Charlton", team: "away" }
    ],
    kitsNote: "Benfica in red. Manchester United in royal blue. (Wikipedia, \"1968 European Cup final\".)",
    stats: null,
    source: "Wikipedia, \"1968 European Cup final\" (revision 1363144413), CC BY-SA 4.0"
  },
  {
    id: "1968-euro-final",
    competition: "UEFA Euro 1968",
    stage: "Final",
    date: "8 June 1968",
    venue: "Stadio Olimpico, Rome",
    home: { name: "Italy", short: "ITA", colour: "#1918FC", label: "Winners", kit: "italy-1968" },
    away: { name: "Yugoslavia", short: "YUG", colour: "#1B1A17", label: "Runners-up", kit: "yugoslavia-1968" },
    score: { home: 1, away: 1 },
    scoreNote: "After extra time.",
    extraTime: true,
    goals: [
      { minute: 39, scorer: "Džajić", team: "away" },
      { minute: 80, scorer: "Domenghini", team: "home" }
    ],
    kitsNote: "Italy in royal blue. Yugoslavia in white. (Wikipedia, \"UEFA Euro 1968 final\".)",
    stats: null,
    source: "Wikipedia, \"UEFA Euro 1968 final\" (revision 1377003009), CC BY-SA 4.0"
  },
  {
    id: "1968-euro-final-replay",
    competition: "UEFA Euro 1968",
    stage: "Final, replay",
    date: "10 June 1968",
    venue: "Stadio Olimpico, Rome",
    home: { name: "Italy", short: "ITA", colour: "#1918FC", label: "Winners", kit: "italy-1968" },
    away: { name: "Yugoslavia", short: "YUG", colour: "#1B1A17", label: "Runners-up", kit: "yugoslavia-1968" },
    score: { home: 2, away: 0 },
    scoreNote: null,
    extraTime: false,
    goals: [
      { minute: 12, scorer: "Riva", team: "home" },
      { minute: 31, scorer: "Anastasi", team: "home" }
    ],
    kitsNote: "Italy in royal blue. Yugoslavia in white. (Wikipedia, \"UEFA Euro 1968 final\".)",
    stats: null,
    source: "Wikipedia, \"UEFA Euro 1968 final\" (revision 1377003009), CC BY-SA 4.0"
  },
  {
    id: "1969-european-cup-final",
    competition: "European Cup 1969",
    stage: "Final",
    date: "28 May 1969",
    venue: "Santiago Bernabéu, Madrid",
    home: { name: "Ajax", short: "AJA", colour: "#FE1817", label: "Runners-up", kit: "ajax-1969" },
    away: { name: "Milan", short: "MIL", colour: "#1B1A17", label: "Winners", kit: "milan-1969" },
    score: { home: 1, away: 4 },
    scoreNote: null,
    extraTime: false,
    goals: [
      { minute: 7, scorer: "Prati", team: "away" },
      { minute: 39, scorer: "Prati", team: "away" },
      { minute: 61, scorer: "Vasović (pen.)", team: "home" },
      { minute: 66, scorer: "Sormani", team: "away" },
      { minute: 74, scorer: "Prati", team: "away" }
    ],
    kitsNote: "Ajax in red. Milan in red. (Wikipedia, \"1969 European Cup final\".)",
    stats: null,
    source: "Wikipedia, \"1969 European Cup final\" (revision 1361288619), CC BY-SA 4.0"
  },
  {
    id: "1970-european-cup-final",
    competition: "European Cup 1970",
    stage: "Final",
    date: "6 May 1970",
    venue: "San Siro, Milan",
    home: { name: "Feyenoord", short: "FEY", colour: "#E01817", label: "Winners", kit: "feyenoord-1970" },
    away: { name: "Celtic", short: "CEL", colour: "#19AA17", label: "Runners-up", kit: "celtic-1970" },
    score: { home: 2, away: 1 },
    scoreNote: "After extra time.",
    extraTime: true,
    goals: [
      { minute: 30, scorer: "Gemmell", team: "away" },
      { minute: 32, scorer: "Israël", team: "home" },
      { minute: 117, scorer: "Kindvall", team: "home" }
    ],
    kitsNote: "Feyenoord in white. Celtic in green. (Wikipedia, \"1970 European Cup final\".)",
    stats: null,
    source: "Wikipedia, \"1970 European Cup final\" (revision 1376856696), CC BY-SA 4.0"
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
    id: "1971-european-cup-final",
    competition: "European Cup 1971",
    stage: "Final",
    date: "2 June 1971",
    venue: "Wembley Stadium, London",
    home: { name: "Ajax", short: "AJA", colour: "#EE2120", label: "Winners", kit: "ajax-1971" },
    away: { name: "Panathinaikos", short: "PAN", colour: "#368D4C", label: "Runners-up", kit: "panathinaikos-1971" },
    score: { home: 2, away: 0 },
    scoreNote: null,
    extraTime: false,
    goals: [
      { minute: 5, scorer: "Van Dijk", team: "home" },
      { minute: 87, scorer: "Haan", team: "home" }
    ],
    kitsNote: "Ajax in red. Panathinaikos in green. (Wikipedia, \"1971 European Cup final\".)",
    stats: null,
    source: "Wikipedia, \"1971 European Cup final\" (revision 1376157999), CC BY-SA 4.0"
  },
  {
    id: "1972-european-cup-final",
    competition: "European Cup 1972",
    stage: "Final",
    date: "31 May 1972",
    venue: "De Kuip, Rotterdam",
    home: { name: "Inter Milan", short: "IM", colour: "#4755CE", label: "Runners-up", kit: "inter-milan-1972" },
    away: { name: "Ajax", short: "AJA", colour: "#EE2120", label: "Winners", kit: "ajax-1972" },
    score: { home: 0, away: 2 },
    scoreNote: null,
    extraTime: false,
    goals: [
      { minute: 47, scorer: "Cruyff", team: "away" },
      { minute: 78, scorer: "Cruyff", team: "away" }
    ],
    kitsNote: "Inter Milan in blue. Ajax in red. (Wikipedia, \"1972 European Cup final\".)",
    stats: null,
    source: "Wikipedia, \"1972 European Cup final\" (revision 1372192662), CC BY-SA 4.0"
  },
  {
    id: "1972-euro-final",
    competition: "UEFA Euro 1972",
    stage: "Final",
    date: "18 June 1972",
    venue: "Heysel Stadium, Brussels",
    home: { name: "West Germany", short: "FRG", colour: "#191817", label: "Winners", kit: "west-germany-1972" },
    away: { name: "Soviet Union", short: "SU", colour: "#FE1817", label: "Runners-up", kit: "soviet-union-1972" },
    score: { home: 3, away: 0 },
    scoreNote: null,
    extraTime: false,
    goals: [
      { minute: 27, scorer: "Müller", team: "home" },
      { minute: 52, scorer: "Wimmer", team: "home" },
      { minute: 58, scorer: "Müller", team: "home" }
    ],
    kitsNote: "West Germany in white. Soviet Union in red. (Wikipedia, \"UEFA Euro 1972 final\".)",
    stats: null,
    source: "Wikipedia, \"UEFA Euro 1972 final\" (revision 1353835776), CC BY-SA 4.0"
  },
  {
    id: "1973-european-cup-final",
    competition: "European Cup 1973",
    stage: "Final",
    date: "30 May 1973",
    venue: "Red Star Stadium, Belgrade",
    home: { name: "Ajax", short: "AJA", colour: "#FE1817", label: "Winners", kit: "ajax-1973" },
    away: { name: "Juventus", short: "JUV", colour: "#1B1A17", label: "Runners-up", kit: "juventus-1973" },
    score: { home: 1, away: 0 },
    scoreNote: null,
    extraTime: false,
    goals: [
      { minute: 5, scorer: "Rep", team: "home" }
    ],
    kitsNote: "Ajax in red. Juventus in white. (Wikipedia, \"1973 European Cup final\".)",
    stats: null,
    source: "Wikipedia, \"1973 European Cup final\" (revision 1375419483), CC BY-SA 4.0"
  },
  {
    id: "1974-european-cup-final",
    competition: "European Cup 1974",
    stage: "Final",
    date: "15 May 1974",
    venue: "Heysel Stadium, Brussels",
    home: { name: "Atlético Madrid", short: "AM", colour: "#E01817", label: "Runners-up", kit: "atletico-madrid-1974" },
    away: { name: "Bayern Munich", short: "BM", colour: "#1B1A17", label: "Winners", kit: "bayern-munich-1974" },
    score: { home: 1, away: 1 },
    scoreNote: "After extra time.",
    extraTime: true,
    goals: [
      { minute: 114, scorer: "Aragonés", team: "home" },
      { minute: 120, scorer: "Schwarzenbeck", team: "away" }
    ],
    kitsNote: "Atlético Madrid in white. Bayern Munich in white. (Wikipedia, \"1974 European Cup final\".)",
    stats: null,
    source: "Wikipedia, \"1974 European Cup final\" (revision 1369187755), CC BY-SA 4.0"
  },
  {
    id: "1974-european-cup-final-replay",
    competition: "European Cup 1974",
    stage: "Final, replay",
    date: "17 May 1974",
    venue: "Heysel Stadium, Brussels",
    home: { name: "Atlético Madrid", short: "AM", colour: "#E01817", label: "Runners-up", kit: "atletico-madrid-1974" },
    away: { name: "Bayern Munich", short: "BM", colour: "#1B1A17", label: "Winners", kit: "bayern-munich-1974" },
    score: { home: 0, away: 4 },
    scoreNote: null,
    extraTime: false,
    goals: [
      { minute: 28, scorer: "Hoeneß", team: "away" },
      { minute: 56, scorer: "Müller", team: "away" },
      { minute: 69, scorer: "Müller", team: "away" },
      { minute: 82, scorer: "Hoeneß", team: "away" }
    ],
    kitsNote: "Atlético Madrid in white. Bayern Munich in white. (Wikipedia, \"1974 European Cup final\".)",
    stats: null,
    source: "Wikipedia, \"1974 European Cup final\" (revision 1369187755), CC BY-SA 4.0"
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
    id: "1975-european-cup-final",
    competition: "European Cup 1975",
    stage: "Final",
    date: "28 May 1975",
    venue: "Parc des Princes, Paris",
    home: { name: "Bayern Munich", short: "BM", colour: "#FE1817", label: "Winners", kit: "bayern-munich-1975" },
    away: { name: "Leeds United", short: "LU", colour: "#1B1A17", label: "Runners-up", kit: "leeds-united-1975" },
    score: { home: 2, away: 0 },
    scoreNote: null,
    extraTime: false,
    goals: [
      { minute: 71, scorer: "Roth", team: "home" },
      { minute: 81, scorer: "Müller", team: "home" }
    ],
    kitsNote: "Bayern Munich in red. Leeds United in white. (Wikipedia, \"1975 European Cup final\".)",
    stats: null,
    source: "Wikipedia, \"1975 European Cup final\" (revision 1374021675), CC BY-SA 4.0"
  },
  {
    id: "1975-copa-america-final-first-leg",
    competition: "Copa América 1975",
    stage: "Final, first leg",
    date: "16 October 1975",
    venue: "Estadio El Campín, Bogotá",
    home: { name: "Colombia", short: "COL", colour: "#FE582E", label: "Runners-up", kit: "colombia-1975" },
    away: { name: "Peru", short: "PER", colour: "#E01817", label: "Winners", kit: "peru-1975" },
    score: { home: 1, away: 0 },
    scoreNote: null,
    extraTime: false,
    goals: [
      { minute: 38, scorer: "Castro", team: "home" }
    ],
    kitsNote: "Colombia in orange. Peru in white. (Wikipedia, \"1975 Copa América final\".)",
    stats: null,
    source: "Wikipedia, \"1975 Copa América final\" (revision 1364422315), CC BY-SA 4.0"
  },
  {
    id: "1975-copa-america-final-second-leg",
    competition: "Copa América 1975",
    stage: "Final, second leg",
    date: "22 October 1975",
    venue: "Estadio Nacional, Lima",
    home: { name: "Peru", short: "PER", colour: "#E01817", label: "Winners", kit: "peru-1975" },
    away: { name: "Colombia", short: "COL", colour: "#FE582E", label: "Runners-up", kit: "colombia-1975" },
    score: { home: 2, away: 0 },
    scoreNote: null,
    extraTime: false,
    goals: [
      { minute: 18, scorer: "Oblitas", team: "home" },
      { minute: 44, scorer: "Ramírez", team: "home" }
    ],
    kitsNote: "Peru in white. Colombia in orange. (Wikipedia, \"1975 Copa América final\".)",
    stats: null,
    source: "Wikipedia, \"1975 Copa América final\" (revision 1364422315), CC BY-SA 4.0"
  },
  {
    id: "1975-copa-america-final-play-off",
    competition: "Copa América 1975",
    stage: "Final, play-off",
    date: "28 October 1975",
    venue: "Estadio Olimpico",
    home: { name: "Peru", short: "PER", colour: "#E01817", label: "Winners", kit: "peru-1975" },
    away: { name: "Colombia", short: "COL", colour: "#FE582E", label: "Runners-up", kit: "colombia-1975" },
    score: { home: 1, away: 0 },
    scoreNote: null,
    extraTime: false,
    goals: [
      { minute: 25, scorer: "Sotil", team: "home" }
    ],
    kitsNote: "Peru in white. Colombia in orange. (Wikipedia, \"1975 Copa América final\".)",
    stats: null,
    source: "Wikipedia, \"1975 Copa América final\" (revision 1364422315), CC BY-SA 4.0"
  },
  {
    id: "1976-european-cup-final",
    competition: "European Cup 1976",
    stage: "Final",
    date: "12 May 1976",
    venue: "Hampden Park, Glasgow",
    home: { name: "Bayern Munich", short: "BM", colour: "#9A9A9A", label: "Winners", kit: "bayern-munich-1976" },
    away: { name: "Saint-Étienne", short: "SAI", colour: "#1B1A17", label: "Runners-up", kit: "saint-etienne-1976" },
    score: { home: 1, away: 0 },
    scoreNote: null,
    extraTime: false,
    goals: [
      { minute: 57, scorer: "Roth", team: "home" }
    ],
    kitsNote: "Bayern Munich in colours to be researched. Saint-Étienne in colours to be researched. (Wikipedia, \"1976 European Cup final\".)",
    stats: null,
    source: "Wikipedia, \"1976 European Cup final\" (revision 1341421817), CC BY-SA 4.0"
  },
  {
    id: "1976-euro-final",
    competition: "UEFA Euro 1976",
    stage: "Final",
    date: "20 June 1976",
    venue: "Red Star Stadium, Belgrade",
    home: { name: "Czechoslovakia", short: "TCH", colour: "#FE1817", label: "Winners", kit: "czechoslovakia-1976" },
    away: { name: "West Germany", short: "FRG", colour: "#191817", label: "Runners-up", kit: "west-germany-1976" },
    score: { home: 2, away: 2 },
    scoreNote: "After extra time. Czechoslovakia won 5–3 on penalties.",
    extraTime: true,
    goals: [
      { minute: 8, scorer: "Švehlík", team: "home" },
      { minute: 25, scorer: "Dobiaš", team: "home" },
      { minute: 28, scorer: "Müller", team: "away" },
      { minute: 89, scorer: "Hölzenbein", team: "away" }
    ],
    kitsNote: "Czechoslovakia in red. West Germany in white. (Wikipedia, \"UEFA Euro 1976 final\".)",
    stats: null,
    source: "Wikipedia, \"UEFA Euro 1976 final\" (revision 1377074927), CC BY-SA 4.0"
  },
  {
    id: "1977-european-cup-final",
    competition: "European Cup 1977",
    stage: "Final",
    date: "25 May 1977",
    venue: "Stadio Olimpico, Rome",
    home: { name: "BorussiaMönchengladbach", short: "BOR", colour: "#197217", label: "Runners-up", kit: "borussiamonchengladbach-1977" },
    away: { name: "Liverpool", short: "LIV", colour: "#E01817", label: "Winners", kit: "liverpool-1977" },
    score: { home: 1, away: 3 },
    scoreNote: null,
    extraTime: false,
    goals: [
      { minute: 28, scorer: "McDermott", team: "away" },
      { minute: 51, scorer: "Simonsen", team: "home" },
      { minute: 65, scorer: "Smith", team: "away" },
      { minute: 83, scorer: "Neal (pen.)", team: "away" }
    ],
    kitsNote: "BorussiaMönchengladbach in dark green. Liverpool in red. (Wikipedia, \"1977 European Cup final\".)",
    stats: null,
    source: "Wikipedia, \"1977 European Cup final\" (revision 1361364510), CC BY-SA 4.0"
  },
  {
    id: "1978-european-cup-final",
    competition: "European Cup 1978",
    stage: "Final",
    date: "10 May 1978",
    venue: "Wembley Stadium, London",
    home: { name: "Club Brugge", short: "CLU", colour: "#1B1A17", label: "Runners-up", kit: "club-brugge-1978" },
    away: { name: "Liverpool", short: "LIV", colour: "#E01817", label: "Winners", kit: "liverpool-1978" },
    score: { home: 0, away: 1 },
    scoreNote: null,
    extraTime: false,
    goals: [
      { minute: 64, scorer: "Dalglish", team: "away" }
    ],
    kitsNote: "Club Brugge in white. Liverpool in red. (Wikipedia, \"1978 European Cup final\".)",
    stats: null,
    source: "Wikipedia, \"1978 European Cup final\" (revision 1362371812), CC BY-SA 4.0"
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
    id: "1979-european-cup-final",
    competition: "European Cup 1979",
    stage: "Final",
    date: "30 May 1979",
    venue: "Olympiastadion, Munich",
    home: { name: "Malmö FF", short: "MF", colour: "#92D2F8", label: "Runners-up", kit: "malmo-ff-1979" },
    away: { name: "Nottingham Forest", short: "NF", colour: "#E01817", label: "Winners", kit: "nottingham-forest-1979" },
    score: { home: 0, away: 1 },
    scoreNote: null,
    extraTime: false,
    goals: [
      { minute: 46, scorer: "Francis", team: "away" }
    ],
    kitsNote: "Malmö FF in sky blue. Nottingham Forest in red. (Wikipedia, \"1979 European Cup final\".)",
    stats: null,
    source: "Wikipedia, \"1979 European Cup final\" (revision 1378795357), CC BY-SA 4.0"
  },
  {
    id: "1979-copa-america-final-first-leg",
    competition: "Copa América 1979",
    stage: "Final, first leg",
    date: "28 November 1979",
    venue: "Defensores del Chaco",
    home: { name: "Paraguay", short: "PAR", colour: "#FE1817", label: "Winners", kit: "paraguay-1979" },
    away: { name: "Chile", short: "CHI", colour: "#2D5BCA", label: "Runners-up", kit: "chile-1979" },
    score: { home: 3, away: 0 },
    scoreNote: null,
    extraTime: false,
    goals: [
      { minute: 12, scorer: "Romerito", team: "home" },
      { minute: 36, scorer: "M. Morel", team: "home" },
      { minute: 85, scorer: "Romerito", team: "home" }
    ],
    kitsNote: "Paraguay in red. Chile in blue. (Wikipedia, \"1979 Copa América final\".)",
    stats: null,
    source: "Wikipedia, \"1979 Copa América final\" (revision 1369752698), CC BY-SA 4.0"
  },
  {
    id: "1979-copa-america-final-second-leg",
    competition: "Copa América 1979",
    stage: "Final, second leg",
    date: "5 December 1979",
    venue: "Estadio Nacional",
    home: { name: "Chile", short: "CHI", colour: "#2D5BCA", label: "Runners-up", kit: "chile-1979" },
    away: { name: "Paraguay", short: "PAR", colour: "#FE1817", label: "Winners", kit: "paraguay-1979" },
    score: { home: 1, away: 0 },
    scoreNote: null,
    extraTime: false,
    goals: [
      { minute: 10, scorer: "Rivas", team: "home" }
    ],
    kitsNote: "Chile in blue. Paraguay in red. (Wikipedia, \"1979 Copa América final\".)",
    stats: null,
    source: "Wikipedia, \"1979 Copa América final\" (revision 1369752698), CC BY-SA 4.0"
  },
  {
    id: "1979-copa-america-final-play-off",
    competition: "Copa América 1979",
    stage: "Final, play-off",
    date: "11 December 1979",
    venue: "José Amalfitani Stadium",
    home: { name: "Paraguay", short: "PAR", colour: "#FE1817", label: "Winners", kit: "paraguay-1979" },
    away: { name: "Chile", short: "CHI", colour: "#2D5BCA", label: "Runners-up", kit: "chile-1979" },
    score: { home: 0, away: 0 },
    scoreNote: "After extra time.",
    extraTime: true,
    goals: [],
    kitsNote: "Paraguay in red. Chile in blue. (Wikipedia, \"1979 Copa América final\".)",
    stats: null,
    source: "Wikipedia, \"1979 Copa América final\" (revision 1369752698), CC BY-SA 4.0"
  },
  {
    id: "1980-european-cup-final",
    competition: "European Cup 1980",
    stage: "Final",
    date: "28 May 1980",
    venue: "Santiago Bernabéu Stadium, Madrid",
    home: { name: "Nottingham Forest", short: "NF", colour: "#E01817", label: "Winners", kit: "nottingham-forest-1980" },
    away: { name: "Hamburger SV", short: "HS", colour: "#9A9A9A", label: "Runners-up", kit: "hamburger-sv-1980" },
    score: { home: 1, away: 0 },
    scoreNote: null,
    extraTime: false,
    goals: [
      { minute: 20, scorer: "Robertson", team: "home" }
    ],
    kitsNote: "Nottingham Forest in red. Hamburger SV in colours to be researched. (Wikipedia, \"1980 European Cup final\".)",
    stats: null,
    source: "Wikipedia, \"1980 European Cup final\" (revision 1375793285), CC BY-SA 4.0"
  },
  {
    id: "1980-euro-final",
    competition: "UEFA Euro 1980",
    stage: "Final",
    date: "22 June 1980",
    venue: "Stadio Olimpico, Rome",
    home: { name: "Belgium", short: "BEL", colour: "#FEFE17", label: "Runners-up", kit: "belgium-1980" },
    away: { name: "West Germany", short: "FRG", colour: "#1B1A17", label: "Winners", kit: "west-germany-1980" },
    score: { home: 1, away: 2 },
    scoreNote: null,
    extraTime: false,
    goals: [
      { minute: 10, scorer: "Hrubesch", team: "away" },
      { minute: 75, scorer: "Vandereycken (pen.)", team: "home" },
      { minute: 88, scorer: "Hrubesch", team: "away" }
    ],
    kitsNote: "Belgium in yellow. West Germany in white. (Wikipedia, \"UEFA Euro 1980 final\".)",
    stats: null,
    source: "Wikipedia, \"UEFA Euro 1980 final\" (revision 1314321703), CC BY-SA 4.0"
  },
  {
    id: "1981-european-cup-final",
    competition: "European Cup 1981",
    stage: "Final",
    date: "27 May 1981",
    venue: "Parc des Princes, Paris",
    home: { name: "Real Madrid", short: "RM", colour: "#1B1A17", label: "Runners-up", kit: "real-madrid-1981" },
    away: { name: "Liverpool", short: "LIV", colour: "#E01817", label: "Winners", kit: "liverpool-1981" },
    score: { home: 0, away: 1 },
    scoreNote: null,
    extraTime: false,
    goals: [
      { minute: 82, scorer: "A. Kennedy", team: "away" }
    ],
    kitsNote: "Real Madrid in white. Liverpool in red. (Wikipedia, \"1981 European Cup final\".)",
    stats: null,
    source: "Wikipedia, \"1981 European Cup final\" (revision 1373634714), CC BY-SA 4.0"
  },
  {
    id: "1982-european-cup-final",
    competition: "European Cup 1982",
    stage: "Final",
    date: "26 May 1982",
    venue: "De Kuip, Rotterdam",
    home: { name: "Bayern Munich", short: "BM", colour: "#FE1817", label: "Runners-up", kit: "bayern-munich-1982" },
    away: { name: "Aston Villa", short: "AV", colour: "#A11855", label: "Winners", kit: "aston-villa-1982" },
    score: { home: 0, away: 1 },
    scoreNote: null,
    extraTime: false,
    goals: [
      { minute: 67, scorer: "Withe", team: "away" }
    ],
    kitsNote: "Bayern Munich in red. Aston Villa in dark red. (Wikipedia, \"1982 European Cup final\".)",
    stats: null,
    source: "Wikipedia, \"1982 European Cup final\" (revision 1378383958), CC BY-SA 4.0"
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
    id: "1983-european-cup-final",
    competition: "European Cup 1983",
    stage: "Final",
    date: "25 May 1983",
    venue: "Olympic Stadium, Athens",
    home: { name: "Hamburger SV", short: "HS", colour: "#E01817", label: "Winners", kit: "hamburger-sv-1983" },
    away: { name: "Juventus", short: "JUV", colour: "#1B1A17", label: "Runners-up", kit: "juventus-1983" },
    score: { home: 1, away: 0 },
    scoreNote: null,
    extraTime: false,
    goals: [
      { minute: 9, scorer: "Magath", team: "home" }
    ],
    kitsNote: "Hamburger SV in red. Juventus in white. (Wikipedia, \"1983 European Cup final\".)",
    stats: null,
    source: "Wikipedia, \"1983 European Cup final\" (revision 1375960215), CC BY-SA 4.0"
  },
  {
    id: "1983-copa-america-final-first-leg",
    competition: "Copa América 1983",
    stage: "Final, first leg",
    date: "27 October 1983",
    venue: "Estadio Centenario",
    home: { name: "Uruguay", short: "URU", colour: "#92D2F8", label: "Winners", kit: "uruguay-1983" },
    away: { name: "Brazil", short: "BRA", colour: "#FED017", label: "Runners-up", kit: "brazil-1983" },
    score: { home: 2, away: 0 },
    scoreNote: null,
    extraTime: false,
    goals: [
      { minute: 41, scorer: "Francescoli", team: "home" },
      { minute: 80, scorer: "Diogo", team: "home" }
    ],
    kitsNote: "Uruguay in sky blue. Brazil in yellow. (Wikipedia, \"1983 Copa América final\".)",
    stats: null,
    source: "Wikipedia, \"1983 Copa América final\" (revision 1377305187), CC BY-SA 4.0"
  },
  {
    id: "1983-copa-america-final-second-leg",
    competition: "Copa América 1983",
    stage: "Final, second leg",
    date: "4 November 1983",
    venue: "Estádio Fonte Nova",
    home: { name: "Brazil", short: "BRA", colour: "#FED017", label: "Runners-up", kit: "brazil-1983" },
    away: { name: "Uruguay", short: "URU", colour: "#92D2F8", label: "Winners", kit: "uruguay-1983" },
    score: { home: 1, away: 1 },
    scoreNote: null,
    extraTime: false,
    goals: [
      { minute: 23, scorer: "Jorginho", team: "home" },
      { minute: 77, scorer: "Aguilera", team: "away" }
    ],
    kitsNote: "Brazil in yellow. Uruguay in sky blue. (Wikipedia, \"1983 Copa América final\".)",
    stats: null,
    source: "Wikipedia, \"1983 Copa América final\" (revision 1377305187), CC BY-SA 4.0"
  },
  {
    id: "1984-european-cup-final",
    competition: "European Cup 1984",
    stage: "Final",
    date: "30 May 1984",
    venue: "Stadio Olimpico, Rome",
    home: { name: "Liverpool", short: "LIV", colour: "#E01817", label: "Winners", kit: "liverpool-1984" },
    away: { name: "Roma", short: "ROM", colour: "#E31C2F", label: "Runners-up", kit: "roma-1984" },
    score: { home: 1, away: 1 },
    scoreNote: "After extra time. Liverpool won 4–2 on penalties.",
    extraTime: true,
    goals: [
      { minute: 13, scorer: "Neal", team: "home" },
      { minute: 42, scorer: "Pruzzo", team: "away" }
    ],
    kitsNote: "Liverpool in red. Roma in red. (Wikipedia, \"1984 European Cup final\".)",
    stats: null,
    source: "Wikipedia, \"1984 European Cup final\" (revision 1378706546), CC BY-SA 4.0"
  },
  {
    id: "1984-euro-final",
    competition: "UEFA Euro 1984",
    stage: "Final",
    date: "27 June 1984",
    venue: "Parc des Princes, Paris",
    home: { name: "France", short: "FRA", colour: "#1918A0", label: "Winners", kit: "france-1984" },
    away: { name: "Spain", short: "ESP", colour: "#EA1928", label: "Runners-up", kit: "spain-1984" },
    score: { home: 2, away: 0 },
    scoreNote: null,
    extraTime: false,
    goals: [
      { minute: 57, scorer: "Platini", team: "home" },
      { minute: 90, scorer: "Bellone", team: "home" }
    ],
    kitsNote: "France in royal blue. Spain in red. (Wikipedia, \"UEFA Euro 1984 final\".)",
    stats: null,
    source: "Wikipedia, \"UEFA Euro 1984 final\" (revision 1365864357), CC BY-SA 4.0"
  },
  {
    id: "1985-european-cup-final",
    competition: "European Cup 1985",
    stage: "Final",
    date: "29 May 1985",
    venue: "Heysel Stadium, Brussels",
    home: { name: "Liverpool", short: "LIV", colour: "#E01817", label: "Runners-up", kit: "liverpool-1985" },
    away: { name: "Juventus", short: "JUV", colour: "#1B1A17", label: "Winners", kit: "juventus-1985" },
    score: { home: 0, away: 1 },
    scoreNote: null,
    extraTime: false,
    goals: [
      { minute: 58, scorer: "Platini (pen.)", team: "away" }
    ],
    kitsNote: "Liverpool in red. Juventus in white. (Wikipedia, \"1985 European Cup final\".)",
    stats: null,
    source: "Wikipedia, \"1985 European Cup final\" (revision 1374178815), CC BY-SA 4.0"
  },
  {
    id: "1986-european-cup-final",
    competition: "European Cup 1986",
    stage: "Final",
    date: "7 May 1986",
    venue: "Ramón Sánchez Pizjuán, Seville",
    home: { name: "Barcelona", short: "BAR", colour: "#198AFC", label: "Runners-up", kit: "barcelona-1986" },
    away: { name: "Steaua București", short: "SB", colour: "#E01817", label: "Winners", kit: "steaua-bucuresti-1986" },
    score: { home: 0, away: 0 },
    scoreNote: "After extra time. Steaua București won 2–0 on penalties.",
    extraTime: true,
    goals: [],
    kitsNote: "Barcelona in blue. Steaua București in white. (Wikipedia, \"1986 European Cup final\".)",
    stats: null,
    source: "Wikipedia, \"1986 European Cup final\" (revision 1368509580), CC BY-SA 4.0"
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
    id: "1987-european-cup-final",
    competition: "European Cup 1987",
    stage: "Final",
    date: "27 May 1987",
    venue: "Praterstadion, Vienna",
    home: { name: "Bayern Munich", short: "BM", colour: "#E01817", label: "Runners-up", kit: "bayern-munich-1987" },
    away: { name: "Porto", short: "POR", colour: "#1B1A17", label: "Winners", kit: "porto-1987" },
    score: { home: 1, away: 2 },
    scoreNote: null,
    extraTime: false,
    goals: [
      { minute: 25, scorer: "Kögl", team: "home" },
      { minute: 77, scorer: "Madjer", team: "away" },
      { minute: 80, scorer: "Juary", team: "away" }
    ],
    kitsNote: "Bayern Munich in red. Porto in white. (Wikipedia, \"1987 European Cup final\".)",
    stats: null,
    source: "Wikipedia, \"1987 European Cup final\" (revision 1359890308), CC BY-SA 4.0"
  },
  {
    id: "1987-copa-america-final",
    competition: "Copa América 1987",
    stage: "Final",
    date: "12 July 1987",
    venue: "Estadio Monumental",
    home: { name: "Uruguay", short: "URU", colour: "#92D2F8", label: "Winners", kit: "uruguay-1987" },
    away: { name: "Chile", short: "CHI", colour: "#FE1817", label: "Runners-up", kit: "chile-1987" },
    score: { home: 1, away: 0 },
    scoreNote: null,
    extraTime: false,
    goals: [
      { minute: 56, scorer: "Bengoechea", team: "home" }
    ],
    kitsNote: "Uruguay in sky blue. Chile in red. (Wikipedia, \"1987 Copa América final\".)",
    stats: null,
    source: "Wikipedia, \"1987 Copa América final\" (revision 1342340522), CC BY-SA 4.0"
  },
  {
    id: "1988-european-cup-final",
    competition: "European Cup 1988",
    stage: "Final",
    date: "25 May 1988",
    venue: "Neckarstadion, Stuttgart",
    home: { name: "PSV Eindhoven", short: "PE", colour: "#1B1A17", label: "Winners", kit: "psv-eindhoven-1988" },
    away: { name: "Benfica", short: "BEN", colour: "#E01817", label: "Runners-up", kit: "benfica-1988" },
    score: { home: 0, away: 0 },
    scoreNote: "After extra time. PSV Eindhoven won 6–5 on penalties.",
    extraTime: true,
    goals: [],
    kitsNote: "PSV Eindhoven in white. Benfica in red. (Wikipedia, \"1988 European Cup final\".)",
    stats: null,
    source: "Wikipedia, \"1988 European Cup final\" (revision 1371246319), CC BY-SA 4.0"
  },
  {
    id: "1988-euro-final",
    competition: "UEFA Euro 1988",
    stage: "Final",
    date: "25 June 1988",
    venue: "Olympiastadion, Munich",
    home: { name: "Soviet Union", short: "SU", colour: "#E01817", label: "Runners-up", kit: "soviet-union-1988" },
    away: { name: "Netherlands", short: "NED", colour: "#F47017", label: "Winners", kit: "netherlands-1988" },
    score: { home: 0, away: 2 },
    scoreNote: null,
    extraTime: false,
    goals: [
      { minute: 32, scorer: "Gullit", team: "away" },
      { minute: 53, scorer: "Van Basten", team: "away" }
    ],
    kitsNote: "Soviet Union in white. Netherlands in orange. (Wikipedia, \"UEFA Euro 1988 final\".)",
    stats: null,
    source: "Wikipedia, \"UEFA Euro 1988 final\" (revision 1366441037), CC BY-SA 4.0"
  },
  {
    id: "1989-european-cup-final",
    competition: "European Cup 1989",
    stage: "Final",
    date: "24 May 1989",
    venue: "Camp Nou, Barcelona",
    home: { name: "Steaua București", short: "SB", colour: "#19188A", label: "Runners-up", kit: "steaua-bucuresti-1989" },
    away: { name: "Milan", short: "MIL", colour: "#1B1A17", label: "Winners", kit: "milan-1989" },
    score: { home: 0, away: 4 },
    scoreNote: null,
    extraTime: false,
    goals: [
      { minute: 18, scorer: "Gullit", team: "away" },
      { minute: 28, scorer: "Van Basten", team: "away" },
      { minute: 38, scorer: "Gullit", team: "away" },
      { minute: 46, scorer: "Van Basten", team: "away" }
    ],
    kitsNote: "Steaua București in navy. Milan in white. (Wikipedia, \"1989 European Cup final\".)",
    stats: null,
    source: "Wikipedia, \"1989 European Cup final\" (revision 1377232760), CC BY-SA 4.0"
  },
  {
    id: "1990-european-cup-final",
    competition: "European Cup 1990",
    stage: "Final",
    date: "23 May 1990",
    venue: "Praterstadion, Vienna",
    home: { name: "Milan", short: "MIL", colour: "#1B1A17", label: "Winners", kit: "milan-1990" },
    away: { name: "Benfica", short: "BEN", colour: "#E01817", label: "Runners-up", kit: "benfica-1990" },
    score: { home: 1, away: 0 },
    scoreNote: null,
    extraTime: false,
    goals: [
      { minute: 67, scorer: "Rijkaard", team: "home" }
    ],
    kitsNote: "Milan in white. Benfica in red. (Wikipedia, \"1990 European Cup final\".)",
    stats: null,
    source: "Wikipedia, \"1990 European Cup final\" (revision 1377406757), CC BY-SA 4.0"
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
    id: "1991-european-cup-final",
    competition: "European Cup 1991",
    stage: "Final",
    date: "29 May 1991",
    venue: "Stadio San Nicola, Bari",
    home: { name: "Red Star Belgrade", short: "RSB", colour: "#E01817", label: "Winners", kit: "red-star-belgrade-1991" },
    away: { name: "Marseille", short: "MAR", colour: "#1B1A17", label: "Runners-up", kit: "marseille-1991" },
    score: { home: 0, away: 0 },
    scoreNote: "After extra time. Red Star Belgrade won 5–3 on penalties.",
    extraTime: true,
    goals: [],
    kitsNote: "Red Star Belgrade in red. Marseille in white. (Wikipedia, \"1991 European Cup final\".)",
    stats: null,
    source: "Wikipedia, \"1991 European Cup final\" (revision 1359919240), CC BY-SA 4.0"
  },
  {
    id: "1992-european-cup-final",
    competition: "European Cup 1992",
    stage: "Final",
    date: "20 May 1992",
    venue: "Wembley Stadium, London",
    home: { name: "Barcelona", short: "BAR", colour: "#FE8B17", label: "Winners", kit: "barcelona-1992" },
    away: { name: "Sampdoria", short: "SAM", colour: "#1B1A17", label: "Runners-up", kit: "sampdoria-1992" },
    score: { home: 1, away: 0 },
    scoreNote: "After extra time.",
    extraTime: true,
    goals: [
      { minute: 112, scorer: "Koeman", team: "home" }
    ],
    kitsNote: "Barcelona in orange. Sampdoria in white. (Wikipedia, \"1992 European Cup final\".)",
    stats: null,
    source: "Wikipedia, \"1992 European Cup final\" (revision 1376641569), CC BY-SA 4.0"
  },
  {
    id: "1992-euro-final",
    competition: "UEFA Euro 1992",
    stage: "Final",
    date: "26 June 1992",
    venue: "Ullevi, Gothenburg",
    home: { name: "Denmark", short: "DEN", colour: "#FE1817", label: "Winners", kit: "denmark-1992" },
    away: { name: "Germany", short: "GER", colour: "#1B1A17", label: "Runners-up", kit: "germany-1992" },
    score: { home: 2, away: 0 },
    scoreNote: null,
    extraTime: false,
    goals: [
      { minute: 18, scorer: "Jensen", team: "home" },
      { minute: 78, scorer: "Vilfort", team: "home" }
    ],
    kitsNote: "Denmark in red. Germany in white. (Wikipedia, \"UEFA Euro 1992 final\".)",
    stats: null,
    source: "Wikipedia, \"UEFA Euro 1992 final\" (revision 1368657278), CC BY-SA 4.0"
  },
  {
    id: "1993-champions-league-final",
    competition: "UEFA Champions League 1993",
    stage: "Final",
    date: "26 May 1993",
    venue: "Olympiastadion, Munich",
    home: { name: "Marseille", short: "MAR", colour: "#1B1A17", label: "Winners", kit: "marseille-1993" },
    away: { name: "Milan", short: "MIL", colour: "#191817", label: "Runners-up", kit: "milan-1993" },
    score: { home: 1, away: 0 },
    scoreNote: null,
    extraTime: false,
    goals: [
      { minute: 44, scorer: "Boli", team: "home" }
    ],
    kitsNote: "Marseille in white. Milan in black. (Wikipedia, \"1993 UEFA Champions League final\".)",
    stats: null,
    source: "Wikipedia, \"1993 UEFA Champions League final\" (revision 1373442559), CC BY-SA 4.0"
  },
  {
    id: "1993-copa-america-final",
    competition: "Copa América 1993",
    stage: "Final",
    date: "4 July 1993",
    venue: "Estadio Monumental, Guayaquil",
    home: { name: "Argentina", short: "ARG", colour: "#7DB8E0", label: "Winners", kit: "argentina-1993" },
    away: { name: "Mexico", short: "MEX", colour: "#198B17", label: "Runners-up", kit: "mexico-1993" },
    score: { home: 2, away: 1 },
    scoreNote: null,
    extraTime: false,
    goals: [
      { minute: 63, scorer: "Batistuta", team: "home" },
      { minute: 67, scorer: "Galindo (pen.)", team: "away" },
      { minute: 74, scorer: "Batistuta", team: "home" }
    ],
    kitsNote: "Argentina in sky blue and white vertical stripes. Mexico in green. (Wikipedia, \"1993 Copa América final\".)",
    stats: null,
    source: "Wikipedia, \"1993 Copa América final\" (revision 1367408900), CC BY-SA 4.0"
  },
  {
    id: "1994-champions-league-final",
    competition: "UEFA Champions League 1994",
    stage: "Final",
    date: "18 May 1994",
    venue: "Olympic Stadium, Athens",
    home: { name: "Milan", short: "MIL", colour: "#1B1A17", label: "Winners", kit: "milan-1994" },
    away: { name: "Barcelona", short: "BAR", colour: "#A51817", label: "Runners-up", kit: "barcelona-1994" },
    score: { home: 4, away: 0 },
    scoreNote: null,
    extraTime: false,
    goals: [
      { minute: 22, scorer: "Massaro", team: "home" },
      { minute: 47, scorer: "Massaro", team: "home" },
      { minute: 47, scorer: "Savićević", team: "home" },
      { minute: 58, scorer: "Desailly", team: "home" }
    ],
    kitsNote: "Milan in white. Barcelona in dark red. (Wikipedia, \"1994 UEFA Champions League final\".)",
    stats: null,
    source: "Wikipedia, \"1994 UEFA Champions League final\" (revision 1375960154), CC BY-SA 4.0"
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
    id: "1995-champions-league-final",
    competition: "UEFA Champions League 1995",
    stage: "Final",
    date: "24 May 1995",
    venue: "Ernst-Happel-Stadion, Vienna",
    home: { name: "Ajax", short: "AJA", colour: "#353A5B", label: "Winners", kit: "ajax-1995" },
    away: { name: "Milan", short: "MIL", colour: "#FE1817", label: "Runners-up", kit: "milan-1995" },
    score: { home: 1, away: 0 },
    scoreNote: null,
    extraTime: false,
    goals: [
      { minute: 85, scorer: "Kluivert", team: "home" }
    ],
    kitsNote: "Ajax in dark blue. Milan in red. (Wikipedia, \"1995 UEFA Champions League final\".)",
    stats: null,
    source: "Wikipedia, \"1995 UEFA Champions League final\" (revision 1359481098), CC BY-SA 4.0"
  },
  {
    id: "1995-copa-america-final",
    competition: "Copa América 1995",
    stage: "Final",
    date: "23 July 1995",
    venue: "Estadio Centenario, Montevideo",
    home: { name: "Uruguay", short: "URU", colour: "#7CA8F5", label: "Winners", kit: "uruguay-1995" },
    away: { name: "Brazil", short: "BRA", colour: "#FEFE17", label: "Runners-up", kit: "brazil-1995" },
    score: { home: 1, away: 1 },
    scoreNote: "Uruguay won 5–3 on penalties.",
    extraTime: false,
    goals: [
      { minute: 30, scorer: "Túlio", team: "away" },
      { minute: 51, scorer: "Bengoechea", team: "home" }
    ],
    kitsNote: "Uruguay in light blue. Brazil in yellow. (Wikipedia, \"1995 Copa América final\".)",
    stats: null,
    source: "Wikipedia, \"1995 Copa América final\" (revision 1349684504), CC BY-SA 4.0"
  },
  {
    id: "1996-champions-league-final",
    competition: "UEFA Champions League 1996",
    stage: "Final",
    date: "22 May 1996",
    venue: "Stadio Olimpico, Rome",
    home: { name: "Ajax", short: "AJA", colour: "#FE1817", label: "Runners-up", kit: "ajax-1996" },
    away: { name: "Juventus", short: "JUV", colour: "#1C40B9", label: "Winners", kit: "juventus-1996" },
    score: { home: 1, away: 1 },
    scoreNote: "After extra time. Juventus won 4–2 on penalties.",
    extraTime: true,
    goals: [
      { minute: 12, scorer: "Ravanelli", team: "away" },
      { minute: 41, scorer: "Litmanen", team: "home" }
    ],
    kitsNote: "Ajax in red. Juventus in royal blue. (Wikipedia, \"1996 UEFA Champions League final\".)",
    stats: null,
    source: "Wikipedia, \"1996 UEFA Champions League final\" (revision 1363277579), CC BY-SA 4.0"
  },
  {
    id: "1996-euro-final",
    competition: "UEFA Euro 1996",
    stage: "Final",
    date: "30 June 1996",
    venue: "Wembley Stadium, London",
    home: { name: "Czech Republic", short: "CR", colour: "#FE1817", label: "Runners-up", kit: "czech-republic-1996" },
    away: { name: "Germany", short: "GER", colour: "#1B1A17", label: "Winners", kit: "germany-1996" },
    score: { home: 1, away: 2 },
    scoreNote: null,
    extraTime: false,
    goals: [
      { minute: 59, scorer: "Berger (pen.)", team: "home" },
      { minute: 73, scorer: "Bierhoff", team: "away" }
    ],
    kitsNote: "Czech Republic in red. Germany in white. (Wikipedia, \"UEFA Euro 1996 final\".)",
    stats: null,
    source: "Wikipedia, \"UEFA Euro 1996 final\" (revision 1369018433), CC BY-SA 4.0"
  },
  {
    id: "1997-champions-league-final",
    competition: "UEFA Champions League 1997",
    stage: "Final",
    date: "28 May 1997",
    venue: "Olympiastadion, Munich",
    home: { name: "Borussia Dortmund", short: "BD", colour: "#FEFE17", label: "Winners", kit: "borussia-dortmund-1997" },
    away: { name: "Juventus", short: "JUV", colour: "#1C40B9", label: "Runners-up", kit: "juventus-1997" },
    score: { home: 3, away: 1 },
    scoreNote: null,
    extraTime: false,
    goals: [
      { minute: 29, scorer: "Riedle", team: "home" },
      { minute: 34, scorer: "Riedle", team: "home" },
      { minute: 65, scorer: "Del Piero", team: "away" },
      { minute: 71, scorer: "Ricken", team: "home" }
    ],
    kitsNote: "Borussia Dortmund in yellow. Juventus in royal blue. (Wikipedia, \"1997 UEFA Champions League final\".)",
    stats: null,
    source: "Wikipedia, \"1997 UEFA Champions League final\" (revision 1370720103), CC BY-SA 4.0"
  },
  {
    id: "1997-copa-america-final",
    competition: "Copa América 1997",
    stage: "Final",
    date: "29 June 1997",
    venue: "Estadio Hernando Siles, La Paz",
    home: { name: "Brazil", short: "BRA", colour: "#FEDF17", label: "Winners", kit: "brazil-1997" },
    away: { name: "Bolivia", short: "BOL", colour: "#199C32", label: "Runners-up", kit: "bolivia-1997" },
    score: { home: 3, away: 1 },
    scoreNote: null,
    extraTime: false,
    goals: [
      { minute: 40, scorer: "Denílson", team: "home" },
      { minute: 45, scorer: "E. Sánchez", team: "away" },
      { minute: 79, scorer: "Ronaldo", team: "home" },
      { minute: 90, scorer: "Zé Roberto", team: "home" }
    ],
    kitsNote: "Brazil in yellow. Bolivia in green. (Wikipedia, \"1997 Copa América final\".)",
    stats: null,
    source: "Wikipedia, \"1997 Copa América final\" (revision 1342340450), CC BY-SA 4.0"
  },
  {
    id: "1998-champions-league-final",
    competition: "UEFA Champions League 1998",
    stage: "Final",
    date: "20 May 1998",
    venue: "Amsterdam Arena, Amsterdam",
    home: { name: "Juventus", short: "JUV", colour: "#191817", label: "Runners-up", kit: "juventus-1998" },
    away: { name: "Real Madrid", short: "RM", colour: "#1B1A17", label: "Winners", kit: "real-madrid-1998" },
    score: { home: 0, away: 1 },
    scoreNote: null,
    extraTime: false,
    goals: [
      { minute: 66, scorer: "Mijatović", team: "away" }
    ],
    kitsNote: "Juventus in black. Real Madrid in white. (Wikipedia, \"1998 UEFA Champions League final\".)",
    stats: null,
    source: "Wikipedia, \"1998 UEFA Champions League final\" (revision 1372817461), CC BY-SA 4.0"
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
    id: "1999-champions-league-final",
    competition: "UEFA Champions League 1999",
    stage: "Final",
    date: "26 May 1999",
    venue: "Camp Nou, Barcelona",
    home: { name: "Manchester United", short: "MU", colour: "#E42523", label: "Winners", kit: "manchester-united-1999" },
    away: { name: "Bayern Munich", short: "BM", colour: "#1B1A17", label: "Runners-up", kit: "bayern-munich-1999" },
    score: { home: 2, away: 1 },
    scoreNote: null,
    extraTime: false,
    goals: [
      { minute: 6, scorer: "Basler", team: "away" },
      { minute: 91, scorer: "Sheringham", team: "home" },
      { minute: 93, scorer: "Solskjær", team: "home" }
    ],
    kitsNote: "Manchester United in red. Bayern Munich in white. (Wikipedia, \"1999 UEFA Champions League final\".)",
    stats: null,
    source: "Wikipedia, \"1999 UEFA Champions League final\" (revision 1376621014), CC BY-SA 4.0"
  },
  {
    id: "1999-copa-america-final",
    competition: "Copa América 1999",
    stage: "Final",
    date: "18 July 1999",
    venue: "Estadio Defensores del Chaco, Asunción",
    home: { name: "Uruguay", short: "URU", colour: "#92D2F8", label: "Runners-up", kit: "uruguay-1999" },
    away: { name: "Brazil", short: "BRA", colour: "#FEFE17", label: "Winners", kit: "brazil-1999" },
    score: { home: 0, away: 3 },
    scoreNote: null,
    extraTime: false,
    goals: [
      { minute: 20, scorer: "Rivaldo", team: "away" },
      { minute: 27, scorer: "Rivaldo", team: "away" },
      { minute: 46, scorer: "Ronaldo", team: "away" }
    ],
    kitsNote: "Uruguay in sky blue. Brazil in yellow. (Wikipedia, \"1999 Copa América final\".)",
    stats: null,
    source: "Wikipedia, \"1999 Copa América final\" (revision 1342341012), CC BY-SA 4.0"
  },
  {
    id: "2000-champions-league-final",
    competition: "UEFA Champions League 2000",
    stage: "Final",
    date: "24 May 2000",
    venue: "Stade de France, Saint-Denis",
    home: { name: "Real Madrid", short: "RM", colour: "#E42523", label: "Winners", kit: "real-madrid-2000" },
    away: { name: "Valencia", short: "VAL", colour: "#191817", label: "Runners-up", kit: "valencia-2000" },
    score: { home: 3, away: 0 },
    scoreNote: null,
    extraTime: false,
    goals: [
      { minute: 39, scorer: "Morientes", team: "home" },
      { minute: 67, scorer: "McManaman", team: "home" },
      { minute: 75, scorer: "Raúl", team: "home" }
    ],
    kitsNote: "Real Madrid in red. Valencia in black. (Wikipedia, \"2000 UEFA Champions League final\".)",
    stats: null,
    source: "Wikipedia, \"2000 UEFA Champions League final\" (revision 1378856625), CC BY-SA 4.0"
  },
  {
    id: "2000-euro-final",
    competition: "UEFA Euro 2000",
    stage: "Final",
    date: "2 July 2000",
    venue: "De Kuip, Rotterdam",
    home: { name: "France", short: "FRA", colour: "#1918C3", label: "Winners", kit: "france-2000" },
    away: { name: "Italy", short: "ITA", colour: "#1B1A17", label: "Runners-up", kit: "italy-2000" },
    score: { home: 2, away: 1 },
    scoreNote: null,
    extraTime: false,
    goals: [
      { minute: 55, scorer: "Delvecchio", team: "away" },
      { minute: 94, scorer: "Wiltord", team: "home" }
    ],
    kitsNote: "France in royal blue. Italy in white. (Wikipedia, \"UEFA Euro 2000 final\".)",
    stats: null,
    source: "Wikipedia, \"UEFA Euro 2000 final\" (revision 1377819903), CC BY-SA 4.0"
  },
  {
    id: "2001-champions-league-final",
    competition: "UEFA Champions League 2001",
    stage: "Final",
    date: "23 May 2001",
    venue: "San Siro, Milan",
    home: { name: "Bayern Munich", short: "BM", colour: "#1B1A17", label: "Winners", kit: "bayern-munich-2001" },
    away: { name: "Valencia", short: "VAL", colour: "#191817", label: "Runners-up", kit: "valencia-2001" },
    score: { home: 1, away: 1 },
    scoreNote: "After extra time. Bayern Munich won 5–4 on penalties.",
    extraTime: true,
    goals: [
      { minute: 3, scorer: "Mendieta (pen.)", team: "away" },
      { minute: 50, scorer: "Effenberg (pen.)", team: "home" }
    ],
    kitsNote: "Bayern Munich in white. Valencia in white. (Wikipedia, \"2001 UEFA Champions League final\".)",
    stats: null,
    source: "Wikipedia, \"2001 UEFA Champions League final\" (revision 1341287757), CC BY-SA 4.0"
  },
  {
    id: "2001-copa-america-final",
    competition: "Copa América 2001",
    stage: "Final",
    date: "29 July 2001",
    venue: "Estadio El Campín, Bogotá",
    home: { name: "Mexico", short: "MEX", colour: "#196E32", label: "Runners-up", kit: "mexico-2001" },
    away: { name: "Colombia", short: "COL", colour: "#FEFE17", label: "Winners", kit: "colombia-2001" },
    score: { home: 0, away: 1 },
    scoreNote: null,
    extraTime: false,
    goals: [
      { minute: 65, scorer: "I. Córdoba", team: "away" }
    ],
    kitsNote: "Mexico in dark green. Colombia in yellow. (Wikipedia, \"2001 Copa América final\".)",
    stats: null,
    source: "Wikipedia, \"2001 Copa América final\" (revision 1378647545), CC BY-SA 4.0"
  },
  {
    id: "2002-champions-league-final",
    competition: "UEFA Champions League 2002",
    stage: "Final",
    date: "15 May 2002",
    venue: "Hampden Park, Glasgow",
    home: { name: "Bayer Leverkusen", short: "BL", colour: "#191817", label: "Runners-up", kit: "bayer-leverkusen-2002" },
    away: { name: "Real Madrid", short: "RM", colour: "#1B1A17", label: "Winners", kit: "real-madrid-2002" },
    score: { home: 1, away: 2 },
    scoreNote: null,
    extraTime: false,
    goals: [
      { minute: 8, scorer: "Raúl", team: "away" },
      { minute: 14, scorer: "Lúcio", team: "home" },
      { minute: 45, scorer: "Zidane", team: "away" }
    ],
    kitsNote: "Bayer Leverkusen in black. Real Madrid in white. (Wikipedia, \"2002 UEFA Champions League final\".)",
    stats: null,
    source: "Wikipedia, \"2002 UEFA Champions League final\" (revision 1373626437), CC BY-SA 4.0"
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
    id: "2003-champions-league-final",
    competition: "UEFA Champions League 2003",
    stage: "Final",
    date: "28 May 2003",
    venue: "Old Trafford, Manchester",
    home: { name: "Juventus", short: "JUV", colour: "#1B1A17", label: "Runners-up", kit: "juventus-2003" },
    away: { name: "Milan", short: "MIL", colour: "#FE1817", label: "Winners", kit: "milan-2003" },
    score: { home: 0, away: 0 },
    scoreNote: "After extra time. Milan won 3–2 on penalties.",
    extraTime: true,
    goals: [],
    kitsNote: "Juventus in white. Milan in red. (Wikipedia, \"2003 UEFA Champions League final\".)",
    stats: null,
    source: "Wikipedia, \"2003 UEFA Champions League final\" (revision 1375054947), CC BY-SA 4.0"
  },
  {
    id: "2004-champions-league-final",
    competition: "UEFA Champions League 2004",
    stage: "Final",
    date: "26 May 2004",
    venue: "Arena AufSchalke, Gelsenkirchen",
    home: { name: "Monaco", short: "MON", colour: "#FE1817", label: "Runners-up", kit: "monaco-2004" },
    away: { name: "Porto", short: "POR", colour: "#9A9A9A", label: "Winners", kit: "porto-2004" },
    score: { home: 0, away: 3 },
    scoreNote: null,
    extraTime: false,
    goals: [
      { minute: 39, scorer: "Carlos Alberto", team: "away" },
      { minute: 71, scorer: "Deco", team: "away" },
      { minute: 75, scorer: "Alenichev", team: "away" }
    ],
    kitsNote: "Monaco in red. Porto in colours to be researched. (Wikipedia, \"2004 UEFA Champions League final\".)",
    stats: null,
    source: "Wikipedia, \"2004 UEFA Champions League final\" (revision 1377135619), CC BY-SA 4.0"
  },
  {
    id: "2004-euro-final",
    competition: "UEFA Euro 2004",
    stage: "Final",
    date: "4 July 2004",
    venue: "Estádio da Luz, Lisbon",
    home: { name: "Portugal", short: "POR", colour: "#E11824", label: "Runners-up", kit: "portugal-2004" },
    away: { name: "Greece", short: "GRE", colour: "#1B1A17", label: "Winners", kit: "greece-2004" },
    score: { home: 0, away: 1 },
    scoreNote: null,
    extraTime: false,
    goals: [
      { minute: 57, scorer: "Charisteas", team: "away" }
    ],
    kitsNote: "Portugal in red. Greece in white. (Wikipedia, \"UEFA Euro 2004 final\".)",
    stats: null,
    source: "Wikipedia, \"UEFA Euro 2004 final\" (revision 1377819841), CC BY-SA 4.0"
  },
  {
    id: "2004-copa-america-final",
    competition: "Copa América 2004",
    stage: "Final",
    date: "25 July 2004",
    venue: "Estadio Nacional, Lima",
    home: { name: "Argentina", short: "ARG", colour: "#1B1A17", label: "Runners-up", kit: "argentina-2004" },
    away: { name: "Brazil", short: "BRA", colour: "#FEE117", label: "Winners", kit: "brazil-2004" },
    score: { home: 2, away: 2 },
    scoreNote: "Brazil won 4–2 on penalties.",
    extraTime: false,
    goals: [
      { minute: 21, scorer: "K. González (pen.)", team: "home" },
      { minute: 46, scorer: "Luisão", team: "away" },
      { minute: 87, scorer: "Delgado", team: "home" },
      { minute: 93, scorer: "Adriano", team: "away" }
    ],
    kitsNote: "Argentina in sky blue and white striped. Brazil in yellow. (Wikipedia, \"2004 Copa América final\".)",
    stats: null,
    source: "Wikipedia, \"2004 Copa América final\" (revision 1367555651), CC BY-SA 4.0"
  },
  {
    id: "2005-champions-league-final",
    competition: "UEFA Champions League 2005",
    stage: "Final",
    date: "25 May 2005",
    venue: "Atatürk Olympic Stadium, Istanbul",
    home: { name: "Milan", short: "MIL", colour: "#FE1817", label: "Runners-up", kit: "milan-2005" },
    away: { name: "Liverpool", short: "LIV", colour: "#1B1A17", label: "Winners", kit: "liverpool-2005" },
    score: { home: 3, away: 3 },
    scoreNote: "After extra time. Liverpool won 3–2 on penalties.",
    extraTime: true,
    goals: [
      { minute: 1, scorer: "Maldini", team: "home" },
      { minute: 39, scorer: "Crespo", team: "home" },
      { minute: 44, scorer: "Crespo", team: "home" },
      { minute: 54, scorer: "Gerrard", team: "away" },
      { minute: 56, scorer: "Šmicer", team: "away" },
      { minute: 60, scorer: "Alonso", team: "away" }
    ],
    kitsNote: "Milan in red. Liverpool in red. (Wikipedia, \"2005 UEFA Champions League final\".)",
    stats: null,
    source: "Wikipedia, \"2005 UEFA Champions League final\" (revision 1377820665), CC BY-SA 4.0"
  },
  {
    id: "2006-champions-league-final",
    competition: "UEFA Champions League 2006",
    stage: "Final",
    date: "17 May 2006",
    venue: "Stade de France, Saint-Denis",
    home: { name: "Barcelona", short: "BAR", colour: "#1942C7", label: "Winners", kit: "barcelona-2006" },
    away: { name: "Arsenal", short: "ARS", colour: "#FCDC17", label: "Runners-up", kit: "arsenal-2006" },
    score: { home: 2, away: 1 },
    scoreNote: null,
    extraTime: false,
    goals: [
      { minute: 37, scorer: "Campbell", team: "away" },
      { minute: 76, scorer: "Eto'o", team: "home" },
      { minute: 80, scorer: "Belletti", team: "home" }
    ],
    kitsNote: "Barcelona in royal blue. Arsenal in yellow. (Wikipedia, \"2006 UEFA Champions League final\".)",
    stats: null,
    source: "Wikipedia, \"2006 UEFA Champions League final\" (revision 1374312188), CC BY-SA 4.0"
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
    id: "2007-champions-league-final",
    competition: "UEFA Champions League 2007",
    stage: "Final",
    date: "23 May 2007",
    venue: "Olympic Stadium, Athens",
    home: { name: "Milan", short: "MIL", colour: "#1B1A17", label: "Winners", kit: "milan-2007" },
    away: { name: "Liverpool", short: "LIV", colour: "#FE1817", label: "Runners-up", kit: "liverpool-2007" },
    score: { home: 2, away: 1 },
    scoreNote: null,
    extraTime: false,
    goals: [
      { minute: 45, scorer: "Inzaghi", team: "home" },
      { minute: 82, scorer: "Inzaghi", team: "home" },
      { minute: 89, scorer: "Kuyt", team: "away" }
    ],
    kitsNote: "Milan in white. Liverpool in red. (Wikipedia, \"2007 UEFA Champions League final\".)",
    stats: null,
    source: "Wikipedia, \"2007 UEFA Champions League final\" (revision 1375960205), CC BY-SA 4.0"
  },
  {
    id: "2007-copa-america-final",
    competition: "Copa América 2007",
    stage: "Final",
    date: "15 July 2007",
    venue: "Estadio José Pachencho Romero, Maracaibo",
    home: { name: "Brazil", short: "BRA", colour: "#FEE117", label: "Winners", kit: "brazil-2007" },
    away: { name: "Argentina", short: "ARG", colour: "#82B1DC", label: "Runners-up", kit: "argentina-2007" },
    score: { home: 3, away: 0 },
    scoreNote: null,
    extraTime: false,
    goals: [
      { minute: 4, scorer: "Júlio Baptista", team: "home" },
      { minute: 40, scorer: "Ayala (own goal)", team: "home" },
      { minute: 69, scorer: "Dani Alves", team: "home" }
    ],
    kitsNote: "Brazil in yellow. Argentina in sky blue and white striped. (Wikipedia, \"2007 Copa América final\".)",
    stats: null,
    source: "Wikipedia, \"2007 Copa América final\" (revision 1342340844), CC BY-SA 4.0"
  },
  {
    id: "2008-champions-league-final",
    competition: "UEFA Champions League 2008",
    stage: "Final",
    date: "21 May 2008",
    venue: "Luzhniki Stadium, Moscow",
    home: { name: "Manchester United", short: "MU", colour: "#E42523", label: "Winners", kit: "manchester-united-2008" },
    away: { name: "Chelsea", short: "CHE", colour: "#1918FC", label: "Runners-up", kit: "chelsea-2008" },
    score: { home: 1, away: 1 },
    scoreNote: "After extra time. Manchester United won 6–5 on penalties.",
    extraTime: true,
    goals: [
      { minute: 26, scorer: "Ronaldo", team: "home" },
      { minute: 45, scorer: "Lampard", team: "away" }
    ],
    kitsNote: "Manchester United in red. Chelsea in royal blue. (Wikipedia, \"2008 UEFA Champions League final\".)",
    stats: null,
    source: "Wikipedia, \"2008 UEFA Champions League final\" (revision 1349353539), CC BY-SA 4.0"
  },
  {
    id: "2008-euro-final",
    competition: "UEFA Euro 2008",
    stage: "Final",
    date: "29 June 2008",
    venue: "Ernst-Happel-Stadion, Vienna",
    home: { name: "Germany", short: "GER", colour: "#1B1A17", label: "Runners-up", kit: "germany-2008" },
    away: { name: "Spain", short: "ESP", colour: "#D81817", label: "Winners", kit: "spain-2008" },
    score: { home: 0, away: 1 },
    scoreNote: null,
    extraTime: false,
    goals: [
      { minute: 33, scorer: "Torres", team: "away" }
    ],
    kitsNote: "Germany in white. Spain in red. (Wikipedia, \"UEFA Euro 2008 final\".)",
    stats: null,
    source: "Wikipedia, \"UEFA Euro 2008 final\" (revision 1335641268), CC BY-SA 4.0"
  },
  {
    id: "2009-champions-league-final",
    competition: "UEFA Champions League 2009",
    stage: "Final",
    date: "27 May 2009",
    venue: "Stadio Olimpico, Rome",
    home: { name: "Barcelona", short: "BAR", colour: "#E01817", label: "Winners", kit: "barcelona-2009" },
    away: { name: "Manchester United", short: "MU", colour: "#1B1A17", label: "Runners-up", kit: "manchester-united-2009" },
    score: { home: 2, away: 0 },
    scoreNote: null,
    extraTime: false,
    goals: [
      { minute: 10, scorer: "Eto'o", team: "home" },
      { minute: 70, scorer: "Messi", team: "home" }
    ],
    kitsNote: "Barcelona in red. Manchester United in white. (Wikipedia, \"2009 UEFA Champions League final\".)",
    stats: null,
    source: "Wikipedia, \"2009 UEFA Champions League final\" (revision 1367164189), CC BY-SA 4.0"
  },
  {
    id: "2010-champions-league-final",
    competition: "UEFA Champions League 2010",
    stage: "Final",
    date: "22 May 2010",
    venue: "Santiago Bernabéu, Madrid",
    home: { name: "Bayern Munich", short: "BM", colour: "#1B1A17", label: "Runners-up", kit: "bayern-munich-2010" },
    away: { name: "Inter Milan", short: "IM", colour: "#191817", label: "Winners", kit: "inter-milan-2010" },
    score: { home: 0, away: 2 },
    scoreNote: null,
    extraTime: false,
    goals: [
      { minute: 35, scorer: "Milito", team: "away" },
      { minute: 70, scorer: "Milito", team: "away" }
    ],
    kitsNote: "Bayern Munich in white. Inter Milan in black. (Wikipedia, \"2010 UEFA Champions League final\".)",
    stats: null,
    source: "Wikipedia, \"2010 UEFA Champions League final\" (revision 1375793299), CC BY-SA 4.0"
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
    id: "2011-champions-league-final",
    competition: "UEFA Champions League 2011",
    stage: "Final",
    date: "28 May 2011",
    venue: "Wembley Stadium, London",
    home: { name: "Barcelona", short: "BAR", colour: "#C51817", label: "Winners", kit: "barcelona-2011" },
    away: { name: "Manchester United", short: "MU", colour: "#1B1A17", label: "Runners-up", kit: "manchester-united-2011" },
    score: { home: 3, away: 1 },
    scoreNote: null,
    extraTime: false,
    goals: [
      { minute: 27, scorer: "Pedro", team: "home" },
      { minute: 34, scorer: "Rooney", team: "away" },
      { minute: 54, scorer: "Messi", team: "home" },
      { minute: 69, scorer: "Villa", team: "home" }
    ],
    kitsNote: "Barcelona in red. Manchester United in white. (Wikipedia, \"2011 UEFA Champions League final\".)",
    stats: null,
    source: "Wikipedia, \"2011 UEFA Champions League final\" (revision 1377597685), CC BY-SA 4.0"
  },
  {
    id: "2011-copa-america-final",
    competition: "Copa América 2011",
    stage: "Final",
    date: "24 July 2011",
    venue: "Estadio Monumental, Buenos Aires",
    home: { name: "Uruguay", short: "URU", colour: "#92D2EA", label: "Winners", kit: "uruguay-2011" },
    away: { name: "Paraguay", short: "PAR", colour: "#1B1A17", label: "Runners-up", kit: "paraguay-2011" },
    score: { home: 3, away: 0 },
    scoreNote: null,
    extraTime: false,
    goals: [
      { minute: 11, scorer: "Suárez", team: "home" },
      { minute: 41, scorer: "Forlán", team: "home" },
      { minute: 89, scorer: "Forlán", team: "home" }
    ],
    kitsNote: "Uruguay in sky blue. Paraguay in white. (Wikipedia, \"2011 Copa América final\".)",
    stats: null,
    source: "Wikipedia, \"2011 Copa América final\" (revision 1376275436), CC BY-SA 4.0"
  },
  {
    id: "2012-champions-league-final",
    competition: "UEFA Champions League 2012",
    stage: "Final",
    date: "19 May 2012",
    venue: "Allianz Arena, Munich",
    home: { name: "Bayern Munich", short: "BM", colour: "#1B1A17", label: "Runners-up", kit: "bayern-munich-2012" },
    away: { name: "Chelsea", short: "CHE", colour: "#1918FC", label: "Winners", kit: "chelsea-2012" },
    score: { home: 1, away: 1 },
    scoreNote: "After extra time. Chelsea won 4–3 on penalties.",
    extraTime: true,
    goals: [
      { minute: 83, scorer: "Müller", team: "home" },
      { minute: 88, scorer: "Drogba", team: "away" }
    ],
    kitsNote: "Bayern Munich in white. Chelsea in royal blue. (Wikipedia, \"2012 UEFA Champions League final\".)",
    stats: null,
    source: "Wikipedia, \"2012 UEFA Champions League final\" (revision 1371171265), CC BY-SA 4.0"
  },
  {
    id: "2012-euro-final",
    competition: "UEFA Euro 2012",
    stage: "Final",
    date: "1 July 2012",
    venue: "Olympic Stadium, Kyiv",
    home: { name: "Spain", short: "ESP", colour: "#1B1A17", label: "Winners", kit: "spain-2012" },
    away: { name: "Italy", short: "ITA", colour: "#1918FC", label: "Runners-up", kit: "italy-2012" },
    score: { home: 4, away: 0 },
    scoreNote: null,
    extraTime: false,
    goals: [
      { minute: 14, scorer: "Silva", team: "home" },
      { minute: 41, scorer: "Alba", team: "home" },
      { minute: 84, scorer: "Torres", team: "home" },
      { minute: 88, scorer: "Mata", team: "home" }
    ],
    kitsNote: "Spain in white. Italy in royal blue. (Wikipedia, \"UEFA Euro 2012 final\".)",
    stats: null,
    source: "Wikipedia, \"UEFA Euro 2012 final\" (revision 1358889307), CC BY-SA 4.0"
  },
  {
    id: "2013-champions-league-final",
    competition: "UEFA Champions League 2013",
    stage: "Final",
    date: "25 May 2013",
    venue: "Wembley Stadium, London",
    home: { name: "Borussia Dortmund", short: "BD", colour: "#FEFE17", label: "Runners-up", kit: "borussia-dortmund-2013" },
    away: { name: "Bayern Munich", short: "BM", colour: "#E01817", label: "Winners", kit: "bayern-munich-2013" },
    score: { home: 1, away: 2 },
    scoreNote: null,
    extraTime: false,
    goals: [
      { minute: 60, scorer: "Mandžukić", team: "away" },
      { minute: 68, scorer: "Gündoğan (pen.)", team: "home" },
      { minute: 89, scorer: "Robben", team: "away" }
    ],
    kitsNote: "Borussia Dortmund in yellow. Bayern Munich in red. (Wikipedia, \"2013 UEFA Champions League final\".)",
    stats: null,
    source: "Wikipedia, \"2013 UEFA Champions League final\" (revision 1352352017), CC BY-SA 4.0"
  },
  {
    id: "2014-champions-league-final",
    competition: "UEFA Champions League 2014",
    stage: "Final",
    date: "24 May 2014",
    venue: "Estádio da Luz, Lisbon",
    home: { name: "Real Madrid", short: "RM", colour: "#1B1A17", label: "Winners", kit: "real-madrid-2014" },
    away: { name: "Atlético Madrid", short: "AM", colour: "#1B1A17", label: "Runners-up", kit: "atletico-madrid-2014" },
    score: { home: 4, away: 1 },
    scoreNote: "After extra time.",
    extraTime: true,
    goals: [
      { minute: 36, scorer: "Godín", team: "away" },
      { minute: 93, scorer: "Ramos", team: "home" },
      { minute: 110, scorer: "Bale", team: "home" },
      { minute: 118, scorer: "Marcelo", team: "home" },
      { minute: 120, scorer: "Ronaldo (pen.)", team: "home" }
    ],
    kitsNote: "Real Madrid in white. Atlético Madrid in white. (Wikipedia, \"2014 UEFA Champions League final\".)",
    stats: null,
    source: "Wikipedia, \"2014 UEFA Champions League final\" (revision 1352009847), CC BY-SA 4.0"
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
    id: "2015-champions-league-final",
    competition: "UEFA Champions League 2015",
    stage: "Final",
    date: "6 June 2015",
    venue: "Olympiastadion, Berlin",
    home: { name: "Juventus", short: "JUV", colour: "#1B1A17", label: "Runners-up", kit: "juventus-2015" },
    away: { name: "Barcelona", short: "BAR", colour: "#1E3E83", label: "Winners", kit: "barcelona-2015" },
    score: { home: 1, away: 3 },
    scoreNote: null,
    extraTime: false,
    goals: [
      { minute: 4, scorer: "Rakitić", team: "away" },
      { minute: 55, scorer: "Morata", team: "home" },
      { minute: 68, scorer: "Suárez", team: "away" },
      { minute: 97, scorer: "Neymar", team: "away" }
    ],
    kitsNote: "Juventus in white. Barcelona in navy. (Wikipedia, \"2015 UEFA Champions League final\".)",
    stats: null,
    source: "Wikipedia, \"2015 UEFA Champions League final\" (revision 1376277979), CC BY-SA 4.0"
  },
  {
    id: "2015-copa-america-final",
    competition: "Copa América 2015",
    stage: "Final",
    date: "4 July 2015",
    venue: "Estadio Nacional, Santiago",
    home: { name: "Chile", short: "CHI", colour: "#EE3137", label: "Winners", kit: "chile-2015" },
    away: { name: "Argentina", short: "ARG", colour: "#1B1A17", label: "Runners-up", kit: "argentina-2015" },
    score: { home: 0, away: 0 },
    scoreNote: "After extra time. Chile won 4–1 on penalties.",
    extraTime: true,
    goals: [],
    kitsNote: "Chile in red. Argentina in sky blue and white striped. (Wikipedia, \"2015 Copa América final\".)",
    stats: null,
    source: "Wikipedia, \"2015 Copa América final\" (revision 1372544145), CC BY-SA 4.0"
  },
  {
    id: "2016-champions-league-final",
    competition: "UEFA Champions League 2016",
    stage: "Final",
    date: "28 May 2016",
    venue: "Stadio San Siro, Milan",
    home: { name: "Real Madrid", short: "RM", colour: "#9A9A9A", label: "Winners", kit: "real-madrid-2016" },
    away: { name: "Atlético Madrid", short: "AM", colour: "#1B1A17", label: "Runners-up", kit: "atletico-madrid-2016" },
    score: { home: 1, away: 1 },
    scoreNote: "After extra time. Real Madrid won 5–3 on penalties.",
    extraTime: true,
    goals: [
      { minute: 15, scorer: "Ramos", team: "home" },
      { minute: 79, scorer: "Carrasco", team: "away" }
    ],
    kitsNote: "Real Madrid in colours to be researched. Atlético Madrid in white. (Wikipedia, \"2016 UEFA Champions League final\".)",
    stats: null,
    source: "Wikipedia, \"2016 UEFA Champions League final\" (revision 1373353713), CC BY-SA 4.0"
  },
  {
    id: "2016-copa-america-final",
    competition: "Copa América 2016",
    stage: "Final",
    date: "26 June 2016",
    venue: "MetLife Stadium, East Rutherford, New Jersey",
    home: { name: "Argentina", short: "ARG", colour: "#1B1A17", label: "Runners-up", kit: "argentina-2016" },
    away: { name: "Chile", short: "CHI", colour: "#FE1817", label: "Winners", kit: "chile-2016" },
    score: { home: 0, away: 0 },
    scoreNote: "After extra time. Chile won 4–2 on penalties.",
    extraTime: true,
    goals: [],
    kitsNote: "Argentina in sky blue and white striped. Chile in red. (Wikipedia, \"Copa América Centenario final\".)",
    stats: null,
    source: "Wikipedia, \"Copa América Centenario final\" (revision 1373519770), CC BY-SA 4.0"
  },
  {
    id: "2016-euro-final",
    competition: "UEFA Euro 2016",
    stage: "Final",
    date: "10 July 2016",
    venue: "Stade de France, Saint-Denis",
    home: { name: "Portugal", short: "POR", colour: "#FE1817", label: "Winners", kit: "portugal-2016" },
    away: { name: "France", short: "FRA", colour: "#2869BD", label: "Runners-up", kit: "france-2016" },
    score: { home: 1, away: 0 },
    scoreNote: "After extra time.",
    extraTime: true,
    goals: [
      { minute: 109, scorer: "Eder", team: "home" }
    ],
    kitsNote: "Portugal in red. France in blue. (Wikipedia, \"UEFA Euro 2016 final\".)",
    stats: null,
    source: "Wikipedia, \"UEFA Euro 2016 final\" (revision 1367354979), CC BY-SA 4.0"
  },
  {
    id: "2017-champions-league-final",
    competition: "UEFA Champions League 2017",
    stage: "Final",
    date: "3 June 2017",
    venue: "Millennium Stadium, Cardiff",
    home: { name: "Juventus", short: "JUV", colour: "#1B1A17", label: "Runners-up", kit: "juventus-2017" },
    away: { name: "Real Madrid", short: "RM", colour: "#1B1A17", label: "Winners", kit: "real-madrid-2017" },
    score: { home: 1, away: 4 },
    scoreNote: null,
    extraTime: false,
    goals: [
      { minute: 20, scorer: "Ronaldo", team: "away" },
      { minute: 27, scorer: "Mandžukić", team: "home" },
      { minute: 61, scorer: "Casemiro", team: "away" },
      { minute: 64, scorer: "Ronaldo", team: "away" },
      { minute: 90, scorer: "Asensio", team: "away" }
    ],
    kitsNote: "Juventus in white. Real Madrid in white. (Wikipedia, \"2017 UEFA Champions League final\".)",
    stats: null,
    source: "Wikipedia, \"2017 UEFA Champions League final\" (revision 1373864667), CC BY-SA 4.0"
  },
  {
    id: "2018-champions-league-final",
    competition: "UEFA Champions League 2018",
    stage: "Final",
    date: "26 May 2018",
    venue: "NSC Olimpiyskiy, Kyiv",
    home: { name: "Real Madrid", short: "RM", colour: "#1B1A17", label: "Winners", kit: "real-madrid-2018" },
    away: { name: "Liverpool", short: "LIV", colour: "#E01817", label: "Runners-up", kit: "liverpool-2018" },
    score: { home: 3, away: 1 },
    scoreNote: null,
    extraTime: false,
    goals: [
      { minute: 51, scorer: "Benzema", team: "home" },
      { minute: 55, scorer: "Mané", team: "away" },
      { minute: 63, scorer: "Bale", team: "home" },
      { minute: 83, scorer: "Bale", team: "home" }
    ],
    kitsNote: "Real Madrid in white. Liverpool in red. (Wikipedia, \"2018 UEFA Champions League final\".)",
    stats: null,
    source: "Wikipedia, \"2018 UEFA Champions League final\" (revision 1374334988), CC BY-SA 4.0"
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
    id: "2019-champions-league-final",
    competition: "UEFA Champions League 2019",
    stage: "Final",
    date: "1 June 2019",
    venue: "Estadio Metropolitano, Madrid",
    home: { name: "Tottenham Hotspur", short: "TH", colour: "#1B1A17", label: "Runners-up", kit: "tottenham-hotspur-2019" },
    away: { name: "Liverpool", short: "LIV", colour: "#E01817", label: "Winners", kit: "liverpool-2019" },
    score: { home: 0, away: 2 },
    scoreNote: null,
    extraTime: false,
    goals: [
      { minute: 2, scorer: "Salah (pen.)", team: "away" },
      { minute: 87, scorer: "Origi", team: "away" }
    ],
    kitsNote: "Tottenham Hotspur in white. Liverpool in red. (Wikipedia, \"2019 UEFA Champions League final\".)",
    stats: null,
    source: "Wikipedia, \"2019 UEFA Champions League final\" (revision 1376279481), CC BY-SA 4.0"
  },
  {
    id: "2019-copa-america-final",
    competition: "Copa América 2019",
    stage: "Final",
    date: "7 July 2019",
    venue: "Estádio do Maracanã, Rio de Janeiro",
    home: { name: "Brazil", short: "BRA", colour: "#FED017", label: "Winners", kit: "brazil-2019" },
    away: { name: "Peru", short: "PER", colour: "#1B1A17", label: "Runners-up", kit: "peru-2019" },
    score: { home: 3, away: 1 },
    scoreNote: null,
    extraTime: false,
    goals: [
      { minute: 15, scorer: "Everton", team: "home" },
      { minute: 44, scorer: "Guerrero (pen.)", team: "away" },
      { minute: 48, scorer: "Gabriel Jesus", team: "home" },
      { minute: 90, scorer: "Richarlison (pen.)", team: "home" }
    ],
    kitsNote: "Brazil in yellow. Peru in white. (Wikipedia, \"2019 Copa América final\".)",
    stats: null,
    source: "Wikipedia, \"2019 Copa América final\" (revision 1367692944), CC BY-SA 4.0"
  },
  {
    id: "2020-champions-league-final",
    competition: "UEFA Champions League 2020",
    stage: "Final",
    date: "23 August 2020",
    venue: "Estádio da Luz, Lisbon",
    home: { name: "Paris Saint-Germain", short: "PS", colour: "#191850", label: "Runners-up", kit: "paris-saint-germain-2020" },
    away: { name: "Bayern Munich", short: "BM", colour: "#FE1817", label: "Winners", kit: "bayern-munich-2020" },
    score: { home: 0, away: 1 },
    scoreNote: null,
    extraTime: false,
    goals: [
      { minute: 59, scorer: "Coman", team: "away" }
    ],
    kitsNote: "Paris Saint-Germain in navy. Bayern Munich in red. (Wikipedia, \"2020 UEFA Champions League final\".)",
    stats: null,
    source: "Wikipedia, \"2020 UEFA Champions League final\" (revision 1376279695), CC BY-SA 4.0"
  },
  {
    id: "2021-champions-league-final",
    competition: "UEFA Champions League 2021",
    stage: "Final",
    date: "29 May 2021",
    venue: "Estádio do Dragão, Porto",
    home: { name: "Manchester City", short: "MC", colour: "#84C0FC", label: "Runners-up", kit: "manchester-city-2021" },
    away: { name: "Chelsea", short: "CHE", colour: "#1918FC", label: "Winners", kit: "chelsea-2021" },
    score: { home: 0, away: 1 },
    scoreNote: null,
    extraTime: false,
    goals: [
      { minute: 42, scorer: "Havertz", team: "away" }
    ],
    kitsNote: "Manchester City in sky blue. Chelsea in royal blue. (Wikipedia, \"2021 UEFA Champions League final\".)",
    stats: null,
    source: "Wikipedia, \"2021 UEFA Champions League final\" (revision 1359669709), CC BY-SA 4.0"
  },
  {
    id: "2021-copa-america-final",
    competition: "Copa América 2021",
    stage: "Final",
    date: "10 July 2021",
    venue: "Estádio do Maracanã, Rio de Janeiro",
    home: { name: "Argentina", short: "ARG", colour: "#1B1A17", label: "Winners", kit: "argentina-2021" },
    away: { name: "Brazil", short: "BRA", colour: "#FED017", label: "Runners-up", kit: "brazil-2021" },
    score: { home: 1, away: 0 },
    scoreNote: null,
    extraTime: false,
    goals: [
      { minute: 22, scorer: "Di María", team: "home" }
    ],
    kitsNote: "Argentina in sky blue and white striped. Brazil in yellow. (Wikipedia, \"2021 Copa América final\".)",
    stats: null,
    source: "Wikipedia, \"2021 Copa América final\" (revision 1367692900), CC BY-SA 4.0"
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
    id: "2022-champions-league-final",
    competition: "UEFA Champions League 2022",
    stage: "Final",
    date: "28 May 2022",
    venue: "Stade de France, Saint-Denis",
    home: { name: "Liverpool", short: "LIV", colour: "#E01817", label: "Runners-up", kit: "liverpool-2022" },
    away: { name: "Real Madrid", short: "RM", colour: "#1B1A17", label: "Winners", kit: "real-madrid-2022" },
    score: { home: 0, away: 1 },
    scoreNote: null,
    extraTime: false,
    goals: [
      { minute: 59, scorer: "Vinícius", team: "away" }
    ],
    kitsNote: "Liverpool in red. Real Madrid in white. (Wikipedia, \"2022 UEFA Champions League final\".)",
    stats: null,
    source: "Wikipedia, \"2022 UEFA Champions League final\" (revision 1376656202), CC BY-SA 4.0"
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
    id: "2023-champions-league-final",
    competition: "UEFA Champions League 2023",
    stage: "Final",
    date: "10 June 2023",
    venue: "Atatürk Olympic Stadium, Istanbul",
    home: { name: "Manchester City", short: "MC", colour: "#84C0FC", label: "Winners", kit: "manchester-city-2023" },
    away: { name: "Inter Milan", short: "IM", colour: "#1918FC", label: "Runners-up", kit: "inter-milan-2023" },
    score: { home: 1, away: 0 },
    scoreNote: null,
    extraTime: false,
    goals: [
      { minute: 68, scorer: "Rodri", team: "home" }
    ],
    kitsNote: "Manchester City in sky blue. Inter Milan in royal blue. (Wikipedia, \"2023 UEFA Champions League final\".)",
    stats: null,
    source: "Wikipedia, \"2023 UEFA Champions League final\" (revision 1377261615), CC BY-SA 4.0"
  },
  {
    id: "2024-champions-league-final",
    competition: "UEFA Champions League 2024",
    stage: "Final",
    date: "1 June 2024",
    venue: "Wembley Stadium, London",
    home: { name: "Borussia Dortmund", short: "BD", colour: "#F7E619", label: "Runners-up", kit: "borussia-dortmund-2024" },
    away: { name: "Real Madrid", short: "RM", colour: "#1B1A17", label: "Winners", kit: "real-madrid-2024" },
    score: { home: 0, away: 2 },
    scoreNote: null,
    extraTime: false,
    goals: [
      { minute: 74, scorer: "Carvajal", team: "away" },
      { minute: 83, scorer: "Vinícius", team: "away" }
    ],
    kitsNote: "Borussia Dortmund in yellow. Real Madrid in white. (Wikipedia, \"2024 UEFA Champions League final\".)",
    stats: null,
    source: "Wikipedia, \"2024 UEFA Champions League final\" (revision 1370459237), CC BY-SA 4.0"
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
    id: "2024-copa-america-final",
    competition: "Copa América 2024",
    stage: "Final",
    date: "14 July 2024",
    venue: "Hard Rock Stadium, Miami Gardens, Florida",
    home: { name: "Argentina", short: "ARG", colour: "#1B1A17", label: "Winners", kit: "argentina-2024" },
    away: { name: "Colombia", short: "COL", colour: "#FEFE17", label: "Runners-up", kit: "colombia-2024" },
    score: { home: 1, away: 0 },
    scoreNote: "After extra time.",
    extraTime: true,
    goals: [
      { minute: 112, scorer: "La. Martínez", team: "home" }
    ],
    kitsNote: "Argentina in sky blue and white striped. Colombia in yellow. (Wikipedia, \"2024 Copa América final\".)",
    stats: null,
    source: "Wikipedia, \"2024 Copa América final\" (revision 1378330205), CC BY-SA 4.0"
  },
  {
    id: "2025-champions-league-final",
    competition: "UEFA Champions League 2025",
    stage: "Final",
    date: "31 May 2025",
    venue: "Allianz Arena, Munich",
    home: { name: "Paris Saint-Germain", short: "PS", colour: "#222862", label: "Winners", kit: "paris-saint-germain-2025" },
    away: { name: "Inter Milan", short: "IM", colour: "#FED017", label: "Runners-up", kit: "inter-milan-2025" },
    score: { home: 5, away: 0 },
    scoreNote: null,
    extraTime: false,
    goals: [
      { minute: 12, scorer: "Hakimi", team: "home" },
      { minute: 20, scorer: "Doué", team: "home" },
      { minute: 63, scorer: "Doué", team: "home" },
      { minute: 73, scorer: "Kvaratskhelia", team: "home" },
      { minute: 86, scorer: "Mayulu", team: "home" }
    ],
    kitsNote: "Paris Saint-Germain in navy. Inter Milan in yellow. (Wikipedia, \"2025 UEFA Champions League final\".)",
    stats: null,
    source: "Wikipedia, \"2025 UEFA Champions League final\" (revision 1378573417), CC BY-SA 4.0"
  },
  {
    id: "2026-champions-league-final",
    competition: "UEFA Champions League 2026",
    stage: "Final",
    date: "30 May 2026",
    venue: "Puskás Aréna, Budapest",
    home: { name: "Paris Saint-Germain", short: "PS", colour: "#21275F", label: "Winners", kit: "paris-saint-germain-2026" },
    away: { name: "Arsenal", short: "ARS", colour: "#1B1A17", label: "Runners-up", kit: "arsenal-2026" },
    score: { home: 1, away: 1 },
    scoreNote: "After extra time. Paris Saint-Germain won 4–3 on penalties.",
    extraTime: true,
    goals: [
      { minute: 6, scorer: "Havertz", team: "away" },
      { minute: 65, scorer: "Dembélé (pen.)", team: "home" }
    ],
    kitsNote: "Paris Saint-Germain in navy. Arsenal in white. (Wikipedia, \"2026 UEFA Champions League final\".)",
    stats: null,
    source: "Wikipedia, \"2026 UEFA Champions League final\" (revision 1378634258), CC BY-SA 4.0"
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
