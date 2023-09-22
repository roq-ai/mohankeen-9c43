import { ReviewInterface } from 'interfaces/review';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ModerationInterface {
  id?: string;
  action: string;
  reason?: string;
  review_id: string;
  user_id: string;
  created_at?: any;
  updated_at?: any;

  review?: ReviewInterface;
  user?: UserInterface;
  _count?: {};
}

export interface ModerationGetQueryInterface extends GetQueryInterface {
  id?: string;
  action?: string;
  reason?: string;
  review_id?: string;
  user_id?: string;
}
