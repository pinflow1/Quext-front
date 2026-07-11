// Single source of truth for translating raw journal_entries DB rows
// (entry_text, episode_number) into the shape every UI component
// expects (note, episode). Both useJournal and useProfile import this
// so the two hooks can never drift out of sync with each other again.
export function toUiEntry(row) {
  return {
    ...row,
    note: row.entry_text,
    episode: row.episode_number,
  };
}
