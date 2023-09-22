import axios from 'axios';
import queryString from 'query-string';
import { ModerationInterface, ModerationGetQueryInterface } from 'interfaces/moderation';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getModerations = async (
  query?: ModerationGetQueryInterface,
): Promise<PaginatedInterface<ModerationInterface>> => {
  const response = await axios.get('/api/moderations', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createModeration = async (moderation: ModerationInterface) => {
  const response = await axios.post('/api/moderations', moderation);
  return response.data;
};

export const updateModerationById = async (id: string, moderation: ModerationInterface) => {
  const response = await axios.put(`/api/moderations/${id}`, moderation);
  return response.data;
};

export const getModerationById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/moderations/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteModerationById = async (id: string) => {
  const response = await axios.delete(`/api/moderations/${id}`);
  return response.data;
};
