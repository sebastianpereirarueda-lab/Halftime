// ============================================================
//  HALFTIME — DATA PIPELINE SETTINGS
//  Edit this file to change which competitions and news sources
//  the automatic updates cover.
// ============================================================

// Competitions to follow, with their API-Football league ids.
// The ids are printed back with the league name on every run, so a
// wrong id shows up in the log as the wrong name.
export const LEAGUES = [
  { id: 39,  name: "Premier League",   short: "PL"  },
  { id: 140, name: "La Liga",          short: "LAL" },
  { id: 135, name: "Serie A",          short: "SA"  },
  { id: 78,  name: "Bundesliga",       short: "BL"  },
  { id: 61,  name: "Ligue 1",          short: "L1"  },
  { id: 2,   name: "Champions League", short: "UCL" },
];

// How many finished and upcoming fixtures to pull per competition.
export const LAST_PER_LEAGUE = 6;
export const NEXT_PER_LEAGUE = 4;

// Only fetch goals and lineups for matches that finished within this window.
export const DETAIL_WINDOW_HOURS = 72;

// Hard ceiling on API-Football requests in one run. The free plan allows
// 100 per day, and the schedule runs a few times a day.
export const MAX_REQUESTS_PER_RUN = 40;

// News sources: public RSS feeds from established football desks.
// Only these feeds are read; the writer may not use anything else.
export const NEWS_FEEDS = [
  { outlet: "BBC Sport",    url: "https://feeds.bbci.co.uk/sport/football/rss.xml" },
  { outlet: "The Guardian", url: "https://www.theguardian.com/football/rss" },
  { outlet: "Sky Sports",   url: "https://www.skysports.com/rss/12040" },
  { outlet: "ESPN",         url: "https://www.espn.com/espn/rss/soccer/news" },
];

// How far back a news item may be to count as "recent".
export const NEWS_MAX_AGE_HOURS = 36;
