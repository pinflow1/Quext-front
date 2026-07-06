export const SOURCE_COLOR = {
  crunchyroll: '#F47521',
  mal:         '#2E51A2',
  ann:         '#5EEBFF',
};

export const SOURCE_FILTERS = ['All', 'Crunchyroll', 'MyAnimeList', 'ANN'];

export function timeAgo(dateStr) {
  if (!dateStr) return '';
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const hours = Math.floor(diffMs / 3600000);
  if (hours < 1) return 'Just now';
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString('en-US', { month:'short', day:'numeric' });
}
