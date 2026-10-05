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

// The pipeline asks the provider for one calendar day at a time (all
// competitions in one request): this many days back and ahead of today.
export const DAYS_BACK = 3;
export const DAYS_AHEAD = 4;

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
