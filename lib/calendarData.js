export const EVENTS = {
  3:  { title:"Frieren S2",   platform:"CR",  color:"#F47521" },
  8:  { title:"Vinland S3",   platform:"NET", color:"#E50914" },
  14: { title:"Mob S4",       platform:"CR",  color:"#F47521" },
  19: { title:"Abyss S3",     platform:"HD",  color:"#00AEEF" },
  25: { title:"Lain OVA",     platform:"NET", color:"#E50914" },
  28: { title:"Dungeon S2",   platform:"NET", color:"#E50914" },
};

export function buildCalendarCells(totalDays = 30, offset = 6) {
  const cells = [];
  for (let i = 0; i < offset; i++) cells.push(null);
  for (let d = 1; d <= totalDays; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}
