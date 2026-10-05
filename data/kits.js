// ============================================================
//  HALFTIME — KIT CATALOGUE
//  One entry per shirt. Edit this file to add or change kits.
//
//  Fields:
//    id          short web-safe name, used in the page address (kits/kit.html?id=...)
//    team        team name as shown
//    year        the season or tournament year (a number)
//    kind        "nation" or "club"
//    competition the tournament or season the shirt is known for
//    result      what happened, e.g. "World Cup winners"
//    colours     body / trim / stripes for the drawing
//                stripes: a list of 5 colours, left to right, or leave as [] for a plain shirt
//    description one sentence about the shirt's look
//    facts       research fields. Leave a field as null until it is verified.
//    matches     ids of match cards this shirt appears in (see matches.js)
//
//  Do not write a fact you have not checked. null shows as "to be researched".
// ============================================================
window.HALFTIME_KITS = [
  {
    id: "brazil-1970",
    team: "Brazil",
    year: 1970,
    kind: "nation",
    competition: "FIFA World Cup 1970, Mexico",
    result: "World Cup winners",
    colours: { body: "#E8C32A", trim: "#1F6B3A", stripes: [] },
    description: "Yellow shirt with green trim at the collar and cuffs.",
    facts: { manufacturer: null, debut: null, story: null },
    matches: ["1970-world-cup-final"]
  },
  {
    id: "italy-1970",
    team: "Italy",
    year: 1970,
    kind: "nation",
    competition: "FIFA World Cup 1970, Mexico",
    result: "World Cup runners-up",
    colours: { body: "#1F4E9C", trim: "#F4F1E6", stripes: [] },
    description: "Blue shirt with white trim.",
    facts: { manufacturer: null, debut: null, story: null },
    matches: ["1970-world-cup-final"]
  },
  {
    id: "netherlands-1974",
    team: "Netherlands",
    year: 1974,
    kind: "nation",
    competition: "FIFA World Cup 1974, West Germany",
    result: "World Cup runners-up",
    colours: { body: "#E86F1C", trim: "#1B1A17", stripes: [] },
    description: "Orange shirt with black trim.",
    facts: { manufacturer: null, debut: null, story: null },
    matches: []
  },
  {
    id: "argentina-1986",
    team: "Argentina",
    year: 1986,
    kind: "nation",
    competition: "FIFA World Cup 1986, Mexico",
    result: "World Cup winners",
    colours: { body: "#7DB8E0", trim: "#1B1A17", stripes: ["#7DB8E0", "#F4F1E6", "#7DB8E0", "#F4F1E6", "#7DB8E0"] },
    description: "Sky blue and white vertical stripes.",
    facts: { manufacturer: null, debut: null, story: null },
    matches: []
  },
  {
    id: "england-1966",
    team: "England",
    year: 1966,
    kind: "nation",
    competition: "FIFA World Cup 1966, England",
    result: "World Cup winners",
    colours: { body: "#B3261E", trim: "#F4F1E6", stripes: [] },
    description: "Red shirt with white trim, worn in the final.",
    facts: { manufacturer: null, debut: null, story: null },
    matches: []
  },
  {
    id: "italy-1982",
    team: "Italy",
    year: 1982,
    kind: "nation",
    competition: "FIFA World Cup 1982, Spain",
    result: "World Cup winners",
    colours: { body: "#1F4E9C", trim: "#F4F1E6", stripes: [] },
    description: "Blue shirt with white trim.",
    facts: { manufacturer: null, debut: null, story: null },
    matches: []
  },
  {
    id: "uruguay-1950",
    team: "Uruguay",
    year: 1950,
    kind: "nation",
    competition: "FIFA World Cup 1950, Brazil",
    result: "World Cup winners",
    colours: { body: "#6FA9DC", trim: "#1B1A17", stripes: [] },
    description: "Light blue shirt with black trim.",
    facts: { manufacturer: null, debut: null, story: null },
    matches: []
  }
];
