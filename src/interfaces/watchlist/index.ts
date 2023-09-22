import { AnimeInterface } from 'interfaces/anime';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface WatchlistInterface {
  id?: string;
  anime_id: string;
  user_id: string;
  created_at?: any;
  updated_at?: any;

  anime?: AnimeInterface;
  user?: UserInterface;
  _count?: {};
}

export interface WatchlistGetQueryInterface extends GetQueryInterface {
  id?: string;
  anime_id?: string;
  user_id?: string;
}
