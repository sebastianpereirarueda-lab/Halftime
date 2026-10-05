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
//    goals       list of { minute, scorer, team: "home" or "away" }
//    stats       null until a stats source is chosen
//
//  Do not write a score, minute or name you have not checked.
// ============================================================
window.HALFTIME_MATCHES = [
  {
    id: "1970-world-cup-final",
    competition: "FIFA World Cup 1970",
    stage: "Final",
    date: "21 June 1970",
    venue: "Estadio Azteca, Mexico City",
    home: { name: "Brazil", short: "BRA", colour: "#1F6B3A", label: "Winners", kit: "brazil-1970" },
    away: { name: "Italy", short: "ITA", colour: "#1F4E9C", label: "Runners-up", kit: "italy-1970" },
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
  }
];
