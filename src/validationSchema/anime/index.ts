import * as yup from 'yup';

export const animeValidationSchema = yup.object().shape({
  title: yup.string().required(),
  genre: yup.string().required(),
  release_date: yup.date().required(),
  episodes: yup.number().integer().required(),
  duration: yup.number().integer().required(),
  status: yup.string().required(),
});
