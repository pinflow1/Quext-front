export const CALENDAR_DAYS = ["MON","TUE","WED","THU","FRI","SAT","SUN"];
export const CALENDAR_TODAY = 15;

export const CALENDAR_EVENTS = {
  3:  { title:"Frieren S2",       platform:"CR",  status:"premiere" },
  8:  { title:"Vinland Saga S3",  platform:"NET", status:"confirmed" },
  14: { title:"Mob Psycho S4",    platform:"CR",  status:"delayed" },
  19: { title:"Made in Abyss S3", platform:"HD",  status:"confirmed" },
  25: { title:"Lain OVA",         platform:"NET", status:"confirmed" },
  28: { title:"Dungeon Meshi S2", platform:"NET", status:"premiere" },
};

export function buildCalendarCells(totalDays = 30, offset = 6) {
  const cells = [];
  for (let i = 0; i < offset; i++) cells.push(null);
  for (let d = 1; d <= totalDays; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}
