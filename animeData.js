export const ANIME = [
  { id:1,  title:"Frieren: Beyond Journey's End", genre:"Fantasy · Adventure",   ep:28, rating:9.4, status:"Watching",  cur:14, palette:["#0d1a0a","#1a3010","#4a8030"] },
  { id:2,  title:"Vinland Saga",                  genre:"Historical · Action",    ep:48, rating:9.1, status:"Paused",    cur:24, palette:["#0a0d1a","#101830","#304080"] },
  { id:3,  title:"Dungeon Meshi",                 genre:"Fantasy · Comedy",        ep:24, rating:9.2, status:"Watching",  cur:8,  palette:["#1a0d00","#302010","#806030"] },
  { id:4,  title:"Demon Slayer",                  genre:"Action · Supernatural",   ep:44, rating:8.7, status:"Completed", cur:44, palette:["#1a0505","#300a0a","#802020"] },
  { id:5,  title:"Mushishi",                      genre:"Mystery · Supernatural",  ep:26, rating:9.0, status:"Watching",  cur:3,  palette:["#051a0d","#0a3018","#208040"] },
  { id:6,  title:"Houseki no Kuni",               genre:"Sci-Fi · Drama",          ep:12, rating:9.3, status:"Completed", cur:12, palette:["#05050d","#0a0a30","#2020a0"] },
  { id:7,  title:"Planetes",                      genre:"Sci-Fi · Slice of Life",  ep:26, rating:8.8, status:"Watching",  cur:10, palette:["#0d0d05","#1a1a08","#504820"] },
  { id:8,  title:"Ping Pong",                     genre:"Sports · Drama",          ep:11, rating:8.9, status:"Completed", cur:11, palette:["#0d0505","#201010","#603030"] },
  { id:9,  title:"Made in Abyss",                 genre:"Adventure · Fantasy",     ep:25, rating:9.1, status:"Paused",    cur:13, palette:["#05100d","#0a2018","#206050"] },
  { id:10, title:"Neon Genesis Evangelion",       genre:"Mecha · Psychological",   ep:26, rating:9.0, status:"Completed", cur:26, palette:["#0a0505","#181010","#502030"] },
  { id:11, title:"Serial Experiments Lain",       genre:"Sci-Fi · Psychological",  ep:13, rating:8.7, status:"Watching",  cur:5,  palette:["#050508","#0a0a18","#303060"] },
  { id:12, title:"Mob Psycho 100",                genre:"Action · Supernatural",   ep:37, rating:9.1, status:"Completed", cur:37, palette:["#0d0a00","#201800","#604800"] },
];

export const GENRES = ["All","Action","Fantasy","Mystery","Sci-Fi","Drama","Sports"];

export const ROWS = [
  { label:"Continue Watching", anime: ANIME.filter(a=>a.status==="Watching"), progress:true },
  { label:"💎 Hidden Gems",    anime: [ANIME[4],ANIME[5],ANIME[6],ANIME[7],ANIME[8]], progress:false },
  { label:"Top Rated",         anime: [ANIME[0],ANIME[5],ANIME[1],ANIME[11],ANIME[9]], progress:false },
  { label:"New Season Alert",  anime: [ANIME[1],ANIME[0],ANIME[2],ANIME[8]], progress:false },
];
