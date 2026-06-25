// SVG path data strings — no JSX, just strings.
// BadgesTab renders these inside its own <svg> elements.
export const BADGE_ICON = {
  flame: "M12 2c1 4-3 5-3 9a3 3 0 006 0c0-1-1-2-1-3 2 1 3 3 3 5a5 5 0 01-10 0c0-5 3-7 5-11z",
  book:  "M4 4h11a3 3 0 013 3v13H7a3 3 0 00-3 3V4z",
  check: "M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  star:  "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  heart: "M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z",
};

// heart and star use <path>, star originally used <polygon> — both now path strings
export const BADGE_ICON_TYPE = {
  flame: "path", book: "path", check: "path", star: "path", heart: "path",
};
