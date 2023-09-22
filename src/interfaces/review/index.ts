import { ModerationInterface } from 'interfaces/moderation';
import { AnimeInterface } from 'interfaces/anime';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ReviewInterface {
  id?: string;
  title: string;
  content: string;
  rating: number;
  anime_id: string;
  user_id: string;
  created_at?: any;
  updated_at?: any;
  moderation?: ModerationInterface[];
  anime?: AnimeInterface;
  user?: UserInterface;
  _count?: {
    moderation?: number;
  };
}

export interface ReviewGetQueryInterface extends GetQueryInterface {
  id?: string;
  title?: string;
  content?: string;
  anime_id?: string;
  user_id?: string;
}
