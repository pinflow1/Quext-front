export const NOW_PLAYING = {
  title: "Frieren: Beyond Journey's End",
  ep: 14, total: 28,
  palette: ["#1a1006", "#2e1c08", "#FF7A00"],
  note: "The party returns to Aureole after ten years.",
};

export const TOP_RATED = [
  { rank:1, title:"Frieren: Beyond Journey's End", score:9.4, eps:28, palette:["#1a1006","#2e1c08"] },
  { rank:2, title:"Houseki no Kuni", score:9.3, eps:12, palette:["#05050d","#0a0a30"] },
  { rank:3, title:"Vinland Saga", score:9.1, eps:48, palette:["#0a0d1a","#101830"] },
  { rank:4, title:"Mob Psycho 100", score:9.1, eps:37, palette:["#0d0a00","#201800"] },
  { rank:5, title:"Made in Abyss", score:9.1, eps:25, palette:["#05100d","#0a2018"] },
];

export const HIDDEN_GEMS = [
  {
    title:"Mushishi", genre:"Mystery · Supernatural", eps:26,
    palette:["#051a0d","#0a3018"],
    note:"Slow, deliberate, and unlike anything airing today. Every episode is a self-contained ghost story told with the patience of a folk tale.",
    byline:"— curated by the Quext team",
  },
  {
    title:"Planetes", genre:"Sci-Fi · Slice of Life", eps:26,
    palette:["#0d0d05","#1a1a08"],
    note:"A debris-collection crew in low orbit, told with more emotional honesty than half the prestige dramas this decade.",
    byline:"— curated by the Quext team",
  },
];

export const HEATMAP_SHOWS = [
  { title:"Frieren", days:[0,3], intensity:0.9 },
  { title:"Vinland Saga", days:[1], intensity:0.6 },
  { title:"Dungeon Meshi", days:[2,5], intensity:0.8 },
  { title:"Mob Psycho 100", days:[4], intensity:0.4, delayed:true },
  { title:"Made in Abyss", days:[6], intensity:0.7 },
];
export const DAY_LABELS = ["M","T","W","T","F","S","S"];
export const TODAY_INDEX = 3;

export const STATUS_COLOR = { premiere:"var(--orange)", confirmed:"var(--cyan)", delayed:"var(--red)" };

export const TIMELINE = [
  { date:"Jun 21", title:"Frieren S2", status:"premiere" },
  { date:"Jun 24", title:"Mob Psycho S4", status:"delayed" },
  { date:"Jun 28", title:"Dungeon Meshi S2", status:"confirmed" },
  { date:"Jul 3",  title:"Vinland Saga S3", status:"confirmed" },
  { date:"Jul 9",  title:"Made in Abyss S3", status:"confirmed" },
];

export const TRENDING = [
  { rank:1, change:"up",   title:"Frieren: Beyond Journey's End", blurb:"Episode 14 broke the internet", score:98 },
  { rank:2, change:"up",   title:"Dungeon Meshi", blurb:"Word of mouth is finally catching up", score:91 },
  { rank:3, change:"down", title:"Demon Slayer", blurb:"Cooling off post-finale", score:74 },
  { rank:4, change:"same", title:"Vinland Saga", blurb:"Steady as always", score:68 },
];
