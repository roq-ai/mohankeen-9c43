import * as yup from 'yup';

export const watchlistValidationSchema = yup.object().shape({
  anime_id: yup.string().nullable().required(),
  user_id: yup.string().nullable().required(),
});
