import axios from 'axios';
import queryString from 'query-string';
import { AnimeInterface, AnimeGetQueryInterface } from 'interfaces/anime';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getAnime = async (query?: AnimeGetQueryInterface): Promise<PaginatedInterface<AnimeInterface>> => {
  const response = await axios.get('/api/anime', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createAnime = async (anime: AnimeInterface) => {
  const response = await axios.post('/api/anime', anime);
  return response.data;
};

export const updateAnimeById = async (id: string, anime: AnimeInterface) => {
  const response = await axios.put(`/api/anime/${id}`, anime);
  return response.data;
};

export const getAnimeById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/anime/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteAnimeById = async (id: string) => {
  const response = await axios.delete(`/api/anime/${id}`);
  return response.data;
};
