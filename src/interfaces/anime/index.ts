import { ReviewInterface } from 'interfaces/review';
import { WatchlistInterface } from 'interfaces/watchlist';
import { GetQueryInterface } from 'interfaces';

export interface AnimeInterface {
  id?: string;
  title: string;
  genre: string;
  release_date: any;
  episodes: number;
  duration: number;
  status: string;
  created_at?: any;
  updated_at?: any;
  review?: ReviewInterface[];
  watchlist?: WatchlistInterface[];

  _count?: {
    review?: number;
    watchlist?: number;
  };
}

export interface AnimeGetQueryInterface extends GetQueryInterface {
  id?: string;
  title?: string;
  genre?: string;
  status?: string;
}
