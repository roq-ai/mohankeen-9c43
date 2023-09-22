const mapping: Record<string, string> = {
  anime: 'anime',
  companies: 'company',
  moderations: 'moderation',
  reviews: 'review',
  users: 'user',
  watchlists: 'watchlist',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
